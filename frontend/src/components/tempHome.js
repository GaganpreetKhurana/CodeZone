import React from "react";
import HomeCover from "../static/HomeCover.png";
import LogoFinal from "../static/LogoFinal.png";
import Gagan from "../static/Gagan.jpg";
import Akshit from "../static/Akshit.jpg";
import Shayan from "../static/Shayan.jpg";
import Vishal from "../static/Vishal.jpg";
import MountainBG from "../static/mountain_bg.jpg";
import {Container,ImageList,ImageListItem,Grid} from '@mui/material';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/styles.min.css';
const styles = {
    Container: {
        backgroundImage: `url(${HomeCover})`,
        width: "100%"
    },
    Logo:{
        width:"10%",
        margin: 'auto',
        textAlign: 'center',
        display:'inline',
        marginLeft:'30%',
        marginRight:'10%',
        marginTop:'5%',
        marginBottom:'5%'
    },
    headingTitle:{
        verticalAlign:"top",
        display:"inline-block",
    }

};
function Home() {
    return (
        <Grid>
            <Container style={styles.Container}>
                <p>
                    <img
                        src={`${LogoFinal}`}
                        alt="Logo.png"
                        style={styles.Logo}
                    />
                    <h1 style={styles.headingTitle}>CodeZone</h1>

                </p>
                <h2> Your One stop end for Coding Labs</h2>
            </Container>
            <Container>
                <h3> Features </h3>
                <div>
                    <Grid>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"
                             className="icon" style={{background : "url(&quot;assets/img/Logo%20final.png&quot;);"}}>
                            <path
                                d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <h3 className="name">Classroom Portal</h3>
                        <p className="description">Students can write, compile, run and post their codes.&nbsp;​Teachers can
                            review and edit the codes in real time.&nbsp;<br/><br/></p>

                    </Grid>
                    <Grid>
                        <i className="fa fa-reddit-square icon"></i>
                        <h3 className="name">Discussion Portal</h3>
                        <p className="description">Discussion Portal - Forum for discussions where you can post, comment and
                            like others post.&nbsp;​<br/><br/></p>

                    </Grid>
                    <Grid>
                        <i className="fa fa-list-alt icon"></i>
                        <h3 className="name">Learning Portal</h3>
                        <p className="description">Learning Portal – Portal where learning resources could be
                            shared.​<br/><br/></p>


                    </Grid>
                    <Grid>
                        <i className="fa fa-reddit-square icon"></i>
                        <h3 className="name">Discussion Portal</h3>
                        <p className="description">Discussion Portal - Forum for discussions where you can post, comment and
                            like others post.&nbsp;​<br/><br/></p>

                    </Grid>
                    <Grid>
                        <i className="fa fa-pencil-square-o icon"></i>
                        <h3 className="name">Academic Assignments</h3>
                        <p className="description">Teachers can create and evaluate assignments.​<br/>Chat functionality to
                            connect teachers and&nbsp;students.&nbsp;​<br/><br/><br/></p>

                    </Grid>
                    <Grid>
                        <i className="fa fa-copy icon"></i>
                        <h3 className="name">Plagiarism</h3>
                        <p className="description">Plagiarism check for submitted assignments.&nbsp;&nbsp;<br/><br/></p>

                    </Grid>
                    <Grid>
                        <i className="fa fa-paste icon"></i>
                        <h3 className="name">Report &amp; Analytics</h3>
                        <p className="description">Evaluation report generated for the teachers for academics.<br/><br/></p>

                    </Grid>
                </div>
            </Container>
            <Container>
                <h3> Our Team</h3>
                <p>Our team draws on broad industry experience and networks to create the most powerful outcomes for our clients </p>
                <div>
                    <Grid>
                        <div className="box"
                             style={{backgroundImage: `url(${Vishal})`}}>
                            <div className="cover">
                                <h3 className="name">Vishal Thakur</h3>
                                <p className="title"><br/><strong>DEVELOPER</strong><br/><br/></p>
                                <div className="social"><a href="#"><i className="fa fa-facebook-official"></i></a><a
                                    href="#"><i className="fa fa-twitter"></i></a><a href="#"><i
                                    className="fa fa-instagram"></i></a></div>
                            </div>
                        </div>
                    </Grid>
                    <Grid>
                        <div className="box"
                             style={{backgroundImage: `url(${Gagan})`}}>
                            <div className="cover">
                                <h3 className="name">Gaganpreet Khurana</h3>
                                <p className="title"><br/><strong>DEVELOPER</strong><br/><br/></p>
                                <div className="social"><a href="#"><i className="fa fa-facebook-official"></i></a><a
                                    href="#"><i className="fa fa-twitter"></i></a><a href="#"><i
                                    className="fa fa-instagram"></i></a></div>
                            </div>
                        </div>
                    </Grid>
                    <Grid>
                        <div className="box"
                             style={{backgroundImage: `url(${Shayan})`}}>
                            <div className="cover">
                                <h3 className="name">Shayan Yaseen</h3>
                                <p className="title"><br/><strong>DEVELOPER</strong><br/><br/></p>
                                <div className="social"><a href="#"><i className="fa fa-facebook-official"></i></a><a
                                    href="#"><i className="fa fa-twitter"></i></a><a href="#"><i
                                    className="fa fa-instagram"></i></a></div>
                            </div>
                        </div>
                    </Grid>
                    <Grid>
                        <div className="box"
                             style={{backgroundImage: `url(${Akshit})`}}>
                            <div className="cover">
                                <h3 className="name">Akshit Garg</h3>
                                <p className="title"><br/><strong>DEVELOPER</strong><br/><br/></p>
                                <div className="social"><a href="#"><i className="fa fa-facebook-official"></i></a><a
                                    href="#"><i className="fa fa-twitter"></i></a><a href="#"><i
                                    className="fa fa-instagram"></i></a></div>
                            </div>
                        </div>
                    </Grid>
                </div>
            </Container>
            <Container>
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

            </Container>
        </Grid>
    );
}

export default Home;