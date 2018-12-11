angular.module('myApp', []).controller('myController', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/user/profile')
            .success(function(data, status, headers, config) {
                $scope.user = data;
                $scope.error = "";
            }).
        error(function(data, status, headers, config) {
            $scope.user = {};
            $scope.error = data;
        });

        // $scope.addCandidate = function() {
        //         var newObj = { Name: $scope.formContent, Sales: 0, PictureURL: $scope.pictureURLContent, Price: $scope.priceContent };
        //         $scope.create(newObj);
        //         $scope.priceContent = '';
        //         $scope.pictureURLContent = '';
        //         $scope.formContent = '';
        //         console.log("ADDING A NEW CANDIDTATE");
        //     }

    }




]).controller('MainCtrl', [
    '$scope', '$http',
    function($scope, $http) {
        $scope.candidates = [];
        $scope.ballot = [];
        $scope.getAll = function() {
            return $http.get('/voting').success(function(data) {
                angular.copy(data, $scope.candidates);
            });
        };
        $scope.getAll();
        $scope.create = function(candidate) {
            return $http.post('/voting', candidate).success(function(data) {
                $scope.candidates.push(data);
            });
        };
        $scope.dovote = function() {
            console.log("In Dovote");
            angular.forEach($scope.candidates, function(value, key) {
                if (value.selected) {
                    $scope.upvote(value);
                    $scope.ballot.push(value);
                }
            });
        }

        $scope.upvote = function(candidate) {
            return $http.put('/voting/' + candidate._id + '/upvote')
                .success(function(data) {
                    console.log("upvote worked");
                    candidate.upvotes += 1;
                });
        };

        $scope.addCandidate = function() {
            var newObj = { Name: $scope.formContent, Sales: 0, PictureURL: $scope.pictureURLContent, Price: $scope.priceContent };
            $scope.create(newObj);
            $scope.priceContent = '';
            $scope.pictureURLContent = '';
            $scope.formContent = '';
        }

        $scope.incrementUpvotes = function(candidate) {
            $scope.upvote(candidate);
        };

        $scope.delete = function(candidate) {
            console.log("Deleting Name " + candidate.Name + " ID " + candidate._id);
            $http.delete('/voting/' + candidate._id)
                .success(function(data) {
                    console.log("delete worked");
                });
            $scope.getAll();
        };
    }
]);

