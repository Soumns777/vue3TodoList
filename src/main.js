import { createApp } from 'vue'
import App from './App.vue'
import './index.css'


// TODO 导入vuex
import  store from  './store/index.js'
// app.use(store) 可以写在下面一起注册

// TODO 导入 vue-router
import  router from './router/index.js'
// app.use(router)  可以写在下面一起注册

// Soumns 导入ant-designUI框架
import Antd from 'ant-design-vue';
// Soumns 导入ant-design样式文件
import 'ant-design-vue/dist/antd.css';



const app = createApp(App)

// FIXME 注册全局变量
import { message } from 'ant-design-vue'
app.config.globalProperties.$message = message

// FIXME 注册store、router、Antd
app.use(store).use(router).use(Antd).mount('#app')

