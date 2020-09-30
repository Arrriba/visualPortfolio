import React, { Component,PureComponent } from 'react';
import { View, Text, Button,Image } from 'react-native';

interface ITextComponentProps{
    message: string;
    parentFunction?: any;//? ca sa nu fie required intotdeauna
}

export default class TextComponent extends Component<ITextComponentProps>{
    private renderCount =0;

    render(){

        const {message,parentFunction}=this.props;
        this.renderCount++;
        return (
            <View>
        <Text>{message} rendered {this.renderCount} times.</Text>
        <Button title="Alert parent message" onPress={parentFunction}></Button>
        </View>
        );
    }
}

export class PureTextComponent extends PureComponent<ITextComponentProps>{
    private renderCount =0;

    render(){
        const {message}=this.props;
        this.renderCount++;

    return (
        <Text>{message} rendered {this.renderCount} times.</Text>
    );
    } 
}

export const StatelessTextComponent = (props: ITextComponentProps)=>(
    <Text>{props.message}</Text>
);
