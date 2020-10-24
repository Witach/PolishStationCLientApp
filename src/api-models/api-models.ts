export interface PetrolStationDto {
  id: number;
  dkn: number;
  localization: LocalizationDto;
  name: string;
  petrolStationStats: PetrolStationStats;
  fuelPriceDTO: LastFuelPriceDTO[];
  distance: number;
  fuelTypes: string[];
}

export interface PetrolStationStats {
  amountOfOpinion: number;
  avgOpinion: number;
  avgPrice: number;
}

export interface LocalizationDto {
  lat: string;
  long: string;
  name: string;
  number: string;
  postalCode: string;
  province: string;
  street: string;
  formattedAddress: string;
}

export interface AppUserDTO {
  appUserRoles: string[];
  email: string;
  id: number;
  isVerified: boolean;
  username: string;
}

export interface AppUserRoleDto {
  name: string;
}

export interface AuthRequest {
  password: string;
  username: string;
}

export interface PetrolStationForPetrolPrice {
  dkn: number;
  fuelTypes: string[];
  id: number;
  name: string;
  petrolStationStats: PetrolStationStats;
}

export interface FuelPriceDto {
  appUserDTO: AppUserDTO;
  fuelType: string;
  id: number;
  localeDataTime: string;
  petrolStation: PetrolStationForPetrolPrice;
  price: number;
}

export interface FuelTypeDto {
  name: string;
}

export interface OpinionDto {
  date: string;
  id: number;
  mark: number;
  petrolStationId: number;
  userId: number;
}

export interface AppUserPostDto {
  email: string;
  password: string;
  username: string;
}

export interface FuelPricePostDto {
  appUserId: number;
  date: string;
  fuelType: string;
  petrolStationId: number;
  price: number;
}

export interface LocalizationPostDto {
  name: string;
  number: string;
  postalCode: string;
  province: string;
  street: string;
}

export interface OpinionPostDto {
  mark: number;
  petrolStationId: number;
  userId: number;
}

export interface PetrolStationPostDto {
  dkn: number;
  fuelTypes: string[];
  localization: LocalizationPostDto;
  name: string;
}

export interface LastFuelPriceDTO {
  id: number;
  price: number;
  fuelType: string;
  date: string;
}
export interface AUthResponse {
  jwt: string;
}

export interface Page<T> {
  content: T[];
}
