import React, { Component } from 'react';
import { connect } from "react-redux";
import CodeEditorSideBar from "./CodeEditorSideBar";

//Material UI
import CircularProgress from '@mui/material/CircularProgress';
import { Grid} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Paper} from '@mui/material';
import InputBase from "@mui/material/InputBase";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Fab from '@mui/material/Fab';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  textAlign: "center",
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
class LabDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loading2: false,
            data: [],
            customInput: "",
            customOutput: "",
            error:"",
            success:""
        };
    };
    handleCustomInput = (e) => {
        this.setState({
            customInput: e.target.value,
        });
    };
    handleCustomOutput = (e) => {
      this.setState({
          customOutput: e.target.value,
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
    componentDidMount(){
        const {labId,userId,classroomId} = this.props.match.params;
        if(labId && userId ){
            const url = "/api/editor/fetchLabDetails";
            fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: this.getFormBody({labId,userId,classroomId}),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                  console.log("FinaL Result",data.data);
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
    
    handleSubmitCode = (e) => {
        e.preventDefault();
        console.log("Pressesd")
        console.log(this.state.customInput,this.state.customOutput,this.state.data);
        if( !this.state.customOutput && !this.state.customInput){
          this.setState({
            error:"Please Fill Custom Input and Output to evaluate!!",
        })
        setTimeout(()=>{
            this.setState({
                error: ""
            })
        },6000)
        }
        else{
          const {customInput, customOutput, data} = this.state;
          if(customInput && customOutput && data){
            const url = "/api/editor/downloadReport";
            this.setState({
              loading2:true,
            })
            fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: this.getFormBody({ customInput, customOutput, data:JSON.stringify(data)}),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                  this.setState({
                    loading2: false,
                    data: data.data
                })
                  console.log("Output",data);
                //     this.setState({
                //         successMessage:data.message,
                //         showFinalSubmit: true,
                //     })
                //     setTimeout(()=>{
                //         this.setState({
                //             successMessage: ""
                //         })
                //     },3000)
                // }
                // else{
                //     this.setState({
                //         errorMessage:data.message,
                //     })
                //     setTimeout(()=>{
                //         this.setState({
                //             errorMessage: ""
                //         })
                //     },3000)
                }
            });
          }

        }      
    };
    render() {
      let { students } = this.props.classroom;
      const { user } = this.props.auth;
      const { labId } = this.props.match.params;
      const { editorLabDetails } = this.props.labDetails;
      return (
        <>
          {this.state.loading && (
            <>
              <Grid
                spacing={2}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress disableShrink />
              </Grid>
            </>
          )}
          {!this.state.loading && (
            <>
              <Div>{this.state.data && <>{this.state.data.description}</>}</Div>
              <Grid
                spacing={2}
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
              >
                <Grid
                  spacing={4}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={5} m={2}>
                    <Paper elevation={4}>
                      <Card sx={{ minWidth: 300, minHeight: 150 }}>
                        <Div>Question</Div>
                        <CardContent>
                          {this.state.data && <>{this.state.data.question}</>}
                        </CardContent>
                      </Card>
                    </Paper>
                  </Grid>
                  <Grid item xs={3} m={2}>
                    <Paper elevation={4}>
                      <Card sx={{ minWidth: 300, minHeight: 150 }}>
                        <Div>Custom Input For Evaluation</Div>
                        <CardContent>
                          <InputBase
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
                  <Grid item xs={3} m={2}>
                    <Paper elevation={4}>
                      <Card sx={{ minWidth: 300, minHeight: 150 }}>
                        <Div>Custom Output For Evaluation</Div>
                        <CardContent>
                          <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Custom Input"
                            inputProps={{ "aria-label": "search google maps" }}
                            value={this.state.customOutput}
                            onChange={this.handleCustomOutput}
                          />
                        </CardContent>
                      </Card>
                    </Paper>
                    
                  </Grid>
                  <Fab variant="extended" m={4}>
                    <CodeEditorSideBar
                      students={students}
                      user={user}
                      labId={labId}
                      editorLabDetails={editorLabDetails}
                      dispatch={this.props.dispatch}
                    />
                  </Fab>
                  <Fab variant="extended" onClick={this.handleSubmitCode}>
                    <PlayCircleIcon sx={{ mr: 3 }} color="primary" />
                    Evaluate and Download Report
                  </Fab>
                  {this.state.loading2 && (
                    <>
                      <Grid
                        spacing={2}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <CircularProgress disableShrink />
                      </Grid>
                    </>
                  )}
                </Grid>
                <Grid item xs={12} ml={32} mt={4} >
                  {/* table will come here*/}
                  {this.state.data.length && <>
                    <TableContainer component={Paper}>
                      <Table aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">SID</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">View Code</StyledTableCell>
                            <StyledTableCell align="right">Marks</StyledTableCell>
                            <StyledTableCell align="right">Submitted At</StyledTableCell>                            
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.data.map((row) => (
                            <StyledTableRow key={row.name}>
                              <StyledTableCell component="th" scope="row">
                                {row.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">{row.sid}</StyledTableCell>
                              <StyledTableCell align="right">{row.email}</StyledTableCell>
                              <StyledTableCell align="right">row.code</StyledTableCell>
                              <StyledTableCell align="right">{row.marks}</StyledTableCell>
                              <StyledTableCell align="right">{row.submittedAt}</StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>}
                </Grid>
                {this.state.error && <Snackbar open={true} autoHideDuration={2000}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                        {this.state.error}
                        </Alert>
                    </Snackbar>}
              </Grid>
            </>
          )}
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