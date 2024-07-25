<template>
  <view class="" v-for="item in newList">
    <view class="flex-spacebetween fill content">
      <view class="label">{{item.label}}</view>
      <view class="text">{{item.value}}</view>
    </view>
	</view>
  <button type="" @click="getDataList">测试</button>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
  import { post } from '../../utils/http'
  
  // 请求路径
  const baseUrl = ref('http://localhost:8065/renren-admin');
  // 列表数据
  const dataForm = ref({
    tableName: 'wa_order',
    conditionQuery: []
  })

  const list = ref({
    baseAmount: 13123,
    creator: "1815993224050470914",
    date: "2024-07-24 15:44:47",
    deductionAmount: 31231,
    dept: "易星联",
    deptId: null,
    dutiesAmount: 123123,
    id: "1816016661368258561",
    meritAmount: 132,
    month: "2024年3月",
    name: "开发",
    note: "",
    overtimeAmount: 123123,
    payAmount: 219072,
    personAmount: 12321,
    sendAmount: 132123,
    stage: "",
    welfareAmount: 3123,
  })
  
  const mapList = {
    baseAmount: "基本金额",
    creator: "创建者",
    date: "日期",
    deductionAmount: "扣除金额",
    dept: "部门",
    deptId: "部门ID",
    dutiesAmount: "职责金额",
    id: "ID",
    meritAmount: "绩效金额",
    month: "月份",
    name: "名称",
    note: "备注",
    overtimeAmount: "加班金额",
    payAmount: "支付金额",
    personAmount: "个人金额",
    sendAmount: "发送金额",
    stage: "阶段",
    welfareAmount: "福利金额",
  };
  
  /**
   * 映射数据
   */
  const newList = ref(Object.keys(list.value).map(key => ({
    label: mapList[key],
    value: list.value[key]
  })))
  
  /**
   * 获取数据
   */
  const getDataList = async () => {
    const res = await post('/wa/order/page', dataForm.value);
    if (res.msg == 'success') {
      console.log(res)
      console.log(res.data.list[0])
      // list.value = res.data.list[0];
      // console.log(list.value);
    }

  }

  onMounted(() => {

  })
</script>

<style>
  .fill {
    width: 100%;
    background-color: rgb(255,255,255)
  }
  
  .flex-spacebetween {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .content {
    /* width: 100%; */
    height: 100%;
    /* background-color: pink; */
  }

 .label {
    width: 50%;
    color: black;
    background-color: pink;
    /* background-color: skyblue; */
    /* background: pink; */
  }
  
  .text {
    width: 50%;
    background: white;
  }
</style>
