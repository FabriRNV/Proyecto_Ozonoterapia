import {useState, useEffect} from 'react'

export const useLocalStorage = (key, initialValue) => {
  const [storeValue, setStoreValue] = useState(() => {
    const saveData = localStorage.getItem(key)
    if (saveData) {
      return JSON.parse(saveData);
    } else {
      return[]
    }
  })

  useEffect(() => {
    localStorage.setItem(key,JSON.stringify(storeValue))
  }, [storeValue])

  return[storeValue, setStoreValue]
}
