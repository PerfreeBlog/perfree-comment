<template>

 <div>
    <div class="perfree-comment">
      <perfree-comment-editor :article-id="articleId" :user-id="user?.id" :pid="-1" :top-pid="-1" @comment-submit="commentSubmitSuccess"></perfree-comment-editor>
      <div class='comment-list-box' v-if="showCommentList === 'true'">

        <div class='comment-list'>
          <div v-if="commentListLoading" class="comment-list-loading">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="20" height="20" style="shape-rendering:auto;display:block;background:rgba(255,255,255,0)" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g transform="rotate(0 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.9166666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(30 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.8333333333333334s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(60 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.75s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(90 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.6666666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(120 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.5833333333333334s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(150 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.5s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(180 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.4166666666666667s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(210 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.3333333333333333s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(240 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.25s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(270 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.16666666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(300 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.08333333333333333s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(330 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="0s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g></g></g></svg> 正在加载...
          </div>
          <div class='comment-not-list' v-if="commentList.length <= 0 && !commentListLoading">暂无评论</div>
          <div class='comment-detail-container' v-for="item in commentList" v-if="!commentListLoading">
              <div class='comment-detail-box'>
                <div class='comment-detail-avatar-box'>
                  <img :src='item.userInfo ? item.userInfo.avatar : item.avatar' width='35px' height="35px" v-if="item.avatar || (item.userInfo &&  item.userInfo.avatar)">
                  <span v-else>{{item.userInfo ? item.userInfo.userName[0] : item.userName[0]}}</span>
                </div>
                <div class='comment-detail-msg-box'>
                  <div class='comment-detail-info'>
                      <span class='comment-detail-name'>{{ item.userInfo ? item.userInfo.userName : item.userName }}</span>
                      <span class='comment-detail-time'>{{ displayTime(item.createTime) }}</span>
                      <span class='comment-detail-reply-btn' @click="replyClick(item)">回复</span>
                  </div>
                  <div class='comment-detail-content'>{{ item.content }}</div>
                  <perfree-comment-editor v-if="item.showReply" @close-reply="closeReply" @comment-submit="commentSubmitSuccess" :user-id="user?.id" :pid="item.id" :top-pid="item.id" :article-id="item.articleId"></perfree-comment-editor>
                </div>
              </div>

              <!--子评论-->
              <div class='comment-detail-container comment-child-detail-box' v-for="childItem in item.children" v-if="item.children">
                    <div class='comment-detail-box'>
                      <div class='comment-detail-avatar-box'>
                        <img :src='childItem.userInfo ? childItem.userInfo.avatar : childItem.avatar' width='35px'  height="35px"  v-if="childItem.avatar || (childItem.userInfo &&  childItem.userInfo.avatar)">
                        <span v-else>{{childItem.userInfo ? childItem.userInfo.userName[0] : childItem.userName[0]}}</span>
                      </div>
                      <div class='comment-detail-msg-box'>
                        <div class='comment-detail-info'>
                            <span class='comment-detail-name'>{{ childItem.userInfo ? childItem.userInfo.userName : childItem.userName }}</span>
                            <span class='comment-detail-time'>{{ displayTime(childItem.createTime) }}</span>
                            <span class='comment-detail-reply-btn' @click="replyClick(childItem)">回复</span>
                        </div>
                        <div class='comment-detail-content'><span class='comment-mention'>@{{item.userInfo?item.userInfo.userName: item.userName}} </span> {{ childItem.content }}</div>
                      </div>
                    </div>

                    <perfree-comment-editor v-if="childItem.showReply" @close-reply="closeReply" @comment-submit="commentSubmitSuccess" :user-id="user?.id" :article-id="item.articleId" :pid="childItem.id" :top-pid="item.id"></perfree-comment-editor>
                  </div>
                  <div class="comment-show-more" v-if="item.childNum > (item.children? item.children.length : 0)">
                   <div  @click="loadChildComment(item)" v-if="!item.childLoading && (!item.pageNo || item.pageNo < 1)">
                     <span><svg t="1726215212639" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4239" width="10" height="10"><path d="M512 565.12a45.44 45.44 0 0 1-32.64-13.44l-448-451.84a45.44 45.44 0 0 1 64-64L512 454.4 931.84 35.2a46.08 46.08 0 0 1 64 0 45.44 45.44 0 0 1 0 64L545.28 551.68a45.44 45.44 0 0 1-33.28 13.44z" fill="#323333" p-id="4240"></path><path d="M512 1016.96a45.44 45.44 0 0 1-32.64-13.44l-448-451.84a45.44 45.44 0 0 1 64-64L512 906.24l419.2-419.2a46.08 46.08 0 0 1 64 0 45.44 45.44 0 0 1 0 64l-449.92 452.48a45.44 45.44 0 0 1-33.28 13.44z" fill="#323333" p-id="4241"></path></svg></span>
                     展开{{item.childNum}}条回复
                   </div>
                    <div class="comment-load-more"  @click="loadChildComment(item)" v-if="!item.childLoading && item.pageNo && item.pageNo >= 1 && item.pageNo < Math.ceil(item.childNum / pageSize)">
                      <span><svg t="1726215212639" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4239" width="10" height="10"><path d="M512 565.12a45.44 45.44 0 0 1-32.64-13.44l-448-451.84a45.44 45.44 0 0 1 64-64L512 454.4 931.84 35.2a46.08 46.08 0 0 1 64 0 45.44 45.44 0 0 1 0 64L545.28 551.68a45.44 45.44 0 0 1-33.28 13.44z" fill="#323333" p-id="4240"></path><path d="M512 1016.96a45.44 45.44 0 0 1-32.64-13.44l-448-451.84a45.44 45.44 0 0 1 64-64L512 906.24l419.2-419.2a46.08 46.08 0 0 1 64 0 45.44 45.44 0 0 1 0 64l-449.92 452.48a45.44 45.44 0 0 1-33.28 13.44z" fill="#323333" p-id="4241"></path></svg></span>
                      加载更多
                    </div>

                    <div v-if="item.childLoading" class="comment-list-loading">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="20" height="20" style="shape-rendering:auto;display:block;background:rgba(255,255,255,0)" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g transform="rotate(0 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.9166666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(30 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.8333333333333334s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(60 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.75s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(90 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.6666666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(120 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.5833333333333334s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(150 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.5s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(180 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.4166666666666667s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(210 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.3333333333333333s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(240 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.25s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(270 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.16666666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(300 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.08333333333333333s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g transform="rotate(330 50 50)"><rect fill="#303133" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="0s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"></animate></rect></g><g></g></g></svg> 正在加载...
                    </div>

                  </div>
            </div>
        </div>
        <ul class='comment-pagination' v-if="total > 0 && Math.ceil(total / pageSize) > 1">
          <li class="comment-pagination-pre" @click="prePage" v-if="pageNo > 1">上一页</li>
          <li class="comment-pagination-num">{{pageNo}}/ {{ Math.ceil(total / pageSize) }}</li>
          <li class="comment-pagination-next" @click="nextPage"  v-if="pageNo < Math.ceil(total / pageSize) ">下一页</li>
        </ul>
      </div>
    </div>
 </div>

