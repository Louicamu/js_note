function listToTree(arrayList,id,list){
    for(const item of arrayList){
        if(item.pid==id){
            list.push(item)
        }
    }
    for(const i of list){
        i.children=[]
        listToTree(arrayList,i.id,i.children)
        if(i.children.length==0){
            delete(i.children)
        }
    }
    return list
}