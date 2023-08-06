<template>
	<navigator url="../../pages/Store/Store" open-type="redirect" animation-type="fade-in">
		<div class="storeBefore">
			<div class="storeBeforeImage">
				<image src="@\static\Store.svg" style="width: 48rpx;height:48rpx;" />
			</div>
			<div class="storeBeforeWords">
				<p>商店</p>
			</div>
		</div>
	</navigator>

</template>

<script setup>
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	const router = useRouter();

	name: "StoreBefore"
</script>

<style lang="scss">
	.storeBefore {
		display: flex;
		margin-top: 64rpx;
	}

	.storeBeforeImage {
		margin-left: 6rpx;
	}

	.storeBeforeWords {
		font-size: 28rpx;
		font-weight: 600;
		letter-spacing: 0rpx;
		line-height: 48rpx;
		color: rgba(27, 32, 42, 1);
		text-align: left;
		vertical-align: top;
		margin-left: 32rpx;
	}
</style>