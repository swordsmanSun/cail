/* export function withDefault(value: string, defaultValue: string): string
export function withDefault(value: number, defaultValue: number): string
export function withDefault(value: Record<any, any>, defaultValue: Record<any, any>): Record<any, any> */

export function withDefault<T>(value: Partial<T>, defaultValue: T) {
    if (defaultValue !== null && !(defaultValue instanceof Array) && typeof defaultValue === "object") {
        let obj = {} as T
        Object.keys(defaultValue).forEach(key => {
            obj[key] = withDefault(value?.[key], defaultValue[key])
        })
        return obj
    } else {
        return (value ?? defaultValue) as T
    }
}

