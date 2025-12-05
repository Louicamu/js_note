type pick<T,K extends keyof T>={
    [P in K]:T[P]
}