<script setup lang="ts">
import { useVersion } from '@/stores/version'
import { useLanguage } from '@/stores/lang'
import { watch } from 'vue';

const version = useVersion()
const lang = useLanguage()

lang.getTexts()

watch(() => version.version, () => {
  localStorage.setItem('version', version.version)
})

watch(() => lang.language, () => {
  localStorage.setItem('language', lang.language)
  lang.getTexts()
})

const versions = ['10.0.2', '10.0.5', '10.0.7', '10.1', '10.1.5', '10.1.7', '10.2', '10.2.5']
</script>

<template>
  <div class="versions">
    <a class="tww" href="https://projects.yoro.dev/tww-talents/"></a>
    <!-- <a class="bmc" href="http://buymeacoffee.com/ginpachi987" target="_blank"></a> -->
    <select v-model="lang.language">
      <option v-for="(value, key) of lang.langs" :value="key">{{ value }}</option>
    </select>
    <select v-model="version.version">
      <option v-for="v of versions" :value="v">{{ v }}</option>
    </select>
    <a href="https://github.com/ginpachi987/wow-df-talent-calculator/" target="_blank">v2.0.5e</a>
  </div>
</template>

<style scoped lang="scss">
.versions {
  position: fixed;
  right: 16px;
  bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 4px;

  * {
    opacity: .5;
    transition: opacity .2s ease-in;
  }

  *:hover {
    opacity: 1;
  }

  @media (max-width:1024px) {
    position: absolute;
    right: unset;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 32px;
    margin-bottom: 16px;
  }
}

select,
option {
  cursor: pointer;
  background-color: unset;
  border: unset;
  font-size: 16px;
  direction: rtl;
  appearance: none;

  &:focus {
    outline: unset;
  }
}

option {
  background-color: #212121;
}

a {
  padding-left: 4px;
}

.bmc {
  position: fixed;
  bottom: 16px;
  left: 16px;
  width: 140px;
  aspect-ratio: 1090/306;
  background-size: cover;
  background-image: url('/img/bmc-button.png');
  filter: drop-shadow(0 0 0 white);
  transition: all .2s ease-in;

  @media (max-width:1024px) {
    position: relative;
    width: 100px;
    bottom: unset;
    left: unset;
  }
}

.tww {
  position: fixed;
  bottom: 16px;
  left: 16px;
  width: 100px;
  aspect-ratio: 368/276;
  background-size: cover;
  background-image: url('/img/tww-logo.webp');
  filter: drop-shadow(0 0 0 white);
  transition: all .2s ease-in;

  animation: tww forwards 4s;

  @media (max-width:1024px) {
    position: relative;
    width: 60px;
    bottom: unset;
    left: unset;
  }
}

@keyframes tww {
  0% {
    opacity: .5;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: .5;
  }
}
</style>