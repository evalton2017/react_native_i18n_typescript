import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


const ServiceList = (props: any) => {
    const { servicos } = props;
    const navigation = useNavigation();
    const [isLoad, setLoad] = useState(false);

    function fornecedores(servico: any) {
        navigation.navigate('Fornecedores', servico);
    }

    function renderList() {
        if (servicos) {
        
            return servicos?.map((s: any, i: number) => {
                return (
                    <TouchableOpacity onPress={() => fornecedores(s)} key={i} >
                        <ListItem key={i} bottomDivider >
                            <Avatar source={require('../../../assets/serv_img.jpg')} />
                            <ListItem.Content>
                                <ListItem.Title style={styles.lineText}>{s.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </TouchableOpacity>
                );
            })
        }
    }

    return <Card>
        <Card.Title style={styles.titulo}>Serviços Disponíveis</Card.Title>
        <Card.Divider />
        {
            renderList()
        }
    </Card>
};

const styles = StyleSheet.create({

    container: {

    },

    lineText: {
        fontSize: 20,
        paddingLeft: 2,
        fontWeight: 'bold'
    },

    titulo: {
        color: "#1a1e9d",
        fontSize: 22
    }
});


export default ServiceList;

