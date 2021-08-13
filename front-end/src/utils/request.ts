import { group_id } from 'config/group';
import qs from "qs";
import { pad } from "./time";

// const SERVER_URL = process.env.SERVER_URL;
const SERVER_URL = "http://10.102.32.57:5702";

const fetchRequest = async (requestType: string, data: object) => {
  const config = { method: "GET" };
  const endpoint = `${SERVER_URL}/${requestType}?${qs.stringify(data)}`;

  return fetch(endpoint, config)
    .then(async (response) => {
      const responseData = await response.json().catch((error) => {
        console.warn(`Data is not a JSON object: ${error.message}`);
      });
      if (response.ok) {
        return Promise.resolve(responseData);
      } else {
        return Promise.reject(response.status);
      }
    })
}

export const sendGroupMessage = async (message: string, plainText: boolean = false) => {
  console.log(`[SEND]: ${message}`);
  return fetchRequest("send_group_message", {
    group_id: group_id,
    message: message,
    auto_escape: plainText
  })
}

export const updateGroupMemberList = async () => {
  return fetchRequest("update_group_member_list", {
    group_id: group_id
  })
}

export const getSignInList = async (date?: Date) => {
  let dateString = "";
  if (date) {
    dateString = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} `
  }
  return fetchRequest("get_sign_in_list", {
    date: dateString
  })
}