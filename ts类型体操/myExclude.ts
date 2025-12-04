type myExclude<T,U>=T extends U? never:T

//type Result = myExclude<'a' | 'b' | 'c', 'a'>,这里t是'a'|'b'|'c'