/**
 * 
 */
'use strict';

app.controller('UserController', [
		'$scope',
		'UserService',
		'$location',
		'$rootScope',
		function($scope, UserService, $location, $rootScope) {
			console.log("UserController...")
			var self = this;
			self.user = {
				userid : '',
				name : '',
				password : '',
				mobile : '',
				address : '',
				email : '',
				role : '',
				errorMessage : ''
			};
			self.users = [];

			self.fetchAllUsers = function() {
				UserService.fetchAllUsers().then(function(d) {
					self.users = d;
				}, function(errResponse) {
					console.error('Error while fetching Users');
				});
			};
			self.createUser = function(user) {
				UserService.createUser(user).then(self.fetchAllUsers,
						function(errResponse) {
							console.error('Error while creating User...');
						});
			};
			self.updateUser = function(user, userid) {
				UserService.updateUser(user, userid).then(self.fetchAllUsers,
						function(errResponse) {
							console.error('Error while updating User...');
						});
			};
			self.authenticate = function(user) {
				UserService.authenticate(user).then(function(d) {
					self.user = d;
					if ($rootScope.currentUser) {
						$location.path('/');
					}
				}, function(errResponse) {
					console.error('Error while authenticate User...');
				});
			};
			self.deleteUser = function(userid) {
				UserService.deleteUser(userid).then(self.fetchAllUsers,
						function(errResponse) {
							console.error('Error while deleting User');
						});
			};
			self.fetchAllUsers();

			self.login = function() {
				{
					console.log('login validation????', self.user);
					self.authenticate(self.user);
				}
			};
			self.submit = function() {
				{
					console.log('Saving New user', self.user);
					self.createUser(self.user);
				}
				self.reset();
			};
			self.edit = function(userid) {
				console.log('id to be edited', userid);
				for (var i = 0; i < self.users.length; i++) {
					if (self.users[i].userid == id) {
						self.user = angular.copy(self.users[i]);
						break;
					}
				}
			};
			self.remove = function(userid) {
				console.log('id to be deleted', userid);
				if (self.user.userid == id) {
					self.reset();
				}
				self.deleteUser(userid);
			};
		} ]);
