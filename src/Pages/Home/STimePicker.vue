<template>
  <div id="stimepicker">
    <div class="v-picker v-card v-picker--date theme--light">
      <div class="v-picker__title gold lighten-1">
      </div>
      <div class="v-picker__body theme--light">
        <div>
          <div class="v-date-picker-header theme--light">
            <button  @click="changeZone" type="button" class="v-btn v-btn--icon theme--light">
              <div class="v-btn__content">
                <i aria-hidden="true" class="v-icon material-icons theme--light"
                  >chevron_left</i
                >
              </div>
            </button>
            <div class="v-date-picker-header__value">
              <div class="gold--text text--lighten-1">
                <button type="button">{{zone}}</button>
              </div>
            </div>
            <button @click="changeZone" type="button" class="v-btn v-btn--icon theme--light">
              <div  class="v-btn__content">
                <i aria-hidden="true" class="v-icon material-icons theme--light"
                  >chevron_right</i
                >
              </div>
            </button>
          </div>
          <div
            class="v-date-picker-table v-date-picker-table--date theme--light"
          >
            <table>
              <tbody>
                <tr>
                  <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==1?'active': ''" 
                        @click="changeTime(1)"
                        class="v-btn__content">12:00 {{zone}}
                      </div>
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                       <div 
                        :class="value==2?'active': ''" 
                        @click="changeTime(2)"
                        class="v-btn__content">12:30 {{zone}}
                      </div>
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==3?'active': ''" 
                        @click="changeTime(3)"
                        class="v-btn__content">01:00 {{zone}}
                      </div>
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==4?'active': ''" 
                        @click="changeTime(4)"
                        class="v-btn__content">01:30 {{zone}}
                      </div>
                    </button>
                  </td>
                </tr>
                <tr>
                    <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==5?'active': ''" 
                        @click="changeTime(5)"
                        class="v-btn__content">02:00 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==6?'active': ''" 
                        @click="changeTime(6)"
                        class="v-btn__content">02:30 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==7?'active': ''" 
                        @click="changeTime(7)"
                        class="v-btn__content">03:00 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==8?'active': ''" 
                        @click="changeTime(8)"
                        class="v-btn__content">03:30 {{zone}}
                      </div>
                    </button>
                  </td>
                </tr>
                <tr>
                    <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==9?'active': ''" 
                        @click="changeTime(9)"
                        class="v-btn__content">04:00 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                    <div 
                        :class="value==10?'active': ''" 
                        @click="changeTime(10)"
                        class="v-btn__content">04:30 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==11?'active': ''" 
                        @click="changeTime(11)"
                        class="v-btn__content">05:00 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==12?'active': ''" 
                        @click="changeTime(12)"
                        class="v-btn__content">05:30 {{zone}}
                      </div>
                    </button>
                  </td>
                </tr>
                 <tr>
                    <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                     <div 
                        :class="value==13?'active': ''" 
                        @click="changeTime(13)"
                        class="v-btn__content">06:00 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==14?'active': ''" 
                        @click="changeTime(14)"
                        class="v-btn__content">06:30 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==15?'active': ''" 
                        @click="changeTime(15)"
                        class="v-btn__content">07:00 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==16?'active': ''" 
                        @click="changeTime(16)"
                        class="v-btn__content">07:30 {{zone}}
                      </div>
                    </button>
                  </td>
                </tr>
                <tr>
                    <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==17?'active': ''" 
                        @click="changeTime(17)"
                        class="v-btn__content">08:00 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                     <div 
                        :class="value==18?'active': ''" 
                        @click="changeTime(18)"
                        class="v-btn__content">08:30 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==19?'active': ''" 
                        @click="changeTime(19)"
                        class="v-btn__content">09:00 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==20?'active': ''" 
                        @click="changeTime(20)"
                        class="v-btn__content">09:30 {{zone}}
                      </div>
                    </button>
                  </td>
                </tr>
                 <tr>
                    <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==21?'active': ''" 
                        @click="changeTime(21)"
                        class="v-btn__content">10:00 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                      <div 
                        :class="value==22?'active': ''" 
                        @click="changeTime(22)"
                        class="v-btn__content">10:30 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                     <div 
                        :class="value==23?'active': ''" 
                        @click="changeTime(23)"
                        class="v-btn__content">11:00 {{zone}}
                      </div>
                    </button>
                  </td>
                   <td>
                    <button
                      type="button"
                      class="v-btn v-btn--flat v-btn--floating theme--light mt-1 mr-1"
                    >
                     <div 
                        :class="value==24?'active': ''" 
                        @click="changeTime(24)"
                        class="v-btn__content">11:30 {{zone}}
                      </div>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          zone: 'PM',
          value: ''
      }
  },
  methods: {
      changeZone() {
          if (this.zone == 'PM' ) {
              this.zone = 'AM';
          }
          else if (this.zone == 'AM' ) {
              this.zone = 'PM';
              this.value = ''
          }
      },
      changeTime(value) {
        this.value = value;
        this.$emit('changeTime', this.value);
        this.$emit('changeZone', this.zone);

      }
  }
};
</script>

<style>
#stimepicker .v-date-picker-table--date .v-btn {
  width: 100%;
  height: 40px;
  border-radius: 10px;
}
#stimepicker .v-date-picker-table--date .v-btn:hover,
#stimepicker .v-btn__content.active
{
  background: #c09300;
  color: #fff;
}
#stimepicker .v-picker__body > div {
    overflow-y: auto;
}
</style>