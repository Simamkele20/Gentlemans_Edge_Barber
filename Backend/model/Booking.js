import { connection as db } from "../config/index.js";
import { hash, compare } from "bcrypt";
class Bookings {
  // All bookings
  fetchBookings(req, res) {
    const qry = `
        SELECT
        bookID,
        bookDay,
        bookStart,
        bookEnd,
        servName,
        employeeFullname,
        bookID
        FROM Bookings
        
        `;
    db.query(qry, (err, results) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        results,
      });
    });
  }

  //   one booking
  fetchBooking(req, res) {
    const qry = `
      SELECT
      bookID,
      bookDay,
      bookStart,
      bookEnd,
      servName,
      employeeFullname,
      bookID
      FROM Bookings
     WHERE bookID = ${req.params.id}
          `;
    db.query(qry, (err, result) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        result: result[0],
      });
    });
  }

  // add Booking
  async addBooking(req, res) {
    let data = req.body;
    let user = {
      bookDay: data.bookDay,
      bookStart: data.bookStart,
      bookEnd: data.bookEnd,
    };

    // Check if the booking details already exist
    const checkAvailablity = `
      SELECT bookID
      FROM Bookings
      WHERE bookDay = ? AND bookStart = ? AND bookEnd = ?;
    `;

    db.query(
      checkAvailablity,
      [user.bookDay, user.bookStart, user.bookEnd],
      (err, results) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Error checking booking existence" });
        }

        if (results.length > 0) {
          // Booking details already exist
          return res.json({
            status: res.statusCode,
            msg: "The booking details already exist.",
          });
        }

        // Insert the new booking into the database
        const insertBooking = `
        INSERT INTO Bookings (bookDay, bookStart, bookEnd,servName,employeeFullname)
        VALUES (?, ?, ?,?,?);
      `;

        db.query(
          insertBooking,
          [user.bookDay, user.bookStart, user.bookEnd],
          (err) => {
            if (err) {
              console.error(insertErr);
              return res.status(500).json({ error: "Error adding booking" });
            }

            res.json({
              status: res.statusCode,
              details: user,
              msg: "Booking added successfully.",
            });
          }
        );
      }
    );
  }

  //   delete Booking

  deleteBooking(req, res) {
    const qry = `
     DELETE FROM Bookings
     WHERE bookID=${req.params.id}
  `;
    db.query(qry, (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Booking deleted",
      });
    });
  }

  async updateBooking(req, res) {
    const data = req.body;
    if (data?.userPwd) {
      data.userPwd = await hash(data?.userPwd, 8);
    }
    const qry = `
    UPDATE Bookings
    SET ?
    WHERE bookID=${req.params.id};`;
    db.query(qry, [data], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Booking updated",
      });
    });
  }
}

export { Bookings };

// resDate and servID
