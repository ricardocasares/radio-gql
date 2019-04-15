const fetch = require("isomorphic-unfetch");

const URL = "http://www.radio-browser.info/webservice";
const STATIONS = `/json/stations`;
const BY_ID = `${STATIONS}/byid`;
const BY_NAME = `${STATIONS}/byname`;

const cfg = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "bemba/radio-gql"
  },
  body: JSON.stringify({ order: "votes", reverse: "true", limit: 50 })
};

const get = async id =>
  fetch(`${URL}${BY_ID}/${id}`, cfg)
    .then(res => res.json())
    .then(([station]) => station);

const search = async name =>
  fetch(`${URL}${BY_NAME}/${name}`, cfg).then(res => res.json());

module.exports = {
  get,
  search
};
