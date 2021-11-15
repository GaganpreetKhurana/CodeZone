import React from "react";
import { connect } from "react-redux";
import ChatBox from "./ChatBox";

class StudentsList extends React.Component {
  render() {

    return (
        <div className="students-list">
            <div className="students-enrolled">
                <div class="header">
                    <p>Students List</p>
                </div>
                <div className="student-block">
                    {/* iterate over teachers and then  students list here */}
                    <div className="student-name">
                        <p>Teacher 1</p>
                        <img
                        
                        style={{ width: 25, height: 25 }}
                        src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                        alt="comments-icon"
                    />
                    </div>
                    <div className="student-name">
                        <p>Teacher 2</p>
                        <img
                        
                        style={{ width: 25, height: 25 }}
                        src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                        alt="comments-icon"
                    />
                    </div>
                    <div className="student-name">
                        <p>18103001 ABCDEFG</p>
                        <img
                        
                        style={{ width: 25, height: 25 }}
                        src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                        alt="comments-icon"
                    />
                    </div>
                    <div className="student-name">
                        <p>18103002 ABCDEFG</p>
                        <img
                        
                        style={{ width: 25, height: 25 }}
                        src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                        alt="comments-icon"
                    />
                    </div>
                    <div className="student-name">
                        <p>18103003 ABCDEFG</p>
                        <img
                        
                        style={{ width: 25, height: 25 }}
                        src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                        alt="comments-icon"
                    />
                    </div>
                </div>
            </div>
            {/* <ChatBox/> */}
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
export default connect(mapStateToProps)(StudentsList);
