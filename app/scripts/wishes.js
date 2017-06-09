(function () {
  angular.module('wish', [])
    .service('shuffleItems', function () {
      this.shuffle = function (array) {
        var arrayCopy = angular.copy(array);
        var len = arrayCopy.length;
        var newArray = [];
        while (len > 0) {
          var i = Math.floor(Math.random() * len);
          newArray.push(arrayCopy[i]);
          arrayCopy.splice(i, 1);
          len--;
        }
        return newArray;
      }
    })
    .factory('ajaxcallservice', ['$http', function ($http) {
      return {
        getWishes: function (JSONpath) {
          return $http.get(JSONpath).then(function (response) { //wrap it inside another promise using then
            return response.data.videos;  //only return employees
          });
        }
      }
    }])
    .controller("flipPhoto", ['$scope', 'shuffleItems', '$timeout', '$interval', 'ajaxcallservice', function ($scope, shuffleItems, $timeout, $interval, ajaxcallservice) {
      var initialArr = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
      var namesIniArr = ['Deepika', 'Dimple Queen', 'Campus Beauty(CB)', 'Mouni', 'Strawberry', 'Deepu', 'Mani', 'Deeksha', 'Papam from Polavaram', 'Sotta Buggala Sundari']
      $scope.quotesArr = ["Nee Chirunavvutho chinukulu saitam kurpinchagalavu, Nee Sottabuggala lo samudrani saitam nimpagalavu", "Aa deepam lo ayna nune lekunda chudagalam kani, Ee deepika moham lo navvu lekunda chudalem", "Manishi: Oy Chirunavvu nuvu ekkada vuntavu ante, Chirunavvu: Na C/O Address Manideepika face ani anade"]
      // var videosArr = ["Sreelatha", "Roja", "Suma", "Sravya and Madhu", "Vinitha", "Nidhi", "Hema", "Ramya", "Sravanthi", "Jenny", "Mahalakshmi", "Raghavendra", "Namratha", "Gnaneshwari", "Praneeth", "Nandini", "Santu", "Latha", "Charan", "Soni", "Amma", "Nanna"]
      ajaxcallservice.getWishes('app/json/videos.json').then(function (response) {
        $scope.videosArr = response; //Assign data received to $scope.employees
      });



      $scope.namesArr = shuffleItems.shuffle(namesIniArr);
      $scope.imagesArr = shuffleItems.shuffle(initialArr);
      $scope.displayPicFrame = true;
      $scope.displayNames = true;
      $scope.displayVideoFrame = false;
      $scope.check = true;
      var videoPlayer = document.getElementById("myvideo")
      $scope.playIt = function () {
        if ($scope.check) {
          videoPlayer.pause();
        } else {
          videoPlayer.play();
        }

      }

      var iCtrl = 0;
      var nameCtrl = 0;
      var quotesCtrl = -1;
      $scope.textArr = [];
      $scope.nameDisplayed = $scope.namesArr[nameCtrl];
      $scope.imageDisplayed = $scope.imagesArr[iCtrl];

      var intervalTime = $interval(function () {
        iCtrl++;
        nameCtrl++;
        var textDisplayed = "";
        if (nameCtrl < $scope.namesArr.length) {
          $scope.nameDisplayed = $scope.namesArr[nameCtrl];
        } else {
          quotesCtrl++
          $scope.displayNames = false;
          if (quotesCtrl < $scope.quotesArr.length) {

            var textDisplayed = $scope.quotesArr[quotesCtrl];
            console.log($scope.quotesArr[quotesCtrl])
            console.log(textDisplayed);
            $scope.textArr = textDisplayed.split(',');
            $scope.line1 = $scope.textArr[0],
              $scope.line2 = $scope.textArr[1];
            console.log($scope.textArr)
          }

        }

        if (iCtrl % 2 == 0) {
          $timeout(function () {
            $scope.imageDisplayed = $scope.imagesArr[iCtrl];
          }, 3000);
        } else {
          $scope.imageDisplayed = $scope.imagesArr[iCtrl];
        }
        if (iCtrl == initialArr.length) {
          $interval.cancel(intervalTime);
          $timeout(function () {
            $scope.displayPicFrame = false;
          }, 2000);
        }
      }, 8000)
    }]);
})();