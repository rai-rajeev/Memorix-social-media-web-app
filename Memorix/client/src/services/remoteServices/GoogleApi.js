import axios from "axios";

const GoogleApi = axios.create({ baseURL: "https://www.googleapis.com/oauth2/v1/" });
export const gooleprofiledata = (responseData) => GoogleApi.get(`/userinfo?access_token=${responseData.access_token}`, {
  headers: {
    Authorization: `Bearer ${responseData.access_token}`,
    Accept: 'application/json'
  }
});
