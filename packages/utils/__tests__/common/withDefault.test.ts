import { describe, expect, test } from "vitest";
import { withDefault } from "../../src/common/withDefault";


describe("withDefault", () => {
    test("undefined value param", () => {
        expect(withDefault(null, 2)).toBe(2)
        expect(withDefault(null, false)).toEqual(false)
        expect(withDefault(null, "undefined")).toEqual("undefined")
        expect(withDefault(null, {})).toEqual({})
        expect(withDefault(null, [1, 2, 3])).toEqual([1, 2, 3])
        expect(withDefault(null, undefined)).toEqual(undefined)
        expect(withDefault(null, null)).toEqual(null)
    })
    test("object params", () => {
        expect(withDefault({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3, })
        expect(withDefault({ a: 1 }, { a: 1, b: { a: 1 } })).toEqual({ a: 1, b: { a: 1 } })
    })

    test("the number of object fields is greater than the default object fields", () => {
        expect(withDefault({ 1: 1, 2: 2, 3: 3 }, null)).toEqual({ 1: 1, 2: 2, 3: 3 })
        expect(withDefault({ 1: 1, 2: 2, 3: 3 }, { a: 1 })).toEqual({ 1: 1, 2: 2, 3: 3, a: 1 })
    })

    test("change the origin object", () => {
        const origin = {}
        withDefault(origin, { 1: 2, a: { 1: 2 } })
        expect(origin).toEqual({ 1: 2, a: { 1: 2 } })
    })
})
