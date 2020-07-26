<template>
    <div id="app">
        <el-container>
            <el-header>
                <top></top>
            </el-header>
            <el-container>
                <el-aside width="20%">
                    <Left></Left>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-aside width="20%">
                    <Right></Right>
                </el-aside>
            </el-container>

        </el-container>
    </div>
</template>


<script>
    import Left from '@/components/Left'
    import Top from '@/components/Top'
    import Right from '@/components/Right'

    export default {
        name: 'app',
        components: {
            Left,
            Right,
            Top
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 0px;
        padding: 0px;
    }
</style>

<style scoped>
    .el-header, .el-footer {
        background-color: #fff;
        color: #333;
        text-align: right;
        line-height: 60px;
    }

    .el-aside {
        background-color: #fff;
        color: #333;
        text-align: center;
    }

    .el-main {
        background-color: #fff;
        /*background-color: #2c3e50;*/
        color: #333;
        text-align: left;
        padding: 0;
        /*line-height: 50px;*/
    }
</style>
