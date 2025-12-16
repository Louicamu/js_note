function treeToList(items){
    const res=[]
    const map={}
    for(const item of items){
        map[item.id]={...item,children:[]}
    }
    for(const item of items){
        let id=item.id
        let pid=item.pid
        let treeItem=map[id]
        if(pid==0){
            res.push(treeItem)
        }else{
            if(map[pid]){
                map[pid].children.push(treeItem)
            }
        }
    }
    return res
}