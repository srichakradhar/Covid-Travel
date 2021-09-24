const express = require("express");
const States = require("../mongoose/models/states");

//setting the router for guidelines
const statesRouter = express.Router();

//getting the guideline of a state
statesRouter.get("/api/states/:state", async (req, res) => {
    try {
        const state = await States.findOne({
            state: req.params.state,
        });
        let list = [];
        if(req.query.search === "guidelines") {
            state.guidelines.forEach((guideline) => {
                list.push(guideline.guideline)
            })
            res.send(list);
        } else if (req.query.search === "spots") {
            state.tourist_spots.forEach((spot) => {
                list.push(spot.spot);
            });
            res.send(list);
        } else if (req.query.search === "descriptions") {
            state.descriptions.forEach((point) => {
                list.push(point.point);
            });
            res.send(list);
        } else {
            throw new Error("Please enter a valid query parameter")
        }
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

module.exports = statesRouter;