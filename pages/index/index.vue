<template>
  <view class="" v-for="item in newList" :key="item.label">
    <view class="flex-spacebetween fill">
      <view class="label">{{ item.label }}</view>
      <view class="text">{{ item.text }}</view>
    </view>
  </view>
  <button @click="getDataList">刷新</button>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { post } from '../../utils/http';

// 列表数据
const dataForm = ref({
  tableName: 'wa_order',
  conditionQuery: []
});

// 初始化数据
const initData = ref({});

// 映射列表
const mapData = {
  name: "姓名",
  month: "月份",
  dept: "部门",
  baseAmount: "基本工资",
  dutiesAmount: "职务工资",
  meritAmount: "绩效工资",
  overtimeAmount: "加班费",
  welfareAmount: "福利费",
  deductionAmount: "扣款",
  personAmount: "个人所得税",
  payAmount: "应发工资",
  sendAmount: "实发工资",
  date: "日期",
  stage: "状态",
  note: "备注"
}

// 计算映射字段映射
const newList = computed( () => {
  return Object.keys(mapData).map(key => ({
    label: mapData[key],
    text: initData.value[key] !== undefined ? initData.value[key] : ''
  }))
})

/**
 * 获取数据
 */
const getDataList = async () => {
  const res = await post('/wa/order/page', dataForm.value);
  if (res.msg === 'success') {
    initData.value = res.data.list[0];
    console.log(res.data);
  }
};

onMounted(() => {
  getDataList();
});
</script>

<style>
.fill {
  width: 100%;
  background-color: rgb(255, 255, 255);
}

.flex-spacebetween {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label {
  width: 50%;
  color: black;
  background-color: pink;

}

.text {
  width: 50%;
  background: skyblue;
}
</style>
