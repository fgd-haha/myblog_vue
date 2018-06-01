<template>
  <div ref="page" class="detail" style="width: 80%; margin-left:auto; margin-right: auto;">
    <!--博客时间，阅读，评论数-->
    <el-row type="flex" justify="end" style="margin-bottom: 50px; margin-top: 50px">
      <i class="el-icon-date" style="margin-top: 2px"></i>&nbsp{{this.article.create_time}}&nbsp&nbsp
      <i class="el-icon-view" style="margin-top: 2px"></i>&nbsp{{this.article.click_nums}}&nbsp&nbsp
      <icon name="comments2" :scale="1.5" style="margin-top: 3px"></icon>
      &nbsp{{this.comments_num}}
    </el-row>

    <!--博客主体-->
    <!--<vue-markdown :source="article.content" style="font-size: small;" v-highlight></vue-markdown>-->

    <!--评论框-->
    <div style="margin-top: 20%; margin-bottom: 10%;">
      <!--评论框-->
      <el-row>
        <el-col :span="12">
          <el-input id="comment_textarea"
                    class="textarea"
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 40}"
                    placeholder="写下你的评论。。。
新手上路，多多指教（支持markdown哦）"
                    v-model.lazy="textarea_comment_1" @input="update_textarea()"
                    auto-complete="true"
                    @focus="display_comment_block()"
          >
          </el-input>
        </el-col>
        <el-col :span="11" offset="1">
          <vue-markdown v-highlight :source="textarea_comment_2"></vue-markdown>
        </el-col>
      </el-row>


      <!--评论按钮-->
      <div id="comment_block" style="display:none;">
        <el-row>
          <el-col :span="2" :offset="18">
            <el-button @click="cancle_comment()" type="text" icon="el-icon-close" round size="mini">取消</el-button>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button @click="add_a_comment()" type="success" icon="el-icon-check" round size="mini">发布</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

    <!--登录按钮-->
    <!--<el-row>-->
    <!--&lt;!&ndash;<el-button @click="get_login_url()" type="primary" icon="el-icon-edit" circle></el-button>&ndash;&gt;-->
    <!--<el-button @click="login()" type="primary" icon="el-icon-edit" circle>登录</el-button>-->
    <!--&lt;!&ndash;guest:{{guest.nick}}&#45;&#45;{{guest.token}}&ndash;&gt;-->
    <!--&lt;!&ndash;code:{{this.code}}&ndash;&gt;-->
    <!--&lt;!&ndash;url:{{this.login_url}}&ndash;&gt;-->
    <!--&lt;!&ndash;textarea: {{textarea_comment_1}}&ndash;&gt;-->
    <!--</el-row>-->

    <!--评论列表-->
    <el-row type="flex" justify="space-between">
      <el-col style="font-size: medium; font-weight: 600">
        {{this.comments_num}}条评论/{{this.comment_guest_num}}人参与评论
      </el-col>
      <el-col :span="8">
        <el-button class="button" type="text" @click="comment_reverse(true)">按时间正序</el-button>
        <el-button class="button" type="text" @click="comment_reverse(false)">按时间倒序</el-button>
      </el-col>
    </el-row>
    <el-row v-for="comment in this.article.comments" style="margin-bottom: 0">
      <div style="margin: 0 6px 10px 6px;border-top:1px dotted #C0C0C0;"></div>
      <!--图片-->
      <el-col :span="2" :offset="1">
        <el-popover
          placement="right"
          trigger="click">
          <img :src=comment.author.avatar>
          <img :src=comment.author.avatar width="50px" slot="reference">
        </el-popover>
      </el-col>
      <!--评论-->
      <el-col :span="21">
        <!--昵称-->
        <el-row style="color:#909399;">{{comment.author.nick}}</el-row>
        <!--评论内容-->
        <el-row style="font-size: small; margin: 0;">
          <vue-markdown v-highlight :source="comment.content"></vue-markdown>
        </el-row>
        <!--评论时间，回复按钮-->
        <el-row style="margin-bottom: 0; color: #909399">
          {{comment.create_time.replace(/T/, ' ').replace(/-/g, '.').substr(0, 19)}} ·
          <el-popover placement="right" trigger="click" width="1000">
            <el-button type="text" icon="el-icon-edit"
                       @click="update_reply_data(comment.id, comment.author.uid, comment.author.nick, 1, comment.comment_reply)"
                       style="color:#909399"
                       slot="reference">回复
            </el-button>

            <div id="reply_block">
              <el-row style="margin-bottom: 0">
                <el-col :span="12">
                  <el-input type="textarea"
                            :autosize="{ minRows: 5, maxRows: 40}"
                            placeholder="写下你的评论。。。
