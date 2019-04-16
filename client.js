const { encode } = require("querystring");
const fetch = require("isomorphic-unfetch");

const URL = "http://www.radio-browser.info/webservice";
const STATIONS = `/json/stations`;
const BY_ID = `${URL}${STATIONS}/byid`;
const SEARCH = `${URL}${STATIONS}/search`;

const request = (url, query = {}, pagination = {}) =>
  console.log([url, "?", encode(query)].join("")) ||
  fetch([url, "?", encode(query)].join(""), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "bemba/radio-gql"
    },
    body: JSON.stringify({
      order: "votes",
      reverse: "true",
      limit: 50,
      ...pagination
    })
  }).then(res => res.json());

const get = id => request(`${BY_ID}/${id}`).then(([station]) => station);
const search = ({ query, pagination }) =>
  request(`${SEARCH}`, query, pagination);

module.exports = {
  get,
  search
};
