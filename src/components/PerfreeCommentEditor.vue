<template>
  <div class="comment-editor-box">
    <div class='comment-info-box' v-if="!userId">
      <div class='comment-input-box'>
        <label>名字<span class='required'> *</span></label>
        <input type='text' placeholder='姓名或昵称(必填)' class='comment-name-input' v-model="comment.userName" required>
      </div>
      <div class='comment-input-box'>
        <label>邮箱<span class='required'> *</span></label>
        <input type='email' placeholder='接收回复和获取头像(必填,将保密)' class='comment-email-input' v-model="comment.email" required>
      </div>
      <div class='comment-input-box'>
        <label>网站</label>
        <input type='text' placeholder='个人网站(选填)' class='comment-website-input' v-model="comment.website">
      </div>
    </div>
    <label>评论<span class='required'> *</span></label>
    <textarea placeholder='评论内容' class='comment-editor' ref="editor" v-model="comment.content" required></textarea>

    <div class='comment-submit-box'>
      <div style="position: relative">
        <a href='javascript:;' class='comment-emjoi-btn' @click.stop="showEmojiPanel = !showEmojiPanel">
          <svg t="1726277716465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24517" width="20" height="20"><path d="M754.4 185.6c0.4 0 0.8-0.3 0.8-0.8v-76c0-10.2 4.1-20 11.3-27.1s16.9-11.3 27.1-11.3 20 4.1 27.1 11.3c7.2 7.2 11.3 16.9 11.3 27.1v76c0 0.4 0.3 0.8 0.8 0.8h76c10.2 0 20 4.1 27.1 11.3 7.2 7.2 11.3 16.9 11.3 27.1s-4.1 20-11.3 27.1c-7.2 7.2-16.9 11.3-27.1 11.3h-76c-0.4 0-0.8 0.3-0.8 0.8v76c0 10.2-4.1 20-11.3 27.1-7.2 7.2-16.9 11.3-27.1 11.3s-20-4.1-27.1-11.3-11.3-16.9-11.3-27.1v-76c0-0.4-0.3-0.8-0.8-0.8h-76c-10.2 0-20-4.1-27.1-11.3-7.2-7.1-11.3-16.9-11.3-27.1s4.1-20 11.3-27.1c7.2-7.2 16.9-11.3 27.1-11.3h76zM819.2 544c0-35.4-5.5-69.4-15.7-101.4-0.2-0.5 0.2-1 0.7-1h78.3c0.4 0 0.7 0.2 0.8 0.6 13.8 54 16.9 112.4 6.8 172.6-28.3 169.3-160.8 302.9-329.9 332.4C276.4 996.6 34 754.2 83.3 470.4c29.4-169.1 163-301.7 332.3-330.1 60.3-10.1 118.6-7 172.7 6.8 0.3 0.1 0.6 0.4 0.6 0.8v78.3c0 0.5-0.5 0.9-1 0.7-32-10.2-66-15.7-101.4-15.7-194.7 0-350.4 167.2-331.2 365.9 15.2 157.5 140.6 283 298.1 298.1C652 894.4 819.2 738.7 819.2 544zM281.9 434.3c3.4-36.7 32.5-65.8 69.2-69.2 47.6-4.4 88.2 36.1 83.7 83.7-3.4 36.7-32.5 65.8-69.2 69.2-47.6 4.5-88.1-36-83.7-83.7z m325.2-69.2c-36.7 3.4-65.8 32.5-69.2 69.2-4.4 47.6 36.1 88.2 83.7 83.7 36.7-3.4 65.8-32.5 69.2-69.2 4.5-47.6-36-88.1-83.7-83.7zM486.4 800c54.3 0 106.5-21.5 144.9-59.9C669.5 701.9 691 650 691.2 596c0-0.4-0.3-0.8-0.8-0.8h-408c-0.4 0-0.8 0.4-0.8 0.8 0.2 54 21.7 105.9 59.9 144.1 38.4 38.4 90.6 59.9 144.9 59.9z" fill="#555555" p-id="24518"></path></svg>表情
        </a>
        <emoji-picker class="emoji-picker" locale="zh_CN" @emoji-click="onEmojiClick" ref="emojiPicker" v-if="showEmojiPanel"></emoji-picker>
      </div>
      <button class='comment-cancel-btn' @click="closeReply" v-if="pid && pid !== -1">🗙 取消回复</button>
      <button class='comment-submit-btn' @click="submitComment" type="submit">
        <svg v-if="submitLoading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="20" height="20" style="shape-rendering: auto; display: inline-block; background: rgba(255, 255, 255, 0);"><g><g transform="rotate(0 50 50)"><rect fill="#ffffff" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.9166666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"/></rect></g><g transform="rotate(30 50 50)"><rect fill="#ffffff" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.8333333333333334s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"/></rect></g><g transform="rotate(60 50 50)"><rect fill="#ffffff" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.75s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"/></rect></g><g transform="rotate(90 50 50)"><rect fill="#ffffff" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.6666666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"/></rect></g><g transform="rotate(120 50 50)"><rect fill="#ffffff" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.5833333333333334s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"/></rect></g><g transform="rotate(150 50 50)"><rect fill="#ffffff" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.5s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"/></rect></g><g transform="rotate(180 50 50)"><rect fill="#ffffff" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.4166666666666667s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"/></rect></g><g transform="rotate(210 50 50)"><rect fill="#ffffff" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.3333333333333333s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"/></rect></g><g transform="rotate(240 50 50)"><rect fill="#ffffff" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.25s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"/></rect></g><g transform="rotate(270 50 50)"><rect fill="#ffffff" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.16666666666666666s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"/></rect></g><g transform="rotate(300 50 50)"><rect fill="#ffffff" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="-0.08333333333333333s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"/></rect></g><g transform="rotate(330 50 50)"><rect fill="#ffffff" height="12" width="6" ry="6" rx="3" y="24" x="47"><animate repeatCount="indefinite" begin="0s" dur="1s" keyTimes="0;1" values="1;0" attributeName="opacity"/></rect></g><g/></g><!-- [ldio] generated by https://loading.io --></svg>
        <span v-else>✔</span>
        发表评论</button>
    </div>
  </div>

