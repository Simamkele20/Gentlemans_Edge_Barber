import { connection as db } from "../config/index.js";
class Stylists {
  fetchStylists(req, res) {
    const qry = `
        SELECT StyleID,firstName,lastName,StyleUrl,styleDescription, userID
        FROM Stylists
        
        `;
    db.query(qry, (err, results) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        results,
      });
    });
  }
  fetchStylist(req, res) {
    const qry = `
        SELECT StyleID,firstName,lastName,StyleUrl,styleDescription, userID
        FROM Stylists
        WHERE StyleID=${req.params.id}
        `;
    db.query(qry, (err, result) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        result,
      });
    });
  }
  addStylist(req, res) {
    const qry = `INSERT INTO Stylists SET ?;`;

    db.query(qry, [req.body], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "new stylist was added",
      });
    });
  }

  async updateStylist(req, res) {
    const data = req.body;
    if (data?.userPwd) {
      data.userPwd = await hash(data?.userPwd, 8);
    }
    const qry = `
    UPDATE Stylists
    SET ?
    WHERE StyleID=${req.params.id};`;
    db.query(qry, [data], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Stylist updated",
      });
    });
  }

  deleteStylist(req, res) {
    const qry = `
     DELETE FROM Stylists
     WHERE styleID=${req.params.id}
  `;
    db.query(qry, (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "stylist deleted",
      });
    });
  }
}
export { Stylists };
