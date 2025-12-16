class scheduler{
    constructor(max){
        this.max=max
        this.count=0
        this.queue=[]
    }
    async add(fn){
        if(this.count>=this.max){
            await new Promise(resolve=>this.queue.push(resolve))//await会暂停当前代码的执行，直到这个promise被resolve
        }
        this.count++//占用一个名额
        const res=await fn()//真正执行用户的任务，并等待它完成
        this.count--//任务完成，释放名额
        this.queue.length&&this.queue.shift()()//this.queue.shift()取出头部排的最久的那个resolve函数，()执行这个resolve()函数
        return res
    }
}

/*

你可以把这两个阶段看作是一次接力跑：

阶段 2 (跑道上)：A 正在拼命跑（await fn()），这时候 B 想跑但跑道满了，B 只能在起跑线上拿着接力棒发呆（await new Promise...）。

阶段 3 (交接区)：

A 跑到了终点（fn 执行完毕）。

A 离开跑道（count--）。

关键动作：A 并没有直接回家，而是回头看了一眼起跑线（queue），发现 B 在等。

A 冲过去拍了 B 一下（shift()()，也就是调用 resolve）。

B 收到信号，立刻冲上跑道，开始执行 B 的“阶段 2”。

所以，阶段 3 的本质就是：前一个任务在临死前，负责“复活”排在最前面的下一个任务
 */