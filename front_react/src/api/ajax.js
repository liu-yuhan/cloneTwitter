/* function can send ajax request,
and return object of promise*/

import axios from 'axios'

export default function ajax(url,data={},method="GET" ){
    console.log(url)
    if(method==="GET"){
    // concatenate the pairs in data={} into string 
    //output expected: ?username=xxx&password=123....
    let paramStr = ''
    Object.keys(data).forEach(key=>{
        paramStr += key + '=' + data[key] + "&"
    })
    if(paramStr){
        paramStr.substring(0,paramStr.length-1)
    }
       return axios.get(url+'?'+paramStr)
       

    }else{
        return axios.post(url, data)
    }
}
