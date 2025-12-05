Array.prototype.myflat=function(deep=1){
    let res=[]
    deep--
    for(const p of this){
        if(Array.isArray(p)&&deep>=0){
            res=res.concat(p.flat(deep))
        }else{
            res.push(p)
        }
    }
    return res
}