<template>
  <view class="H1-title">本月工资为：</view>
  <view class="flex-center" v-for="item in newList" :key="item.label">
    <view class="flex-spacebetween">
      <view class="left">
        <view class="label">{{ item.label }}</view>
      </view>
      <view class="right">
        <view class="text">{{ item.text }}</view>
      </view>
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

/**
 * 千分位函数
 */
const formatToThousands = (num) => {
  return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

onMounted(() => {
  getDataList();
});
</script>

<style>
.flex-spacebetween {
  width: 666rpx;
  /* padding: 50rpx; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left {
  width: 50%;
  padding: 10rpx;
  /* background-color: pink; */
}

.right {
  min-width: 50%;
  padding: 10rpx;
  
}

.label {
  /* width: 50%; */
  color: black;
  /* background-color: skyblue; */
  border: solid 1rpx black;
}

.text {
  /* background-color: skyblue; */
  /* width: 50%; */
  border: solid 1rpx black;
}
</style>
