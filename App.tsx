import { StyleSheet, TextInput, Text, View, Button, Image, SafeAreaView, ScrollView } from 'react-native';
import { Animated } from 'react-native';
import { useState, useRef, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
};

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
function isEmpty(Value){
  //null or undefined
  (Value == null) ||

  //has length and length is 0
  Value.hasOwnProperty('length') && Value.length === 0 ||
  //is an Object and has no keys
  (Value.constructor === Object && Object.keys(Value).length === 0);
}


function MainScreen({ navigation}:any) {
  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');
  const [Error, setError] = useState('');

  console.log("App starting up now.")

  return (

    <View >
       <SafeAreaView>
        <ScrollView>
       <View style={styles.mainPicture}>
        <Image style={styles.ImageSize}
          source={require('./img/welcome_to_react.png')} /> 
      </View>


       <Text style={styles.welcomeText}>Welcome your React App!</Text>
        <FadeInView>
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

            console.log("The user's name is: " + Name + " Surname: " + Surname);
          setError('');
          }
          else{
            setError('Please fill in both fields')
          }/>
          </FadeInView>
            </ScrollView>
          }   </SafeAreaView>
    </View>

  );
}

function ViewDetails({navigation, route}:any) {
  const NameGet = route.params.NameSend ;
  const SurnameGet = route.params.SurnameSend
  // When outside return section you can use single-line comments

  /* you can also use multi-line comments
  This is an example.
  Use it frequently as it will help you to know and understand
  the different sections of your code.  
   */


  return(
    /* This is comments inside the return section */
    <View style={{  flex:1,alignItems:'center',
                    justifyContent:'center',
                    backgroundColor:'purple'}}>
      <Text style={{fontSize:34,color:'white'}}>
            Name: {NameGet} Surname: {SurnameGet} </Text>
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
  }

});