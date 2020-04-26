import React from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from './shared/Colors';
import tempData from './shared/TempData';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';
import Fire from './shared/Fire';

const getFonts = () => Font.loadAsync({
  'quicksand-regular': require('./assets/fonts/Quicksand-Regular.ttf'),
  'quicksand-bold': require('./assets/fonts/Quicksand-Bold.ttf'),
});

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true,
  }

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert('Uh oh, something went wrong!')
      }

      firebase.getLists(lists => {
        this.setState({ lists, user }, () => {
          this.setState({loading: false})
        })
      });

      this.setState({ user });
    });
  }

  componentWillUnmount(){
    firebase.detach();
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  };

  renderList = list => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  addList = list => {
    this.setState({ lists: [...this.state.lists, { ...list, id: this.state.lists.length + 1, todos: [] }] });
  };

  updateList = list => {
    this.setState({
      lists: this.state.lists.map(item => {
        return item.id === list.id ? list : item;
      })
    });
  };

  render() {
    if(this.state.loading) {
      getFonts();
      return (
        <View style={styles.container} >
          <ActivityIndicator size='large' color={colors.black}/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Modal animationType='slide' visible={this.state.addTodoVisible} onRequestClose={() => this.toggleAddTodoModal()}>
          <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
        </Modal>
        {/* <View>
          <Text>User: {this.state.user.uid} </Text>
        </View> */}
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Todo <Text style={{ fontFamily: 'quicksand-regular', color: colors.gray }}>Lists</Text>
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
            <AntDesign name='plus' size={16} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.add}>Add list</Text>
        </View>
        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps='always'
          />
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.black,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'quicksand-bold',
    fontSize: 38,
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    fontFamily: 'quicksand-regular',
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.black,
    fontFamily: 'quicksand-regular',
    fontSize: 14,
    marginTop: 8,
  }
});
