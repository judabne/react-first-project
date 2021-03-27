import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Emoji from '../../components/Emoji/Emoji'
import SendIcon from '@material-ui/icons/Send';
import axios from '../../axios-firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

class AddPost extends Component {
    state = {
        postForm: {
            postAuthor: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'This is my name',
                    helperText: "Enter your name",
                },
                value: '',
                rows: 1
            },
            postTitle: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'The Cool Post',
                    helperText: "Choose something catchy!",
                },
                value: '',
                rows: 1
            },
            postBody: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'I want to say...',
                    helperText: "Express yourself",
                },
                value: '',
                rows: 5
            },
        },
        loading: false
    }
    messageSubmitHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.postForm) {
            formData[formElementIdentifier] = this.state.postForm[formElementIdentifier].value;
        }
        const createdPost = {
            time: Date.now(), //in a real app recalculate price on the server
            postData: formData
        }
        console.log (createdPost);
        axios.post('/posts.json', createdPost)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/posts');
        })
        .catch(error => {
            this.setState({loading: false});
            console.log(error)
        }); //that's for Firebase. appended to base URL
    };

    inputChangedHandler = (event, inputIdentifier) => {
        //console.log(inputIdentifier + ": " + event.target.value)
        const updatedpostForm = {
            ...this.state.postForm
        } //for nested objects
        const updatedFormElement = {
            ...updatedpostForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedpostForm[inputIdentifier] = updatedFormElement;
        this.setState({postForm: updatedpostForm});
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.postForm){
            formElementsArray.push({
                id: key,
                config: this.state.postForm[key]
            });
        }
        let form = (
            <form onSubmit={this.messageSubmitHandler}>
                {formElementsArray.map(formElement => (
                    <TextField
                        key={formElement.id}
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
                    Post it {" "} <SendIcon style={{marginLeft: '10px'}}/>
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
                    Create a new post! <Emoji symbol="✍️"/>
                </Typography>
                {form}
                {/* <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button> */}
            </div> 
        );
    }
}


export default AddPost