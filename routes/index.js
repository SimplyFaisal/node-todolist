var express = require('express');
var router = express.Router();
const Todo = require('../model');

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


/* Get a list of todos */
router.get('/todo', async function(request, response, next) {
	const todos = await Todo.findAll();
	if (todos !== null) {
		return response.json(todos);
	}
	return response.sendStatus(404);
});

/* GET a todo */
router.get('/todo/:id', async function(request, response, next) {
	const todo = await Todo.findByPk(request.params.id);
	if (todo !== null) {
		return response.json(todo.toJSON());
	}
	return response.sendStatus(404);

});

/* Create a todo */
router.post('/todo', async function(request, response, next) {
	const todo = await Todo.create({text: request.body.text});
	return response.json(todo.toJSON());
});

/* Update a todo */
router.put('/todo/:id', async function(request, response, next) {
	const todo = await Todo.findByPk(request.params.id);
	if (todo !== null) {
		todo.text = request.body.text;
		todo.active = request.body.active;
		const updated = await todo.save();
		return response.json(updated.toJSON());
	}
	return response.sendStatus(404);
});

router.delete('/todo/:id', async function(request, response, next) {
	const todo = await Todo.findByPk(request.params.id);
	if (todo !== null) {
		await todo.destroy();
		return response.sendStatus(200);
	}
	return response.sendStatus(404);
});


module.exports = router;