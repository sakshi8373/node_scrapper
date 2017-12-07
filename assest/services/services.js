var baseurl = 'http://localhost:8081';

app.service('userServices',function($http){

	return{ 
		signup : function(data){
			return $http.post(baseurl+'/user/signup', data);
		},
		scrape : function(data){
			
			//var datas = JSON.stringify(data)
			console.log("datafgfh======>>",baseurl+'/scrape', data)
			return $http.post(baseurl+'/scrape', data);
			},

		uploadImage : function(data){
            return $http.post(baseurl+'/uploadimage', data);
		},
		searchlist: function(data){
            return $http.get(baseurl+'/searchlist');
		},
		viewImages: function(data){
            return $http.post(baseurl+'/showImages',data);
		}
    }
})