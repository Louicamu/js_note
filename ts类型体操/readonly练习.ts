type readonly<T>={
    readonly [P in keyof T]:T[P]
}