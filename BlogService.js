/**
 * 
 */
'use strict';

app.factory('BlogService',['$http','$q','$rootScope',function($http,$q,$rootScope){
	
	console.log("BlogService..")
	
	var BASE_URL='http://localhost:8083/collaboration'
		return{
		
		/* GET LIST OF ALL BLOGS */
		
fetchAllBlogs:function(){
			return $http.get(BASE_URL+'/blogs')
			.then(
					function(response){
						return response.data;
					},
					function(errResponse){
						console.error('Error while fetching BlogDetails');
						return $q.reject(errResponse);
					}				
	);
},

/* CREATE A BLOG */

createBlog:function(blog){
	return $http.post(BASE_URL+'/blog',blog)
	.then(
			function(response){
				return response.data;
			},
			function(errResponse){
				console.error('Error while creating Blog');
				return $q.reject(errResponse);
			}				
);
},

/* UPDATE A BLOG */

updateBlog:function(blog,blogid){
	return $http.put(BASE_URL+'/blog/'+blogid,blog)
	.then(
			function(response){
				return response.data;
			},
			function(errResponse){
				console.error('Error while updating Blog');
				return $q.reject(errResponse);
			}				
);
},

/* DELETE A BLOG */

deleteBlog:function(blogid){
	return $http.delete(BASE_URL+'/blog/'+blogid)
	.then(
			function(response){
				return response.data;
			},
			function(errResponse){
				console.error('Error while deleting Blog');
				return $q.reject(errResponse);
			}				
);
},

/* GET SELECTED BLOG DETAILS */

getBlog: function(blogid){
	return $http.get(BASE_URL+'/blog/'+blogid)
	.then(
			function(response){
				$rootScope.selectedBlog=response.data
				return response.data;
			},
			function(errResponse){
				console.error('Error while deleting Blog');
				return $q.reject(errResponse);
			}				
);
},
};
	
}

]
);