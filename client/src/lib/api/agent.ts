import axios from "axios";
import { agentRequestUse, agentResponseUse } from "../util/agentUtil";

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agentRequestUse(agent);
agentResponseUse(agent);

export default agent;