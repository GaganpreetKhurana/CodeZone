import React from "react";
import { connect } from "react-redux";

//Material UI
import { Grid} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Paper} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: "center",
}));

class ChatBox extends React.Component {
  render() {

    return (
		<div>
			<Paper elevation={4}>
            <Card sx={{ minWidth: 0 }}>
            <Div >Chatting with Student 1</Div>
            <CardContent>
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

			<Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500 }}>
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


            </CardContent>
            </Card>
        </Paper>
		</div>
    );
  }
}

function mapStateToProps(state) {
    return {
      auth: state.auth,
      darkModetheme: state.theme
    };
  }
export default connect(mapStateToProps)(ChatBox);
