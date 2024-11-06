import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import {Button, Image, Text, View} from 'react-native';

export default function About() {
    return (
        <View style={{flex:  1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#fac055',
            fontFamily: 'sans-serif',
        }}>Sobre mim</Text>
        <Image 
                source={{ uri: 'https://avatars.githubusercontent.com/u/155779046?s=400&u=06d38b892a7e4e7f23f16a4f0c660bcbceace669&v=4' }}
                style={{ 
                    width: 150, 
                    height: 150, 
                    borderRadius: 75,
                    marginBottom: 30
                }} 
            />
        <Text style={{ 
            fontSize: 20, 
            fontWeight: '500', 
            color: '#333', 
            textAlign: 'center', 
            lineHeight: 26, 
            paddingHorizontal: 20, 
            fontFamily: 'sans-serif',
            marginBottom: 10,
            borderWidth: 5,
            borderColor: '#fac055',
            borderRadius: 10,
            paddingVertical: 5,
            margin: 80,
        }}>
           Gustavo Santos Gomes, tenho 17 anos, sou aluno da ETEC de Presidente Venceslau, curso o 2º ano do ensino médio integrado ao técnico em informática.
        </Text>
        <TouchableOpacity 
                onPress={() => {router.back()}} 
                style={{
                    backgroundColor: '#fac055',
                    paddingVertical: 10, 
                    paddingHorizontal: 20, 
                    borderRadius: 5, 
                }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Voltar</Text>
            </TouchableOpacity>
        </View>
    );
}