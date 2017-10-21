/*
* FurAffinity for NodeJS
* Supports getting most recent results and searching up content
*/
const cheerio = require('cheerio'),
	retrieve = require('./retrieve'),
	{ shuffleArray } = require('./util');

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
	retrieve.search(q).then()
	req('https://www.furaffinity.net/search/', 'POST', function(body,err) {
		if (err) return callback({success:false,error:'Could not connect!'});
		const $ = cheerio.load(body);
		var s = $('figure.r-general.t-image');
		callback(figure(s,limit));
	}, q);
}

function recent(type, limit) {
	return new Promise((resolve, reject) => {
		if (type<0 || type>types.length-1) return reject(null, 'Not a valid type!');
		retrieve.recent(type).then(data => {
			
		}).catch(err => {
			reject(err);
		});
	});
}

function search(query, limit) {
	return new Promise((resolve, reject) => {
		retrieve.search(query).then(data => {
			
		}).catch(err => {
			reject(err);
		});
	});
}

const types = {
	artwork: 0,
	writing: 1,
	music: 2,
	crafts: 3,
	any: 4
};

module.exports = {
	types, search, recent
};