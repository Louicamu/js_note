function flatten(arr){
    return arr.reduce((acc,cur)=>{
        return Array.isArray(cur)?acc.concat(flatten(cur)):acc.concat(cur)
    },[])
}