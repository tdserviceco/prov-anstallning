'use strict';
(function () {
	function init() {
		localStorage.setItem('gallery', []);

		new Router([
			new Route('home', 'home.html', true),
			new Route('gallery', 'gallery.html'),
			new Route('search', 'search.html')
		])
	}
	init()
}());