const db = require("../db/connection");

exports.selectParks = () => {
  return db.query("SELECT * FROM parks").then((response) => {
    return response.rows;
  });
};

exports.removeParkById = () => {};

exports.updateParkById = () => {};
