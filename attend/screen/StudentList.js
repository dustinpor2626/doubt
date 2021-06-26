import React, {Component} from 'react';

import {Text,StyleSheet,View,TouchableOpacity,AsyncStorage,ScrollView} from 'react-native';

class StudentList extends Component{

  state = {
    student : [],
  }

componentDidMount(){
  this.storeData();
}

  static navigationOptions =()=>
  ({
    headerTitle : () => (<Text style={styles.title}>Student List</Text>),
    headerTintColor: '#F5F5DC',
    headerStyle:{backgroundColor:'#4E387E'},
  })


  storeData = async () =>
  {
    try {
      let x = await AsyncStorage.getItem(this.props.navigation.state.params.TableName);
      let y = JSON.parse(x);

      if(y){
          this.setState({student:y});
          }
     }catch(e) {
      console.log(e);
    }
  }


  goDatabase = (data) => this.props.navigation.navigate('StudentDatabase',{
    TableName : this.props.navigation.state.params.TableName,
    Semester : this.props.navigation.state.params.Semester,
    Subject : this.props.navigation.state.params.Subject,
    Name : data.Name,
    Enroll : data.Enroll,
    Roll : data.Roll,
  });



  render(){
    return(
      <ScrollView style={{backgroundColor:'#F0F8FF'}}>
      {this.state.student.map((data,i) => {
          return(
            <TouchableOpacity
            key={i}
            onPress = {() => this.goDatabase(data)}
            >
            <View  style={styles.listContainer}>
                <View style={styles.roll}><Text> {data.Roll} </Text></View>
                <View style={styles.enroll}><Text>{data.Enroll}</Text></View>
                <View style={styles.name}><Text> {data.Name}</Text></View>
            </View>
            </TouchableOpacity>
          );
      })}
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({

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

  title:{
    fontSize:23,
    color:'#54C571',
    textShadowOffset:{width:0.5,height:0.5},
    textShadowColor:'#FFF8DC',
    textShadowRadius:1,
    marginLeft:5,
  },

});

export default StudentList;
