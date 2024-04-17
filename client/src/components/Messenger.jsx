import LoginDialog from "./account/LoginDialog";
import { useContext } from "react";
import { AppBar, Box, Toolbar, styled } from "@mui/material";
import { AccountContext } from "../context/AccountProvider";
import ChatDialog from "./chat/ChatDialog";

const Component = styled(Box)`
  height: 100vh;
  background-color: #dcdcdc;
`;
const Header = styled(AppBar)`
  height: 150px;
  background-color: #00bfa5;
  box-shadow: none;
`;
const LoginHeader = styled(AppBar)`
  background: #00bfa5;
  height: 200px;
  box-shadow: none;
`;
const Messenger = () => {
  const { account } = useContext(AccountContext);
  // console.log(account);
  return (
    <Component>
      {account ? (
        <>
          <Header>
            <Toolbar></Toolbar>
          </Header>
          <ChatDialog />
        </>
      ) : (
        <>
          <LoginHeader>
            <Toolbar></Toolbar>
          </LoginHeader>
          <LoginDialog />
        </>
      )}
    </Component>
  );
};

export default Messenger;
