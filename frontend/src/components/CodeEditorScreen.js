import React from "react";
import { connect } from "react-redux";
import TextEditor from "./TextEditor";
import LanguageSelector from "./LanguageSelector";
//Material UI
import { Grid} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Paper} from '@mui/material';
import { styled } from '@mui/material/styles';

import Fab from '@mui/material/Fab';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: "center",
}));

class CodeEditorScreen extends React.Component {
  render() {
    const { userId,labId } = this.props.match.params;
    console.log(userId,labId);
    const {codeEditorDetails,editorLabDetails} = this.props.labDetails;
        // console.log("codeEditorDetails",codeEditorDetails.code);
        // console.log("editorLabDetails",editorLabDetails);
    return (
        <div>
          <Div>Classroom Lab</Div>
            <Grid
                spacing={2}
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center">

                <Grid item xs={6} m={2} >
                <LanguageSelector/>
                {(!userId && !labId) && <p> Error !! Please Refresh the Page</p>}
                {(userId && labId) && <TextEditor documentId={`${userId}+${labId}`}/> }   
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
                    <Fab variant="extended">
                      <PlayCircleIcon sx={{ mr: 1 }} color="primary" />
                      Execute Code
                    </Fab>
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
      darkModetheme: state.theme,
      labDetails: state.labDetails
    };
  }
export default connect(mapStateToProps)(CodeEditorScreen);
