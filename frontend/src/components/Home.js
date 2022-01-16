import React from "react";
import HomeCover from "../static/HomeCover.png";
import LogoFinal from "../static/LogoFinal.png";
import Gagan from "../static/Gagan.jpg";
import Akshit from "../static/Akshit.jpg";
import Shayan from "../static/Shayan.jpg";
import Vishal from "../static/Vishal.jpg";
import {Grid} from '@mui/material';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../static/styles.min.css';

function Home() {
    return (
        <Grid>
            <header className="header-dark" style={{background: "url(" + HomeCover + ") center / cover"}}>
                <div className="container hero">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <h1 className="text-center" style={{fontSize: "60px", textAlign: "center",}}><img
                                src={LogoFinal} style={{width: "90px"}}/><strong>&nbsp; CodeZone</strong>
                            </h1>
                        </div>
                    </div>
                </div>
                <h1 style={{color: "rgb(253,254,255)", textAlign: "center",}}><strong>Your One stop end for Coding
                    Labs</strong></h1>
            </header>
            <section className="features-clean">
                <div className="intro">
                    <h2 className="text-center" style={{fontSize: "40px", textAlign: "right"}}>Features</h2>
                </div>
                <div className="row features">
                    <div className="col-sm-6 col-lg-4 item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" className="icon"
                             style={{background: "url(" + LogoFinal + ")"}}>
                            <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <h3 className="name">Classroom Portal</h3>
                        <p className="description">Students can write, compile, run and post their
                            codes.&nbsp;​Teachers can review and edit the codes in real time.&nbsp;<br/><br/></p>
                    </div>
                    <div className="col-sm-6 col-lg-4 item"><i className="fa fa-reddit-square icon"></i>
                        <h3 className="name">Discussion Portal</h3>
                        <p className="description">Discussion Portal - Forum for discussions where you can post,
                            comment and like others post.&nbsp;​<br/><br/></p>
                    </div>
                    <div className="col-sm-6 col-lg-4 item"><i className="fa fa-list-alt icon"></i>
                        <h3 className="name">Learning Portal</h3>
                        <p className="description">Learning Portal – Portal where learning resources could be
                            shared.​<br/><br/></p>
                    </div>
                    <div className="col-sm-6 col-lg-4 item"><i className="fa fa-pencil-square-o icon"></i>
                        <h3 className="name">Academic Assignments</h3>
                        <p className="description">Teachers can create and evaluate assignments.​<br/>Chat
                            functionality to connect teachers and&nbsp;students.&nbsp;​<br/><br/><br/></p>
                    </div>
                    <div className="col-sm-6 col-lg-4 item"><i className="fa fa-copy icon"></i>
                        <h3 className="name">Plagiarism</h3>
                        <p className="description">Plagiarism check for submitted assignments.&nbsp;&nbsp;<br/><br/>
                        </p>
                    </div>
                    <div className="col-sm-6 col-lg-4 item"><i className="fa fa-paste icon"></i>
                        <h3 className="name">Report &amp; Analytics</h3>
                        <p className="description">Evaluation report generated for the teachers for
                            academics.<br/><br/></p>
                    </div>
                </div>
                <section className="team-grid">
                    <div className="intro">
                        <h2 className="text-center" style={{fontSize: "40px",}}>Team </h2>
                        <p className="text-center">Our team draws on broad industry experience and networks to
                            create the most powerful outcomes for our clients </p>
                    </div>
                    <div className="row people">
                        <div className="col-md-4 col-lg-3 item">
                            <div className="box" style={{background: "url("+ Vishal +") center / cover"}}>
                                <div className="cover">
                                    <h3 className="name">Vishal Thakur</h3>
                                    <p className="title"><br/><strong>DEVELOPER</strong><br/><br/></p>
                                    <div className="social"><a href="#"><i
                                        className="fa fa-facebook-official"></i></a><a
                                        href="#"><i className="fa fa-twitter"></i></a><a href="#"><i
                                        className="fa fa-instagram"></i></a></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-3 item">
                            <div className="box"
                                 style={{background: "url(" + Gagan + ") center / cover"}}>
                                <div className="cover">
                                    <h6 className="name">Gaganpreet Khurana</h6>
                                    <p className="title"><br/><strong>DEVELOPER</strong><br/><br/></p>
                                    <div className="social"><a href="#"><i
                                        className="fa fa-facebook-official"></i></a><a
                                        href="#"><i className="fa fa-twitter"></i></a><a href="#"><i
                                        className="fa fa-instagram"></i></a></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-3 item">
                            <div className="box"
                                 style={{background: "url(" + Shayan + ") center / cover"}}>
                                <div className="cover">
                                    <h3 className="name">Shayan Yaseen</h3>
                                    <p className="title"><br/><strong>DEVELOPER</strong><br/><br/></p>
                                    <div className="social"><a href="#"><i
                                        className="fa fa-facebook-official"></i></a><a
                                        href="#"><i className="fa fa-twitter"></i></a><a href="#"><i
                                        className="fa fa-instagram"></i></a></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-3 item">
                            <div className="box"
                                 style={{background: "url(" + Akshit + ") center / cover"}}>
                                <div className="cover">
                                    <h3 className="name">Akshit Garg</h3>
                                    <p className="title"><br/><strong>DEVELOPER</strong><br/><br/></p>
                                    <div className="social"><a href="#"><i
                                        className="fa fa-facebook-official"></i></a><a
                                        href="#"><i className="fa fa-twitter"></i></a><a href="#"><i
                                        className="fa fa-instagram"></i></a></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <footer className="footer-dark">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Services</h3>
                            <ul>
                                <li><a href="#">Classroom</a></li>
                                <li><a href="#">Academic Assignment</a></li>
                                <li><a href="#">Quizz</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>About</h3>
                            <ul>
                                <li><a href="#">Location</a></li>
                                <li><a href="#">Team</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                        </div>
                        <div className="col-md-6 item text">
                            <h3>Company Name</h3>
                            <p><br/>CodeZone is a real time web application where teachers can conduct programming
                                labs for students, guide them for any programming errors by looking at their live
                                code<br/><br/><br/><br/></p>
                        </div>
                    </div>
                    <p className="copyright">CodeZone © 2021</p>

                </footer>
            </section>
        </Grid>
    );
}

export default Home;