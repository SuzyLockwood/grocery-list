const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/lists/';
const sequelize = require('../../src/db/models/index').sequelize;
const List = require('../../src/db/models').List;
const User = require('../../src/db/models').User;

describe('routes : lists', () => {
  beforeEach(done => {
    this.list;
    this.user;

    sequelize.sync({ force: true }).then(res => {
      User.create({
        username: 'tester',
        email: 'starman@tesla.com',
        password: 'Trekkie4lyfe'
      }).then(user => {
        this.user = user;
        List.create({
          title: 'JS Frameworks',
          description: 'There is a lot of them',
          private: false,
          userId: this.user.id
        })
          .then(list => {
            this.list = list;
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe('GET /lists', () => {
    it('should return a status code 200 and all lists', done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain('Lists');
        expect(body).toContain('JS Frameworks');
        done();
      });
    });
  });
  describe('GET /lists/new', () => {
    it('should render a new list form', done => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('New List');
        done();
      });
    });
  });
  describe('POST /lists/create', () => {
    beforeEach(done => {
      User.create({
        username: 'tester',
        email: 'admin@example.com',
        password: '123456'
      }).then(user => {
        const options = {
          url: `${base}create`,
          form: {
            title: 'blink-182 songs',
            description: "What's your favorite blink-182 song?",
            private: false,
            userId: this.user.id
          }
        };
        it('should create a new list and redirect', done => {
          request.post(options, (err, res, body) => {
            List.findOne({ where: { title: 'blink-182 songs' } })
              .then(list => {
                expect(res.statusCode).toBe(302);
                expect(list.title).toBe('blink-182 songs');
                expect(list.description).toBe(
                  "What's your favorite blink-182 song?"
                );
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
  });
  describe('GET /lists/:id', () => {
    it('should render a view with the selected list', done => {
      request.get(`${base}${this.list.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('JS Frameworks');
        done();
      });
    });
  });
  describe('POST /lists/:id/destroy', () => {
    beforeEach(done => {
      User.create({
        username: 'tester',
        email: 'admin@example.com',
        password: '123456'
      }).then(user => {
        it('should delete the list with the associated ID', done => {
          List.all().then(lists => {
            const listCountBeforeDelete = lists.length;
            expect(listCountBeforeDelete).toBe(1);
            request.post(`${base}${this.list.id}/destroy`, (err, res, body) => {
              List.all().then(lists => {
                expect(err).toBeNull();
                expect(lists.length).toBe(listCountBeforeDelete - 1);
                done();
              });
            });
          });
        });
      });
    });
  });
  describe('GET /lists/:id/edit', () => {
    beforeEach(done => {
      User.create({
        username: 'tester',
        email: 'admin@example.com',
        password: '123456'
      }).then(user => {
        it('should render a view with an edit list form', done => {
          request.get(`${base}${this.list.id}/edit`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain('Edit');
            expect(body).toContain('JS Frameworks');
            done();
          });
        });
      });
    });
  });
  describe('POST /lists/:id/update', () => {
    it('should update the list with the given values', done => {
      const options = {
        url: `${base}${this.list.id}/update`,
        form: {
          title: 'JavaScript Frameworks',
          description: 'There are a lot of them',
          private: false,
          userId: this.user.id
        }
      };
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();
        List.findOne({
          where: { id: this.list.id }
        }).then(list => {
          expect(list.title).toBe('JS Frameworks');
          done();
        });
      });
    });
  });
});
