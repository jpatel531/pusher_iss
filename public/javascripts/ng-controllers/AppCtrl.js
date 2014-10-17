angular.module('PusherISS', ['pusher-angular']).controller('AppCtrl', ['$scope', '$http', '$pusher', function($scope, $http, $pusher){

	var client = new Pusher('fa15651bc1ad6c916fc7');
	var pusher = $pusher(client);
	var issChannel = pusher.subscribe('iss-channel');

	$scope.path = []

	$http.get('/api/location').success(function(data){
		$scope.iss = data;
	});

	issChannel.bind('new-location', function(data){
		console.log("Receiving event...")
		$scope.iss = data
		$scope.path.push([$scope.iss.iss_position.latitude, $scope.iss.iss_position.longitude])
	})

}]);

angular.module('PusherISS').directive('googleMap', function($timeout){

	return {
		link: function(scope, el, attrs){

			var map = new GMaps({
				div: attrs.id,
				zoom: 4,
				lat: 0,
				lng: 0
			});

			$timeout(function(){
				map.setCenter(scope.iss.iss_position.latitude, scope.iss.iss_position.longitude)
			}, 2000)


			scope.$watch('path', function(){

				map.drawPolyline({
					path: scope.path,
					strokeColor: 'black',
					strokeOpacity: 1,
					strokeWeight: 15
				});

			}, true);
		}
	}

});