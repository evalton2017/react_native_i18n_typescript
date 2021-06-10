import React from 'react';
import {View, StyleSheet} from 'react-native';


const FormRow  = (props: any) => {
    const {children} = props
    return(
        <View style={styles.container}>
            {children}
        </View>
    )
}


const styles = StyleSheet.create({

    container: {

    }

});

export default  FormRow;