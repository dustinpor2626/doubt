import React, {Component} from 'react';

import {Text,StyleSheet,View,TextInput,TouchableOpacity} from 'react-native';

class CreateTableForm extends Component{

  state={
    TableName:'',
    Semester:'',
    Subject:'',
  }


  static navigationOptions =()=>
({
    headerTitle : () => (<Text style={styles.title}>Table Info</Text>),
    headerTintColor: '#F5F5DC',
    headerStyle:{backgroundColor:'#4E387E'},
  })


moveTonxtScreen  = () => {
  if(this.state.TableName !== '' && this.state.Semester !== '' && this.state.Subject !== ''){
    this.props.navigation.navigate('StudentEntry',{
                  TableName:this.state.TableName,
                  Semester:this.state.Semester,
                  Subject:this.state.Subject,
                  });
}else{
  alert('Fill all Info');
  this.tablename.clear();
  this.semester.clear();
  this.subject.clear();
}
}

  render(){
    return(

      <View style={styles.container}>
          <View style={styles.subContainer}>
              <TextInput
              style={styles.text_input}
              ref={input => { this.tablename = input }}
              placeholder="Table Name"
              onChangeText = {(Text) => this.setState({TableName:Text})} />
          </View>
          <View style={styles.subContainer}>
              <TextInput
              style={styles.text_input}
              ref={input => { this.semester = input }}
              placeholder="Semester"
              onChangeText = {(Text) => this.setState({Semester:Text})} />
          </View>
          <View style={styles.subContainer}>
              <TextInput
              style={styles.text_input}
              ref={input => { this.subject = input }}
              placeholder="Subject"
              onChangeText = {(Text) => this.setState({Subject:Text})} />
          </View>

          <TouchableOpacity onPress={() => this.moveTonxtScreen()} >
          <View style={styles.createButton}><Text style={styles.textStyle}>Enter Student</Text></View>
          </TouchableOpacity>
      </View>
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
    marginLeft:10,
  },

  text_input:{
    borderBottomWidth:2,
    borderColor:'#B048B5',
    alignItems:'center',
    width:300,
    borderRadius:5,
    fontSize:17,
    color:'#583759',
    textShadowOffset:{width:1,height:1},
    textShadowColor:'black',
    textShadowRadius:2,
    marginBottom:30,
  },

  textStyle:{
    fontSize:18,
    color:'black',
    textShadowOffset:{width:1,height:1},
    textShadowColor:'#B048B5',
    textShadowRadius:5,
    letterSpacing:2,
    lineHeight:25,
  },

  subContainer:{
    alignItems:'center',
    justifyContent:'center',

  },

  container:{
    height:'100%',
    width:'100%',
    paddingTop:20,
    backgroundColor:'#E5E4E2',
  },

  createButton:{
    height:50,
    width:180,
    backgroundColor:'#F9966B',
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    borderRadius:5,
    marginLeft:90,
  },

});

export default CreateTableForm;
