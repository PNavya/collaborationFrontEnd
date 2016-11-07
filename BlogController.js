/**
 * 
 */
'use strict';

app.controller('BlogController', [
		'$scope',
		'BlogService',
		'$location',
		'$rootScope',
		function($scope, BlogService, $location, $rootScope) {
			console.log("BlogController...")
			var self = this; // self is alias name instead directly use this
			self.blog = { // initialization
				blogid : '',
				blogtitle : '',
				dateofcreation : '',
				content : '',
				userid : '',
			};
			self.blogs = [];
			
			/*GET SELECTED BLOG DETAILS*/

			self.getSelectedBlog = getBlog

			function getBlog(blogid) {
				console.log("getting blog! " + blogid)
				BlogService.getBlog(id).then(function(d) {
					self.blog = d;
					$location.path('/view_blog');
				}, function(errResponse) {
					console.error('Error while fetching blogs');
				});
			}
			;

			/* GET LIST OF ALL BLOGS */

			self.fetchAllBlogs = function() {
				BlogService.fetchAllBlogs().then(function(d) { // these methods
																// are called
																// call back
																// methods
					self.blogs = d;
				}, function(errResponse) {
					console.error('Error while fetching Blogs');
				});
			};
			self.fetchAllBlogs();

			/* CREATE A BLOG */

			self.createBlog = function(blog) {
				BlogService.createBlog(blog).then(self.fetchAllBlogs,
						function(errResponse) {
							console.error('Error while creating Blogs');
						});
			};

			/* UPDATE A BLOG */

			self.updateBlog = function(blog) {
				BlogService.updateBlog(blog).then(self.fetchAllBlogs,
						function(errResponse) {
							console.error('Error while updating Blogs');
						});
			};

			/* DELETE A BLOG */

			self.deleteBlog = function(blogid) {
				BlogService.deleteBlog(blogid).then(self.fetchAllBlogs,
						function(errResponse) {
							console.error('Error while deleting Blogs');
						});
			};

			/* ON CLICKING SUBMIT BUTTON */

			self.submit = function() {
				if (self.blog.blogid == null) {
					console.log('Saving New Blog', self.blog);
					self.blog.user_name = $rootScope.currentUser.userid
					self.createblog(self.blog);
				}
				self.reset();
			};

			/* END OF ALL */

		} ]);