import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";

// Material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function Settings() {
  const [name,setName] = useState('');
  const [sid,setSid] = useState('');
  const [newPassword,setNewPasssword] = useState('');
  const [previousPassword, setPreviousPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const dispatch = useDispatch();

  const [file,setFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState('');

  const [error,setError] = useState('');
  const [success,setSuccess] = useState('');

  const [editProfile,setEditProfile] = useState(false);
  const {user} = useSelector(state => state.auth);

  if(!user){
      return <></>
  }
  function getFormBody(params) {
    let FormBody = [];
    for (let property in params) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(params[property]);
      FormBody.push(encodedKey + "=" + encodedValue);
    }
    return FormBody.join("&");
  }
  const onChange =(e)=>{
        if(e.target.files[0] && e.target.files[0].name){
            let parts = e.target.files[0].name.split('.');
            if(parts && parts.length > 1){
                let ext = parts[parts.length - 1];
                switch(ext.toLowerCase()){
                    case 'jpg':
                    case 'jpeg':
                    case 'png':
                        {const reader = new FileReader();
                        reader.addEventListener("load", ()=>{
                            setFile(e.target.files[0]);
                            setUploadedFile(reader.result);
                            setSuccess("File Uploaded successfully !!!");  
                            setTimeout(()=>{
                                setSuccess('');
                            },6000)
    
                        })
                        reader.readAsDataURL(e.target.files[0]);
                        break;
                     }
                    default: 
                     setError("File not of right format");  
                     setTimeout(()=>{
                        setError('');
                    },6000)
                    break;  
                  }}}
  }
  const onSubmit = async (e) =>{
    e.preventDefault();
    if(newPassword || previousPassword || confirmNewPassword){
        if(previousPassword){
            console.log(uploadedFile, user.id,name,sid,newPassword,previousPassword);
            if((newPassword && confirmNewPassword && newPassword === confirmNewPassword) || (!newPassword && !confirmNewPassword)){
                const url = "/api/users/updateProfile";
                fetch(url, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: getFormBody({avatar:uploadedFile, email:user?.email,name,SID:sid,newPassword,previousPassword}),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.success) {
                        localStorage.setItem("token", data.data.token);
                        dispatch({type:'LOGIN_SUCCESS', user: data.data.user})
                        setSuccess(data.message);
                        setTimeout(()=>{
                        setSuccess('');
                        },6000)
                        return;
                      }
                      else{
                          if(data?.data?.user){
                            dispatch({type:'LOGIN_SUCCESS', user: data.data.user})
                          }
                            setError(data?.message);
                            setTimeout(()=>{
                            setError('');
                            },6000)

                      }
                    
                    }) 
            }
            else{
            setError("New Password and Confirm New Passsword Fields don't match!! Try Again");
            setTimeout(()=>{
            setError('');
            },8000)
            }
        }
        else{
            setError("To Update Profile Fill previous password");
            setTimeout(()=>{
            setError('');
            },8000)
        }
    }
    else{
        setError("To Update Profile Fill previous password");
        setTimeout(()=>{
        setError('');
        },8000)
    }
    }
            
  return <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}>
                    {uploadedFile ? <Avatar src={uploadedFile} sx={{ width: 156, height: 156,backgroundSize: 'cover',
backgroundPosition: 'top center' }}>
                    </Avatar> :<Avatar src={user.avatar} sx={{ width: 156, height: 156,backgroundSize: 'cover',
backgroundPosition: 'top center' }}>
                    </Avatar>}
                    {error && <Snackbar open={true} autoHideDuration={2000}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                        {error}
                        </Alert>
                    </Snackbar>}
                    {success && <Snackbar open={true} autoHideDuration={2000}>
                        <Alert severity="success" sx={{ width: '100%' }}>
                        {success}
                        </Alert>
                    </Snackbar>}
                
                    <Typography component="h1" variant="h5">
                        Profile
                    </Typography>
                    <Box component="form" sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={`Email - ${user.email}`}
                            disabled={true}
                        />
                        {editProfile && <TextField
                            margin="normal"
                            required
                            fullWidth
                            label = "Name"
                            name="name"
                            type="text"
                            id="name"
                            autoComplete="name"
                            onChange = {(e)=>{setName(e.target.value)}}
                        />} 
                        {!editProfile && <TextField
                        margin="normal"
                        fullWidth
                        name="name1"
                        id="name1"
                        autoComplete="name1"
                        value={`Name - ${user.name}`}
                        disabled={true}
                    />}
                    {(editProfile && user.role === 'Student') && (<TextField
                            margin="normal"
                            required
                            fullWidth
                            label = "SID"
                            name="sid"
                            type="text"
                            id="sid"
                            autoComplete="sid"
                            onChange = {(e)=>{setSid(e.target.value)}}
                        />)}
                        {(user.role === "Student" && !editProfile ) && (<TextField
                        margin="normal"
                        fullWidth
                        name="sid1"
                        id="sid1"
                        autoComplete="sid1"
                        value={`SID - ${user.SID}`}
                        disabled={true}
                    />)}
                    {editProfile && <><TextField
                            margin="normal"
                            fullWidth
                            label = "Avatar"
                            name="avatar"
                            type="file"
                            id="avatar"
                            autoComplete="Avatar"
                            onChange = {onChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="newPassword"
                            autoComplete="new-password"
                            onChange={(e)=>{setNewPasssword(e.target.value)}}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm New Password"
                            type="password"
                            id="confirmPassword"
                            onChange={(e)=>{setConfirmNewPassword(e.target.value)}}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="oldPassword"
                            label="Enter Old Password"
                            type="password"
                            id="oldPassword"
                            autoComplete="old-password"
                            onChange={(e)=>{setPreviousPassword(e.target.value)}}
                        /></>}
                        
                        {editProfile ? <><Button
                            type="submit"
                            variant="contained"
                            sx={{mt: 3, mb: 2, ml:7, mr:7}}
                            onClick={()=>{setEditProfile(false)}}
                            color="error"

                        >
                            Go Back
                        </Button><Button
                            type="submit"
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick = {onSubmit}
                            color = "success" 
                        >
                            Save
                        </Button></> :<Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={()=>{setEditProfile(true)}}

                        >
                            Edit Profile
                        </Button>}
                        
                        
                        <Grid container>
                        </Grid>
                    </Box>
                </Box>
            </Container>
  </div>;
}

