'use strict';

var app = angular.module('diceMasters', ['ngAnimate', 'ngProgress', 'ngMaterial', 'sun.scrollable']);


app.factory('socketio', socketioFactory);
app.factory('cards', ['socketio', '$rootScope', 'ngProgress', cardsFactory]);
app.controller('main', ['$scope', mainController]);
app.controller('search', ['$scope', 'cards', searchController]);
app.controller('desk', ['$scope', 'cards', deskController]);
app.directive('adrSelectOnClick', selectOnFocusDirective);
