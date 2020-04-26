import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from './shared/Colors';
import tempData from './shared/TempData';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';

export default class App extends React.Component {
  state = {
    addTodoVisible: false
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = list => {
    return <TodoList list={list} />
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal animationType='slide' visible={this.state.addTodoVisible} onRequestClose={() => this.toggleAddTodoModal()}>
          <AddListModal closeModal={() => this.toggleAddTodoModal()} />
        </Modal>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Todo <Text style={{ fontWeight: '300', color: colors.green }}>Lists</Text>
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
            <AntDesign name='plus' size={16} color={colors.green} />
          </TouchableOpacity>
          <Text style={styles.add}>Add list</Text>
        </View>
        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={tempData}
            keyExtractor={item => item.name}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.lightGreen,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 38,
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightGreen,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.green,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  }
});
