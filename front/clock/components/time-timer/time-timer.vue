<template>
	<view class="timer">
		<view class="timerImage">
			<image src="@\static\Progress.png" style="width: 480rpx;height: 480rpx;" />
		</view>
		<view class="timerTagF">
			<view class="timerTag" @click="showTagMenu">
				<!-- 动态 -->
				<text>{{tag.data.tagName}}</text>
			</view>
		</view>

		<view class="timerWork">
			<!-- 计时 -->
			<text>{{ time.data.formattedTime }}</text>
		</view>
		<view class="timerWords">
			<text>开始学习吧</text>
		</view>
		<view class="timerButton">
			<button @click="timeBegin" v-if="time.data.ifbegin">
				<text>开始</text>
			</button>
			<button @click="timeEnd" v-if="time.data.ifend">
				<text>结束</text>
			</button>
		</view>
		<uni-popup ref="popup1" type="dialog">
			<uni-popup-dialog type="error" mode="base" title="确定要放弃吗?" content="本次计时将不会得到任何分数" :duration="2000"
				before-close="true" @close="close1" @confirm="confirm1"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup2" type="dialog">
			<uni-popup-dialog type="info" mode="base" title="计时结束" :content="state.content" :duration="2000"
				before-close="true" @close="close2" @confirm="confirm2"></uni-popup-dialog>
		</uni-popup>
	</view>
	<tag-menu></tag-menu>
</template>

<script setup>
	import {
		reactive,
		toRef,
		onMounted,
		ref,
		computed,
		onBeforeUnmount
	} from "vue";
	import {
		inject
	} from 'vue';
	name: "time-timer"
	import {
		useTagStore
	} from "../../store/tag";
	import {
		useUserStore
	} from "../../store/user";
	import {
		useTimeStore
	} from "../../store/time";
	const url = inject('url');
	const user = useUserStore()
	const tag = useTagStore()
	const time = useTimeStore()
	const state = reactive({
		remainingTime: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
		formattedTime: '',
		content: ''
	});
	// 声明计时器变量
	let countdownInterval = null;
	let popup1 = ref(null); //本质是reactive({value:null})
	let popup2 = ref(null);
	onMounted(() => {});
	// 计算剩余时间
	time.data.remainingTime = (tag.data.tagHour * 3600) + (tag.data.tagMinute * 60) + tag.data.tagSecond

	// 格式化时间为两位数
	const formatTime = (time) => {
		return String(time).padStart(2, '0');
	};

	// 获取格式化后的时间
	time.data.formattedTime = computed(() => {
		state.hours = Math.floor(time.data.remainingTime / 3600);
		state.minutes = Math.floor((time.data.remainingTime % 3600) / 60);
		state.seconds = Math.floor(time.data.remainingTime % 60);
		return `${formatTime(state.hours)}:${formatTime(state.minutes)}:${formatTime(state.seconds)}`;
	});


	const timeup = () => {
		uni.request({
			url: url + '/tag/finish',
			method: "POST",
			data: {
				tagName: tag.data.tagName,
			},
			success: (res) => {
				console.log(res)
				user.data.point = res.data.data.tagPoint
			}
		})
		// 清除计时器
		clearInterval(countdownInterval);
		countdownInterval = null;
		time.data.remainingTime = (tag.data.tagHour * 3600) + (tag.data.tagMinute * 60) + tag.data.tagSecond
		time.data.ifbegin = !time.data.ifbegin
		time.data.ifend = !time.data.ifend
		state.content = "本次计时获得" + " " + tag.data.tagPoint + "points"
		popup2.value.open()
	}


	const timeBegin = () => {
		if (tag.data.tagName == null) {
			uni.showToast({
				icon: "none",
				title: '没有标签，快去建立吧'
			});
		} else {
			time.data.showNav_menu = false
			// 每秒更新一次剩余时间并重新计算格式化后的时间
			countdownInterval = setInterval(() => {
				time.data.remainingTime--;
				if (time.data.remainingTime <= 0) {
					clearInterval(countdownInterval);
					countdownInterval = null;
					timeup()
				}
			}, 1000);
			time.data.ifbegin = !time.data.ifbegin
			time.data.ifend = !time.data.ifend
		}
	}


	const timeEnd = () => {
		popup1.value.open()
	}
	const confirm1 = () => {
		time.data.showNav_menu = true
		// 清除计时器
		clearInterval(countdownInterval);
		countdownInterval = null;
		time.data.remainingTime = (tag.data.tagHour * 3600) + (tag.data.tagMinute * 60) + tag.data.tagSecond
		time.data.ifbegin = !time.data.ifbegin
		time.data.ifend = !time.data.ifend
		popup1.value.close()
	}

	const close1 = () => {
		time.data.showNav_menu = true
		popup1.value.close()
	}
	const confirm2 = () => {
		time.data.showNav_menu = true
		popup2.value.close()
	}

	const close2 = () => {
		time.data.showNav_menu = true
		popup2.value.close()
	}
	const showTagMenu = () => {
		tag.data.ifshowTagMenu = !tag.data.ifshowTagMenu
	}

	// 组件导出
	onBeforeUnmount(() => {
		// 组件卸载前清除计时器
		clearInterval(countdownInterval);
	});
</script>

<style lang="scss">
	.timerTagF {
		display: flex;
		justify-content: center;
		align-items: center;

		.timerTag {
			display: inline-block;
			padding-left: 20rpx;
			padding-right: 20rpx;
			margin-top: 30rpx;
			border-radius: 80rpx;
			background: rgba(233, 233, 255, 1);
			/** 文本1 */
			font-size: 24rpx;
			font-weight: 550;
			line-height: 52rpx;
			color: rgba(108, 93, 211, 1);
			text-align: center;

		}
	}


	.timer {
		margin: 0 auto;
		margin-top: 40rpx;
		width: 654rpx;
		border-radius: 40rpx;
		background: rgba(128, 129, 145, 0.04);

		.timerImage {

			margin: 0 auto;
			padding-top: 30rpx;
			width: 480rpx;
			height: 480rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}



		.timerWork {
			padding: 30rpx 30rpx 30rpx 30rpx;
			font-weight: 600;
			color: rgba(108, 93, 211, 1);
			font-size: 100rpx;
			text-align: center;
		}

		.timerWords {
			margin: 0 auto;
			opacity: 1;
			/** 文本1 */
			font-size: 28rpx;
			font-weight: 500;
			letter-spacing: 0rpx;
			color: rgba(128, 129, 145, 1);
			text-align: center;
			vertical-align: top;
		}

		.timerButton {

			display: flex;
			justify-content: center;
			align-items: center;
			width: 654rpx;
			height: 320rpx;
		}

		.timerButton button {
			display: block;
			margin: 0 auto;

			width: 236rpx;
			height: 96rpx;
			border-radius: 40rpx;
			border: none;
			outline: none; //消除默认点击蓝色边框效果
			background: rgba(108, 93, 211, 1);

			font-weight: 700;
			letter-spacing: 0rpx;
			line-height: 96rpx;
			color: rgba(255, 255, 255, 1);
			text-align: center;

		}
	}
</style>