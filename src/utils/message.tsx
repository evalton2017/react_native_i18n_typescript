import React from 'react';
import { View, StyleSheet, ToastAndroid, Button, StatusBar, Platform } from 'react-native';
import Toast from 'react-native-root-toast';

export function showMessage(message:any, tipo:any) {
    {Platform.OS === 'ios' && (
        showToastIOS(message)
    )}
    {Platform.OS === 'android' && (
        showToastAndroid(message)
    )}
}

function showToastAndroid(message: string) {
    ToastAndroid.show(message, ToastAndroid.LONG);
}

function showToastIOS(message: string) {
    let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
    });

    setTimeout(function hideToast() {
        Toast.hide(toast);
    }, 500);
}
