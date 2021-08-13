const http = require('http');
const qs = require('qs');
const fetch = require('node-fetch');

const fetchRequest = async (endpoint, { data, token, headers, ...customConfig }) => {
  const config = {
    // use GET as default method
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
      ...headers,
    },

    // if customConfig has 'method' attribute,
    // it will override the default GET method
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return fetch(endpoint, config)
    .then(async (response) => {
      const responseData = await response.json().catch((error) => {
        console.warn(`Data is not a JSON object: ${error.message}`);
      });
      if (response.ok) {
        return Promise.resolve(responseData);
      } else {
        return Promise.reject(response.status);
      }
    })
    .catch(async (error) => {
      return Promise.reject(error.message);
    })
}

module.exports = { fetchRequest };
