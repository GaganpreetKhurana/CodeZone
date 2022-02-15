import React from "react";
import { connect } from "react-redux";
import { createPost,likePost, createComment,likeComment} from '../actions/posts';
import DeletePost from './DeletePost';
import DeleteComment from './DeleteComment';
import EditPost from './EditPost';
import EditComment from './EditComment'

import EmbedVideo from "./EmbedVideo";
import FileBase64 from "react-file-base64";

//Material UI
import { Grid} from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import PostAddIcon from '@mui/icons-material/PostAdd';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Menu,MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

class DiscussionPortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      contentComment: "",
      anchorEl: null,
      open: false,
      files: "",
      fileUpload: false,
    };
    this.setAnchorEl = this.setAnchorEl.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
    this.handleCommentClose = this.handleCommentClose.bind(this);
  }

  handleCommentClick(event) {
    this.setAnchorEl(event.currentTarget);
  }
  setAnchorEl(value) {
    this.setState({
      anchorEl: value,
      open: !this.state.open,
    });
  }
  handleCommentClose() {
    this.setAnchorEl(null);
  }

  commentMenu(id, content) {
    return (
      <Menu
        id="fade-menu"
        anchorEl={this.state.anchorEl}
        open={this.state.open}
        onClose={this.handleCommentClose}
      >
        <MenuItem>
          <DeleteComment id={id} role={"Comment"} />
        </MenuItem>
        <MenuItem>
          <EditComment id={id} content={content} />
        </MenuItem>
        <MenuItem onClick={this.handleCommentClose}>Close Menu</MenuItem>
      </Menu>
    );
  }

  //posts
  handleOnClick = () => {
    // dispatch action
    const { classroomId } = this.props;
    if ((this.state.content || this.state.files) && classroomId) {
      if (!this.state.content.length) {
        // eslint-disable-next-line
        this.state.content = "File Post";
      }
      let fileVal = this.state.files;
      if (fileVal === "") {
        // eslint-disable-next-line
        fileVal = "Empty";
      } else {
        fileVal = fileVal.base64;
      }
      this.props.dispatch(createPost(this.state.content, fileVal, classroomId));
      this.setState({
        content: "",
        files: "",
      });
    }
  };

  handleOnLikePostClick = (post_id) => () => {
    this.props.dispatch(likePost(post_id));
  };

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleFileChange = () => {
    this.setState({
      fileUpload: !this.state.fileUpload,
    });
  };

  //comment
  checkColor = (likes) => {
    let { user } = this.props.auth;
    let likedByUser = likes.filter(({ _id }) => _id === user.id);
    if (likedByUser.length > 0) {
      return "secondary";
    }
  };
  handleChangeComment = (e) => {
    this.setState({
      contentComment: e.target.value,
    });
  };
  handleOnLikeCommentClick = (comment_id) => () => {
    this.props.dispatch(likeComment(comment_id));
  };
  handleOnClickComment = (post_id) => () => {
    // dispatch action
    if (this.state.contentComment && post_id) {
      this.props.dispatch(createComment(this.state.contentComment, post_id));
      this.setState({
        contentComment: "",
      });
    }
  };

  getFiles = (files) => {
    this.setState({ files: files });
  };

  render() {
    const { posts } = this.props.classroom;
    let { user } = this.props.auth;
    return (
      <div>
        <Paper
          elevation={4}
          component="form"
          sx={{
            p: "12px 6px",
            display: "flex",
            alignItems: "center",
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#272727" : "#fff",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Post A Classroom Query or Notification"
            inputProps={{ "aria-label": "search google maps" }}
            value={this.state.content}
            onChange={this.handleChange}
          />
          {this.state.fileUpload && (
            <FileBase64 multiple={false} onDone={this.getFiles.bind(this)} />
          )}
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Image"
              onChange={this.handleFileChange}
            />
          </FormGroup>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          {this.state.files !== "" && (
            <img alt="" src={this.state.files.base64} width="50" height="50" />
          )}
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="directions"
          >
            <PostAddIcon onClick={this.handleOnClick} />
          </IconButton>
        </Paper>
        {/* displaying old posts of classroom */}
        {!posts.length && <p>No Posts exist for this classroom</p>}

        {posts.length > 0 &&
          posts.map((post) => (
            <Box m={2} pt={3}>
              <Paper elevation={4}>
                <Card
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark" ? "#272727" : "#fff",
                  }}
                >
                  <CardHeader
                    avatar={<Avatar src={post?.user?.avatar} alt="user-pic" />}
                    title={post.user.name}
                    subheader={`${post.createdAt.slice(
                      0,
                      10
                    )}   ${post.createdAt.slice(11, 19)}`}
                  />
                  <Divider />
                  <ListItem>
                    <Typography variant="body1">{post.content}</Typography>
                  </ListItem>
                  {post.file !== "Empty" && (
                    <ListItem>
                      <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Grid item xs={3}>
                          <img
                            alt=""
                            src={post.file}
                            width="300"
                            height="300"
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                  )}
                  <ListItem>
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item xs={3}>
                        <EmbedVideo text={post.content} />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Grid
                      spacing={2}
                      container
                      direction="row"
                      justifyContent="space-evenly"
                    >
                      <Grid item xs={2} m={0.5}>
                        <ListItemIcon>
                          <IconButton>
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              {post.comments.length}
                            </Typography>
                            <CommentIcon fontSize="small" />
                          </IconButton>
                        </ListItemIcon>
                      </Grid>
                      <Grid item xs={2} m={0.5}>
                        <ListItemIcon>
                          <IconButton color={this.checkColor(post.likes)}>
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              {post.likes.length}
                            </Typography>
                            <FavoriteIcon
                              fontSize="small"
                              onClick={this.handleOnLikePostClick(post._id)}
                            />
                          </IconButton>
                        </ListItemIcon>
                      </Grid>
                      {/* edit and delete option of post available only to correct user */}
                      {post.user._id === user.id && (
                        <Grid item xs={2} m={0.5}>
                          <ListItemIcon>
                            <DeletePost id={post._id} role={"Post"} />
                          </ListItemIcon>
                        </Grid>
                      )}
                      {post.user._id === user.id && (
                        <Grid item xs={2} m={0.5}>
                          <ListItemIcon>
                            <EditPost
                              id={post._id}
                              content={post.content}
                              file={post.file}
                            />
                          </ListItemIcon>
                        </Grid>
                      )}
                    </Grid>
                  </ListItem>
                  <Divider />
                  <CardContent>
                    <Paper
                      component="form"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <InputBase
                        sx={{ ml: 2, flex: 1 }}
                        value={this.state.contentComment}
                        onChange={this.handleChangeComment}
                        placeholder="Start typing a comment"
                        inputProps={{ "aria-label": "search google maps" }}
                      />
                      <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                      />
                      <IconButton
                        color="primary"
                        sx={{ p: "10px" }}
                        aria-label="directions"
                      >
                        <CommentIcon
                          onClick={this.handleOnClickComment(post._id)}
                        />
                      </IconButton>
                    </Paper>

                    {/*Comments posted*/}
                    {post.comments.length > 0 &&
                      post.comments.map((comment) => (
                        <List sx={{ width: "100%" }}>
                          <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                              {/*Need to display the profile picture here */}
                              <Avatar
                                alt="Student 2"
                                src={comment?.user?.avatar}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Grid spacing={2} container direction="row">
                                  <Grid item xs={4} m={0.5}>
                                    <Typography
                                      variant="caption"
                                      display="block"
                                      gutterBottom
                                    >
                                      {comment.user.name}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={2.5} m={0.5}>
                                    {/* <Typography variant="caption" display="block" gutterBottom>
                            {`${post.createdAt.slice(0,10)}`}
                          </Typography> */}
                                  </Grid>
                                  <Grid item xs={2} m={0.5}>
                                    {/* <Typography variant="caption" display="block" gutterBottom>
                            {`${post.createdAt.slice(11, 19)}`}
                          </Typography> */}
                                  </Grid>
                                  {comment.user._id === user.id && (
                                    <Grid item xs={1} m={0.5}>
                                      <IconButton size="small">
                                        <Typography
                                          variant="caption"
                                          display="block"
                                          gutterBottom
                                        >
                                          <MenuIcon
                                            fontSize="small"
                                            aria-owns={
                                              this.state.open
                                                ? "fade-menu"
                                                : undefined
                                            }
                                            aria-haspopup="true"
                                            onClick={this.handleCommentClick}
                                          />
                                          {this.commentMenu(
                                            comment._id,
                                            comment.content
                                          )}
                                        </Typography>
                                      </IconButton>
                                    </Grid>
                                  )}
                                  <Grid item xs={1} m={0.5}>
                                    <IconButton
                                      size="small"
                                      fontSize="small"
                                      color={this.checkColor(comment.likes)}
                                    >
                                      <Typography
                                        variant="caption"
                                        color={this.checkColor(comment.likes)}
                                        display="block"
                                        gutterBottom
                                      >
                                        {comment.likes.length}
                                      </Typography>
                                      <FavoriteIcon
                                        fontSize="small"
                                        color={this.checkColor(comment.likes)}
                                        onClick={this.handleOnLikeCommentClick(
                                          comment._id
                                        )}
                                      />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              }
                              secondary={
                                <React.Fragment>
                                  {comment.content}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </List>
                      ))}
                  </CardContent>
                </Card>
              </Paper>
            </Box>
          ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      auth: state.auth,
      darkModetheme: state.theme,
      classroom: state.classroom
    };
  }
export default connect(mapStateToProps)(DiscussionPortal);
