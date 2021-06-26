import React, {Component} from 'react';

import {Text,StyleSheet,View,TouchableOpacity,AsyncStorage,ScrollView, Button} from 'react-native';



class TakeAttendance extends Component
{

  state = {
    student:[],
    Today_Attendence:[],
    store_date:null,
    TodayAttendance:this.props.navigation.state.params.TableName +
                    this.props.navigation.state.params.Semester +
                    this.props.navigation.state.params.Subject,

  }


  componentDidMount()
  {
      this.storeData();
      setInterval(() =>{
        this.props.navigation.setParams({ present: this.state.Today_Attendence.length});
      },1000)
  }


storeData = async () =>
{

  try {
    let x = await AsyncStorage.getItem(this.props.navigation.state.params.TableName);
    let x2 = await AsyncStorage.getItem(this.state.TodayAttendance) ;

    let y = JSON.parse(x);
    let y2 = JSON.parse(x2);

    if(y){
    this.setState({student:y});
  }

   if(y2){
    this.setState({Today_Attendence:y2});
  }


  } catch (e) {
    console.log(e);
  }

}


delete_Today_attendance = async () => {
	  try {
 	 await AsyncStorage.removeItem(this.state.TodayAttendance);
	var x=[];
	this.setState({Today_Attendence:x});

   		 }
    catch(exception) {
        console.log(exception);
    			}
	}


static navigationOptions =({navigation})=>
({

  headerTitle : () => (<Text style={styles.title}>Attendance</Text>),
  headerTintColor: '#F5F5DC',
  headerStyle:{backgroundColor:'#4E387E'},
  headerRight:() => (
		 <View style={styles.present}><Text> {navigation.getParam('present')} </Text></View>
  		),
})



push_data = async (index) => {

  let i =0;
  this.state.Today_Attendence.forEach(function(data){
    if(data === index){
        i = 1 ;
    }
  });

    if(i === 0)
      {
        const existing  = await AsyncStorage.getItem(this.state.TodayAttendance);
        let students_present = JSON.parse(existing);
        if(!students_present){
          students_present = [];
        }
         students_present.push(index);
         AsyncStorage.setItem(this.state.TodayAttendance,JSON.stringify(students_present));
         this.setState({
           Today_Attendence:[...this.state.Today_Attendence,index]
         });

      }else{
        this.remove(index);
      }
}



remove = async (index) => {
  this.setState(pre => {
    return{
    Today_Attendence: pre.Today_Attendence.filter(data => {return data !== index})
          }
              });
  const existing  = await AsyncStorage.getItem(this.state.TodayAttendance);
   let students_present = JSON.parse(existing);
   students_present = this.state.Today_Attendence;
   AsyncStorage.setItem(this.state.TodayAttendance,JSON.stringify(students_present));
}


chooseColor = (index) => {
let i =0;
this.state.Today_Attendence.forEach(function(data){
  if(data === index){
      i = 1 ;
  }
});

  if(i === 0)
    {
      return 'white';
    }else{
      return '#728C00';
    }
}


saveTodayAttendance = () => {

let today = new Date();

let month = today.getMonth()+1;
month =  month < 10 ? '0' + month : '' + month;
let date = today.getDate();
date =  date < 10 ? '0' + date : '' + date;

let all = today.getFullYear() + '-' + month + '-' +date;

 this.saveDateAsync(all);

 if(this.state.TodayAttendance.length)
      this.totalclass(all);
}


totalclass = async (date) => {

  const existing = await AsyncStorage.getItem(this.props.navigation.state.params.TableName + 'class');
  let classes = JSON.parse(existing);
  if(!classes){
    classes = [];
  }
  classes.push(date);
  await AsyncStorage.setItem(this.props.navigation.state.params.TableName + 'class',JSON.stringify(classes));

}



saveDateAsync = async (date) => {

this.state.Today_Attendence.map((data) =>
{
    let name = this.state.student[data].Name;
    let enroll = this.state.student[data].Enroll;
    let roll = this.state.student[data].Roll;
    let all = this.state.TodayAttendance + name + enroll + roll;
      this.storeAttendanceforEachStudent(all,date);
 });

}


storeAttendanceforEachStudent = async (storage_name,date) => {

    const existing  =  await AsyncStorage.getItem(storage_name);
    let students_present = JSON.parse(existing);
    if(!students_present){
      students_present = [];
    }
     students_present.push(date);
     await AsyncStorage.setItem(storage_name,JSON.stringify(students_present));
}

    render(){
        return(<View style={{paddingTop:10}}>
    <TouchableOpacity onPress={() => this.delete_Today_attendance()} >
    <View style={{marginLeft:20,height:30,width:70,backgroundColor:'wheat',borderRadius:5,alignItems:'center',justifyContent:'center'}}>
	<Text style={{alignItems:'center',justifyContent:'center'}}> Clear </Text></View>
    </TouchableOpacity>
          <ScrollView style={styles.container}>
          {this.state.student.map((data,i) => {
              return(
                <TouchableOpacity
                key = {i}
                 onPress = {() => this.push_data(i)}
                 disabled = {this.state.disable}>
                <View style={{backgroundColor:this.chooseColor(i)}}>
                    <View  style={styles.listContainer}>
                      <View style={styles.roll}><Text> {data.Roll} </Text></View>
                      <View style={styles.enroll}><Text>{data.Enroll}</Text></View>
                      <View style={styles.name}><Text> {data.Name}</Text></View>
                    </View>
                </View>
                </TouchableOpacity>
              );
          })}
          <View style={styles.button_container}>

              <TouchableOpacity
              onPress={() => {
                      this.saveTodayAttendance() ;
                      alert('Attendance Saved');
                      this.props.navigation.navigate('CreateTable');
                  }
              }
              >
              <View style={styles.createButton}><Text style={styles.button_text}>Save</Text></View>
              </TouchableOpacity>
          </View>

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

  present:{
    height:30,
    width:40,
    backgroundColor:'wheat',
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    borderRadius:5,
  },

  button_container:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },

  button_text:{
    color:'white',
  },

  createButton:{
    height:40,
    width:120,
    backgroundColor:'#25383C',
    justifyContent:'center',
    alignItems:'center',
    margin:30,
    borderRadius:5,
  },

  container:{
    height:'100%',
    width:'100%',
    paddingTop:5,
    backgroundColor:'#FDEEF4',
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

});

export default TakeAttendance;
