import React, { Component } from 'react';
import {
    View,Text, FlatList,StyleSheet, ActivityIndicator, Image, TouchableOpacity
} from 'react-native';
import Loader from 'App/src/components/loader/Loader';
import NetworkOps from 'App/src/network/Network';
import Songs from 'App/src/models/Songs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            loading: false,
            songsList: []
        }
    }

    componentDidMount(){
        this.fetchSongsList()
    }
    
    storeData = async (value) => {
        console.log('Store Data',value)
        try {
          await AsyncStorage.setItem('DETAILS', value)
        } catch (e) {
          // saving error
        }
      }

    async fetchSongsList(){
        this.setState({ loading: true })
        const _results = []
        let response = await NetworkOps.getRaw('https://itunes.apple.com/search?term=Michael+jackson');
        if(response && Object.keys(response).length>0 && response.results.length > 0){
            this.setState({
                loading: false
            })
            response.results.forEach(element => _results.push(new Songs(element))); 
            this.setState({
                songsList: _results
            })
        }
    }

    renderSeparator = () => {
        return(
            <View
                style={{
                    height:1,
                    width: "94%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "2%"
                }}
            />
        );
    };

    renderFooter = () => {
        if(!this.state.loading) return null;
        return(
            <View
                style={{
                    paddingVertical: 1,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
                >
                <ActivityIndicator animating size="large" />
            </View>
    );
    }

    async navigateDetails(item){
        await this.storeData(JSON.stringify(item));
        this.props.navigation.navigate('details')
    }

    render(){
        return(
            <View style={styles.container}>
                <Loader loading={this.state.loading} />
                <FlatList
                    data= {this.state.songsList}
                    renderItem={({ item })=> <TouchableOpacity key={item.description} style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 10  }} onPress={()=> this.navigateDetails(item)}>
                        <View>
                            <Image source={{ uri: item.artworkUrl100}} style={{ height: 100, width: 100 }}/>
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <Text>{item.collectionName}</Text>
                            <Text style={{ marginTop: 15 }}>{item.artistName}</Text>
                        </View>
                        </TouchableOpacity>}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent= {this.renderSeparator}
                    ListFooterComponent = {this.renderFooter}
                    // refreshing={this.state.refreshing}
                    // onRefresh={this.handleRefresh}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    }
})