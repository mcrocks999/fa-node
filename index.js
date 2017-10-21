/*
* FurAffinity for NodeJS
* Supports getting most recent results and searching up content
*/
const cheerio = require('cheerio'), request = require('request');

function req(url, method, callback, q) {
	switch (method) {
		case 'POST':
			request.post({url:'https://www.furaffinity.net/search/', form: {q}}, function(err,httpResponse,body) {
				if (err) return callback(false,err);
				if (settings.cache.enabled) cache[url+'?q='+q] = {expire:now+settings.cache.seconds,body};
				callback(body);
			});
			break;
		case 'GET':
			request('https://furaffinity.net', function (err, response, body) {
				if (err) return callback(false,err);
				if (settings.cache.enabled) cache[url+'?q='+q] = {expire:now+settings.cache.seconds,body};
				callback(body);
			});
			break;
	}
}
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function figure(s,l = 100) {
	if (s.length<1) {
		return {success:false,error:'No content found!'};
	};
	var figures = [];
	for (var i=0;i<s.length;i++) {
		var a = cheerio.load(s.eq(i).first().toString());
		var data = {
			src: 'https:'+a('img').first().attr('src'),
			url: 'https://furaffinity.net'+a('a').first().attr('href'),
			title: a('a').eq(1).first().attr('title'),
			artist: {
				name: a('a').last().attr('title'),
				url: 'https://furaffinity.net'+a('a').last().attr('href')
			}
		};
		figures.push(data);
	}
	figures = shuffleArray(figures);
	figures = figures.splice(0,l);
	return {success:true,figures};
}
function get_recent(type,limit,callback) {
	req('https://furaffinity.net', 'GET', function(body,err) {
		if (err) return callback({success:false,error:'Could not connect!'});
		const $ = cheerio.load(body);
		if (type<4) {
			var artwork = $('.old-table-emulation').eq(type).first().children('div.body').first().children('section').first().children();
			const $$ = cheerio.load(artwork.toString());
			var a = $$('figure.r-general');
		} else {
			var a = $('figure.r-general');
		}
		callback(figure(a,limit));
	});
}
function get_search(q,limit,callback) {
	req('https://www.furaffinity.net/search/', 'POST', function(body,err) {
		if (err) return callback({success:false,error:'Could not connect!'});
		const $ = cheerio.load(body);
		var s = $('figure.r-general.t-image');
		callback(figure(s,limit));
	}, q);
}
module.exports = {
	settings,
	recent: function (type,limit,callback) {
		switch (type) {
			case 'artwork': get_recent(0,limit,callback); break;
			case 'writing': get_recent(1,limit,callback); break;
			case 'music': get_recent(2,limit,callback); break;
			case 'crafts': get_recent(3,limit,callback); break;
			case 'any': get_recent(4,limit,callback); break;
			default:
				callback({success:false,error:'That is not a valid type!'});
		}
	},
	search: function (query,limit,callback) {
		get_search(query,limit,callback);
	}
};