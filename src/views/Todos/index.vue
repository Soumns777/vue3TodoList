<template>
  <div>

    <!--  Honey input框 -->
    <a-input :value="inputValue" placeholder="新增代办" class="inp" @pressEnter="getInputValue" @change="changeInputValue"/>

    <!-- Honey 图标-->
    <AppleOutlined class="icon" :style="{fontSize: '30px', color: '#cccccc'}"/>

    <!--  Honey 导入的存放数据的面板组件 -->
    <todoItem v-model:listData="listData"></todoItem>
    <!--  {{ listData }}-->
  </div>
</template>

<script>
import {computed, defineComponent, onMounted, ref} from 'vue';
import {AppleOutlined, PlusCircleTwoTone} from '@ant-design/icons-vue';
import 'ant-design-vue/dist/antd.css';


// TODO 导入vuex
import {useStore} from 'vuex'
// TODO 导入显示数据的组件
import todoItem from '../TodoItem/index.vue'
// TODO 导入提示组件
import {message} from 'ant-design-vue'

export default defineComponent({
  name: " MyTodos",
  // Soumns 导入icon图标组件
  components: {
    PlusCircleTwoTone,
    AppleOutlined,
    todoItem
  },
  // FIXME props 接收的参数 ; context 上下文对象
  setup(props, context) {
    console.log(props, context)

    // TODO 利用ref创建响应式数据
    const aInput = ref()

    // TODO 导入vuex的数据和方法
    const store = useStore()


    // FIXME 实时改变用户输入的数据
    const changeInputValue = (e) => {
      // console.log(e.target.value)

      store.commit('changeTodo', e.target.value)

    }

    // FIXME 用户按下Enter获取用户input框输入的内容
    const getInputValue = (e) => {
      // console.log(e.target.value)

      if (!e.target.value.trim()) return message.warn('麻烦有点眼力劲好吧!')

      // 保存至vuex中
      store.commit('addTodo', e.target.value)


    }

    // FIXME  利用计算属性来获取vuex的state里面的数据
    const inputValue = computed(() => {
      return store.state.inputValue
    })

    // FIXME 列表数据渲染
    const listData = computed(() => {
      return store.state.listData
    })


    onMounted(() => {
      store.commit('addTodo', '')

      store.dispatch('getListDataSync')
    })


    // Soumns 导出
    return {aInput, inputValue, listData, changeInputValue, getInputValue}

  }
})
</script>

<style lang="scss" scoped>
// TODO 修改input的placeholder的默认样式
input::-webkit-input-placeholder {
  padding-left: 10px;
  //color: palevioletred;
}

.inp {
  width: 600px;
  height: 40px;
  margin: auto;
  -webkit-box-shadow: 0 3px 8px rgba(0, 0, 0, .15);
  -moz-box-shadow: 0 3px 8px rgba(0, 0, 0, .15);
  box-shadow: 0 3px 8px rgba(0, 0, 0, .15);
  border-radius: 20px;
}

.icon {
  position: absolute;
  left: 1021px;
  top: 64px;
  z-index: 2;
}


</style>
