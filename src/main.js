import { defineCustomElement } from 'vue'
import PerfreeComment from './elements/PerfreeComment.vue'; // 引入你的 Vue 组件

const PerfreeCommentElement = defineCustomElement(PerfreeComment, {
    shadowRoot: false
});
// 注册自定义元素
window.customElements.define('perfree-comment', PerfreeCommentElement);
