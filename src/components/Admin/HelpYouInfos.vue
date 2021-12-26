<template>
  <template v-for="(helpYouInfo, index) in helpYouInfos" :key="index">
    <el-descriptions class="user-info" :column="3" border>
      <el-descriptions-item>
        <template #label> HelpYouId </template>
        {{ helpYouInfo.helpYouId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpMeId </template>
        {{ helpYouInfo.helpMeId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpYouUserId </template>
        {{ helpYouInfo.helpYouUserId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpYouDescription </template>
        {{ helpYouInfo.helpYouDescription }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpYouCreateTime </template>
        {{ helpYouInfo.helpYouCreateTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpYouChangeTime </template>
        {{ helpYouInfo.helpYouChangeTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpYouState </template>
        {{
          helpYouInfo.helpMeState === 0
            ? "待接受"
            : helpYouInfo.helpMeState === 1
            ? "同意"
            : helpYouInfo.helpMeState === 2
            ? "拒绝"
            : "取消"
        }}
      </el-descriptions-item>
    </el-descriptions>
  </template>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const helpYouInfos = ref(store.state.adminInfo.helpYouInfos);

    console.log(helpYouInfos.value);

    return {
      helpYouInfos,
    };
  },
});
</script>

<style>
.user-info {
  margin-bottom: 2vh;
}
</style>
