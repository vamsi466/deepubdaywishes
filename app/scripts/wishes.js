  (function(){
      angular.module('wish',[])
      .service('shuffleItems', function() {
        this.shuffle = function (array) {
          var arrayCopy = angular.copy(array);
          var len = arrayCopy.length;
          var newArray = [];
          while(len > 0){
            var i = Math.floor(Math.random() * len);
            newArray.push(arrayCopy[i]);
            arrayCopy.splice(i,1);
            len--;
          }
          return newArray;
        }
    })
      .controller("flipPhoto",['$scope','shuffleItems','$timeout','$interval', function($scope,shuffleItems,$timeout,$interval){
          var initialArr = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg','19.jpg','20.jpg'];
          $scope.imagesArr = shuffleItems.shuffle(initialArr)
          $scope.displayPicFrame = true;
            var iCtrl = 0;
            $scope.imageDisplayed = $scope.imagesArr[iCtrl];
           var intervalTime =  $interval(function(){
                iCtrl++;
                if(iCtrl%2 == 0){
                  $timeout(function() {
                  $scope.imageDisplayed = $scope.imagesArr[iCtrl];
                  }, 3000);
                }else{
                  $scope.imageDisplayed = $scope.imagesArr[iCtrl];
                }
                  if(iCtrl == initialArr.length){
                    clearInterval(intervalTime);
                    $scope.displayPicFrame = false;
                  }
          },8000)
       }]);
  })();