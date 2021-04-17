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
            <b-nav-item>{{$t('Home')}}</b-nav-item>
            <b-nav-item>{{$t('Embassy')}}</b-nav-item>
            <b-nav-item>{{$t('Consulate')}}</b-nav-item>
            <b-nav-item>{{$t('Palestine')}}</b-nav-item>
            <b-nav-item>{{$t('Saudia')}}</b-nav-item>
            <b-nav-item>{{$t('ImportantLinks')}}</b-nav-item>
            <b-nav-item>{{$t('ImportantDocs')}}</b-nav-item>
            <b-nav-item>{{$t('News')}}</b-nav-item>
            <b-nav-item active>{{$t('AppointmentBooking')}}</b-nav-item>
            <b-nav-item>{{$t('ContactUs')}}</b-nav-item>
        </b-nav>
        <AppointmentBooking />
    </div>
  </div>
</template>

<script>
import AppointmentBooking from './AppointmentBooking';
export default {
    components: {
        AppointmentBooking
    }
};
</script>

<style>
</style>