import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Card, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { parseWeekMoth, _getDay, getDayWeek } from "../../utils/date";
import ModalComponent from '../modal/modal-component';
import axios from 'axios';
import {showMessage} from '../../utils/message';

export const API = `http://192.168.0.15:3030/api/`;


const MeusAgendamentosList = (props: any) => {
    const { events } = props;
    const {update} = props;
    const navigation = useNavigation();
    const [isLoad, setIsLoad] = useState(false)
    const [hoje, setHoje] = useState(new Date())

    const [open, setOpen] = useState(false);
    const [evento, setEvento] = useState(null);

    function renderList() {
        if (events) {
            return (
                <View style={styles.topo} >
                    <View style={styles.content} >
                        <Card.Title style={styles.semana}>{parseWeekMoth(events.data)}</Card.Title>
                        <View style={styles.week}>
                            {renderDia(events)}
                        </View>
                    </View>
                </View>
            );
        }
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

    function renderBotao(prop: any, hora: any) {
        if (new Date(prop.start.dateTime) < hoje) {
            return (<TouchableOpacity style={styles.disabled} disabled>
                <Text style={styles.hora} key={prop.iCalUID}>{hora}</Text>
            </TouchableOpacity>)
        } else {
            return (<TouchableOpacity style={styles.hora_} key={prop.id} onPress={() => cancelarAgendamento(prop)} >
                <Text style={styles.hora} key={prop.iCalUID}>{hora}</Text>
            </TouchableOpacity>)
        }

    }

    function renderDia(evento: any) {
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
                                {renderBotao(prop, hora)}
                            </View>
                        );
                    } else {
                        return (
                            <View key={index} style={styles.body_} >
                                <Text style={styles.dia_} key={prop.iCalUID}></Text >
                                <Text style={styles.mes} key={getIndex()}>
                                    <Text style={styles.dayWeek} key={prop.iCalUID}> </Text>
                                </Text>
                                {renderBotao(prop, hora)}
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

    function cancelarAgendamento(evento: any) {
        setEvento(evento);
        setOpen(true)
    }

    async function cancelar(evento: any){
        setIsLoad(true);
        setOpen(false);
        let response = await axios.post(`${API}agendamentos/deletar`, evento);
        console.log('cancelar')
        if (response) {       
            setIsLoad(false);  
            showMessage('Agendamento excluido com sucesso!', 'alert');          
            update();
            navigation.navigate('Meus Agendamentos');
        }else{
            setIsLoad(false);
        }    
    }

    function voltar(valor: any){
        setOpen(valor);
    }

    function renderModal() {
        let descricao = "Deseja cancelar o agendamento ?"
        if (open) {
            return (
                <ModalComponent
                    evento={evento}
                    open={open}
                    descricao={descricao}
                    metodo={cancelar}
                    voltar={voltar}
                    textBotton="Cancelar" >
                </ModalComponent >
            )
        }
    }

   
    return <>
        {renderModal()}
        {renderLoading()}
        <Card>
            <Card>
                <Card.Title style={styles.titulo}>Fornecedor: {events.eventos[0].organizer.displayName} </Card.Title>
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

    disabled: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        marginTop: 2,
        alignItems: 'center',
        backgroundColor: '#6c6292',
        width: '40%',
        height: '100%'
    },

    modal: {
        padding: 10,
    },

    bt: {
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: '#2908a0',
    }


});


export default MeusAgendamentosList;

