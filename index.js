/*
* FurAffinity for NodeJS
* Supports getting most recent results and searching up content
*/
const parser = require('./parser'),
	retrieve = require('./retrieve');

function recent(type, limit) {
	return new Promise((resolve, reject) => {
		if (type<0 || type>types.length-1) return reject(null, 'Not a valid type!');
		retrieve.home().then(data => {
			parser.recents(data, type, limit).then(x => {
				resolve(x);
			}).catch(err => reject(err));
		}).catch(err => {
			reject(err);
		});
	});
}

function search(query, limit) {
	return new Promise((resolve, reject) => {
		retrieve.search(query).then(data => {
			parser.search(data, limit).then(x => {
				resolve(x);
			}).catch(err => reject(err));
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