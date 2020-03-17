import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: 'AIzaSyDk3TIImv3JBhAognRfFg2QoRyZfChCoIM',
    authDomain: 'corona-watch.firebaseapp.com',
    databaseURL: 'https://corona-watch.firebaseio.com',
    projectId: 'corona-watch',
    storageBucket: 'corona-watch.appspot.com',
    messagingSenderId: '20969874531',
    appId: '1:20969874531:web:432f6c89635a8c4e0e0456',
    measurementId: 'G-QDCE2RPS9L',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.firestore()
firebase.auth()
// firebase.analytics()

const db = firebase

export default db;