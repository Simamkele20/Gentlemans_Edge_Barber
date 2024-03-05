import express from "express";
import bodyParser from "body-parser";
import { stylists } from "../model/index.js";

const stylistRouter = express.Router();

//fetch all haircuts
stylistRouter.get("/", (req, res) => {
  try {
    stylists.fetchStylists(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve a stylists",
    });
  }
});
stylistRouter.get("/:id", (req, res) => {
  try {
    stylists.fetchStylists(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve a stylist",
    });
  }
});
stylistRouter.post("/addStylist", bodyParser.json(), (req, res) => {
  try {
    stylists.addStylist(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to add stylist",
    });
  }
});

stylistRouter.delete("/delete/:id", (req, res) => {
  try {
    stylists.deleteStylist(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to delete stylist",
    });
  }
});
stylistRouter.patch("/update/:id", bodyParser.json(), (req, res) => {
  try {
    stylists.updateStylist(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to update stylist",
    });
  }
});
export { stylistRouter };
