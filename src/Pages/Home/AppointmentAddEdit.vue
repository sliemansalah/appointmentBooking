<template>
  <b-card class="custom-form">
     <p class="text-center pt-3 blackColor">{{$t('BookingInformation')}}</p>
     <div class="row">
         <div class="col-md-2"></div>
         <div class="col-md-4 ">
             <p class="pr-2">{{$t('FullName')}}</p>
            <b-input :placeholder="$t('InputFullName')" type="text" v-model="inputs.fullName"></b-input>
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
            <b-input :placeholder="$t('InputEscortsCount')" type="text" v-model="inputs.escorts"></b-input>
         </div>
        <div class="col-md-2"></div>
     </div>
     <div class="row mt-3">
         <div class="col-md-2"></div>
         <div class="col-md-4 ">
             <p class="pr-2">{{$t('TransactionsCount')}}</p>
            <b-input  :placeholder="$t('InputTransactionsCount')" type="text" v-model="inputs.transactions"></b-input>
         </div>
         <div class="col-md-4 ">
             <p class="pr-2">{{$t('TransactionsType')}}</p>
             <el-select
                clearable
                filterable
                multiple
                 v-model="inputs.transactionType" 
                 style="width:100%;"
                 :placeholder="$t('SelectTransactionsType')">
                <el-option
                v-for="item in transactionsTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
                :placeholder="$t('AnotherNotes')"
            ></b-form-textarea>
            </b-form-group>
        </div>
         <div class="col-md-2"></div>
     </div>
     <div class="row">
 <div class="col-md-4"></div>
  <div class="col-md-4">
      <b-button class="bookConfirmButton">{{$t('BookConfirm')}}</b-button>
  </div>
   <div class="col-md-4"></div>
     </div>
  </b-card>
</template>

<script>
export default {
data() {
    return {
        inputs: {
            fullName: '',
            mobile: '',
            email: '',
            escorts: '',
            transactions: '',
            transactionType: ''
        },
        transactionsTypes: [
            {
                label: 'إصدار وتجديد جواز السفر الفلسطيني',
                value: 1
            },
            {
                label: 'إصدار إفادات بتغيير الاسم',
                value: 2
            },
            {
                label: 'إصدار إفادات الإغاثة',
                value: 3
            },
            {
                label: 'إصدار إفادات قيد الحياة',
                value: 4
            }
        ]
    }
}
}
</script>

<style>

</style>