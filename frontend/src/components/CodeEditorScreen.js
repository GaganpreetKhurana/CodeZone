import React from "react";
import { connect } from "react-redux";
import TextEditor from "./TextEditor";
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

class CodeEditorScreen extends React.Component {
  render() {
    return (
        <div>
            <Grid
                spacing={2}
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center">

                <Grid item xs={6} m={2} > 
                    <TextEditor/>
                </Grid>

                <Grid item xs={4} m={2} > 

                    <Grid
                    spacing={2}
                    container
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center">

                    <Grid item xs={8} m={2} > 
                        <Paper elevation={4}>
                        <Card sx={{ minWidth: 300 }}>
                        <Div >Code Input</Div>
                        <CardContent>
                        
                        </CardContent>
                        </Card>
                        </Paper>
                    </Grid>
                    <Grid item xs={8} m={2} > 
                        <Paper elevation={4}>
                        <Card sx={{ minWidth: 300 }}>
                        <Div >Code Output</Div>
                        <CardContent>
                        
                        </CardContent>
                        </Card>
                        </Paper>
                    </Grid>

                </Grid>
            </Grid>
            </Grid>
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
export default connect(mapStateToProps)(CodeEditorScreen);
