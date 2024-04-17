/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Box, styled } from "@mui/material";
import { useContext, useState, useEffect, useRef } from "react";
import { AccountContext } from "../../../context/AccountProvider";
import Footer from "./Footer";
import Message from "./Message";
import { getMessages, newMessages } from "../../../service/api";
const Wrapper = styled(Box)`
  background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
  background-size: 50%;
`;
const StyledFooter = styled(Box)`
  height: 55px;
  background: #ededed;
  margin-top: 12px;
  // position: absolute;
  width: 100%;
  // bottom: 0px;
`;

const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;

const Container = styled(Box)`
  padding: 1px 80px;
`;

const Messages = ({ person, conversation }) => {
  const { account, socket, newMessageFlag, setNewMessageFlag } =
    useContext(AccountContext);
  const [value, setValue] = useState();
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);

  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    const getMessageDetails = async () => {
      let data = await getMessages(conversation._id);
      setMessages(data);
    };
    conversation._id && getMessageDetails();
  }, [conversation._id, person._id, newMessageFlag]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" });
  }, [messages]);
  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);

  const receiverId = conversation?.members?.find(
    (member) => member !== account.sub
  );
  const sendText = async (e) => {
    let code = e.keyCode || e.which;
    if (!value) return;
    if (code === 13) {
      let message = {};
      if (!file) {
        message = {
          senderId: account.sub,
          receiverId: receiverId,
          conversationId: conversation._id,
          type: "text",
          text: value,
        };
      } else {
        message = {
          senderId: account.sub,
          conversationId: conversation._id,
          receiverId: receiverId,
          type: "file",
          text: image,
        };
      }
      socket.current.emit("sendMessage", message);
      await newMessages(message);
      setValue("");
      setFile("");
      setImage("");
      setNewMessageFlag((prev) => !prev);
    }
  };
  return (
    <Wrapper>
      <Component>
        {messages &&
          messages.map((message) => (
            <Container key={message._id} ref={scrollRef}>
              <Message message={message} />
            </Container>
          ))}
      </Component>
      <Footer
        sendText={sendText}
        value={value}
        setValue={setValue}
        setFile={setFile}
        file={file}
        setImage={setImage}
      />
    </Wrapper>
  );
};

export default Messages;
