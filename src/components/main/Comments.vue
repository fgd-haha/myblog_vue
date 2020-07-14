<template>
    <div>
        <!--登录按钮-->
        <div style="margin-top: 20%;">
            <el-row v-if=!logined>
                <div @click="login()">
                    <img style="margin-bottom: 1%" src="@/assets/GitHub-Mark-32px.png"/>
                    <el-button type="text" style="font-size: large; color: black;">登录</el-button>
                </div>
            </el-row>
            <el-row v-if=logined>
                <el-col :span="2">
                    <el-popover
                        placement="right"
                        trigger="click">
                        <img :src=guest.img>
                        <img :src=guest.img width="50px" slot="reference">
                    </el-popover>
                </el-col>
                <el-col :span="20" style="font-size: medium; margin-top: 1%">
                    {{guest.nick}}
                </el-col>
            </el-row>
        </div>

        <!--评论框-->
        <div style="margin-bottom: 10%;">
            <!--评论框-->
            <el-row>
                <el-col :span="12">
                    <el-input id="comment_textarea"
                              class="textarea"
                              type="textarea"
                              :autosize="{ minRows: 5, maxRows: 40}"
                              placeholder="支持markdown"
                              v-model.lazy="textarea_comment_1" @input="update_textarea()"
                              auto-complete="true"
                              @focus="display_comment_block()"
                              :disabled="!logined"
                    >
                    </el-input>
                </el-col>
                <el-col :span="11" :offset="1">
                    <vue-markdown v-highlight :source="textarea_comment_2"></vue-markdown>
                </el-col>
            </el-row>


            <!--评论按钮-->
            <div id="comment_block" style="display:none;">
                <el-row>
                    <el-col :span="2" :offset="18">
                        <el-button @click="cancle_comment()" type="text" icon="el-icon-close" round size="mini">
                            取消
                        </el-button>
                    </el-col>
                    <el-col :span="2" :offset="1">
                        <el-button :disabled="!logined" @click="add_a_comment()" type="success"
                                   icon="el-icon-check" round
                                   size="mini">发布
                        </el-button>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!--  评论列表-->
        <el-row type="flex" justify="space-between">
            <el-col style="font-size: medium; font-weight: 600">
                {{this.comments.length}}条评论/{{this.comment_guest_num}}人参与评论
            </el-col>
            <el-col :span="8">
                <el-button class="button" type="text" @click="comment_reverse(true)">按时间正序</el-button>
                <el-button class="button" type="text" @click="comment_reverse(false)">按时间倒序</el-button>
            </el-col>
        </el-row>
        <el-row v-for="comment in this.comments" style="margin-bottom: 0">
            <div style="margin: 0 6px 10px 6px;border-top:1px dotted #C0C0C0;"></div>
            <!--图片-->
            <el-col :span="2" :offset="1">
                <el-popover
                    placement="right"
                    trigger="click">
                    <img :src=comment.guest.img>
                    <img :src=comment.guest.img width="50px" slot="reference">
                </el-popover>
            </el-col>
            <!--评论-->
            <el-col :span="21">
                <!--昵称-->
                <el-row style="color:#909399;">{{comment.guest.nick}}</el-row>
                <!--评论内容-->
                <el-row style="font-size: small; margin: 0;">
                    <vue-markdown v-highlight :source="comment.content"></vue-markdown>
                </el-row>
                <!--评论时间，回复按钮-->
                <el-row style="margin-bottom: 0; color: #909399">
                    {{comment.create_time.replace(/T/, ' ').replace(/-/g, '.').substr(0, 19)}} ·
                    <el-popover placement="right" trigger="click" width="1000">
                        <el-button type="text" icon="el-icon-edit"
                                   style="color:#909399"
                                   slot="reference"
                                   :disabled="!logined">回复
                        </el-button>

                        <div id="reply_block">
                            <el-row style="margin-bottom: 0">
                                <el-col :span="12">
                                    <el-input type="textarea"
                                              :autosize="{ minRows: 5, maxRows: 40}"
                                              placeholder="支持markdown"
                                              v-model.lazy="textarea_reply_1" @input="update_textarea()"
                                              auto-complete="true"
                                              autofocus="true"
                                              style="background-color: #f7f7f7"
                                    >
                                    </el-input>
                                </el-col>
                                <el-col :span="11" :offset="1">
                                    <vue-markdown v-highlight :source="textarea_reply_2"></vue-markdown>
                                </el-col>
                            </el-row>
                            <el-row style="margin-bottom: 0; margin-top: 0">
                                <el-col :span="2" :offset="18">
                                    <el-button @click="quxiao()" @click.native.prevent="$refs.page.click()" type="text"
                                               icon="el-icon-close" round size="mini">取消
                                    </el-button>
                                </el-col>
                                <el-col :span="2" :offset="1">
                                    <el-button @click="queding(aid=aid,cid=comment.id, tid=comment.guest.uid)"
                                               @click.native.prevent="$refs.page.click()" type="success"
                                               icon="el-icon-check" round size="mini">发布
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-popover>
                </el-row>
                <!--回复-->
                <el-row v-for="reply in comment.comment_reply" style="margin-bottom: 0">
                    <!--线-->
                    <div style="margin: 0 6px 10px 6px;border-top:1px dotted #C0C0C0;"></div>
                    <!--头像-->
                    <el-col :span="2">
                        <el-popover
                            placement="right"
                            trigger="click">
                            <img :src=reply.guest.img>
                            <img :src=reply.guest.img width="50px" slot="reference">
                        </el-popover>
                    </el-col>

                    <el-col :span="22">
                        <!--昵称-->
                        <el-row>
                            <span style="color: #909399">{{reply.guest.nick}}</span>
                            <icon name="review" :scale="2"></icon>
                            <span style="color: #909399">{{reply.to.nick}}</span>
                        </el-row>
                        <!--回复内容-->
                        <el-row style="font-size: small; margin: 0">
                            <vue-markdown v-highlight :source="reply.content"></vue-markdown>
                        </el-row>
                        <!--回复时间,按钮-->
                        <el-row style="margin-bottom: 0; color: #909399;">
                            {{reply.create_time.replace('T', ' ').replace(/-/g, '.').substr(0, 19)}} ·
                            <el-popover placement="right" trigger="click" width="1000">
                                <el-button type="text" icon="el-icon-edit"
                                           style="color:#909399"
                                           slot="reference"
                                           :disabled="!logined">回复
                                </el-button>

                                <div>
                                    <el-row style="margin-bottom: 0">
                                        <el-col :span="12">
                                            <el-input type="textarea"
                                                      :autosize="{ minRows: 5, maxRows: 40}"
                                                      placeholder="支持markdown"
                                                      v-model.lazy="textarea_reply_1" @input="update_textarea()"
                                                      auto-complete="true"
                                                      autofocus="true"
                                            >
                                            </el-input>
                                        </el-col>
                                        <el-col :span="11" :offset="1">
                                            <vue-markdown v-highlight :source="textarea_reply_2"></vue-markdown>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-top: 0; margin-bottom: 0">
                                        <el-col :span="2" :offset="18">
                                            <el-button @click.native.prevent="$refs.page.click()" @click="quxiao()"
                                                       type="text"
                                                       icon="el-icon-close" round size="mini">取消
                                            </el-button>
                                        </el-col>
                                        <el-col :span="2" :offset="1">
                                            <el-button @click="queding(aid=aid,cid=comment.id, tid=reply.to.uid)"
                                                       @click.native.prevent="$refs.page.click()" type="success"
                                                       icon="el-icon-check" round size="mini">发布
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-popover>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios'
    import _ from 'lodash'
    import Comments from '@/components/main/Comments'

    export default {
        name: 'comments',
        data() {
            return {
                comments: [],
                baseurl: this.GLOBAL.domain,
                detail_url: '',
                aid: this.$route.path.substr(8),
                textarea_comment_1: '',
                textarea_comment_2: '',
                textarea_reply_1: '',
                textarea_reply_2: '',
                guest: {
                    islogin: false,
                    img: "",
                    nick: "",
                    token: "",
                    uid: 1
                },
                cid: 0,
                tid: 0,
                reply: -1,
                isShow: false,
                dialogFormVisible: false,
                state: '',
                login_url: '',
                logined: false,
                comment_guests: new Set(),
                comment_guest_num: 0,
                comment_order: true,
            }
        },

        methods: {
            update_textarea: _.debounce(function () {
                this.textarea_comment_2 = this.textarea_comment_1;
                this.textarea_reply_2 = this.textarea_reply_1;

            }, 300),

            display_comment_block: function () {
                document.getElementById("comment_block").style.display = "";
            },

            cancle_comment: function () {
                document.getElementById("comment_block").style.display = "none";
                this.textarea_comment_1 = '';
                this.textarea_comment_2 = '';
            },

            quxiao: function () {
                this.dialogFormVisible = false;
                this.isShow = !this.isShow;
                this.textarea_reply_1 = '';
                this.textarea_reply_2 = '';

                $refs.page.click();
            },

            queding: function (aid, cid, tid) {
                this.dialogFormVisible = false;
                this.comment_reply_data = {
                    "content": this.textarea_reply_1,
                    "cid": cid,
                    "aid": aid,
                    "tid": tid,
                    "reply": 1,
                    "token": this.guest.token,
                };
                axios.post(this.baseurl + 'api/comment/add/', {
                        params: this.comment_reply_data
                    }
                )
                    .then((response) => {
                        this.guest = response.data.user;
                        this.isShow = !this.isShow;
                        this.textarea_reply_1 = '';
                        this.textarea_reply_2 = '';

                        this.get_guests();
                        location.reload();
                    })
                    .catch(error => {
                        console.log(error);
                        alert('评论失败');
                    });
            },

            add_a_comment() {
                this.comment_data = {
                    "content": this.textarea_comment_1,
                    "cid": -1,
                    "aid": this.aid,
                    "tid": -1,
                    "reply": -1,
                    "token": this.guest.token,
                };
                axios.post(this.baseurl + 'api/comment/add/', {
                    params: this.comment_data
                })
                    .then((response) => {
                        if (response.data.hasOwnProperty("url")) {
                            window.location.href = response.data.url;
                        } else if (response.data.hasOwnProperty("user")) {
                            this.guest = response.data.user;
                            var comment = {
                                "id": 1,
                                "comment_reply": [],
                                "guest": {
                                    "uid": this.guest.uid,
                                    "nick": this.guest.nick,
                                    "img": this.guest.img
                                },
                                "create_time": "刚刚",
                                "content": this.textarea_comment_1
                            };
                            if (this.comment_order === true) {
                                this.comments.push(comment);
                            } else {
                                this.comments.unshift(comment);
                            }
                            this.textarea_comment_1 = '';
                            this.textarea_comment_2 = '';
                            document.getElementById("comment_block").style.display = "none";
                            this.get_guests();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        alert('评论出错');
                    });
            },

            get_guests: function () {
                var comments = this.comments;

                for (var i = 0; i < comments.length; i++) {
                    this.comment_guests.add(comments[i].guest.uid);
                    for (var j = 0; j < comments[i].comment_reply.length; j++) {
                        this.comment_guests.add(comments[i].comment_reply[j].guest.uid);
                    }
                }
                this.comment_guest_num = this.comment_guests.size;
            },

            comment_reverse: function (reverse) {
                if (reverse !== this.comment_order) {
                    this.comment_order = !this.comment_order;
                    this.comments.reverse();
                }
            },


            login: function () {
                axios.get(this.baseurl + 'api/oauth/login/?state=' + this.aid)
                    .then(response => {
                        console.log(response.data);
                        this.login_url = response.data.url;
                        window.location.href = this.login_url;
                    }).catch(error => {
                    console.log(error);
                    alert('获取login_url失败');
                });
            },
        },

        created() {
            this.guest.token = this.$cookie.get('token');
            console.log(this.$cookie.get('token'));
            console.log(this.$cookies.keys());
            console.log(this.$cookies.get('token'));
            var article_id = this.$route.path.substring(8).split('/')[0]
            axios.get(this.baseurl + 'api/comment/get/', {params: {'article_id': article_id}})
                .then(response => {
                    this.comments = (response.data);
                })
                .catch(error => {
                    console.log('获取评论失败');
                });
            this.get_guests();

            axios.get(this.baseurl + 'api/oauth/guest/?token=' + this.guest.token)
                .then(response => {
                    if (response.status === 200) {
                        this.guest = response.data;
                        this.logined = this.guest.islogin;
                    }
                }).catch(error => {
                console.log('未登录');
            });
        },


    }
</script>

<style scoped>

</style>
