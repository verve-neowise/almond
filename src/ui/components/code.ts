
export const code = `let s: number = 0
const arr: array = []
for i = 0 to 50 {
    arr[i] = s
    print(arr)
    s += i
    print(i, s)
}

return s`