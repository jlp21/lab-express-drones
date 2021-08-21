const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model");

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then(allDronesFromDB => {
      console.log("drones:", allDronesFromDB);

      res.render("../views/drones/list", {
        drones: allDronesFromDB,
        numberOfDrones: allDronesFromDB.length
      });
    })
    .catch(error => console.log("An error occurred while getting drones from database: ", error))
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("../views/drones/create-form.hbs");
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const {
    name,
    propellers,
    maxSpeed
  } = req.body;

  Drone.create({
      name,
      propellers,
      maxSpeed
    })
    .then(newDrone => {

      res.redirect("/drones")
    })
    .catch(error => {
      console.log("An error occurred while getting drones from database: ", error)
      res.redirect("/views/drones/create-form.hbs")
    })
});

router.get('/drones/:id/update', (req, res, next) => {
  // Iteration #4: Update the drone
  Drone.findById(req.params.id)
    .then(droneToBeEdited => {
      res.render("drones/update-form", droneToBeEdited)
    })
});

router.post('/drones/:id/update', (req, res, next) => {
  // Iteration #4: Update the drone
  const {
    name,
    propellers,
    maxSpeed
  } = req.body;

  Drone.findByIdAndUpdate(req.params.id, {
      name,
      propellers,
      maxSpeed
    }, {
      new: true
    })
    .then(updatedDrone => {
      console.log("is this updated >>>>> ", updatedDrone);

      res.redirect("/drones");
    })
    .catch(error => console.log("An error occurred while updating a drone in the database: ", error));

});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone

  Drone.findByIdAndDelete(req.params.id)
    .then(() => {
        res.redirect("/drones");
    })
    .catch(error => console.log("An error occurred while deleting a drone from the database: ", error ));

});

module.exports = router;