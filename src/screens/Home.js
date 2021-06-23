import React, { Component } from 'react';
import {
    View,Text, FlatList,StyleSheet, ActivityIndicator, Image, TouchableOpacity
} from 'react-native';
import Loader from 'App/src/components/loader/Loader';
import NetworkOps from 'App/src/network/Network';
import Songs from 'App/src/models/Songs';
import { storeItem } from 'App/src/utility/Utility';
import { COLOR_CODES } from 'App/src/utility/Theme';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            loading: false,
            songsList: [],
            refreshing: false
        }
    }

    componentDidMount(){
        this.fetchSongsList()
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
            <View style={styles.separatorContainer}/>
        );
    };

    renderFooter = () => {
        if(!this.state.loading) return null;
        return(
            <View style={styles.footerContainer}>
                <ActivityIndicator animating size="large" />
            </View>
    );
    }

    async navigateDetails(item){
        await storeItem('DETAILS',JSON.stringify(item));
        this.props.navigation.navigate('details')
    }

    handleRefresh = () => {
        this.fetchSongsList()
     }

    _renderItem(item){
        return (
                <TouchableOpacity key={item.description} style={styles.renderItemContainer} onPress={()=> this.navigateDetails(item)}>
                        <View>
                            <Image source={{ uri: item.artworkUrl100}} style={{ height: 100, width: 100 }}/>
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <Text>{item.collectionName}</Text>
                            <Text style={{ marginTop: 15 }}>{item.artistName}</Text>
                        </View>
                </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <Loader loading={this.state.loading} />
                <FlatList
                    data= {this.state.songsList}
                    renderItem={({ item })=> this._renderItem(item)}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent= {this.renderSeparator}
                    ListFooterComponent = {this.renderFooter}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_CODES.WHITE
    },
    renderItemContainer: {
        flexDirection: 'row', 
        marginVertical: 10, 
        marginHorizontal: 10
    },
    footerContainer: {
        paddingVertical: 1,
        borderTopWidth: 1,
        borderColor: COLOR_CODES.GRAY_SCALE
    },
    separatorContainer: {
        height:1,
        width: "94%",
        backgroundColor: COLOR_CODES.GRAY_SCALE,
        marginLeft: "2%"
    }
})