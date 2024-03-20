import express from "express";
import bodyParser from "body-parser";
import { bookings } from "../model/index.js";
import { verifyToken } from "../middleware/AuthenticateUser.js";

const bookingRouter = express.Router();

//fetch all bookings
bookingRouter.get("/", (req, res) => {
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
  bookingRouter.get("/users/:id", (req, res) => {
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
bookingRouter.post("/addBooking",bodyParser.json(), (req, res) => {
  try {
    bookings.addBooking(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to add booking",
    });
  }
});
// delete all bookings
bookingRouter.delete("/deleteAll", (req, res) => {
    try {
        bookings.deleteAllBookings(req, res);
    } catch (e) {
        res.json({
            status: res.statusCode,
            msg: "Failed to delete all bookings",
        });
    }
});

//   delete booking
bookingRouter.delete("/delete/:id",  (req, res) => {
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
bookingRouter.patch("/update/:id",bodyParser.json(), (req, res) => {
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
