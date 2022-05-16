import React, {Component} from "react";
import {connect} from "react-redux";

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
import ViewQuizResult from "./ViewQuizResult";

class QuizResultTeacher extends Component{
	state = {
		dialogOpen: true,
	};
	
	dialogOpen = () => {
		this.setState({open: true});
	};
	
	dialogClose = () => {
		this.setState({open: false});
	};
	
	componentDidMount(){
		//fetch quiz results
	}
	
	render(){
		const {quizzes} = this.props.classroom;
		// console.log(quizzes);
		return (
			<div>
				<Button
					fullWidth
					variant="contained"
					sx={{mt: 3, mb: 2}}
					onClick={this.dialogOpen}
				>
					Quiz Results
				</Button>
				<Dialog open={this.state.open} onClose={this.dialogClose}>
					<DialogTitle>No Quiz Results For this class yet!!</DialogTitle>
					<DialogTitle>Quiz Results</DialogTitle>
					<DialogActions>
						<TableContainer>
							<Table sx={{minWidth: "75%"}}>
								<TableHead>
									<TableRow>
										<TableCell align="center">Title</TableCell>
										<TableCell align="center">Description</TableCell>
										<TableCell align="center">Total Marks</TableCell>
										<TableCell align="center">Scheduled Date</TableCell>
										<TableCell align="center">Scheduled Time</TableCell>
										<TableCell align="center">View Class Result</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{quizzes.map((quiz) => (
										<TableRow
											sx={{
												"&:last-child td, &:last-child th": {border: 0},
											}}
										>
											<TableCell align="center">{quiz.title}</TableCell>
											<TableCell align="center">{quiz.description}</TableCell>
											<TableCell align="center">{quiz.maxScoreQuiz}</TableCell>
											<TableCell align="center">{quiz.dateScheduled.slice(0, 10)}</TableCell>
											<TableCell align="center">{quiz.dateScheduled.slice(11, -5)}</TableCell>
											<TableCell align="center"><ViewQuizResult quizID={quiz._id}/></TableCell>
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
		classroom: state.classroom,
	};
}

export default connect(mapStateToProps)(QuizResultTeacher);
