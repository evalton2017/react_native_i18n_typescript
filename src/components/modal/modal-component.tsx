import React, { useRef} from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import { Modalize } from 'react-native-modalize';
import ButtonComponent from '../botoes/buttom-component';


const ModalComponent = (props: any) => {
    const { evento } = props;
    const { metodo } = props;
    const { open } = props;
    const {voltar} = props;
    const {textBotton} = props;
    const {descricao} = props;
    const modalizeRef = useRef<Modalize>(null);

    function cancelar() {
        metodo(evento);
    }

    function fechar() {
        voltar(false)
    }

    function renderModal() {
        if (open) {
            return (
                <View style={styles.centeredView}>
                    <Modal animationType="slide"
                        visible={open}
                        transparent={true}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.text}>{descricao}</Text>                                
                                <ButtonComponent
                                    metodo={cancelar}
                                    texto={textBotton}
                                />
                                <ButtonComponent
                                    metodo={fechar}
                                    texto="Voltar"
                                />
                            </View>
                        </View>
                    </Modal>
                </View>)
        }

    }

    return <View>
        {renderModal()}
    </View>
};

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    lineText: {
        fontSize: 20,
        paddingLeft: 2,
        fontWeight: 'bold'
    },

    titulo: {
        color: "#1a1e9d",
        fontSize: 22
    },
    bt: {
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: '#2908a0',
    },

    text: {
        paddingTop: 20,
        color: "#1a1e9d",
        fontSize: 18,
    }
});


export default ModalComponent;
