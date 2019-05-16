<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/login/music-logo.png" alt>
    </div>
    <div class="form-wrapper">
      <div class="form">
        <div class="mobile">
          <i class="fa fa-mobile-phone"></i>&nbsp;
          <input
            class="input"
            type="text"
            v-model="loginInfo.phone"
            placeholder="请输入手机号"
            @focus="focusRst"
            @blur="blurRst"
          >
        </div>
        <div class="key">
          <i class="fa fa-key fa-fw"></i>
          <input
            v-model="loginInfo.password"
            class="input"
            type="password"
            placeholder="请输入密码"
            @focus="focusRst"
            @blur="blurRst"
          >
        </div>
        <div class="phone-login-button" @click="phoneLoginClick">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginRequest } from "api/api_login";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      loginInfo: {
        phone: "",
        password: ""
      },
      mark: true
    };
  },
  methods: {
    blurRst() {
      this.mark = true;
    },
    focusRst() {
      this.mark = false;
    },
    async phoneLoginClick() {
        let data = await loginRequest(this.loginInfo,this)
        console.log(data)
        if (Object.prototype.toString.call(data) === "[object Object]") {
          this.storeUserInfo(data);
          this.$vux.toast.text("登录成功", "bottom");
          setTimeout(() => {
            this.$router.push('/')
        }, 100);
        }
    },
    ...mapMutations(["storeUserInfo"])
  }
};
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  .logo {
    width: 100%;
    text-align: center;
    padding-top: 9rem;
    img {
      width: 30%;
    }
  }
}

.form-wrapper {
    padding-top: 6rem;
    width: 100%;
    text-align: center;
    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        .mobile,.key {
            display: flex;
            align-items: center;
            height: 2.5rem;
            line-height: 2.5rem;
            width: 67%;
            border: 1px solid #ddd;
            i {
                flex: 1
            }
            .input {
                outline: none;
                border: none;
                height: 2rem;
                width: 85%;
            }
            margin-bottom: 1rem;
        }
        .phone-login-button {
            border: 1px solid #1aceb6;
            border-radius: 10px;
            line-height: 2rem;
            width: 67%;
            margin: 0 auto;
        }
    }
}
</style>

<style scoped>
@media screen and(min-width: 768px) {
  .login .form-wrapper {
    padding-top: 13rem;
  }
  .login .logo img {
    width: 280px;
  }
  .login .form-wrapper .form .mobile,
  .login .form-wrapper .form .key {
    width: 710px;
  }
}
</style>

