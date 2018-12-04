<template>
    <div class="table">
        <el-form class="content" ref="book" :model="book" label-width="100px">
            <el-form-item label="书籍id">
                {{book.id}}
            </el-form-item>
            <el-form-item label="书籍名称">
                {{book.bookName}}
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import * as apis from '../../api/book'

    export default {
        data() {
            return {
                book: new apis.Book(),
            }
        },
        methods: {
            getData() {

                let params = {
                    id:this.$route.query.id,
                }
                apis.GetBookContent(params).then(res => {
                    this.book = res.data;
                })
            },
        },
        mounted() {
            this.getData();
        },
        watch: {
            '$route'(to, from) {
                // this.getData();
            }
        }

    }

</script>

<style scoped>

    .pageContent h4 {
        width: 400px;
        margin: 0 auto;
    }

    .pageContent span {
        width: 90%;
        margin: 50px auto;
    }

    .content{
        margin: 0 auto;
    }


</style>
