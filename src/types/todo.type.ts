export type TodoItemType = {
  _id: string,
  author: string,
  text: string,
  createdAt: Date,
  updatedAt: Date,
  history: Array<{
    author: string,
    text: string,
    createdAt: Date
  }>
  items: TodoItemType[]
}
