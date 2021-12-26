<template>
  <el-table
    :data="helpMeDoneItem.helpMeInfos"
    style="width: 100%"
    max-height="500"
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
    <el-table-column prop="helpMeDescription" label="请求描述" />
    <el-table-column fixed="right" width="200">
      <template #default="scope"
        ><el-button @click="onHandle(scope.$index, scope.row)">处理</el-button>
        <el-button type="primary" @click="onDelete(scope.$index, scope.row)"
          >删除</el-button
        ></template
      >
    </el-table-column>
  </el-table>
  <el-dialog v-model="handleDialogVisible" title="处理">
    <el-select
      v-model="helpMeDoneItem.helpYouAcceptUserId"
      placeholder="请选择"
    >
      <el-option
        v-for="item in helpMeDoneItem.helpYouInfos"
        :key="item.helpYouUserId"
        :label="item.helpYouUserId"
        :value="item.helpYouUserId"
      ></el-option>
    </el-select>
    <el-button type="primary" style="margin-left: 1vw" @click="onAccept" round
      >确认</el-button
    >
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { ElMessage } from "element-plus";
import _ from "lodash";

export default defineComponent({
  emits: {
    refresh: null,
  },
  setup(props, { emit }) {
    const store = useStore();
    const handleDialogVisible = ref(false);
    const helpMeDoneItem = reactive({
      helpMeId: "",
      helpYouAcceptUserId: "",
      peopleNum: 0,
      helpYouInfos: [],
      helpMeInfos: store.state.helpMeInfos,
    });

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

    const refreshHelpMe = () => {
      emit("refresh");
    };

    const onHandle = async (index, row) => {
      console.log(index, row);
      if (row.helpMeState !== 1) {
        ElMessage.error("无法处理！");
        return;
      }
      try {
        const res = await axios.post(
          "http://localhost:9090/users/helpmedone/handle",
          {
            helpMeId: row.helpMeId,
          }
        );
        console.log(res);
        helpMeDoneItem.helpMeId = row.helpMeId;
        helpMeDoneItem.helpYouInfos = _.cloneDeep(res.data);
        helpMeDoneItem.peopleNum = row.helpMePeople;
        handleDialogVisible.value = true;
        console.log(helpMeDoneItem.helpYouInfos);
      } catch (err) {
        ElMessage.error("处理失败！");
        console.log(err);
      }
    };

    const onAccept = async () => {
      if (helpMeDoneItem.helpYouAcceptUserId === "") {
        ElMessage.error("请选择！");
        return;
      }
      try {
        const helpMeDone = {
          helpMeId: helpMeDoneItem.helpMeId,
          helpMeUserId: store.state.userInfo.userId,
          helpYouUserId: helpMeDoneItem.helpYouAcceptUserId,
          helpYouFinishTime: new Date(),
          helpMeUserSpend: helpMeDoneItem.peopleNum * 3,
          helpYouUserSpend: 1,
        };
        const res = await axios.post(
          "http://localhost:9090/users/helpmedone/accept",
          helpMeDone
        );
        console.log(res);
        ElMessage({
          message: "委托完成！",
          type: "success",
        });
        handleDialogVisible.value = false;
        refreshHelpMe();
        helpMeDoneItem.helpMeInfos = _.cloneDeep(store.state.helpMeInfos);
      } catch (err) {
        ElMessage.error("出错了！");
        console.log(err);
      }
    };

    const onDelete = async (index, row) => {
      console.log(index, row);
      if (row.helpMeState !== 1) {
        ElMessage.error("无法删除！");
        return;
      }
      try {
        const res = await axios.post(
          "http://localhost:9090/users/helpmedone/delete",
          {
            helpMeId: row.helpMeId,
          }
        );
        console.log(res);
        ElMessage({
          message: "删除成功！",
          type: "success",
        });
        refreshHelpMe();
      } catch (err) {
        ElMessage.error("删除失败！");
        console.log(err);
      }
    };

    watchEffect(() => {
      helpMeDoneItem.helpMeInfos = store.state.helpMeInfos;
    });

    return {
      helpMeDoneItem,
      handleDialogVisible,
      helpMeTypeFormatter,
      helpMeStateFormatter,
      onAccept,
      onHandle,
      onDelete,
    };
  },
});
</script>

<style></style>
