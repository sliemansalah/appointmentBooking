<template>
  <b-card class="custom-form">
    <p class="text-center pt-3 blackColor">{{ $t("BookingInformation") }}</p>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-4">
        <div class="form-group" 
            :class="{'has-error':errors.has('addEditValidation.name')}"
        >
            <label class="control-label">{{$t("FullName")}}</label>
            <label class="required">*</label>
            <input type="text" name="name" 
                class="form-control mt-2" 
                v-model="inputs.name"
                v-validate="'required'" 
                data-vv-scope="addEditValidation" 
                :data-vv-as="$t('FullName')"
                :placeholder="$t('InputFullName')"
            >
            <div 
                class="help-block" 
                v-if="errors.has('addEditValidation.name')">
                {{ errors.first('addEditValidation.name') }}
            </div>
        </div>
    </div>

      <div class="col-md-4">
        <div class="form-group" 
            :class="{'has-error':errors.has('addEditValidation.mobile')}"
        >
            <label class="control-label">{{$t("MobileNumber")}}</label>
            <label class="required">*</label>
            <input type="text" name="mobile" 
                class="form-control mt-2" 
                v-model="inputs.mobile"
                v-validate="'required|numeric'" 
                data-vv-scope="addEditValidation" 
                :data-vv-as="$t('MobileNumber')"
                :placeholder="$t('InputMobile')"
            >
            <div 
                class="help-block" 
                v-if="errors.has('addEditValidation.mobile')">
                {{ errors.first('addEditValidation.mobile') }}
            </div>
        </div>
    </div>

      <div class="col-md-2"></div>
    </div>
    <div class="row mt-3">
      <div class="col-md-2"></div>
      <div class="col-md-4">
        <div class="form-group" 
            :class="{'has-error':errors.has('addEditValidation.email')}"
        >
            <label class="control-label">{{$t("Email")}}</label>
            <label class="required">*</label>
            <input type="text" name="email" 
                class="form-control mt-2" 
                v-model="inputs.email"
                v-validate="'required|email'" 
                data-vv-scope="addEditValidation" 
                :data-vv-as="$t('Email')"
                :placeholder="$t('InputEmail')"
            >
            <div 
                class="help-block" 
                v-if="errors.has('addEditValidation.email')">
                {{ errors.first('addEditValidation.email') }}
            </div>
        </div>
    </div>
     <div class="col-md-4">
        <div class="form-group" 
            :class="{'has-error':errors.has('addEditValidation.person_number')}"
        >
            <label class="control-label">{{$t("EscortsCount")}}</label>
            <label class="required">*</label>
            <input type="text" name="person_number" 
                class="form-control mt-2" 
                v-model="inputs.person_number"
                v-validate="'required|numeric'" 
                data-vv-scope="addEditValidation" 
                :data-vv-as="$t('EscortsCount')"
                :placeholder="$t('InputEscortsCount')"
            >
            <div 
                class="help-block" 
                v-if="errors.has('addEditValidation.person_number')">
                {{ errors.first('addEditValidation.person_number') }}
            </div>
        </div>
    </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row mt-3">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="form-group" 
            :class="{'has-error':errors.has('addEditValidation.transaction_number')}"
        >
            <label class="control-label">{{$t("TransactionsCount")}}</label>
            <label class="required">*</label>
            <input type="text" name="transaction_number" 
                class="form-control mt-2" 
                v-model="inputs.transaction_number"
                v-validate="'required|numeric'" 
                data-vv-scope="addEditValidation" 
                :data-vv-as="$t('TransactionsCount')"
                :placeholder="$t('InputTransactionsCount')"
            >
            <div 
                class="help-block" 
                v-if="errors.has('addEditValidation.transaction_number')">
                {{ errors.first('addEditValidation.transaction_number') }}
            </div>
        </div>
    </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row mt-3">
      <div class="col-md-2"></div>

      <div class="col-md-8">
          <div
            class="form-group"
            :class="{
              'has-error': errors.has('addEditValidation.services'),
            }"
          >
            <label class="control-label">{{ $t("TransactionsType") }}</label>
            <label class="required">*</label>
            <el-select
              style="width: 100%"
              class="mt-2"
              v-model="inputs.services"
              filterable
              clearable
              multiple
              name="services"
              v-validate="'required'"
              data-vv-scope="addEditValidation"
              :data-vv-as="$t('TransactionsType')"
              :placeholder="$t('SelectTransactionsType')"
            >
              <el-option
                v-for="item in transactionsTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <div
              class="help-block"
              v-if="errors.has('addEditValidation.services')"
            >
              {{ errors.first("addEditValidation.services") }}
            </div>
          </div>
        </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row mt-3">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <b-form-group>
          <b-form-textarea
            rows="4"
            v-model="inputs.comments"
            :placeholder="$t('AnotherNotes')"
          ></b-form-textarea>
        </b-form-group>
      </div>
      <div class="col-md-2"></div>
    </div>
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <b-button @click="addBooking" class="bookConfirmButton">{{
          $t("BookConfirm")
        }}</b-button>
      </div>
      <div class="col-md-4"></div>
    </div>
  </b-card>
</template>

<script>
export default {
  props: ["startTime", "endTime"],
  data() {
    return {
      inputs: {
        name: "",
        mobile: "",
        email: "",
        person_number: "",
        transaction_number: "",
        services: "",
        comments: "",
        start_time: "",
        finish_time: "",
      },
      transactionsTypes: [],
    };
  },
  methods: {
    addBooking() {
      this.$validator.validateAll("addEditValidation").then((result) => {
        if (result) {
          if(!this.startTime || !this.endTime) {
              return this.$notify.error({
                duration: 3000,
                message: this.$t("BookingTimeNotChoose"),
                title: this.$t("Error"),
                customClass: "top-center",
              });
          }
          this.inputs.start_time = this.startTime;
          this.inputs.finish_time = this.endTime;
          this.$store
            .dispatch("appointments/saveData2", this.inputs)
            .then((_) => {
              this.$notify.success({
                duration: 3000,
                message: this.$t("BookingSuccessfully"),
                title: this.$t("Booking"),
                customClass: "top-center",
              });
              this.$router.push({name: 'bookingSuccess'});
            })
            .catch((_) => {
              this.$notify.error({
                duration: 3000,
                message: this.$t("WrongOrMissedData"),
                title: this.$t("Error"),
                customClass: "top-center",
              });
            });
        }
      });
    },
    clearData() {
      this.startTime = "";
      this.endTime = "";
      this.inputs = {
        name: "",
        mobile: "",
        email: "",
        person_number: "",
        transaction_number: "",
        services: "",
        comments: "",
        start_time: "",
        finish_time: "",
      };
    },
    initData() {
      this.$store
        .dispatch("services/getData")
        .then((res) => {
          this.transactionsTypes = res.data;
        })
        .catch((_) => {
          this.$notify.error({
            duration: 3000,
            message: this.$t("GetDataFailed"),
            title: this.$t("GetData"),
            customClass: "top-center",
          });
        });
    },
  },
  created() {
    this.initData();
  },
};
</script>

<style>
</style>