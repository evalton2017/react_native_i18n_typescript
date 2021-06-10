import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


const FornecedoresList = (props: any) => {
    const { fornecedores } = props;
    const {servico} = props;
    const navigation = useNavigation();

    function selecionar(fornecedor: any) {
        fornecedor.servico = servico;
        navigation.navigate('Fornecedor', fornecedor);
    }

    function renderTitle(){
        if(servico){
            return servico.name
        }
    }

    function renderList() {
        if (fornecedores) {
            return  fornecedores?.map((f: any, fi: any) => {
                return (
                    <TouchableOpacity onPress={() => selecionar(f)} key={fi}>
                        <ListItem key={fi} bottomDivider >
                            <Avatar source={require('../../../assets/serv_img.jpg')} />
                            <ListItem.Content>
                                <ListItem.Title key={fi} style={styles.lineText}>{f.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </TouchableOpacity>
                );
            })
        }
    }

    return <Card>
        <Card.Title style={styles.titulo}>{renderTitle()}</Card.Title>
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


export default FornecedoresList;

