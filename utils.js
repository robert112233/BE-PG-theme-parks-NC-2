const ridesData = require("./db/data/rides");

function arrangeParksData(parksData) {
  parksArr = parksData.map((park) => {
    return [park.park_name, park.year_opened, park.annual_attendance];
  });
  return parksArr;
}

function formatRides(rides, parks) {
  console.log(rides);
  formatted = rides.map((ride) => {
    correspondingPark = parks.filter((park) => {
      return park.park_name === ride.park_name;
    });

    ride.park_id = correspondingPark[0].park_id;
    delete ride.park_name;
    return ride;
  });
  return formatted;
}

function arrangeRidesData(ridesData) {
  ridesArr = ridesData.map((ride) => {
    return [ride.ride_name, ride.year_opened, ride.votes, ride.park_id];
  });
  return ridesArr;
}

module.exports = { arrangeParksData, formatRides, arrangeRidesData };
