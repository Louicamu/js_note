const task=(timer)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(new Date())
            resolve()
        },timer)
    })
}