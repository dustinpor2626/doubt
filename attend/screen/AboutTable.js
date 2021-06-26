import React, {Component} from 'react';

import {Text,ImageBackground,StyleSheet,View,TouchableOpacity,Alert} from 'react-native';

class AboutTable extends Component{


  static navigationOptions =()=>
  ({
    headerTitle : () => (<Text style={styles.title}>Table Info</Text>),
    headerTintColor: '#F5F5DC',
    headerStyle:{backgroundColor:'#4E387E'},
  })

//  goalert = () => {
//    Alert.alert('Warning','Whole data will get deleted!!!',[
//    {text:'CANCEl' , onPress : () => this.props.navigation.navigate('AboutTable')},      
//      {text:'OK' , onPress : () => this.props.navigation.navigate('RemoveTable',{
//                          TableName : this.props.navigation.state.params.TableName,
//                          Semester : this.props.navigation.state.params.Semester,
//                          Subject : this.props.navigation.state.params.Subject,
//      })
//     },
//
//    ]);
//  }


  render(){
    return(

      <ImageBackground
        source={require('./images/index_back.jpg')}
        style={{width:'100%',height:'100%'}}>

        <View style={styles.container}>

          <TouchableOpacity onPress = {() => this.props.navigation.navigate('TakeAttendance',{
            TableName : this.props.navigation.state.params.TableName,
            Semester : this.props.navigation.state.params.Semester,
            Subject : this.props.navigation.state.params.Subject,
          })}>
              <View style={styles.button}><Text style={styles.textStyle}>Student Attendance</Text></View>
          </TouchableOpacity>


          <TouchableOpacity onPress = {() => this.props.navigation.navigate('StudentList',{
            TableName : this.props.navigation.state.params.TableName,
            Semester : this.props.navigation.state.params.Semester,
            Subject : this.props.navigation.state.params.Subject,
          })}>
              <View style={styles.button}><Text style={styles.textStyle}>Student Database</Text></View>
          </TouchableOpacity>



          <TouchableOpacity onPress = {() => 
                           this.props.navigation.navigate('RemoveTable',{
                          TableName : this.props.navigation.state.params.TableName,
                          Semester : this.props.navigation.state.params.Semester,
                          Subject : this.props.navigation.state.params.Subject,
      })
        }>
              
              
              <View style={styles.button} ><Text style={styles.textStyle}>Delete Table</Text></View>
          </TouchableOpacity>

        </View>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

  title:{
    fontSize:23,
    color:'#54C571',
    textShadowOffset:{width:0.5,height:0.5},
    textShadowColor:'#FFF8DC',
    textShadowRadius:1,
    marginLeft:5,
  },

container:{
  alignItems:'center',
  justifyContent:'center',
  paddingTop:100,
},

button:{
  height:40,
  width:220,
  backgroundColor:'white',
  margin:40,
  alignItems:'center',
  justifyContent:'center',
  borderRadius:5,
  opacity:0.9,
  paddingBottom:10,
},

textStyle:{
  fontSize:18,
  color:'black',
  textShadowOffset:{width:1,height:1},
  textShadowColor:'black',
  textShadowRadius:5,
  letterSpacing:2,
  marginTop:10,
},

});

export default AboutTable;