新手上路，多多指教（支持markdown哦）"
                            v-model.lazy="textarea_reply_1" @input="update_textarea()"
                            auto-complete="true"
                            autofocus="true"
                            style="background-color: #f7f7f7"
                  >
                  </el-input>
                </el-col>
                <el-col :span="11" offset="1">
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
                  <el-button @click="queding()" @click.native.prevent="$refs.page.click()" type="success"
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
              <img :src=reply.author.avatar>
              <img :src=reply.author.avatar width="50px" slot="reference">
            </el-popover>
          </el-col>

          <el-col :span="22">
            <!--昵称-->
            <el-row>
              <span style="color: #909399">{{reply.author.nick}}</span>
              <icon name="review" :scale="2"></icon>
              <span style="color: #909399">{{reply.to.nick}}</span>
            </el-row>
            <!--回复内容-->
            <el-row style="font-size: small; margin: 0">{{reply.content}}</el-row>
            <!--回复时间,按钮-->
            <el-row style="margin-bottom: 0; color: #909399;">
              {{reply.create_time.replace('T', ' ').replace(/-/g, '.').substr(0, 19)}} ·
              <el-popover placement="right" trigger="click" width="1000">
                <el-button type="text" icon="el-icon-edit"
                           @click="update_reply_data(comment.id, reply.to.uid, reply.to.nick, 1, comment.comment_reply)"
                           style="color:#909399"
                           slot="reference">回复
                </el-button>

                <div>
                  <el-row>
                    <el-col :span="12">
                      <el-input type="textarea"
                                :autosize="{ minRows: 5, maxRows: 40}"
                                placeholder="写下你的评论。。。
