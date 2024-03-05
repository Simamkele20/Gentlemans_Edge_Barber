import { connection as db } from "../config/index.js";
class Haircuts {
  fetchHaircuts(req, res) {
    const qry = `
        SELECT
        cutID,cutName ,cutAmount,cutDescription,cutUrl,userID
        FROM Haircuts
        
        `;
    db.query(qry, (err, results) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        results,
      });
    });
  }
  fetchHaircut(req, res) {
    const qry = `
        cutID,cutName ,cutAmount,cutDescription,cutUrl,userID
        FROM Haircuts
        WHERE cutID=${req.params.id}
        `;
    db.query(qry, (err, result) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        result: result[0]
      });
    });
  }
  addHaircut(req, res) {
    const qry = `INSERT INTO Haircuts SET ?;`;

    db.query(qry, [req.body], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "new haircut was added",
      });
    });
  }

  async updateHaircut(req, res) {
    const data = req.body;
    if (data?.userPwd) {
      data.userPwd = await hash(data?.userPwd, 8);
    }
    const qry = `
    UPDATE Haircuts 
    SET ?
    WHERE cutID=${req.params.id};`;
    db.query(qry, [data], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Haircut updated",
      });
    });
  }

  deleteHaircut(req, res) {
    const qry = `
     DELETE FROM Haircuts
     WHERE cutID=${req.params.id}
  `;
    db.query(qry, (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Haircut deleted",
      });
    });
  }
}
export { Haircuts };
