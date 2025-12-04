const remoteAdd=(a,b)=>new Promise(resolve=>setTimeout(()=>resolve(a+b),1000))
async function sumFast(arr){
    let list=arr
    while(list.length>1){
        const tasks=[]
        const remain=[]
        for(let i=0;i<list.length;i+=2){
            const a=list[i]
            const b=list[i+1]
            if(b!==undefined){
                tasks.push(remoteAdd(a,b))
            }else{
                remain.push(a)
            }
        }
        const result=await Promise.all(tasks)
        list=[...results,...remain]
    }
    return list[0]||0
}