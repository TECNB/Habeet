import {
	defineStore
} from "pinia"

export const useTagStore = defineStore('tag', {
	state: () => ({
		data: {
			tagName: "",
			tagDescribe: "",
			tagPoint: "",
			tagHour: 0,
			tagMinute: 0,
			tagSecond: 0,
			tagTime: "",
			ifDoing: false,
			Doing: true,
			ifDone: true,
			Done: false,
			ifExpire: true,
			Expire: false,
			currentTime: "",
			tagTime: [],
			tagTimeDate: [],
			dayDiff: [],
			timeDiff: [],
			ifshowDay: [],
			ifshowTagMenu: false,
			ifshowTagDetailB: true,
			ifshowTagDetailBDelete: false,
			ifTagUpdate: 0,
			tagId: 0,
			ifTargetUpdate: 0,

		},

	}),
	actions: {}
})