import axios from "axios";
export const AXIOS = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJUb20iLCJleHAiOjE2MTcxMzgwMDB9.lqeZVDsM2G_VO8KTzasWYL6amkHaqHSmakteE4ta60c5kddL-HPde-jVBYFQTppb0vnTNMhJsEHYdZlqfy3VHw'
    }
})
