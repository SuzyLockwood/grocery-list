const userQueries = require('../db/queries.users.js');
const passport = require('passport');

module.exports = {
  signUp(req, res, next) {
    res.render('users/sign_up');
  },
  create(req, res, next) {
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        req.flash('error', err);
        res.redirect('/users/sign_up');
      } else {
        passport.authenticate('local')(req, res, () => {
          req.flash(
            'success',
            'Successfully Signed Up! Nice to meet you, ' +
              req.body.username +
              '.'
          );
          res.redirect('/lists');
        });
      }
    });
  },
  signInForm(req, res, next) {
    res.render('users/sign_in');
  },
  signIn(req, res, next) {
    passport.authenticate('local')(req, res, function() {
      if (!req.user) {
        req.flash('error', 'Sign in failed. Please try again.');
        res.redirect('/users/sign_in');
      } else {
        req.flash('success', 'Welcome back, ' + req.user.username + '!');
        res.redirect('/lists');
      }
    });
  },
  signOut(req, res, next) {
    req.logout();
    req.flash('success', 'You have successfully logged out.');
    res.redirect('/');
  }
};
