const furaffinity = require('./');
furaffinity.recent(furaffinity.types.artwork, 1).then(data => {
	console.log(data);
}).catch(err => console.log(err));