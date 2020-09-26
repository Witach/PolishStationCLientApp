import {PetrolStationDto} from "../api-models/api-models";

export const petrolStations: PetrolStationDto[] =  [
  {
    "id": 1,
    "name": "sardine",
    "dkn": -8494861223149287000,
    "localization": {
      "name": "Chełmno",
      "street": "ul. Dziedzic",
      "number": "4520",
      "postalCode": "59-759",
      "province": "Łódzkie",
      "lat": "0.781464",
      "long": "0.271858"
    },
    "petrolStationStats": {
      "avgOpinion": 1,
      "amountOfOpinion": 5,
      "avgPrice": null
    },
    "fuelPriceDTO": [
      {
        "id": 2,
        "price": 4.25,
        "fuelType": "VERVA",
        "date": "2020-08-21T13:12:47"
      },
      {
        "id": 3,
        "price": 0.96,
        "fuelType": "H",
        "date": "2020-08-28T04:36:32"
      },
      {
        "id": 4,
        "price": 1.9,
        "fuelType": "TESLA",
        "date": "2020-08-11T18:43:58"
      },
      {
        "id": 5,
        "price": 4.65,
        "fuelType": "DIESELE",
        "date": "2020-08-27T22:49:44"
      }
    ]
  },
  {
    "id": 2,
    "name": "chimpanzee",
    "dkn": 4642270301758216000,
    "localization": {
      "name": "Boguchwała",
      "street": "al. Kuc",
      "number": "8463",
      "postalCode": "51-887",
      "province": "ŚLĄSKIE",
      "lat": "0.631575",
      "long": "0.133108"
    },
    "petrolStationStats": {
      "avgOpinion": 2,
      "amountOfOpinion": 5,
      "avgPrice": null
    },
    "fuelPriceDTO": [
      {
        "id": 6,
        "price": 0.34,
        "fuelType": "BPRO",
        "date": "2020-08-24T15:31:03"
      },
      {
        "id": 7,
        "price": 2.98,
        "fuelType": "DIESELE",
        "date": "2020-08-14T20:36:19"
      },
      {
        "id": 8,
        "price": 3.37,
        "fuelType": "H",
        "date": "2020-08-01T07:28:34"
      }
    ]
  },
  {
    "id": 3,
    "name": "serval",
    "dkn": 2177015856472888800,
    "localization": {
      "name": "Niepołomice",
      "street": "al. Rybak",
      "number": "59684",
      "postalCode": "72-822",
      "province": "Łódzkie",
      "lat": "0.102898",
      "long": "0.172827"
    },
    "petrolStationStats": {
      "avgOpinion": 2,
      "amountOfOpinion": 5,
      "avgPrice": null
    },
    "fuelPriceDTO": [
      {
        "id": 12,
        "price": 0.82,
        "fuelType": "TESLA",
        "date": "2020-08-05T17:07:10"
      },
      {
        "id": 13,
        "price": 0.94,
        "fuelType": "BPRO",
        "date": "2020-08-05T23:05:38"
      },
      {
        "id": 14,
        "price": 0.73,
        "fuelType": "H",
        "date": "2020-08-15T05:44:30"
      },
      {
        "id": 15,
        "price": 4.58,
        "fuelType": "VERVA",
        "date": "2020-08-10T07:15:03"
      }
    ]
  },
  {
    "id": 4,
    "name": "jackal",
    "dkn": 8313799993056581000,
    "localization": {
      "name": "Niemcza",
      "street": "ul. Janus",
      "number": "263",
      "postalCode": "88-226",
      "province": "Łódzkie",
      "lat": "0.333857",
      "long": "0.392672"
    },
    "petrolStationStats": {
      "avgOpinion": 2,
      "amountOfOpinion": 5,
      "avgPrice": null
    },
    "fuelPriceDTO": [
      {
        "id": 16,
        "price": 5.06,
        "fuelType": "BPRO",
        "date": "2020-08-06T11:36:27"
      },
      {
        "id": 17,
        "price": 4.02,
        "fuelType": "TESLA",
        "date": "2020-08-15T01:44:27"
      },
      {
        "id": 18,
        "price": 2.11,
        "fuelType": "H",
        "date": "2020-08-04T01:11:47"
      },
      {
        "id": 19,
        "price": 5.18,
        "fuelType": "DIESELE",
        "date": "2020-08-23T16:34:28"
      }
    ]
  },
  {
    "id": 5,
    "name": "hornet",
    "dkn": 7319597073936402000,
    "localization": {
      "name": "Człuchów",
      "street": "ul. Wojtas",
      "number": "3528",
      "postalCode": "44-661",
      "province": "ŚLĄSKIE",
      "lat": "0.019710",
      "long": "0.551616"
    },
    "petrolStationStats": {
      "avgOpinion": 2,
      "amountOfOpinion": 5,
      "avgPrice": null
    },
    "fuelPriceDTO": []
  }
];
