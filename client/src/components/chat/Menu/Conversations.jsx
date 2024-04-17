/* eslint-disable react/prop-types */

import { useEffect, useState, useContext } from "react";
import { getUsers } from "../../../service/api";
import { Box, Divider, styled } from "@mui/material";
import { AccountContext } from "../../../context/AccountProvider";
import Conversation from "./Conversation";
const Component = styled(Box)`
  overflow: overlay;
  height: 81vh;
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 60px;
  background-color: #e9edef;
  opacity: 0.6;
`;
const Conversations = ({ text }) => {
  const [users, setUsers] = useState([]);
  const { account, socket, setActiveUsers } = useContext(AccountContext);
  useEffect(() => {
    const fetchData = async () => {
      let data = await getUsers();
      let fiteredData = data.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setUsers(fiteredData);
    };
    fetchData();
  }, [text]);
  useEffect(() => {
    socket.current.emit("addUser", account);
    socket.current.on("getUsers", (users) => {
      setActiveUsers(users);
    });
  }, [account]);
  return (
    <Component>
      {users &&
        users.map(
          (user) =>
            user.sub !== account.sub && (
              <>
                <Conversation user={user} />
                {<StyledDivider />}
              </>
            )
        )}
    </Component>
  );
};

export default Conversations;
