import { StatusBar } from 'expo-status-bar';
import { Image,Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to your React App!</Text>
      <Text>Enter Name:</Text>
      <TextInput placeholder='First Name'/>
      <Text>Enter Surname:</Text>
      <TextInput placeholder='Surname'/>
      <Button title='Add User'/>
      
      <StatusBar style="auto" />
      <View>
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
  }
});
