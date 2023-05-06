import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import imgLogo from './assets/logo-trip.png';

const MENSAGEM_EMAIL = "Digite o seu E-mail.";
const MENSAGEM_SENHA = "Digite a sua senha.";
const EMAIL = "eve.holt@reqres.in";
const SENHA = "cityslicka";


const ValidateLogin = async (email, senha, status, activity) => {
    if (email.trim().length === 0) {
        alert(MENSAGEM_EMAIL);
        return
    }

    if (senha.trim().length === 0) {
        alert(MENSAGEM_SENHA);
        return;
    }

    activity(true);

    let usuario = {
        "email": email,
        "password": senha
    };

    await fetch('https://reqres.in/api/login', {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(usuario)
    }).then(response => {
        if (response.status === 200) {
            response.text().then(function (result) {
                status("Usuário autenticado com sucesso.");
                console.log(result);
            });
        } else {
            status(`Usuário ou senha inválidos => código: ${response.status}`);
        }
        activity(false)
    }).catch(() => status("Não foi possivel executar o login."));
}

export default () => {
    const [user, setUser] = useState('eve.holt@reqres.in')
    const [password, setPassword] = useState('cityslicka')
    const [status, setStatus] = useState('')
    const [activity, setActivity] = useState(false)

    return (
        <View style={Estilos.container}>
            <Image style={Estilos.logo} source={require("./assets/logo-app.jpg")} />
            <TextInput
                autoCorrect={false}
                placeholder={MENSAGEM_EMAIL}
                placeholderTextColor="grey"
                style={Estilos.textInput}
                clearButtonMode="always"
                defaultValue={EMAIL}
                onChangeText={(value) => setUser(value)}
            />
            <TextInput
                autoCorrect={false}
                placeholder={MENSAGEM_SENHA}
                placeholderTextColor="grey"
                secureTextEntry={true}
                style={Estilos.textInput}
                clearButtonMode="always"
                defaultValue={SENHA}
                onChangeText={(value) => setPassword(value)}
            />
            <TouchableOpacity onPress={() => ValidateLogin(user, password, setStatus, setActivity)}>
                <Text style={Estilos.button}>LogIn</Text>
            </TouchableOpacity>
            <View style={{marginTop: 10}}>
                <ActivityIndicator size="large" animating={activity}/>
            </View>
            <Text style={Estilos.loginLabel}>{status}</Text>
        </View>
    )
};

const Estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#0D1E30',
        padding: 8,
    },
      logo: {
      width: 350,
      height: 200,
      alignSelf: 'center'
    },

    paragraph: {
        margin: 24,
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loginLabel: {
        color: 'white',
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#D53620',
        color: 'white',
        fontSize: 24,
        width: 239,
        height: 35,
        marginTop: 20,
        marginHorizontal: 0,
        paddingHorizontal: 0,
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 70
    },
    textInput: {
        backgroundColor: 'white',
        color: 'black',
        fontSize: 15,
        height: 40,
        width: 250,
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 5

    },
});
