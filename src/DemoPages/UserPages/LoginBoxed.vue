<template>
    <div>
        <div class="h-100 bg-plum-plate bg-animation">
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="8" class="mx-auto app-login-box">
                    <h3 class="text-center">{{$t('BookingSystem')}}</h3>
                    <div class="modal-dialog w-100 mx-auto">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="h5 modal-title text-center">
                                    <h4 class="mt-2">
                                        <div>{{$t('WelcomeBack')}}</div>
                                        <span>{{$t('signInAcoountBelow')}}</span>
                                    </h4>
                                </div>
                                <b-form-group id="exampleInputGroup1"
                                              label-for="exampleInput1">
                                    <b-form-input id="exampleInput1"
                                                  type="email"
                                                  required
                                                  v-model="inputs.email"
                                                  :placeholder="$t('Email')">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group id="exampleInputGroup2"
                                              label-for="exampleInput2">
                                    <b-form-input id="exampleInput2"
                                                  type="password"
                                                  required
                                                  v-model="inputs.password"
                                                  :placeholder="$t('Password')">
                                    </b-form-input>
                                </b-form-group>
                            </div>
                            <div class="modal-footer clearfix">
                                <div class="float-right">
                                    <b-button @click="login" variant="primary" size="lg">
                                        {{$t('Login')}}
                                    </b-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-col>
            </div>
        </div>
    </div>
</template>


<script>
export default{
  name: 'login',
  data() {
    return {
      inputs: {
        email: "",
        password: "",
      }
    }
  },
  methods: {
     login() {
    this.$store.dispatch('auth/login', this.inputs).then(res => {
      this.$vs.notify({
        title:this.$t('Login'),
        text: this.$t('LoginSuccessfully'),
        color:'success',
        position: 'top-center',
        time:4000,
      })
      setTimeout(() => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href= "/admin/users";
      }, 500);
    })
    .catch(() => {
      this.$vs.notify({
        title:this.$t('Login'),
        text: this.$t('LoginFailed'),
        color:'danger',
        position: 'top-center',
        time:4000,
      })
    })
  },
  }
}
</script>

<style scoped>

.bg-plum-plate {
  background-image: unset !important;
  margin-top: 170px;
}
</style>