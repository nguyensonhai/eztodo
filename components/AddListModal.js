import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../shared/Colors';
import tempData from '../shared/TempData';

export default class AddListModal extends React.Component {

    backgroundColors = ['#86E3CE', '#24A6D9', '#595BD9', '#8022D9', '#D159D8', '#D85963', '#D88559'];

    state = {
        name: '',
        color: this.backgroundColors[0],
    };

    renderColors() {
        return this.backgroundColors.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, { backgroundColor: color }]}
                    onPress={() => this.setState({ color })}
                />
            )
        })
    };

    createTodo =  () => {
        const {name, color} = this.state;
        const list = {name, color};

        this.props.addList(list);
        this.setState({name: ''});
        this.props.closeModal();
    };

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'>
                <TouchableOpacity
                    style={{ position: 'absolute', top: 24, right: 32 }}
                    onPress={this.props.closeModal}>
                    <AntDesign
                        name='close'
                        size={24}
                        color={colors.black} />
                </TouchableOpacity>

                <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
                    <Text style={styles.title}>Create <Text style={[styles.todo, { color: this.state.color }] }>Todo</Text> List</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='List name'
                        onChangeText={text => this.setState({ name: text })}
                    />

                    <View style={styles.renderColor}>{this.renderColors()}</View>

                    <TouchableOpacity
                        style={[styles.create, { backgroundColor: this.state.color }]}
                        onPress={this.createTodo} >
                        <Text style={{ color: colors.white, fontWeight: '600' }}>CREATE </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
        color: colors.black,
        alignSelf: 'center',
        marginBottom: 16,
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.green,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    todo: {
        fontSize: 38,
        fontWeight: 'bold',
        color: colors.green,
        alignSelf: 'center',
        marginBottom: 16,
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.green,
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4,
    },
    renderColor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 18,
    }
})