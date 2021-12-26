<template>
  <el-container style="height: 100vh">
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
          <span>admin</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goIndex">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane label="用户信息" name="first"><UserInfos /></el-tab-pane>
          <el-tab-pane label="劳您驾" name="second"
            ><HelpMeInfos
          /></el-tab-pane>
          <el-tab-pane label="我可以" name="third"
            ><HelpYouInfos
          /></el-tab-pane>
          <el-tab-pane label="中介收入" name="fourth">
            <InterMediaryIncomes />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import UserInfos from "../components/Admin/UserInfos.vue";
import HelpMeInfos from "../components/Admin/HelpMeInfos.vue";
import HelpYouInfos from "../components/Admin/HelpYouInfos.vue";
import InterMediaryIncomes from "../components/Admin/InterMediaryIncomes.vue";

export default defineComponent({
  components: {
    UserInfos,
    HelpMeInfos,
    HelpYouInfos,
    InterMediaryIncomes,
  },
  setup() {
    const router = useRouter();
    const activeTab = ref("first");

    const goIndex = () => {
      router.push("/login");
    };

    return { goIndex, activeTab };
  },
});
</script>

<style></style>
