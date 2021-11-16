import React from "react";
import { connect } from "react-redux";

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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: "center",
}));

class DiscussionPortal extends React.Component {
  render() {

    return (
        <Grid item xs={4} m={2} > 
        <Grid item xs={4} m={2} > 
          <Paper elevation={4} component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
              <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Post A Classroom Query or Notification"
              inputProps={{ 'aria-label': 'search google maps' }}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
              <PostAddIcon />
              </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={4} m={2} > 
        </Grid>
          {/* displaying old posts of classroom */}
          <Paper elevation={4}>
            <Card sx={{ minWidth: 0 }}>
            <Div>Student List</Div>
            <CardContent>
            {/* iterate over teachers and then  students list here */}
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {[1, 2, 3].map((value) => (
                <ListItem
                key={value}
                disableGutters
                secondaryAction={
                    <IconButton>
                    <CommentIcon />
                    </IconButton>
                }
                >
                <ListItemButton>
                <ListItemAvatar>
                    <Avatar><AccountCircleIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary={`Student sid ${value}`} />
                </ListItemButton>
                <Divider />
                </ListItem>
            ))}
            </List>
            </CardContent>
            </Card>
        </Paper>
             
              <div className="post-wrapper">
                <div className="post-header">
                    <div className="post-avatar">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSH4dcYWVFHFsz8M3Rsjpy2Hg6gQAmgbCIwWA&usqp=CAU"
                      alt="user-pic"
                    />
                    <div>
                      <span className="post-author">ABC</span>
                      <span className="post-time">12.10.2021 10:00AM</span>
                    </div>
                    </div>
                    <div className="post-content">Having doubt in compiler ques 2</div>
                    <div className="post-actions">
                    <div className="post-like no-btn">
                      {/* post liked or not */}
                      {true ? (
                        <img
                          style={{ width: 15, height: 15 }}
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTClMtw2rieYPxOLPFZV_MWCZMfGxcmiN9M3A&usqp=CAU"
                          alt="like post"
                        />
                      ) : (
                        <img
                          style={{ width: 15, height: 15 }}
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP4CNwjod7C14qrdU0_Qw8KdTkNES0XdMwPA&usqp=CAU"
                          alt="likes-icon"
                        />
                      )}
                      <strong> 10 Likes</strong>
                    </div>
                    <div className="post-comments-icon">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                        alt="comments-icon"
                      />
                      <span>1</span>
                    </div>
                    </div>
                    <div className="post-comment-box">
                      <input
                        placeholder="Start typing a comment"
                      />
                    </div>

                    <div className="post-comments-list">
                      {/* comments would be displayed here */}
                        <div className="post-comment-item">
                          <div className="post-comment-header">
                            <span className="post-comment-author">DEF</span>
                            <span className="post-comment-time">22.10.2021   11AM</span>

                            <div
                              className="post-comment-likes"
                            >
                              {false ? (
                                <span>
                                  <img
                                    style={{ width: 15, height: 10 }}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTClMtw2rieYPxOLPFZV_MWCZMfGxcmiN9M3A&usqp=CAU"
                                    alt="like comment"
                                  />
                                  <strong>0 Likes</strong>
                                </span>
                              ) : (
                                <span>
                                  <img
                                    style={{ width: 15, height: 10 }}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP4CNwjod7C14qrdU0_Qw8KdTkNES0XdMwPA&usqp=CAU"
                                    alt="likes-comment"
                                  />
                                  <strong>0 Likes</strong>
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="post-comment-content">Same Doubt</div>
                        </div>
                    </div>
                    
                  </div>
                </div>   
        </Grid>
    );
  }
}

function mapStateToProps(state) {
    return {
      auth: state.auth,
      darkModetheme: state.theme
    };
  }
export default connect(mapStateToProps)(DiscussionPortal);
