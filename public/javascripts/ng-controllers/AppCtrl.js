angular.module('PusherISS', ['pusher-angular']).controller('AppCtrl', ['$scope', '$http', '$pusher', function($scope, $http, $pusher){

	var client = new Pusher('fa15651bc1ad6c916fc7');
	var pusher = $pusher(client);
	var issChannel = pusher.subscribe('iss-channel');

	$scope.path = []

	issChannel.bind('new-location', function(data){
		console.log("Receiving event...")
		$scope.iss = data
		$scope.path.push([$scope.iss.iss_position.latitude, $scope.iss.iss_position.longitude])
	});

}]);