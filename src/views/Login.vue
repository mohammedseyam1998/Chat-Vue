/* eslint-disable no-unused-vars */
<template>
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="card-header">
          <h1>Login </h1>
        </div>
        <div class="card-body">
          <form>
            <div class="form-group text-center">
               <h3>Login with Google Acount</h3>
              <button @click.prevent="login()" type="submit" class="btn btn-success">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase'
export default {
  name: 'Login',
  data () {
    return {
    }
  },
  methods: {
    login () {
      var provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
      firebase.auth().signInWithPopup(provider).then(result => {
        var user = result.user
        console.log(user)
        this.$router.push('/')
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  created () {
  }

}
</script>
<style scoped>

.container{
height: 100%;
align-content: center;
}
.card{
height: auto;
padding:20px;
padding-bottom:0;
margin-top: 150px;
margin-bottom: auto;
width: 400px;
background-color: rgba(193, 193, 193, 0.5) !important;
}
.card-header{
    background-color:#b3b3b3;
}

.card-header h1{
color: white;
}
.btn-success{
  width: 50%;
}

</style>
