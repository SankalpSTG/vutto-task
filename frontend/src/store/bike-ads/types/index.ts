export type BikeAdFormType = {
  title: string;
  description: string;
  brand: string;
  model: string;
  manufacturingYear: number;
  kmsDriven: number;
  price: number;
  images: string[];
};

export type BikeAdType = BikeAdFormType & {
  _id: string;
  createdAt: string;
};

export type BikeAdDetailsType = BikeAdType & {
  isActive: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type BikeAdsFilterType = {
    brand:string
    model:string
}
export type BikeAdsStore = {
    data: BikeAdType[],
    filters: BikeAdsFilterType
    loading: boolean
    fetch: () => Promise<void>
    reset: () => void
}
export type UserBikeAdsStore = {
    data: BikeAdType[],
    loading: boolean
    fetch: () => Promise<void>
    reset: () => void
}
export type BikeAdDetailsStore = {
    data: BikeAdDetailsType | null,
    loading: boolean
    fetch: (id: string) => Promise<void>
    reset: () => void
}
export type BikeAdFormStore = {
    data: BikeAdFormType,
    success: boolean
    loading: boolean
    update: (key: string, value: any) => void
    fetch: (id: string) => Promise<void>
    submit: (id?: string) => Promise<void>
    reset: () => void
}