</template>

<script setup>
import {nextTick, onMounted, onUnmounted, ref} from "vue";
import 'emoji-picker-element';
import {submitCommentApi} from "../common/commentApi.js";
import {DialogService} from "../common/dialog/DialogService.js";

const props = defineProps(['articleId', 'pid', 'topPid', 'userId'])
const emit = defineEmits(['closeReply', 'commentSubmit'])
let showEmojiPanel = ref(false);
const editor = ref();
const emojiPicker = ref();
let comment = ref({
  content: "",
  articleId: props.articleId,
  pid: props.pid,
  topPid: props.topPid,
  website: '',
  email: '',
  userName: ''
})
let canCommentSubmit = ref(true);
let submitLoading = ref(false);

function closeReply() {
  emit('closeReply', props.pid, props.topPid)
}

/**
 * 点击表情事件
 * @param emoji
 */
function onEmojiClick(emoji) {
  const start = editor.value.selectionStart;
  const end = editor.value.selectionEnd;
  comment.value.content = comment.value.content.slice(0, start) +  emoji.detail.emoji.unicode + comment.value.content.slice(end);
  editor.value.focus();
  nextTick(() => {
    editor.value.focus();
    // 设置光标位置到 emoji 后面
    const newPosition = start + emoji.detail.emoji.unicode.length;
    editor.value.setSelectionRange(newPosition, newPosition);
  });
}

/**
 * 关闭表情面板
 * @param event
 */
function handleCloseEmojiPicker(event) {
  const path = event.composedPath();
  if (emojiPicker.value && !path.includes(emojiPicker.value)) {
    showEmojiPanel.value = false;
  }
}

/**
 * 提交评论
 */
