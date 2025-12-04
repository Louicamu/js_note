Array.prototype.flat=function(deep=1){
    let res=[]//创建一个新数组用于存储结果
    deep--//核心逻辑:先将deep减一
    for(const p of this){//遍历当前数组的每一个元素
        if(Array.isArray(p)&&deep>=0){
            res=res.concat(p.flat(deep))//递归：对自己调用flat，传入更新后的deep，并将结果更新至res中
        }else{
            res.push(p)//不是数组，或深度已达上限，直接将元素放入结果数组中
        }
    }
    return res
}