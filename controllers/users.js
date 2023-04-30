const express = require("express");
const router = express.Router();
const db = require("../db/models/index");

router.get("/users", async (req, res) => {

  //receive the number of page, when isn't sent the number of page is attribute page one
  const { page = 1 } = req.query;

  //console.log(page);

  //limit of registers at each page
  const limit = 10;

  //variable with the number at last page
  var lastPage = 1;

  //count the quantity of registers in database
  const countUser = await db.Users.count();
  // console.log(countUser);

  //access the if when find registers in database
  if (countUser !== 0) {
    //calc the last page
    lastPage = Math.ceil(countUser / limit);
  } else {
    return res.status(400).json({
      message: "Erro: Nenhum usuário encontrado!"
    });
  }

  const users = await db.Users.findAll({

    //show the column recover
    attributes: ['id', 'name', 'email'],
    //order the registers for column id in mode descending
    order: [
      ["id", "ASC"],
    ],
    //Calc from registers for column id in form descending
    offset: Number((page * limit) - limit),
    limit: limit

  });

  if (users) {
    //create object with of informations for pagination
    var pagination = {
      //crumb
      path: '/users',
      //page actual
      page,
      //URL of page previous
      prev_page_url: (page) - 1 >= 1 ? page - 1 : false,
      //URL of next page
      next_page_url: Number(page) + Number(1) > lastPage ? lastPage : Number(page) + Number(1),
      //last page
      lastPage,
      //quantity of registers
      total: countUser,
    }

    res.json({
      users: users,
      pagination: pagination
    });
  } else {
    return res.status(400).json({
      message: "Erro: Usuarios não foram encontrados!",
    });
  }
});

router.post("/users", async (req, res) => {
  //receive data sent in body of request
  var data = req.body;
  // console.log(data);

  //save in data
  await db.Users.create(data)
    .then((dataUser) => {
      return res.json({
        message: "Usuário cadastrado com sucesso!",
        dataUser: dataUser,
      });
    })
    .catch((e) => {
      return res.json({
        message: e,
      });
    });

  return res.json({
    message: "Usuário cadastrado com sucesso!"
  });
});

//create of route for view and receive the params id sent in URL
router.get('/users:id', async (req, res) => {

  const { id } = req.params;

  //receive the register of database
  if(!isNaN()) {
    const user = await db.Users.findOne({
  
      //select column for recover
      attribute: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      //indicate register it must be return in database
      where: {
        id: id
      }
    });
  } else{
    res.json({
      message: 'ID não é válido'
    });
  }

  //access the IF case find the register in database
  if (user) {
    return res.json({
      user: user
    })
  } else {
    return res.status(400).json({
      message: "Erro: nenhum usuário encontrado!"
    });
  }

});

//route delete
router.delete('/users:id', async (req, res) => {
  const { id } = req.params;

  if(!isNaN()) {
    await db.Users.destroy({
      where: {
        id: id
      }
    }).then(() => {
      res.json({
        message: 'Usuário apagado com sucesso!'
      });
    }).catch(() => {
      res.status(400).json({
        message: 'Erro: usuário não foi deletado!'
      });
    });
  } else{
    res.json({
      message: 'ID não é válido'
    });
  }

});

//route edit
router.put('/users', async (req, res) => {

  const dados = req.body;

  await db.Users.update({
    where: {
      id: dados.id
    }
  }).then(() => {
    return res.json({
      message: 'Usuário cadastrado com sucesso!'
    });
  }).catch(() => {
    return res.status(400).json({
      message: 'Erro: Usuário não foi editado com sucesso!'
    });
  });
});

module.exports = router;
