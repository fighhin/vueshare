<template>
    <div>
        <div class="item">
            <el-card class="box-card-second">
                <div slot="header" class="clearfix">
                    <el-button style="float: left;" type="primary" @click="addVisible = true">添加书籍</el-button>
                    <span
                        style="font-size: 14px;margin-left: 20px;margin-top: 10px;color: #ff6f6d;">{{bookBorrowInfo}}</span>
                    <el-button style="float: right;" @click="closeDep" type="text">
                        <i class="el-icon-circle-close"></i>
                    </el-button>
                </div>

                <el-table :data="tableData" @cell-click="clickRow">
                    <el-table-column prop="bookName" label="书籍名称">
                    </el-table-column>
                    <el-table-column prop="author" label="作者">
                    </el-table-column>
                    <el-table-column prop="status" label="借阅状态">
                        <template slot-scope="scope">
                            {{formatStatus(scope.row.borrowStatus)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="240">
                        <template slot-scope="scope">
                            <el-button style="margin-left: 10px;" size="mini" type="primary"
                                       @click="handleEdit(scope.row)">更改
                            </el-button>
                            <el-button style="margin-left: 10px;" size="mini" type="danger"
                                       @click="handleDelete(scope.row)">删除
                            </el-button>
                            <!--<router-link >-->
                            <!--<el-button style="margin-left: 20px;" size="small" type="danger"-->
                            <!--@click="handleDelete(scope.row)">查看-->
                            <!--</el-button>-->
                            <!--</router-link>-->
                            <el-button style="margin-left: 10px;" size="mini" type="danger"
                                       @click="seeBookContent(scope.row)">查看
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>

        <el-dialog title="添加书籍" :visible.sync="addVisible" width="30%">
            <el-form ref="book" :model="book" label-width="100px">
                <el-form-item label="书籍名称">
                    <el-input v-model="book.bookName" placeholder="请输入书籍名称"></el-input>
                </el-form-item>
                <el-form-item label="书籍作者">
                    <el-input v-model="book.author" placeholder="请输入书籍作者"></el-input>
                </el-form-item>
                <el-form-item label="书籍描述">
                    <el-input v-model="book.description" placeholder="请输入书籍描述"></el-input>
                </el-form-item>
                <el-form-item label="借阅状态">
                    <el-select v-model="book.borrowStatus" placeholder="请输入借阅状态">
                        <el-option v-for="item in borrowStatus"
                                   :key="item.id"
                                   :value="item.id"
                                   :label="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addBook">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="修改书籍" :visible.sync="editVisible" width="30%">
            <el-form ref="book" :model="book" label-width="100px">
                <el-form-item label="书籍名称">
                    <el-input v-model="book.bookName" placeholder="请输入书籍名称"></el-input>
                </el-form-item>
                <el-form-item label="书籍作者">
                    <el-input v-model="book.author" placeholder="请输入书籍作者"></el-input>
                </el-form-item>
                <el-form-item label="书籍描述">
                    <el-input v-model="book.description" placeholder="请输入书籍描述"></el-input>
                </el-form-item>
                <el-form-item label="借阅状态">
                    <el-select v-model="book.borrowStatus" placeholder="请输入借阅状态">
                        <el-option v-for="item in borrowStatus"
                                   :key="item.id"
                                   :value="item.id"
                                   :label="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="editBook">确 定</el-button>
            </span>
        </el-dialog>

    </div>


</template>

<script>
    import * as apis from '../../api/book'


    export default {
        name: 'NewItem',
        props: {
            tableData: {
                type: Array,
            },
            pid: {
                type: Number
            }

        },
        data() {
            return {
                addVisible: false,
                editVisible: false,
                form: {
                    regin_id: '',
                    build_name: ''
                },
                book: new apis.Book(),
                borrowStatus: [
                    {id: 1, name: "可借阅"},
                    {id: 2, name: "已被预订"},
                    {id: 3, name: "未归还"}
                ],
                buildingData: [],
            }
        },
        methods: {
            clickRow(row, event, column) {
                this.$emit("child-data", row.id)
            },
            formatStatus(status) {
                switch (status) {
                    case 1:
                        return "可借阅";
                    case 2:
                        return "已被预订";
                    case 3:
                        return "未归还";
                    default:
                        return "";
                }
            },
            addBook() {
                this.book.pid = this.pid;
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
            editBook() {
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
            seeBookContent(row) {
                this.$router.push({path: '/bookContent', query: {id: row.id}});
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
            closeDep() {
                this.$emit("closeCard");
            },
            refresh() {
                this.$emit("refreshChild");
            },
        },
        computed: {

            bookBorrowInfo() {
                var borrowable = 0;
                this.tableData.map(item => {
                    if (item.borrowStatus == 1) {
                        borrowable += 1;
                    }
                });
                return "共" + this.tableData.length + "本书籍," + borrowable + "本可借阅";
            }
        }
    }
</script>


<style>
    .text {
        font-size: 14px;
    }

    .item {
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

    .box-card-second {
        width: 600px;
    }
</style>
