import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../shared/Colors';

export default class AddListModal extends React.Component {

    backgroundColors = ['#86E3CE', '#80D2F2', '#DEADFF', '#FFBDE3', '#D85963', '#F29979', '#FFF08A', '#BFBFBF', '#333333'];

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

    createTodo = () => {
        const { name, color } = this.state;
        const list = { name, color };

        this.props.addList(list);
        this.setState({ name: '' });
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
                    <Text style={styles.title}>Create <Text style={[styles.todo, { color: this.state.color, fontFamily: 'quicksand-bold' }]}>Todo</Text> List</Text>
                    <TextInput
                        selectionColor={this.state.color}
                        style={[styles.input, { borderColor: this.state.color }]}
                        placeholder='Type list name...'
                        onChangeText={text => this.setState({ name: text })}
                    />

                    <View style={styles.renderColor}>{this.renderColors()}</View>

                    <TouchableOpacity
                        style={[styles.create, { backgroundColor: this.state.color }]}
                        onPress={this.createTodo}
                    >
                        <Text style={{ color: colors.white, fontFamily: 'quicksand-bold' }}>CREATE </Text>
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
        fontFamily: 'quicksand-regular',
    },
    title: {
        fontSize: 38,
        fontFamily: 'quicksand-regular',
        color: colors.black,
        alignSelf: 'center',
        marginBottom: 16,
    },
    input: {
        fontFamily: 'quicksand-regular',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18,
    },
    todo: {
        fontSize: 38,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 16,
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
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