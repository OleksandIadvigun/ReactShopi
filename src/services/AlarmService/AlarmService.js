import axios from "axios";

export default function AlarmService() {
    return {
        getAlarms: () => {
            return axios.get('alarms');
        }
    }
}
