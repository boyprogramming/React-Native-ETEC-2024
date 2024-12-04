import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'; // Certifique-se de importar o FileSystem
import { useConfig } from '../hooks/Config';


export function usePickImage() {
   const { directory } = useConfig();


   async function pickImage() {
       try {
           const result = await ImagePicker.launchImageLibraryAsync({
               mediaTypes: ImagePicker.MediaTypeOptions.All,
               allowsEditing: true,
               quality: 1,
               aspect: [1, 1],
           });


           if (!result.canceled) {  // Corrigido para 'canceled' ao invés de 'cancelled'
               const localUri = result.assets[0].uri;
               const filename = localUri.split('/').pop(); // nome do arquivo
               const newPath = `${directory}/${filename}`;


               // Move a imagem para o novo diretório


                
               await FileSystem.moveAsync({
                from: localUri,
                to: newPath,
            });


            return filename;
        } else {
            return "";  // Caso o usuário cancele a seleção
        }
    } catch (error) {
        console.log("pickImage", error);
        throw error;  // Lançando o erro para ser tratado no componente que utilizar a função
    }
}


return { pickImage };
}
