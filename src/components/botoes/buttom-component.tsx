import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'react-native-elements';

const ButtonComponent = (props: any) => {
    const { metodo } = props;
    const { texto } = props;
    const { icone } = props;

    return <View style={styles.container}>
        <TouchableOpacity style={styles.bt} onPress={() => metodo()}   >
            <Text style={styles.titulo}>
                <Icon
                    name={icone}
                    size={20}
                    type='font-awesome'
                    color="white"
                />  
                  {texto} </Text>
        </TouchableOpacity>
    </View>
};

const styles = StyleSheet.create({

    container: {
        paddingTop: 5,
        alignItems: 'center',
        height: 55,
        paddingBottom:10,
        marginBottom: 10

    },

    titulo: {
        marginTop: 5,
        fontSize: 15,
        textAlign: 'center',
        width: '100%',
        fontWeight: 'bold',
        color: '#e4dede',
    },

    bt: {
        borderRadius: 4,
        marginTop: 2,
        alignItems: 'center',
        backgroundColor: '#2908a0',
        width: '90%',
        height: '100%',
    }
});


export default ButtonComponent;