import React, { Component } from 'react'

export const Whatsapp = link => {
    if (!isUndefined(link)) {
        Linking.canOpenURL(link)
            .then(supported => {
                if (!supported) {
                    Alert.alert(
                        'Please install whats app to send direct message to students via whats app'
                    );
                } else {
                    return Linking.openURL(link);
                }
            })
            .catch(err => console.error('An error occurred', err));
    } else {
        console.log('sendWhatsAppMessage -----> ', 'message link is undefined');
    }
};