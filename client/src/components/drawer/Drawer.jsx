/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { styled, Drawer, Box, Typography } from "@mui/material";
import Profile from "./Profile";
import { ArrowBack } from "@mui/icons-material";

const Header = styled(Box)`
  background: #008069;
  height: 90px;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 10px; 
`;

const Component = styled(Box)`
  background: #ededed;
  height: 85%;
`;

const Text = styled(Typography)`
  font-size: 18px;
  margin-left: 8px; /* Add margin to separate icon and text */
`;

const drawerStyle = {
  left: 20,
  top: 17,
  height: "95%",
  width: "30%",
  boxShadow: "none",
};

const InfoDrawer = ({ open, setOpen, profile }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: drawerStyle }}
      style={{ zIndex: 1500 }}
    >
      <Header>
        <ArrowBack onClick={() => setOpen(false)} fontSize="small" />
        <Text>Profile</Text>
      </Header>
      <Component>{<Profile />}</Component>
    </Drawer>
  );
};

export default InfoDrawer;
