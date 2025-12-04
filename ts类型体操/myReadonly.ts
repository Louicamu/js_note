type myReadonly<T>={
    readonly [P in keyof T]:T[P]
}