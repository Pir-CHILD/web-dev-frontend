<template>
  <el-table
    :data="helpYouInfos"
    style="width: 100%"
    max-height="500"
    @cell-click="onHelpYou"
    stripe
  >
    <el-table-column
      prop="helpMeType"
      label="请求类型"
      width="120"
      :formatter="helpMeTypeFormatter"
    />
    <el-table-column prop="helpMeTheme" label="请求主题名称" width="200" />
    <el-table-column prop="helpMePeople" label="请求人数" width="120" />
    <el-table-column prop="helpMeFinishTime" label="请求结束日期" width="180" />
    <el-table-column
      prop="helpMeState"
      label="请求状态"
      width="120"
      :formatter="helpMeStateFormatter"
    />
    <el-table-column prop="userIntroduction" label="请求描述" />
    <el-table-column fixed="right" width="120">
      <el-button>我可以</el-button>
    </el-table-column>
  </el-table>
</template>

<script>
import { defineComponent, watchEffect, reactive } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { ElMessage } from "element-plus";

export default defineComponent({
  emits: {
    refresh: null,
  },
  setup(props, { emit }) {
    const store = useStore();
    let userInfo = store.state.userInfo;
    let helpYouInfos = store.state.helpYouInfos;
    const helpYouItem = reactive({
      helpYouId: "",
      helpMeId: "",
      helpYouUserId: userInfo.userId,
      helpYouDescription: "",
      helpYouCreateTime: new Date(),
      helpYouChangeTime: new Date(),
      helpYouState: 0,
    });

    const refreshHelpYou = () => {
      emit("refresh");
    };

    const helpMeTypeFormatter = (row) =>
      row.helpMeType === 0
        ? "小时工"
        : row.helpMeType === 1
        ? "搬重物"
        : row.helpMeType === 2
        ? "上下班搭车"
        : "社区服务志愿者";

    const helpMeStateFormatter = (row) =>
      row.helpMeState === 0
        ? "已完成"
        : row.helpMeState === 1
        ? "待响应"
        : row.helpMeState === 2
        ? "已取消"
        : "到期未完成";

    const onHelpYou = async (row) => {
      // console.log(row);
      if (row.helpMeState !== 1) {
        ElMessage({
          message: "无法申请！",
          type: "warning",
        });
        return;
      }
      console.log("111");
      try {
        helpYouItem.helpMeId = row.helpMeId;
        helpYouItem.helpYouCreateTime = new Date();
        helpYouItem.helpYouChangeTime = helpYouItem.helpYouCreateTime;
        const res = await axios.post(
          "http://localhost:9090/users/helpyou/release",
          helpYouItem
        );
        console.log(res);
        ElMessage({
          message: "申请成功！",
          type: "success",
        });
        refreshHelpYou();
      } catch (err) {
        ElMessage.error("重复申请！");
        console.log(err);
      }
    };

    watchEffect(() => {
      userInfo = store.state.userInfo;
      helpYouInfos = store.state.helpYouInfos;
    });

    return {
      helpYouInfos,
      helpMeTypeFormatter,
      helpMeStateFormatter,
      onHelpYou,
    };
  },
});
</script>

<style></style>