function submitComment() {
  if (!canCommentSubmit.value) {
    return;
  }

  if (!props.userId && !comment.value.userName) {
    DialogService.openDialog('请填写姓名或昵称!', 'error')
    return;
  }
  if (!props.userId && !comment.value.email) {
    DialogService.openDialog('请填写邮箱!', 'error')
    return;
  }
  if (!props.userId && !validateEmail(comment.value.email)) {
    DialogService.openDialog('请填写正确的邮箱!', 'error')
    return;
  }
  if(comment.value.website && !validateURL(comment.value.website)) {
    DialogService.openDialog('请填写正确的网址!', 'error')
    return;
  }
  if (!comment.value.content) {
    DialogService.openDialog('请填写评论内容!', 'error')
    return;
  }
  canCommentSubmit.value = false;
  submitLoading.value = true;
  submitCommentApi(comment.value).then(res => {
    if (res.code === 200) {
      DialogService.openDialog('评论发表成功', 'success');
      comment.value = {
        content: "",
        articleId: props.articleId,
        pid: props.pid,
        topPid: props.topPid,
        website: '',
        email: '',
        userName: ''
      }
      emit('commentSubmit', props.pid, props.topPid)
    }else {
      DialogService.openDialog(res.msg, 'error')
    }
    canCommentSubmit.value = true;
    submitLoading.value = false;
  }).catch(e => {
    canCommentSubmit.value = true;
    submitLoading.value = false;
  })
}

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function validateURL(url) {
  const urlPattern = /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d+)?(\/\S*)?$/;
  return urlPattern.test(url);
}

onMounted(() => {
  document.addEventListener('mousedown', handleCloseEmojiPicker);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleCloseEmojiPicker);
});

</script>

<style>
.comment-editor-box {
  width: 100%;
}

.comment-editor-box label, .comment-info-box .comment-input-box label {
  display: block;
  font-size: 12px;
  margin-bottom: 4px;
}

.comment-editor-box label .required, .comment-info-box .comment-input-box label .required {
  color: var(--color-danger);
}

.comment-editor {
  border: 1px solid var(--color-border);
  width: 100%;
  height: 120px;
  color: var(--color-font);
  padding: 6px 12px;
  -webkit-transition: all .25s ease-in-out 0s;
  transition: all .25s ease-in-out 0s;
  outline: none;
  resize: vertical;
  border-radius: 3px;
  box-sizing: border-box;
  overflow-y: auto;
  font-size: 13px;
  font-family: var(--font-family);
}

.comment-editor-box .comment-editor:focus {
  border-color: var(--color-border-focus);
}

.comment-editor-box .comment-editor .emjoi {
  width: 22px;
  margin-left: 3px;
  margin-right: 3px;
}

.comment-editor-footer {
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.comment-submit-box .comment-emjoi-btn {
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  border-radius: 3px;
  text-decoration: none;
  color: var(--color-font);
  margin-right: 10px;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}
.comment-loginUser {
  flex: 1;
}
.comment-submit-box .comment-emjoi-btn svg, .comment-submit-box .comment-submit-btn svg{
  vertical-align: middle;
}

.comment-emjoi-panel {
  width: 100%;
  list-style: none;
  padding: 0;
  max-height: 148px;
  overflow-y: auto;
  margin: 10px 0 0;
  display: none;
}

.comment-emjoi-panel-show {
  display: block;
}

.comment-emjoi-panel li {
  width: 38px;
  cursor: pointer;
  margin-bottom: 5px;
  display: inline-block;
}

.comment-emjoi-panel li img {
  width: calc(100% - 12px);
  padding-left: 6px;
  padding-right: 6px;
}

.comment-info-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.comment-info-box .comment-input-box {
  width: 100%;
}

.comment-info-box .comment-input-box:not(:first-child) {
  margin-left: 10px;
}

.comment-info-box .comment-input-box input {
  font-size: 13px;
  width: 100%;
  padding: 7px 10px;
  border: 1px solid var(--color-border);
  color: inherit;
  outline: none;
  border-radius: 3px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-transition: all .25s ease-in-out 0s;
  transition: all .25s ease-in-out 0s;
}
.comment-info-box .comment-input-box input:focus{
  border-color: var(--color-border-focus);
}

.comment-submit-box {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  vertical-align: middle;
  align-items: center;
}
.comment-submit-box .emoji-picker{
  position: absolute;
  top: 33px;
  border-radius: 3px;
  right: 0;
  z-index: 99999;
}

.comment-submit-box .comment-submit-btn {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 0 8px;
  height: 30px;
  cursor: pointer;
  border-radius: 3px;
}

.comment-submit-box .comment-cancel-btn {
  background: var(--color-bg-white);
  padding: 0 8px;
  height: 30px;
  cursor: pointer;
  border-radius: 3px;
  margin-right: 10px;
  border: 1px solid var(--color-border);
}
</style>
