import { Box, Dialog, List, ListItem, Typography, styled } from "@mui/material";
import { qrCodeImage } from "../../constants/data";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../service/api";

const Component = styled(Box)`
  display: flex;
  flex-direction: column;
  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const Container = styled(Box)`
  padding: 24px;
`;

const QRCOde = styled("img")({
  margin: "50px 0 0 50px",
  height: 254,
  width: 254,
  display: "block",
});

const Title = styled(Typography)`
  font-size: 26px;
  margin-bottom: 25px;
  color: #525252;
  font-family: Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu,
    Cantarell, Fira Sans, sans-serif;
  font-weight: 300;
`;

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;

const dialogStyle = {
  marginTop: "12%",
  height: "95%",
  width: "60%",
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: 0,
  boxShadow: "none",
  overflow: "hidden",
};
const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);

  const onLoginSuccess = async (res) => {
    const decoded = jwtDecode(res.credential); // Decode the JWT token
    setAccount(decoded);
    // setShowloginButton(false);
    // setShowlogoutButton(true);
    await addUser(decoded);
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };
  return (
    <Dialog
      open={true}
      PaperProps={{ sx: dialogStyle }}
      hideBackdrop={{ style: { backgroundColor: "unset" } }}
      maxWidth={"md"}
    >
      <Component>
        <Container>
          <Title>To use WhatsApp on your computer:</Title>
          <StyledList>
            <ListItem>1. Open Whatsapp on your phone</ListItem>
            <ListItem>2. Tap Menu on Android, or Settings on Iphone</ListItem>
            <ListItem>3. Tap Linked devices and then Link a device</ListItem>
          </StyledList>
        </Container>
        <Box style={{ position: "relative" }}>
          <QRCOde src={qrCodeImage} alt="qr code" />
          <Box
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateX(25%) translateY(-25%)",
            }}
          >
            <GoogleLogin
              buttonText=""
              onSuccess={onLoginSuccess}
              onError={onLoginFailure}
            />
          </Box>
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
