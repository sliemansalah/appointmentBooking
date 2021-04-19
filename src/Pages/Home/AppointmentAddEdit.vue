<template>
  <b-card class="custom-form">
     <p class="text-center pt-3 blackColor">{{$t('BookingInformation')}}</p>
     <div class="row">
         <div class="col-md-2"></div>
         <div class="col-md-4 ">
             <p class="pr-2">{{$t('FullName')}}</p>
            <b-input :placeholder="$t('InputFullName')" type="text" v-model="inputs.name"></b-input>
         </div>
         <div class="col-md-4 ">
             <p class="pr-2">{{$t('MobileNumber')}}</p>
            <b-input :placeholder="$t('InputMobile')" type="text" v-model="inputs.mobile"></b-input>
         </div>
        <div class="col-md-2"></div>
     </div>
     <div class="row mt-3">
         <div class="col-md-2"></div>
         <div class="col-md-4 ">
             <p class="pr-2">{{$t('Email')}}</p>
            <b-input :placeholder="$t('InputEmail')" type="text" v-model="inputs.email"></b-input>
         </div>
         <div class="col-md-4 ">
             <p class="pr-2">{{$t('EscortsCount')}}</p>
            <b-input :placeholder="$t('InputEscortsCount')" type="text" v-model.number="inputs.person_number"></b-input>
         </div>
        <div class="col-md-2"></div>
     </div>
     <!-- <div class="row mt-3">
         <div class="col-md-2"></div>
         <div class="col-md-4 ">
             <p class="pr-2">{{$t('TransactionsCount')}}</p>
            <b-input  :placeholder="$t('InputTransactionsCount')" type="text" v-model="inputs.transaction_number"></b-input>
         </div>
         <div class="col-md-4 ">
             <p class="pr-2">{{$t('TransactionsType')}}</p>
             <el-select
                clearable
                filterable
                multiple
                 v-model="inputs.services" 
                 style="width:100%;"
                 :placeholder="$t('SelectTransactionsType')">
                <el-option
                v-for="item in transactionsTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
         </div>
        <div class="col-md-2"></div>
     </div> -->
     <div class="row mt-3">
         <div class="col-md-2"></div>
         <div class="col-md-8 ">
             <p class="pr-2">{{$t('TransactionsCount')}}</p>
            <b-input  :placeholder="$t('InputTransactionsCount')" type="text" v-model.number="inputs.transaction_number"></b-input>
         </div>
        <div class="col-md-2"></div>
     </div>
     <div class="row mt-3">
         <div class="col-md-2"></div>
         <div class="col-md-8">
             <p class="pr-2">{{$t('TransactionsType')}}</p>
             <el-select
                clearable
                filterable
                multiple
                 v-model="inputs.services" 
                 style="width:100%;"
                 :placeholder="$t('SelectTransactionsType')">
                <el-option
                v-for="item in transactionsTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
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
      <b-button @click="addBooking" class="bookConfirmButton">{{$t('BookConfirm')}}</b-button>
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
            name: '',
            mobile: '',
            email: '',
            person_number: '',
            transaction_number: '',
            services: '',
            comments: '',
            start_time: '',
            finish_time: '',
        },
        transactionsTypes: []
    }
},
methods: {
    addBooking() {
        this.inputs.start_time = this.startTime;
        this.inputs.finish_time = this.endTime;
        this.$store.dispatch('appointments/saveData2', this.inputs).then(_ => {
             this.$notify.success({
                duration: 3000,
                message: this.$t("BookingSuccessfully"),
                title: this.$t("Booking"),
                customClass: "top-center",
             }); 
             this.clearData();
        }).catch(_ => {
            this.$notify.error({
                duration: 3000,
                message: this.$t("WrongOrMissedData"),
                title: this.$t("Error"),
                customClass: "top-center",
            }); 
        }); 
    },
    clearData() {
        this.startTime= '';
        this.endTime= '';
        this.inputs= {
            name: '',
            mobile: '',
            email: '',
            person_number: '',
            transaction_number: '',
            services: '',
            comments: '',
            start_time: '',
            finish_time: '',
        };
    },
    initData() {
         this.$store
                .dispatch("services/getData")
                .then(res => {
                    this.transactionsTypes = res.data;
                })
                .catch(_ => {
                    this.$notify.error({
                        duration: 3000,
                        message: this.$t("GetDataFailed"),
                        title: this.$t("GetData"),
                        customClass: "top-center",
                    }); 
                });
    }
},
created() {
    this.initData();
}
}
</script>

<style>

</style>