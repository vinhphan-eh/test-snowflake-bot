import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export const TwoFactorAuthCode = ({ onVerify }: {onVerify: (v: string) => void}) => {
    const [code, setCode] = useState('');

    const handleSubmit = () => {
        if (!code) {
            Alert.alert('Please enter the code');
            return;
        }
        onVerify(code);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter 2FA Code"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
            />
            <Button title="Verify Code" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
});
