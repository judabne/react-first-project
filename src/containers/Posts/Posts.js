import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class Posts extends Component {
    render() {
        return (
            <div>
                <Typography variant="h3" component="h3" gutterBottom style={{margin:8}}>
                Posts
                </Typography>
            </div> 
        );
    }
}


export default Posts