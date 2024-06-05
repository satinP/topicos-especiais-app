import React from 'react'
import { FlatList, View } from 'react-native'
import TodoItemType from '../types/TodoItem'
import TodoItem from './TodoItem'

type TodoItemProps = {
  todoList: TodoItemType[]
  onDelete: (item: TodoItemType) => void
  onEdit: (item: TodoItemType) => void
}

const TodoItemList = ({ todoList, onDelete, onEdit }: TodoItemProps) => {

  return (
    <FlatList
      style={{ width: '100%' }}
      data={todoList}
      renderItem={({ item }) => (
        <TodoItem todoItem={item} onDelete={onDelete} onEdit={onEdit} />
      )}
      keyExtractor={(item) => JSON.stringify(item)} // Cria key para cada item da lista
      contentContainerStyle={{ gap: 5, marginTop: 5 }}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  )
}

export default React.memo(TodoItemList)
