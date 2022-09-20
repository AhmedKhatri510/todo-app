import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../Firebase";

import Todo from "./Todo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Consumer } from "../context";

export default function Login() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  console.log(user);
  let el;
  //if there is some user, save the user and navigate
  if (Object.keys(user).length !== 0)
    return <Consumer>{({ dispatch }) => {}}</Consumer>;
  else {
    return (
      <Card
        sx={{ minWidth: 275, maxWidth: 400 }}
        style={{
          textAlign: "center",
          maxHeight: "220px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "30px",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            TODO App
          </Typography>
          <Typography variant="h5" component="div">
            Use TODO App, to define your daily task !
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            size="small"
            style={{
              color: " black",
              gap: "6px",
              backgroundColor: "#D3D3D3",
            }}
            onClick={async () => {
              const res = await signInWithGoogle();
              setUser(res);
              navigate("/todo");
            }}
          >
            <FcGoogle />
            SignIn with Google
          </Button>
        </CardActions>
      </Card>
    );
  }
  //if there is no user, show sign up
}
