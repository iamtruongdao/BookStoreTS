export interface Province {
  ProvinceID: number
  ProvinceName: string
}

export interface District {
  Code: string
  DistrictID: number
  DistrictName: string
  ProvinceID: number
}

export interface Ward {
  WardCode: string
  WardName: string
  DistrictID: number
}
