const express = require('express');
const app = express();
const _ = require('lodash');
const MongoClient = require('mongodb').MongoClient;

const messages = [];

app.use(express.static(__dirname +'./../../'));

app.get('/api/user', (req, res) => {
	res.json({name: 'Angie', messageCount:_.filter(messages, 'new').length});
})

app.get('/api/messages', (req, res) => {
	//TODO: get messages from database

	res.json(messages);
})

app.post('/api/messages', (req, res) => {
	//TODO: add new comment entry to database
	//TODO: add 100 new entries to database
	const id = new Date().getTime();
	messages.unshift({id:id.toString(), mes: `hillo ${new Date()}`, sender: 'me', new: true});
	res.sendStatus(200);
})

app.get('/api/read/:id', (req, res) => {
	//TODO: update comment with res.params.id status new -> false in database
	messages.forEach(mes => {
		if(mes.id === req.params.id) {
			mes.new = false;
		}
	})
	res.sendStatus(200);
})

// MongoClient.connect('mongodb://localhost:3000/selected', (err, client) => {
// 	if (err) return console.log(err)
// 	db = client.db('selected')
	app.listen(3000); //listens on port 3000 -> http://localhost:3000/
// })