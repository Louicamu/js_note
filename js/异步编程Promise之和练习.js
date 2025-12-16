function remoteAdd(a,b){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(a+b)
        },100)
    })
}

async function solve(arr){
    if(arr.length==0)return 0
    if(arr.length==1)return arr[0]
    const promises=[]
    for(let i=0;i<arr.length;i+=2){
        if(i+1<arr.length){
            promises.push(remoteAdd(arr[i],arr[i+1]))
        }else{
            promises.push(Promise.resolve(arr[i]))
        }
    }
    const results=await Promise.all(promises)
    return solve(results)
}