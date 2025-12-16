import {useRef} from 'react'
function areDepsEqual(oldDeps,newDeps){
    if(!oldDeps)return false
    if(oldDeps.length!==newDeps.length)return false
    for(let i=0;i<oldDeps.length;i++){
        if(!Object.is(oldDeps[i],newDeps[i])){
            return false
        }
    }
    return true
}
function myMemo(factory,deps){
    const cache=useRef(null)
    if(!cache.current||!areDepsEqual(cache.current.deps,deps)){
        const newValue=factory()
        cache.current={
            deps:deps,
            value:newValue
        }
    }
    return cache.current.value
}