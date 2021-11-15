import React from "react";
import { connect } from "react-redux";

class ChatBox extends React.Component {
  render() {

    return (
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
