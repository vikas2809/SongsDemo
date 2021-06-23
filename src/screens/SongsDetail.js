import React, { Component } from 'react';
import {
    View, Text, Image, Dimensions, ScrollView, StyleSheet
} from 'react-native';
import HTML from "react-native-render-html";
import { COLOR_CODES } from 'App/src/utility/Theme';
import { getItem, readabledate, currencySymbol } from 'App/src/utility/Utility';

const contentWidth = Dimensions.get('window').width;
export default class SongsDetail extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            songDetails: {}
        }
    }

    async componentDidMount() {
        const _data = await getItem('DETAILS')
        this.setState({
            songDetails: JSON.parse(_data)
        })
    }


    renderSeparator = () => {
        return (
            <View style={styles.separatorContainer} />
        );
    };



    _renderItem(item){
        switch(item.type){
            case 'image': return <Image source={{ uri: item.data }} style={item.style} />
            case 'text': return <Text style={item.style}>{item.data}</Text>
            case 'separator': return this.renderSeparator()
            case 'releaseInfo': return this._renderReleaseInfo()
            case 'html' :  return item.data && <HTML source={{ html: item.data }} contentWidth={contentWidth} containerStyle={item.style} />
        }
    }

    _renderReleaseInfo(){
        const { songDetails } = this.state;
        return (
            <View style={styles.releaseInfo}>
                <Text style={{ fontSize: 18 }}>{readabledate(songDetails.releaseDate)}</Text>
                <Text style={{ fontSize: 18 }}>{songDetails.country}</Text>
            </View>
        )
    }

    render() {
        const { songDetails } = this.state;
        
        const _renderData = [
            {data: songDetails.artworkUrl100, style: {marginBottom: 5, aspectRatio: 3 / 2}, type: 'image'},
            {data: songDetails.artistName, style: {marginLeft: 20, fontSize: 20, color: COLOR_CODES.HEADER_COLOR}, type: 'text'},
            {type: 'separator'},
            {data: songDetails.collectionName, style: {marginLeft: 20, marginBottom: 10, fontSize: 12, marginVertical: 10}, type: 'text'},
            {type: 'separator'},
            {data: songDetails.genre, style: {marginLeft: 20, marginVertical: 5, fontSize: 18}, type: 'text'},
            {type: 'separator'},
            {type: 'releaseInfo'},
            {type: 'separator'},
            {data: currencySymbol(songDetails.currency)+songDetails.collectionPrice, style: {marginLeft: 20, marginVertical: 5, fontSize: 18}, type: 'text'},
            {type: 'separator'},
            {data: songDetails.description, style: {marginHorizontal: 20, marginTop: 10},type: 'html' },
            {type: 'separator'},
            {data: songDetails.copyright, style: {marginLeft: 20, textAlign: 'center'}, type: 'text'}

        ]
        return (
            <ScrollView style={{ flex: 1, marginBottom: 20 }}>
                {_renderData.map(item => this._renderItem(item))}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    releaseInfo:{
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        marginHorizontal: 20
    },
    textStyle: {
        marginLeft: 20, 
        textAlign: 'center'
    },
    separatorContainer: {
        height:1,
        width: "94%",
        backgroundColor: COLOR_CODES.GRAY_SCALE,
        marginLeft: "2%"
    }
})