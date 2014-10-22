angular.module('PusherISS').directive('googleMap', function($timeout){

	return {
		link: function(scope, el, attrs){

			var map = new GMaps({
				div: attrs.id,
				zoom: 4,
				lat: 0,
				lng: 0
			});

			var marker;

			var image = {
				url: "/images/iss75.png",
				// size: new google.maps.Size(50,50),
			    // origin: new google.maps.Point(100,100),
			}

			$timeout(function(){
				map.setCenter(scope.iss.iss_position.latitude, scope.iss.iss_position.longitude)
				marker = map.addMarker({
				    lat: scope.iss.iss_position.latitude,
				    lng: scope.iss.iss_position.longitude,
					icon: image
				});
			}, 2000)


			scope.$watch('path', function(){
				// map.removeMarkers();
				var latlng = new google.maps.LatLng(scope.iss.iss_position.latitude, scope.iss.iss_position.longitude);
				marker.setPosition(latlng);

				// map.drawPolyline({
				// 	path: scope.path,
				// 	strokeColor: 'black',
				// 	strokeOpacity: 1,
				// 	strokeWeight: 15
				// });
			}, true);
		}
	}

});