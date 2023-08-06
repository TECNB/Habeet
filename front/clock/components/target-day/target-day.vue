<template>
	<view class="tagetDay">
		<scroll-view class="scroll-view" scroll-x="true" enable-flex="true">
			<view class="Mon" v-for="(item, index) in state.dayList" :key="index" @click="classChange(index)">
				<text>{{item.week}}</text>
				<view :class="item.className">
					<text class="Num">{{item.day}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		reactive,
		toRefs,
		onMounted
	} from "vue";
	import {
		inject
	} from 'vue';
	import {
		useTargetStore
	} from "../../store/target";
	const url = inject('url');
	const target = useTargetStore()

	name: "TargetDay"

	//今天的时间
	let time = new Date()
	let myDate = time.getDate()
	let dayNum = time.getDay()
	let myMonth = time.getMonth()
	//星期数组
	let weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

	const state = reactive({
		dayList: []
	});

	state.dayList.push({
		'day': time.getDate(),
		'month': time.getMonth(),
		'week': weeks[time.getDay()],
		'className': 'NumCenter'
	})
	//必须用onMounted，使得在每次刷新后都重置回原来的值,也可以用来存放初始值，
	//在classChange方法中的内容都要在onMounted来做好初始状态，否则当进入页面的时候，没有数据，需要点击才能出数据
	//重点理解一下吧
	//还有避免每次刷新都存入数据的方法就是在方法开头就重置数组为空，简单有效
	//卡了1小半时，下头bug
	onMounted(() => {
		const selectedDate = new Date(time.getFullYear(), state.dayList[0].month, 1);
		time = new Date(selectedDate); // 创建新的日期对象

		time.setDate(state.dayList[0].day)
		time.setMonth(state.dayList[0].month)
		target.data.currentTime = time.toString()

		target.data.dayDiff = []
		target.data.ifshowDay = []
		target.data.deadlineDate.forEach((item) => {
			let currentTime = new Date(target.data.currentTime)
			let timeDiff = item.getTime() - currentTime.getTime()
			let dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24))
			if (dayDiff > 0) {
				target.data.ifshowDay.push(true)
			} else if (dayDiff < 0) {
				const month = item.getMonth() + 1; // 当前月份
				const date = item.getDate(); // 当前日期
				dayDiff = `${month}.${date}`;
				target.data.ifshowDay.push(false);
			} else {
				const hours = item.getHours();
				const minutes = item.getMinutes();

				const timeString = `${hours}:${minutes.toString().padStart(2, '0')}`;
				dayDiff = timeString;
				target.data.ifshowDay.push(false);
			}
			target.data.dayDiff.push(dayDiff)
			console.log(target.data.dayDiff)
		});
	})


	for (let i = 0; i < 30; i++) {
		time.setDate(time.getDate() + 1)
		state.dayList.push({
			'day': time.getDate(),
			'month': time.getMonth(),
			'week': weeks[time.getDay()],
			'className': 'Num'
		})
	}



	const classChange = (index) => {
		state.dayList.forEach((item) => {
			item.className = "Num"; // 先将所有日期的 className 属性设置为 Num
		});
		state.dayList[index].className = "NumCenter"; // 将点击的日期的 className 属性设置为 NumCenter

		const selectedDate = new Date(time.getFullYear(), state.dayList[index].month, 1);
		time = new Date(selectedDate); // 创建新的日期对象

		time.setDate(state.dayList[index].day)
		time.setMonth(state.dayList[index].month)
		target.data.currentTime = time.toString()
		target.data.dayDiff = []
		target.data.ifshowDay = []
		target.data.deadlineDate.forEach((item) => {


			let currentTime = new Date(target.data.currentTime)
			let timeDiff = item.getTime() - currentTime.getTime()
			let dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24))

			if (dayDiff > 0) {
				target.data.ifshowDay.push(true)
			} else if (dayDiff < 0) {
				const month = item.getMonth() + 1; // 当前月份
				const date = item.getDate(); // 当前日期
				dayDiff = `${month}.${date}`;
				target.data.ifshowDay.push(false);
			} else {
				const hours = item.getHours();
				const minutes = item.getMinutes();

				const timeString = `${hours}:${minutes.toString().padStart(2, '0')}`;
				dayDiff = timeString;
				target.data.ifshowDay.push(false);
			}
			target.data.dayDiff.push(dayDiff)
		});

		target.data.dayDiff.forEach((item) => {

		});

	};
</script>

<style lang="scss">
	.tagetDay {
		margin: 40rpx 20rpx 20rpx 20rpx;
	}

	.scroll-view {
		display: flex;
		justify-content: space-between;
		/*两端对齐*/
		align-items: center;
		/*居中对齐*/
		white-space: nowrap;
		height: 130rpx;
		width: 700rpx;

		.Mon {
			margin-right: 50rpx;
			width: 64rpx;
			font-size: 28rpx;
			font-weight: 600;
			letter-spacing: 0rpx;
			line-height: 64rpx;
			color: rgba(128, 129, 145, 1);
			text-align: center;
			vertical-align: top;


			.Num {
				width: 64rpx;
				height: 64rpx;
				display: block;
				font-size: 28rpx;
				font-weight: 600;
				letter-spacing: 0rpx;
				line-height: 64rpx;
				color: rgba(207, 200, 255, 1);
			}

			.NumCenter {
				width: 64rpx;
				height: 64rpx;
				opacity: 1;
				background: linear-gradient(225deg, rgba(142, 150, 255, 1) 0%, rgba(108, 93, 211, 1) 100%);
				box-shadow: 8rpx 20rpx 40rpx 0rpx rgba(0, 0, 0, 0.06);
				border-radius: 50%;
			}
		}
	}
</style>