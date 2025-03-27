import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import type {TwoFactorAuthInfo} from './shared';

export const TwoFactorAuthSelector = ({ twoFaData, onSelected }: { twoFaData: TwoFactorAuthInfo | null, onSelected: (selected: string)=> void }) => {
    const handleSelectMethod = (method: string) => {
        onSelected(method);
    };

    const displayProvider = (provider: string): string => {
        switch (provider) {
            case 'PhoneCode':
                return `Text Message to ${twoFaData?.phone_number}`;
            case 'EmailCode':
                return `Email to ${twoFaData?.email}`;
            case 'GoogleAuthenticator':
                return 'Google Authenticator App';
            default:
                return provider;
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Two-Factor Authentication Required</Text>
            <Text>Please select a method to proceed:</Text>

            {twoFaData?.twofa_providers.map((provider, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.methodButton}
                    onPress={() => handleSelectMethod(provider)}
                >
                    <Text style={styles.methodText}>{displayProvider(provider)}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    methodButton: {
        backgroundColor: '#007bff',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    methodText: {
        color: '#ffffff',
    },
    infoText: {
        marginTop: 10,
    },
});
