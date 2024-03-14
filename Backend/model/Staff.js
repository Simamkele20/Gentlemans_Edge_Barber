import { connection as db } from "../config/index.js";

class Staff {
  fetchStaff(req, res) {
    const qry = `
        SELECT staffID,employeeFullname,JobTittle,staffUrl,staffDescription
        FROM Staff
        `;

    db.query(qry, (err, results) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        results,
      });
    });
  }
  fetchEmployee(req, res) {
    const qry = `
    SELECT staffID,employeeFullname,JobTittle,staffUrl,staffDescription
    FROM Staff
        WHERE staffID = ${req.params.id}
        `;
    
    db.query(qry, (err, result) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        result,
      });
    });
  }
  addEmployee(req, res) {
    const qry = `INSERT INTO Staff SET ?;`;

    db.query(qry, [req.body], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "new employee was added",
      });
    });
  }

  async updateEmployee(req, res) {
    const data = req.body;
    if (data?.userPwd) {
      data.userPwd = await hash(data?.userPwd, 8);
    }
    const qry = `
    UPDATE Staff
    SET ?
    WHERE staffID=${req.params.id};`;
    db.query(qry, [data], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Employee updated",
      });
    });
  }

  deleteEmployee(req, res) {
    const qry = `
     DELETE FROM Staff
     WHERE staffID=${req.params.id}
  `;
    db.query(qry, (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Employee deleted",
      });
    });
  }
}
export { Staff };
