<template lang="html">
  <div>
    <h5>{{$t('Users')}}</h5>
     <div class="main-card mb-3 card">
            <div class="card-body">
                <div>
                    <div class="row">
                        <div class="col-md-6">
                            <span id="addWrapper">
                                <button  class="btn mb-2 btn-transition btn-outline-primary"  
                                @click='addNew()'>
                                    <i class="btn-icon-wrapper lnr-plus-circle"></i> {{$t("AddNew")}}
                                </button>
                            </span>
                        </div>
                        <div class="col-md-6">
                            <div  class="input-group input-group">
                                <input type="text" name="name" class="form-control" v-model="filter" :placeholder="$t('TypeToSearch')">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-icon btn-secondary" @click="filter = ''">
                                <i class="btn-icon-wrapper lnr-redo"></i>
                                {{$t("Clear")}}
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>
                     <b-table show-empty 
                            :empty-filtered-text="$t('emptyTable')"
                            :empty-text="$t('emptyTable')"
                            stacked="md"
                            bordered
                            striped
                            :items="users"
                            :fields="fields"
                            :current-page="pagination.currentPage"
                            :per-page="pagination.perPage"
                            :filter="filter"
                            :filterIncludedFields="filterOn"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            :sort-direction="sortDirection"
                            @filtered="onFiltered">
                        <template v-slot:cell(actions)="row" >
                            <b-dropdown no-flip :text='$t("Actions")' class="" variant="primary">
                                <span :id="'editWrapper'+row.index">
                                    <button type="button"  class="dropdown-item text-primary" 
                                        @click='editRow(row.item)'>
                                        <i class="pe-7s-tools dropdown-icon"></i>
                                        {{$t("Edit")}}
                                    </button>
                                </span>
                                <span :id="'deleteWrapper'+row.index">
                                    <button type="button"  class="dropdown-item text-danger" 
                                        @click='deleteCity(row.item.id)'>
                                        <i class="pe-7s-trash dropdown-icon"></i>
                                        {{$t("Delete")}}
                                    </button>
                                </span>
                            </b-dropdown>
                        </template>
                    </b-table>
                    <div class="row">
                        <div class="col-md-6">
                                <b-pagination v-model="pagination.currentPage"
                                :total-rows="totalRowsGeneral"
                                :per-page="pagination.perPage"
                                v-if="totalPagesGeneral>1"
                                class="my-0"></b-pagination>
                        </div>
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
    fields: [
      { key: 'name', label: this.$t('Name'), sortable: true, sortDirection: 'desc' },
      { key: 'email', label: this.$t('Email'), sortable: true, sortDirection: 'desc' },
      { key: 'created_at', label: this.$t('CreatedAt'), sortable: true, sortDirection: 'desc' },
      { key: 'actions', label: '','thStyle':'width:10%;','class':'action-column' }
    ],
		users:[],
    pagination:{
      currentPage: 1,
      perPage: 10,
    },
    userModal: false,
    inputs: {
      id: 0,
      name: '',
      email: ''
    }
	}
  },
  methods: {
	  initData() {
		     this.$store.dispatch("users/getData").then(res => {
				 this.users= res.data;
			 });
	  },
    addNew() {
      this.clearData();
      this.userModal=true;
    },
    clearData() {
      this.inputs = {
      id: 0,
      name: '',
      email: ''
    }
    },
    editData(row) {
      this.userModal= true;
      this.inputs = JSON.parse(JSON.stringify(row))
    },
    saveData() {
      if(this.inputs.id == 0) {
        this.$store.dispatch('users/saveData', this.inputs).then(res => {
          this.userModal= false;
            this.$vs.notify({
              title:this.$t('Saved'),
              text: this.$t('SavedSuccessfully'),
              color:'success',
              position: 'top-center',
              time:4000,
          })
          this.initData();
        })
      }
      else {
         this.$store.dispatch('users/updateData', this.inputs).then(res => {
          this.userModal= false;
            this.$vs.notify({
              title:this.$t('Updated'),
              text: this.$t('UpdatedSuccessfully'),
              color:'success',
              position: 'top-center',
              time:4000,
          })
          this.initData();
        })
      }
    },

    openConfirm(id){
      let me= this;
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: this.$t('Delete'),
        text: this.$t('DeleteQuestion'),
        acceptText:this.$t('Accept'),
        cancelText: this.$t('Cancel'),
        accept: function () {
          me.removeData(id)
        },
    })
    },
    removeData(id) {
        this.$store.dispatch('users/removeData', id).then(res => {
          this.userModal= false;
            this.$vs.notify({
              title:this.$t('Deleted'),
              text: this.$t('DeletedSuccessfully'),
              color:'success',
              position: 'top-center',
              time:4000,
          })
          this.initData();
        })
    }
    
  },
  
  created() {
	  this.initData();
  }
}
</script>