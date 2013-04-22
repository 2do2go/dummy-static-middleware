'use strict';

var fs = require('fs');

module.exports = function(routes) {
	// validate routes
	if (!routes) throw new Error('Routes is not set');
	routes.forEach(function(route) {
		if (!isRegExp(route.url) && !isString(route.url)) {
			throw new Error(
				'Unregnozed url type of route: ' + JSON.stringify(route)
			);
		}
		if (!route.reply) {
			throw new Error(
				'`reply` for `url` ' +  route.url + ' is not set'
			);
		}
	});

	// middleware
	return function(req, res, next) {
		var reply = null;
		routes.forEach(function(route) {
			if (isRegExp(route.url)) {
				if (route.url.test(req.url)) reply = route.reply;
			} else if (isString(route.url)) {
				if (route.url == req.url) reply = route.reply;
			}
			if (reply) {
				fs.readFile(reply, function(err, content) {
					if (err) {
						next(err);
						return;
					}
					res.end(content);
				});
			}
		});
		if (!reply) next();
	}
};

function isRegExp(value) {
	return Object.prototype.toString.call(value) == '[object RegExp]';
}

function isString(value) {
	return Object.prototype.toString.call(value) == '[object String]';
}
