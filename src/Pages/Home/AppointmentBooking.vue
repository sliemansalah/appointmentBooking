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
                @changeZone="changeZone"
                @changeTime="changeTime"
            />
        </div>
       </div>
    </b-card>
</template>

<script>
import STimePicker from './STimePicker';
export default {
props: ["getStartTime", "getEndTime"],
components: {
    STimePicker
},
data() {
    return {
        value: new Date().toISOString().substr(0, 10),
        value2: '',
        zone: ''
    }
},
methods: {
    changeZone(value){
        this.zone= value;
        this.$emit('startTime', this.getStartTime)
        this.$emit('endTime', this.getEndTime)
    },
    changeTime(value) {
        this.value2= value;
        this.$emit('startTime', this.getStartTime)
        this.$emit('endTime', this.getEndTime)
    }

},
computed: {
    getStartTime(){
        if(this.zone && this.value2) {
            let time= parseInt(this.value2) / 2 ;
            if(this.zone == 'PM') {
                time =  time + 12 - 0.5;
            }else {
                time = time - 0.5
            }
            let percent = '00' ;
            if(time %1 == 0) {
                percent = '00' ;
            }else {
                percent = '30' ;
            }
            time= parseInt(time);
            if(time.length<2) time+="0";
            let finalValue= this.value + " " + time + ":" + percent;
            return finalValue;
        }
    },
    getEndTime(){
        if(this.zone && this.value2) {
            let time= parseInt(this.value2) / 2 ;
            if(this.zone == 'PM') {
                time =  time + 12;
            }else {
                time = time
            }
            let percent = '00' ;
            if(time %1 == 0) {
                percent = '00' ;
            }else {
                percent = '30' ;
            }
             time= parseInt(time);
            if(time.length<2) time+="0";
            let finalValue=  this.value + " " + time + ":" + percent;
            return finalValue;
        }
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