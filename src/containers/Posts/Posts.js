import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Post from '../../components/Post/Post';
import axios from '../../axios-messages'

class Posts extends Component {
    state = {
        posts: [],
        loading: true
    }

    componentDidMount() {
        //I only fetch posts when this is loaded, I can't go there without remounting and therefore I don't need componentDidUpdate
        axios.get('/posts.json')
            .then(res=> {
                console.log("post data" + res.data);
                const fetchedPosts = [];
                for (let key in res.data) {
                    fetchedPosts.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, posts: fetchedPosts});
            })
            .catch(err => {
                this.setState({loading: false})
            });
    }  

    render() {
        console.log(this.state.posts)
        return (
            <div>
                <Typography variant="h3" component="h3" gutterBottom style={{margin:8}}>
                Posts
                </Typography>

                <div>
                    {this.state.posts.map(post => (
                        <Post key={post.id}
                        title={post.postData.postTitle}
                        body={post.postData.postBody}
                        author = {post.postData.postAuthor} />
                    ))}
                </div>

            </div> 
        );
    }
}


export default Posts