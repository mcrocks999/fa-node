const endpoint = 'https://www.furaffinity.net/';
const request = require('request');

module.exports = {
    home: () => {
        return new Promise((resolve, reject) => {
            request(endpoint, function (err, res, body) {
				if (err) return reject(err);
				resolve(body);
			});
        });
    },
    search: (query) => {
        return new Promise((resolve, reject) => {
            request.post({
                url: endpoint+'search',
                form: {
                    query
                }
            }, function(err, res, body) {
				if (err) return reject(err);
				resolve(body);
			});
        });
    }
};