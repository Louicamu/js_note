function chunk(array,size=1){
    if(!Array.isArray(array)||array.length==0){
        return []
    }//边界检查:如果不是数组或者数组的长度为0就返回空数组
    size=Math.max(0,Math.floor(size))
    if(size==0){
        return []
    }
    const result=[]
    let index=0
    while(index<array.length){//循环截取
        result.push(array.slice(index,index+size))
        index+=size
    }
    return result
}// --- 测试 ---
const data = ['a', 'b', 'c', 'd', 'e'];

console.log(chunk(data, 2)); 
// 输出: [['a', 'b'], ['c', 'd'], ['e']]