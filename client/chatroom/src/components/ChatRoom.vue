<template>
  <div>
    <div class="text-center">
      <button v-on:click="addUsers">Add Users</button>
      <button v-on:click="removeUsers">Remove Users</button>
    </div>
    <div id="chatRoom" ref="chatRoomContainer">
      <div v-for="(message,key) in messages" :key="key" :style="{textAlign: message.textAlign || 'left'}" class="message">
        <span :style="{color: message.color || 'red'}">{{ message.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';

export default {
  name: 'ChatRoom',
  data() {
    return {
      messages: [],
      users: [],
      socket : io('ws://localhost:4000'),
      addTrigger: false
    }
  },
  mounted() {
      this.socket.on('MESSAGE', (data) => {
          this.appendMessage(data);
      });
      this.socket.on('USER', (data) => {
          this.users.push(data.user);
          this.appendMessage({
              message: data.title,
              color: 'blue',
              textAlign: 'center'
            });
      });
  },
  methods: {
        addUsers() {
          const addEventInterval = setInterval( ()=>{
           axios.get('http://localhost:4000/addUsers').then((data)=>{
            if(data.data) {
                clearInterval(addEventInterval);
            }
           });
          },2000); 
        },
        removeUsers() {
          const removeEventInterval = setInterval(()=>{
           axios.get('http://localhost:4000/removeUsers').then((data)=>{
              if(data.data) {
                  clearInterval(removeEventInterval);
              }
           });
          },2000); 
        },
        appendMessage(data) {
          this.messages.push(data);
          this.$nextTick(() => {
            this.$refs.chatRoomContainer.scrollTop = this.$refs.chatRoomContainer.scrollHeight;
          });
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #chatRoom {
    margin: 15px auto;
    border: 1px solid black;
    width: 500px;
    height: 80vh;
    overflow: auto;
  }
  .text-center {
    text-align: center;
  }
</style>
