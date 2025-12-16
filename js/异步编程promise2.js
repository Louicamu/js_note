/*
    封装一个工具函数输入一个promiseA返回一个promiseB如果超过1s没返回则抛出异常如果正常则输出正确的值。
*/

function solve(promise){
    return Promise.race([
        promise,
        new Promise((_,reject)=>{
            setTimeout(()=>{
                reject("error")
            },1000)
        })
    ])
}