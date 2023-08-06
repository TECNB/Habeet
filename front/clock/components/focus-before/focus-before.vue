<template>
	<navigator url="../../pages/index/Time" open-type="redirect">
		<div class="focusBefore">
			<div class="focusBeforeImage">
				<image src="@\static\CountDown.svg" style="width: 48rpx;height:48rpx;" />
			</div>
			<div class="focusBeforeWords">
				<p>专注</p>
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
	name: "FocusBefore"
</script>

<style lang="scss">
	.focusBefore {
		display: flex;
		margin-top: 64rpx;
	}

	.focusBeforeImage {
		margin-left: 6rpx;
	}

	.focusBeforeWords {
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