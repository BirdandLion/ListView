/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  TouchableHighlight,
  TextInput
} from 'react-native';

var Base_URL = "https://api.github.com/search/repositories?q=";

class ListViewDemo extends Component {

    constructor() {
        super();

        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
    }

    onSearchChange(event) {
        var searchTerm = event.nativeEvent.text.toLowerCase();
        var queryURL = Base_URL + encodeURIComponent(searchTerm);

        fetch(queryURL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.items),
                });
            })
            .catch(error => {
                var erroeMsg = "Bad" + error;
                console.log(erroeMsg);
            })
            .done()
    }

    _pressRow(rowID) {
        console.log(rowID);
    }

    renderRow(repo, sectionID, rowID, highlightRow) {
        return (
            <TouchableHighlight onPress={() => {
                this._pressRow(rowID);
                highlightRow(sectionID, rowID);
                }}>

                <View onSelect={(rowID) => this.selectRow(rowID)}>
                    <View style={styles.row}>
                        <Image
                            source={{uri: repo.owner.avatar_url}}
                            style={styles.profpic}
                        />
                        <View style={styles.textcontainer}>
                            <Text style={styles.title}>
                                {repo.name}
                            </Text>
                            <Text style={styles.subtitle}>
                                {repo.owner.login}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.cellBorder}>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    renderSectionHeader() {
        return (
            <View style={styles.sectionview}>
                <Text style={styles.sectiontext}>
                    2016 NBA Champion.
                </Text>
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View key={`${sectionID}-${rowID}`} style={{height: adjacentRowHighlighted ? 10 : 1}}>
            </View>
        );
    }

    render() {
        if (this.state.dataSource.getRowCount() === 0) {
            console.log("YES");
        }

        var content = this.state.dataSource.getRowCount() === 0 ?
            <Text style={styles.blanktext}>
                Please Enter a search term to see results.
            </Text> :
            <ListView
                ref="listview"
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                renderSectionHeader={this.renderSectionHeader}
                renderSeparator={this._renderSeparator}
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}
            />;

        return (
            <View style={styles.container}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Search for a project"
                    style={styles.searchBarInput}
                    onEndEditing={this.onSearchChange.bind(this)}
                />
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  searchBarInput: {
      marginTop: 30,
      padding: 5,
      fontSize: 15,
      height: 30,
      backgroundColor: '#EAEAEA',
  },

  row: {
      alignItems: 'center',
      backgroundColor: 'white',
      flexDirection: 'row',
      padding: 5,
  },

  cellBorder: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      height: 1,
      marginLeft: 4,
  },

  profpic: {
      width: 50,
      height: 50,
  },

  title: {
      fontSize: 20,
      marginBottom: 8,
      fontWeight: 'bold',
  },

  subtitle: {
      fontSize: 16,
      marginBottom: 8,
  },

  textcontainer: {
      paddingLeft: 10,
  },

  blanktext: {
      padding: 10,
      fontSize: 20,
  },

  sectionview: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      backgroundColor: 'gray'
  },

  sectiontext: {
      fontSize: 20,
  },
});

AppRegistry.registerComponent('ListViewDemo', () => ListViewDemo);
