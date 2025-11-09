## 207.课程表
```js
var canFinish=function(numCourses,prerequisities){
    const inDegree=new Array(numCourses.length).fill(0)
    const map={}
    for(let i=0;i<prerequisities.length;i++){
        inDegree[prerequisities[i][0]]++
        if(map[prerequisities[i][1]]){
            map[prerequisities[i][1]].push(prerequisities[i][0])
        }else{
            map[prerequisities[i][1]]=[prerequisities[i][0]]
        }
    }//建立先修课->后修课的映射关系
    const queue=[]
    for(let i=0;i<inDegree.length;i++){
        if(inDegree[i]==0){
            queue.push(i)//没有先修课要求的课程，可作为学习的起点
        }
    }
    let count=0
    while(queue.length){
        const selected=queue.shift()//从没有先修课要求的课表中取出来一门课
        count++
        const toEnQueue=map[selected]//获取所有以selected为先修课的后续课程
        if(toEnQueue&&toEnQueue.length){
            for(let i=0;i<toEnQueue.length;i++){
                inDegree[toEnQueue[i]]--//将它们的入度减一
                if(inDegree[toEnQueue[i]]==0){
                    queue.push(toEnQueue[i])
                }
            }
        }
    }
    return count==numCourses
}
```
# 链表题
## 21.合并两个有序链表
```
while(list1.val<list2.val){
    list1.next=mergeTwoLists(list1.next,list2)
    return list1
}
list2.next=mergeTwoLists(list1,list2.next)
retur list2
```
## 160.相交链表
![alt text](image.png)
**速记**：让p等于headA，让q等于headB，当p和q不相当时，p=p吗，等于p就是p.next，不等于就是headB
q=q吗？等于q就是q.next，不等于就是headA
```js
var getIntersectionNode=function(headA,headB){
    let p=headA,q=headB
    while(p!==q){
        p=p?p.next:headB
        q=q?q.next:headA
    }
    return p
}
```
## 206.反转链表
![alt text](image-1.png)
头插法，迭代
```js
var reverseList=function(head){
    let pre=null
    let cur=head
    while(cur){
        const nxt=cur.next
        cur.next=pre
        pre=cur
        cur=nxt
    }
    return pre
}
```
尾插法，递归
**速记**:如果head和head.next两者中有一个是null那就返回head，让revHead递归,revHead=reverseList(head.next),让tail尾巴是head的next,然后tail.next=head,head.next=null，最后返回revHead
```js
var reverseList=function(head){
    if(head==null||head.next==null){
        return head
    }
    let revHead=reverseList(head.next)
    let tail=head.next
    tail.next=head
    head.next=null
    return revHead
}
```


# 二叉树题
## 102.二叉树的层序遍历
输入：root = [3,9,20,null,null,15,7]
输出：[[3],[9,20],[15,7]]
```js
var levelOrder=function(root){
    const res=[]
    function dfs(root,index){
        if(root==null){
            return []
        }
        dfs(root.left,index+1)
        dfs(root.right,index+1)
        while(res.length<index){
            res.push([])
        }
        res[index-1].push(root.val)
    }
    dfs(root,1)
    return res
}
```
当处理第一层的节点时，res初始长度是0，此时需要先给res数组添加一个空数组，让res变成[[]],这样res[0]才存在,然后递归左子树，递归右子树