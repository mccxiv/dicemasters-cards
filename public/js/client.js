'use strict';

var app = angular.module('diceMasters', []);

app.factory('socketIo', socketIoFactory);
app.controller('searchController', ['$scope', 'socketIo', searchController]);

function socketIoFactory()
{
	return io.connect();
}

function searchController($scope, socketIo)
{
	$scope.cards = [];

	socketIo.on('list', function(simpleList)
	{
		console.log('list event', simpleList);
		$scope.cards = simpleList;
		$scope.$apply();
	});

	socketIo.on('card', function(card)
	{
		console.log('card event', card);
		_($scope.cards).each(function(element, index, list)
		{
			if (element.name === card.name) list[index] = card;
		});
		$scope.$apply();
	});

	$scope.queryChanged = function(query)
	{
		if (query) socketIo.emit('search', query);
	}
}