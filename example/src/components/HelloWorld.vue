<template>
  <h1>Hello Vite-plugin-mockjs</h1>
  <div style="display: flex; justify-content: space-around; width: 30%; left: 50%; transform: translateX(-50%); position: relative;">
    <a :href="booleanUrl" target="_blank">Boolean-test</a>
    <a :href="jsonUrl" target="_blank">JSON-test</a>
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">JS-test</a>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
   setup(){
     const jsonUrl = window.location.href + 'Jsontest'
     const booleanUrl = window.location.href + 'Booleantest'
     return{
       booleanUrl,
       jsonUrl
     }
   }
})
</script>
<style scoped>
a {
  color: #42b983;
}
</style>
