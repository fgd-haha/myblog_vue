<template>
    <div id="app" ref="scrollTarget" class="scroll" style="height: 100%; overflow: auto">
        <el-container>
            <el-header v-bind:class="{ some_top: !isphone, full_top: isphone}">
                <top></top>
            </el-header>
            <el-container>
                <el-aside v-if=!isphone width="20%">
                    <Left></Left>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                    <div style="height: 100px; width: 100%">
                        <el-backtop target=".scroll">
                            <span>up</span>
                        </el-backtop>
                    </div>
                </el-main>
                <el-aside v-if=!isphone width="calc(120% - 100vw)">
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
        },
        data() {
            return {
                isphone: this.GLOBAL.isphone(),
            }
        },

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
        background-color: #e6e6e6;
        color: #333;
        text-align: right;
        line-height: 60px;
        padding: 0;
    }

    .el-aside {
        background-color: #e6e6e6;
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

    .some_top {
        position: fixed;
        left: 20%;
        width: 60%;
        z-index: 1000;
        /*background-color: #e6e6e6;*/
    }

    .full_top {
        position: fixed;
        width: 100%;
        z-index: 1000;
        /*background-color: #e6e6e6;*/
    }
</style>
