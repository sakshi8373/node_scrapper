app.controller('searchResultCtrl', function($scope, $state, userServices,toastr) {
var arrayLat = localStorage.getItem('arrayRes');
$scope.products = JSON.parse(arrayLat);

// $scope.imagesList =  function() {
//     document.getElementById("listOfImages").style.filter = "grayscale(100%)";

//     // Safari 6.0 - 9.0
//     document.getElementById("listOfImages").style.WebkitFilter = "grayscale(100%)";  
// }

$scope.uploadImages =  function() {
	var keyword = localStorage.getItem('keyword');
   var data = {
   	images:$scope.products,
   	keyword:keyword
   }
    userServices.uploadImage(data).then(function(success) {
        console.log("success",success)
      if(success.data.responseCode == 200){   
         console.log("success",success.data)
          toastr.success("Show all search lists");
         $state.go('keyWordList');
      }else{
         toastr.error("Connection error.");
      }     
     },function(err){
        console.log(err);
         toastr.error('Connection error.');
     });
}

})