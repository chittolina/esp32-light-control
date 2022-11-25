import axios, { AxiosInstance } from "axios";

export interface UpdateVariables {
  min_luminosity: number;
  min_temp: number;
  max_temp: number;
  min_humidity: number;
}

interface CurrentState {
  min_luminosity: number;
  min_temp: number;
  max_temp: number;
  min_humidity: number;
  lamp_incandenscent: boolean;
  lamp_fluorescent: boolean;
  temp: number;
  humidity: number;
}

class Client {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({ baseURL: "http://192.168.137.166" });
  }

  public async getCurrentState(): Promise<CurrentState> {
    // const { data } = await this.client.get("status");
    // const { lamp_sensibility, lamp_time, lamp_state } = data;

    return Promise.resolve({
      min_luminosity: 1000,
      min_temp: 25,
      max_temp: 30,
      min_humidity: 50,
      lamp_fluorescent: true,
      lamp_incandenscent: false,
      humidity: 79,
      temp: 38,
    });
  }

  public async updateSettings(data: UpdateVariables) {
    const res = await this.client.post("update", data);
    return res.status === 200;
  }
}

export default new Client();
