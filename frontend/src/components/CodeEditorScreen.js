import React from "react";
import { connect } from "react-redux";
import TextEditor from "./TextEditor";
import LanguageSelector from "./LanguageSelector";
import CodeEditorSideBar from "./CodeEditorSideBar";
import {executeCode,clearExecution} from "../actions/execute"

//Material UI
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

class CodeEditorScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customInput: "",
            customOutput: "",
            statusCode: "",
            memory: "",
            cpuTime: "",
            successMessage:"",
            errorMessage:"",
            showFinalSubmit:false,
        };
    };
    componentWillUnmount() {
        this.props.dispatch(clearExecution());
    }
    handleCustomInput = (e) => {
        this.setState({
            customInput: e.target.value,
        });
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
    handleSubmitCode = (e) => {
        e.preventDefault();
        const {content, code, finalSubmit, evaluateLab} = this.props.labDetails.codeEditorDetails;
        if(code && finalSubmit === false && evaluateLab === true){
            //at backend search by code in codeEditor
            //make finalSubmit= true
            //submittedAt=Date.now()
            //contentSaved=content
            // console.log("Submit button presses",content.ops[0].insert);
            const url = "/api/editor/submitCode";
            fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: this.getFormBody({ code, content: content.ops[0].insert, finalSubmit:true, submittedAt: new Date()}),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    this.setState({
                        successMessage:data.message,
                        showFinalSubmit: true,
                    })
                    setTimeout(()=>{
                        this.setState({
                            successMessage: ""
                        })
                    },3000)
                }
                else{
                    this.setState({
                        errorMessage:data.message,
                    })
                    setTimeout(()=>{
                        this.setState({
                            errorMessage: ""
                        })
                    },3000)
                }
            });
        }

        
    };
    handleExecuteCode = (e) => {
        e.preventDefault();
        const lab= this.props.labDetails.codeEditorDetails.lab;
        const code = this.props.labDetails.codeEditorDetails._id;
        const currentLanguage = this.props.language.editorLanguage;//"C++";
        const languageVersion = "4";
        const input = this.state.customInput;
        this.props.dispatch(executeCode(code, currentLanguage,lab,input,languageVersion));
    };
  render() {
    let {students} = this.props.classroom;
    const {user} = this.props.auth;
    const {executionStarted,customOutput,memory,cpuTime} = this.props.execute;
    const { userId,labId } = this.props.match.params;
    const {editorLabDetails} = this.props.labDetails;
    const {finalSubmit, evaluateLab} = this.props.labDetails.codeEditorDetails;

    // console.log("this.state.finalSubmit",this.state.showFinalSubmit,"finalSubmit",finalSubmit);
    return (
        <div>
          <Div>{editorLabDetails.description}</Div>
            <Grid
                spacing={2}
                container
                direction="row"
                justifyContent="space-evenly"
                >
                <Grid item xs={7} m={2} >
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
                    <Grid item xs={8} m={0.5} >
                      <Fab variant="extended">
                        <CodeEditorSideBar students={students} user={user} labId={labId} editorLabDetails={editorLabDetails} dispatch={this.props.dispatch}/>
                      </Fab> 
                    </Grid>
                    <Grid item xs={8} m={0.5} > 
                        <Paper elevation={4}>
                        <Card sx={{ minWidth: 300, minHeight:150 }}>
                        <Div >Question</Div>
                        <CardContent>
                        {editorLabDetails.question}
                        </CardContent>
                        </Card>
                        </Paper>
                    </Grid>
                    <Grid item xs={8} m={0.5} > 
                        <Paper elevation={4}>
                        <Card sx={{ minWidth: 300, minHeight:150 }}>
                        <Div >Code Input</Div>
                        <CardContent>
                          {editorLabDetails.input}
                        </CardContent>
                        </Card>
                        </Paper>
                    </Grid>
                    <Grid item xs={8} m={0.5} > 
                        <Paper elevation={4}>
                        <Card sx={{ minWidth: 300, minHeight:150 }}>
                        <Div >Code Output</Div>
                        <CardContent>
                        {editorLabDetails.output}
                        </CardContent>
                        </Card>
                        </Paper>
                    </Grid>
                        <Grid item xs={8} m={0.5} >
                            <Paper elevation={4}>
                                <Card sx={{ minWidth: 300, minHeight:150 }}>
                                    <Div >Code Custom Input</Div>
                                    <CardContent>
                                        < InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Custom Input"
                                            inputProps={{ "aria-label": "search google maps" }}
                                            value={this.state.customInput}
                                            onChange={this.handleCustomInput}
                                        />
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                        <Grid item xs={8} m={0.5} >
                            <Paper elevation={4}>
                                <Card sx={{ minWidth: 300, minHeight:150 }}>
                                    <Div >Code Custom Output</Div>
                                    <CardContent>
                                        {customOutput}<br/>
                                        Memory: {memory} kB<br/>
                                        CPU Time :{cpuTime} seconds<br/>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </Grid>
                    <Grid item xs={8} m={0.5} > 
                    <Fab variant="extended" onClick={this.handleExecuteCode} disabled={executionStarted}>
                      <PlayCircleIcon sx={{ mr: 1 }} color="primary" />
                      Execute Code
                    </Fab>
                    </Grid>
                    {evaluateLab === true && <Grid item xs={8} m={0.5} > 
                    <Fab variant="extended" onClick={this.handleSubmitCode} disabled={this.state.showFinalSubmit || finalSubmit }>
                      <PlayCircleIcon sx={{ mr: 1 }} color="primary" />
                      Final Submit
                    </Fab>
                    </Grid>}
                    {this.state.successMessage && <Snackbar open={true} autoHideDuration={2000}>
                        <Alert severity="success" sx={{ width: '100%' }}>
                        {this.state.successMessage}
                        </Alert>
                    </Snackbar>}
                    {this.state.errorMessage && <Snackbar open={true} autoHideDuration={2000}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                        {this.state.errorMessage}
                        </Alert>
                    </Snackbar>}
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
      labDetails: state.labDetails,
      classroom: state.classroom,
      execute: state.execute,
      language:state.language,
    };
  }
export default connect(mapStateToProps)(CodeEditorScreen);