</template>

<script setup>
import '../common/dialog/dialog.css'
  import {ref} from "vue";
  import {getLoginUserApi, pageByArticleIdApi, pageByTopPid} from "../common/commentApi";
  import {displayTime} from "../common/utils";
  import PerfreeCommentEditor from '../components/PerfreeCommentEditor.vue'

  const props = defineProps(['articleId', 'showCommentList'])
  let commentList = ref([]);
  let pageNo = ref(1);
  let pageSize = ref(10);
  let total = ref(0);
  let user = ref({});
  let commentListLoading = ref(false);


  /**
   * 回复按钮点击事件
   */
  function replyClick(data) {
    data.showReply = true;
  }

  /**
   * 查询评论列表
   */
  function queryCommentList() {
    commentListLoading.value = true;
    pageByArticleIdApi({ articleId: props.articleId,pageNo: pageNo.value, pageSize: pageSize.value}).then(res => {
      commentListLoading.value = false;
      commentList.value = res.data.list;
      total.value = res.data.total;
    })
  }

  /**
   * 加载子级评论
   */
  function loadChildComment(d){
    if (!d.pageNo) {
      d.pageNo = 0;
    }
    d.pageNo += 1;
    queryChildComment(d);
  }

  function queryChildComment(d){
    d.childLoading = true;
    pageByTopPid({ topPid: d.id, pageNo: d.pageNo, pageSize: pageSize.value}).then(res => {
      if (!d.children) {
        d.children = [];
      }
      if (d.pageNo === 1) {
        d.children = res.data.list;
      } else{
        d.children.push(...res.data.list);
      }
      d.childNum = res.data.total;
      d.childLoading = false;
    })
  }

  /**
   * 下一页
   */
  function nextPage() {
    pageNo.value += 1;
    queryCommentList();
  }

  /**
   * 上一页
   */
  function prePage() {
    pageNo.value -= 1;
    queryCommentList();
  }

  /**
   * 关闭回复
   * @param pid
   * @param topPid
   */
  function closeReply(pid, topPid) {
    const result = commentList.value.find(item => item.id === topPid);
    if(pid === topPid) {
      result.showReply = false;
    } else {
      const childrenResult = result.children.find(item => item.id === pid);
      childrenResult.showReply = false;
    }
  }

  function commentSubmitSuccess(pid, topPid) {
    if (topPid === -1) {
      pageNo.value = 1;
      queryCommentList();
      return;
    }
    const result = commentList.value.find(item => item.id === topPid);
    result.pageNo = 1;
    queryChildComment(result);
    closeReply(pid, topPid);
  }

  /**
   * 获取登录用户
   */
  function getLoginUser() {
    getLoginUserApi().then(res => {
      user.value = res.data
    })
  }

  getLoginUser();
  queryCommentList();
  </script>

