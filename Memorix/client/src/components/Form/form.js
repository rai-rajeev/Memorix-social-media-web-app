import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {MuiChipsInput as ChipInput} from "mui-chips-input";
import "./form.css";

import { createPost, updatePost } from "../../services/memories";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
    isVideo: false,
  });
  const post = useSelector((state) =>
    currentId
      ? state.mem.posts.find((message) => message._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("Profile"));
  const navigate = useNavigate();
  const fileRef=useRef();

  const clear = () => {
    setCurrentId(0);
    if(fileRef.current){
      fileRef.current.value="";
    }
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
      isVideo: false,
    });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      console.log(postData);
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    } else {
      dispatch(
        updatePost(currentId, {...post, ...postData,})
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className="" elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  return (
    <Paper className="form-paper" elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className="root form-memories"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post?.title}"` : "Creating a Memory"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAddChip={(chip) => handleAddChip(chip)}
            onDeleteChip={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className="file-input-memory">
          <input
            type="file"
            accept="image/* video/*"
            ref={fileRef}
            onChange={(e) => {

              setPostData({
                ...postData,
                selectedFile: e.target.files[0],
                isVideo: e.target.files[0].type.includes("video/"),
              });
            }}
          />
        </div>
        <Button
          className="button-submit"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
