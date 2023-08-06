<template>
	<view class="focusAfter">
		<navigator url="../../pages/index/Time" open-type="redirect">
			<view class="focusAfterLong">
				<view class="focusAfterShort">
					<view>
						<image src="@\static\CountDown_re.svg" />
					</view>
				</view>
				<view class="focusAfterWord">
					<p>专注</p>
				</view>
			</view>
		</navigator>

	</view>
</template>

<script setup>
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	const router = useRouter();

	name: "FocusAfter"
</script>

<style lang="scss">
	.focusAfter {
		margin-top: 56rpx;
	}

	.focusAfterShort {
		display: flex;
		width: 64rpx;
		height: 64rpx;
		opacity: 1;
		border-radius: 16rpx;
		background: linear-gradient(225deg, rgba(142, 150, 255, 1) 0%, rgba(108, 93, 211, 1) 100%);
		align-items: center;
		/*居中对齐*/
		justify-content: center;

		view {
			width: 48rpx;
			height: 48rpx;
		}

		image {
			width: 48rpx;
			height: 48rpx;
			opacity: 1;

		}
	}

	.focusAfterLong {
		display: flex;
		width: 302rpx;
		height: 64rpx;
		opacity: 1;
		border-radius: 16rpx;
		background: linear-gradient(180deg, rgba(205, 231, 255, 1) 0%, rgba(193, 225, 255, 1) 100%);
		align-items: center;
		/*居中对齐*/

		.focusAfterWord {
			height: 48rpx;
			font-size: 28rpx;
			font-weight: 600;
			letter-spacing: 0rpx;
			line-height: 48rpx;
			color: rgba(108, 93, 211, 1);
			text-align: left;
			margin-left: 24rpx;
		}
	}
</style>