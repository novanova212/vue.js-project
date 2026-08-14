<script setup>
import { ref } from "vue";

const email = ref("admin@gmail.com");
const password = ref("123456");

function login() {
  console.log({
    email: email.value,
    password: password.value,
  });
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1>TechStore Admin</h1>

      <input
        type="email"
        v-model="email"
        placeholder="Email"
      />

      <input
        type="password"
        v-model="password"
        placeholder="Password"
      />

      <button @click="login">
        Login
      </button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
}

.login-card {
  width: 350px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

input {
  width: 100%;
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #1d4ed8;
}
</style>