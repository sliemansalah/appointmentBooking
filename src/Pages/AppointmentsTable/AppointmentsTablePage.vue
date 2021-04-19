<template>
    <div>
        <h4>{{$t('Appointments')}}</h4>
        <div class="main-card mt-3 card">
            <div class="card-body">
                <div>
                    <div class="row">
                        <div class="col-md-6">
                        </div>
                        <div class="col-md-6">
                            <div  class="input-group input-group">
                                <input type="text" name="name" class="form-control" v-model="filter" :placeholder="$t('TypeToSearch')">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-icon btn-secondary" @click="filter = ''">
                                    {{$t("Clear")}}
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
                            @filtered="onFiltered">
                        <template v-slot:cell(actions)="row" >
                                    <b-button variant="success" 
                                        @click='detailsRow(row.item)'>
                                        {{$t("Services")}}
                                    </b-button>
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
                    { key: 'user.name', label: this.$t('UserName'), sortable: true, sortDirection: 'desc' },
                    { key: 'finish_time', label: this.$t('BookDate'), sortable: true, sortDirection: 'desc' },
                    { key: 'start_time', label: this.$t('BookTime'), sortable: true, sortDirection: 'desc' },
                    { key: 'person_number', label: this.$t('PersonCount'), sortable: true, sortDirection: 'desc' },
                    { key: 'transaction_number', label: this.$t('TransactionCount'), sortable: true, sortDirection: 'desc' },
                    { key: 'status', label: this.$t('Status'), sortable: true, sortDirection: 'desc' },
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
                filterOn: ['name'],
                addEditObj:{
                    id:0,
                    name: '',
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
                    this.$store.dispatch("appointments/removeData", idVal)
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
            onFiltered(filteredItems) {
                this.pagination.currentPage = 1;
                this.items = filteredItems;
            },
            initData() {
                this.$store
                .dispatch("appointments/getData")
                .then(res => {
                    this.items = res.data;
                })
                .catch(error => {
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
                    name: ''
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
