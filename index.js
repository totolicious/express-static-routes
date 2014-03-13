module.exports = {
	setRoute: function(app, route) {
	  app.get(route.url_path, function(req, res) {
	    res.render(route.view, { layout: route.layout || req.app.get('layout') || "default_route" })
	  });
	},
	setup: function(app, routes) {
		var i;
	
		for (i=0; i<routes.length; i++) {
		  this.setRoute(app, routes[i]);
		}
	},
	buildSetup: function (app, routes) {
		var i;

		for (i=0; i<routes.length; i++) {
			if (!routes[i].url_path || !routes[i].url_path.length) {
				throw new Error("Route 'url_path' key is missing or value is empty string");
			}
			if (!routes[i].view || !routes[i].view.length) {
				throw new Error("Route 'view' key is missing or value is empty string");
			}
			if ('layout' in routes[i] && !routes[i].layout.length) {
				throw new Error("Route 'layout' key is empty string");
			}

			if (routes[i].url_path.lastIndexOf("/") == routes[i].url_path.length-1) {
				routes[i].url_path += "index.html";
			} else {
				routes[i].url_path += ".html";
			}
		}
		
		this.setup(app, routes);
	}
}