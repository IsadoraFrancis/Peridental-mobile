import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";
import { Colors } from "react-native/Libraries/NewAppScreen";



export const style = StyleSheet.create ({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        margin: 10,
    },
    boxTop:{
        height: Dimensions.get('window').height/3,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },

    logo:{
        height:90,
        width:90,
    },
    titulo:{
        fontWeight:'bold',
        marginTop: 40,
        fontSize: 20,
        color: themas.colors.secondary
    },

    user:{
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: themas.colors.bgText,
        borderRadius: 8,
    },
    password:{
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: themas.colors.bgText,
        borderRadius: 8,
    },
    
    boxButton:{
        height: Dimensions.get('window').height/3,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
    },

    button:{
        width: 200,
        height: 50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: themas.colors.details,
        borderRadius: 8,
    },

    textButton:{
        fontSize: 20,
        color:themas.colors.bgScreen,
        fontWeight:'bold',
    }
})