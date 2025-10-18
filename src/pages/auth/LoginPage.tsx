import { useState,} from "react";
import {Button,Box,Typography,TextField,InputAdornment,IconButton} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppDispatch ,useAppSelector,type RootState} from "@/store/store";
import { login } from "@/store/auth/auth.thunk";
import Spinner from "@/common/suspense/Spinner";
import bg from "../../assets/tim-van-der-kuip-CPs2X8JYmS8-unsplash.jpg";
import Logo from "../../assets/track3.svg";


const LoginPage = () => {
  const auth=useAppSelector((state:RootState)=>state.auth);
  const dispatch=useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async() => {
    setLoading(true);
    try{
      await dispatch(login({email,password})).unwrap();
      navigate("/dashboard",{replace:true})
    }catch(error:any){
setError(error.message||"Invalid email or password")
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box display="flex" height="100vh">
      {/* Left Side */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        px={6}
      >
        {loading ? (
          <Spinner />
        ) : (
          <Box width="100%" maxWidth={360} p={2}>
            {/* Logo */}
            <Box display="flex" justifyContent="center">
              <Box
                component="img"
                src={Logo}
                alt="App Logo"
                sx={{
                  width: 40,
                  height: 40,
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* App Name */}
            <Typography
              variant="h5"
              align="center"
              sx={{ color: "#00b894", fontWeight: "bold" }}
            >
              QTrack
            </Typography>

            <Typography
              align="center"
              sx={{
                color: "black",
                fontSize: "0.9rem",
                mb: 3,
                letterSpacing: 1.5,
              }}
            >
              Your precision powers our trust.
            </Typography>

            {/* Email */}
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: "6px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e0e0e0", // normal border
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e0e0e0", // no hover color change
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e0e0e0",
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px white inset",
                    WebkitTextFillColor: "black",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                },
              }}
              InputLabelProps={{
                shrink: true,
                sx: {
                  color: "gray",
                  "&.Mui-focused": { color: "gray" },
                },
              }}
            />

            {/* Password */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: "6px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e0e0e0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e0e0e0",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#e0e0e0",
                  },
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px white inset",
                    WebkitTextFillColor: "black",
                    transition: "background-color 5000s ease-in-out 0s",
                  },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "#00b894" }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
                sx: {
                  color: "gray",
                  "&.Mui-focused": { color: "gray" },
                },
              }}
            />

            {/* Error Message */}
            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            {/* Button */}
            <Button
              fullWidth
              onClick={handleLogin}
              disabled={loading}
              sx={{
                mt: 2,
                backgroundColor: "#00b894",
                color: "white",
                borderRadius:2,
                textTransform: "none",
                height: 40,
                "&:hover": { backgroundColor: "#066d5c" },
              }}
            >
              {loading ? <Spinner /> : "Sign In"}
            </Button>
          </Box>
        )}
      </Box>

      {/* Right Side */}
      <Box
        flex={1}
        sx={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "block" },
          borderRadius: "40px 0px 0px 40px",
        }}
      />
    </Box>
  );
};

export default LoginPage;
