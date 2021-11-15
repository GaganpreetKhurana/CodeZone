import React from "react";
import { connect } from "react-redux";

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
            <div id="user-chat-box">
                <div className="chat-header">
                    <span> 18103001 ABCDEFG</span>
                    <span className="close">X</span>
                </div>
		        <ul id="chat-messages-list">
			        <li class="other-message">
				        <span>Other Message</span>
			        </li>
			        <li className="self-message">
				        <span>
					        Self Message
				        </span>
			        </li>
                    <li class="other-message">
				        <span>Other Message</span>
			        </li>
			        <li className="self-message">
				        <span>
					        Self Message
				        </span>
			        </li>
                    <li class="other-message">
				        <span>Other Message</span>
			        </li>
			        <li className="self-message">
				        <span>
					        Self Message
				        </span>
			        </li>
                    <li class="other-message">
				        <span>Other Message</span>
			        </li>
			        <li className="self-message">
				        <span>
					        Self Message
				        </span>
			        </li>

		        </ul>
		        <div id="chat-message-input-container">
			        <input id="chat-message-input" placeholder="Type message here"/>
			        <button id="send-message">Send</button>
		        </div>
            </div>
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
