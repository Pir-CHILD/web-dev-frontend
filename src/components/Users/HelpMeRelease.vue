<template>
  <el-form ref="form" :model="helpMeItem" label-width="150px">
    <el-form-item label="Help Me Theme">
      <el-col :span="18">
        <el-input v-model="helpMeItem.helpMeTheme"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Help Me Description">
      <el-input v-model="helpMeItem.helpMeDescription"></el-input>
    </el-form-item>
    <el-form-item label="Help Me Type">
      <el-radio-group v-model="helpMeItem.helpMeType"
        ><el-radio :label="0" border>小时工</el-radio>
        <el-radio :label="1" border>搬重物</el-radio>
        <el-radio :label="2" border>上下班搭车</el-radio>
        <el-radio :label="3" border>社区服务</el-radio></el-radio-group
      >
    </el-form-item>
    <el-form-item label="People Number">
      <el-col :span="18">
        <el-select v-model="helpMeItem.helpMePeople">
          <el-option label="1" :value="1"></el-option>
          <el-option label="2" :value="2"></el-option>
          <el-option label="3" :value="3"></el-option>
          <el-option label="5" :value="5"></el-option>
          <el-option label="10" :value="10"></el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="Finish Time">
      <el-col :span="18">
        <el-date-picker
          v-model="helpMeItem.helpMeFinishTime"
          type="date"
          placeholder="Pick a date"
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { ElMessage } from "element-plus";

export default defineComponent({
  emits: {
    refresh: null,
  },
  setup(props, { emit }) {
    const store = useStore();
    const userId = store.state.userInfo.userId;
    const helpMeItem = reactive({
      helpMeUserId: userId,
      helpMeType: 0,
      helpMeTheme: "",
      helpMeDescription: "",
      helpMePeople: 0,
      helpMeFinishTime: new Date(),
      helpMeIntroPhoto: "",
      helpMeCreateTime: new Date(),
      helpMeChangeTime: new Date(),
      helpMeState: 1,
    });

    const refreshHelpMe = () => {
      emit("refresh");
    };

    const onSubmit = async () => {
      console.log(helpMeItem);
      try {
        helpMeItem.helpMeCreateTime = new Date();
        helpMeItem.helpMeChangeTime = helpMeItem.helpMeCreateTime;
        const res = await axios.post(
          "http://localhost:9090/users/helpme/release",
          helpMeItem
        );
        console.log(res);
        ElMessage({
          message: "发布成功！",
          type: "success",
        });
        helpMeItem.helpMeTheme = "";
        helpMeItem.helpMeDescription = "";
        refreshHelpMe();
      } catch (err) {
        ElMessage.error("发布失败！");
        console.log(err);
      }
    };

    return {
      onSubmit,
      helpMeItem,
    };
  },
});
</script>

<style></style>
