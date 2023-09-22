import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import Alert from "@mui/material/Alert";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const e1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const p1 =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const { email, password } = user;
    if (!e1.test(email)) {
      setMail("Please enter Valid Email id!");
      setPass("");
    } else if (!p1.test(password)) {
      setPass("Please enter Valid Password!");
      setMail("");
    } else {
      setMail("");
      setPass("");
      let result = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.error) {
        setMail("Email id is aldready registered");
      } else if (result.message) {
        navigate("/login/signin");
      }
      console.warn(result);
      if (result) {
        setUser({ name: "", email: "", password: "" });
      }
    }
  };
  return (
    <div style={{ paddingBottom: "26vh" }}>
      <div
        style={{
          display: "flex-column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "26vh",
        }}
      >
        <h1 className="d-flex justify-content-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              "& > :not(style)": { m: 1 },
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <AccountCircle
                sx={{ color: "action.active", mr: 1, my: 1, fontSize: "30px" }}
              />
              <TextField
                sx={{ width: "50%", m: 1 }}
                label="Your Name"
                name="name"
                variant="standard"
                onChange={handleInput}
                required
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <EmailIcon
                sx={{ color: "action.active", mr: 1, my: 1, fontSize: "30px" }}
              />
              <TextField
                sx={{ width: "50%", m: 1 }}
                label="Your Email"
                name="email"
                variant="standard"
                type="text"
                onChange={handleInput}
                required
              />
            </Box>
            {mail && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Alert severity="error" sx={{ width: "56.5%", m: 1 }}>
                  {mail}
                </Alert>
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <LockIcon
                sx={{ color: "action.active", mr: 1, my: 1, fontSize: "30px" }}
              />
              <TextField
                sx={{ width: "50%", m: 1 }}
                label="Your Password"
                name="password"
                type="password"
                onChange={handleInput}
                variant="standard"
                required
              />{" "}
            </Box>
            {pass && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Alert severity="error" sx={{ width: "56.5%", m: 1 }}>
                  {pass}
                </Alert>
              </Box>
            )}
          </Box>
          <div className="d-flex justify-content-center mt-3">
            <input
              type="submit"
              value="Register"
              className="btn btn-c2 px-5 fs-5 color2 rounded-pill"
            />
          </div>
        </form>
      </div>
      <div className="d-sm-none d-flex mt-3 fs-4 justify-content-center">
        One of us?{" "}
        <Link to="/login/signin" className="px-2" style={{ color: "#159895" }}>
          {" "}
          SignIn
        </Link>
      </div>
    </div>
  );
}

export default Signup;
