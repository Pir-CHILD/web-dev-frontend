<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/login.jpg" alt="" />
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="registerDialogVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog v-model="registerDialogVisible" title="注册"
      ><el-form
        ref="registerForm"
        :model="registerForm"
        :rules="rules"
        label-width="120px"
        class="demo-registerForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="registerForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd">
          <el-input
            v-model="registerForm.userPwd"
            placeholder="不少于6位且至少包含2位数字"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
          <el-input
            v-model="registerForm.userPhone"
            placeholder="11位电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userXingming">
          <el-input v-model="registerForm.userXingming"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="certiType">
          <el-radio-group v-model="registerForm.certiType">
            <el-radio :label="0">学生证</el-radio>
            <el-radio :label="1">身份证</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="证件号码" prop="certiNumber">
          <el-input v-model="registerForm.certiNumber"></el-input>
        </el-form-item>
        <el-form-item label="注册社区" prop="userCommunity">
          <el-select v-model="registerForm.userCommunity" placeholder="0">
            <el-option :value="0" label="海淀区"></el-option>
            <el-option :value="1" label="朝阳区"></el-option>
            <el-option :value="2" label="昌平区"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户简介" prop="userIntroduction">
          <el-input
            v-model="registerForm.userIntroduction"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
          <el-button @click="registerDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      registerDialogVisible: false,
      formLabelWidth: "60vw",
      registerForm: {
        userName: "",
        userPwd: "",
        userType: 0,
        userXingming: "",
        certiType: 0,
        certiNumber: "",
        userPhone: "",
        userLevel: 0,
        userIntroduction: "",
        userCity: "Beijing",
        userCommunity: 0,
        resisterTime: new Date(),
        changeTime: new Date(),
      },
      rules: {
        userPwd: [
          {
            required: true,
            message: "请输入不少于6位且至少包含2位数字的密码",
            trigger: "blur",
          },
          {
            min: 6,
            trigger: "blur",
          },
        ],
        userXingming: [
          {
            required: true,
            trigger: "blur",
          },
        ],
        userPhone: [
          {
            required: true,
            message: "请输入正确的电话号码",
            min: 11,
            max: 11,
            trigger: "blur",
          },
        ],
        certiNumber: [
          {
            required: true,
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    async pwdCheck() {
      if (this.registerForm.userPwd.length < 6) return false;
      let count = 0;
      for (let i = 0; i < this.registerForm.userPwd.length; i++) {
        if (
          this.registerForm.userPwd[i] >= "0" &&
          this.registerForm.userPwd[i] <= "9"
        )
          count++;
        if (count === 2) break;
      }
      return count >= 2;
    },
    async certiCheck() {
      console.log("certitype:", this.registerForm.certiType);
      return (
        (this.registerForm.certiType === 0 &&
          this.registerForm.certiNumber.length === 10) ||
        (this.registerForm.certiType === 1 &&
          this.registerForm.certiNumber.length === 18)
      );
    },
    async phoneCheck() {
      return this.registerForm.userPhone.length === 11;
    },
    async registerFormCheck() {
      let tCheck = true;
      tCheck = await this.pwdCheck();
      if (!tCheck) return false;
      tCheck = await this.certiCheck();
      if (!tCheck) return false;
      tCheck = await this.phoneCheck();
      if (!tCheck) return false;

      return true;
    },
    async register() {
      const check = await this.registerFormCheck();
      if (!check) {
        ElMessage.error("格式错误，注册失败！");
      } else {
        this.registerForm.registerTime = new Date();
        this.registerForm.changeTime = this.registerForm.resisterTime;
        try {
          const res = await axios.post(
            "http://localhost:9090/users/register",
            this.registerForm
          );
          console.log(res);
          ElMessage({
            message: "注册成功！",
            type: "success",
          });
          this.registerDialogVisible = false;

          this.registerForm.userName = "";
          this.registerForm.userPwd = "";
          this.registerForm.userXingming = "";
          this.registerForm.certiNumber = "";
          this.registerForm.userPhone = "";
        } catch (err) {
          ElMessage.error("用户名已存在！");
          console.log(err);
        }
      }
    },
    async login() {
      try {
        const res = await axios.post(
          "http://localhost:9090/users/login",
          JSON.stringify(this.loginForm)
        );
        console.log(res);
        await this.$store.dispatch("setUserInfo", res.data);
        this.$router.push("/user");
      } catch (err) {
        ElMessage.error("用户名或密码错误！");
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2f3135;
  width: 100%;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #2f3135;
  border-radius: 3px;
  //div居中
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 30%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 30%;
      background-color: #eee;
    }
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
