interface Todo {
  t1: string;
  t2: string;
  t3: number;
}
type myPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type TodoPreview1 = myPick<Todo, "t1" | "t2">;
