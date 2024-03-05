import express from "express";
import bodyParser from "body-parser";
import { haircuts } from "../model/index.js";

const haircutRouter = express.Router();

//fetch all haircuts
haircutRouter.get("/", (req, res) => {
  try {
    haircuts.fetchHaircuts(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve a haircut",
    });
  }
});
haircutRouter.get("/:id", (req, res) => {
  try {
    haircuts.fetchHaircut(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve a haircut",
    });
  }
});
haircutRouter.post("/addHaircut", bodyParser.json(), (req, res) => {
  try {
    haircuts.addHaircut(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to add haircut",
    });
  }
});

haircutRouter.delete("/delete/:id", (req, res) => {
  try {
    haircuts.deleteHaircut(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to delete haircut",
    });
  }
});
haircutRouter.patch("/update/:id", bodyParser.json(), (req, res) => {
  try {
    haircuts.updateHaircut(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to update Haircut",
    });
  }
});
export { haircutRouter };
