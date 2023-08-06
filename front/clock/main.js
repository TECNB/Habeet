import App from './App'
// 引入 uView UI


// main.js
import uviewPlus from '@/uni_modules/uview-plus'

// #ifdef VUE3
import {
	createSSRApp
} from 'vue';
import * as Pinia from 'pinia';

export function createApp() {
	const app = createSSRApp(App);
	app.use(Pinia.createPinia());
	app.provide('url', 'https://tengenchang.top');
	//app.provide('url', 'http://localhost:8181');
	app.use(uviewPlus)
	app.mount('#app');
	return {
		app,
		Pinia, // 此处必须将 Pinia 返回
	}
}
// #endif