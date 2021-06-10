import React, { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function DatePicker(props: any) {
    const { onChange } = props;
    const { onClose } = props;
    const [dateNow, setDateNow] = useState(new Date())
    const [show, setShow] = useState(false)

    function render() {
         return <View>
            {Platform.OS === 'ios' && (
                <TouchableOpacity>
                    <Button title="Fechar"
                        onPress={() => { onClose }}></Button>
                </TouchableOpacity>
            )}
            <DateTimePicker
                testID="dateTimePicker"
                value={dateNow}
                mode='date'
                is24Hour={true}
                display="default"
                onChange={(e, d) => {
                    const currentDate = d || dateNow
                    setDateNow(currentDate);
                    onChange(currentDate);
                    setShow(Platform.OS === 'ios')
                }}
            />
        </View>
      
    }

    return (
        <View>
            {render()}
        </View>
    )

}