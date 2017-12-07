app.controller('savedImagesListCtrl', function($scope, $state, userServices, toastr,$timeout) {
    var keywordId = localStorage.getItem('keywordId');
    var data = {
        keywordId: keywordId
    }
    userServices.viewImages(data).then(function(success) {
      console.log("succes data======",success)
        if (success.data.responseCode == 200) {
          if(success.data.data.length == 0){
            toastr.error("No data found");
            $timeout(function() {
              $state.go("keyWordList")
            }, 1000);
          }else{
            $scope.images = success.data.data
            toastr.success("Images shows successfully.")
          }
           
        } else {
            toastr.error("No data found");
        }
    }, function(err) {
        console.log(err);
        toastr.error('Connection error.');
    });


});                   
                                      
                                      
                                      
                                      
                                      
                        