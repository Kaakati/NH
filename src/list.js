import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';

import {Actions, Scene, Router} from 'react-native-router-flux';

var DataList = []
var newPaymentsShow = []
const theUsername = ""
const apiURL = "https://api.nicehash.com/api?method=stats.provider&addr="

class ListOfData extends React.Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(DataList),
      algo: 0,
      balance: 0,
      username: "",
      usdBalance: 0,
      isLoading: false
    }
  }

  componentWillMount() {
    theUsername = this.props.userWallet
    console.log("Props Wallet" + " " +theUsername);
    const self = this;
    AsyncStorage.getItem("myKey").then((value) => {
        console.log(value)
        self.setState({ username: value })
    }).done()
  }

  componentDidMount() {
    this._fetchData();
    const self = this;

    AsyncStorage.getItem("myKey").then((value) => {
        console.log(value)
        self.setState({ username: value })
    }).done()

  }

  _fetchData() {
    const self = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    fetch(apiURL + theUsername)
    // fetch('https://api.nicehash.com/api?method=stats.provider.ex&addr=1GyKjXhve6Qqmyd8ziURHu8eybsQ1beC8v')
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      // console.log('parsed json', json.result)
      // console.log('parsed json', json.result.payments)

      const theAcceptedSpeed = json.result.stats[0].accepted_speed
      // console.log(theAcceptedSpeed * 1000);
      // console.log("==========");

      const theBalance = json.result.stats[0].balance
      // console.log(theBalance);
      // console.log("==========");
      const theUSDBalance = (json.result.stats[0].balance * 1800).toFixed(2) + " " +"USD";
      self.setState({
          usdBalance: theUSDBalance
      })

      const thePayments = json.result.payments
      newPaymentsShow = []
      for (i = 0; i < thePayments.length; i++) {
          console.log(thePayments[i].amount);
          newPaymentsShow.push(thePayments[i].amount)
      }

      self.setState({
        dataSource: ds.cloneWithRows(newPaymentsShow),
        balance: theBalance
      })
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }


  onSubmitEdit = () => {
    AsyncStorage.setItem('myKey', '1GyKjXhve6Qqmyd8ziURHu8eybsQ1beC8v')
    theUsername = this.state.username
    // const theUsername = {this.state.username}
    // whatever you want to do on submit
    AsyncStorage.getItem("myKey").then((value) => {
        console.log(value)
    }).done()
    console.log(theUsername)
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.topCells}>
          <Text>{this.state.algo}</Text>
          <Text>{this.state.balance}</Text>
          <Text>{this.state.usdBalance}</Text>
            <TextInput
              style={styles.input}
              textAlign="center"
              value={this.state.username}
              onChangeText={username => this.setState({username})}
              onSubmitEditing={this.submitEdit} />
            <TouchableHighlight onPress={this.onSubmitEdit}>
              <Text>Press this button to submit editing</Text>
            </TouchableHighlight>
        </View>
        <ListView style={styles.ListOfPayments}
          enableEmptySections = {true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <Text style={styles.tableRow}>{rowData}</Text>
          }
          />
        <Text>List</Text>
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
  },
  loader:{
    // position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderPosition: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    margin: 10,
    height: 40
  },
  topCells: {
    marginTop: 70
  },
  tableRow: {
    padding: 10,
    textAlign: 'right'
  },
  ListOfPayments : {
    flex: 1,
    marginTop: 75,
    padding: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = ListOfData
