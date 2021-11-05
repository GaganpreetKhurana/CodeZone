import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import {connect} from "react-redux";
import {signup, clearAuth} from "../actions/auth";

//Material UI

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

//Copyright
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="localhost:8000">
                CodeZone
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
            role: false,
            SID: "",
        };
    }

    //to clear the error if it comes on reload or whenever the user shifts from this page
    componentWillUnmount() {
        this.props.dispatch(clearAuth());
    }

    handleSubmitForm = (e) => {
        e.preventDefault();
        const {email, password, confirmPassword, name, role, SID} = this.state;
        if (
            !role &&
            email &&
            confirmPassword &&
            name &&
            password
        ) {
            var teacherSID = "t-" + name;
            this.props.dispatch(
                signup(email, password, confirmPassword, name, "Teacher", teacherSID)
            );
        }
        if (
            email &&
            confirmPassword &&
            name &&
            password &&
            role &&
            SID
        ) {
            this.props.dispatch(
                signup(email, password, confirmPassword, name, "Student", SID)
            );
        }
    };
    handleEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    };
    handleName = (e) => {
        this.setState({
            name: e.target.value,
        });
    };
    handlePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };
    handleCPassword = (e) => {
        this.setState({
            confirmPassword: e.target.value,
        });
    };
    handleRole = (e) => {
        console.log(this.state);
        console.log(e.target.checked);
        this.setState({
            role: e.target.checked,
        });
    };

    handleSID = (e) => {
        this.setState({
            SID: e.target.value,
        });
    };

    render() {
        const {inProgress, error, isLoggedIn} = this.props.auth;
        if (isLoggedIn) {
            return <Redirect to="/"/>;
        }
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" noValidate onSubmit={this.handleSubmitForm} sx={{mt: 3}}>
                        {error && <div className="alert error-dailog">{error}</div>}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="Name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    place
                                    autoFocus
                                    onChange={this.handleName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={this.handleEmail}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={this.handlePassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    onChange={this.handleCPassword}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value='true' color="primary"/>}
                                    label="Student"
                                    onChange={this.handleRole}
                                    helperText="Check if you are a student"
                                />
                            </Grid>
                            {this.state.role == true && (
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                                        id="sid"
                                        label="SID"
                                        name="sid"
                                        autoComplete="sid"
                                        onChange={this.handleSID}
                                    />
                                </Grid>
                            )}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            disabled={inProgress}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-start">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(Signup);
