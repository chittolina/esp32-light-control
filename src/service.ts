import axios, { AxiosInstance } from "axios";

export interface UpdateVariables {
  lamp_sensibility: number;
  lamp_time: number;
}

interface CurrentState {
  lamp_sensibility: number;
  lamp_time: number;
  lamp_state: number;
}

class Client {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({ baseURL: "http://localhost:8080" });
  }

  public async getCurrentState(): Promise<CurrentState> {
    const { data } = await this.client.get("lamp-status");
    const { lamp_sensibility, lamp_time, lamp_state } = data;

    return { lamp_sensibility, lamp_time, lamp_state };
  }

  public async updateSettings(data: UpdateVariables) {
    const res = await this.client.post("update-variables", data);
    return res.status === 200;
  }
}

export default new Client();
