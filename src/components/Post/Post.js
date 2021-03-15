import React from 'react';
import Card from '@material-ui/core/Card'
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography'

const post = (props) => {
    
    console.log("props " + props.body)

    return (
        <div >
            <Card style={{marginBottom: '10px'}}>
                <div style={{background: '#f64c72'}}>
                    <h1 style={{marginTop: '0px', marginLeft: '10px', marginBottom: '0px', fontWeight: "bold", color: "white"}}>{props.title}</h1>
                </div>
                <div style={{background: '#f3f2ef', padding: '10px', textAlign: "justify"}}>
                    {props.body}
                </div>
                <div style={{display: "flex", justifyContent: "flex-end", paddingRight: '10px', background: '#e2eae0' }}>
                    Posted by {props.author}
                </div>
            </Card>
        </div>
    );
    
};

export default post