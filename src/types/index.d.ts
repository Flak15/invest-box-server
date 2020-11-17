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

export interface IauthData {
  user: string,
  pass: string
}

export interface Iportfolio {
  _id: string,
  userId: string,
  symbol: string,
  value: number
}

export interface Iinstrument {
  _id: string,
  symbol: string,
  price: number,
  shortName: string,
  currency: string
}

export interface Iuser {
  _id: string,
  user: string,
  pass: string
}