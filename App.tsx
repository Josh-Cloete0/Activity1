import { StatusBar } from 'expo-status-bar';
import { Image,Button, StyleSheet, Text, TextInput, View,} from 'react-native';
import { useState } from 'react';

export default function App() {
  const[Name,setName] = useState('');
  const[Surname,setSurname] = useState('');
  console.log("App Syarting up now.")

  return (
    <View style={styles.welcomeText}>
      <Text style={styles.welcomeText}>Welcome to your React App!</Text>
      <View style={styles.InputFlex}>
      <Text style={styles.HeadingText}>Enter Name:</Text>
      <TextInput style={styles.InputBoxs} placeholder='First Name' onChangeText={newText=>setName(newText)}/>



      </View>
      <Text style={styles.HeadingText}>Enter Surname:</Text>
      <TextInput style={styles.InputBoxs} placeholder='Surname' onChangeText={newText=>setSurname(newText)}/>
      <Button title='Add User' onPress={()=>{console.log("The users name is: " + Name +" Surname:"+ Surname)}}/>
      <StatusBar style="auto" />
    <View style={styles.mainPicture}>
        <Image source={require('./Images/Welcome_to_react.png')}/>
      </View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeText:{
    paddingTop:40,
    color:'purple',
    fontWeight:'bold',
    fontSize:20,
    textAlign:'center'
  },

  ImageSize:{
    width:350,
    height:350

  },

  mainPicture:{
    paddingTop:40,
    justifyContent:'center',
    alignItems:'center'
  },

  InputFlex:{
    flexDirection:'row',
    marginTop:30,
    justifyContent:'space-evenly'
  },

  HeadingText:{},

  InputBoxs:{},
});
