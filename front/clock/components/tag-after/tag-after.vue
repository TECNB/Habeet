<template>
	<navigator url="../../pages/Tag/Tag" open-type="redirect">
		<view class="tagAfter">
			<view class="tagAfterLong">
				<view class="tagAfterShort">
					<view>
						<image src="@\static\Tag_re.svg" />
					</view>
				</view>
				<view class="tagAfterWord">
					<p>标签</p>
				</view>
			</view>
			<view></view>
		</view>
	</navigator>

</template>

<script setup>
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	const router = useRouter();
	name: "TagAfter"
</script>

<style lang="scss">
	.tagAfter {
		margin-top: 56rpx;
	}

	.tagAfterShort {
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

	.tagAfterLong {
		display: flex;
		width: 302rpx;
		height: 64rpx;
		opacity: 1;
		border-radius: 16rpx;
		background: linear-gradient(180deg, rgba(205, 231, 255, 1) 0%, rgba(193, 225, 255, 1) 100%);
		align-items: center;
		/*居中对齐*/

		.tagAfterWord {
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