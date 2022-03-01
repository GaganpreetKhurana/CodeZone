import React , { Component } from "react";
import { connect } from "react-redux";
import DiscussionPortal from "./DiscussionPortal";
import NoticeTab from "./NoticeTab";
import ClassHeader from "./ClassHeader";

//Material UI
import { Grid } from '@mui/material';
import { clearClassroomDetails , fetchClassroomDetails } from "../actions/classroom";

class Classroom extends Component {
    componentDidMount () {
        const { match } = this.props;
        
        if ( match.params.classroomID ) {
            this.props.dispatch ( fetchClassroomDetails ( match.params.classroomID ) );
            this.timer = setInterval ( () => {
                this.props.dispatch ( fetchClassroomDetails ( match.params.classroomID ) );
            } , 5000 );
        }
    }
    
    componentDidUpdate ( prevProps ) {
        const {
            match : { params : prevParams } ,
        } = prevProps;
        const {
            match : { params : currentParams } ,
        } = this.props;
        if ( prevParams && currentParams && currentParams !== prevParams ) {
            //fetch new classroom  details
            this.props.dispatch ( fetchClassroomDetails ( currentParams.classroomID ) );
        }
    }
    
    
    componentWillUnmount () {
        clearInterval ( this.timer );
        this.props.dispatch ( clearClassroomDetails () );
    }
    
    render () {
        const { match } = this.props;
        // return <div>{match.params.classroomID}</div>;
      const classTitle = this.props.location.state.title;
      const subheader = this.props.location.state.subheader;
      const description = this.props.location.state.description;
      const creator = this.props.location.state.creator;
      const enrolled = this.props.location.state.enrolled;
      const classroomCode = this.props.location.state.classroomCode;

      return (
        <Grid container direction="row" justifyContent="space-evenly">
          <Grid
            item
            xs={6}
            m={2}
            style={{ maxHeight: "150vh", overflow: "auto" }}
          >
            {" "}
            <DiscussionPortal classroomId={match.params.classroomID} />
          </Grid>
          <Grid
            item
            xs={4}
            m={2}
            container
            direction="column"
            alignItems="stretch"
          >
            <Grid item m={2}>
              <ClassHeader
                classTitle={classTitle}
                subheader={subheader}
                description={description}
                creator={creator}
                enrolled={enrolled}
                classroomCode={classroomCode}
              />
              <NoticeTab classroomId={match.params.classroomID} />{" "}
            </Grid>
          </Grid>
        </Grid>
      );
    }
}

function mapStateToProps ( state ) {
    return {
        auth : state.auth , createClassroom : state.createClassroom ,
    };
}

export default connect ( mapStateToProps ) ( Classroom );