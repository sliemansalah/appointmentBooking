<template>
    <div>
        <h4 class="goldColor">{{$t('Users')}}</h4>
        <div class="main-card mt-3 card">
            <div class="card-body">
                <div>
                    <div class="row">
                        <div class="col-md-6">
                            <span id="addWrapper">
                                <button  class="btn mb-2 btn-transition btn-outline-primary"  
                                @click='addNewItem()'>
                                    {{$t("AddNew")}}
                                </button>
                            </span>
                        </div>
                       <div class="col-md-6">
                            <div  class="input-group input-group">
                                <input type="text" 
                                name="name" 
                                class="form-control" 
                                v-model="filter" :placeholder="$t('TypeToSearch')">
                            <div class="input-group-append">
                                <button type="button" 
                                class="btn btn-icon btn-secondary" 
                                @click="filter = ''">
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
                            :items="items"
                            :current-page="pagination.currentPage"
                            :per-page="pagination.perPage"
                            :fields="fields"
                            :filter="filter"
                            :filterIncludedFields="filterOn"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            :sort-direction="sortDirection"
                            >
                        <template v-slot:cell(actions)="row" >
                            <b-dropdown no-flip :text='$t("Actions")' class="" variant="primary">
                                <span :id="'editWrapper'+row.index">
                                    <button type="button"  class="dropdown-item text-primary" 
                                        @click='editRow(row.item)'>
                                        {{$t("Edit")}}
                                    </button>
                                </span>
                                <span :id="'copyWrapper'+row.index">
                                    <button type="button"  class="dropdown-item text-info" 
                                        @click='copyRow(row.item)'>
                                        {{$t("Copy")}}
                                    </button>
                                </span>
                                <span :id="'deleteWrapper'+row.index">
                                    <button type="button"  class="dropdown-item text-danger" 
                                        @click='deleteRow(row.item.id)'>
                                        {{$t("Delete")}}
                                    </button>
                                </span>
                                <span :id="'detailsWrapper'+row.index">
                                    <button type="button"  class="dropdown-item text-success" 
                                        @click='detailsRow(row.item)'>
                                        {{$t("Details")}}
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
                @closeAddEdit="infoModalShow=false;"
                :editMode="editMode"
                :viewMode="viewMode"
                >
            </addEdit>
        </b-modal>
    </div>
</template>
<script>
    import addEdit from './addEdit'

    export default {
        components: {
            addEdit
        },
        data() {
            return {
                items: [],
                fields: [
                    { key: 'name', label: this.$t('Name'), sortable: true, sortDirection: 'desc' },
                    { key: 'email', label: this.$t('Email'), sortable: true, sortDirection: 'desc' },
                    { key: 'created_at', label: this.$t('CreatedAt'), sortable: true, sortDirection: 'desc' },
                    { key: 'actions', label: this.$t('Actions'),'thStyle':'min-width:10%;','class':'action-column' }
                ],
                pagination:{
                    currentPage: 1,
                    perPage:  10,
                },
                sortBy: '',
                sortDesc: false,
                sortDirection: 'asc',
                filter: null,
                filterOn: ['name', 'email'],
                addEditObj:{
                    id:0,
                    name: null,
                    email: '',
                    password: '',
                },
                filteredItems: [],
                infoModalTitle: '',
                infoModalShow: false,
                editMode: false,
                viewMode: false,
            }
        },
        methods: {
            deleteRow(idVal){
                this.$confirm(this.$t('DeleteConfirmMessage'), this.$t('DeleteConfirmTitle'), {
                    confirmButtonText: this.$t('DeleteConfirmOk'),
                    cancelButtonText: this.$t('DeleteConfirmCancel'),
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch("users/removeData", idVal)
                    .then(_ => {
                        let index=this.items.findIndex(x=>x.id==idVal);
                        this.items.splice(index,1);
                        this.$notify.success({
                            duration: 3000,
                            message: this.$t("DeleteSuccessfully"),
                            title: this.$t("Delete"),
                            customClass: "top-center",
                        }); 
                    })
                    .catch(_=>{
                       this.$notify.error({
                            duration: 3000,
                            message: this.$t("DeleteFailed"),
                            title: this.$t("Delete"),
                            customClass: "top-center",
                        }); 
                    })
                    
                })
            },
            initData() {
                this.$store
                .dispatch("users/getData")
                .then(res => {
                    this.items = res.data;
                })
                .catch(error => {
                    if(error.response.status == 500) {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }
                    this.$notify.error({
                        duration: 3000,
                        message: this.$t("GetDataFailed"),
                        title: this.$t("GetData"),
                        customClass: "top-center",
                    }); 
                });

            },
            addNewItem:function(){
                this.resetInfoModal()
                this.infoModalTitle = this.$t('AddNew');
                this.infoModalShow=true;
            },
            detailsRow(item) {
                this.resetInfoModal()
                this.viewMode= true;
                this.infoModalTitle = this.$t('Details');
                this.addEditObj=JSON.parse(JSON.stringify(item));
                this.infoModalShow=true;
            },
            editRow(item) {
                this.resetInfoModal()
                this.editMode= true;
                this.infoModalTitle = this.$t('Edit');
                this.addEditObj=JSON.parse(JSON.stringify(item));
                this.infoModalShow=true;
            },
            copyRow(item) {
                this.resetInfoModal()
                this.infoModalTitle = this.$t('AddNew');
                this.addEditObj=JSON.parse(JSON.stringify(item));
                this.addEditObj.id=0;
                this.infoModalShow=true;
            },
            resetInfoModal() {
                this.editMode= false;
                this.viewMode= false;
                this.infoModalTitle = '';
                this.addEditObj={
                    id:0,
                    name: null,
                    email: '',
                    password: '',
                }
            },
            saveAddEdit(){
                this.infoModalShow=false;
                this.initData();
            },
    },
    computed:{
        totalRowsGeneral(){
            return this.items.length;
        },
        totalPagesGeneral(){
            return this.items.length/this.pagination.perPage;
        },
    },
        created() {
            this.initData();
        }
    }
</script>
