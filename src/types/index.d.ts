export interface IdbConfig {
  url: string,
  name: string,
  connectTimeoutMS: number,
  useNewUrlParser: boolean,
  useUnifiedTopology: boolean
}

export interface IpriceData {
  price: number,
  // currency: string,
  // shortName: string,
  // exchangeName: string,
  // symbol: string,
  [key:string]: Metadata,
}

export interface IsummaryDetail {
  [key:string]: MetaData
}

export interface IauthData {
  username: string,
  password: string
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
  username: string,
  password: string
}