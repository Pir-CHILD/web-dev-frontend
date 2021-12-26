<template>
  <template v-for="(helpMeInfo, index) in helpMeInfos" :key="index">
    <el-descriptions class="user-info" :column="3" border>
      <el-descriptions-item>
        <template #label> HelpMeId </template>
        {{ helpMeInfo.helpMeId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpMeUserId </template>
        {{ helpMeInfo.helpMeUserId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpMeType </template>
        {{
          helpMeInfo.helpMeType === 0
            ? "小时工"
            : helpMeInfo.helpMeType === 1
            ? "搬重物"
            : helpMeInfo.helpMeType === 2
            ? "上下班搭车"
            : "社区服务"
        }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpMeTheme </template>
        {{ helpMeInfo.helpMeTheme }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpMeDescription </template>
        {{ helpMeInfo.helpMeDescription }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpMePeople </template>
        {{ helpMeInfo.helpMePeople }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpMeFinishTime </template>
        {{ helpMeInfo.helpMeFinishTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpMeIntroPhoto </template>
        {{ helpMeInfo.helpMeIntroPhoto }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpMeCreateTime </template>
        {{ helpMeInfo.helpMeCreateTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpMeChangeTime </template>
        {{ helpMeInfo.helpMeChangeTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label> HelpMeState </template>
        {{
          helpMeInfo.helpMeState === 0
            ? "已完成"
            : helpMeInfo.helpMeState === 1
            ? "待响应"
            : helpMeInfo.helpMeState === 2
            ? "已取消"
            : "到期未完成"
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
    const helpMeInfos = ref(store.state.adminInfo.helpMeInfos);

    console.log(helpMeInfos.value);

    return {
      helpMeInfos,
    };
  },
});
</script>

<style>
.user-info {
  margin-bottom: 2vh;
}
</style>
