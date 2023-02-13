const { parks, rides, stalls } = require("./data/index.js");
const { arrangeParksData, formatRides, arrangeRidesData } = require("../utils");
const format = require("pg-format");

const db = require("./connection");

function seed() {
  return db
    .query("DROP TABLE IF EXISTS rides;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS stalls;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS foods;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS stalls_foods;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS parks;");
    })
    .then(() => {
      return createParks();
    })
    .then(() => {
      return createRides();
    })
    .then(() => {
      return insertParks();
    })
    .then(({ rows }) => {
      const parks = rows;
      return insertRides(rides, parks);
    })
    .then((response) => {
      // console.log(response.rows);
    });
}

function createParks() {
  return db.query(
    "CREATE TABLE parks (park_id SERIAL PRIMARY KEY, park_name VARCHAR(40), year_opened INT NOT NULL, annual_attendance INT NOT NULL);"
  );
}

function createRides() {
  return db.query(
    "CREATE TABLE rides (ride_id SERIAL PRIMARY KEY, park_id INT REFERENCES parks(park_id), ride_name VARCHAR(40), year_opened INT, votes INT NOT NULL)"
  );
}

function insertParks() {
  const parksData = arrangeParksData(parks);
  parksInsertStr = format(
    "INSERT INTO parks (park_name, year_opened, annual_attendance) VALUES %L RETURNING *;",
    parksData
  );

  return db.query(parksInsertStr);
}

function insertRides(rides, parks) {
  const formattedRides = formatRides(rides, parks);
  const ridesData = arrangeRidesData(formattedRides);
  ridesInsertStr = format(
    "INSERT INTO RIDES (ride_name, year_opened, votes, park_id) VALUES %L RETURNING *;",
    ridesData
  );
  return db.query(ridesInsertStr);
}

module.exports = { seed };
