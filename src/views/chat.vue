<template>
  <div class="container">
    <h3 class=" text-center" style="padding: 8px;">Messaging</h3>
    <div class="messaging">
          <div class="inbox_msg">
            <div class="inbox_people">
              <div class="headind_srch">
                <div class="recent_heading">
                  <h4>Recent</h4>
                </div>
                <div class="srch_bar">
                  <div class="stylish-input-group">
                    <input type="text" class="search-bar"  placeholder="Search" >
                    <span class="input-group-addon">
                    <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                    </span> </div>
                </div>
              </div>
              <div class="inbox_chat">
                <div @click="showChat()" class="chat_list active_chat">
                  <div class="chat_people">
                    <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                    <div class="chat_ib">
                      <h5>{{userName}} <span class="chat_date">{{chatTime}}</span></h5>
                      <p>email:mohammed@gmail.com</p>
                       <p class="messages-counter"><span class="msgs"> {{messages.length}}</span> Messages</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mesgs">
              <div class="msg_history">
                <div v-for="message in messages" :key="message.id" class="incoming_msg" >
                  <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                  <div class="received_msg">
                    <div :class="[message.author===authUser.displayName ? 'received_msg':'sent_msg']">
                      <p>{{message.message}}</p>
                      <span class="time_date"> {{message.author}} |  {{ message.createdAt }}</span></div>
                  </div>
                </div>

                  <div v-if="!showSeen" class="text-right">{{userName}} seen your message<i class="fas fa-eye mr-4"></i></div>

              </div>
              <div class="type_msg">
                <div class="input_msg_write">
                  <input @click="showChat()" @keyup.enter="saveMessage" v-model="message" type="text" class="write_msg" placeholder="Type a message" />
                  <button @click.prevent="saveMessage()" class="msg_send_btn" type="button"><i class="fas fa-paper-plane" aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
          </div>
          <p class="text-center top_spac"> Design by <a target="_blank" href="#">Mohammed Seyam</a></p>

    </div>
  </div>
</template>
<script>
import firebase from 'firebase'
import db from '../main.js'
import moment from 'moment'

export default {
  name: 'chat',
  data () {
    return {
      message: null,
      messages: [],
      authUser: {},
      showSeen: false,
      userName: '',
      chatTime: ''
    }
  },
  methods: {
    scrollToBottom () {
      const Box = document.querySelector('.msg_history')
      Box.scrollTop = Box.scrollHeight
    },
    saveMessage () {
      db.collection('chat').add({
        message: this.message,
        createdAt: moment(this.messages.timestamp).format('LTS'),
        author: this.authUser.displayName,
        id: null,
        seen: false
      }).then(function (docRef) {
        db.collection('chat')
          .doc(docRef.id)
          .update({
            id: docRef.id
          })
      })
      this.showChat()
      this.message = null
    },
    fechMessages () {
      db.collection('chat').orderBy('createdAt').onSnapshot((querySnapshot) => {
        const allMessages = []
        querySnapshot.forEach(doc => {
          allMessages.push(doc.data())
        })
        allMessages.forEach(msg => {
          this.chatTime = msg.createdAt
          if (msg.author !== this.authUser.displayName) {
            this.userName = msg.author
            console.log(this.userName)
          }
          if (msg.author === this.authUser.displayName) {
            !msg.seen ? (this.showSeen = true) : (this.showSeen = false)
          }
        })
        this.messages = allMessages
        setTimeout(() => {
          this.scrollToBottom()
        }, 1000)
      })
    },
    showChat () {
      this.messages.forEach(msg => {
        if (msg.author !== this.authUser.displayName) {
          db.collection('chat')
            .doc(msg.id)
            .update({
              seen: true
            })
        }
      })
      console.log('259181')
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authUser = user
      } else {
        this.authUser = {}
      }
    })
    this.fechMessages()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          next()
        } else {
          vm.$router.push('/Login')
        }
      })
    })
  }
}
</script>

<style scoped>
.container{max-width:1170px; margin: auto; }
img{ max-width:100%;}
.inbox_people {
  background: #ecebeb none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}

.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}
.incoming_msg{
padding-bottom: 10px;
}
.incoming_msg_img {
  display: inline-block;
  width: 5%;
}
.received_msg {
  display: inline-block;
  text-align: initial;
  padding-left: 3px;
  vertical-align: top;
  width: 92%;

 }
 .received_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
}
.received_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
.messages-counter {
    color: #809fb9 !important;
    padding: 5px;
    display:inline-block;
}
.msgs{
    border: 1px solid #a9c3d4;
    border-radius: 50%;
    padding: 3px;
    background: forestgreen;
    color: white;
    font-size: 14px;
}

</style>
