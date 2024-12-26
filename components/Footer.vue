<template>
  <div class="footer bg-[var(--white-color)] p-4 border border-black rounded-[var(--border-radius)] flex flex-col gap-2 md:hidden">
    <div class="handle bg-gray-300 h-1 w-[15vw] mx-auto mb-4 rounded-full"></div>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>
