'use strict';

var app = angular.module('diceMasters', []);

app.factory('socketio', socketioFactory);
app.factory('cards', ['socketio', '$rootScope', cardsFactory]);
app.controller('search', ['$scope', 'cards', searchController]);
app.controller('desk', ['$scope', 'cards', deskController]);