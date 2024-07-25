<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="login-form">
      <view class="flex-center H1_title fill">工资系统</view>
			<input class="input_login-form" type="text" placeholder="请输入用户账号" v-model="inputForm.username" />
			<input class="input_login-form" type="password" placeholder="请输入用户密码" v-model="inputForm.password" />
     <view class="flex-spacebetween fill">
        <input class="input_captcha" type="text" placeholder="请输入验证码" v-model="inputForm.captcha" />
        <image class="dispaly_captcha" :src="captchaUrl" mode="" @click="refreshCaptcha" title="点击刷新验证码"></image>
      </view>
		</view>
		<view class="submit" @click="submit">登录</view>
	</view>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { post } from '../../utils/http.js';

  // 请求路径
  const baseUrl = ref('http://localhost:8065/renren-admin');
  // 验证码图片地址
  const captchaUrl = ref('');
  // 表单属性
	const inputForm = ref({
    username: '',
    password: '',
    captcha: '',
    uuid: ''
  })
  
  /**
   * 生成uuid
   */
  const generateUuid = () => {
    return 'xxxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
  }
  
  /**
   * 获取验证码图片
   */
  const getCaptchaUrl = () => {
    inputForm.value.uuid = generateUuid();
    captchaUrl.value = `${baseUrl.value}/captcha?uuid=${inputForm.value.uuid}`;
  }
  
  /**
   * 刷新验证码图片
   */
  const refreshCaptcha = async () => {
    await getCaptchaUrl();
  }
  
  /**
   * 登录提交表单
   */
  const submit = async () => {
    const res = await post('/login', inputForm.value);
    if (res.msg == 'success') {
      // 把token存到缓存
      uni.setStorageSync('token', res.data.token);
      uni.redirectTo({
        url: '/pages/index/index'
      })
    }  else if(res.msg == '验证码不正确') {
      await getCaptchaUrl();
    }
    else {
      console.log(res.msg)
    }
  }
  
  onMounted(() => {
    getCaptchaUrl()
  })
  
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
    padding-bottom: 30rpx;
	}
  
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .flex-spacebetween {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .H1-title {
    font-family: PingFang SC;
    font-size: 40rpx;
    font-style: normal;
    font-weight: 600;
    line-height: 48rpx;
    /* 120% */
    letter-spacing: 0.48rpx;
  }

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.login-form {
		width: 666rpx;
		display: flex;
		flex-direction: column;
		gap: 40rpx;
	}
	
	.input_login-form {
		display: flex;
		height: 50px;
		padding: 0px 12px;
		justify-content: center;
		align-items: center;
		gap: 10px;
		align-self: stretch;
		border-radius: 6px;
		background: #F5F5F5;
	}
  
  .input_captcha {
    width: 40%;
    height: 50px;
    padding: 0px 12px;
    background: #F5F5F5;
  }
  
  .dispaly_captcha {
    width: 40%;
    height: 70rpx;
    position: relative;
  }
  
  .submit {
    margin-top: 230rpx;
    width: 666rpx;
    height: 100rpx;
    border-radius: 50px;
    color: #FFFFF4;
    background: #2D2927;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20rpx;
  }
</style>
