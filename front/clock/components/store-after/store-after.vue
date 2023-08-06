<template>
	<navigator url="../../pages/Store/Store" open-type="redirect" animation-type="fade-in">
		<view class="storeAfter">
			<view class="storeAfterLong">
				<view class="storeAfterShort">
					<view>
						<image src="@\static\Store_re.svg" />
					</view>
				</view>
				<view class="storeAfterWord">
					<p>商店</p>
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

	name: "StoreAfter"
</script>

<style lang="scss">
	.storeAfter {
		margin-top: 56rpx;
	}

	.storeAfterShort {
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

	.storeAfterLong {
		display: flex;
		width: 302rpx;
		height: 64rpx;
		opacity: 1;
		border-radius: 16rpx;
		background: linear-gradient(180deg, rgba(205, 231, 255, 1) 0%, rgba(193, 225, 255, 1) 100%);
		align-items: center;
		/*居中对齐*/

		.storeAfterWord {
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