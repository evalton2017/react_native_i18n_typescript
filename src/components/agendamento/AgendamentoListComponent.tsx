import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, ToastAndroid } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { parseWeekMoth, _getDay, getDayWeek } from "../../utils/date";
import axios from 'axios';
import ModalComponent from '../modal/modal-component';
import {showMessage} from '../../utils/message';

export const URL = `http://8gwkq.mocklab.io/v1/`;
export const API = `http://192.168.0.15:3030/api/`;

const AgendamentoList = (props: any) => {
    const { events } = props;
    const { fornecedor } = props;
    const navigation = useNavigation();
    const [isLoad, setIsLoad] = useState(false)

    const [open, setOpen] = useState(false);
    const [evento, setEvento] = useState(null);

    async function agendar(evento: any) {
        setOpen(false);
        setIsLoad(true);
        let response = await axios.post(`${API}agendamentos/agendamento`, evento);
        if (response) {
            showMessage('Agendamento realizado com sucesso!', 'alert');
            navigation.navigate('Meus Agendamentos');
            setIsLoad(false);
        } else {
            setIsLoad(false);
        }
    }


    function voltar(valor: any) {
        setOpen(valor);
    }

    function abrirModal(evento: any){
        setEvento(evento)
        setOpen(true)
    }

    function renderModal() {
        let descricao = "Deseja confirmar o agendamento?"
        if (open) {
            return (
                <ModalComponent
                    evento={evento}
                    open={open}
                    descricao={descricao}
                    metodo={agendar}
                    voltar={voltar} 
                    textBotton="Agendar">
                </ModalComponent >
            )
        }
    }

    function renderList() {
        if (events) {
            return (
                <View style={styles.topo} >
                    <View style={styles.content} >
                        <Card.Title style={styles.semana}>{parseWeekMoth(events.data)}</Card.Title>
                        <View style={styles.week}>
                            {renderDia(events, navigation)}
                        </View>
                    </View>
                </View>
            );
        }
    }

    function renderDia(evento: any, navigation: any) {
        if (evento != undefined && evento.eventos.length > 0) {
            {
                return evento.eventos.map((prop: any, index: number) => {
                    let dia = verificaDia(index, evento.eventos, prop);
                    let hora = _getHora(prop.start.dateTime);
                    if (dia != null) {
                        return (
                            <View key={index} style={styles.body}  >
                                <Text style={styles.dia} key={prop.iCalUID}> {dia}</Text >
                                <Text style={styles.mes} key={getIndex()}>{evento.mes}
                                    <Text style={styles.dayWeek} key={prop.iCalUID}>            {getDayWeek(prop.start.dateTime)}</Text>
                                </Text>
                                <TouchableOpacity style={styles.hora_} key={prop.id} onPress={() => abrirModal(prop)}>
                                    <Text style={styles.hora} key={prop.iCalUID}>{hora}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    } else {
                        return (
                            <View key={index} style={styles.body_} >
                                <Text style={styles.dia_} key={prop.iCalUID}></Text >
                                <Text style={styles.mes} key={getIndex()}>
                                    <Text style={styles.dayWeek} key={prop.iCalUID}> </Text>
                                </Text>
                                <TouchableOpacity style={styles.hora_} key={index} onPress={() => abrirModal(prop)}>
                                    <Text style={styles.hora} key={getIndex()}>{hora}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }

                })
            }

        }

    }

    function _getHora(data: any) {
        let aux = data.split('T');
        let hora_ = aux[1].split('-')
        let hora = hora_[0].split(':')
        return hora[0] + ":" + hora[1];
    }

    function verificaDia(index: number, eventos: any, evento: any) {
        let retorno = null;
        let limite = eventos.length;
        if (limite > index) {
            if (index == 0) {
                retorno = _getDay(evento.start.dateTime);
            } else if (_getDay(eventos[index].start.dateTime) != _getDay(eventos[index - 1].start.dateTime)) {
                retorno = _getDay(eventos[index].start.dateTime);
            }
        }
        return retorno;
    }

    function getIndex() {
        return new Date().getTime();
    }

    function renderLoading() {
        if (isLoad) {
            return <ActivityIndicator style={[styles.loading, styles.horizontal]}
                color="blue"
                size="large" />
        } else {
            return null;
        }
    }



    return <>
        {renderModal()}   
        <Card>
            {renderLoading()}
            <Card>
                <Card.Title style={styles.titulo}>Fornecedor: {fornecedor.name} </Card.Title>
            </Card>
            <Card.Divider />
            {
                renderList()
            }
        </Card>
    </>
};

const styles = StyleSheet.create({
    topo: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        marginBottom: 10,
        backgroundColor: '#a3c7f0'
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    week: {
        flexDirection: 'column',
        width: '100%',
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 3,
        paddingTop: 25
    },
    body_: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 3,
        paddingTop: 5
    },
    dia: {
        flexDirection: 'row',
        fontSize: 25,
        paddingLeft: 2,
        textAlign: 'left',
        fontWeight: 'bold',
        width: '20%',
    },
    dia_: {
        flexDirection: 'row',
        fontSize: 25,
        paddingLeft: 2,
        textAlign: 'left',
        fontWeight: 'bold',
        width: '20%',
        marginBottom: 5
    },
    hora_: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        marginTop: 2,
        alignItems: 'center',
        backgroundColor: '#2908a0',
        width: '40%',
        height: '100%',
    },
    hora: {
        display: 'flex',
        marginTop: 5,
        fontSize: 18,
        textAlign: 'center',
        width: '40%',
        fontWeight: 'bold',
        color: '#e4dede',
    },

    lineText: {
        fontSize: 16,
        paddingLeft: 2,
        fontWeight: 'bold'
    },
    semana: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    titulo: {
        color: "#1a1e9d",
        fontSize: 18
    },
    mes: {
        display: 'flex',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 2,
        width: '42%',
        textAlign: 'left',
    },
    dayWeek: {
        flexDirection: 'row',
        fontSize: 15,
        fontWeight: 'bold',
        width: '20%',
    },
    loading: {
        flex: 1,
        justifyContent: "center"
    },

    horizontal: {
        paddingTop: '70%',
        flexDirection: "row",
        justifyContent: "space-around",
    },

    bt: {
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: '#2908a0',
    }


});


export default AgendamentoList;

