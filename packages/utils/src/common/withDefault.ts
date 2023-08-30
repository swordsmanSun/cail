/* export function withDefault(value: string, defaultValue: string): string
export function withDefault(value: number, defaultValue: number): string
export function withDefault(value: Record<any, any>, defaultValue: Record<any, any>): Record<any, any> */

export function withDefault<T, D extends unknown>(value: T, defaultValue: D) {
    if (defaultValue !== null && !(defaultValue instanceof Array) && typeof defaultValue === "object") {
        let obj = value ?? {} as T & D
        Object.keys(defaultValue).forEach(key => {
            obj[key] = withDefault(value?.[key], defaultValue[key])
        })
        return obj
    } else {
        return (value ?? defaultValue) as T & D 
    }
}