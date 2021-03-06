# Realtime International Space Station API with AngularJS

![Image 2](https://raw.githubusercontent.com/jpatel531/pusher_iss/master/screenshots/header.jpg)

It's my first week at Pusher and, intrigued by Pusher's [realtime Reddit feed](http://blog.pusher.com/pusher-realtime-reddit-api/), I wanted to have a go at making my first Websockets API. Being a huge fan of AngularJS, I also wanted to see for myself how simple it is to make the framework realtime with Pusher's new Angular library. 

NASA, with space always being one of my great fascinations, seemed a natural place to turn to. Upon visiting NASA's data bank, I found that [Open-Notify.org had crunched NASA's raw International Space Station location data into a JSON API](http://open-notify.org/Open-Notify-API/ISS-Location-Now/). Perfect, I thought, as it would be a chance to get some frequently updated data and stream it with the power of Websockets.

## Using The API With AngularJS

Firstly, we need to include AngularJS, Pusher, and Pusher-Angular within our HTML file. 

```html
<!-- AngularJS -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-rc.0/angular.min.js"></script>

<!-- pusher-js -->
<script src="//js.pusher.com/2.2/pusher.min.js"></script>

<!-- pusher-angular -->
<script src="//cdn.jsdelivr.net/angular.pusher/latest/pusher-angular.min.js"></script>
```

Now in our javascript we need to set up an Angular application and controller.

```javascript
// Inject 'pusher-angular' as a dependency
angular.module('MyApp', ['pusher-angular'] )

// Then inject the $pusher service into MyCtrl

.controller('MyCtrl', ['$scope', '$pusher', function($scope, $pusher){
	// code goes here...
}]);
```

Within our controller, setting up our Pusher client to talk to the API should be fairly straightforward. Simply instantiate a new Pusher object (with the key for the ISS API), and pass it into the `$pusher` service.

```javascript
var client = new Pusher('fa15651bc1ad6c916fc7');
var pusher = $pusher(client);
```

Now let's have our Pusher client subscribe to the International Space Station channel:

```javascript
var issChannel = pusher.subscribe('iss-channel');
```

Now we can log out the data from the 'new-location' event triggered by the API in realtime:

```javascript
issChannel.bind('new-location', function(iss){
	console.log(iss);
});
```
In the console, this will print out:

```javascript
{
	"timestamp":1414058029,
	"message":"success",
	"iss_position":
		{
			"latitude":-31.90622125481199,
			"longitude":-25.751114321984957
		}
}
```

And there you have it: a live feed of the whereabouts of the International Space Station using Pusher and AngularJS.

##Try The Demo And Build Something!

Check out [Where Is The ISS?](http://where-is-the-iss.herokuapp.com) to have a peek at the demo. It tracks the coordinates of the International Space Station on a map, while below you can see NASA's live stream of shots taken by cameras on the exterior of the station.

![Image 1](https://raw.githubusercontent.com/jpatel531/pusher_iss/master/screenshots/iss.gif)

Feel more than free to make your own application with this API and [let us know when you have](https://twitter.com/pusher). We'd love to see what more you can do with it!

If you're an Angular-lover and are thinking of combining it with Pusher, head on over to the [Pusher-Angular Github Page](https://github.com/pusher/pusher-angular) to find more ways to power your app with realtime.


