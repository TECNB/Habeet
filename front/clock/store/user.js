import {
	defineStore
} from "pinia"

export const useUserStore = defineStore('user', {
	state: () => ({
		data: {
			userEmail: "",
			userName: "",
			userPassword: "",
			userCode: "",
			point: 0,
			completeTarget: 0,
			ifUpdate: 0,
			code: 0,
			picData: "",
			picUrl: "",
			userInfo: []
		}
	}),
	actions: {}
})