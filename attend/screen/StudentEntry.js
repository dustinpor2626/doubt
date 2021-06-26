import React, {Component} from 'react';

import {Text,StyleSheet,View,TextInput,ScrollView,TouchableOpacity,AsyncStorage} from 'react-native';



class StudentEntry extends Component
{
    state = {
      name:'',
      enroll:'',
      roll:'',

      current_student:[],
    }

componentDidMount(){
   this.getTableInfo();
}


static navigationOptions =()=>
({
  headerTitle : () => (<Text style={styles.title}>Student Entry</Text>),
  headerTintColor: '#F5F5DC',
  headerStyle:{backgroundColor:'#4E387E'},
})






getTableInfo = () => {
  let data = {
    TableName:this.props.navigation.state.params.TableName,
    Semester:this.props.navigation.state.params.Semester,
    Subject:this.props.navigation.state.params.Subject,
    rand1: 1 + Math.floor(Math.random()*150),
    rand2 :1 + Math.floor(Math.random()*150),
    rand3: 1 + Math.floor(Math.random()*150),
  }

  this.saveTable(data);
}


saveTable = async (new_data) => {
      const existing = await AsyncStorage.getItem('Table');
      let students = JSON.parse(existing);
      if(!students){
        students = [];
      }
      students.push(new_data);
      await AsyncStorage.setItem('Table',JSON.stringify(students));
}



  saveSync = (temp) => {
    let data = {
      Name:this.state.name,
      Enroll:this.state.enroll,
      Roll:this.state.roll,
    }

    this.saveTemp(data,temp);
  }


  saveData = async (new_data,save) => {

  if(new_data.Name !== '' && new_data.Enroll !== '' && new_data.Roll !== ''){
        const existing = await AsyncStorage.getItem(this.props.navigation.state.params.TableName);
        let students = JSON.parse(existing);
        if(!students){
          students = [];
        }
        students.push(new_data);
        await AsyncStorage.setItem(this.props.navigation.state.params.TableName,JSON.stringify(students)).
        then(() =>  this.props.navigation.navigate('StudentEntry'))
    }else{
          if(save === 'save'){
          this.gonavigate();
          }else{
          alert('Incomplete Info');
          this.name.clear();
          this.enroll.clear();
          this.roll.clear();
          }
      }

    if(save === 'save')
    {
      this.gonavigate();
    }


    this.name.clear();
    this.enroll.clear();
    this.roll.clear();

  }


  saveTemp = (temp,save) => {

  if(temp.Name !== '' && temp.Enroll !== '' && temp.Roll !== ''){
    this.setState({
      current_student:[...this.state.current_student,temp]
    });
  }

      this.saveData(temp,save);
  }



gonavigate = () => this.props.navigation.navigate('CreateTable');

    render(){

  return(
      <View style={styles.container}>
          <TextInput
          style={styles.text_input}
          ref={input => { this.name = input }}
          placeholder='enter name'
          onChangeText={(Text) => this.setState({name:Text})} />

          <TextInput
          style={styles.text_input}
          ref={input => { this.enroll = input }}
          placeholder='enter enroll'
          onChangeText={(Text) => this.setState({enroll:Text})} />

          <TextInput
          style={styles.text_input}
          ref={input => { this.roll = input }}
          placeholder='enter roll'
          onChangeText={(Text) => this.setState({roll:Text})} />

          <View style={styles.button_container}>
              <TouchableOpacity
              onPress = {() => this.saveSync('add')} >
                <View style={styles.createButton}><Text style={styles.button_text}>Add Another</Text></View>
              </TouchableOpacity>

              <TouchableOpacity onPress ={() => {
                this.saveSync('save');
              }}>
                <View style={styles.createButton}><Text style={styles.button_text}>Save</Text></View>
              </TouchableOpacity>
         </View>

            <ScrollView style={{width:'100%'}}>
            {this.state.current_student.reverse().map((data,i) => {
                  return(
                      <View key={i} style={styles.listContainer}>
                          <View style={styles.roll}><Text> {data.Roll} </Text></View>
                          <View style={styles.enroll}><Text>{data.Enroll}</Text></View>
                          <View style={styles.name}><Text> {data.Name}</Text></View>
                      </View>
                  );})
                }

            </ScrollView>

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
    borderBottomWidth:1,
    borderColor:'#B048B5',
    alignItems:'center',
    width:300,
    marginBottom:8,
    borderRadius:3,
    fontSize:15,
    color:'#583759',
  },

  container:{
    height:'100%',
    width:'100%',
    paddingTop:20,
    backgroundColor:'#FDEEF4',
    alignItems:'center',
    justifyContent:'center',
  },

  createButton:{
    height:40,
    width:120,
    backgroundColor:'#25383C',
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    borderRadius:5,
  },

listContainer:{
  height:60,
  width:'100%',
  flexDirection:'row',
  borderBottomWidth:1,
  borderColor:'black',
  alignItems:'center',
  justifyContent:'center',
},

roll:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
},

enroll:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
},

name:{
  flex:2,
  alignItems:'center',
  justifyContent:'center',
},

  button_container:{
    flexDirection:'row',
  },

  button_text:{
    color:'white',
  }

});

export default StudentEntry;
