import {Component} from 'react';

import {AsyncStorage} from 'react-native';

class RemoveTable extends Component{

  state = {
    student:[],
    TableData:[],
    temp:this.props.navigation.state.params.TableName +
                    this.props.navigation.state.params.Semester +
                    this.props.navigation.state.params.Subject,
  }


componentDidMount(){
  this.storeData();
}


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

  try {
    let x = await AsyncStorage.getItem('Table');
    let y = JSON.parse(x);
    if(y){
    this.setState({TableData:y});
  }
  } catch (e) {
    console.log(e);
  }

  this.deleteTable();
}


deleteTable = async () => {
  this.state.student.map((data) => {
      let name = data.Name;
      let enroll = data.Enroll;
      let roll = data.Roll;
      let all = this.state.temp + name + enroll + roll;
        this.studentDataDeleted(all);
  } );


  this.deleteStudent();
}

deleteStudent = async () => {
  try {
  await AsyncStorage.removeItem(this.props.navigation.state.params.TableName);
    }
    catch(exception) {
        console.log(exception);
    }
  let data = {
      TableName:this.props.navigation.state.params.TableName,
      Semester:this.props.navigation.state.params.Semester,
      Subject:this.props.navigation.state.params.Subject,
    }

  this.deleteTableName(data);

}


deleteTableName = async (new_data) => {
    
  this.setState(pre => {
    return{
    TableData: pre.TableData.filter(data => {return data.TableName != new_data.TableName || data.Semester != new_data.Semester || data.Subject != new_data.Subject})
          }
            });
    

  let x = await AsyncStorage.getItem('Table');
  let y = JSON.parse(x);
  y = this.state.TableData;
  AsyncStorage.setItem('Table',JSON.stringify(y)).
  then(() =>  this.props.navigation.navigate('CreateTable'))

}


studentDataDeleted = async (data) => {
  try {
  await AsyncStorage.removeItem(data);
}
catch(exception) {
  console.log(exception);
}
}



  render(){
    return(
      null
    );
  }
}

export default RemoveTable;
