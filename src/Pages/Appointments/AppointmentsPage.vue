<template>
  <div>
    <b-button variant="primary" class="float-right" @click="addNew">
      <span>{{ $t("AddNewBook") }}</span>
    </b-button>
    <h1 class="text-center mb-3">{{ $t("Appointments") }}</h1>
    <Fullcalendar
      :allDaySlot="false"
      class="mt-10"
      :locale="locale"
      defaultView="dayGridMonth"
      :plugins="calendarPlugins"
      :header="{
        center: 'title',
        right: 'dayGridMonth, timeGridDay',
        left: 'next today prev',
      }"
      :buttonText="{
        today: $t('Today'),
        month: $t('AsMonth'),
        day: $t('AsToday'),
      }"
      :weekends="true"
      :selectable="true"
      :editable="false"
      :events="events"
      @select="handleSelect"
      @eventClick="handleEventClick"
    />

    <b-modal
      v-model="appointmentsModal"
      id="info-modal"
      :title="$t('Services')"
      ok-only
      hide-footer
      size="lg"
    >
      <div class="row">
        <div class="col-md-12">
          <div
            class="form-group"
            :class="{
              'has-error': errors.has('addEditValidation.services'),
            }"
          >
            <label class="control-label">{{ $t("Services") }}</label>
            <label class="required">*</label>
            <el-select
              style="width: 100%"
              class="mt-2"
              v-model="inputs.services"
              multiple
              filterable
              clearable
              name="services"
              v-validate="'required'"
              data-vv-scope="addEditValidation"
              :data-vv-as="$t('Services')"
              :placeholder="$t('Select')"
            >
              <el-option
                v-for="item in services"
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
      </div>
      <div class="row mt-3">
        <div class="col-md-6">
          <div
            class="form-group"
            :class="{
              'has-error': errors.has('addEditValidation.user_id'),
            }"
          >
            <label class="control-label">{{ $t("User") }}</label>
            <label class="required">*</label>
            <el-select
              style="width: 100%"
              class="mt-2"
              v-model="inputs.user_id"
              filterable
              clearable
              name="user_id"
              v-validate="'required'"
              data-vv-scope="addEditValidation"
              :data-vv-as="$t('User')"
              :placeholder="$t('Select')"
            >
              <el-option
                v-for="item in users"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <div
              class="help-block"
              v-if="errors.has('addEditValidation.user_id')"
            >
              {{ errors.first("addEditValidation.user_id") }}
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div
            class="form-group"
            :class="{
              'has-error': errors.has('addEditValidation.date'),
            }"
          >
            <label class="control-label">{{ $t("Date") }}</label>
            <label class="required">*</label>
            <el-date-picker
              class="mt-2"
              style="width: 100%"
              v-model="inputs.date"
              name="date"
              v-validate="'required'"
              data-vv-scope="addEditValidation"
              :data-vv-as="$t('Date')"
              type="date"
              :placeholder="$t('Select')"
              :picker-options="currentDatePickerOptions"
            >
            </el-date-picker>

            <div class="help-block" v-if="errors.has('addEditValidation.date')">
              {{ errors.first("addEditValidation.date") }}
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6">
          <div
            class="form-group"
            :class="{
              'has-error': errors.has('addEditValidation.startTime'),
            }"
          >
            <label class="control-label">{{ $t("FromTime") }}</label>
            <label class="required">*</label>

            <el-time-select
              class="mt-2"
              style="width: 100%"
              :placeholder="$t('Select')"
              v-model="startTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:00',
              }"
              name="startTime"
              v-validate="'required'"
              data-vv-scope="addEditValidation"
              :data-vv-as="$t('FromTime')"
            >
            </el-time-select>

            <div
              class="help-block"
              v-if="errors.has('addEditValidation.startTime')"
            >
              {{ errors.first("addEditValidation.startTime") }}
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div
            class="form-group"
            :class="{
              'has-error': errors.has('addEditValidation.endTime'),
            }"
          >
            <label class="control-label">{{ $t("ToTime") }}</label>
            <label class="required">*</label>

            <el-time-select
              class="mt-2"
              style="width: 100%"
              :placeholder="$t('Select')"
              v-model="endTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:00',
                minTime: startTime,
              }"
              name="endTime"
              v-validate="'required'"
              data-vv-scope="addEditValidation"
              :data-vv-as="$t('ToTime')"
            >
            </el-time-select>

            <div
              class="help-block"
              v-if="errors.has('addEditValidation.endTime')"
            >
              {{ errors.first("addEditValidation.endTime") }}
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-3 mr-0">
        <el-button type="primary" @click="saveData">{{ $t("Save") }}</el-button>
        <el-button v-if="editMode" type="danger" @click="openConfirm">{{
          $t("Delete")
        }}</el-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
