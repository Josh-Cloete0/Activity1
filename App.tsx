import { StyleSheet, TextInput, Text, View, Button, Image, SafeAreaView, ScrollView  } from 'react-native';
import React from 'react';
import { Animated } from 'react-native';
import { useState, useRef, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RadioButton } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
          <NavigationContainer>
              <Stack.Navigator>
              <Stack.Screen name="Home" component={MainScreen} />
               <Stack.Screen name="ViewDetails" component={ViewDetails} />
              </Stack.Navigator>
          </NavigationContainer>
  );
}

// Animation Component
const FadeInView = (props:any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect (() => {
    Animated.timing(
      fadeAnim, {
        toValue:1,
        duration:3000,
        useNativeDriver:false
      }
    ).start();
  }, [fadeAnim]);

  return ( 
    <Animated.View style = {{
      ...props.style,
      opacity: fadeAnim,
    }} >
        {props.children}
    </Animated.View>
  );
};
function isEmpty(Value: any){
  //null or undefined
  return (Value == null) ||

  //has length and length is 0
  (Value.hasOwnProperty('length') && Value.length === 0) ||
  //is an Object and has no keys
  (Value.constructor === Object && Object.keys(Value).length === 0);
}


function MainScreen({ navigation}:any) {
  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');
  const [Error, setError] = useState(false);

  console.log("App starting up now.")

  return (

    <View >
       <SafeAreaView>
        <ScrollView>
       <View style={styles.mainPicture}>
        <Image style={styles.ImageSize}
          source={require('./Images/Welcome_to_react.png')} /> 
      </View>


       <Text style={styles.welcomeText}>Welcome your React App!</Text>
        <FadeInView>
          <Text style ={Error? styles.red : styles.blank}> </Text>
          {Error?"Please fill in all the fields":""}
        <View style={styles.InputFlex}>
        <Text style={styles.HeadingText}>Enter Name:</Text>
        <TextInput  style={styles.InputBoxs} 
                    placeholder="First Name"
                    onChangeText={newText => setName(newText) }
                    />
       </View>

        <View style={styles.InputFlex}>
        <Text style={styles.HeadingText}>Enter Surname:</Text>
        <TextInput style={styles.InputBoxs}
                    placeholder="Surname"
                    onChangeText={newText => setSurname(newText)}   />
        </View>


<Button title="Add User"
        onPress={() => {

          if ((isEmpty(Name)==false) && (isEmpty(Surname)==false)) {
          navigation.navigate('ViewDetails',
            { NameSend : Name,
              SurnameSend: Surname});

            console.log("Name: " + Name + "  Surname: " + Surname);
          setError(false);
          }
          else{
            setError(true);
          }
        }} />
        </FadeInView>
        <Text style={styles.red}>{Error}</Text>
        </ScrollView>
       </SafeAreaView>
    </View>

  );
}

function ViewDetails({navigation, route}:any) {
  const NameGet = route.params.NameSend ;
  const SurnameGet = route.params.SurnameSend
  const[selectedValue, setSelectedValue] = useState('0');
  const[ImageBlock, setImage]= useState(source =(''));
  
  // When outside return section you can use single-line comments

  /* you can also use multi-line comments
  This is an example.
  Use it frequently as it will help you to know and understand
  the different sections of your code.  
   */


  return(
    
    /* This is comments inside the return section */
    <View>
      <View>
    <View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{flex:0,alignItems:'center',justifyContent:'center'}}></View>
        <Text   style={{ fontSize: 34, color: 'white' }}> Welcome {NameGet} {SurnameGet} </Text>
        <Text>Pleas select what is your favourite coding language</Text>
      
      
        <View style={styles.RadioContainer}>
        <View style={styles.radioGroup}>
        

          <RadioButton.Android
            value="1"
            status={selectedValue === '1' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedValue('1')}
            color="#007BFF" />
          <Text style={styles.radioLabel}>
            React Native
          </Text>

        </View>
        <View style={styles.radioButton}>
          <RadioButton.Android
            value="2"
            status={selectedValue === '2' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedValue('2')}
            color="#007BFF" />
          <Text style={styles.radioLabel}>
            Kotlin
          </Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton.Android
            value="3"
            status={selectedValue === '3' ? 'checked' : 'unchecked'}
            onPress={() => setSelectedValue('3')}
            color="#007BFF" />
          <Text style={styles.radioLabel}>
            HMTL and CSS
          </Text>
          
  </View>
</View>
</View>

<View style={ {flex:1}}>
  <Text style={ {fontWeight:'bold',flex:0, paddingTop:40,justifyContent:'center',textAlign:'center',alignItems:'center',fontSize:26}}>View what your favourite programming language says about you :</Text>
  <Button title="Process"
          onPress={() => {

            switch(selectedValue) {
              case '1':
                setImage(require('./Images/react.png'));
                break;
              case '2':
                setImage(require('./Images/kotlin.png'));
                break;
              case '3':
                setImage(require('./Images/html.png'));
                break;
              default:
                setImage((''));
            }
          }}
    />
        </View> 
        </View>
        <View style ={styles.RadioContainer}>
          <Image source={ImageBlock} style={styles.ViewImage}></Image>
        </View>
        </View>
        </View>

    );
};


const styles = StyleSheet.create({
  welcomeText: {
paddingTop: 40,
color: 'purple',
fontWeight: 'bold',
fontSize: 28,
textAlign: 'center',
},

  ImageSize: {
    width:350,
    height:350
  },

  mainPicture: {
    paddingTop:40,
    justifyContent:'center',
    alignItems: 'center'
  },

  InputFlex:{
    fontSize:34,
    flexDirection:'row',
    marginTop:30,
    justifyContent:'space-evenly',

  },

  InputBoxs:{
    fontSize:32,
    backgroundColor:'yellow',
    paddingHorizontal:20,
    width:150,
  },

  HeadingText:{
    fontSize:32
  },

  red:{
    color: 'red',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center'
  },

  blank: {
    color: 'transparent',
  },

  RadioContainer:{
    flex:0,
    backgroundColor:'#F5F5F5',
    justifyContent:'center',
    alignItems:'center',
  },
  radioGroup:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    marginTop:20,
    borderRadius:8,
    backgroundColor:'white',
    padding:16,
    elevation:4,
    shadowColor:'#000',
    shadowOffset:{width:0,height:2},
    shadowOpacity:0.25,
    shadowRadius:3.84,
  },

  radioButton:{
    flexDirection:'row',
    alignItems:'center',
  },

  radioLabel:{
    marginLeft:8,
    fontSize:16,
    color:'#333',
  },
  ViewImage:{
    width:350,
    height:350,
  alignContent:'center',}
});