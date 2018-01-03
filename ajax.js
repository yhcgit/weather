// 以函数式的形式封装ajax请求
// 参数: mathod , url , data , successFn , errFn
function ajaxFn(mathod,url,data,successFn,errFn){
  // 创建对象
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  // 把请求方法转为大写后再判断
  mathod = mathod.toUpperCase();
  // 配置请求对象,发送请求
  if (mathod == 'GET') {
    xhr.open('GET',url+'?'+data,true);
    xhr.send(null);
  }else if(mathod == 'POST'){
    xhr.open('POST',url,true);
    xhr.send(data);
  }else {
    console.error('请求方法有误,请检查后再调用');
  }

  // 监听服务器状态
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200) {
        // 根据responseXML属性是否为空,判断返回值类型是json还是xml
        var result = xhr.responseXML ? xhr.responseXML : xhr.responseText;
        successFn(result);
    }else if(xhr.status == 404){
      errorFn('页面找不到');
    }else if(xhr.status == 500){
      errorFn('服务器内部错误');
    }
  }
}
