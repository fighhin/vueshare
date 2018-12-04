<template>
    <div class="table">
        <category-item class="item" :tableData="contentList" v-on:child-data="getCategoryData"
                       v-on:refresh="refreshCategoryData">
        </category-item>
        <book-item class="item" v-if="showSecondLevel"
                   :table-data="secondLevelData"
                   :pid="currentPid"
                   ref="second"
                   v-on:closeCard="closeChild"
                   v-on:refreshChild="refreshBookData">
        </book-item>

    </div>
</template>

<script>
    import * as apis from '../../api/book'
    import categoryItem from '../component/CategoryItem'
    import bookItem from '../component/BookItem'

    export default {
        components: {
            categoryItem,
            bookItem
        },
        data() {
            return {
                contentList: [],
                typeId: '',
                pageSize: 5,
                page: 1,
                total: 0,
                showSecondLevel: false,
                secondLevelData: [],
                currentPid: 0,
            }
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.page = val;
                this.refreshCategoryData();
            },
            getCategoryData(id) {
                this.showSecondLevel = true;
                var para = {
                    id: id,
                }
                apis.GetBookOfCategoryList(para).then(res => {
                    this.secondLevelData = res.data;
                    this.currentPid = id;
                    // this.$refs.second.getPid(id);
                })
            },

            closeChild() {
                this.showSecondLevel = false;
            },
            refreshCategoryData() {
                apis.GetCategoryList(null).then(res => {
                    this.contentList = res.data;
                    this.total = res.total;
                })
            },
            refreshBookData() {
                var para = {
                    id: this.currentPid,
                }
                apis.GetBookOfCategoryList(para).then(res => {
                    this.secondLevelData = res.data;
                })
            }
        },
        mounted() {
            this.refreshCategoryData();
        },
        watch: {
            // '$route': function (to, from) {
            //     this.typeId = this.$route.query.id;
            //     console.log("***************", this.typeId);
            //     this.refreshCategoryData();
            // }
            // 'currentPid':function () {
            //     console.log(this.currentPid);
            //     this.getCategoryData(this.currentPid);
            //
            // }
        }
    }


</script>

<style scoped>
    .item {
        float: left;
        margin-left: -5px;
    }


</style>
