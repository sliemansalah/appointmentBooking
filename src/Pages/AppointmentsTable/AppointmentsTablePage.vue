<template>
  <div>
    <h4 class="goldColor">{{ $t("Appointments") }}</h4>
    <div class="main-card mt-3 card">
      <div class="card-body">
        <div>
          <div class="row">
            <div class="col-md-6"></div>
            <div class="col-md-6">
              <div class="input-group input-group">
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  v-model="filter"
                  @keyup="onFiltered(filter)"
                  :placeholder="$t('TypeToSearch')"
                />
                <div class="input-group-append">
                  <button
                    type="button"
                    class="btn btn-icon btn-secondary"
                    @click="filter = ''"
                  >
                    <i class="pe-7s-refresh"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <b-table
            class="mt-3"
            show-empty
            :empty-filtered-text="$t('emptyTable')"
            :empty-text="$t('emptyTable')"
            stacked="md"
            :bordered="true"
            :striped="true"
            :items="itemsFiltered"
            :current-page="pagination.currentPage"
            :per-page="pagination.perPage"
            :fields="fields"
            :filter="filter"
            :filterIncludedFields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
          >
            <template v-slot:cell(actions)="row">
              <b-button variant="success" @click="detailsRow(row.item)">
                {{ $t("Services") }}
              </b-button>
            </template>

            <template v-slot:cell(status)="row">
              <span
                v-if="row.item.status == 'حجز قادم'"
                style="color: blue; font-weight: bold"
              >
                حجز قادم
              </span>
              <span
                v-else-if="row.item.status == 'حجز جاري'"
                style="color: green; font-weight: bold"
              >
                حجز جاري
              </span>
              <span
                v-else-if="row.item.status == 'حجز منتهي'"
                style="color: red; font-weight: bold"
              >
                حجز منتهي
              </span>

              <el-dropdown
                @command="updateStatus(row.item, $event)"
                trigger="click"
              >
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    :style="
                      row.item.status == 'حجز قادم' ? 'background:#FFF4CF' : ''
                    "
                    style="color: blue; font-weight: bold"
                    command="0"
                  >
                    حجز قادم
                  </el-dropdown-item>
                  <el-dropdown-item
                    :style="
                      row.item.status == 'حجز جاري' ? 'background:#FFF4CF' : ''
                    "
                    style="color: green; font-weight: bold"
                    command="1"
                  >
                    حجز جاري
                  </el-dropdown-item>
                  <el-dropdown-item
                    :style="
                      row.item.status == 'حجز منتهي' ? 'background:#FFF4CF' : ''
                    "
                    style="color: red; font-weight: bold"
                    command="2"
                  >
                    حجز منتهي
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </b-table>
          <div class="row">
            <div class="col-md-6">
              <b-pagination
                v-model="pagination.currentPage"
                :total-rows="totalRowsGeneral"
                :per-page="pagination.perPage"
                v-if="totalPagesGeneral > 1"
                class="my-0"
              ></b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      v-model="infoModalShow"
      id="info-modal"
      :title="infoModalTitle"
      ok-only
      hide-footer
      size="lg"
    >
      <addEdit
        :addEditObj="addEditObj"
        :items="items"
        @saveAddEdit="saveAddEdit"
        @closeAddEdit="infoModalShow = false"
        :editMode="editMode"
        :viewMode="viewMode"
      >
      </addEdit>
    </b-modal>
  </div>
</template>
<script>
import addEdit from "./addEdit";
import moment from "moment";

