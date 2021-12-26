<template>
  <template v-for="(userInfo, index) in userInfos" :key="index">
    <el-descriptions class="user-info" :column="3" border>
      <el-descriptions-item>
        <template #label>
          <el-icon><user /></el-icon>
          Username
        </template>
        {{ userInfo.userName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><user-filled /></el-icon>
          UserId
        </template>
        {{ userInfo.userId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><eleme /></el-icon>
          UserType
        </template>
        {{ userInfo.userType === 1 ? "普通用户" : "管理员" }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><eleme /></el-icon>
          CertiType
        </template>
        {{ userInfo.certiType === 0 ? "学生证" : "身份证" }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><avatar /></el-icon>
          certiNumber
        </template>
        {{ userInfo.certiNumber }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><iphone /></el-icon>
          UserPhone
        </template>
        {{ userInfo.userPhone }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><office-building /></el-icon>
          UserLevel
        </template>
        {{ userInfo.userLevel === 0 ? "一般" : "VIP" }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><location /></el-icon>
          UserCity
        </template>
        {{ userInfo.userCity }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><location-filled /></el-icon>
          UserCommunity
        </template>
        {{
          userInfo.userCommunity === 0
            ? "海淀区"
            : userInfo.userCommunity === 1
            ? "朝阳区"
            : "昌平区"
        }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><timer /></el-icon>
          RegisterTime
        </template>
        {{ userInfo.registerTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><timer /></el-icon>
          ChangeTime
        </template>
        {{ userInfo.changeTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <el-icon><info-filled /></el-icon>
          UserIntroduction
        </template>
        {{ userInfo.userIntroduction }}
      </el-descriptions-item>
    </el-descriptions>
  </template>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
  Avatar,
  User,
  UserFilled,
  Eleme,
  Iphone,
  OfficeBuilding,
  Location,
  LocationFilled,
  Timer,
  InfoFilled,
} from "@element-plus/icons";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Avatar,
    User,
    UserFilled,
    Eleme,
    Iphone,
    OfficeBuilding,
    Location,
    LocationFilled,
    Timer,
    InfoFilled,
  },
  setup() {
    const store = useStore();
    const userInfos = ref(store.state.adminInfo.userInfos);

    console.log(userInfos.value);

    return {
      userInfos,
    };
  },
});
</script>

<style>
.user-info {
  margin-bottom: 2vh;
}
</style>
