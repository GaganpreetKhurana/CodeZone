import React from "react";
import { connect } from "react-redux";
import ChatWindow from "./ChatWindow";

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

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: "center",
}));

class StudentsList extends React.Component {
  render() {
    return (
        <Grid item m={2} xs={3}>
            <Paper elevation={4}>
            <Card sx={{ minWidth: 0 }}>
            <Div >Student List</Div>
            <CardContent>
            {/* iterate over teachers and then  students list here */}
            <List sx={{ width: '100%', maxWidth: 360}}>
            {[1, 2, 3].map((value) => (
                <ListItem
                key={value}
                secondaryAction={
                    <ChatWindow>
                    </ChatWindow>
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
export default connect(mapStateToProps)(StudentsList);
