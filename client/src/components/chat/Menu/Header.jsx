import { Box, styled } from "@mui/material";
import { useContext, useState } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import { Chat as MessageIcon } from "@mui/icons-material";
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../drawer/Drawer";

const Component = styled(Box)`
  height: 44px;
  background: #ededed;
  display: flex;
  padding: 8px 16px;
  margin-top: 10px;
  align-items: center;
`;

const Wrapper = styled(Box)`
  margin-left: auto;
  display: flex;
  align-items: center;
  & > * {
    margin-left: 8px;
    font-size: 28px;
    color: #000;
    cursor: pointer;
  }
`;

const Image = styled("img")`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { account } = useContext(AccountContext);
  const toggleDrawer = () => {
    setOpenDrawer(true);
  };
  return (
    <>
      <Component>
        <Image src={account.picture} alt="dp" onClick={() => toggleDrawer()} />
        <Wrapper>
          <MessageIcon />
          <HeaderMenu setOpenDrawer={setOpenDrawer} />
        </Wrapper>
      </Component>
      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </>
  );
};

export default Header;
