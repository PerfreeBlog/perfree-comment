export function displayTime(data) {
    const timePublish = new Date(data);
    const timeNow = new Date();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30; // 继续使用30天的概念简化计算
    const diffValue = timeNow - timePublish;
  
    if (diffValue < 0) {
      return "刚刚发表";
    }
  
    const diffMonth = diffValue / month;
    const diffWeek = diffValue / week;
    const diffDay = diffValue / day;
    const diffHour = diffValue / hour;
    const diffMinute = diffValue / minute;
  
    let result;
  
    if (diffMonth >= 3) {
      result = `${timePublish.getFullYear()}-${(timePublish.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${timePublish
        .getDate()
        .toString()
        .padStart(2, '0')}`;
    } else if (diffMonth >= 1) {
      result = `${Math.floor(diffMonth)}月前`;
    } else if (diffWeek >= 1) {
      result = `${Math.floor(diffWeek)}周前`;
    } else if (diffDay >= 1) {
      result = `${Math.floor(diffDay)}天前`;
    } else if (diffHour >= 1) {
      result = `${Math.floor(diffHour)}小时前`;
    } else if (diffMinute >= 1) {
      result = `${Math.floor(diffMinute)}分钟前`;
    } else {
      result = "刚刚发表";
    }
  
    return result;
  }
  