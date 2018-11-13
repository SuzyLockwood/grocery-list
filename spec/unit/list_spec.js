const sequelize = require('../../src/db/models/index').sequelize;
const List = require('../../src/db/models').List;
const User = require('../../src/db/models').User;

describe('List', () => {
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
          title: 'Expeditions to Alpha Centauri',
          description:
            'A compilation of reports from recent visits to the star system',
          private: false,
          userId: this.user.id
        }).then(list => {
          this.list = list;
          done();
        });
      });
    });
  });
});
