app.controller('keyWordListCtrl', function($scope, $state, userServices, toastr) {
    $scope.myForm = {};

    userServices.searchlist().then(function(success) {
        if (success.data.responseCode == 200) {
            var arrayRes = [];
            $scope.keywords = success.data.data
        } else {
            toastr.error("No data found.");
        }
    }, function(err) {
        console.log(err);
        toastr.error('Connection error.');
    });

    $scope.key = (id) => {
        localStorage.setItem('keywordId', id);
        $state.go('savedImagesList')
    }

});