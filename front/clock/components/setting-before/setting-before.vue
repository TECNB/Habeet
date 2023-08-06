<template>
	<navigator url="../../pages/Setting/Setting" open-type="redirect">
		<div class="settingBefore">
			<div class="settingBeforeImage">
				<image src="@\static\Setting.svg" style="width: 48rpx;height:48rpx;" />
			</div>
			<div class="settingBeforeWords">
				<p>设置</p>
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

	name: "SettingBefore"
</script>

<style lang="scss">
	.settingBefore {
		display: flex;
		margin-top: 64rpx;
	}

	.settingBeforeImage {
		margin-left: 6rpx;
	}

	.settingBeforeWords {
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