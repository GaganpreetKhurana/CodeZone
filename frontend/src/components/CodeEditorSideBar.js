import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ChatWindow from "./ChatWindow";

//Material UI
import { Grid} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Paper} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
export default function CodeEditorSideBar(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const {students,user} = props;
  console.log(students,user);
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    textAlign: "center",
  }));
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <Grid item m={12} xs={3}>
            <Paper elevation={4}>
            <Card sx={{ minWidth: 360 }}>
            <Div >Enrolled List</Div>
            <CardContent>
            {/* iterate over teachers and then  students list here */}
            <List sx={{ width: '100%', maxWidth: 360}}>
            {students.map((value) => (
                <ListItem
                key={value._id}
                secondaryAction={
                    <ChatWindow self={user} other={value}>
                    </ChatWindow>
                }
                >
                <ListItemButton>
                <ListItemAvatar>
                    <Avatar><AccountCircleIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${value.name}-${value.SID}`} />
                </ListItemButton>
                <Divider />
                </ListItem>
            ))}
            </List>
            </CardContent>
            </Card>
        </Paper>
        </Grid>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Student List</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}