export default {
  components: {
    addEdit,
  },
  data() {
    return {
      items: [],
      itemsFiltered: [],
      fields: [
        {
          key: "userName",
          label: this.$t("UserName"),
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "bookDate",
          label: this.$t("BookDate"),
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "bookTime",
          label: this.$t("BookTime"),
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "person_number",
          label: this.$t("PersonCount"),
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "transaction_number",
          label: this.$t("TransactionCount"),
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "status",
          label: this.$t("Status"),
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "actions",
          label: this.$t("Actions"),
          thStyle: "min-width:10%;",
          class: "action-column",
        },
      ],
      pagination: {
        currentPage: 1,
        perPage: 10,
      },
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [
        "userName",
        "bookDate",
        "bookTime",
        "person_number",
        "transaction_number",
        "status",
      ],
      addEditObj: {
        id: 0,
        name: "",
      },
      infoModalTitle: "",
      infoModalShow: false,
      editMode: false,
      viewMode: false,
    };
  },
  methods: {
    getDateFormat(date) {
      return moment(new Date(date)).format("DD-MM-YYYY");
    },
     onFiltered(filter) {
        let items = this.items;
      this.itemsFiltered = items.filter((x) => 
     x.user.name.toLowerCase().includes(filter.toLowerCase()) || 
      x.start_time.toLowerCase().includes(filter.toLowerCase()) ||
      x.finish_time.toLowerCase().includes(filter.toLowerCase()) ||
      x.person_number == filter.toLowerCase() ||
      x.transaction_number == filter.toLowerCase() ||
      x.status.toLowerCase().includes(filter.toLowerCase())
      );
      } ,
    updateStatus(data, status) {
      let ids = [];
      ids.push(data.id);
      let sendData = {
        id: ids,
        status: parseInt(status),
      };
      this.$store
        .dispatch("appointments/updateStatus", JSON.stringify(sendData))
        .then(() => {
          this.$notify.success({
            duration: 3000,
            message: this.$t("UpdatedSuccessfully"),
            title: this.$t("Update"),
            customClass: "top-center",
          });
          this.initData();
        })

        .catch((error) => {
          this.$notify.error({
            duration: 3000,
            message: error,
            title: this.$t("Error"),
            customClass: "top-center",
          });
        });
    },
    deleteRow(idVal) {
      this.$confirm(
        this.$t("DeleteConfirmMessage"),
        this.$t("DeleteConfirmTitle"),
        {
          confirmButtonText: this.$t("DeleteConfirmOk"),
          cancelButtonText: this.$t("DeleteConfirmCancel"),
          type: "warning",
        }
      ).then(() => {
        this.$store
          .dispatch("appointments/removeData", idVal)
          .then((_) => {
            let index = this.items.findIndex((x) => x.id == idVal);
            this.items.splice(index, 1);
            this.$notify.success({
              duration: 3000,
              message: this.$t("DeleteSuccessfully"),
              title: this.$t("Delete"),
              customClass: "top-center",
            });
          })
          .catch((_) => {
            this.$notify.error({
              duration: 3000,
              message: this.$t("DeleteFailed"),
              title: this.$t("Delete"),
              customClass: "top-center",
            });
          });
      });
    },
    initData() {
      this.$store
        .dispatch("appointments/getData")
        .then((res) => {
          this.items = res.data.map((item) => {
            item.userName = item.user ? item.user.name : "";
            item.bookDate = this.getDateFormat(item.finish_time);
            item.bookTime =
              item.finish_time.toString().substring(10) +
              "-" +
              item.start_time.toString().substring(10);
            return item;
          });
          this.itemsFiltered = this.items;
        })
        .catch((error) => {
          this.$notify.error({
            duration: 3000,
            message: this.$t("GetDataFailed"),
            title: this.$t("GetData"),
            customClass: "top-center",
          });
        });
    },
    addNewItem: function () {
      this.resetInfoModal();
      this.infoModalTitle = this.$t("AddNew");
      this.infoModalShow = true;
    },
    detailsRow(item) {
      this.resetInfoModal();
      this.viewMode = true;
      this.infoModalTitle = this.$t("Services");
      this.addEditObj = JSON.parse(JSON.stringify(item));
      this.infoModalShow = true;
    },
    editRow(item) {
      this.resetInfoModal();
      this.editMode = true;
      this.infoModalTitle = this.$t("Edit");
      this.addEditObj = JSON.parse(JSON.stringify(item));
      this.infoModalShow = true;
    },
    copyRow(item) {
      this.resetInfoModal();
      this.infoModalTitle = this.$t("AddNew");
      this.addEditObj = JSON.parse(JSON.stringify(item));
      this.addEditObj.id = 0;
      this.infoModalShow = true;
    },
    resetInfoModal() {
      this.editMode = false;
      this.viewMode = false;
      this.infoModalTitle = "";
      this.addEditObj = {
        id: 0,
        name: "",
      };
    },
    saveAddEdit() {
      this.infoModalShow = false;
      this.initData();
    },
  },
  computed: {
    totalRowsGeneral() {
      return this.itemsFiltered.length;
    },
    totalPagesGeneral() {
      return this.itemsFiltered.length / this.pagination.perPage;
    },
  },
  created() {
    this.initData();
  },
};
</script>
