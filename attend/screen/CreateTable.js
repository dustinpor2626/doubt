import React, {Component} from 'react';

import {StyleSheet,View,TouchableOpacity,AsyncStorage,ScrollView, ImageBackground ,Modal,Image} from 'react-native';
import { Header,Title,Container,Left,Body,Button,Icon,Card,CardItem,Text} from 'native-base';

class CreateTable extends Component{

state = {
  TableData:[],
}

componentDidMount()
{

  setInterval(() =>{
    this.storeData();
  },100)

}

storeData = async () =>
{

  try {
    let x = await AsyncStorage.getItem('Table');
    let y = JSON.parse(x);
    if(y){
    this.setState({TableData:y});
  }
  } catch (e) {
    console.log(e);
  }

}



  render(){
    return(
      <ImageBackground source={require('./images/space.jpg')} style={{height:'100%',width:'100%'}} blurRadius={1}>


        <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.navigate('CreateTableForm')}>
            <Title style={{marginLeft:20}}>Create</Title>
          </Button>
        </Left>
        <Body>
        </Body>
       </Header> 

	
      <ScrollView >

        {this.state.TableData.map((data,i) => {

          return(
          <TouchableOpacity
            key={i}
            onPress = {() => this.props.navigation.navigate('AboutTable',{
              TableName:data.TableName,
              Semester:data.Semester,
              Subject:data.Subject,
            })}>


            <View 
              style={{
                height:120,
                width:'100%',
                backgroundColor:'rgba('+data.rand1+','+data.rand2+','+data.rand3+',0.9)',
                justifyContent:'center',
                alignItems:'center',
                flexDirection:'row',
                marginTop:5,
                marginBottom:6,
                borderColor:'white',
                borderWidth:1,
                overflow:'hidden',
              }}
            >
                <View style={styles.listContent}>
                      <View style={styles.listSubContent}>
                          <View style={styles.sem}><Text style={styles.textStyle}>{data.Semester}</Text></View>
                          <View style={styles.sub}><Text style={styles.subtextStyle}>{data.Subject}</Text></View>
                      </View>
                  </View>
                <View style = {styles.listContent}><View style={styles.name}><Text style={styles.textStyle}>{data.TableName}</Text></View></View>
            </View>
            </TouchableOpacity>
          );
        })}

      </ScrollView>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({

  listContent:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },

  listSubContent:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },

  sem:{
    paddingRight:15,
    paddingLeft:15,
    alignContent:'center',
    justifyContent:'center',
    marginBottom:15,
    paddingBottom:5,
    paddingTop:5,
    borderRadius:10,
  },

  subtextStyle:{
    fontSize:25,
    color:'white',
    textShadowOffset:{width:1,height:1},
    textShadowColor:'white',
    textShadowRadius:5,
    letterSpacing:2,
  },

  sub:{
    paddingRight:15,
    paddingLeft:15,
    alignContent:'center',
    justifyContent:'center',
    paddingTop:5,
    paddingBottom:5,
    borderRadius:10,
  },

  name:{
    paddingRight:20,
    paddingLeft:20,
    alignContent:'center',
    justifyContent:'center',
    paddingTop:5,
    paddingBottom:5,
    borderRadius:10,
  },

  createButton:{
    height:30,
    width:100,
    backgroundColor:'#C2B280',
    justifyContent:'center',
    alignItems:'center',
    margin:10,
    borderRadius:5,
  },

  title:{
    fontSize:23,
    color:'#FFF8C6',
    textShadowOffset:{width:0.5,height:0.5},
    textShadowColor:'#FFF8DC',
    textShadowRadius:1,
  },

  textStyle:{
    fontSize:18,
    color:'white',
    textShadowOffset:{width:1,height:1},
    textShadowColor:'white',
    textShadowRadius:5,
    letterSpacing:2,
  },
});

export default CreateTable;
