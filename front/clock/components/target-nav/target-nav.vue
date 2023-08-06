<template>
	<view class="targetNav">
		<view class="targetNav1" v-if="target.data.Doing">
			<view class="targetNav1Word">
				<text>进行中</text>
			</view>
		</view>
		<view class="targetNav2" v-if="target.data.ifDoing" @click="ifDoing">
			<text>进行中</text>
		</view>


		<view class="targetNav1" v-if="target.data.Done">
			<view class="targetNav1Word">
				<text>已完成</text>
			</view>
		</view>
		<view class="targetNav2" v-if="target.data.ifDone" @click="ifDone">
			<text>已完成</text>
		</view>


		<view class="targetNav1" v-if="target.data.Expire">
			<view class="targetNav1Word">
				<text>已过期</text>
			</view>
		</view>
		<view class="targetNav2" v-if="target.data.ifExpire" @click="ifExpire">
			<text>已过期</text>
		</view>

		<view class="targetNavImage">
			<image src="@\static\TargetNav.svg" style="width: 48rpx;height:48rpx;" />
		</view>
	</view>
</template>

<script setup>
	name: "TargetNav"
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
	import {
		useUserStore
	} from "../../store/user";
	const url = inject('url');
	const user = useUserStore()
	const target = useTargetStore()
	const state = reactive({
		targetNoTime: [],
		targetWithTime: [],
		targetCompleted: [],
		targetExpire: [],
		ifshowButton: true,
		ifshowTargetTaskNull0: false,
		ifshowTargetTaskNull1: false,
		ifshowTargetTaskPAT: false,
		ifshowTargetTaskPATDelete: true,
		index: 0
	});

	onMounted(() => {
		target.data.targetName = ""
		target.data.targetDescribe = ""
		target.data.targetHour = ""
		target.data.deadline = ""
		target.data.targetPoint = 0

		target.data.ifTargetUpdate = 0

	})

	const ifDoing = () => {
		target.data.Doing = true;
		target.data.ifDoing = false;
		target.data.ifDone = true;
		target.data.Done = false;
		target.data.ifExpire = true;
		target.data.Expire = false;

		target.data.ifshowTargetTaskNull2 = false
		target.data.ifshowTargetTaskNull3 = false
		if (target.data.targetNoTimeLength == 0) {
			target.data.ifshowTargetTaskNull0 = true
		}
		if (target.data.targetWithTimeLength == 0) {
			target.data.ifshowTargetTaskNull1 = true
		}

	}
	const ifDone = () => {
		target.data.ifDoing = true;
		target.data.Doing = false;
		target.data.Done = true;
		target.data.ifDone = false;
		target.data.ifExpire = true;
		target.data.Expire = false;


		target.data.ifshowTargetTaskNull0 = false
		target.data.ifshowTargetTaskNull1 = false
		target.data.ifshowTargetTaskNull3 = false
		if (target.data.targetCompletedLength == 0) {
			target.data.ifshowTargetTaskNull2 = true
		}
	}
	const ifExpire = () => {
		target.data.ifDoing = true;
		target.data.Doing = false;
		target.data.Done = false;
		target.data.ifDone = true;
		target.data.ifExpire = false;
		target.data.Expire = true;

		target.data.ifshowTargetTaskNull0 = false
		target.data.ifshowTargetTaskNull1 = false
		target.data.ifshowTargetTaskNull2 = false
		if (target.data.targetExpireLength == 0) {
			target.data.ifshowTargetTaskNull3 = true
		}

	}
</script>

<style lang="scss">
	.targetNav {
		width: 700rpx;
		height: 64rpx;
		display: flex;
		justify-content: space-between;
		/*两端对齐*/

		align-items: center;
		/*居中对齐*/
		margin: 10rpx;

		.targetNav1 {
			width: 84rpx;
			height: 48rpx;
			border-radius: 32rpx;
			background: rgba(108, 93, 211, 1);
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 8rpx 32rpx 8rpx 32rpx;

			.targetNav1Word {
				width: 84rpx;
				height: 48rpx;
				/** 文本1 */
				font-size: 28rpx;
				font-weight: 600;
				letter-spacing: 0rpx;
				line-height: 48rpx;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				vertical-align: top;

			}
		}

		.targetNav2 {
			width: 84rpx;
			height: 48rpx;
			font-size: 28rpx;
			font-weight: 600;
			letter-spacing: 0rpx;
			line-height: 48rpx;
			color: rgba(94, 98, 114, 1);
			text-align: center;
			vertical-align: top;
		}

		.targetNavImage {
			width: 48rpx;
			height: 48rpx;
			opacity: 1;


			image {
				width: 48rpx;
				height: 48rpx;
			}
		}
	}
</style>