angular.module('PusherISS').directive('issMap', function($timeout){

	return {
		link: function(scope, el, attrs){

			var marker;
			
			var map = new GMaps({
				div: attrs.id,
				zoom: 4,
				lat: 0,
				lng: 0
			});

			$timeout(function(){
				map.setCenter(scope.iss.iss_position.latitude, scope.iss.iss_position.longitude)
				marker = map.addMarker({
				    lat: scope.iss.iss_position.latitude,
				    lng: scope.iss.iss_position.longitude,
					icon: "/images/iss75.png"
				});
			}, 2000)


			scope.$watch('path', function(){
				var latlng = new google.maps.LatLng(scope.iss.iss_position.latitude, scope.iss.iss_position.longitude);
				marker.setPosition(latlng);

				map.drawPolyline({
					path: scope.path,
					strokeColor: 'black',
					strokeOpacity: 0.1,
					strokeWeight: 5
				});
			}, true);
		}
	}

});