<template>
  <Transition name="toast">

    <div
      v-if="show"
      class="toast"
      :class="`toast-${type}`"
    >

      <div class="toast-icon">
        {{ icon }}
      </div>

      <div class="toast-content">

        <strong>
          {{ title }}
        </strong>

        <p>
          {{ message }}
        </p>

      </div>

      <button
        class="toast-close"
        @click="$emit('close')"
      >
        ×
      </button>

    </div>

  </Transition>
</template>


<script setup>

import { computed } from "vue";


const props = defineProps({

  show: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
    default: "Berhasil",
  },

  message: {
    type: String,
    default: "",
  },

  type: {
    type: String,
    default: "success",
  },

});


const icon = computed(() => {

  if (props.type === "error") {
    return "✕";
  }

  if (props.type === "warning") {
    return "!";
  }

  return "✓";

});


defineEmits(["close"]);

</script>


<style scoped>

.toast {
  position: fixed;

  top: 25px;
  right: 25px;

  width: 350px;

  display: flex;
  align-items: center;
  gap: 14px;

  padding: 16px 18px;

  background: white;

  border-radius: 12px;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.15);

  z-index: 9999;
}

.toast-icon {
  width: 35px;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  font-weight: bold;
}

.toast-success .toast-icon {
  background: #dcfce7;
  color: #166534;
}

.toast-error .toast-icon {
  background: #fee2e2;
  color: #991b1b;
}

.toast-warning .toast-icon {
  background: #fef3c7;
  color: #92400e;
}

.toast-content {
  flex: 1;
}

.toast-content strong {
  display: block;
  margin-bottom: 3px;
}

.toast-content p {
  margin: 0;

  color: #6b7280;

  font-size: 13px;
}

.toast-close {
  border: none;

  background: transparent;

  font-size: 20px;

  color: #6b7280;

  cursor: pointer;
}


/* ANIMATION */

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>