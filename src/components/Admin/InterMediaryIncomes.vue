<template>
  <el-descriptions :column="4" border>
    <el-descriptions-item>
      <template #label> 小时工 </template>
      {{ incomes[0] }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label> 搬重物 </template>
      {{ incomes[1] }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label> 上下班搭车 </template>
      {{ incomes[2] }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label> 社区服务 </template>
      {{ incomes[3] }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const incomes = ref(store.state.adminInfo.InterMediaryIncomes);

    console.log("Incomes: ", incomes.value);

    return { incomes };
  },
});
</script>

<style></style>
