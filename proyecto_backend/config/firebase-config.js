const serviceAccount = require('../privateKey.json');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://prueba-438c5-default-rtdb.firebaseio.com'
});


module.exports = {
    admin
}