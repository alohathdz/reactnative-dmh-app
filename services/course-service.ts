import axios from "axios";

export async function getCourseService() {
  return axios.get("https://api.codingthailand.com/api/course");
}