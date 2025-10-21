interface Todo {
  title: string;
  desc: string;
  completed: boolean;
}
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
  //会遍历K这个联合类型中的每一个成员，P就是在每次遍历中代表当前属性名的变量
  //T[P]作用是查询类型T中属性P的类型，当P是title,那T[P]就是string
};
type TodoPreview = MyPick<Todo, "title" | "completed">;
