import express from "express";
import bodyParser from "body-parser";
import { bookings } from "../model/index.js";
import { verifyToken } from "../middleware/AuthenticateUser.js";

const bookingRouter = express.Router();

//fetch all bookings
bookingRouter.get("/", verifyToken,(req, res) => {
  try {
    bookings.fetchBookings(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve a booking",
    });
  }
});
// fetch booking
  bookingRouter.get("/:id", verifyToken, (req, res) => {
    try {
        bookings.fetchBooking(req, res);
    } catch (e) {
      res.json({
        status: res.statusCode,
        msg: "failed to retrieve a booking",
      });
    }
  });

// add booking
bookingRouter.post("/addBooking",verifyToken, bodyParser.json(), (req, res) => {
  try {
    bookings.addBooking(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to add booking",
    });
  }
});

//   delete booking
bookingRouter.delete("/delete/:id", verifyToken, (req, res) => {
  try {
    bookings.deleteBooking(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to delete booking",
    });
  }
});

//   update booking
bookingRouter.patch("/update/:id",verifyToken, bodyParser.json(), (req, res) => {
  try {
    bookings.updateBooking(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to update Booking",
    });
  }
});

export { bookingRouter };
