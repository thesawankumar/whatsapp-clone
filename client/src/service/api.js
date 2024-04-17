import axios from "axios";

const url = "http://localhost:5000";

export const addUser = async (data) => {
  try {
    let response = await axios.post(`${url}/api/v1/add`, data);
    return response.data;
  } catch (error) {
    console.log("Error while addUser API", error.message);
  }
};
export const getUsers = async () => {
  try {
    let response = await axios.get(`${url}/api/v1/users`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getUsers API ", error);
  }
};
export const setConversation = async (data) => {
  try {
    await axios.post(`${url}/api/v1/conversation/add`, data);
  } catch (error) {
    console.log("Error while calling setConversation API ", error);
  }
};
export const getConversation = async (users) => {
  try {
    let response = await axios.post(`${url}/api/v1/conversation/get`, users);
    return response.data;
  } catch (error) {
    console.log("Error while calling getConversation API ", error);
  }
};
export const getMessages = async (id) => {
  try {
    let response = await axios.get(`${url}/api/v1/message/get/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getMessages API ", error);
  }
};

export const newMessages = async (data) => {
  try {
    return await axios.post(`${url}/api/v1/message/add`, data);
  } catch (error) {
    console.log("Error while calling newConversations API ", error);
  }
};
export const uploadFile = async (data) => {
  try {
    return await axios.post(`${url}/api/v1/file/upload`, data);
  } catch (error) {
    console.log("Error while calling uploadFile API ", error);
  }
};
