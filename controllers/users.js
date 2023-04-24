const express = require('express');
const router = express.Router();
const db = require('../db/models/index');

router.post('/users', async(req, res) => {

    //receive data sent in body of request
    var dados = req.body;
    console.log(dados);

    //save in data
    await db.Users.create(dados).then((dadosUsuario) => {
      return res.json({
        mensagem: 'Usuario cadastrado com sucesso',
        dadosUsuario: dadosUsuario
      })
    }).catch((e) => {
      return res.json({
        message: e
      })
    });


    return res.json({ message: 'user register with success' });
});

module.exports = router;
