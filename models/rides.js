const format = require("pg-format");
const db = require("../db/connection");

exports.selectRidesByParkId = (id) => {
  const queryStr = format("SELECT * FROM rides WHERE park_id = %L", id);
  return db.query(queryStr).then((response) => {
    return response.rows;
  });
};
