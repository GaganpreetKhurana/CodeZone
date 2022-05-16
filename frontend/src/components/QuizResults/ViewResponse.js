import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchQuizSubmission} from "../../actions/quiz";


import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

class ViewResponse extends Component{
	state = {
		dialogOpen: true,
	};
	
	dialogOpen = () => {
		this.setState({open: true});
	};
	
	dialogClose = () => {
		this.setState({open: false});
	};
	
	componentWillMount(){
		//fetch quiz results
		const submissionID = this.props.submissionID;
		this.props.dispatch(fetchQuizSubmission(submissionID));
	}
	
	render(){
		let {submission} = this.props.quiz;
		
		return (
			<div>
				<Button fullWidth sx={{mt: 1, mb: 1}} onClick={this.dialogOpen}>
					ViewResponse
				</Button>
				<Dialog fullScreen open={this.state.open} onClose={this.dialogClose}>
					<DialogTitle>Quiz Response</DialogTitle>
					<DialogActions>
						<TableContainer>
							<Table sx={{minWidth: "75%"}}>
								<TableHead>
									<TableRow>
										<TableCell align="center">Question</TableCell>
										<TableCell align="center">Option 1</TableCell>
										<TableCell align="center">Option 2</TableCell>
										<TableCell align="center">Option 3</TableCell>
										<TableCell align="center">Option 4</TableCell>
										<TableCell align="center">Correct Option</TableCell>
										<TableCell align="center">Response Marked</TableCell>
										<TableCell align="center">Maximum Marks</TableCell>
										<TableCell align="center">Marks Obtained</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{submission.map((question) => (
										<TableRow
											sx={{
												"&:last-child td, &:last-child th": {border: 0},
											}} xx
										>
											<TableCell align="center">{question.question}</TableCell>
											<TableCell align="center">{question.option[0]}</TableCell>
											<TableCell align="center">{question.option[1]}</TableCell>
											<TableCell align="center">{question.option[2]}</TableCell>
											<TableCell align="center">{question.option[3]}</TableCell>
											<TableCell align="center">{question.correctOption}</TableCell>
											<TableCell align="center">{question.optionMarked}</TableCell>
											<TableCell align="center">{question.maxScore}</TableCell>
											<TableCell align="center">{question.score}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
						<Button onClick={this.dialogClose}>Cancel</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		auth: state.auth,
		quiz: state.quiz,
	};
}

export default connect(mapStateToProps)(ViewResponse);
