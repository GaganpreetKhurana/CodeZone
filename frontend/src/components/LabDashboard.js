import React, { Component } from 'react';
import { connect } from "react-redux";
import CodeEditorSideBar from "./CodeEditorSideBar";

//Material UI
import CircularProgress from '@mui/material/CircularProgress';
import { Grid} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Paper} from '@mui/material';
import { styled } from '@mui/material/styles';
import InputBase from "@mui/material/InputBase";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Fab from '@mui/material/Fab';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: "center",
}));
class LabDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data:null
        };
    };
    getFormBody =(params) => {
        let FormBody = [];
        for (let property in params) {
          let encodedKey = encodeURIComponent(property);
          let encodedValue = encodeURIComponent(params[property]);
          FormBody.push(encodedKey + "=" + encodedValue);
        }
        return FormBody.join("&");
      }
    componentDidMount(){
        const {labId,userId} = this.props.match.params;
        if(labId && userId ){
            const url = "/api/editor/fetchLabDetails";
            fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: this.getFormBody({labId,userId}),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    this.setState({
                        loading: false,
                        data: data.data
                    })
                }
                else{
                    this.setState({
                        loading: false,
                    })
                }
            });
        }

    }
    render() {
    console.log(this.props)
    let {students} = this.props.classroom;
    const {user} = this.props.auth;
    const { userId,labId } = this.props.match.params;
    const {editorLabDetails} = this.props.labDetails;
    const {finalSubmit, evaluateLab} = this.props.labDetails.codeEditorDetails;
        
        return (
            <>
            {this.state.loading && <>
                <Grid
                    spacing={2}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    >
                <CircularProgress disableShrink />
                </Grid>
            </>}
            {!this.state.loading && 
            <>
             <Div>{editorLabDetails.description}</Div>
                <Grid
                    spacing={2}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    >
                        <Grid spacing={4}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                         >
                            <Grid item xs={7} m={2} >
                                <Paper elevation={4}>
                                <Card sx={{ minWidth: 300, minHeight:150 }}>
                                <Div >Question</Div>
                                <CardContent>
                                {editorLabDetails.question}
                                </CardContent>
                                </Card>
                                </Paper>
                            </Grid>
                             <Grid item xs={4} m={2} >
                                 Test Case
                                <Fab variant="extended">
                                <CodeEditorSideBar students={students} user={user} labId={labId} editorLabDetails={editorLabDetails} dispatch={this.props.dispatch}/>
                                </Fab> 
                            </Grid>
                         </Grid>
                    <Grid item xs={7} m={2} >
                    </Grid>
                </Grid>
    </>}
            </>
        );
    }
}
function mapStateToProps(state) {
    return {
      auth: state.auth,
      darkModetheme: state.theme,
      createClassroom: state.createClassroom,
      labDetails: state.labDetails,
      classroom: state.classroom,
    };
  }
  
  export default connect(mapStateToProps)(LabDashboard);