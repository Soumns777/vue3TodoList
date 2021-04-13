// src目录下创建 store 文件夹,里面放入 index.js
// store/index.js目录下
// TODO createStore 创建一个store状态管理库
import { createStore } from "vuex";
// 将store管理库的几个模块导出,以便于导入到 main.js(入口) 文件里
// TODO 导入axios
import axios from "axios";

export default createStore({
  state: {
    // Soumns 渲染列表的数据
    listData: JSON.parse(window.sessionStorage.getItem("listData")) || [],

    //  Soumns input框输入内容(从本地拉取数据)
    inputValue: JSON.parse(window.sessionStorage.getItem("inputValue")) || "",

    // Soumns  下一个id
    nextId: 5,
  },
  mutations: {
    // TODO 获取初始数据
    getListData(state, info) {
      // 更新到vuex
      state.listData = info;
      // 保存到本地
      window.sessionStorage.setItem("listData", JSON.stringify(state.listData));
    },

    // TODO 改变表单数据
    changeTodo(state, info) {
      state.inputValue = info;
    },

    // TODO 添加数据
    addTodo(state, info) {
      // 保存到vuex
      state.inputValue = info;

      // 将数据保存到本地,实现永久存储
      window.sessionStorage.setItem(
        "inputValue",
        JSON.stringify(state.inputValue)
      );

      // 往state的listData中推一条数据,模拟调用接口增加数据
      const obj = {
        id: state.nextId - 1,
        done: false,
        content: info,
      };

      console.log(state.nextId);
      // 追加一条数据
      state.listData.push(obj);

      // 将下一条数据的nextId自增
      state.nextId++;

      // 清空表单数据
      state.inputValue = "";
    },

    // TODO 删除数据
    delTodos(state, info) {
      // console.log(77777)
      state.listData = state.listData.filter((item) => {
        return item.id !== info;
      });
    },

    // TODO 改变数据
    changeStatus(state, info) {
      // 找到对应修改的那一条todo
      const i = state.listData.findIndex((item) => item.id === info);
      // 修改对应的数据
      state.listData[i].done = !state.listData[i].done;
    },
  },
  actions: {
    // FIXME 调用接口获取数据
    async getListDataSync(context) {
      const { data: res } = await axios.post(
        "https://easy-mock.bookset.io/mock/6050b5a9aefff2657c6dae3d/soumns777/getContent"
      );
      console.log(res);
      // console.log(context)

      // 将数据传给mutations的方法
      context.commit("getListData", res);
    },
  },
  getters: {},
});
