import { baseUrl} from "./env"

/**
 * 包装从接口获取数据方法
 */

/*export const cityGuess = () => fetch('/v1/cities', {
  type: 'guess'
});*/

export default async(url = '',data= {},type = 'GET',method = 'fetch') =>{
  type = type.toUpperCase();
  url = baseUrl + url;
  //这里的data对象就是例如 type:'group'
  if(type == 'GET'){
    let dataStr = '';
    Object.keys(data).forEach(key =>{
      dataStr += key + '=' + data[key] + '&';
    })
    if (dataStr !== ''){
      //从起始索引号提取字符串中指定数目的字符。
      dataStr = dataStr.substr(0,dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr;
    }
    //传统 Ajax 指的是 XMLHttpRequest（XHR），未来现在已被 Fetch 替代。
    // https://segmentfault.com/a/1190000003810652
    if (window.fetch && method == 'fetch'){
      let requestConfig = {
        credentials: 'include',
        method: type,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: "cors",
        cache: "force-cache"
      }

      //Object.defineProperty() 方法直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。
      // Object.defineProperty(obj, prop, descriptor)
      //obj 需要定义属性的对象。
      /*prop 需被定义或修改的属性名。
        descriptor 需被定义或修改的属性的描述符。*/
      if(type == 'POST'){
        Object.defineProperties(requestConfig,'body',{
          value: JSON.stringify(data)
        })
      }
      try{
        //写异步代码就像写同步代码一样爽。await 后面可以跟 Promise 对象，表示等待 Promise resolve() 才会继续向下执行，如果 Promise 被 reject() 或抛出异常则会被外面的 try...catch 捕获。
        const response = await fetch(url,requestConfig);
        const responseJson = await response.json();
        return responseJson
      }catch (error){
        throw new Error(error)
      }
    }else{
      return new Promise((resolve,reject)=>{
        let requestObj;
        if (window.XMLHttpRequest) {
          requestObj = new XMLHttpRequest();
        } else {
          requestObj = new ActiveXObject;
        }

        let sendData = '';
        if (type == 'POST') {
          sendData = JSON.stringify(data);
        }
        requestObj.open(type, url, true);
        requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        requestObj.send(sendData);

        requestObj.onreadystatechange = () => {
          if (requestObj.readyState == 4) {
            if (requestObj.status == 200) {
              let obj = requestObj.response
              if (typeof obj !== 'object') {
                obj = JSON.parse(obj);
              }
              resolve(obj)
            } else {
              reject(requestObj)
            }
          }
        }
      })
    }
  }
}
