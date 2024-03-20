import { connection as db } from "../config/index.js";
import { hash, compare } from "bcrypt";
class Bookings {
  // All bookings
  fetchBookings(req, res) {
    const qry = `
        SELECT
        bookID,
        bookDay,
        bookTime,
        servName,
        employeeFullname,
        firstName,
        bookID,
        userID
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
    b.bookID,
   b.bookDay,
    b.bookTime,
    b.servName,
    b.employeeFullname,
    u.firstName
FROM
    Bookings b
INNER JOIN
    Users u ON b.userID = u.userID
WHERE
     u.userID = ${req.params.id};


          `;
    db.query(qry, (err, results) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        results,
      });
    });
  }

// add Booking
async addBooking(req, res) {
  let data = req.body;
  let user = {
    bookDay: data.bookDay,
    bookTime:data.bookTime,
    servName: data.servName,
    employeeFullname: data.employeeFullname,
    firstName: data.firstName,
    userID: data.userID,
  };

  // Check if the booking details already exist
  const checkAvailability = `
    SELECT bookID
    FROM Bookings
    WHERE bookDay = ? AND bookTime = ?;
  `;

  db.query(checkAvailability, [user.bookDay, user.bookTime], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error checking booking existence" });
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
      INSERT INTO Bookings
      SET ?;
    `;

    db.query(insertBooking, [user], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error adding booking", details: err });
      }

      res.json({
        status: res.statusCode,
        details: user,
        msg: "Booking added successfully.",
        insertedId: result.insertId,
      });
    });
  });
}

  // delete all bookings made by User
  deleteUserBookings(req, res) {
    const qry = `
      DELETE
      b
FROM
    Bookings b
INNER JOIN
    Users u ON b.userID = u.userID
WHERE
     u.userID = ${req.params.id};
        
    `;
    db.query(qry, (err) => {
        if (err) throw err;
        {
            res.json({
                status: res.statusCode,
                msg: "All bookings deleted",
            });
        }
    });
}


  //   delete Booking

  deleteBooking(req, res) {
    const qry = `
     DELETE  FROM Bookings
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
