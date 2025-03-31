import axios from 'axios'

const API_JSON_SERVER = 'https://api.jsonbin.io/v3/b/67e2c8078561e97a50f283b3'
const X_MASTER_KEY =
  '$2a$10$kISsO.JYKcHAi2PU9VmxWua4ke/7F204.e.mpHRo1UV/xTyW.qOni'

const httpClient = axios.create({
  baseURL: API_JSON_SERVER,
  headers: {
    'Content-Type': 'application/json',
    'X-Master-Key': X_MASTER_KEY,
  },
})

httpClient.interceptors.request.use((config) => {
  return config
})

export default httpClient
