export interface UPRN {
  Classification: string;
  Latitude: string;
  Longitude: string;
  Matched: boolean;
  Pointcode: string;
  UPRN: string;
  XCoordinate: string;
  YCoordinate: string;
}

export interface Address {
  Number: string;
  Postcode: string;
  Street: string;
  Town: string;
}

export interface MapPin {
  lat: number;
  lng: number;
  info?: any;
  xCoor?: string;
  yCoor?: string;
  pointCode?: string;
}

export interface MatchPattern {
  Building: string;
  Flat: string;
  Number: string;
  Postcode: string;
  Street: string;
}

export interface SearchResponse {
  ABPAddress: Address;
  Address_format: string;
  Algorithm: string;
  ClassTerm: string;
  Classification: string;
  MatchPattern: MatchPattern;
  Matched: boolean;
  Postcode_quality: string;
  Qualifier: string;
  UPRN: string;
}