新手上路，多多指教（支持markdown哦）"
                                v-model.lazy="textarea_reply_1" @input="update_textarea()"
                                auto-complete="true"
                                autofocus="true"
                      >
                      </el-input>
                    </el-col>
                    <el-col :span="11" offset="1">
                      <vue-markdown v-highlight :source="textarea_reply_2"></vue-markdown>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="2" :offset="18">
                      <el-button @click.native.prevent="$refs.page.click()" @click="quxiao()" type="text"
                                 icon="el-icon-close" round size="mini">取消
                      </el-button>
                    </el-col>
                    <el-col :span="2" :offset="1">
                      <el-button @click="queding()" @click.native.prevent="$refs.page.click()" type="success"
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
  // import VueMarkdown from 'vue-markdown'
  // axios.defaults.withCredentials=true;
  // axios.defaults.xsrfCookieName = 'csrftoken';
  // axios.defaults.xsrfHeaderName = 'X-CSRFToken';


  export default {
    name: 'detail',
    data() {
      return {
        article: {},
        detail_url: '',
        aid: this.$route.path.substr(1),
        textarea_comment_1: '',
        textarea_comment_2: '',
        textarea_reply_1: '',
        textarea_reply_2: '',
        guest: {
          avatar: "https://avatars1.githubusercontent.com/u/26531508?v=4",
          nick: "",
          token: "token",
          uid: 1
        },
        cid: 0,
        tid: 0,
        tonick: '',
        reply: -1,
        isShow: false,
        tempcommentreplys: {},
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        state: '',
        client_id: '7e8988aa177550563f2e',
        login_url: '',
        code: '',
        fullWidthImage: this.avatar,
        reply_visible: true,
        comments_num: 0,
        comment_guests: new Set(),
        comment_guest_num: 0,
        comment_order: true,
      }
    },

    methods: {
      update_textarea: _.debounce(function () {
          this.textarea_comment_2 = this.textarea_comment_1;
          this.textarea_reply_2 = this.textarea_reply_1;

        }, 300
      ),
      display_comment_block: function () {
        document.getElementById("comment_block").style.display = "";
      },
      cancle_comment: function () {
        document.getElementById("comment_block").style.display = "none";
        this.textarea_comment_1 = '';
        this.textarea_comment_2 = '';
      },

      update_reply_data: function (cid, tid, tonick, reply, commentreplys) {
        // this.isShow = true;
        // this.dialogFormVisible = true;
        this.cid = cid;
        this.tid = tid;
        this.reply = reply;
        this.tempcommentreplys = commentreplys;
        this.tonick = tonick;
      },
      quxiao: function () {
        this.dialogFormVisible = false;
        this.isShow = !this.isShow;
        this.textarea_reply_1 = '';
        this.textarea_reply_2 = '';
        this.reply_visible = false;
        $refs.page.click();
      },
      queding: function () {
        this.dialogFormVisible = false;
        this.comment_reply_data = {
          "content": this.textarea_reply_1,
          "cid": this.cid,
          "aid": this.aid,
          "tid": this.tid,
          "reply": this.reply,
          "token": "c0c7342ed246893749f4549371ec727bdea6da9e",
        };
        axios.get('http://localhost:8000/blog/createreply', {
            params: this.comment_reply_data
          }
        )
          .then((response) => {
            this.guest = response.data.user;
            this.tempcommentreplys.push({
              "content": this.textarea_reply_1,
              "create_time": "刚刚",
              "to": {
                "nick": this.tonick,
              },
              "author": {
                "uid": this.guest.uid,
                "nick": this.guest.nick,
                "avatar": this.guest.avatar,
              }
            });
            this.isShow = !this.isShow;
            this.textarea_reply_1 = '';
            this.textarea_reply_2 = '';
            this.reply_visible = false;
          })
          .catch(error => {
            console.log(error);
            alert('出错啦，不能访问');
          });
      },
      add_a_comment() {
        this.comment_data = {
          "content": this.textarea_comment_1,
          "cid": -1,
          "aid": this.aid,
          "tid": -1,
          "reply": -1,
          "token": "c0c7342ed246893749f4549371ec727bdea6da9e",
        };
        axios.get('http://localhost:8000/blog/createreply', {
          params: this.comment_data
        })
          .then((response) => {
            if (response.data.hasOwnProperty("url")) {
              window.location.href = response.data.url;
            }
            else if (response.data.hasOwnProperty("user")) {
              this.guest = response.data.user;
              var comment = {
                "id": 1,
                "comment_reply": [],
                "author": {
                  "uid": this.guest.uid,
                  "nick": this.guest.nick,
                  "avatar": this.guest.avatar
                },
                "create_time": "刚刚",
                "content": this.textarea_comment_1
              };
              if (this.comment_order === true) {
                this.article.comments.push(comment);
              }
              else {
                this.article.comments.unshift(comment);
              }
              this.textarea_comment_1 = '';
              this.textarea_comment_2 = '';
              document.getElementById("comment_block").style.display = "none";
            }
          })
          .catch(error => {
            console.log(error);
            alert('评论出错');
          });
        // console.log(this.comment_data);
      },

      get_guests: function () {
        for (var comment in this.article.comments) {
          this.comment_guests.add(comment.author);
          for (let reply in comment.comment_reply) {
            this.comment_guests.add(reply.author);
          }
        }
        ;
        this.comment_guest_num = this.comment_guests.size;
      },

      comment_reverse: function (reverse) {
        if (reverse !== this.comment_order) {
          this.comment_order = !this.comment_order;
          this.article.comments.reverse();
        }
      }


      // login: function(){
      //   // this.get_login_url();
      //   axios.get('http://localhost:8000/blog/login?state=' + this.aid)
      //     .then(response => {
      //       console.log(response.data);
      //       this.login_url = response.data.url;
      //       window.location.href = this.login_url;
      //     }).catch(error => {
      //     console.log(error);
      //     alert('获取login_url失败');
      //   });
      // },
      // get_login_url: function () {
      //   axios.get('http://localhost:8000/blog/login/')
      //     .then(response => {
      //       console.log(response.data);
      //       this.login_url = response.data.url;
      //     }).catch(error => {
      //     console.log(error);
      //     alert('获取login_url失败');
      //     });
      // },
    },

    created() {
      // axios.defaults.withCredentials=true;
      // axios.defaults.xsrfCookieName = 'csrftoken';
      // axios.defaults.xsrfHeaderName = 'X-CSRFToken';
      this.$cookie.set('token', 'c0c7342ed246893749f4549371ec727bdea6da9e');
      axios.get('http://localhost:8000/blog/articles/' + this.$route.path.substring(1))
        .then(response => {

          this.article = (response.data);
          this.article.create_time = this.article.create_time.replace(/T/, ' ').replace(/-/g, '.').substr(0, 10);
          this.comments_num = this.article.comments.length;
          this.get_guests();
        })
        .catch(error => {
          alert('初始化错误');
        });
    },


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  /*img {*/
  /*width: 100%;*/
  /*border-radius: 2px;*/
  /*box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);*/
  /*transition: width 1s;*/
  /*}*/

  img:hover {
    cursor: pointer;
  }

  .button{
    color:  #969696;
  }

  .button:hover{
    color: #2f2f2f;
  }

  .button:focus{
    color: #2f2f2f;
  }

</style>
