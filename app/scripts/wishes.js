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
          var namesIniArr = ['Deepika','Dimple Queen','Campus Beauty(CB)','Mouni','Strawberry','Deepu','Mani','Deeksha','Papam from Polavaram','Sotta Buggala Sundari']
          var videosArr = ["Sreelatha","Roja","Suma","Sravya and Madhu","Vinitha","Nidhi","Hema","Ramya","Sravanthi","Jenny","Mahalakshmi","Raghavendra","Namratha","Gnaneshwari","Praneeth","Nandini","Santu","Latha","Charan","Soni","Amma","Nanna"]
          $scope.namesArr = shuffleItems.shuffle(namesIniArr);
          $scope.imagesArr = shuffleItems.shuffle(initialArr);
          $scope.displayPicFrame = true;
          $scope.displayVideoFrame = false;
         
            var iCtrl = 0;
            var nameCtrl = 0;
            $scope.nameDisplayed = $scope.namesArr[nameCtrl];
            $scope.imageDisplayed = $scope.imagesArr[iCtrl];

          //  var intervalTime =  $interval(function(){
          //       iCtrl++;
          //       nameCtrl++;
          //       $scope.nameDisplayed = $scope.namesArr[nameCtrl];
          //       if(iCtrl%2 == 0){ 
          //         $timeout(function() {
          //         $scope.imageDisplayed = $scope.imagesArr[iCtrl];
          //         }, 3000);
          //       }else{
          //         $scope.imageDisplayed = $scope.imagesArr[iCtrl];
          //       }
          //         if(iCtrl == initialArr.length){
          //           $interval.cancel(intervalTime);
          //           $scope.displayPicFrame = false;
          //           // playVideo();
          //         }
          // },8000)

          (function playVideo(){
            $scope.videoBy = 'app/videos/'+videosArr[0]+'.mp4';
            
            console.log($scope.videoBy)
            
          })();
       }]);
  })();