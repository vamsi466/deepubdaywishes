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
      .controller("flipPhoto",['$scope','shuffleItems','$timeout', function($scope,shuffleItems,$timeout){
          var initialArr = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg','19.jpg','20.jpg'];
          $scope.imagesArr = shuffleItems.shuffle(initialArr)
          console.log($scope.imagesArr)
          for(var iCtrl = 0;iCtrl< $scope.imagesArr.length;iCtrl++){  
            (function(iCtrl){  // i will now become available for the someMethod to call
               $( "#picture" ).removeClass( "flip" );
               $timeout(function() {
                    imageDisplay(iCtrl);
                }, iCtrl * 5000);
               
            })(iCtrl); 
            $( "#picture" ).removeClass( "flip" );
          }
           function imageDisplay(iCtrl){
                $( "#picture" ).addClass( "flip" );
                $scope.imageDisplayed = $scope.imagesArr[iCtrl];   
           }
      }]);
  })();