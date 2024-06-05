import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ToDoStackParamList } from '../navigation/StackNavigator'
import Modal from '../components/Modal'
import TodoItemType from '../types/TodoItem'
import TodoItemList from '../components/TodoItemList'

const initialTodoItem: TodoItemType = { description: '', title: '' }

type TodoListScreenProps = NativeStackScreenProps<
  ToDoStackParamList,
  'TodoList'
>

const TodoListScreen = ({ navigation }: TodoListScreenProps) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [isEdit, setIsEdit] = React.useState(false)
  const [todoItem, setTodoItem] = React.useState<TodoItemType>(initialTodoItem)
  const [todoList, setTodoList] = React.useState<TodoItemType[]>([])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTodos()
    })

    async function fetchTodos() {
      try {
        const res = await fetch('http://localhost:3000/tasks')
        const data = await res.json()
        setTodoList(data)
      } catch (e) {
        console.log(e)
      }
    }

    return unsubscribe
  }, [navigation])

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setIsEdit(false)
            setModalVisible(true)
          }}
          style={{ padding: 15 }}
        >
          <AntDesign name="pluscircle" size={24} color="darkseagreen" />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  const handleAddItem = async () => {
    if (!todoItem) {
      alert('Descrição da tarefa inválida!')
      return
    }

    if (isEdit) {
      const index = todoList.findIndex((todo) => todo.id === todoItem.id)
      try {
        fetch('http://localhost:3000/tasks/id/' + todoItem.id, {
          method: 'PATCH',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todoItem),
        })
        const todoItemListCopy = [...todoList]

        todoItemListCopy[index] = todoItem

        setTodoList(todoItemListCopy)
        setTodoItem(initialTodoItem)
      } catch (e) {
        console.log(e)
      }

      setModalVisible(false)
      return
    }

    try {
      fetch('http://localhost:3000/tasks', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoItem),
      })
      const todoItemListCopy = [...todoList]
      todoItemListCopy.push(todoItem)
      setTodoList(todoItemListCopy)
      setTodoItem(initialTodoItem)
    } catch (e) {
      console.log(e)
    }

    setModalVisible(false)
  }

  const handleDeleteItem = (item: TodoItemType) => {
    const index = todoList.findIndex((todo) => todo.id === todoItem.id)

    try {
      fetch('http://localhost:3000/tasks/id/' + item?.id, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const todoItemListCopy = todoList.toSpliced(index, 1)

      setTodoList(todoItemListCopy)
    } catch (e) {
      console.log(e)
    }
  }

  const handleEditItem = (item: TodoItemType) => {
    setTodoItem(item)
    setModalVisible(true)
    setIsEdit(true)
  }

  return (
    <View style={styles.container}>
      {/* Modal do nosso projeto */}
      <Modal
        modalVisible={modalVisible}
        onCloseModal={() => {
          setModalVisible(!modalVisible)
          setTodoItem(initialTodoItem)
        }}
        title="Descreva a tarefa"
      >
        {/* Input para guardar o titulo */}
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={todoItem.title}
          onChangeText={(textValue) =>
            setTodoItem((prev) => ({ ...prev, title: textValue }))
          }
        />

        {/* Input para guardar a descrição */}
        <TextInput
          style={[styles.input, { minHeight: 80 }]}
          placeholder="Descrição"
          value={todoItem.description}
          onChangeText={(textValue) =>
            setTodoItem((prev) => ({ ...prev, description: textValue }))
          }
          multiline={true}
          numberOfLines={4}
        />

        {/* Botões da modal */}
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleAddItem}
          >
            <Text style={styles.textStyle}>
              {isEdit ? 'Editar' : 'Adicionar'}
            </Text>
          </Pressable>
        </View>
      </Modal>

      {/* Lista de tarefas salvas */}
      <TodoItemList
        todoList={todoList}
        key={JSON.stringify(todoList)}
        onDelete={handleDeleteItem}
        onEdit={handleEditItem}
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
