<script setup lang="ts">
import { useLanguage } from '@/stores/lang'
</script>

<template>
  <div class="frames">
    <RouterLink to="/classes" class="frame frame-class">
      <h3>{{ useLanguage().texts['Classes'] }}</h3>
    </RouterLink>
    <RouterLink to="/professions" class="frame frame-profession">
      <h3>{{ useLanguage().texts['Professions'] }} (WIP)</h3>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.frames {
  // flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;

  @media (max-width: 800px) {
    flex-direction: column;
  }
}

.frame {
  width: 328px;
  height: 209px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  position: relative;
  background-clip: content-box;
  background-repeat: no-repeat;
  background-position: 0 0;
  transition: all .1s ease-in;
  cursor: pointer;

  &:after {
    background-image: url('/img/frame1.webp');
    width: 100%;
    height: 100%;
    background-size: cover;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transition: all .2s ease-in;
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:hover:after {
    background-image: url('/img/frame2.webp');
  }

  h3 {
    filter: drop-shadow(0 0 4px rgb(0, 0, 0))
  }
}

.frame-class {
  background-image: url('/img/classes.webp');
}

.frame-profession {
  background-image: url('/img/professions.webp');
}
</style>