<template>
    <div>
        <div class="item">
            <el-card class="box-card" >
                <div slot="header" class="clearfix">
                    <el-button style="float: left;" type="primary" @click="addVisible = true">添加分类</el-button>
                </div>
                <el-table :data="tableData" @cell-click="clickRow">
                    <el-table-column prop="bookName" label="分类名称" >
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button style="margin-left: 20px;" size="small" type="primary"
                                       @click="handleEdit(scope.row)">更改
                            </el-button>
                            <el-button style="margin-left: 20px;" size="small" type="danger"
                                       @click="handleDelete(scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>

        <el-dialog title="添加分类" :visible.sync="addVisible" width="30%">
            <el-form ref="book" :model="book" label-width="100px">
                <el-form-item label="分类名称">
                    <el-input v-model="book.bookName" placeholder="请输入分类名称"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCategory">确 定</el-button>
        </span>
        </el-dialog>

        <el-dialog title="修改分类" :visible.sync="editVisible" width="30%">
            <el-form ref="book" :model="book" label-width="100px">
                <el-form-item label="书籍名称">
                    <el-input v-model="book.bookName" placeholder="请输入分类名称"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="editCategory">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
    import {projectUrl} from "../../api/api";
    import * as apis from '../../api/book'

    export default {
        name: 'NewItem',
        props: {
            tableData: {
                type: Array,
            },
        },
        data() {
            return {
                projectUrl: projectUrl,
                addVisible: false,
                editVisible: false,
                book: new apis.Book(),
                districtData:[{id:1,name:'test1'}],
                buildingData:[],
                buildingVisible:false,
                addBuildVisible:false,
                editBuildVisible:false,

            }
        },
        methods: {
            clickRow(row,cell) {
                this.$emit("child-data", row.id)
            },
            addCategory() {
                this.book.pid = 0;
                apis.AddItem(this.book).then(res => {
                    if (res.code == 200){
                        this.$message.success(res.msg);
                        this.book = new apis.Book();
                        this.addVisible = false;
                        this.refresh();
                    }else {
                        this.$message.error(res.msg);
                    }
                }).catch(e=>{
                    this.$message.error(e);
                })

            },
            editCategory() {
                apis.UpdateItem(this.book).then(res => {
                    if (res.code == 200){
                        this.$message.success(res.msg);
                        this.book = new apis.Book();
                        this.editVisible = false;
                        this.refresh();
                    }else {
                        this.$message.error(res.msg);
                    }
                }).catch(e=>{
                    this.$message.error(e);
                })
            },
            handleEdit(row) {
                this.editVisible = true;
                Object.assign(this.book,row);
            },
            handleDelete(row) {
                apis.DeleteItem(row.id).then(res => {
                    if (res.code == 200){
                        this.$message.success(res.msg);
                        this.book = new apis.Book();
                        this.editVisible = false;
                        this.refresh();
                    }else {
                        this.$message.error(res.msg);
                    }
                }).catch(e=>{
                    this.$message.error(e);
                })
            },
            refresh(){
                this.$emit("refresh");
            }
        },
    }
</script>


<style>
    .text {
        font-size: 14px;
    }

    .item{
        float: left;
        margin-left: 30px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 450px;
    }
</style>
