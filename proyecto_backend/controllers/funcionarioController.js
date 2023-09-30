const { response, request } = require('express')
const { admin } = require('../config/firebase-config')

var db = admin.firestore();
var funcionarios = db.collection("funcionarios");

const getFuncionario = async (req, res) => {
    const { documentId } = req.body;
    const snapshot = await funcionarios.doc(documentId).get();
    res.json({
        msg: 'get APi-reclamoController',
        body: snapshot.data()
    })
}
const getFuncionarios = async (req, res) => {
    try {
        const snapshot = await funcionarios.get();
        const listaFuncionarios = [];
        snapshot.docs.map((doc) => {
            const datos = doc.data();
            const id = doc.id;
            const funcionario = { id, ...datos };
            listaFuncionarios.push(funcionario);
        })
        res.json(listaFuncionarios)
    } catch (error) {
        res.json({ error: error })
    }
}
const loginFuncionario = async (req, res) => {
    const { username, password } = req.body;
    const snapshot = await funcionarios.where('username', '==', username).where('password', '==', password).get();
    const listfuncionarios = snapshot.docs.map((doc) => user = {
        id: doc.id,
         info: doc.data()
    })
    if (listfuncionarios.length == 0) {
        res.json({
            msg: 'post APi-funcionarioController',
            status: false,
            user: []
        })
    } else {
        res.json({
            msg: 'post APi-funcionarioController',
            status: true,
            user:listfuncionarios
        })
    }

}
const addFuncionario = async (req, res) => {
    const resultado = await funcionarios.add(req.body);
    res.json({
        msg: 'get APi-authController',
        status: true,
        idUser: resultado.id
    })
}
const addFuncionario1 = async (req, res) => {
    const { area,nombre,telefono,username,email,password } = req.body
    const nuevoFuncionario= {
        area:area,
        nombre: nombre,
        telefono:telefono,
        username:username,
        email: email,
        superadmin:false,
        password:password
    };
    funcionarios.add(nuevoFuncionario)
        .then((docRef) => {
            res.json({ uid: docRef.id,msg:"Funcionario creado con exito",status:true })
        })
        .catch((error) => {
            res.json({ uid: "-1",msg:"El funcionario no se puedo crear: " + error,status:false })
        });
}
const editarFuncionario = async (req, res) => {
    const { documentId,area,nombre,telefono,username,email,password } = req.body
    const nuevoFuncionario= {
        area:area,
        nombre: nombre,
        telefono:telefono,
        username:username,
        email: email,
        superadmin:false,
        password:password
    };
    funcionarios.doc(documentId).update(nuevoFuncionario)
        .then((docRef) => {
            res.json({ uid: docRef.id,msg:"Funcionario editado con exito",status:true })
        })
        .catch((error) => {
            res.json({ uid: "-1",msg:"El funcionario no se puedo editar: " + error,status:false })
        });
}


const eliminarFuncionario = async (req, res) => {
    const { documentId} = req.body
    funcionarios.doc(documentId).delete()
        .then((docRef) => {
            res.json({ uid: docRef.id,msg:"Funcionario eliminado con exito",status:true })
        })
        .catch((error) => {
            res.json({ uid: "-1",msg:"El funcionario no se puedo eliminar: " + error,status:false })
        });
}
module.exports = {
    addFuncionario,
    loginFuncionario,
    getFuncionario,
    getFuncionarios,
    addFuncionario1,
    editarFuncionario,
    eliminarFuncionario
}
