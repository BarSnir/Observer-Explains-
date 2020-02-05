<template>
    <div id="chatRoom">
      
    </div>
</template>

<script>
export default {
  name: 'ChatRoom',
  props: {
    msg: String
  },
  methods :{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #chatRoom {
    margin: 15px auto;
    border: 1px solid black;
    width: 500px;
    height: 80vh;
  }
</style>
