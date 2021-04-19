<template>
  <div id="bookingHome">
    <div class="row">
      <div class="header"></div>
    </div>
    <b-card class="container textUpper text-center fontDinNext goldColor">
      <div class="row">
        <div class="col-md-4 block1">
          <p class="height12 size15 text-left">سـفــــــارة فلســـطيـن</p>
          <p class="height12 size11 text-left">المملكة العربية السعودية</p>
        </div>
        <div class="col-md-4 block2">
          <img src="/assets/app/images/palestine.png" alt="" />
        </div>
        <div class="col-md-4 block3">
          <p class="font600 size15 height12 text-right">embassy of palestine</p>
          <p class="font500 size11 height12 text-right">kingdom of saudi arabia</p>
        </div>
      </div>
    </b-card>
    
    <div class="container">
        <b-nav>
            <b-nav-item href="http://www.palestineembassy.org.sa/index.html" target="_blank">{{$t('Home')}}</b-nav-item>
            <b-nav-item href="http://www.palestineembassy.org.sa/Ar_Embassy.htm" target="_blank">{{$t('Embassy')}}</b-nav-item>
            <b-nav-item href="http://www.palestineembassy.org.sa/Ar_consulate.htm" target="_blank">{{$t('Consulate')}}</b-nav-item>
            <b-nav-item href="http://www.palestineembassy.org.sa/Ar_Palestine.htm" target="_blank">{{$t('Palestine')}}</b-nav-item>
            <b-nav-item href="http://www.palestineembassy.org.sa/Ar_saudi.htm" target="_blank">{{$t('Saudia')}}</b-nav-item>
            <b-nav-item href="http://www.palestineembassy.org.sa/Ar_Usefullinks.htm" target="_blank">{{$t('ImportantLinks')}}</b-nav-item>
            <b-nav-item href="http://www.palestineembassy.org.sa/Ar_Documents.htm" target="_blank">{{$t('ImportantDocs')}}</b-nav-item>
            <b-nav-item href="http://www.palestineembassy.org.sa/Ar_news.htm" target="_blank">{{$t('News')}}</b-nav-item>
            <b-nav-item active>{{$t('AppointmentBooking')}}</b-nav-item>
            <b-nav-item href="http://www.palestineembassy.org.sa/Ar_contact_us.htm" target="_blank">{{$t('ContactUs')}}</b-nav-item>
        </b-nav>
        <AppointmentBooking ref="appointmentBooking"
        @startTime="startTime= $event"
        @endTime="endTime= $event"
        />
    </div>
    <div class="container mt-4">
       <AppointmentAddEdit :startTime="startTime" :endTime="endTime"/>
    </div>
  </div>
</template>

<script>
import AppointmentBooking from './AppointmentBooking';
import AppointmentAddEdit from './AppointmentAddEdit';
export default {
    components: {
        AppointmentBooking,
        AppointmentAddEdit
    },
    data() {
      return {
        startTime: '',
        endTime: '',
      }
    },
};
</script>

<style>
</style>