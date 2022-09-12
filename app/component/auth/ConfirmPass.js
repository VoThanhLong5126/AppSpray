import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import RNProgressHud from 'progress-hud'
import Background from '../common/Background'
import InputStyle from '../common/InputStyle'
import Constants from '../../controller/Constants'
import CommonAPIs from '../../controller/APIs/CommonAPIs'
import ShowError from '../common/ShowError'

const ConfirmPassScreen = () => {
    const navigation = useNavigation()

    const [pass, setPass] = useState('')
    const [passConfirm, setPassConfirm] = useState('')

    const route = useRoute()
    const phone = route.params?.phone
    const accessToken = route.params?.accessToken

    const handleOnClickSetUp = () => {
        if (pass.length == 0) {
            Alert.alert('Thông báo', 'Vui lòng nhập mật khẩu')
            return
        } else if (passConfirm.length == 0) {
            Alert.alert('Thông báo', 'Vui lòng nhập xác nhận mật khẩu')
            return
        } else if (pass !== passConfirm) {
            Alert.alert('Thông báo', 'Mật khẩu xác nhận sai, vui lòng nhập lại')
            return
        }

        RNProgressHud.showWithStatus('Loading...')
        CommonAPIs.setPassword(phone, pass, accessToken)
            .then((res) => {
                navigation.navigate(Constants.screenName.login)
            })
            .catch((err) => {
                ShowError(err)
            })
            .finally(() => {
                RNProgressHud.dismiss()
            })
    }

    return (
        <>
            <Background color='white' />
            <ScrollView style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.content}>
                        <Text style={styles.textSet}>Set your password</Text>
                        <Image source={Constants.image.icConfirm} style={styles.img} />
                        <Text style={styles.textContent}>Input new password </Text>
                        <InputStyle
                            name={'Password'}
                            value={pass}
                            onChange={(value) => setPass(value)}
                            style={styles.boxPass}
                        />
                        <InputStyle
                            name={'Confirm Password'}
                            value={passConfirm}
                            onChange={(value) => setPassConfirm(value)}
                            style={styles.boxPassConfirm}
                        />
                        <TouchableOpacity style={styles.boxContinue} onPress={handleOnClickSetUp}>
                            <Text style={styles.textContinue}>Set up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    content: {
        flex: 1,
        backgroundColor: Constants.color.backgroundBelow,
        width: 325,
        height: 482,
        marginHorizontal: 25,
        marginTop: 88,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: Constants.color.shadowBlack,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        elevation: 4,
        shadowRadius: 20,
        borderRadius: 20,
        marginBottom: 10
    },

    box: {
        flex: 1,
        alignItems: 'center'
    },

    textSet: {
        fontSize: 24,
        color: Constants.color.header,
        marginTop: 43,
        marginBottom: 40,
        fontFamily: Constants.font.fontPPBold
    },

    img: {
        width: 102.91,
        height: 109.72
    },

    textContent: {
        fontSize: 14,
        color: Constants.color.textContent,
        marginTop: 25,
        textAlign: 'center',
        fontFamily: Constants.font.fontPPBold,
        marginHorizontal: 41
    },

    boxPass: {
        marginTop: 18
    },

    boxPassConfirm: {
        marginTop: 15
    },

    boxContinue: {
        backgroundColor: Constants.color.buttonColor,
        width: 285,
        height: 46,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },

    textContinue: {
        fontSize: 14,
        color: Constants.color.textButtonColor,
        fontWeight: 'bold'
    }
})
export default ConfirmPassScreen
