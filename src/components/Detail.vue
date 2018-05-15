<template>
  <div class="detail">
    <!--<vue-markdown :source="title"></vue-markdown>-->
    <!--<vue-markdown>{{guest.nick}}</vue-markdown>-->
    <vue-markdown>
    </vue-markdown>
    <vue-markdown :source="content"></vue-markdown>

    <!--评论框-->
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="评论："
      v-model="textarea3">
    </el-input>
    <vue-markdown :source="textarea3"></vue-markdown>
    <!--评论按钮-->
    <el-row>
      <el-button @click="add_a_comment()" type="primary" icon="el-icon-edit" circle>评论</el-button>
      <!--nick: {{this.guest.uid}} {{this.$route.path}}-->
    </el-row>

    <!--登录按钮-->
    <!--<el-row>-->
    <!--&lt;!&ndash;<el-button @click="get_login_url()" type="primary" icon="el-icon-edit" circle></el-button>&ndash;&gt;-->
    <!--<el-button @click="login()" type="primary" icon="el-icon-edit" circle>登录</el-button>-->
    <!--&lt;!&ndash;guest:{{guest.nick}}&#45;&#45;{{guest.token}}&ndash;&gt;-->
    <!--&lt;!&ndash;code:{{this.code}}&ndash;&gt;-->
    <!--&lt;!&ndash;url:{{this.login_url}}&ndash;&gt;-->
    <!--&lt;!&ndash;textarea: {{textarea3}}&ndash;&gt;-->
    <!--</el-row>-->

    <h1 v-for="comment in this.comments">
      <el-row class="row-bg">
        <el-col :span="2">
          <img :class="{ full: fullWidthImage }" @click="fullWidthImage = !fullWidthImage" :src=comment.author.avatar>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">{{comment.author.nick}}:{{comment.content}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">{{comment.create_time}}</div>
        </el-col>

        <el-dialog :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="回复" :label-width="formLabelWidth">
              <el-input v-model="textarea4" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="quxiao">取 消</el-button>
            <el-button type="primary" @click="queding()">确 定</el-button>
          </div>
        </el-dialog>
        <el-col>
          <el-button type="text" @click="showToggle(comment.id, comment.author.uid, 1, comment.comment_reply)">回复
          </el-button>
        </el-col>
      </el-row>
      <el-row v-for="reply in comment.comment_reply">
        <el-col>{{reply.author.nick}}@{{reply.to.nick}}: {{reply.content}}</el-col>
        <el-col>
          <el-button type="text" @click="showToggle(comment.id, reply.to.uid, 1, comment.comment_reply)">回复</el-button>
          <!--<button @click="showToggle(comment, comment.comment_reply)">回复</button>-->
        </el-col>
      </el-row>

    </h1>


  </div>
</template>


<script>
  import axios from 'axios'
  // axios.defaults.withCredentials=true;
  // axios.defaults.xsrfCookieName = 'csrftoken';
  // axios.defaults.xsrfHeaderName = 'X-CSRFToken';


  export default {
    name: 'detail',
    // components: {
    //   VueMarkdown
    // },
    data() {
      return {
        article: {},
        detail_url: '',
        aid: this.$route.path.substr(1),
        tags: [],
        classification: '',
        title: '',
        click_nums: 0,
        create_time: '',
        content: '',
        comments: [],
        textarea3: '',
        textarea4: '',
        guest: {
          avatar: "",
          nick: "",
          token: "token",
          uid: 1
        },
        cid: 0,
        tid: 0,
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
      }
    },
    methods: {
      showToggle: function (cid, tid, reply, commentreplys) {
        this.isShow = true;
        this.dialogFormVisible = true;
        this.cid = cid;
        this.tid = tid;
        this.reply = reply;
        this.tempcommentreplys = commentreplys;
      },
      quxiao: function () {
        this.dialogFormVisible = false;
        this.isShow = !this.isShow;
        this.textarea4 = '';
      },
      queding: function () {
        this.dialogFormVisible = false;
        this.comment_reply_data = {
          "content": this.textarea4,
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
            // this.tempcomment = response.data;
            this.isShow = !this.isShow;
            this.textarea4 = '';
          })
          .catch(error => {
            console.log(error);
            alert('出错啦，不能访问');
          });
      },
      add_a_comment() {
        this.comment_data = {
          "content": this.textarea3,
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
              this.textarea3 = '';
            }
          })
          .catch(error => {
            console.log(error);
            alert('网络错误，不能访问');
          });
        // console.log(this.comment_data);

      },

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
      axios.get('http://localhost:8000/blog/articles/' + this.$route.path.substr(1))
        .then(response => {
          console.log(response);
          this.article = response.data;
          this.tags = this.article.tags;
          this.title = this.article.title;
          this.click_nums = this.article.click_nums;
          this.create_time = this.article.create_time;
          this.comments = this.article.comments;
          this.content = this.article.content;
        })
        .catch(error => {
          console.log(error);
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

  .full {
    width: 100%;
    height: auto;
  }

  img {
    width: 50px;
    border-radius: 2px;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.5);
    transition: width 1s;
  }

  img:hover {
    cursor: pointer;
  }
</style>
