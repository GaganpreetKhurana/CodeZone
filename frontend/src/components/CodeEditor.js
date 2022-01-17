import React from "react";
import { connect } from "react-redux";

class CodeEditor extends React.Component {

    render(){
        const {codeEditorDetails,editorLabDetails} = this.props.labDetails;
        console.log("codeEditorDetails",codeEditorDetails.code);
        console.log("editorLabDetails",editorLabDetails);
        return (<h1>Code Editor</h1>);
    }

}

function mapStateToProps(state) {
    return {
      labDetails: state.labDetails
    };
  }
export default connect(mapStateToProps)(CodeEditor);