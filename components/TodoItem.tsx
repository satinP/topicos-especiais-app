import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import TodoItemType from '../types/TodoItem'

const RightSwipeActions = ({
  item,
  onDelete,
  progress,
}: {
  item: TodoItemType
  onDelete: (item: TodoItemType) => void
  progress: Animated.AnimatedInterpolation<number>
}) => {
  const transform = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  })
  return (
    <Animated.View
      style={[
        styles.item,
        {
          backgroundColor: 'lightcoral',
          alignItems: 'flex-end',
          transform: [{ translateX: transform }],
        },
      ]}
    >
      <TouchableOpacity onPress={() => onDelete(item)}>
        <AntDesign name="delete" size={18} color="black" />
      </TouchableOpacity>
    </Animated.View>
  )
}

const TodoItem = ({
  todoItem,
  onDelete,
}: {
  todoItem: TodoItemType
  onDelete: (item: TodoItemType) => void
}) => {
  return (
    <Swipeable
      renderRightActions={(
        progressAnimatedValue: Animated.AnimatedInterpolation<string | number>
      ) => (
        <RightSwipeActions
          item={todoItem}
          onDelete={onDelete}
          progress={progressAnimatedValue}
        />
      )}
    >
      <View style={styles.item}>
        <Text style={styles.itemText} numberOfLines={1} selectable>
          {todoItem.description}
        </Text>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  item: {
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default TodoItem
