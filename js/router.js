'use strict'

function Router(routes) {
	try {
		if (!routes) {
			throw 'error: routes param is mandatory'
		}
		this.constructor(routes);
		this.init();
	} catch (error) {
		console.error(error)
	}
}

Router.prototype = {
	routes: undefined, //It is an array containing the routes of our app.
	rootElem: undefined, //It is the root element of our application. The place where other HTML gets rendered.
	constructor: function (routes) {
		this.routes = routes;
		this.rootElem = document.querySelector('#app');
	},
	init: function () {
		let r = this.routes;
		(function (scope, r) {
			window.addEventListener('hashchange', function (e) {
				scope.hasChanged(scope, r)
			})
		})(this, r);
		this.hasChanged(this, r);
	},

	/**
	 * HasChanged:
	 * This function has two main responsibilities, both related to performing the correct @param {Route} Route  load. If the window location changes then it is going to load the correct active @param {Route} Route and call another function to load its HTML, if the window location is empty, it is going to load the default @param {Route} Route. This function receives two params, one is the scope of the @param {Router} Router instance and the other is the routes.
	 */

	hasChanged: function (scope, r) {
		if (window.location.hash.length > 0) {
			for (let i = 0, length = r.length; i < length; i++) {
				let route = r[i];
				if (route.isActiveRoute(window.location.hash.substring(1))) {
					scope.goToRoute(route.htmlName);
				}
			}
		}
		else {
			for (let i = 0, length = r.length; i < length; i++) {
				let route = r[i];
				if (route.default) {
					scope.goToRoute(route.htmlName);
				}
			}
		}
	},

	/**
	 * goToRoute
	 * This function has the responsibility of getting and loading the correct HTML for the active route. It receives the HTML name that it has to load and finally perform a request to get it. 
	 */

	goToRoute: function (htmlName) {
		(function (scope) {
			let url = 'views/' + htmlName,
				xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) {
					scope.rootElem.innerHTML = this.responseText;
				}
			};
			xhttp.open('GET', url, true);
			xhttp.send();
		})(this)
	}
}