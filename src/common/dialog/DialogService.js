// DialogService.js

export class DialogService {
    static dialogQueue = [];
    static offset = 10; // 基础间距，追加到弹窗高度

    static createDialog(message, type = 'success', position = 'top-center') {
        // 创建弹窗内容
        const dialogElement = document.createElement('div');
        dialogElement.classList.add('dialog', type); // 应用对应类型的样式
        let icon = '';
        if(type === 'warning') {
            icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4"></path></svg>';
        } else if(type === 'success') {
            icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"></path></svg>';
        } else if(type === 'error') {
            icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"></path></svg>';
        }
        dialogElement.innerHTML = `
      <span class="dialog-icon">${icon}</span> <span class="dialog-message">${message}</span>
    `;

        // 将样式和弹窗添加到 body
        document.body.appendChild(dialogElement);

        // 将弹窗添加到队列
        this.dialogQueue.push({ element: dialogElement, position });

        // 计算弹窗的位置并显示
        this.updateDialogPositions();

        // 设置延迟自动关闭弹窗，例如 3 秒后关闭
        setTimeout(() => {
            this.closeDialog(dialogElement);
        }, 3000); // 延迟 3000 毫秒（即 3 秒）

        return dialogElement; // 返回弹窗元素以便后续使用
    }

    static setPosition(dialogElement, position, topPosition) {
        dialogElement.style.left = 'auto'; // 确保在设置 right 时 left 不干扰
        dialogElement.style.right = 'auto'; // 确保在设置 left 时 right 不干扰
        dialogElement.style.transform = ''; // 清除任何变换

        switch (position) {
            case 'top-right':
                dialogElement.style.top = `${topPosition}px`;
                dialogElement.style.right = '0';
                break;
            case 'top-left':
                dialogElement.style.top = `${topPosition}px`;
                dialogElement.style.left = '0';
                break;
            case 'top-center':
                dialogElement.style.top = `${topPosition}px`;
                dialogElement.style.left = '50%';
                dialogElement.style.transform = 'translateX(-50%)'; // 居中
                break;
            default:
                // 默认位置
                dialogElement.style.top = `${topPosition}px`;
                dialogElement.style.right = '0';
                break;
        }
    }

    static updateDialogPositions() {
        let topPosition = 20; // 初始顶部位置

        this.dialogQueue.forEach(dialogItem => {
            const { element, position } = dialogItem;

            // 设置弹窗的位置
            this.setPosition(element, position, topPosition);

            // 计算下一个弹窗的位置
            topPosition += element.offsetHeight + this.offset;

            // 显示弹窗
            element.classList.add('show');
        });
    }

    static closeDialog(dialogElement) {
        // 隐藏并从 body 移除弹窗
        if (dialogElement) {
            dialogElement.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(dialogElement);

                // 从队列中移除已关闭的弹窗
                this.dialogQueue = this.dialogQueue.filter(d => d.element !== dialogElement);

                // 更新后续弹窗的位置
                this.updateDialogPositions();
            }, 300); // 等待 300 毫秒以确保弹窗完全隐藏
        }
    }

    static openDialog(message, type = 'success', position = 'top-center') {
        this.createDialog(message, type, position);
    }
}
