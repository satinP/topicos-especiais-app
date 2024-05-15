import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ToDoStackParamList } from '../navigation/StackNavigator'
import Modal from '../components/Modal'
import TodoItemType from '../types/TodoItem'
import TodoItem from '../components/TodoItem'

const storageTodoListKey = '@todo-list-key'

type TodoListScreenProps = NativeStackScreenProps<
  ToDoStackParamList,
  'TodoList'
>

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [todoItemList, setTodoItemList] = React.useState<TodoItemType[]>([])
  const [todoItemDescription, setTodoItemDescription] = React.useState('')

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ padding: 15 }}
        >
          <AntDesign name="pluscircle" size={24} color="darkseagreen" />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  React.useEffect(() => {
    const getTodoItems = async () => {
      const savedItems = await AsyncStorage.getItem(storageTodoListKey)
      if (savedItems === null) {
        return
      }
      const items = JSON.parse(savedItems) || []
      setTodoItemList(items)
    }
    getTodoItems()
  }, [])

  const handleAddItem = async () => {
    if (!todoItemDescription) {
      alert('Descrição da tarefa inválida!')
      return
    }

    if (!todoItemList.length) {
      const arrTodo = [
        {
          id: 1,
          title: '',
          description: todoItemDescription,
        },
      ]
      await AsyncStorage.setItem(storageTodoListKey, JSON.stringify(arrTodo))

      setTodoItemList(arrTodo)
      setTodoItemDescription('')
      return
    }

    const todoItemListCopy = [...todoItemList]

    const lastItemIdPlusOne = todoItemList[todoItemList.length - 1].id + 1

    const newItem: TodoItemType = {
      id: lastItemIdPlusOne,
      title: '',
      description: todoItemDescription,
    }

    todoItemListCopy.push(newItem)

    await AsyncStorage.setItem(
      storageTodoListKey,
      JSON.stringify(todoItemListCopy)
    )

    setTodoItemList(todoItemListCopy)
    setTodoItemDescription('')
  }

  const handleDeleteItem = (item: TodoItemType) => {
    const index = todoItemList.findIndex((todo) => todo.id === item.id)

    const todoItemListCopy = todoItemList.toSpliced(index, 1)

    setTodoItemList(todoItemListCopy)
    AsyncStorage.setItem(storageTodoListKey, JSON.stringify(todoItemListCopy))
  }

  return (
    <View style={styles.container}>
      {/* Modal do nosso projeto */}
      <Modal
        modalVisible={modalVisible}
        onCloseModal={() => setModalVisible(!modalVisible)}
        title="Descreva a tarefa"
      >
        {/* Input para guardar a descrição */}
        <TextInput
          style={[styles.input, { minHeight: 80 }]}
          placeholder="Descrição"
          value={todoItemDescription}
          onChangeText={(textValue) => setTodoItemDescription(textValue)}
          multiline={true}
          numberOfLines={4}
        />

        {/* Botões da modal */}
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleAddItem}
          >
            <Text style={styles.textStyle}>Adicionar</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Lista de tarefas salvas */}
      <FlatList
        style={{ width: '100%' }}
        data={todoItemList}
        renderItem={({ item }) => (
          <TodoItem todoItem={item} onDelete={handleDeleteItem} />
        )}
        keyExtractor={(item, i) => (item.id ?? i).toString()} // Cria key para cada item da lista
        contentContainerStyle={{ gap: 5, marginTop: 5 }}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '100%',
    minWidth: '50%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },

  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginLeft: 'auto',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default TodoListScreen
