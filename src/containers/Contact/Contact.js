import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Emoji from '../../components/Emoji/Emoji'
import SendIcon from '@material-ui/icons/Send';
import axios from '../../axios-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import HidingLogic from '../../hoc/HidingLogic/HidingLogic';
import { FormHelperText } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';


class Contact extends Component {
    state = {
        messageForm: {
            email: {
                elementType: TextField,
                elementConfig: {
                    type: 'email',
                    placeholder: 'abc@def.com',
                    helperText: "Enter your email",
                },
                value: '',
                rows: 1
            },
            message : {
                elementType: TextField,
                elementConfig: {
                    type: 'text',
                    placeholder: 'I want to say...',
                    helperText: "Enter your message",
                },
                value: '',
                rows: 4
            },
            urgent : {
                elementType: Select,
                elementConfig: {
                    menuOptions: [
                        {value: 'high', displayValue: 'High'},
                        {value: 'med', displayValue: 'Medium'},
                        {value: 'low', displayValue: 'Low'},
                    ],
                    helperText: "Shall we give it priority?",
                },
                value: 'low',
                displayValue: 'Low'
            }
        },
        loading: false
    }
    messageSubmitHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.messageForm) {
            formData[formElementIdentifier] = this.state.messageForm[formElementIdentifier].value;
        }
        console.log (formData);
        axios.post('/messages.json', formData)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false});
            console.log(error)
        }); //that's for Firebase. appended to base URL
    };

    inputChangedHandler = (event, inputIdentifier) => {
        //console.log(inputIdentifier + ": " + event.target.value)
        const updatedMessageForm = {
            ...this.state.messageForm
        } //for nested objects
        const updatedFormElement = {
            ...updatedMessageForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedMessageForm[inputIdentifier] = updatedFormElement;
        this.setState({messageForm: updatedMessageForm});
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.messageForm){
            formElementsArray.push({
                id: key,
                config: this.state.messageForm[key]
            });
        }
        var ElementType
        var dropDownOptions
        let form = (
            <form onSubmit={this.messageSubmitHandler}>
                {formElementsArray.map(formElement => (
                    <div style={{ margin: 8 }} key={formElement.id}>
                        {console.log(formElement)}
                        <HidingLogic>{ElementType = formElement.config.elementType}</HidingLogic>
                        <ElementType style={{ marginTop: 4, marginBottom: 2 }}
                            placeholder={formElement.config.elementConfig.placeholder}
                            // helperText={formElement.config.elementConfig.helperText}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows = {formElement.config.rows}
                            onChange = {(event) => this.inputChangedHandler(event, formElement.id)}   
                        >
                        <HidingLogic>{formElement.config.elementConfig.menuOptions !== undefined
                            ? dropDownOptions = formElement.config.elementConfig.menuOptions
                            : dropDownOptions = [{value: 'dummy', displayValue: 'Dummy'}]
                        }</HidingLogic>
                        {console.log(dropDownOptions)}
                        {dropDownOptions.map(menuItem => (
                            <MenuItem value={menuItem.value}>{menuItem.displayValue}</MenuItem>
                        ))}
                        </ElementType>
                        <FormHelperText>{formElement.config.elementConfig.helperText}</FormHelperText>
                    </div>
                    
                ))}
                <Button variant="contained" color="primary" type="submit" disableElevation style={{float: "right", margintTop: 10, marginRight: 8}}>
                    Send Message {" "} <SendIcon style={{marginLeft: '10px'}}/>
                </Button>
            </form>
        );
        
        if (this.state.loading) {           
            form = 
                <div style={{
                    marginTop: '10%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <CircularProgress  />
                </div>
        }
        return (
            <div>
                <Typography variant="h3" component="h3" gutterBottom style={{margin:8}}>
                    Leave us a message! <Emoji symbol="💬"/>
                </Typography>
                {form}
            </div> 
        );
    }
}


export default Contact