/**
 * 
 */
'use strict';

app.factory('UserService',['$http','$q','$rootScope',function($http,$q,$rootScope){
	
	console.log("UserService..")
	
	var BASE_URL='http://localhost:8083/collaboration/'
		return{
		fetchAllUsers:function(){
			return $http.get(BASE_URL+'/users')
			.then(
					function(response){
						return response.data;
					},
					function(errResponse){
						console.error('Error while fetching UserDetails');
						return $q.reject(errResponse);
					}				
	);
},
createUser:function(user){
	return $http.post(BASE_URL+'/user',user)
	.then(
			function(response){
				return response.data;
			},
			function(errResponse){
				console.error('Error while creating User');
				return $q.reject(errResponse);
			}				
);
	
},
updateUser:function(user,userid){
	return $http.put(BASE_URL+'/user/'+userid,user)
	.then(
			function(response){
				return response.data;
			},
			function(errResponse){
				console.error('Error while updating User');
				return $q.reject(errResponse);
			}				
);
},
deleteUser:function(userid){
	return $http.delete(BASE_URL+'/user/'+userid)
	.then(
			function(response){
				return response.data;
			},
			function(errResponse){
				console.error('Error while deleting User');
				return $q.reject(errResponse);
			}				
);
},
authenticate:function(user){
	return $http.post(BASE_URL+'/user/authenticate/',user)
	.then(
			function(response){
				if(response.data.errorMessage!="")
					{
					$rootScope.currentUser={
							name:response.data.name,
							userid:response.data.userid,
							role:response.data.role
				};
					}
				return response.data;
			}
			);
},
}
}
]
);