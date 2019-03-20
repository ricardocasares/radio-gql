const fetch = require("isomorphic-unfetch");

const URL = "http://www.radio-browser.info/webservice";
const BY_NAME = "/json/stations/byname";
const SERVICE = `${URL}/${BY_NAME}`;
const cfg = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "bemba/radio-gql"
  },
  body: JSON.stringify({ order: "votes", reverse: "true", limit: 50 })
};

async function search(name) {
  return fetch(`${SERVICE}/${name}`, cfg).then(res => res.json());
}

module.exports = {
  search
};
