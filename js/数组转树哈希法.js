let arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
    { id: 6, name: '部门6', pid: 0 },
];
function arrayToList(items){
    const result=[]
    const map={}
    for(const item of items){
        map[item.id]={...item,children:[]}//使用解构复制item防止污染数据，同时添加children属性
    }
    for(const item of items){
        const id=item.id
        const pid=item.pid
        const treeItem=map[id]//取出在步骤1中处理好的节点
        if(pid==0){//如果是根节点，直接放入res中
            result.push(treeItem)
        }else{//如果不是
            if(map[pid]){//如果遇到了爸爸
                map[pid].children.push(treeItem)//将他放在爸爸的儿子里面
            }
        }
    }
    return result
}