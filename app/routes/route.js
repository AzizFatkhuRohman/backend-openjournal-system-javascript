import express from 'express'
import usersController from '../controllers/users.controller.js';
import journalsController from '../controllers/journals.controller.js';
import commentsController from '../controllers/comments.controller.js';
import viewsController from '../controllers/views.controller.js';
import upload from '../middleware/upload.js';
const route = express.Router()

route.post('/register', usersController.postRegister)
route.post('/login', usersController.postLogin)
//route Journal
route.post('/journal', upload.single('fileJurnal'), journalsController.postJournal)
route.get('/journal',journalsController.getJournal)
route.get('/journal/:id',journalsController.findJournal)
route.put('/journal/:id', journalsController.putJournal)
route.delete('/journal/:id', journalsController.destroyJournal)
//Route comment
route.post('/comment', commentsController.postComment)
route.put('/comment/:id',commentsController.putComment)
route.delete('/comment/:id',commentsController.destroyComment)
//Route view
route.post('/view', viewsController.postView)
route.get('/view', viewsController.getView)
//user route
route.get("/user", usersController.getUsers)
route.get('/user/:id', usersController.findUser)
route.put('/user/:id', usersController.putUser)
export default route