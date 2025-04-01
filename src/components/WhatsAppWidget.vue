<template>
  <div class="whatsapp-widget">
    <!-- Botón flotante de WhatsApp -->
    <button class="whatsapp-button" @click="toggleChat">
      <svg class="whatsapp-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white">
        <path d="M16.004 3C9.377 3 3.99 8.385 3.99 15.01c0 2.645.77 5.105 2.1 7.173L3 29l7.014-2.03a12.97 12.97 0 0 0 5.99 1.523c6.626 0 12.012-5.385 12.012-12.01C28.015 8.384 22.63 3 16.004 3zm.006 22.946a11.01 11.01 0 0 1-5.61-1.533l-.4-.236-4.166 1.206 1.185-4.065-.26-.417a10.99 10.99 0 0 1-1.68-5.891c0-6.073 4.94-11.012 11.016-11.012 6.073 0 11.012 4.94 11.012 11.012s-4.94 11.01-11.01 11.01zm6.125-8.203c-.335-.167-1.985-.978-2.293-1.09-.308-.114-.534-.167-.76.168-.224.335-.87 1.09-1.067 1.313-.196.224-.392.25-.727.084-.334-.168-1.41-.52-2.684-1.656-1-.894-1.678-2.001-1.872-2.336-.195-.334-.021-.513.147-.678.152-.152.334-.392.502-.588.168-.196.224-.335.335-.557.112-.224.056-.418-.028-.586-.084-.168-.76-1.832-1.042-2.507-.276-.667-.556-.577-.76-.588l-.646-.012c-.223 0-.586.084-.89.418-.308.335-1.172 1.146-1.172 2.796s1.2 3.24 1.367 3.466c.168.224 2.353 3.59 5.7 5.03.796.343 1.417.548 1.9.701.798.254 1.524.218 2.096.132.64-.095 1.985-.81 2.27-1.59.28-.78.28-1.448.196-1.59-.084-.14-.308-.223-.64-.392z" />
      </svg>
    </button>

    <!-- Modal tipo chat -->
    <transition name="chat-slide">
      <div v-if="open" class="chat-window">
        <div class="chat-header">
          <img src="/images2/consmo-avatar.png" alt="avatar" class="chat-avatar" />
          <div class="chat-info">
            <div class="chat-name">Consmo PC</div>
            <div class="chat-status">En línea</div>
          </div>
          <button class="close-button" @click="toggleChat">&times;</button>
        </div>
        <div class="chat-body">
          <textarea v-model="message" placeholder="Escribe tu mensaje..." rows="3"></textarea>
          <button class="send-button" @click="sendMessage">
            <span>Enviar</span> <i class="fa fa-paper-plane" style="margin-left: 6px;"></i>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)
const message = ref("")
const phoneNumber = '573015537673'

function toggleChat() {
  open.value = !open.value
}

function sendMessage() {
  const text = message.value.trim()
  let url = `https://wa.me/${phoneNumber}`
  if (text) {
    const formattedText = `Buenas! vengo de la página web y tengo la siguiente duda: ${text}`
    url += `?text=${encodeURIComponent(formattedText)}`
  }
  window.open(url, '_blank')
  message.value = ""
  open.value = false
}
</script>

<style scoped>
.whatsapp-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.whatsapp-button {
  width: 60px;
  height: 60px;
  background-color: #25D366;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.whatsapp-icon {
  width: 30px;
  height: 30px;
}

.chat-window {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 300px;
  max-width: 90vw;
  background: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  font-family: 'Segoe UI', sans-serif;
  overflow: hidden;
}

.chat-header {
  background-color: #075E54;
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.chat-info .chat-name {
  font-weight: bold;
  font-size: 16px;
}

.chat-info .chat-status {
  font-size: 12px;
  color: #cfcfcf;
}

.close-button {
  margin-left: auto;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.chat-body {
  padding: 10px;
  background-color: white;
}

.chat-body textarea {
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 8px;
  resize: none;
  font: inherit;
  margin-bottom: 8px;
}

.send-button {
  width: 100%;
  background-color: #25D366;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.chat-slide-enter-active, .chat-slide-leave-active {
  transition: all 0.3s ease;
}
.chat-slide-enter-from, .chat-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
