const sequelize = require('../../src/db/models/index').sequelize;
const List = require('../../src/db/models').List;
const Item = require('../../src/db/models').Item;
const User = require('../../src/db/models').User;

describe('Item', () => {
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
          title: 'Expeditions to Alpha Centauri',
          description:
            'A compilation of reports from recent visits to the star system.',
          private: false,
          userId: this.user.id
        })
          .then(list => {
            this.list = list;
            Item.create({
              name: 'My first visit to Proxima Centauri b',
              completed: false,
              listId: this.list.id
            }).then(item => {
              this.item = item;
              done();
            });
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe('#create()', () => {
    it('should create an item object with a name, false completed value, and assigned list', done => {
      Item.create({
        name: 'Sharp Cheddar Cheese',
        completed: false,
        listId: this.list.id
      })
        .then(item => {
          expect(item.name).toBe('Sharp Cheddar Cheese');
          expect(item.completed).toBe(false);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it('should not create an item with missing name, completed status, or assigned list', done => {
      Item.create({
        name: 'Pros of Cryosleep during the long journey'
      })
        .then(item => {
          // the code in this block will not be evaluated since the validation error
          // will skip it. Instead, we'll catch the error in the catch block below
          // and set the expectations there
          done();
        })
        .catch(err => {
          expect(err.message).toContain('Item.listId cannot be null');
          done();
        });
    });
  });
  describe('#setList()', () => {
    it('should associate a List and an item together', done => {
      List.create({
        title: 'Challenges of interstellar travel',
        description: '1. The Wi-Fi is terrible',
        private: false,
        userId: 1
      }).then(newList => {
        expect(this.item.listId).toBe(this.list.id);
        this.item.setList(newList).then(item => {
          expect(item.listId).toBe(newList.id);
          done();
        });
      });
    });
  });
  describe('#getList()', () => {
    it('should return the associated list', done => {
      this.item.getList().then(associatedList => {
        expect(associatedList.title).toBe('Expeditions to Alpha Centauri');
        done();
      });
    });
  });
});
