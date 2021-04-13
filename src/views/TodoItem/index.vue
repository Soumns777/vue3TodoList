<template>
  <div class="item">
    <a-list item-layout="horizontal" :data-source="listData">
      <template #renderItem="{ item }">
        <a-list-item class="listItem">
          <!--  Honey 复选框 -->
          <!--          <a-checkbox v-model:checked="checked" @change="changeChecked"></a-checkbox>-->
          <span v-if="!item.done">代办</span>
          <span v-else>已办</span>

          <span>{{ item.done }}</span>
          <span>{{ item.content }}</span>
          <span>{{ item.id }}</span>
          <!--  Honey 转为已办 -->
          <StarTwoTone @click="changeStatus(item.id)" />

          <!--  Honey 删除 -->
          <a-button type="danger" @click="delTodo(item.id)">删除</a-button>

          <!--          {{ listData }}-->
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { StarTwoTone } from "@ant-design/icons-vue";

export default defineComponent({
  name: " MyTodoItem",
  props: ["listData"],
  components: {
    StarTwoTone,
  },
  // FIXME props 接收的参数 ; context 上下文对象
  setup(props, context) {
    console.log(props, context);

    // TODO 获取vuex
    const store = useStore();

    // TODO 删除当前的todo (根据对应的todo id从列表中删除对应的数据)
    const delTodo = (id) => {
      store.commit("delTodos", id);
    };

    // TODO 改变当前的状态
    const changeStatus = (id) => {
      store.commit("changeStatus", id);
    };

    // 创建数据
    const checked = ref(false);

    // FIXME 改变复选框的状态
    const changeChecked = (val) => {
      console.log(val);
    };

    // FIXME 导出
    return { checked, changeChecked, delTodo, changeStatus };
  },
});
</script>

<style scoped lang="scss">
.item {
  //display: flex;

  margin: 10px auto;
  width: 600px;
  //height: 300px;
  //background-color: #ff6100;
  -webkit-box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  border-radius: 20px;

  .listItem {
    display: flex;
    padding: 0 50px;
  }
}
</style>
