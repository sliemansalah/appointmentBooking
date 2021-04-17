<template>
    <b-card class="mt-5">
       <div class="row dattimepicker">
            <div class="col-md-6">
                 <div class="timepicker">
                <i class="pe-7s-date size28"></i>
                <span>Confirm Date</span>
            </div>
           <v-date-picker 
                v-model="value" 
                color="gold lighten-1" 
            >
            </v-date-picker>
            </div>
        <div class="col-md-6">
            <div class="datepicker">
                <i class="pe-7s-clock size28"></i>
                <span>Confirm Time</span>
            </div>
           <STimePicker 
                v-model="value2" 
            />
        </div>
       </div>
    </b-card>
</template>

<script>
import STimePicker from './STimePicker';
export default {
components: {
    STimePicker
},
data() {
    return {
        value: new Date().toISOString().substr(0, 10),
        value2: '',
    }
}
}
</script>

<style>
.v-picker {
    direction: ltr;
    text-align: left;
}
.dattimepicker {
    direction: ltr;
    text-align: left;
    color: #C09300;
    margin: 5px 80px;
}
.dattimepicker span {
    position: relative;
    bottom: 5px;
    left: 5px;
    color: #000;
    font-size: 18px;
    font-weight: 400;
}
.v-card > *:first-child:not(.v-btn):not(.v-chip) {
    display: none;
}
.theme--light.v-card {
    margin-top: 15px;
}
.v-date-picker-table {
    height: 280px;
}
</style>