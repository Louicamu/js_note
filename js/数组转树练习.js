function listToTree(arrayList,id,list){
    for(let item of arrayList){
        if(item.pid==id){
            list.push(item)
        }
    }
    for(const i of list){
        i.children=[]
        listToTree(arrayList,i.id,i.children)
        
    }
}