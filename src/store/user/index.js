import firebase from "firebase/app";
import 'firebase/auth'

export default {
  namespaced: true,
  state:{
    user:{}
  },
  mutations:{
    setUserDetails(state,payload){
      state.user = payload
    }
  },
  actions:{
    registerUser(context, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
        .then(response=>{
          const userID = firebase.auth().currentUser.uid;
          const newUser = {
            name:payload.name,
            email:payload.email,
            avatar:'https://cdn.quasar.dev/img/boy-avatar.png',
            role:'customer',
          }

          firebase.firestore().collection('users').doc(userID).set(newUser)
            .then(response=>{
              this.$router.replace('/')
                .then(response=>{

                })
                .catch(error=>{
                  console.log(error)
                })
            })
            .catch(error=>{
              console.log(error);
            })

        })
        .catch(error=>{
          console.log(error)
        })

    },
    loginUser(context,payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          //asraf@aic.mail.com
        })
        .catch(error => {
          console.log(error)
        })
    },
    logoutUser(){
      firebase.auth().signOut()
        .then(response => {

        })
        .catch(error => {
          console.log(error)
        })
    },
    handleAuthStateChanged({commit}){
      firebase.auth().onAuthStateChanged(User=>{
        if (User){
          //user logged in or registered
          const userId = firebase.auth().currentUser.uid;
          firebase.firestore().collection('users').doc(userId).get()
            .then((doc)=>{
              if (doc.exists){
                const userDetails = doc.data()
                console.log(userDetails)
                commit('setUserDetails',{
                  userId : userId,
                  name : userDetails.name,
                  email : userDetails.email,
                  avatar : userDetails.avatar,
                  role : userDetails.role,
                })

                //checking user role and redirecting to the respected route
                if (userDetails.role === 'admin'){
                  this.$router.push('/admin')
                    .catch(error =>{
                      console.log(error)
                    })
                }else {
                  this.$router.push('/')
                    .catch(error =>{
                      console.log(error)
                    })
                }


              }else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })
            .catch(error =>{
              console.log("Error getting document:", error);
            })

        }else {
          //user logged out or not registered
          commit('setUserDetails',{})
          this.$router.replace('/')
            .catch(error =>{

            })
        }
      })

    },
  },
  getters:{
    user: state => state.user,
   userDetails(state){
     return state.user
   }
  },
}
