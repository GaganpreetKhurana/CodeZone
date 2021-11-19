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
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListItemIcon from '@mui/material/ListItemIcon';


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
        {/* displaying old posts of classroom */}   

        <Paper elevation={4}>
          <Card>
            <CardHeader
              avatar={
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSH4dcYWVFHFsz8M3Rsjpy2Hg6gQAmgbCIwWA&usqp=CAU"
                      alt="user-pic" />
                }
              title="Student Name"
              subheader="Date Time"
            />
            <Divider />
                <ListItem>
                  <ListItemIcon>
                      <IconButton>
                          <CommentIcon />
                      </IconButton>
                  </ListItemIcon>
                  <ListItemIcon>
                      <IconButton>
                          <FavoriteIcon />
                      </IconButton>
                  </ListItemIcon>
                </ListItem>
            <Divider />
            <CardContent>
              <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
              <InputBase
              sx={{ ml: 1, flex: 1 }}
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
        </Paper>
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
