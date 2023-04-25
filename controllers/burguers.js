const express = require("express");
const router = express.Router();
const db = require("../db/models/index");

router.get("/burguers", async (req, res) => {

  //receive the number of page, when isn't sent the number of page is attribute page one
  const {
    page = 1
  } = req.query;

  //console.log(page);

  //limit of registers at each page
  const limit = 10;

  //variable with the number at last page
  var lastPage = 1;

  //count the quantity of registers in database
  const countBurguers = await db.Users.count();
  // console.log(countUser);

  //access the if when find registers in database
  if(countBurguers !== 0) {
    //calc the last page
    lastPage = Math.ceil(countBurguers / limit);
  }
  else {
    return res.status(400).json({
      message: "Erro: Nenhum hamburguer encontrado!"
    });
  }

  const burguers = await db.Burguers.findAll({

    //show the column recover
    attributes: ['id', 'name', 'description', 'ingredients'],
    //order the registers for column id in mode descending
    order: [
      ["id", "ASC"],
    ],
    //Calc from registers for column id in form descending
    offset: Number((page * limit) - limit),
    limit: limit
    
  });
  
  if (burguers) {
    //create object with of informations for pagination
    var pagination = {
      //crumb
      path: '/burguers',
      //page actual
      page,
      //URL of page previous
      prev_page_url: (page) - 1 >= 1 ? page - 1 : false,
      //URL of next page
      next_page_url: Number(page) + Number(1) > lastPage ? lastPage : Number(page) + Number(1),
      //last page
      lastPage,
      //quantity of registers
      total: countBurguers,
    }

    res.json({
      burguers: burguers,
      pagination: pagination
    });
  } else {
    return res.status(400).json({
      message: "Erro: Burguers não foram encontrados!",
    });
  }
});

router.post("/burguers", async (req, res) => {
  //receive data sent in body of request
  var data = req.body;
  // console.log(data);

  //save in data
  await db.Burguers.create(data)
    .then((dataBurguer) => {
      return res.json({
        message: "Burguer cadastrado com sucesso!",
        dataBurguer: dataBurguer,
      });
    })
    .catch((e) => {
      return res.json({
        message: e,
      });
    });

  return res.json({
    message: "Burguer cadastrado com sucesso!"
  });
});

module.exports = router;
