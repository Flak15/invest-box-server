export interface IdbConfig {
  url: string,
  name: string,
  connectTimeoutMS: number,
  useNewUrlParser: boolean,
  useUnifiedTopology: boolean
}

export interface IpriceData {
  price: number,
  currency: string,
  shortName: string,
  exchangeName: string,
  symbol: string
}