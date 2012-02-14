// The facades to the real functionality
var mockFacade = require('./facade/mock/mockFacade.js');
var liveFacade = require('./facade/live/liveFacade.js');

// Change to modify
var facade = mockFacade;

// Attach URL handlers for facade calls
exports.login = facade.login;
exports.logout = facade.logout;
exports.getUserData = facade.getUserData;
exports.getClasses = facade.getClasses;
exports.getLectures = facade.getLectures;
exports.getUsers = facade.getUsers;
exports.sendMessage = facade.sendMessage;
exports.receiveMessage = facade.receiveMessage;
exports.listUsers = facade.listUsers;
exports.search = facade.search;
