import {
	defineStore
} from "pinia"

export const useStoreStore = defineStore('store', {
	state: () => ({
		data: {
			storeName: "",
			storeDescribe: "",
			storePoint: "",
			storeHour: 0,
			storeMinute: 0,
			storeSecond: 0,
			ifStoreUpdate: 0,
			hour: [1],
			minute: [0],
			second: 0,
			ifstart: false,
			ifbegin: true,
			ifend: false
		},

	}),
	actions: {}
})