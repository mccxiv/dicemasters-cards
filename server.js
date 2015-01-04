'use strict';

var _ = require('underscore');
var express = require('express');
var socketio = require('socket.io');
var dm = require('dm-lookup');

var app = express();
var server = app.listen(80);
var io = socketio.listen(server);

app.use(express.static('./public'));

io.on('connection', onConnect);

function onConnect(socket)
{
	var currentSearch;
	console.log('connected');
	socket.on('search', onCardLookup);
	socket.on('disconnect', abortSearch);

	function onCardLookup(query)
	{
		console.log('query:', query);
		if (currentSearch) currentSearch.abort();
		currentSearch = dm.search(query);

		currentSearch.on('list', emitSimpleList);
		currentSearch.on('card', emitCard);
		currentSearch.on('done', emitCompleteList);
	}

	function emitSimpleList(list)
	{
		socket.emit('list', list);
	}

	function emitCard(card)
	{
		socket.emit('card', card);
	}

	function emitCompleteList(cards)
	{
		socket.emit('done', cards);
	}

	function abortSearch()
	{
		if (currentSearch) currentSearch.abort();
		currentSearch = null;
	}
}

