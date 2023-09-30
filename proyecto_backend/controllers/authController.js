const { response, request } = require('express')
const { admin } = require('../config/firebase-config')
// const serviceAccount = require('../privateKey.json');
const fs = require('fs');
// const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
//Inicializamos firebase
var db = admin.firestore();
var usuarios = db.collection("users");


const  getUserByUuid = async (req, res) => {
  const { uuid } = req.body;
  const snapshot = await usuarios.where('uuid','==',uuid).get();
  const listaUsuarios= snapshot.docs.map((doc)=>doc.data())
  res.json({
      msg:'get APi-authController',
      body: listaUsuarios[0]
  })
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // INI VALIDACION EMAIL VERIFICADO
    const userCredential = await admin.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    if (user && !user.emailVerified) {
      await user.sendEmailVerification();
      const respuesta = {
        "status": false,
        "reason": "verifyEmail",
        "msg": "Email no verificado, revise su correo"
      };
      return res.status(200).json(respuesta);
      // FIN VALIDACION EMAIL VERIFICADO
    }

    // INI VALIDACION SI CAMBIÓ SU PASSWORD
    const userSnapshot = await admin.firestore().collection('users').where('authUid', '==', user.uid).get();
    const dataUsuario = userSnapshot.docs[0].data();
    if (!dataUsuario['changePassword']) {
      const respuesta = {
        "status": false,
        "reason": "changePassword",
        "msg": "Por seguridad, debe cambiar su contraseña"
      };
      return res.status(200).json(respuesta);
      // FIN VALIDACION SI CAMBIÓ SU PASSWORD
    }

    // INI SI ESTA BLOQUEADO
    if (dataUsuario['bloqueado']) {
      // INI SI ESTA BLOQUEADO Y TERMINÓ SU TIEMPO DE BLOQUEO, SE DESBLOQUEA AL USUARIO
      if (dataUsuario['timer'].seconds <= admin.firestore.Timestamp.now().seconds) {
        const desbloquear = {
          'bloqueado': false,
          'intentos': 0
        };
        await admin.firestore().collection('users').doc(userSnapshot.docs[0].id).update(desbloquear);
        const updatedSnapshot = await admin.firestore().collection('users').where('authUid', '==', user.uid).get();
        const updatedDataUsuario = updatedSnapshot.docs[0].data();
        const respuesta = {
          "status": true,
          "reason": "login",
          "msg": `uid: ${userCredential.user.uid}, email: ${userCredential.user.email}`
        };
        return res.status(200).json(respuesta);
        // FIN SI ESTA BLOQUEADO Y TERMINÓ SU TIEMPO DE BLOQUEO, SE DESBLOQUEA AL USUARIO
      } else {
        // INI SI SU TIEMPO DE BLOQUEO SIGUE VIGENTE, RETORNAMOS EL TIEMPO RESTANTE PARA SU DESBLOQUEO
        const diferencia = dataUsuario['timer'].seconds - admin.firestore.Timestamp.now().seconds;
        const respuesta = {
          "status": false,
          "reason": "locked",
          "msg": `Bloqueado por ${diferencia} segundos`
        };
        return res.status(200).json(respuesta);
        // FIN SI SU TIEMPO DE BLOQUEO SIGUE VIGENTE, RETORNAMOS EL TIEMPO RESTANTE PARA SU DESBLOQUEO
      }
      // FIN SI ESTA BLOQUEADO
    } else {
      // INI SI NO ESTÁ BLOQUEADO Y PASA TODAS LAS VALIDACIONES, EL USUARIO SE LOGEA
      const respuesta = {
        "status": true,
        "reason": "login",
        "msg": `uid: ${userCredential
          .user.uid}, email: ${userCredential.user.email}`
        };
        return res.status(200).json(respuesta);
        // FIN SI NO ESTÁ BLOQUEADO Y PASA TODAS LAS VALIDACIONES, EL USUARIO SE LOGEA
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        const respuesta = {
          "status": false,
          "reason": "email",
          "msg": error.code
        };
        return res.status(200).json(respuesta);
        // FIN SI EL CORREO ES INCORRECTO
      } else if (error.code === 'auth/wrong-password') {
        const userSnapshot = await admin.firestore().collection('users').where('email', '==', email).get();
        const dataUsuario = userSnapshot.docs[0].data();
        if (!dataUsuario['bloqueado']) {
          if (dataUsuario['intentos'] !== 2) {
            const increment = dataUsuario['intentos'] + 1;
            const data = { 'intentos': increment };
            await admin.firestore().collection('users').doc(userSnapshot.docs[0].id).update(data);
            const respuesta = {
              "status": false,
              "reason": "password",
              "msg": `Contraseña incorrecta, intento Nro ${increment}`
            };
            return res.status(200).json(respuesta);
          } else {
            const date = new Date();
            date.setMinutes(date.getMinutes() + 1);
            const timer = {
              'bloqueado': true,
              'timer': admin.firestore.Timestamp.fromDate(date)
            };
            await admin.firestore().collection('users').doc(userSnapshot.docs[0].id).update(timer);
            const increment = dataUsuario['intentos'] + 1;
            const respuesta = {
              "status": false,
              "reason": "password",
              "msg": `Contraseña incorrecta, intento Nro ${increment}`,
              'bloqueado': true
            };
            return res.status(200).json(respuesta);
          }
        }
        const respuesta = {
          "status": false,
          "reason": "other",
          "msg": error.code
        };
        return res.status(200).json(respuesta);
        // FIN SI EL PASSWORD ES INCORRECTO
      }
    }
  }


