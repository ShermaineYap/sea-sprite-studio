import { Port } from "@/types/route";

// Major international ports dataset with accurate coordinates
export const PORTS_DATASET: Port[] = [
  // Asia-Pacific
  {
    id: "SGSIN",
    name: "Singapore",
    country: "Singapore",
    lat: 1.2897,
    lng: 103.8501
  },
  {
    id: "CNSHA",
    name: "Shanghai",
    country: "China",
    lat: 31.2304,
    lng: 121.4737
  },
  {
    id: "CNNGB",
    name: "Ningbo-Zhoushan",
    country: "China",
    lat: 29.8683,
    lng: 121.5440
  },
  {
    id: "CNSHK",
    name: "Shenzhen",
    country: "China",
    lat: 22.5431,
    lng: 114.0579
  },
  {
    id: "HKHKG",
    name: "Hong Kong",
    country: "Hong Kong",
    lat: 22.3193,
    lng: 114.1694
  },
  {
    id: "KRPUS",
    name: "Busan",
    country: "South Korea",
    lat: 35.1796,
    lng: 129.0756
  },
  {
    id: "JPYOK",
    name: "Yokohama",
    country: "Japan",
    lat: 35.4437,
    lng: 139.6380
  },
  {
    id: "JPTYO",
    name: "Tokyo",
    country: "Japan",
    lat: 35.6528,
    lng: 139.8395
  },
  {
    id: "MYTPP",
    name: "Port Klang",
    country: "Malaysia",
    lat: 2.9944,
    lng: 101.3733
  },
  {
    id: "THBKK",
    name: "Bangkok",
    country: "Thailand",
    lat: 13.7563,
    lng: 100.5018
  },
  
  // Middle East
  {
    id: "AEJEA",
    name: "Jebel Ali",
    country: "United Arab Emirates",
    lat: 25.0118,
    lng: 55.0618
  },
  {
    id: "SAJED",
    name: "Jeddah",
    country: "Saudi Arabia",
    lat: 21.4858,
    lng: 39.1925
  },
  {
    id: "OMSLH",
    name: "Salalah",
    country: "Oman",
    lat: 16.9367,
    lng: 54.0050
  },
  
  // Europe
  {
    id: "NLRTM",
    name: "Rotterdam",
    country: "Netherlands",
    lat: 51.9225,
    lng: 4.4792
  },
  {
    id: "BEANR",
    name: "Antwerp",
    country: "Belgium",
    lat: 51.2194,
    lng: 4.4025
  },
  {
    id: "DEHAM",
    name: "Hamburg",
    country: "Germany",
    lat: 53.5511,
    lng: 9.9937
  },
  {
    id: "ESVLC",
    name: "Valencia",
    country: "Spain",
    lat: 39.4699,
    lng: -0.3763
  },
  {
    id: "ESBCN",
    name: "Barcelona",
    country: "Spain",
    lat: 41.3851,
    lng: 2.1734
  },
  {
    id: "GRLGR",
    name: "Piraeus",
    country: "Greece",
    lat: 37.9364,
    lng: 23.6478
  },
  {
    id: "ITGOA",
    name: "Genoa",
    country: "Italy",
    lat: 44.4056,
    lng: 8.9463
  },
  {
    id: "FRLEH",
    name: "Le Havre",
    country: "France",
    lat: 49.4944,
    lng: 0.1079
  },
  {
    id: "GBSOU",
    name: "Southampton",
    country: "United Kingdom",
    lat: 50.9097,
    lng: -1.4044
  },
  {
    id: "GBLGP",
    name: "London Gateway",
    country: "United Kingdom",
    lat: 51.5074,
    lng: 0.5695
  },
  
  // North America
  {
    id: "USLAX",
    name: "Los Angeles",
    country: "United States",
    lat: 33.7406,
    lng: -118.2717
  },
  {
    id: "USLGB",
    name: "Long Beach",
    country: "United States",
    lat: 33.7701,
    lng: -118.1937
  },
  {
    id: "USNYC",
    name: "New York/New Jersey",
    country: "United States",
    lat: 40.6895,
    lng: -74.0447
  },
  {
    id: "USSAV",
    name: "Savannah",
    country: "United States",
    lat: 32.0809,
    lng: -81.0912
  },
  {
    id: "USHOU",
    name: "Houston",
    country: "United States",
    lat: 29.7604,
    lng: -95.3698
  },
  {
    id: "USBAL",
    name: "Baltimore",
    country: "United States",
    lat: 39.2904,
    lng: -76.6122
  },
  {
    id: "CAYVR",
    name: "Vancouver",
    country: "Canada",
    lat: 49.2827,
    lng: -123.1207
  },
  {
    id: "CAMTR",
    name: "Montreal",
    country: "Canada",
    lat: 45.5017,
    lng: -73.5673
  },
  
  // South America
  {
    id: "BRSFS",
    name: "Santos",
    country: "Brazil",
    lat: -23.9618,
    lng: -46.3336
  },
  {
    id: "CLVAP",
    name: "Valparaíso",
    country: "Chile",
    lat: -33.0472,
    lng: -71.6127
  },
  {
    id: "COBUN",
    name: "Buenaventura",
    country: "Colombia",
    lat: 3.8801,
    lng: -77.0316
  },
  
  // Africa
  {
    id: "ZADUR",
    name: "Durban",
    country: "South Africa",
    lat: -29.8587,
    lng: 31.0218
  },
  {
    id: "EGPSD",
    name: "Port Said",
    country: "Egypt",
    lat: 31.2653,
    lng: 32.3019
  },
  {
    id: "MATNG",
    name: "Tanger Med",
    country: "Morocco",
    lat: 35.7595,
    lng: -5.8340
  },
  {
    id: "NGLAG",
    name: "Lagos",
    country: "Nigeria",
    lat: 6.4969,
    lng: 3.3903
  },
  
  // Australia & Oceania
  {
    id: "AUMEL",
    name: "Melbourne",
    country: "Australia",
    lat: -37.8136,
    lng: 144.9631
  },
  {
    id: "AUSYD",
    name: "Sydney",
    country: "Australia",
    lat: -33.8688,
    lng: 151.2093
  },
  {
    id: "NZAKL",
    name: "Auckland",
    country: "New Zealand",
    lat: -36.8485,
    lng: 174.7633
  }
];

export const searchPorts = (query: string): Port[] => {
  const lowercaseQuery = query.toLowerCase();
  return PORTS_DATASET.filter(
    port =>
      port.name.toLowerCase().includes(lowercaseQuery) ||
      port.country.toLowerCase().includes(lowercaseQuery) ||
      port.id.toLowerCase().includes(lowercaseQuery)
  );
};

export const getPortById = (id: string): Port | undefined => {
  return PORTS_DATASET.find(port => port.id === id);
};
