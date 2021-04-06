import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBhKDj2636c8rJFhVncgpa4jVuEB3VmCKY",
  authDomain: "foodu-bea1c.firebaseapp.com",
  projectId: "foodu-bea1c",
  storageBucket: "foodu-bea1c.appspot.com",
  messagingSenderId: "477086343990",
  appId: "1:477086343990:web:0b6db3a69a8f08bff08997"
};

export default async ( { store ,app, router, Vue ,} ) => {
  const fireApp = firebase.initializeApp(firebaseConfig);
  Vue.prototype.$database = fireApp.firestore();
  Vue.prototype.$auth = fireApp.auth();

}


