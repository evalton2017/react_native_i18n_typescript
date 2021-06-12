import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import FormRow from '../components/FormRow';
import ButtonComponent from '../components/botoes/buttom-component';


export const HomePage: React.FC = () => {

    let { t, i18n } = useTranslation('home');
    const navigation = useNavigation();


    function portugues() {
        i18n.changeLanguage('pt-BR')
    }

    function ingles() {
        i18n.changeLanguage('en-US')
    }

    function renderTela() {
        return <View>
            <FormRow>
                <View style={styles.container}>
                    <Text style={styles.texto}>{t('title')}</Text>
                    <Text style={styles.texto}>{t('introduction')}</Text>
                </View>

                <View>
                    <ButtonComponent
                        metodo={portugues}
                        texto={t('bt_Portuguese')}
                    />
                    <ButtonComponent
                        metodo={ingles}
                        texto={t('bt_English')}
                    />
                </View>
            </FormRow>
        </View>
    }


    return <>
        {renderTela()}
    </>
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 100,
        marginBottom: 30,
        paddingBottom: '50%',
        marginLeft: 10,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    btn: {
        marginTop: 30
    },

    texto: {
        marginTop: 20,
        marginBottom: 10,
        paddingTop: 20,
        fontSize: 20
    }

});

