<!--vue 模板语法区,此处相当于html区域,每个template下只能有一个唯一的div与其对应-->
<template>
    <div>
    </div>
</template>
<!--js代码区,用来编写vue生命周期以及vue属性等-->
<script>
    export default {
        name: "example",
        //用于组件间通信
        props:[],
        data(){
            //此处用于定义此组件需要用到的变量等,可以通过this.调用,用于前后端数据交互
            return{
            }
        },
        //方法区,此处可以编写业务逻辑方法
        method:{

        },
        //Dom加载前执行,可以用于数据初始化等操作
       mounted:{

       },
       //VM实例创建前执行,执行时间早于mounted
        created:{

        },
        //计算属性,用于处理一些复杂的逻辑运算并返回,避免在模板内处理太复杂的逻辑
        computed:{

        },
        //监听属性,用于实时监听数据的改变
        watch:{

        }
    }
</script>

<!--
css 区域,此处的css样式只能此页面调用,全局css可写到static文件夹中
-->
<style scoped>

</style>
