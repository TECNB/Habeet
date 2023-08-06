<template>
	<view class="menu">
		<time-avater></time-avater>
		<view class="menuButton">
			<focus-before v-if="state.showFocusBefore"></focus-before>
			<focus-after v-if="state.showFocusAfter"></focus-after>

			<target-before v-if="state.showTargetBefore"></target-before>
			<target-after v-if="state.showTargetAfter"></target-after>

			<tag-before v-if="state.showTagBefore"></tag-before>
			<tag-after v-if="state.showTagAfter"></tag-after>

			<store-before v-if="state.showStoreBefore"></store-before>
			<store-after v-if="state.showStoreAfter"></store-after>

			<user-before v-if="state.showUserBefore"></user-before>
			<user-after v-if="state.showUserAfter"></user-after>

			<setting-before v-if="state.showSettingBefore"></setting-before>
			<setting-after v-if="state.showSettingAfter"></setting-after>

			<help-before v-if="state.showHelpBefore"></help-before>
			<help-after v-if="state.showHelpAfter"></help-after>
			<logout></logout>
		</view>
	</view>

</template>

<script setup>
	import {
		reactive,
		toRefs,
		onMounted
	} from "vue";
	import {
		useTagStore
	} from "../../store/tag";
	import {
		useUserStore
	} from "../../store/user";
	import {
		useTimeStore
	} from "../../store/time";

	const user = useUserStore()
	const tag = useTagStore()
	const time = useTimeStore()

	name: "time-menu"

	const props = defineProps({
		menuTo: {
			type: String,
			required: true
		}
	})

	const state = reactive({

		showFocusBefore: true,
		showTargetBefore: true,
		showTagBefore: true,
		showStoreBefore: true,
		showUserBefore: true,
		showSettingBefore: true,
		showHelpBefore: true,


		showFocusAfter: false,
		showTargetAfter: false,
		showTagAfter: false,
		showStoreAfter: false,
		showUserAfter: false,
		showSettingAfter: false,
		showHelpAfter: false,

	});

	if (props.menuTo == '/menu/1') {
		state.showFocusAfter = true;
		state.showFocusBefore = false;
	} else if (props.menuTo == "/menu/2") {
		state.showTargetBefore = false;
		state.showTargetAfter = true;
	} else if (props.menuTo == "/menu/3") {
		state.showTagBefore = false;
		state.showTagAfter = true;
	} else if (props.menuTo == "/menu/4") {
		state.showStoreBefore = false;
		state.showStoreAfter = true;
	} else if (props.menuTo == "/menu/5") {
		state.showUserBefore = false;
		state.showUserAfter = true;
	} else if (props.menuTo == "/menu/6") {
		state.showSettingBefore = false;
		state.showSettingAfter = true;
	} else if (props.menuTo == "/menu/7") {
		state.showHelpBefore = false;
		state.showHelpAfter = true;
	}
</script>

<style lang="scss">
	.menu {

		height: 1500rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;

		background-color: #fff;
		border-radius: 20rpx;
	}

	.menuButton {
		margin-top: 100rpx;
	}
</style>