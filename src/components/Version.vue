<script setup lang="ts">
import { useVersion } from '@/stores/version'
import { useLanguage } from '@/stores/lang'

const version = useVersion()
const lang = useLanguage()
</script>

<template>
  <div class="versions">
    <select name="" id="">
      <option v-for="(value, key) of lang.langs" :value="key">{{ value }}</option>
    </select>
    <select v-model="version.version">
      <option v-for="v of ['10.0.2', '10.0.5', '10.0.7', '10.1']" :value="v">{{ v }}</option>
    </select>
    <a href="https://github.com/ginpachi987/wow-df-talent-calculator/tree/vue" target="_blank">v2.0.1</a>
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
    // width: 100px;
  }

  *:hover {
    opacity: 1;
  }

  @media (max-width:900px) {
    position: absolute;
    right: unset;
    width: 100%;
    justify-content: center;
    flex-direction: row;
    gap: 32px;
    margin-bottom: 16px;
  }
}

select,
option {
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
</style>