import { Dimensions, StyleSheet } from "react-native";
import { themes } from "../../global/themes";
import { Colors } from "react-native/Libraries/NewAppScreen";



export const style = StyleSheet.create ({
    container:{
        flex:1,
        alignItems:'center',
        margin: 25,
    },
    boxTop:{
        alignItems:'center',
        marginTop: 150
    },

    logo:{
        height:90,
        width:90,
    },
    titulo:{
        fontWeight:'bold',
        marginTop: 25,
        fontSize: 20,
        color: themes.colors.secondary
    },

    user:{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: themes.colors.bgText,
        borderRadius: 8,
        marginBottom: 25,
        marginTop: 25
    },
    password:{
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: themes.colors.bgText,
        borderRadius: 8,
        marginBottom: 25
    },

    button:{
        width: 330,
        height: 50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: themes.colors.details,
        borderRadius: 8,
    },

    textButton:{
        fontSize: 20,
        color:themes.colors.bgScreen,
        fontWeight:'bold',
    }
})