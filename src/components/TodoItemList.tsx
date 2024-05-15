import React from 'react'
import { FlatList, View } from 'react-native'
import TodoItemType from '../types/TodoItem'
import TodoItem from './TodoItem'
import { useAsyncStorage } from '../hooks/useAsyncStorage'
import { storageTodoListKey } from '../utils/constants'

type TodoItemProps = {
  onDelete: (item: TodoItemType) => void
}

const TodoItemList = ({ onDelete }: TodoItemProps) => {
  const [lsTodoItem] = useAsyncStorage<TodoItemType[]>(storageTodoListKey, [])
  return (
    <FlatList
      style={{ width: '100%' }}
      data={lsTodoItem}
      renderItem={({ item }) => (
        <TodoItem todoItem={item} onDelete={onDelete} />
      )}
      keyExtractor={(item, i) => (item.id ?? i).toString()} // Cria key para cada item da lista
      contentContainerStyle={{ gap: 5, marginTop: 5 }}
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  )
}

export default React.memo(TodoItemList)
