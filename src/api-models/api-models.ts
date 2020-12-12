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
  isHotDogs: boolean;
  isWCFree: boolean;
  isWC: boolean;
  isRestaurant: boolean;
  isCompressor: boolean;
  isCarWash: boolean;
  isSelfService: boolean;
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
  amountOfPoints: number,
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
  isWCFree: boolean;
  isWC: boolean;
  isRestaurant: boolean;
  isCompressor: boolean;
  isCarWash: boolean;
  isHotDogs: boolean;
  isSelfService: boolean;
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

export interface AppUserStatsDTO {
  amountOfCreatedStations: number;
  amountOfPoints: number;
  amountOfAddedFuelTypes: number;
  amountOfOpinions: number;
  amountOfEditedInformations: number;
}

export interface FuelPriceStats {
  date: string;
  price: number;
}

export interface PlaceDTO {
  placeNumber: number;
  petrolStation: PetrolStationDto;
}

export interface StatsDTO {
  day: string;
  opinionRank: PetrolStationDto[];
  fuelTypePriceRank: {[key: string]: PetrolStationDto[]};
}

export interface FuelStats {
  [key: string]: FuelPriceStats[];
}

export interface DetailsStats {
  priceMin: number;
  dateMin: string;
  priceMax: number;
  dateMax: string;
}
export interface DetailsStatsDTO {
  [key: string]: DetailsStats;
}

export interface FuelPriceStatsDTO {
  fuelPriceStats: FuelStats;
  detailsStatsMap: DetailsStatsDTO;
}

export interface ResMessage {
  message: string;
}
