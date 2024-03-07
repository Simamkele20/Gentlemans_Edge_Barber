import { connection as db } from "../config/index.js";
class Services {
  fetchServices(req, res) {
    const qry = `
        SELECT
        servID,
        servName,
        servAmount,
        servUrl,
        servDescription,
        userID
        FROM Service
        
        `;
    db.query(qry, (err, results) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        results,
      });
    });
  }
  fetchService(req, res) {
    const qry = `
   SELECT
    servID,
    servName,
    servAmount,
    servUrl,
    servDescription,
    userID
    FROM Service
   WHERE servID = ${req.params.id}
        `;
    db.query(qry, (err, result) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        result: result[0],
      });
    });
  }
  addService(req, res) {
    const qry = `INSERT INTO Service SET ?;`;

    db.query(qry, [req.body], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "new service was added",
      });
    });
  }

  async updateService(req, res) {
    const data = req.body;
    if (data?.userPwd) {
      data.userPwd = await hash(data?.userPwd, 8);
    }
    const qry = `
    UPDATE Service
    SET ?
    WHERE servID=${req.params.id};`;
    db.query(qry, [data], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Service updated",
      });
    });
  }

  deleteService(req, res) {
    const qry = `
     DELETE FROM Service
     WHERE servID=${req.params.id}
  `;
    db.query(qry, (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Service deleted",
      });
    });
  }
}

export { Services };
