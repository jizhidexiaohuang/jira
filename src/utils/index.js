import { useEffect, useState } from "react"

export const isFalsy = (value) => value === 0 ? false : !value

export const cleanObject = (object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        if(!value){
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback) => {
    useEffect(() => {
        callback()
    },[])
}

export const useDebounce = (value, delay) => {
    // 定义一个内部变量
    const [debounceValue, setDebouncedValue] = useState(value)
    // 每次在value变化的时候，设置一个新的定时器
    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        // 每次在上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout)
    },[value, delay])
    return debounceValue
}