<style>
.perfree-comment{
  --color-primary: #646CFF;
  --color-danger: #F56C6C;
  --color-border: #efefef;
  --color-bg-white: #ffffff;
  --color-bg-content: #f5f7fa;
  --color-border-focus: #b5b5b5;
  --color-font: #303133;
  --color-font-regular: #606266;

  --font-size: 14px;
  --font-family: "Microsoft YaHei","微软雅黑","PingFang SC","Hiragino Sans GB";


}
.perfree-comment{
  color: var(--color-font);
  font-size: var(--font-size);
  font-family: var( --font-family);
}
.comment-detail-box{
  display: flex;
  margin-top: 16px;
  flex-wrap: wrap;
  width: 100%;
}
.comment-child-detail-box{
  padding-left: 50px;
  width: calc(100% - 50px);
}
.comment-detail-avatar-box img{
  border-radius: 50%;
}
.comment-detail-avatar-box span{
  display: inline-block;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  line-height: 35px;
  background: var(--color-bg-content);
  text-align: center;
  font-weight: 600;
  color: var(--color-font-regular);
}
.comment-detail-msg-box{
  width: calc(100% - 45px);
  padding-left: 10px;
}
.comment-detail-content{
  margin-top: 5px;
  width: calc(100% - 24px);
  padding: 8px 12px;
  border-radius: 5px;
  margin-bottom: 5px;
  word-break: break-all;
  line-height: 24px;
  background: var(--color-bg-content);
  font-size: 14px;
  opacity: .85;
}
.comment-detail-name{
  font-weight: 500;
  font-size: 14px;
}
.comment-detail-info{
  position: relative;
}
.comment-detail-time{
  font-size: 12px;
  color: var(--color-font-regular);
  margin-left: 10px;
}
.comment-detail-reply-btn{
  position: absolute;
  right: 3px;
  display: none;
  font-size: 12px;
  background: var(--color-primary);
  border-radius: 3px;
  padding: 2px 6px 2px 6px;
  color: white;
  cursor: pointer;
}
.comment-detail-box:hover .comment-detail-reply-btn {
  display: inline-block;
}
.comment-reply-box{
  flex-direction: column;
  width: 100%;
}
.comment-mention{
  font-size: 13px;
  font-weight: 600;
}
.comment-detail-content img{
  vertical-align: middle;
  padding-left: 2px;
  padding-right: 2px;
}
.comment-not-list{
  text-align: center;
  margin-top: 30px;
}
.comment-show-more{
  cursor: pointer;
  font-size: 12px;
  padding-left: 50px;
}
.comment-pagination{
  padding: 0;
  list-style: none;
  display: flex;
  margin: 10px 0 0;
  justify-content: center;
  font-size: 13px;
}
.comment-pagination-pre, .comment-pagination-num, .comment-pagination-next{
  cursor: pointer;
}
.comment-pagination-pre, .comment-pagination-num{
  margin-right: 15px;
}
.comment-pagination-pre:hover,.comment-pagination-next:hover{
  color: var(--color-primary);
}
.comment-load-more{
  padding-left: 50px;
}
.comment-list-loading{
  display: flex;
  justify-content: center;
}


</style>
