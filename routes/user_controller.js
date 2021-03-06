var express = require('express');
var router = express.Router();

const Schema = require('../db/schema');

const Users = Schema.UserModel;

// index
router.get('/', (req, res) => {
   Users.find({})
      .then((users) => {
         res.render('users/index', {
            users
         })
      })
});

//create
router.get('/new', (req, res) => {
   res.render('users/new')
})

//show
router.get('/:userId', (req, res) => {
   const userId = req.params.userId;
   Users.findById(userId)
      .then((user) => {
         res.render('users/show', {
            user
         });
      })
      .catch((err) => {
         console.log(err);
      })
})

//create put
router.post('/', (req, res) => {
   const newUser = req.body;
   Users.create({
      username: newUser.username,
      name: newUser.name
   })
      .then(() => {
         res.redirect('/users');
      })
      .catch((err) => {
         console.log(err);
      })
})

//edit
router.get('/:userId/edit', (req, res) => {
   let userId = req.params.userId;
   Users.findById(userId)
      .then((user) => {
         res.render('users/edit', {
            user
         });
      })
      .catch((err) => {
         console.log(err);
      })
})

//edit put
router.put('/:userId', (req, res) => {
   const updatedUser = req.body;
   const userId = req.params.userId;

   Users.findOneAndUpdate({ _id: userId }, updatedUser, { new: true })
      .then(() => {
         res.redirect(`/users/${userId}`);
      })
      .catch((err) => {
         console.log(err)
      })
})

//delete
router.get('/:userId/delete', (req, res) => {
   const userId = req.params.userId;
   Users.findByIdAndRemove(userId)
      .then((user) => {
         res.redirect('/users/');
      })
      .catch((err) => {
         console.log(err);
      })
})

module.exports = router;
