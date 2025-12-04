function chunk(array,size=1){
    if(!Array.isArray(array)||array.length==0){
        return []
    }
    size=Math.max(0,Math.floor(size))
    if(size==0){
        return []
    }
    const result=[]
    let index=0
    while(index<array.length){
        result.push(array.slice(index,index+size))
        index+=size
    }
    return result
}