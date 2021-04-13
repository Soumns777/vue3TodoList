<template>
  <!--  Honey 挂载TodoList组件 -->
  <todoList></todoList>
</template>

  <script>
// TODO 导入TodoList组件
import  todoList from './views/Todos/index.vue'
export default {
  name: 'App',
  components: {
    todoList
  },
  setup(props,context) {
    console.log(props,context)

    return {}
  }
}
</script>
<style lang="scss" scoped >

</style>
