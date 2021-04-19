<template>
      <div class="row mt-5">
          <div class="col-md-12">
              <h1 class="text-success text-center">تم الحجز بنجاح</h1>
              <div class="text-center mt-5">
                 <b-button @click="goToHome"  variant="primary">{{$t('BackToHome')}}</b-button>
              </div>
          </div>
      </div>
</template>

<script>
export default {
methods: {
    goToHome() {
        this.$router.push({name: 'home'})
    }
}
}
</script>

<style>

</style>