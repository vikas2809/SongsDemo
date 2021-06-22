import React, { Component } from 'react';
import {
    View, Text, Image, Dimensions, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HTML from "react-native-render-html";

export default class SongsDetail extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            songDetails: {}
        }
    }
    async componentDidMount() {
        console.log('SongsDetails get data', await this.getData())
    }


    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('DETAILS')
            if (value !== null) {
                console.log('Value from get data', value)
                this.setState({
                    songDetails: JSON.parse(value)
                })
            }
        } catch (e) {
            // error reading value
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

    readabledate(date){
        
        let dateString = new Date(date).toUTCString();
        dateString = dateString.split(' ').slice(0, 4).join(' ');
        return dateString;
    }

    currencySymbol(currency){
        switch(currency){
            case 'USD' : return '\u0024';
        }
    }

    render() {
        const { songDetails } = this.state;
        const contentWidth = Dimensions.get('window').width;
        return (
            <ScrollView style={{ flex: 1, marginBottom: 20  }}>
                <Image source={{ uri: songDetails.artworkUrl100 }} style={{ marginBottom: 5, aspectRatio: 3/2 }} />
                <Text style={{ marginLeft: 20, fontSize: 20, color: '#2A81C7' }}>{songDetails.artistName}</Text>
                {this.renderSeparator()}
                <Text style={{ marginLeft: 20, marginBottom: 10, fontSize: 12, marginVertical: 10  }}>{songDetails.collectionName}</Text>
                {this.renderSeparator()}
                <Text style={{ marginLeft: 20, marginVertical: 5, fontSize: 18  }}>{songDetails.genre}</Text>
                {this.renderSeparator()}
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 18 }}>{this.readabledate(songDetails.releaseDate)}</Text>
                    <Text style={{ fontSize: 18 }}>{songDetails.country}</Text>
                </View>
                {this.renderSeparator()}
                <Text style={{ marginLeft: 20, marginVertical: 5, fontSize: 18  }}>{this.currencySymbol(songDetails.currency)}{songDetails.collectionPrice}</Text>
                {this.renderSeparator()}
                {songDetails.description && <HTML source={{ html: songDetails.description }} contentWidth={contentWidth} containerStyle={{ marginHorizontal: 20, marginTop: 10 }} />}
                {this.renderSeparator()}
                <Text style={{ marginLeft: 20, textAlign: 'center' }}>{songDetails.copyright}</Text>
            </ScrollView>
        )
    }
}