require("@fullcalendar/core/main.min.css");
require("@fullcalendar/daygrid/main.min.css");
require("@fullcalendar/timegrid/main.min.css");
import Fullcalendar from "@fullcalendar/vue";
import DayGridPlugin from "@fullcalendar/daygrid";
import TimeGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin from "@fullcalendar/interaction";
import arLocale from "@fullcalendar/core/locales/ar";
import moment from "moment";
export default {
  name: "appointments",
  components: { Fullcalendar },
  data() {
    return {
      currentDatePickerOptions: {
        disabledDate(date) {
          var yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          return date < yesterday;
        },
      },
      appointmentsModal: false,
      editMode: false,
      calendarPlugins: [DayGridPlugin, TimeGridPlugin, InteractionPlugin],
      locale: arLocale,
      events: [],
      services: [],
      users: [],
      inputs: {
        services: [],
        user_id: "",
        start_time: "",
        finish_time: "",
        date: null,
      },
      startTime: null,
      endTime: null,
      id: null,
    };
  },
  methods: {
    addNew() {
      this.clearData();
      this.appointmentsModal = true;
    },
    openConfirm() {
      let me = this;
      this.$confirm(
        me.$t("DeleteConfirmMessage"),
        me.$t("DeleteConfirmTitle"),
        {
          confirmButtonText: this.$t("DeleteConfirmOk"),
          cancelButtonText: this.$t("DeleteConfirmCancel"),
          type: "warning",
        }
      ).then((res) => {
        if (res) {
          me.removeData();
        }
      });
    },
    removeData() {
      this.$store
        .dispatch("appointments/removeData", parseInt(this.id))
        .then((res) => {
          this.serviceModal = false;
          this.$notify.success({
            duration: 3000,
            message: this.$t("DeleteSuccessfully"),
            title: this.$t("Delete"),
            customClass: "top-center",
          });
          this.appointmentsModal = false;
          this.initData();
        });
    },

    saveData() {
      this.$validator.validateAll("addEditValidation").then((result) => {
        if (result) {
          let dataToSend = this.inputs;
          dataToSend.id = parseInt(this.id);
          dataToSend.start_time =
            moment(this.inputs.date).format("YYYY-MM-DD") + " " + this.startTime;
          dataToSend.finish_time =
            moment(this.inputs.date).format("YYYY-MM-DD") + " " + this.endTime;
          delete dataToSend.status;
          delete dataToSend.date;
          if (this.editMode) {
            this.$store
              .dispatch("appointments/updateData", dataToSend)
              .then((res) => {
                this.$notify.success({
                  duration: 3000,
                  message: this.$t("UpdateBookingSuccessfully"),
                  title: this.$t("Update"),
                  customClass: "top-center",
                });
                this.appointmentsModal = false;
                this.initData();
              })
              .catch((err) => {
                this.$notify.error({
                  duration: 3000,
                  message: this.$t("UpdatedFailed"),
                  title: this.$t("Updated"),
                  customClass: "top-center",
                });
              });
          } else {
            this.$store
              .dispatch("appointments/saveData", dataToSend)
              .then((res) => {
                this.$notify.success({
                  duration: 3000,
                  message: this.$t("AddedBookingSuccessfully"),
                  title: this.$t("Added"),
                  customClass: "top-center",
                });
                this.appointmentsModal = false;
                this.initData();
              })
              .catch((err) => {});
          }
        }
      });
    },
    clearData() {
      this.inputs = {
        services: [],
        user_id: "",
        start_time: "",
        finish_time: "",
        date: ""
      };
      this.startTime = null;
      this.endTime = null;
      this.id = null;
      this.editMode = false;
    },
    handleSelect(arg) {
      this.addNew();
      if (arg.startStr.includes("T")) {
        this.inputs.date = moment(arg.startStr);
        this.startTime = arg.startStr.substring(11, 16);
        this.endTime = arg.endStr.substring(11, 16);
      } else {
        this.inputs.date = moment(arg.startStr);
      }
    },
    handleEventClick(arg) {
      this.addNew();
      this.editMode = true;
      this.id = arg.event.id;
      this.$store
        .dispatch("appointments/findData", arg.event.id)
        .then((res) => {
          this.inputs = res.data;
          this.inputs.date = moment(res.data.start_time).format("YYYY-MM-DD");
          this.startTime = res.data.start_time.substring(11, 16);
          this.endTime = res.data.finish_time.substring(11, 16);

          let getServices = [];
          this.inputs.services.forEach((data) => {
            getServices.push(data.id);
          });
          this.inputs.services = getServices;
        });
    },
    initData() {
      this.$store.dispatch("services/getData").then((res) => {
        this.services = res.data;
      });
      this.$store.dispatch("users/getData").then((res) => {
        this.users = res.data;
      });
      this.$store.dispatch("appointments/getData").then((res) => {
        this.events = res.data.map((data) => {
          data.title = data.user.name;
          data.start = data.start_time;
          data.end = data.finish_time;

          if (data.status == 'حجز قادم') {
            data.backgroundColor = "#00f";
            data.borderColor = "#00f";
          } else if (data.status == 'حجز جاري') {
            data.backgroundColor = "#0f0";
            data.borderColor = "#0f0";
          } else if (data.status == 'حجز منتهي') {
            data.backgroundColor = "#f00";
            data.borderColor = "#f00";
          } else {
            data.backgroundColor = "#00f";
            data.borderColor = "#00f";
          }
          return data;
        });
      });
    },
  },
  created() {
    this.initData();
  },
};
</script>