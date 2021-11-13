import React, { Component } from "react";

class Classroom extends Component {
  componentDidMount() {
    const { match } = this.props;

    if (match.params.classroomID) {
      // dispatch an action to fetch classroom details
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params: prevParams },
    } = prevProps;
    const {
      match: { params: currentParams },
    } = this.props;
    if (prevParams && currentParams && currentParams !== prevParams) {
      //fetch new classroom  details
    }
  }
  render() {
    const { match } = this.props;
    // return <div>{match.params.classroomID}</div>;
    return (
      <div className="class-dashboard">
        <div className="students-list">
          <div className="students-enrolled">

          </div>

        </div>
        <div className="discussion-portal">
          <div className="posts-list">
            <div className="create-post">
              {/* option to create a new post */}
              <textarea className="add-post" placeholder="Post Something"/>
              <div>
                <button id="add-post-btn">
                  Add Post
                </button>
              </div>
            </div>

            {/* displaying old posts of classroom */}
            <div className="post-wrapper">
               <div className="post-header">
                  <div className="post-avatar">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSH4dcYWVFHFsz8M3Rsjpy2Hg6gQAmgbCIwWA&usqp=CAU"
                    alt="user-pic"
                  />
                  <div>
                    <span className="post-author">ABC</span>
                    <span className="post-time">12.10.2021 10:00AM</span>
                  </div>
                  </div>
                  <div className="post-content">Having doubt in compiler ques 2</div>
                  <div className="post-actions">
                  <div className="post-like no-btn">
                    {/* post liked or not */}
                    {true ? (
                      <img
                        style={{ width: 15, height: 15 }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTClMtw2rieYPxOLPFZV_MWCZMfGxcmiN9M3A&usqp=CAU"
                        alt="like post"
                      />
                    ) : (
                      <img
                        style={{ width: 15, height: 15 }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP4CNwjod7C14qrdU0_Qw8KdTkNES0XdMwPA&usqp=CAU"
                        alt="likes-icon"
                      />
                    )}
                    <strong> 10 Likes</strong>
                  </div>
                  <div className="post-comments-icon">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
                      alt="comments-icon"
                    />
                    <span>1</span>
                  </div>
                  </div>
                  <div className="post-comment-box">
                    <input
                      placeholder="Start typing a comment"
                    />
                  </div>

                  <div className="post-comments-list">
                    {/* comments would be displayed here */}
                      <div className="post-comment-item">
                        <div className="post-comment-header">
                          <span className="post-comment-author">DEF</span>
                          <span className="post-comment-time">22.10.2021   11AM</span>

                          <div
                            className="post-comment-likes"
                          >
                            {false ? (
                              <span>
                                <img
                                  style={{ width: 15, height: 10 }}
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTClMtw2rieYPxOLPFZV_MWCZMfGxcmiN9M3A&usqp=CAU"
                                  alt="like comment"
                                />
                                <strong>0 Likes</strong>
                              </span>
                            ) : (
                              <span>
                                <img
                                  style={{ width: 15, height: 10 }}
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP4CNwjod7C14qrdU0_Qw8KdTkNES0XdMwPA&usqp=CAU"
                                  alt="likes-comment"
                                />
                                <strong>0 Likes</strong>
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="post-comment-content">Same Doubt</div>
                      </div>
                  </div>
                  
                </div>
              </div>
          </div>

        </div>


        <div className="notice-board">

        </div>
      </div>
    )
  }
}

export default Classroom;
