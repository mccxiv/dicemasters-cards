'use strict';

var app = angular.module('diceMasters', ['ngAnimate']);

app.factory('socketio', socketioFactory);
app.factory('cards', ['socketio', '$rootScope', cardsFactory]);
app.controller('main', ['$scope', mainController]);
app.controller('search', ['$scope', 'cards', searchController]);
app.controller('desk', ['$scope', 'cards', deskController]);