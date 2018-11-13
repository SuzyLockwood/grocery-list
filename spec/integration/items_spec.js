const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/lists';
const sequelize = require('../../src/db/models/index').sequelize;
const List = require('../../src/db/models').List;
const Item = require('../../src/db/models').Item;
const User = require('../../src/db/models').User;

describe('routes : items', () => {
  beforeEach(done => {
    this.list;
    this.item;
    this.user;

    sequelize.sync({ force: true }).then(res => {
      User.create({
        username: 'tester',
        email: 'starman@tesla.com',
        password: 'Trekkie4lyfe'
      }).then(user => {
        this.user = user;

        List.create({
          title: 'Winter Games',
          description: 'Post your Winter Games stories.',
          private: false,
          userId: this.user.id
        }).then(list => {
          this.list = list;

          Item.create({
            name: 'Tomatoes',
            completed: false,
            listId: this.list.id
          })
            .then(item => {
              this.item = item;
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        });
      });
    });
  });
  describe('POST /lists/:id/items/create', () => {
    it('should create a new item and redirect', done => {
      const options = {
        url: `${base}/${this.list.id}/items/create`,
        form: {
          name: 'Milk',
          completed: false,
          listId: this.list.id
        }
      };
      request.post(options, (err, res, body) => {
        Item.findOne({ where: { name: 'Milk' } })
          .then(item => {
            expect(item).not.toBeNull();
            expect(item.name).toBe('Milk');
            expect(item.listId).not.toBeNull();
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe('POST /lists/:listId/items/:id/update', () => {
    it('should update the item with the given values', done => {
      const options = {
        url: `${base}/${this.list.id}/items/${this.item.id}/update`,
        form: {
          name: 'Juice',
          completed: false,
          listId: this.list.id
        }
      };
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();
        Item.findOne({
          where: { id: this.item.id }
        }).then(item => {
          expect(item.name).toBe('Juice');
          done();
        });
      });
    });
    describe('POST /lists/:listId/items/:id/destroy', () => {
      it('should delete the item with the associated ID', done => {
        expect(this.item.id).toBe(1);
        request.post(
          `${base}/${this.list.id}/items/${this.item.id}/destroy`,
          (err, res, body) => {
            Item.findById(1).then(item => {
              expect(err).toBeNull();
              expect(item).toBeNull();
              done();
            });
          }
        );
      });
    });
  });
});
