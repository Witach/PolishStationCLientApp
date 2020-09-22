interface PetrolStationDto {
  id: number;
  dkn: number;
  fuelTypes: string[];
  localization: LocalizationDto;
  name: string;
  petrolStationStats: PetrolStationStats;
}

interface PetrolStationStats {
  amountOfOpinion: number;
  avgOpinion: number;
  avgPrice: number;
}

interface LocalizationDto {
  lat: string;
  long: string;
  name: string;
  number: string;
  postalCode: string;
  province: string;
  street: string;
}

interface AppUserDTO {
  appUserRoles: string[];
  email: string;
  id: number;
  isVerified: boolean;
  username: string;
}

interface AppUserRoleDto {
  name: string;
}

interface AuthRequest {
  password: string;
  username: string;
}

interface PetrolStationForPetrolPrice {
  dkn: number;
  fuelTypes: string[];
  id: number;
  name: string;
  petrolStationStats: PetrolStationStats;
}

interface FuelPriceDto {
  appUserDTO: AppUserDTO;
  fuelType: string;
  id: number;
  localeDataTime: string;
  petrolStation: PetrolStationForPetrolPrice;
  price: number;
}

interface FuelTypeDto {
  name: string;
}

interface OpinionDto {
  date: string;
  id: number;
  mark: number;
  petrolStationId: number;
  userId: number;
}

interface AppUserPostDto {
  email: string;
  password: string;
  username: string;
}

interface FuelPricePostDto {
  appUserId: number;
  date: string;
  fuelType: string;
  petrolStationId: number;
  price: number;
}

interface LocalizationPostDto {
  name: string;
  number: string;
  postalCode: string;
  province: string;
  street: string;
}

interface OpinionPostDto {
  mark: number;
  petrolStationId: number;
  userId: number;
}

interface PetrolStationPostDto {
  dkn: number;
  fuelTypes: string[];
  localization: LocalizationPostDto;
  name: string;
}
