<template>
  <h1>Hello Vite-plugin-mockjs</h1>
  <div
    style="display: flex; justify-content: space-around; width: 30%; left: 50%; transform: translateX(-50%); position: relative;"
  >
    <a :href="booleanUrl" target="_blank">Boolean-test</a>
    <a :href="jsonUrl" target="_blank">JSON-test</a>
  </div>
  <div
    style="margin-top:20px; display: flex; justify-content: space-around; width: 30%; left: 50%; transform: translateX(-50%); position: relative;"
  >
    <a :href="jsUrlParams1" target="_blank">JS-test-params1</a>
    <a :href="jsUrlParams2" target="_blank">JS-test-params2</a>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const jsonUrl = window.location.href + 'Jsontest'
    const booleanUrl = window.location.href + 'Booleantest'
    const jsUrlParams1 = window.location.href + 'JStest?type=params1'
    const jsUrlParams2 = window.location.href + 'JStest?type=params2'
    return {
      booleanUrl,
      jsonUrl,
      jsUrlParams1,
      jsUrlParams2
    }
  }
})
</script>
<style scoped>
a {
  color: #42b983;
}
</style>
