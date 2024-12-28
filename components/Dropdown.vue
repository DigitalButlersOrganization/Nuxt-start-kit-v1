<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
const selectedOption = ref(null);

const options = ['Опция 1', 'Опция 2', 'Опция 3'];

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
};
</script>

<template>
  <div class="dropdown" @click="toggleDropdown"> 
    <button class="dropdown-toggle">
      {{ selectedOption || 'Выберите' }}
    </button>
    <ul v-if="isOpen" class="dropdown-menu">
      <li 
        v-for="option in options" 
        :key="option" 
        @click.stop="selectOption(option)"
        class="dropdown-item"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 1000;
}

.dropdown-item {
  padding: 10px 20px;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f0f0f0;
}
</style>
