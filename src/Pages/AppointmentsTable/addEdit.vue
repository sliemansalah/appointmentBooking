<template>
  <form ref="form" @submit.stop.prevent="saveAddEdit">
    <b-table
      class="mt-3"
      show-empty
      :empty-filtered-text="$t('emptyTable')"
      :empty-text="$t('emptyTable')"
      stacked="md"
      :bordered="true"
      :striped="true"
      :items="addEditObj.services"
      :current-page="pagination.currentPage"
      :per-page="pagination.perPage"
      :fields="fields"
    >
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

    <button
      type="button"
      class="btn c-ml-2 mb-2 btn-icon btn-secondary float-left"
      @click="$emit('closeAddEdit')"
    >
      {{ $t("Close") }}
    </button>
    <b-button
      v-if="!viewMode"
      type="primary"
      variant="primary"
      class="float-left ml-2"
    >
      {{ $t("Save") }}
    </b-button>
  </form>
</template>

<script>
export default {
  name: "itemsAddEdit",
  props: ["addEditObj", "items", "viewMode", "editMode"],
  data() {
    return {
      fields: [
        {
          key: "name",
          label: this.$t("ServiceName"),
          sortable: false,
        },
      ],
      pagination: {
        currentPage: 1,
        perPage: 10,
      },
      button: {
        loading: false,
        dataStyle: "zoom-out",
        progress: 0,
      },
    };
  },
  methods: {
    saveAddEdit() {
      this.$validator.validateAll("addEditValidation").then((result) => {
        if (result) {
          this.button.loading = true;
          if (this.addEditObj.id > 0) {
            this.$store
              .dispatch("services/updateData", this.addEditObj)
              .then((_) => {
                this.$emit("saveAddEdit");
              })
              .catch((_) => {
                this.$notify.error({
                  duration: 3000,
                  message: this.$t("UpdatedFailed"),
                  title: this.$t("Updated"),
                  customClass: "top-center",
                });
              });
          } else {
            this.$store
              .dispatch("services/saveData", this.addEditObj)
              .then((_) => {
                this.$emit("saveAddEdit");
              })
              .catch((_) => {
                this.$notify.error({
                  duration: 3000,
                  message: this.$t("AddedFailed"),
                  title: this.$t("Added"),
                  customClass: "top-center",
                });
              });
          }
        }
      });
    },
  },
  computed:{
        totalRowsGeneral(){
            return this.addEditObj.services.length;
        },
        totalPagesGeneral(){
            return this.addEditObj.services.length/this.pagination.perPage;
        },
    },
};
</script>