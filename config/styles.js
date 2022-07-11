import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    inputContainer:{
        width:'60%'
    },
    inputText:{
        borderColor: '#663399',
        borderStyle:'solid',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 10,
        marginLeft: 10,
        padding:10,
        width: 200,
    },
    buttonContainer:{
        marginLeft: 20,
        backgroundColor: '#663399',
        borderRadius:10,
        width: 70,
        alignItems:'center',
        justifyContent: "center",
        marginBottom: 10,
    },
    longerButtonContainer:{
        marginLeft: 20,
        backgroundColor: '#663399',
        borderRadius:10,
        width: 130,
        alignItems:'center',
        justifyContent: "center",
    },
    buttonText:{
        color: 'white'

    },
    image: {
        flex: 1,
        justifyContent: "center"
      },

})

export default styles;