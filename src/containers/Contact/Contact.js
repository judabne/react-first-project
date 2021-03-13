import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Emoji from '../../components/Emoji/Emoji'
import SendIcon from '@material-ui/icons/Send';
import axios from '../../axios-messages';
import CircularProgress from '@material-ui/core/CircularProgress';

class Contact extends Component {
    state = {
        messageForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'abc@def.com',
                    helperText: "Enter your email",
                    label: 'Email'
                },
                value: '',
                rows: 1
            },
            message : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'I want to say...',
                    helperText: "Enter your message",
                    label: 'Message'
                },
                value: '',
                rows: 4
            },
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
        let form = (
            <form onSubmit={this.messageSubmitHandler}>
                {formElementsArray.map(formElement => (
                    <TextField
                        key={formElement.id}
                        // label={formElement.elementConfig.label}
                        style={{ margin: 8 }}
                        placeholder={formElement.config.elementConfig.placeholder}
                        helperText={formElement.config.elementConfig.helperText}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        multiline
                        rows = {formElement.config.rows}
                        onChange = {(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button variant="contained" color="primary" type="submit" disableElevation style={{float: "right", margin: -8}}>
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
                {/* <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button> */}
            </div> 
        );
    }
}


export default Contact