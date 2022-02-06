// Published @ https://bob-777d7.web.app/

// Logic for the per-grade pages (9th grade, 10th grade, etc.)
// This is a sample. It creates 3 numbers with buttons next to them. Pressing a
// button will add the number displayed to the left of the button to the taken10
// field of the document CJrBVnwhQTmCy19Nt1yh (name: "James")
// TODOs are marked

// Important information:
// General javascript: https://javascript.info/
// Promises: https://javascript.info/async
// Document manipulation (adding HTML from JS): https://javascript.info/document
// Events, like onclick: https://javascript.info/events
// Firestore API Reference: https://firebase.google.com/docs/reference/js/firestore_

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js'

// This import statement imports all functions from firestore. You need to use
// them like firestore.FUNCTION_NAME, for example: firestore.getDoc(), not just
// getDoc().
// Every function that looks like firestore.FUNCTION_NAME is documented in the
// API Reference listed above.
import * as firestore from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js'

// Replace this with the correct config
const firebaseConfig = {
  apiKey: "AIzaSyDKzqq_un8tt8nG8teKz6QcOdhvgxX-f-M",
  authDomain: "plan4gunn-574c5.firebaseapp.com",
  databaseURL: "https://plan4gunn-574c5-default-rtdb.firebaseio.com",
  projectId: "plan4gunn-574c5",
  storageBucket: "plan4gunn-574c5.appspot.com",
  messagingSenderId: "136078343997",
  appId: "1:136078343997:web:e89f42723977a2a5264f54",
  measurementId: "G-JVP8P0XYRC"
};

const app = initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);

// TODO: instead of these placeholder values, the array should contain a list of
// courses to be rendered for each grade
let arr = [1, 2, 3];

// TODO: these are placeholders and should be integrated with authentication
const ref = firestore.doc(db, 'users', 'CJrBVnwhQTmCy19Nt1yh');
const field = 'taken10'

for (const x of arr) {
  // Add a div with text and a button for each element of arr
  let div = document.createElement('div');
  let button = document.createElement('button');

  // When we click the button, we will: 1) read the field, 2) wait for reading
  // the field to finish (very important, or else we get junk), 3) "then" we are
  // going to use the result, which is guaranteed to exist. in the sample
  // case, the result is the field contents; i.e. the array associated with
  // field 'taken10', 4) write the field, 5) wait for writing the field to
  // finish (very important. if we don't, then writing in very rapid succession
  // could clobber previous writes), 6) "then" use the result
  button.onclick = function() {
    readField(ref,field).then((result) => {
      result.push(x);
      writeField(ref, field, result).then((result) => {
        console.log("Write success!");
      });
    });
  }

  div.innerHTML = x;
  div.appendChild(button);

  document.body.append(div);
}

// You need to read about promises in javascript (see top)
// Sets the field with name fieldName to the value fieldVal in the document ref
async function writeField(ref, fieldName, fieldVal) {
  let obj = new Object();
  obj[fieldName] = fieldVal;
  await firestore.updateDoc(ref, obj);
}

// Returns the field of the DocumentReference ref with name fieldName
async function readField(ref, fieldName) {
  let data = await firestore.getDoc(ref);
  return data.get(fieldName);
}