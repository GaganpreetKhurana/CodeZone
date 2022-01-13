import React from "react";
import {connect} from "react-redux";
import io from "socket.io-client";

//Material UI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Paper} from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';

const Div = styled('div')(({theme}) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    textAlign: "center",
}));


class ChatBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentMessage: '',
            messageArray: [],
            previousMessageArrayLength: 0,
            previousMessage: '',
        }
    }
    componentDidMount() {
        this.setUpConnections();
    }
    setUpConnections = () => {
        if(this.props.self_details.id && this.props.other_details._id && this.props.classroomId){
            var socket = io("http://localhost:3002", {
                query: {
                    sender_id: this.props.self_details.id,
                    receiver_id: this.props.other_details._id,
                    classroomId: this.props.classroomId,
                }
            })
            socket.on('ReceiveChat', (data) => {
                console.log("HEllllllllllllllo");
                console.log(data);  
           });
            }
            this.socket = socket;

    }
    

    componentWillUnmount() {
        this.socket.disconnect();
        console.log("Disconnected")
    }


    sendMessage = (e) => {
        e.preventDefault();
        console.log('You clicked submit.');
        console.log(this.state.contentMessage)
        this.socket.emit('SendChat', this.props.self_details.id, this.state.contentMessage)
        console.log('submitted')
        this.setState({
            contentMessage: '',
        });
        
    }
    
    handleChangeMessage = (e) => {
        this.setState({
            contentMessage: e.target.value,
        });
    };

    // componentDidUpdate() {
    //     this.socket.on('ReceiveChat', (data) => {
    //          console.log(data);
            
    //     });
    // }


    render() {
        const {self_details, other_details} = this.props;
        var messageJSX= this.state.messageArray.map((message) =>
        {
            {
                message.sender === other_details.id &&
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Student 2" src=""/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={other_details.name}
                        secondary={
                            <React.Fragment>
                                {message}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            }
            <Divider variant="inset" component="li"/>
            {
                message.sender === self_details.id &&
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary={self_details.name}
                        secondary={
                            <React.Fragment>
                                {message}
                            </React.Fragment>
                        }
                    />
                    <ListItemAvatar>
                        <Avatar alt="Student 3" src=""/>
                    </ListItemAvatar>
                </ListItem>
            }
        });
        console.log(messageJSX);
        return (
            <div>
                <Paper elevation={4}>
                    {/* Map senders message to the first block and receieved to the second block*/}
                    <Card sx={{minWidth: 0}}>
                        {<Div>{`${other_details.name} - ${other_details.SID} `}</Div>}
                        <CardContent>
                            <List sx={{width: '100%'}}>

                                {messageJSX}

                            </List>

                            <Paper component="form"
                                   sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 300}}>
                                <InputBase
                                    sx={{ml: 1, flex: 1}}
                                    placeholder="Start typing a comment"
                                    inputProps={{'aria-label': 'search google maps'}}
                                    value={this.state.contentMessage}
                                    onChange={this.handleChangeMessage}
                                />
                                <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                                <IconButton color="primary" sx={{p: '10px'}} aria-label="directions"
                                            onClick={this.sendMessage}>
                                    <CommentIcon/>
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
