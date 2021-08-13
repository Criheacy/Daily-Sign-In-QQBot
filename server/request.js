const http = require('http');

const httpRequest = (url) => {
	return new Promise((resolve, reject) => {
		http.get(url, response => {
			let data = "";
			response.on('data', (chuck) => {
				data += chuck;
			})
			response.on('end', () => {
				resolve(data);
			})
		}).on("error", (error) => {
			reject(error);
		})
	});
};

module.exports = { httpRequest };