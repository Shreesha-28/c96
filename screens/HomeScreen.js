import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,TextInput,Modal,ScrollView,KeyboardAvoidingView,Image,Button} from 'react-native';
import db from'../config';
import firebase from 'firebase';
import {RFValue} from 'react-native-responsive-fontsize'
import { TouchableHighlightBase } from 'react-native';

export default class HomeScreen extends Component{
    state = {
        curTime: null,
        electricity:'',
        januaryE:'',
        januaryW:'',
        february:'',
        march:''
    }
    fetchElectricityDetails=async(text)=>{
        
            const electricityRef=await db.collection("electricity").where("month","==",text).get()
        electricityRef.docs.map((doc)=>{
            
            var electricity=doc.data().electricity
            this.setState({
                electricity:electricity
            })
        })
        //alert(this.state.electricity)
       
    }
    fetchWaterDetails=async(text)=>{
        
        //alert(this.state.curTime)
       const WaterRef=await db.collection("Water").where("month","==",text).get()
       WaterRef.docs.map((doc)=>{
           var Water=doc.data().Water
           this.setState({
            Water:Water
           })
       })
       //alert(this.state.electricity)
      
   }
   fetchElectricityJanuaryDetails=async(text)=>{
        
    const januaryRef=await db.collection("electricity").where("month","==",text).get()
januaryRef.docs.map((doc)=>{
    
    var january=doc.data().electricity
    this.setState({
        januaryE:january
    })
})

fetchWaterJanuaryDetails=async(text)=>{
        
    const januaryRef=await db.collection("water").where("month","==",text).get()
januaryRef.docs.map((doc)=>{
    
    var january=doc.data().water
    this.setState({
        januaryW:january
    })
})
//alert(this.state.electricity)

}
   }
    showCurrentDate=()=>{
       
    }
    componentDidMount(){ 
        //this.showCurrentDate()
        var month=new Date().getMonth()+1
        this.setState({
            curTime:month
        })
    }
    
    render(){
       
        return(
            <View style={styles.container}>
                
                <View style={{justifyContent:'flex-start'}}>
                <Text style={styles.title}>Resource Management System</Text>
            </View>
            <View style={{marginTop:-85,marginRight:-1400}}>
                <Button title="Log Out" color="orange" onPress={()=>{
                    this.props.navigation.navigate('WelcomeScreen')
                    firebase.auth().signOut()
                }}/>
            </View>
            <View style={{marginTop:100}}>
            <View style={{marginLeft:1000}}>
               <TouchableOpacity style={{backgroundColor:'orange',borderWidth:2,borderColor:'black',width:300,height:50,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.fetchElectricityDetails(this.state.curTime)}}>
                   <Text style={{color:'black',justifyContent:'center',alignItems:'center'}}>Press Me For Electricity Details</Text>
               </TouchableOpacity>
                </View>
                <Text>{this.state.electricity}</Text>

                <View style={{marginLeft:1000}}>
               <TouchableOpacity style={{backgroundColor:'orange',borderWidth:2,borderColor:'black',width:100,height:50,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.fetchElectricityJanuaryDetails(1)}}>
                   <Text style={{color:'black',justifyContent:'center',alignItems:'center'}}>JanuaryE</Text>
               </TouchableOpacity>
                </View>
                <Text>{this.state.januaryE}</Text>

                <View style={{marginTop:-50}}>
                <TouchableOpacity style={{backgroundColor:'orange',borderWidth:2,borderColor:'black',width:300,height:50,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.fetchWaterDetails(this.state.curTime)}}>
                   <Text style={{color:'black',justifyContent:'center',alignItems:'center'}}>Press Me For Water Details</Text>
               </TouchableOpacity>

                </View>
                
                
              <Text>{this.state.Water}</Text>
              <View style={{marginLeft:1000}}>
               <TouchableOpacity style={{backgroundColor:'orange',borderWidth:2,borderColor:'black',width:100,height:50,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.fetchWaterJanuaryDetails(1)}}>
                   <Text style={{color:'black',justifyContent:'center',alignItems:'center'}}>JanuaryW</Text>
               </TouchableOpacity>
                </View>
                <Text>{this.state.januaryW}</Text>
            </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    title:{
        flex:0.2,
        justifyContent:'flex-start',
        alignItems:'center',
        fontSize:65,
        borderWidth:5,
        backgroundColor:'orange'
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start',

    }
})