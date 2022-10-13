'use strict'

function Route(name, htmlName, defaultRoute) {
	try {
		if (!name || !htmlName) {
			throw 'error: name and htmlName params are mandatories';
		}
		this.constructor(name, htmlName, defaultRoute);
	} catch (e) {
		console.error(e);
	}
}

Route.prototype = {
	name: undefined,
	htmlName: undefined,
	default: undefined,
	constructor: function (name, htmlName, defaultRouter) {
		this.name = name; //Is the name of our route, we are going to use it to check if the route is the active one.
		this.htmlName = htmlName; //Is the name of the HTML to load with the route.
		this.default = defaultRouter; //if the route is the default route of our app.
	},
	isActiveRoute: function (hashedPath) {
		//A function provided by each route to check if it’s the active one. It receives the actual window location.
		return hashedPath.replace('#', '') === this.name;
	}
}