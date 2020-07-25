<template>
    <div>
        <Login :logined="logined" :baseurl="baseurl" :article_id="article_id" :guest="guest"></Login>

        <!--评论框-->
        <div style="margin-bottom: 10%;">
            <!--评论框-->
            <el-row>
                <el-col :span="12">
                    <el-input id="comment_textarea"
                              class="textarea"
                              type="textarea"
                              :autosize="{ minRows: 5, maxRows: 40}"
                              placeholder="github账号或微信账号登录后评论，支持markdown"
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
        <el-row v-for="(comment, c_index) in this.comments">
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
                    <el-popover placement="right" trigger="click" width="1000" v-model="comment.show">
                        <el-button type="text" icon="el-icon-edit"
                                   style="color:#909399"
                                   slot="reference"
                                   :disabled="!logined"
                                   @click="comment.show=true">回复
                        </el-button>

                        <div id="reply_block">
                            <el-row style="margin-bottom: 0">
                                <el-col :span="12">
                                    <el-input type="textarea"
                                              :autosize="{ minRows: 5, maxRows: 40}"
                                              placeholder="github账号或微信账号登录后评论，支持markdown"
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
                                    <el-button @click="quxiao(c_index, null)" type="text"
                                               icon="el-icon-close" round size="mini">取消
                                    </el-button>
                                </el-col>
                                <el-col :span="2" :offset="1">
                                    <el-button
                                        @click="queding(aid=aid,cid=comment.id, tid=comment.guest.uid, c_index, null)"
                                        type="success"
                                        icon="el-icon-check" round size="mini">发布
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </el-popover>
                </el-row>
                <!--回复-->
                <el-row v-for="(reply, r_index) in comment.comment_reply" style="margin-bottom: 0">
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
                            <el-popover placement="right" trigger="click" width="1000" v-model="reply.show">
                                <el-button type="text" icon="el-icon-edit"
                                           style="color:#909399"
                                           slot="reference"
                                           :disabled="!logined"
                                           @click="reply.show=true">回复
                                </el-button>

                                <div>
                                    <el-row style="margin-bottom: 0">
                                        <el-col :span="12">
                                            <el-input type="textarea"
                                                      :autosize="{ minRows: 5, maxRows: 40}"
                                                      placeholder="github账号或微信账号登录后评论，支持markdown"
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
                                            <el-button @click="quxiao(c_index, r_index)"
                                                       type="text"
                                                       icon="el-icon-close"
                                                       round size="mini">取消
                                            </el-button>
                                        </el-col>
                                        <el-col :span="2" :offset="1">
                                            <el-button
                                                @click="queding(aid=aid,cid=comment.id, tid=reply.to.uid, c_index, r_index)"
                                                type="success"
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
    import Login from '@/components/util/Login'

    export default {
        name: 'comments',

        props: ['article_id'],

        components: {
            Login
        },

        data() {
            return {
                comments: [],
                baseurl: this.GLOBAL.domain,
                detail_url: '',
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
                reply: -1,
                dialogFormVisible: false,
                state: '',
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

            clear_input: function () {
                this.textarea_reply_1 = '';
                this.textarea_reply_2 = '';
                this.textarea_comment_1 = '';
                this.textarea_comment_2 = '';
            },

            display_comment_block: function () {
                document.getElementById("comment_block").style.display = "";
            },

            cancle_comment: function () {
                document.getElementById("comment_block").style.display = "none";
                this.clear_input();
            },

            quxiao: function (c_index, r_index) {
                this.dialogFormVisible = false;
                this.clear_input();

                if (r_index == null) {
                    this.$set(this.comments[c_index], 'show', false);
                } else {
                    this.$set(this.comments[c_index].comment_reply[r_index], 'show', false);
                }
            },

            queding: function (aid, cid, tid, r_index, c_index) {
                this.dialogFormVisible = false;
                this.comment_reply_data = {
                    "content": this.textarea_reply_1,
                    "cid": cid,
                    "aid": aid,
                    "tid": tid,
                    "reply": 1,
                    "token": this.guest.token,
                };

                axios.post(this.baseurl + 'api/comment/add/', this.qs.stringify(this.comment_reply_data))
                    .then((response) => {
                        console.log('评论返回:' + response.data);
                        this.clear_input();
                        this.comments = response.data;
                        this.get_guests();
                    })
                    .catch(error => {
                        console.log(error);
                        alert('评论失败');
                    });
                if (r_index == null) {
                    this.$set(this.comments[c_index], 'show', false);
                } else {
                    this.$set(this.comments[c_index].comment_reply[r_index], 'show', false);
                }
            },

            add_a_comment() {
                this.comment_data = {
                    "content": this.textarea_comment_1,
                    "cid": -1,
                    "aid": this.article_id,
                    "tid": -1,
                    "reply": -1,
                    "token": this.guest.token,
                };
                axios.post(this.baseurl + 'api/comment/add/', this.qs.stringify(this.comment_data))
                    .then((response) => {
                            if (response.data.hasOwnProperty("url")) {
                                window.location.href = response.data.url;
                            } else if (response.data != null) {
                                console.log('评论返回:' + response.data);
                                this.clear_input();
                                this.comments = response.data;
                                this.get_guests();
                            }
                        }
                    )
                    .catch(error => {
                        console.log(error);
                        alert('评论失败');
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

        },

        created() {
            this.guest.token = this.$cookie.get('token');
            console.log(this.$cookie.get('token'));
            console.log(this.$cookies.keys());
            console.log(this.$cookies.get('token'));

            axios.get(this.baseurl + 'api/comment/get/', {params: {'article_id': this.article_id}})
                .then(response => {
                        var comments = response.data;

                        for (var i = 0; i < comments.length; i++) {
                            comments[i]['show'] = false;
                            for (var j = 0; j < comments[i]['comment_reply'].length; j++) {
                                comments[i]['comment_reply'][j]['show'] = false;
                            }
                        }
                        this.comments = comments;
                    }
                )
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
