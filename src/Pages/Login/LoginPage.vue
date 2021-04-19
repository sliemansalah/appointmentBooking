<template>
  <div>
    <div class="h-100 bg-plum-plate bg-animation">
      <div class="d-flex h-100 justify-content-center align-items-center">
        <b-col md="8" class="mx-auto app-login-box">
          <h2 class="text-center goldColor">{{ $t("BookingSystem") }}</h2>
          <div class="modal-dialog w-100 mx-auto">
            <div class="modal-content">
              <div class="modal-body">
                <div class="h5 modal-title text-center">
                  <h4 class="mt-2">
                    <div>{{ $t("WelcomeBack") }}</div>
                    <span>{{ $t("signInAcoountBelow") }}</span>
                  </h4>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div
                      class="form-group"
                      :class="{
                        'has-error': errors.has('addEditValidation.email'),
                      }"
                    >
                      <label class="control-label">{{ $t("Email") }}</label>
                      <label class="required">*</label>
                      <input
                        type="text"
                        name="email"
                        class="form-control"
                        v-model="inputs.email"
                        v-validate="'required'"
                        data-vv-scope="addEditValidation"
                        :data-vv-as="$t('Email')"
                      />
                      <div
                        class="help-block"
                        v-if="errors.has('addEditValidation.email')"
                      >
                        {{ errors.first("addEditValidation.email") }}
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div
                      class="form-group"
                      :class="{
                        'has-error': errors.has('addEditValidation.password'),
                      }"
                    >
                      <label class="control-label">{{ $t("Password") }}</label>
                      <label class="required">*</label>
                      <input
                        type="password"
                        name="password"
                        class="form-control"
                        v-model="inputs.password"
                        v-validate="'required'"
                        data-vv-scope="addEditValidation"
                        :data-vv-as="$t('Password')"
                      />
                      <div
                        class="help-block"
                        v-if="errors.has('addEditValidation.password')"
                      >
                        {{ errors.first("addEditValidation.password") }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer clearfix">
                <div class="float-right">
                  <b-button @click="login" variant="primary" size="lg">
                    {{ $t("Login") }}
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
export default {
  name: "login",
  data() {
    return {
      inputs: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$validator.validateAll("addEditValidation").then((result) => {
        if (result) {
          this.$store
            .dispatch("auth/login", this.inputs)
            .then((res) => {
              this.$notify.success({
                duration: 3000,
                message: this.$t("LoginSuccessfully"),
                title: this.$t("Login"),
                customClass: "top-center",
              });
              setTimeout(() => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data));
                window.location.href = "/admin/services";
              }, 500);
            })
            .catch(() => {
              this.$notify.error({
                duration: 3000,
                message: this.$t("EmailOrPasswordWasWrong"),
                title: this.$t("Login"),
                customClass: "top-center",
              });
            });
        }
      });
    },
  },
};
</script>

<style scoped>
.bg-plum-plate {
  background-image: unset !important;
  margin-top: 170px;
}
</style>