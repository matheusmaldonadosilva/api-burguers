const express = require("express");
const router = express.Router();
const db = require("../db/models/index");
const jwt = require("jsonwebtoken");

//my password the token
const JWTSecret = "-%Mh!XD@Q!jiN#0s1W%#tA1Z";

//route auth
router.post("/auth", async (req, res) => {
  var { email, password } = req.body;

  if (email != undefined) {
    try {
      await db
        .Users()
        .findOne({
          where: { email: email, password: password },
        })
        .then(() => {
          jwt.singn({ id: user.id, email: user.email }),
            JWTSecret,
            { expiresIn: "24h" },
            (error, token) => {
              if (error) {
                res.status(400);
                res.json({ err: "Falha interna" });
              } else {
                res.status(200);
                res.json({ token: token });
              }
            };
        });
    } catch (e) {
      res.json({
        message: "Invalid token",
        e,
      });
    }
  } else {
    res.status(400);
    res.json({
      err: "Invalid email",
    });
  }
});

module.exports = router;