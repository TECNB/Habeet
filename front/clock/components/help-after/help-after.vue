<template>
	<navigator url="../../pages/Help/Help.vue" open-type="redirect">
		<view class="helpAfter">
			<view class="helpAfterLong">
				<view class="helpAfterShort">
					<view>
						<image src="@\static\helpAfter.svg" />
					</view>
				</view>
				<view class="helpAfterWord">
					<p>关于</p>
				</view>
			</view>

		</view>
	</navigator>

</template>

<script setup>
	name: "HelpAfter"
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	const router = useRouter();
</script>

<style lang="scss">
	.helpAfter {
		margin-top: 56rpx;
	}

	.helpAfterShort {
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

		/*居中对齐*/
		image {
			width: 48rpx;
			height: 48rpx;
			opacity: 1;

		}
	}

	.helpAfterLong {
		display: flex;
		width: 302rpx;
		height: 64rpx;
		opacity: 1;
		border-radius: 16rpx;
		background: linear-gradient(180deg, rgba(205, 231, 255, 1) 0%, rgba(193, 225, 255, 1) 100%);
		align-items: center;
		/*居中对齐*/

		.helpAfterWord {
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