import express from "express";
import bodyParser from "body-parser";
import { staff } from "../model/index.js";

const staffRouter = express.Router();
//fetch use
staffRouter.get("/", (req, res) => {
  try {
    staff.fetchStaff(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve staff",
    });
  }
});
//fetch employee
staffRouter.get("/:id", (req, res) => {
  try {
    staff.fetchEmployee(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve a employee",
    });
  }
});
//add a user
staffRouter.post("/addEmployee", bodyParser.json(), (req, res) => {
  try {
    staff.addEmployee(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to add new employee",
    });
  }
});

// delete
staffRouter.delete("/delete/:id", (req, res) => {
  try {
    staff.deleteEmployee(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to delete new employee",
    });
  }
});
// update
staffRouter.patch("/update/:id", bodyParser.json(), (req, res) => {
  try {
    staff.updateEmployee(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to update employee",
    });
  }
});

export { staffRouter, express };
