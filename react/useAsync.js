import {useState,useCallback,useEffect,useRef} from 'react'

const useAsync=(asyncFunction,immediate=false)=>{
    const [status,setStatus]=useState('idle')
    const [value,setValue]=useState(null)
    const [error,setError]=useState(null)
    const isMountedRef=useRef(false)
    useEffect(()=>{
        isMountedRef.current=true
        return ()=>{
            isMountedRef.current=false
        }
    },[])
    const execute=useCallback(async (...args)=>{
        setStatus('pending')
        setValue(null)
        setError(null)
        try{
            const response=await asyncFunction(...args)
            if(isMountedRef.current){
                setValue(response)
                setStatus('success')
            }
        }catch(err){
            if(isMountedRef.current){
                setError(err)
                setStatus('error')
            }
        }
    },[asyncFunction])
    useEffect(()=>{
        if(immediate){
            execute()
        }
    },[execute,immediate])
    return{
        execute,
        status,
        value,
        error,
        loading:status==='pending'
    }
}
export default useAsync