import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {clearAuth} from "../actions/auth";
import {fetchOpenQuiz, fetchQuiz} from "../actions/quiz";
import {DelayLink} from "./DelayLink";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

class JoinQuiz extends Component{
	state = {
		dialogOpen: true
	}
	
	dialogOpen = () => {
		this.setState({open: true});
	};
	
	dialogClose = () => {
		this.setState({open: false});
	};
	
	quizNotFinished = (start, duration) => {
		var timeLeft = new Date(start) - new Date() - 19800000;
		timeLeft /= 1000;
		timeLeft = parseInt(timeLeft);
		timeLeft += 10;
		timeLeft += duration;
		return timeLeft > 0;
	};
	
	//to clear the error if it comes on reload or whenever the user shifts from this page
	componentWillMount(){
		//fetch quiz details for this classroom
		const {classroomId} = this.props;
		this.props.dispatch(fetchOpenQuiz(classroomId));
		this.timer = setInterval(() => {
			this.props.dispatch(fetchOpenQuiz(classroomId));
		}, 10000);
	}
	
	componentWillUnmount(){
		//clear quiz details
		clearInterval(this.timer);
		this.props.dispatch(clearAuth());
	}
	
	render(){
		const {classroomId} = this.props;
		const {user} = this.props.auth;
		const {quizList} = this.props.quizDetails;
		
		return (
			<div>
				<Button fullWidth variant="contained" sx={{mt: 3, mb: 2}} onClick={this.dialogOpen}>
					Attempt Quiz
				</Button>
				<Dialog open={this.state.open} onClose={this.dialogClose}>
					{quizList.length === 0 && <DialogTitle>No Open Quiz For this class yet!!</DialogTitle>}
					{quizList.length !== 0 && <DialogTitle>Open Quiz Details</DialogTitle>}
					<DialogActions>
						{quizList.length !== 0 &&
							<TableContainer>
								<Table sx={{minWidth: 650}}>
									<TableHead>
										<TableRow>
											<TableCell align="center">Title</TableCell>
											<TableCell align="center">Description</TableCell>
											<TableCell align="center">Scheduled Data</TableCell>
											<TableCell align="center">Scheduled Time</TableCell>
											<TableCell align="center">Duration</TableCell>
											<TableCell align="center">Maximum Marks</TableCell>
											<TableCell align="center">Link to Join</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{user.role === "Teacher" && quizList.map((row) => (
											<TableRow
												key={row._id}
												sx={{'&:last-child td, &:last-child th': {border: 0}}}
											>
												
												<TableCell align="center">{row.title}</TableCell>
												<TableCell align="center">{row.description}</TableCell>
												<TableCell component="th" scope="row"
												           align="center">{row.dateScheduled.slice(0, 10)}</TableCell>
												<TableCell component="th" scope="row"
												           align="center">{row.dateScheduled.slice(11, -5)}</TableCell>
												<TableCell
													align="center">{row.duration ? row.duration / 60 : null} minutes</TableCell>
												<TableCell
													align="center">{row.maxScoreQuizMarks === "" ? '-' : row.maxScoreQuiz}</TableCell>
												<TableCell align="center">
													{user.id && <Link to="/" onClick={() => {
														//fetch this code-editor's details using row_id
														// this.props.dispatch(createNewCodeEditor(user.id,row._id));
													}}>
														View
													</Link>
													}
												</TableCell>
											</TableRow>
										))}
										{user.role === "Student" && quizList.map((row) => (
											this.quizNotFinished(row.dateScheduled, row.duration) && <TableRow
												key={row._id}
												sx={{'&:last-child td, &:last-child th': {border: 0}}}
											>
												<TableCell align="center">{row.title}</TableCell>
												<TableCell align="center">{row.description}</TableCell>
												<TableCell component="th" scope="row"
												           align="center">{row.dateScheduled.slice(0, 10)}</TableCell>
												<TableCell component="th" scope="row"
												           align="center">{row.dateScheduled.slice(11, -5)}</TableCell>
												<TableCell
													align="center">{row.duration ? row.duration / 60 : null} minutes</TableCell>
												<TableCell
													align="center">{row.maxScoreQuiz === "" ? '-' : row.maxScoreQuiz}</TableCell>
												<TableCell align="center">
													{user.id && <DelayLink
														
														delay={2000}
														
														to={{
															pathname: `/QuizStudent/${row._id}`,
															quiz_id: row._id,
															classroom_id: classroomId,
														}}
														onDelayStart={() => {
															//fetch this code-editor's details using row_id
															console.log(row._id, "qid");
															this.props.dispatch(fetchQuiz(row._id));
														}}
														onDelayEnd={() => {
															//fetch this code-editor's details using row_id
															console.log(row._id, "qidEND");
														}}>
														Link
													</DelayLink>
													}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						}
						<Button onClick={this.dialogClose}>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		auth: state.auth,
		createClassroom: state.createClassroom,
		quizDetails: state.quiz,
	};
}

export default connect(mapStateToProps)(JoinQuiz);