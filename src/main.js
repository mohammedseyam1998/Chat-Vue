import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase'

// Required for side-effects
require('firebase/firestore')

var firebaseConfig = {
  apiKey: 'AIzaSyB4MxAo6o4jtxtTUjlE0lAQxp9MItYU9Gs',
  authDomain: 'vue-chat-seyam.firebaseapp.com',
  databaseURL: 'https://vue-chat-seyam.firebaseio.com',
  projectId: 'vue-chat-seyam',
  storageBucket: 'vue-chat-seyam.appspot.com',
  messagingSenderId: '621590815764',
  appId: '1:621590815764:web:86da6b2fe7d2b2bbc13301',
  measurementId: 'G-JVP1E34WJC'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
var db = firebase.firestore()

export default db

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
