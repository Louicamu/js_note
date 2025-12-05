function flatten(arr){
    return arr.reduce((nums,cur)=>{
        return Array.isArray(cur)?nums.concat(flatten(cur)):nums.concat(cur)
    })
}