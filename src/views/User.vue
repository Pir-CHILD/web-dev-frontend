<template>
  <el-container style="height: 100vh">
    <el-aside width="16vw" style="background-color: #2f3135">
      <el-menu
        default-active="1"
        active-text-color="#ffd04b"
        background-color="#545c6d"
        text-color="#fff"
        class="el-menu-vertical-demo"
        @select="onSelect"
      >
        <el-menu-item index="1">
          <template #title>
            <el-icon><avatar /></el-icon>个人信息
          </template>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><help /></el-icon>劳您驾
          </template>
          <el-menu-item index="2-1">发布请求</el-menu-item>
          <el-menu-item index="2-2" @click="helpMeSearch"
            >查询请求</el-menu-item
          >
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><help-filled /></el-icon>我可以
          </template>
          <el-menu-item index="3-1" @click="helpYouSearch"
            >查询请求</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header
        style="
          text-align: right;
          font-size: 14px;
          justify-content: center;
          align-items: center;
        "
      >
        <el-dropdown>
          <!-- <el-icon><setting /></el-icon> -->
          <span>{{ userInfo.userXingming }}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <el-main>
        <UserInfo v-show="menuIndex === '1'" />
        <HelpMeRelease v-show="menuIndex === '2-1'" @refresh="helpMeSearch" />
        <HelpMeSearch v-if="menuIndex === '2-2'" @refresh="helpMeSearch" />
        <HelpYouSearch v-if="menuIndex === '3-1'" @refresh="helpYouSearch" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Avatar, Help, HelpFilled } from "@element-plus/icons";
import UserInfo from "../components/UserInfo.vue";
import HelpMeRelease from "../components/HelpMeRelease.vue";
import HelpMeSearch from "../components/HelpMeSearch.vue";
import HelpYouSearch from "../components/HelpYouSearch.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import axios from "axios";

export default defineComponent({
  components: {
    Avatar,
    HelpFilled,
    Help,
    UserInfo,
    HelpMeRelease,
    HelpMeSearch,
    HelpYouSearch,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const menuIndex = ref("1");
    const userInfo = store.state.userInfo;

    const onSelect = (index) => {
      menuIndex.value = index;
    };

    const loginOut = () => {
      router.push("/login");
    };

    const helpMeSearch = async () => {
      // console.log("33333333:", item);
      try {
        const res = await axios.post(
          "http://localhost:9090/users/helpme/search",
          { userId: userInfo.userId }
        );
        console.log("1111111:", res.data);
        await store.dispatch("setHelpMeInfos", res.data);
      } catch (err) {
        ElMessage.error("劳您驾加载出错！");
        console.log(err);
      }
    };
    helpMeSearch();

    const helpYouSearch = async () => {
      try {
        const res = await axios.post(
          "http://localhost:9090/users/helpyou/search",
          { userId: userInfo.userId }
        );
        await store.dispatch("setHelpYouInfos", res.data);
      } catch (err) {
        ElMessage.error("我可以加载出错！");
        console.log(err);
      }
    };
    helpYouSearch();

    return {
      menuIndex,
      userInfo,
      onSelect,
      loginOut,
      helpMeSearch,
      helpYouSearch,
    };
  },
});
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  line-height: 60px;
}

.el-aside {
  color: var(--el-text-color-primary);
}
</style>
