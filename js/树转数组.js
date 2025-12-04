function treeToList(data){
    let res=[]
    function dfs(tree){
        tree.foreach((item)=>{
            if(item.children){
                dfs(item.children)
                delete(item.children)
            }   
            res.push(item)
        })
    }
    dfs(data)
    return res
}