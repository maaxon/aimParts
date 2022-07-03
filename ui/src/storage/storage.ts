export function setStorageItem(key: string, item: any): void {
    item = JSON.stringify(item)
    localStorage.setItem(key, item)
}

export  function getStorageItem(key: string): any {
    const item = localStorage.getItem(key)
    if (item) return JSON.parse(item)
    return item
}