async function registrarUsuario(req, res) {
  const { usuario, imagenPath, fileName } = req.body;
  const name = Date.now() / 1000 + fileName;
  const avatar = fs.readFileSync(imagenPath);

  try {
    // INI REGISTRAR EN AUTH Y ENVIAR EMAIL
    const userCredential = await admin.auth().createUser({
      email: usuario.email,
      password: usuario.ci
    });
    const user = userCredential.user;
    if (user && !user.emailVerified) {
      await user.sendEmailVerification();
    }
    // FIN REGISTRAR EN AUTH Y ENVIAR EMAIL

    // INI GUARDAR AVATAR EN STORAGE
    const bucket = admin.storage().bucket();
    const file = bucket.file(`avatares/${name}`);
    await file.save(avatar, {
      metadata: { contentType: 'image/jpeg' }
    });
    const url = await file.getSignedUrl({
      action: 'read',
      expires: '03-17-2025'
    });
    // FIN GUARDAR AVATAR EN STORAGE

    // INI ACTUALIZAR USUARIO
    const usuarioUpdate = {
      telefono: usuario.telefono,
      email: usuario.email,
      password: usuario.ci,
      authUid: user.uid,
      avatar: url[0],
      changePassword: false,
      bloqueado: false,
      intentos: 0,
      timer: admin.firestore.Timestamp.now()
    };
    const documentSnapshot = await admin.firestore().collection('users').where('ci', '==', usuario.ci).get();
    await documentSnapshot.docs[0].ref.update(usuarioUpdate);
    // FIN ACTUALIZAR USUARIO

    const respuesta = {
      status: true,
      msg: 'Registrado con éxito!!',
      verifyEmail: 'Se envió un correo de verificación'
    };
    return res.status(200).json(respuesta);
  } catch (error) {
    if (error.code === 'auth/weak-password' || error.code === 'auth/email-already-in-use') {
      const respuesta = {
        status: false,
        msg: error.code
      };
      return res.status(200).json(respuesta);
    }

    const respuesta = {
      status: false,
      msg: error.code || error
    };
    return res.status(200).json(respuesta);
  }
}
async function verificarCi(req, res) {
  const { ci } = req.body;

  try {
    const documentSnapshotCi = await admin.firestore().collection('users').where('ci', '==', ci).get();

    if (documentSnapshotCi.size === 0) {
      const resp = {
        match: false,
        name: 'SN',
        msg: 'Usuario no registrado en el Segip',
        uuid: 'none'
      };
      return res.status(200).json(resp);
    } else {
      const user = documentSnapshotCi.docs[0].data();
      const resp = {
        match: true,
        name: user.name,
        msg: 'Usuario registrado en el Segip, puede continuar',
        uuid: user.uuid
      };
      return res.status(200).json(resp);
    }
  } catch (error) {
    const resp = {
      match: false,
      name: 'SN',
      msg: 'Error al verificar CI',
      uuid: 'none'
    };
    return res.status(200).json(resp);
  }
}

async function verificarFoto(req, res) {
  const { image64, uuid } = req.body;
  const baseUrl = 'https://api.luxand.cloud'; 
  const token = process.env.API_TOKEN; 

  const url = `${baseUrl}/photo/search/v2`;

  try {
    const response = await axios.post(url, { photo: image64 }, { headers: { token } });
    const data = response.data;

    if (data.length === 0) {
      return res.status(200).json(false);
    } else {
      if (data[0].uuid === uuid) {
        return res.status(200).json(true);
      } else {
        return res.status(200).json(false);
      }
    }
  } catch (error) {
    return res.status(200).json(false);
  }
}

async function changePassword(req, res) {
  const { newPassword } = req.body;

  try {
    const user = admin.auth().currentUser;
    await user.updatePassword(newPassword);

    const documentSnapshot = await _users.where('email', '==', user.email).get();
    const data = { changePassword: true };
    await _users.doc(documentSnapshot.docs[0].id).update(data);

    const respuesta = {
      status: true,
      msg: 'Contraseña cambiada satisfactoriamente'
    };
    return res.status(200).json(respuesta);
  } catch (error) {
    const respuesta = {
      status: false,
      msg: `Error: ${error.code}`
    };
    return res.status(200).json(respuesta);
  }
}

async function signOut(req, res) {
  try {
    await admin.auth().signOut();
    return res.status(200).json(true);
  } catch (error) {
    return res.status(500).json(false);
  }
}


module.exports = {
    login,
    registrarUsuario,
    verificarCi,
    verificarFoto,
    changePassword,
    signOut,
    getUserByUuid
}