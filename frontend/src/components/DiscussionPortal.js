import React from "react";
import { connect } from "react-redux";
import { createPost,likePost, createComment,likeComment} from '../actions/posts';
//Material UI
import { Grid} from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PostAddIcon from '@mui/icons-material/PostAdd';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListItemIcon from '@mui/material/ListItemIcon';


class DiscussionPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      contentComment:'',
    };
  }
//posts
  handleOnClick = () => {
    // dispatch action
    const {classroomId} = this.props;
    if(this.state.content && classroomId){
      this.props.dispatch(createPost(this.state.content,classroomId));
      this.setState({
        content: '',
      });
    }
    
  };
  
  handleOnLikePostClick = (post_id) =>
    ()=>{
      this.props.dispatch(likePost(post_id));
    }
  
  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  
  //comment
  checkColor = (likes) =>{
    let {user} = this.props.auth;
    let likedByUser = likes.filter(({_id})=> _id ===user._id )
    if(likedByUser.length>0){
      return "secondary";
    }
  }
  handleChangeComment = (e) => {
    this.setState({
      contentComment: e.target.value,
    });
  };
  handleOnLikeCommentClick = (comment_id) =>
    ()=>{
      this.props.dispatch(likeComment(comment_id));
    }
  handleOnClickComment = () => {
    // dispatch action
    const {classroomId} = this.props;
    if(this.state.contentComment && classroomId){
      this.props.dispatch(createComment(this.state.contentComment,classroomId));
      this.setState({
        contentComment: '',
      });
    }
    
  };
  render() {
    const {posts} = this.props.classroom;
    const {user} = this.props.auth;
    let b;
    return (
        <Grid item xs={4} m={2} > 
        <Grid item xs={4} m={2} > 
          <Paper elevation={4} component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
              <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Post A Classroom Query or Notification"
              inputProps={{ 'aria-label': 'search google maps' }}
              value={this.state.content}
              onChange={this.handleChange}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
              <PostAddIcon onClick={this.handleOnClick} />
              </IconButton>
          </Paper>
        </Grid>
        {/* displaying old posts of classroom */}   
        {!posts.length && <p>No Posts exist for this classroom</p>}
        <Paper elevation={4}>
        {posts.length && 
          posts.map((post) => (
             
            <Card>
              <CardHeader
                avatar={
                  <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSH4dcYWVFHFsz8M3Rsjpy2Hg6gQAmgbCIwWA&usqp=CAU"
                        alt="user-pic" />
                  }
                title={post.user.name}
                subheader={`${post.createdAt.slice(
                  0,
                  10
                )}   ${post.createdAt.slice(11, 19)}`}
              />
              <Divider />
              <ListItem>
              {post.content}
              </ListItem>
              <Divider />
                  <ListItem>
                    <ListItemIcon>
                        <IconButton>
                             {post.comments.length}<CommentIcon />
                        </IconButton>
                    </ListItemIcon>
                    <ListItemIcon>
                        <IconButton color={this.checkColor(post.likes)}>
                        {post.likes.length}<FavoriteIcon onClick={this.handleOnLikePostClick(post._id)} />
                        </IconButton>
                    </ListItemIcon>
                  </ListItem>
              <Divider />
              <CardContent>
                <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                <InputBase
                sx={{ ml: 1, flex: 1 }}
                value={this.state.contentComment}
                onChange={this.handleChangeComment}
                placeholder="Start typing a comment"
                inputProps={{ 'aria-label': 'search google maps' }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <CommentIcon />
                </IconButton>
              </Paper>

              {/*Comments posted*/}
              <List sx={{ width: '100%'}}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Student 2" src="" />
                </ListItemAvatar>
                <ListItemText
                  primary="Student 2"
                  secondary={
                    <React.Fragment>
                      {"This is a sample comment"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
                          <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Student 3" src="" />
                </ListItemAvatar>
                <ListItemText
                  primary="Student 3"
                  secondary={
                    <React.Fragment>
                      {"This is a sample comment 2"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
            </CardContent>
            </Card>
          ))  
        }
        </Paper> 
        </Grid>
    );
  }
}

function mapStateToProps(state) {
    return {
      auth: state.auth,
      darkModetheme: state.theme,
      classroom: state.classroom
    };
  }
export default connect(mapStateToProps)(DiscussionPortal);
