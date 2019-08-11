<template>
<v-layout>
  <v-flex class="text-center">
    <img src="/v.png" alt="Vuetify.js" class="mb-5">
    <h1>Let's Chat!</h1>
    <div>
      <textarea v-model="message"> </textarea>
    </div>
    <div>
      <br/>
      <button v-on:click="send"> 보내기 </button>
      <p> You recieved message : <b>{{answer}}</b></p>
    </div>

  </v-flex>
</v-layout>
</template>
<script type="text/javascript">
import { w3cwebsocket } from 'websocket'

const W3CWebSocket = w3cwebsocket

export default {
  data: function() {
    return {
      // WebSocket 클라이언트의 생성
      socket: new W3CWebSocket('ws://localhost:3000/ws'),
      // 클라이언트에서 보내는 값 (textarea)
      message: '',
      // 서버로부터받은 값
      answer: ''
    }
  },
  // created 라이프 사이클에서 Vue 인스턴스가 작성되면
  // 이벤트 리스너를 등록 해두면
  created: function() {
    // 이벤트 리스너에서 Vue 구성 요소에 값을 전달하기 위해 한 번 self 변수 화해 두는
    let data = this.$data
    this.socket.onmessage = function(e) {
      if (typeof e.data === 'string') {
        data.answer = e.data
      }
    }
  },
  methods: {
    send: function() {
      // 버튼 클릭으로 서버 값 쓰기
      this.socket.send(this.message)
    }
  }
}
</script>
