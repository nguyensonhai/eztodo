import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCO6pFFe5r3twkfOlVsuFg8WfOkURzbfgw",
  authDomain: "eztodo-a37d0.firebaseapp.com",
  databaseURL: "https://eztodo-a37d0.firebaseio.com",
  projectId: "eztodo-a37d0",
  storageBucket: "eztodo-a37d0.appspot.com",
  messagingSenderId: "1090588679539",
  appId: "1:1090588679539:web:d85e71afefcdcfc5bff906",
  measurementId: "G-WKV2GJM5XT",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(this.userID)
      .collection("lists");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      callback(lists);
    });
  }

  get userID() {
    return firebase.auth().currentUser.uid;
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
