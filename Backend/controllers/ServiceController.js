import express from "express";
import bodyParser from "body-parser";
import { services } from "../model/index.js";

const serviceRouter = express.Router();

//fetch all haircuts
serviceRouter.get("/", (req, res) => {
  try {
    services.fetchServices(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve a service",
    });
  }
});
serviceRouter.get("/:id", (req, res) => {
  try {
    services.fetchService(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve a service",
    });
  }
});
serviceRouter.post("/addService", bodyParser.json(), (req, res) => {
  try {
    services.addService(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to add service",
    });
  }
});

serviceRouter.delete("/delete/:id", (req, res) => {
  try {
    services.deleteService(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to delete service",
    });
  }
});
serviceRouter.patch("/update/:id", bodyParser.json(), (req, res) => {
  try {
    services.updateService(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to update service",
    });
  }
});

export { serviceRouter };
