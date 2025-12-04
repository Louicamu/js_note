function listToTree(rootList,id,list){
    for(const item of rootList){//寻找当前层级的子节点
        if(item.pid==id){
            list.push(item)
        }
    }
    for(const i of list){//递归处理子节点(寻找孙子节点)
        i.children=[]
        listToTree(rootList,i.id,i.children)
        if(i.children.length==0){
            delete i.children
        }
    }
    return list
}