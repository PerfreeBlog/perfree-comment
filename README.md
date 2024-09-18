## perfree-comment
PerfreeBlog新版评论组件,可在PerfreeBlog任意主题中使用
## 使用方式
使用方式分为两种,根据自己主题的开发方式进行选择
1. 下载引入, 下载releases中的发布包 [https://github.com/perfree/perfree-comment/releases](https://github.com/perfree/perfree-comment/releases),
之后在代码中引入css和js
```html
<link rel="stylesheet" href="./perfree-comment.css">
<script src="./perfree-comment.js"></script>
```
然后按照以下方式使用
```html
<perfree-comment article-id="32" show-comment-list="true"></perfree-comment>
```
2. 安装引入
```bash
npm i perfree-comment
```
这里以vue+vite为例,修改vite.config.js中plugins/vue,表明perfree-comment为自定义标签
```javascript
 plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => tag === 'perfree-comment'
          }
        }
      }),
]
```
之后在需要使用的组件中引入
```javascript
import "perfree-comment/dist/perfree-comment.css";
import "perfree-comment/dist/perfree-comment.js";
```
然后按照以下方式使用
```html
<perfree-comment article-id="32" show-comment-list="true"></perfree-comment>
```
## 参数说明
- article-id : 文章id
- show-comment-list : 是否展示评论列表
## 预览图
![截图](./imgs/img.png)
