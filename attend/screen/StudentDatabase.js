import React, {Component} from 'react';
import Calendar from 'react-native-calendar';

import {Text,StyleSheet,View,AsyncStorage} from 'react-native';


class StudentDatabase extends Component{

  state = {
    marked:null,
    dates :[],
    unique_date:[],
    present:'',
    class:'',
    class_num:[],
    storageName : this.props.navigation.state.params.TableName +
                  this.props.navigation.state.params.Semester +
                  this.props.navigation.state.params.Subject +
                  this.props.navigation.state.params.Name +
                  this.props.navigation.state.params.Enroll +
                  this.props.navigation.state.params.Roll ,

  }

componentDidMount(){
this.func();
}

func = async () => {
    let x = await AsyncStorage.getItem(this.state.storageName);
    let y = JSON.parse(x);
    if(y){
    this.setState({dates:y});
    var x2 = Array.from(new Set(this.state.dates));
    this.setState({unique_date:x2});
  }

  let z = await AsyncStorage.getItem(this.props.navigation.state.params.TableName + 'class');
  let z2 = JSON.parse(z);
  if(z2){
      this.setState({class_num:z2});
      var z3 = Array.from(new Set(this.state.class_num));
      this.setState({class:z3.length});
  }

  var obj = this.state.unique_date.reduce((c, v) => Object.assign(c, {[v]: {selected: true , selectedColor:'green'}}), {});
  this.setState({ marked : obj });

  this.setState({dates:this.state.unique_date});
  this.setState({present:this.state.unique_date.length});

  this.props.navigation.setParams({ name : this.props.navigation.state.params.Name});
}


static navigationOptions =({navigation})=>
({
  headerTitle : () => (<View ><Text style={styles.title}> {navigation.getParam('name')} </Text></View>),
  headerTintColor: '#F5F5DC',
  headerStyle:{backgroundColor:'#4E387E'},
})

  render(){

var attendance = (this.state.present*100)/this.state.class ;
    return(
      <View style={styles.container}>
        
        <Calendar 
        showControls
        customStyle = {{
            controlButton: {
                backgroundColor: 'blue',
                    },    
            hasEventCircle: {
                backgroundColor: 'wheat',
                    },
        }}
        eventDates = {this.state.dates}
        />

      <View style={styles.text_container }>
        <Text style={styles.textStyle}>Present    {this.state.present}</Text>
      </View>

      <View style={styles.text_container}>
        <Text style={styles.textStyle}>Total Classes    {this.state.class}</Text>
      </View>

      <View style={styles.text_container}>
        <Text style={styles.textStyle}>Attendance    {attendance} %</Text>
      </View>
        
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

  container:{
    paddingTop:5,
    backgroundColor:'#D1D0CE',
    height:'100%',
    width:'100%',
  },

  text_container:{
    marginTop:10,
  },

  textStyle:{
    fontSize:18,
    color:'black',
    textShadowColor:'black',
    textShadowRadius:2,
    letterSpacing:2,
  },

});

export default StudentDatabase;
