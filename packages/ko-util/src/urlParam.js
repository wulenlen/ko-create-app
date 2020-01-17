
const urlParams = {

    getQueryString(name) { 
        let url=window.location.href;
        let index = url.indexOf('?')+1;
        let paramStr = url.substr(index);
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = paramStr.match(reg);
        if (r != null) return unescape(r[2]);
        return ''; // 返回参数值
    } 
}
export default urlParams
