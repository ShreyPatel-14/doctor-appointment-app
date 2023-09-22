import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Alert from "@mui/material/Alert";

function Signin(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [line, setLine] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  }
  const getData = async (e) => {
    e.preventDefault();
    try {
      let result = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.mail) {
        setMail(result.mail);
        setPass("");
      } else if (result.pass) {
        setPass(result.pass);
        setMail("");
      } else if (result.message) {
        setMail("");
        setPass("");
        if (result.isdoctor) {
          localStorage.setItem("is_doctor", true);
          localStorage.setItem("swapIcons", true);
          localStorage.setItem("email", result.getemail);
          localStorage.setItem("Id", result.getid);
          navigate("/dashboard");
          window.location.reload();
        } else {
          localStorage.setItem("swapIcons", true);
          localStorage.setItem("email", result.getemail);
          localStorage.setItem("Id", result.getid);
          navigate("/");
          window.location.reload();
        }
      }
      console.warn(result);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex-column",
          justifyContent: "center",
          alignItems: "center",
          padding: "35vh 0 35vh 0",
        }}
      >
        <h1 className="d-flex justify-content-center">Sign In</h1>
        <form onSubmit={getData}>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
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
                label="Your Email"
                name="email"
                onChange={handleInput}
                variant="standard"
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
              />
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
          <div className="d-flex justify-content-center mt-4">
            <input
              type="submit"
              value="Login"
              className="px-5 fs-5 btn-c1 btn color1 rounded-pill"
            />
          </div>
        </form>
        <div className="d-sm-none d-flex mt-3 fs-4 justify-content-center">
          New user?{" "}
          <Link
            to="/login/signup"
            className="px-2"
            style={{ color: "#002B5B" }}
          >
            {" "}
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
