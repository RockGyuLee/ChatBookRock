const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// const admin = require('firebase-admin');

// admin.initializeApp();

// exports.addMessage = functions.https.onRequest(async (req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into Cloud Firestore using the Firebase Admin SDK.
//     const writeResult = await admin.firestore().collection('messages').add({original: original});
//     // Send back a message that we've succesfully written the message
//     res.json({result: `Message with ID: ${writeResult.id} added.`});
// });

// // Listens for new messages added to /messages/:documentId/original and creates an
// // uppercase version of the message to /messages/:documentId/uppercase
// exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
// .onCreate((snap, context) => {
//     // Grab the current value of what was written to Cloud Firestore.
//     const original = snap.data().original;

//     // Access the parameter `{documentId}` with `context.params`
//     functions.logger.log('Uppercasing', context.params.documentId, original);

//     const uppercase = original.toUpperCase();

//     // You must return a Promise when performing asynchronous tasks inside a Functions such as
//     // writing to Cloud Firestore.
//     // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
//     return snap.ref.set({uppercase}, {merge: true});
// });

// const faker = require('faker');

// // Initialize products array
// const products = [];

// // Max number of products
// const LIMIT = 100;

// for (let i = 0; i < LIMIT; i++) {
//   products.push({
//     name: faker.commerce.productName(),
//     price: faker.commerce.price(),
//   });
// }

// exports.listProducts = functions.https.onCall((data, context) => {
  
//   const { page = 1, limit = 10 } = data;

//   const startAt = (page - 1) * limit;
//   const endAt = startAt + limit;

//   return products.slice(startAt, endAt);
// });