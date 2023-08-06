import {
	defineStore
} from "pinia"

export const useTimeStore = defineStore('time', {
	state: () => ({
		data: {

			ifstart: false,
			ifbegin: true,
			ifend: false,
			formattedTime: 0,
			remainingTime: 0,
			showNav_menu: true
		},

	}),
	actions: {}
})