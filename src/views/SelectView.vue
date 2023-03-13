<script setup lang="ts">
</script>

<template>
<div class="frames">
  <RouterLink to="/classes" class="frame frame-class"><h3>Classes</h3></RouterLink>
  <RouterLink to="/professions" class="frame frame-profession"><h3>Professions (WIP)</h3></RouterLink>
</div>
</template>

<style scoped lang="scss">
.frames {
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
    background-image: url('https://projects.yoro.dev/df-talents/frame1.1fc5987483560ce7.webp');
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
    background-image: url('https://projects.yoro.dev/df-talents/frame2.ede7678b9d228b33.webp');
  }

  h3 {
    filter: drop-shadow(0 0 4px rgb(0, 0, 0))
  }
}

.frame-class {
  background-image: url('https://projects.yoro.dev/df-talents/classes.ae8a1582af62aae1.webp');
}

.frame-profession {
  background-image: url('https://projects.yoro.dev/df-talents/professions.ababd10249047f8f.webp');
}
</style>