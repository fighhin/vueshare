<template>
    <div class="table">

        <div class="container">
            <div class="handle-box">
                <el-input style="width:160px;margin-right: 20px;" v-model="searchObject.userName" @keyup.enter.native="getData" >
                </el-input>
                <el-button size="small" type="primary" @click="getData" slot="append" icon="el-icon-search">搜索</el-button>
                <el-button type="primary"  @click="addVisible = true">添加用户</el-button>
            </div>
            <el-table :data="tableData"
                      @selection-change="handleSelectionChange" >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="序号">
                </el-table-column>
                <el-table-column prop="userName" label="用户名">
                </el-table-column>
                <el-table-column prop="userAccount" label="账号">
                </el-table-column>
                <el-table-column label="性别">
                    <template slot-scope="scope">
                        <span v-if="scope.row.sex == 0">女</span>
                        <span v-else-if="scope.row.sex == 1">男</span>
                        <span v-else></span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button style="margin-left: 10px;" size="mini" type="danger"
                                   @click="handleEdit(scope.row)"
                                   :disabled="scope.row.id == 1">更改
                        </el-button>
                        <el-button style="margin-left: 10px;" size="mini" type="danger"
                                   @click=" handleDelete(scope.row)"
                                   :disabled="scope.row.id == 1">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="searchObject.page"
                    :page-sizes="[2, 10, 50, 100]"
                    :page-size="searchObject.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>

        <!--新增弹出框-->
        <el-dialog title="新增用户" :visible.sync="addVisible" width="30%">
            <el-form ref="user" :model="user" label-width="100px">
                <el-form-item label="用户名">
                    <el-input v-model="user.userName"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="user.userAccount"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="user.userPassword"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="user.sex">
                        <el-option v-for="item in sexArray"
                                   :key="item.id"
                                   :value="item.id"
                                   :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑弹出框-->
        <el-dialog title="编辑用户" :visible.sync="editVisible" width="30%">
            <el-form ref="user" :model="user" label-width="100px">
                <el-form-item label="用户名">
                    <el-input v-model="user.userName"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="user.userAccount"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="user.userPassword"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="user.sex">
                        <el-option v-for="item in sexArray"
                                   :key="item.id"
                                   :value="item.id"
                                   :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import * as apis from '../../api/usermng'

    export default {
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                keyword:"",
                total: 0,
                detailVisible: false,
                addVisible: false,
                cur_page: 1,
                pageSize: 100,
                multipleSelection: [],
                editVisible: false,
                delVisible: false,
                user: new apis.User(),
                sexArray: [
                    {id: 0, name: "女"},
                    {id: 1, name: "男"}
                ],
                searchObject:{
                    page:1,
                    pageSize:10,
                    userName:""
                }
            }
        },
        methods: {

            // 分页导航
            handleCurrentChange(val) {
                this.searchObject.page = val;
                this.getData();
            },
            handleSizeChange(val) {
                this.searchObject.pageSize = val;
                this.getData();
            },
            getData() {
                apis.UserList(this.searchObject).then(res => {
                    this.tableData = res.data.list;
                    // this
                    this.total = res.total;
                })
            },
            search() {
                this.getData();
            },
            handleEdit(row) {
                this.editVisible = true;
                Object.assign(this.user, row);
            },
            handleDelete(row) {
                apis.DeleteUser(row.id).then(res => {
                    if (res.code == 200){
                        this.$message.success("删除成功");
                        this.getData();
                    }else {
                        this.$message.error("删除失败");
                    }
                }).catch(e => {
                    console.log(e);
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                apis.UpdateUser(this.user).then(res => {
                    this.$message.success('修改成功');
                    this.editVisible = false;
                    this.user = new apis.User();
                    this.getData();
                }).catch(e => {
                    this.$message.error('修改失败');
                    console.log(e);
                })
            },
            saveAdd() {
                apis.AddUser(this.user).then(res => {
                    if (res.code == 200) {
                        this.$message.success('添加成功');
                        this.addVisible = false;
                        this.user = new apis.User();
                        this.getData();
                    } else {
                        this.$message.error('添加失败');
                    }
                }).catch(e => {
                    console.log(e);
                })
            },

        },
        mounted() {
            this.getData();
        },
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
        float: right;

    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .clear {
        clear: both;
    }

    .pageContent {
        width: 90%;
        margin: 0 auto;
    }

    .pageContent h4 {
        width: 400px;
        margin: 0 auto;
    }

    .pageContent span {
        width: 90%;
        margin: 50px auto;
    }

    .formContent {
        margin: 20px auto;
    }

</style>
