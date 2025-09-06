import { Tariff, TariffType } from '../types';

export const TARIFF_DATA: Tariff[] = [
  // --- DETAILED TARIFFS ---
  {
    id: 'INMUN',
    name: 'Adani Int\'l Container Terminal (Mundra)',
    code: 'INMUN',
    country: 'India',
    type: TariffType.SEA,
    lat: 22.75,
    lon: 69.71,
    details: `
### Stevedoring Charges (USD)

**Road Containers (per lift):**
- Loaded (20'/40'/Over 40'): $149.00 / $223.50 / $298.00
- Empty (20'/40'/Over 40'): $100.00 / $150.00 / $200.00

**Rail Containers (per lift):**
- Loaded (20'/40'/Over 40'): $171.00 / $256.50 / $342.00
- Empty (20'/40'/Over 40'): $112.00 / $168.00 / $224.00

**Transhipment Containers (per lift):**
- Loaded (20'/40'/Over 40'): $111.00 / $167.00 / $222.00
- Empty (20'/40'/Over 40'): $84.00 / $126.00 / $168.00

---

### Special Handling Premiums
- **Hazardous Containers:** +125% on handling charges
- **Over Dimensional Containers:** +125% on handling charges

---

### Reefer Container Charges (USD)
- **Road & Rail (per 4h shift):** $7.00 / $11.00 / $14.00
- **Transhipment/Restow (per day):** $40.00 / $60.00 / $80.00

---

### Container Storage Charges (per day, USD)

**Import by Road (Loaded):**
- First 2 days: Free
- 03-05 days: $6.00 / $12.00 / $18.00
- 06-15 days: $10.00 / $20.00 / $30.00
- Over 30 days: $23.00 / $46.00 / $69.00

**Export by Road (Loaded):**
- First 7 days: Free
- 08-10 days: $5.00 / $10.00 / $15.00
- 11-15 days: $8.00 / $16.00 / $24.00
- Over 30 days: $20.00 / $40.00 / $60.00
    `,
  },
  {
    id: 'SGSIN',
    name: 'Port of Singapore',
    code: 'SGSIN',
    country: 'Singapore',
    type: TariffType.SEA,
    lat: 1.264,
    lon: 103.83,
    details: `
### Port Dues
- **Vessel Arrival/Departure:** $0.55 per GT (min $500)
- **Berthage:** $0.30 per GT per 24-hour period

### Cargo Handling
- **Container (20ft):** $150 (Load/Discharge)
- **Container (40ft):** $250 (Load/Discharge)
- **Break Bulk:** $45 per freight ton

### Special Fees
- **Dangerous Goods Handling:** +25% on cargo handling
- **Reefer Container Monitoring:** $50 per day
    `,
  },
  {
    id: 'NLRTM',
    name: 'Port of Rotterdam',
    code: 'NLRTM',
    country: 'Netherlands',
    type: TariffType.SEA,
    lat: 51.947,
    lon: 4.152,
    details: `
### Harbour Dues
- **Seagoing Vessels:** €0.8817 per GT
- **Green Award Discount:** 6%

### Quay Dues (Berthage)
- **Standard Rate:** €2.50 per meter of ship length per 24 hours

### Container Terminal Charges
- **20ft Container (TEU):** €120 (Lift-on/Lift-off)
- **40ft Container (FEU):** €200 (Lift-on/Lift-off)

### Other Fees
- **Waste Disposal Fee:** Starts at €150 (mandatory, based on vessel size)
    `,
  },
  {
    id: 'HKG',
    name: 'Hong Kong International Airport',
    code: 'HKG',
    country: 'Hong Kong',
    type: TariffType.AIR,
    details: `
### Landing Charges (based on MTOW)
- **First 25 tonnes:** HK$1,945
- **Per additional tonne:** HK$70

### Parking Charges (per 15 mins, by wingspan)
- **Code C Aircraft:** HK$215
- **Code F Aircraft:** HK$430

### Terminal Handling Charges (THC)
- **General Cargo:** HK$2.20 per kg
- **Special Cargo (VAL, DG):** HK$4.50 per kg
- **Minimum Charge:** HK$300 per shipment

### Other Fees
- **Fuel Throughput Fee:** HK$0.05 per litre
    `,
  },
  {
    id: 'DXB',
    name: 'Dubai International Airport',
    code: 'DXB',
    country: 'UAE',
    type: TariffType.AIR,
    details: `
### Landing Fees (based on MTOW)
- **Up to 50T:** AED 1,500
- **50T - 150T:** AED 3,000 + AED 25/ton over 50T
- **Over 150T:** AED 5,500 + AED 30/ton over 150T

### Parking Fees (per hour)
- **Passenger Terminal:** 15% of landing fee
- **Cargo Apron:** 10% of landing fee

### Cargo Tariffs
- **General Cargo:** AED 1.80 per kg
- **Perishables:** AED 2.50 per kg
- **Security Screening:** AED 0.15 per kg
    `,
  },
  {
    id: 'USLAX',
    name: 'Port of Los Angeles',
    code: 'USLAX',
    country: 'USA',
    type: TariffType.SEA,
    lat: 33.729,
    lon: -118.262,
    details: `
### Dockage Fees (per 24h, based on LOA)
- **Up to 100m:** $4,500
- **100m - 200m:** $9,000
- **Over 200m:** $15,000

### Wharfage Fees (on cargo)
- **General Cargo:** $3.50 per revenue ton
- **Container (20ft):** $90
- **Container (40ft):** $180

### Environmental & Federal Fees
- **Clean Truck Fee:** $35 per TEU (for non-compliant trucks)
- **Harbor Maintenance Fee:** 0.125% of cargo value
    `,
  },
  {
    id: 'JFK',
    name: 'John F. Kennedy International Airport',
    code: 'JFK',
    country: 'USA',
    type: TariffType.AIR,
    details: `
### Landing Fees
- **Rate:** $13.05 per 1,000 lbs MGLW
- **Minimum Fee:** $100

### Parking & Facility Fees
- **Aircraft Parking:** Varies by location/duration
- **Cargo Facility Rents:** Leased per sq. ft. annually

### Federal Inspection Fees
- **APHIS/CBP fees:** Apply per aircraft/shipment
- **Example (CBP):** ~$10.00 per air waybill
    `,
  },
  // --- EXPANDED LIST WITH PLACEHOLDERS ---
  {
    id: 'AEJEA',
    name: 'Jebel Ali Port',
    code: 'AEJEA',
    country: 'UAE',
    type: TariffType.SEA,
    lat: 25.022,
    lon: 55.059,
    details: 'Tariff details for Jebel Ali Port to be updated.',
  },
  {
    id: 'INMAA',
    name: 'Chennai Port',
    code: 'INMAA',
    country: 'India',
    type: TariffType.SEA,
    lat: 13.089,
    lon: 80.29,
    details: 'Tariff details for Chennai Port to be updated.',
  },
  {
    id: 'CNSHA',
    name: 'Port of Shanghai',
    code: 'CNSHA',
    country: 'China',
    type: TariffType.SEA,
    lat: 31.33,
    lon: 121.5,
    details: 'Tariff details for Port of Shanghai to be updated.',
  },
  {
    id: 'DEHAM',
    name: 'Port of Hamburg',
    code: 'DEHAM',
    country: 'Germany',
    type: TariffType.SEA,
    lat: 53.55,
    lon: 9.98,
    details: 'Tariff details for Port of Hamburg to be updated.',
  },
  {
    id: 'BEANR',
    name: 'Port of Antwerp',
    code: 'BEANR',
    country: 'Belgium',
    type: TariffType.SEA,
    lat: 51.25,
    lon: 4.38,
    details: 'Tariff details for Port of Antwerp to be updated.',
  },
  {
    id: 'USLGB',
    name: 'Port of Long Beach',
    code: 'USLGB',
    country: 'USA',
    type: TariffType.SEA,
    lat: 33.75,
    lon: -118.2,
    details: 'Tariff details for Port of Long Beach to be updated.',
  },
  {
    id: 'KRPUS',
    name: 'Port of Busan',
    code: 'KRPUS',
    country: 'South Korea',
    type: TariffType.SEA,
    lat: 35.1,
    lon: 129.04,
    details: 'Tariff details for Port of Busan to be updated.',
  },
  {
    id: 'ZADUR',
    name: 'Port of Durban',
    code: 'ZADUR',
    country: 'South Africa',
    type: TariffType.SEA,
    lat: -29.87,
    lon: 31.02,
    details: 'Tariff details for Port of Durban to be updated.',
  },
  {
    id: 'BRSSZ',
    name: 'Port of Santos',
    code: 'BRSSZ',
    country: 'Brazil',
    type: TariffType.SEA,
    lat: -23.97,
    lon: -46.3,
    details: 'Tariff details for Port of Santos to be updated.',
  },
  {
    id: 'MYTPP',
    name: 'Port of Tanjung Pelepas',
    code: 'MYTPP',
    country: 'Malaysia',
    type: TariffType.SEA,
    lat: 1.37,
    lon: 103.55,
    details: 'Tariff details for Port of Tanjung Pelepas to be updated.',
  },
  {
    id: 'LHR',
    name: 'London Heathrow Airport',
    code: 'LHR',
    country: 'United Kingdom',
    type: TariffType.AIR,
    details: 'Tariff details for London Heathrow Airport to be updated.',
  },
  {
    id: 'CDG',
    name: 'Charles de Gaulle Airport',
    code: 'CDG',
    country: 'France',
    type: TariffType.AIR,
    details: 'Tariff details for Charles de Gaulle Airport to be updated.',
  },
  {
    id: 'FRA',
    name: 'Frankfurt Airport',
    code: 'FRA',
    country: 'Germany',
    type: TariffType.AIR,
    details: 'Tariff details for Frankfurt Airport to be updated.',
  },
  {
    id: 'AMS',
    name: 'Amsterdam Airport Schiphol',
    code: 'AMS',
    country: 'Netherlands',
    type: TariffType.AIR,
    details: 'Tariff details for Amsterdam Airport Schiphol to be updated.',
  },
  {
    id: 'PVG',
    name: 'Shanghai Pudong International Airport',
    code: 'PVG',
    country: 'China',
    type: TariffType.AIR,
    details: 'Tariff details for Shanghai Pudong International Airport to be updated.',
  },
  {
    id: 'ICN',
    name: 'Incheon International Airport',
    code: 'ICN',
    country: 'South Korea',
    type: TariffType.AIR,
    details: 'Tariff details for Incheon International Airport to be updated.',
  },
  {
    id: 'ORD',
    name: 'O\'Hare International Airport',
    code: 'ORD',
    country: 'USA',
    type: TariffType.AIR,
    details: 'Tariff details for O\'Hare International Airport to be updated.',
  },
  {
    id: 'SIN',
    name: 'Singapore Changi Airport',
    code: 'SIN',
    country: 'Singapore',
    type: TariffType.AIR,
    details: 'Tariff details for Singapore Changi Airport to be updated.',
  },
  {
    id: 'NRT',
    name: 'Narita International Airport',
    code: 'NRT',
    country: 'Japan',
    type: TariffType.AIR,
    details: 'Tariff details for Narita International Airport to be updated.',
  },
  {
    id: 'BOM',
    name: 'Mumbai International Airport',
    code: 'BOM',
    country: 'India',
    type: TariffType.AIR,
    details: 'Tariff details for Mumbai International Airport to be updated.',
  },
  // --- SECOND EXPANDED LIST ---
  {
    id: 'CNNGB',
    name: 'Port of Ningbo-Zhoushan',
    code: 'CNNGB',
    country: 'China',
    type: TariffType.SEA,
    lat: 29.86,
    lon: 121.55,
    details: 'Tariff details for Port of Ningbo-Zhoushan to be updated.',
  },
  {
    id: 'CNSZN',
    name: 'Port of Shenzhen',
    code: 'CNSZN',
    country: 'China',
    type: TariffType.SEA,
    lat: 22.55,
    lon: 114.08,
    details: 'Tariff details for Port of Shenzhen to be updated.',
  },
  {
    id: 'CNCAN',
    name: 'Port of Guangzhou',
    code: 'CNCAN',
    country: 'China',
    type: TariffType.SEA,
    lat: 23.11,
    lon: 113.25,
    details: 'Tariff details for Port of Guangzhou to be updated.',
  },
  {
    id: 'CNTAO',
    name: 'Port of Qingdao',
    code: 'CNTAO',
    country: 'China',
    type: TariffType.SEA,
    lat: 36.07,
    lon: 120.38,
    details: 'Tariff details for Port of Qingdao to be updated.',
  },
  {
    id: 'TWKHH',
    name: 'Port of Kaohsiung',
    code: 'TWKHH',
    country: 'Taiwan',
    type: TariffType.SEA,
    lat: 22.6,
    lon: 120.28,
    details: 'Tariff details for Port of Kaohsiung to be updated.',
  },
  {
    id: 'LKCMB',
    name: 'Port of Colombo',
    code: 'LKCMB',
    country: 'Sri Lanka',
    type: TariffType.SEA,
    lat: 6.95,
    lon: 79.84,
    details: 'Tariff details for Port of Colombo to be updated.',
  },
  {
    id: 'GRPIR',
    name: 'Port of Piraeus',
    code: 'GRPIR',
    country: 'Greece',
    type: TariffType.SEA,
    lat: 37.94,
    lon: 23.64,
    details: 'Tariff details for Port of Piraeus to be updated.',
  },
  {
    id: 'ESVLC',
    name: 'Port of Valencia',
    code: 'ESVLC',
    country: 'Spain',
    type: TariffType.SEA,
    lat: 39.45,
    lon: -0.32,
    details: 'Tariff details for Port of Valencia to be updated.',
  },
  {
    id: 'GBFXT',
    name: 'Port of Felixstowe',
    code: 'GBFXT',
    country: 'United Kingdom',
    type: TariffType.SEA,
    lat: 51.95,
    lon: 1.32,
    details: 'Tariff details for Port of Felixstowe to be updated.',
  },
  {
    id: 'USNYC',
    name: 'Port of New York & New Jersey',
    code: 'USNYC',
    country: 'USA',
    type: TariffType.SEA,
    lat: 40.68,
    lon: -74.03,
    details: 'Tariff details for Port of New York & New Jersey to be updated.',
  },
  {
    id: 'USSAV',
    name: 'Port of Savannah',
    code: 'USSAV',
    country: 'USA',
    type: TariffType.SEA,
    lat: 32.12,
    lon: -81.14,
    details: 'Tariff details for Port of Savannah to be updated.',
  },
  {
    id: 'CAVAN',
    name: 'Port of Vancouver',
    code: 'CAVAN',
    country: 'Canada',
    type: TariffType.SEA,
    lat: 49.29,
    lon: -123.1,
    details: 'Tariff details for Port of Vancouver to be updated.',
  },
  {
    id: 'SAJED',
    name: 'Port of Jeddah',
    code: 'SAJED',
    country: 'Saudi Arabia',
    type: TariffType.SEA,
    lat: 21.45,
    lon: 39.17,
    details: 'Tariff details for Port of Jeddah to be updated.',
  },
  {
    id: 'AUMEL',
    name: 'Port of Melbourne',
    code: 'AUMEL',
    country: 'Australia',
    type: TariffType.SEA,
    lat: -37.83,
    lon: 144.92,
    details: 'Tariff details for Port of Melbourne to be updated.',
  },
  {
    id: 'MEM',
    name: 'Memphis International Airport',
    code: 'MEM',
    country: 'USA',
    type: TariffType.AIR,
    details: 'Tariff details for Memphis International Airport to be updated.',
  },
  {
    id: 'SDF',
    name: 'Louisville International Airport',
    code: 'SDF',
    country: 'USA',
    type: TariffType.AIR,
    details: 'Tariff details for Louisville International Airport to be updated.',
  },
  {
    id: 'ANC',
    name: 'Anchorage International Airport',
    code: 'ANC',
    country: 'USA',
    type: TariffType.AIR,
    details: 'Tariff details for Anchorage International Airport to be updated.',
  },
  {
    id: 'TPE',
    name: 'Taipei Taoyuan International Airport',
    code: 'TPE',
    country: 'Taiwan',
    type: TariffType.AIR,
    details: 'Tariff details for Taipei Taoyuan International Airport to be updated.',
  },
  {
    id: 'DOH',
    name: 'Doha Hamad International Airport',
    code: 'DOH',
    country: 'Qatar',
    type: TariffType.AIR,
    details: 'Tariff details for Doha Hamad International Airport to be updated.',
  },
  {
    id: 'DWC',
    name: 'Dubai World Central (Al Maktoum)',
    code: 'DWC',
    country: 'UAE',
    type: TariffType.AIR,
    details: 'Tariff details for Dubai World Central to be updated.',
  },
  {
    id: 'LAX-AIR',
    name: 'Los Angeles International Airport',
    code: 'LAX',
    country: 'USA',
    type: TariffType.AIR,
    details: 'Tariff details for Los Angeles International Airport to be updated.',
  },
  {
    id: 'MIA',
    name: 'Miami International Airport',
    code: 'MIA',
    country: 'USA',
    type: TariffType.AIR,
    details: 'Tariff details for Miami International Airport to be updated.',
  },
  {
    id: 'LEJ',
    name: 'Leipzig/Halle Airport',
    code: 'LEJ',
    country: 'Germany',
    type: TariffType.AIR,
    details: 'Tariff details for Leipzig/Halle Airport to be updated.',
  },
  // --- THIRD EXPANDED LIST ---
  { id: 'CNTXG', name: 'Port of Tianjin', code: 'CNTXG', country: 'China', type: TariffType.SEA, lat: 38.98, lon: 117.79, details: 'Tariff details for Port of Tianjin to be updated.' },
  { id: 'THLCH', name: 'Port of Laem Chabang', code: 'THLCH', country: 'Thailand', type: TariffType.SEA, lat: 13.08, lon: 100.88, details: 'Tariff details for Port of Laem Chabang to be updated.' },
  { id: 'IDJKT', name: 'Port of Jakarta (Tanjung Priok)', code: 'IDJKT', country: 'Indonesia', type: TariffType.SEA, lat: -6.10, lon: 106.87, details: 'Tariff details for Port of Jakarta to be updated.' },
  { id: 'MYPKG', name: 'Port Klang', code: 'MYPKG', country: 'Malaysia', type: TariffType.SEA, lat: 3.00, lon: 101.40, details: 'Tariff details for Port Klang to be updated.' },
  { id: 'INNSA', name: 'Port of Nhava Sheva', code: 'INNSA', country: 'India', type: TariffType.SEA, lat: 18.96, lon: 72.94, details: 'Tariff details for Port of Nhava Sheva to be updated.' },
  { id: 'VNSGN', name: 'Port of Ho Chi Minh City', code: 'VNSGN', country: 'Vietnam', type: TariffType.SEA, lat: 10.76, lon: 106.71, details: 'Tariff details for Port of Ho Chi Minh City to be updated.' },
  { id: 'ESALG', name: 'Port of Algeciras', code: 'ESALG', country: 'Spain', type: TariffType.SEA, lat: 36.13, lon: -5.44, details: 'Tariff details for Port of Algeciras to be updated.' },
  { id: 'DEBRV', name: 'Port of Bremerhaven', code: 'DEBRV', country: 'Germany', type: TariffType.SEA, lat: 53.56, lon: 8.58, details: 'Tariff details for Port of Bremerhaven to be updated.' },
  { id: 'USHOU', name: 'Port of Houston', code: 'USHOU', country: 'USA', type: TariffType.SEA, lat: 29.71, lon: -95.27, details: 'Tariff details for Port of Houston to be updated.' },
  { id: 'USCHS', name: 'Port of Charleston', code: 'USCHS', country: 'USA', type: TariffType.SEA, lat: 32.78, lon: -79.92, details: 'Tariff details for Port of Charleston to be updated.' },
  { id: 'PAONX', name: 'Port of Colón', code: 'PAONX', country: 'Panama', type: TariffType.SEA, lat: 9.36, lon: -79.90, details: 'Tariff details for Port of Colón to be updated.' },
  { id: 'AUSYD', name: 'Port of Sydney', code: 'AUSYD', country: 'Australia', type: TariffType.SEA, lat: -33.85, lon: 151.21, details: 'Tariff details for Port of Sydney to be updated.' },
  { id: 'NGLOS', name: 'Port of Lagos', code: 'NGLOS', country: 'Nigeria', type: TariffType.SEA, lat: 6.45, lon: 3.39, details: 'Tariff details for Port of Lagos to be updated.' },
  { id: 'HND', name: 'Tokyo Haneda Airport', code: 'HND', country: 'Japan', type: TariffType.AIR, details: 'Tariff details for Tokyo Haneda Airport to be updated.' },
  { id: 'PEK', name: 'Beijing Capital International Airport', code: 'PEK', country: 'China', type: TariffType.AIR, details: 'Tariff details for Beijing Capital Airport to be updated.' },
  { id: 'CAN', name: 'Guangzhou Baiyun International Airport', code: 'CAN', country: 'China', type: TariffType.AIR, details: 'Tariff details for Guangzhou Baiyun Airport to be updated.' },
  { id: 'IST', name: 'Istanbul Airport', code: 'IST', country: 'Turkey', type: TariffType.AIR, details: 'Tariff details for Istanbul Airport to be updated.' },
  { id: 'DEL', name: 'Delhi Indira Gandhi International Airport', code: 'DEL', country: 'India', type: TariffType.AIR, details: 'Tariff details for Delhi Indira Gandhi Airport to be updated.' },
  { id: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', code: 'ATL', country: 'USA', type: TariffType.AIR, details: 'Tariff details for Hartsfield-Jackson Airport to be updated.' },
  { id: 'MAD', name: 'Madrid Barajas Airport', code: 'MAD', country: 'Spain', type: TariffType.AIR, details: 'Tariff details for Madrid Barajas Airport to be updated.' },
  { id: 'YYZ', name: 'Toronto Pearson International Airport', code: 'YYZ', country: 'Canada', type: TariffType.AIR, details: 'Tariff details for Toronto Pearson Airport to be updated.' },
  { id: 'GRU', name: 'São Paulo-Guarulhos International Airport', code: 'GRU', country: 'Brazil', type: TariffType.AIR, details: 'Tariff details for São Paulo-Guarulhos Airport to be updated.' },
  { id: 'SYD', name: 'Sydney Airport', code: 'SYD', country: 'Australia', type: TariffType.AIR, details: 'Tariff details for Sydney Airport to be updated.' },
  { id: 'JNB', name: 'O. R. Tambo International Airport', code: 'JNB', country: 'South Africa', type: TariffType.AIR, details: 'Tariff details for O. R. Tambo Airport to be updated.' },
  // --- FOURTH EXPANDED LIST (100+) ---
  { id: 'CNXMN', name: 'Port of Xiamen', code: 'CNXMN', country: 'China', type: TariffType.SEA, lat: 24.47, lon: 118.08, details: 'Tariff details for Port of Xiamen to be updated.' },
  { id: 'CNHKG', name: 'Port of Hong Kong', code: 'CNHKG', country: 'China', type: TariffType.SEA, lat: 22.3, lon: 114.17, details: 'Tariff details for Port of Hong Kong to be updated.' },
  { id: 'JPTYO', name: 'Port of Tokyo', code: 'JPTYO', country: 'Japan', type: TariffType.SEA, lat: 35.65, lon: 139.79, details: 'Tariff details for Port of Tokyo to be updated.' },
  { id: 'JPYOK', name: 'Port of Yokohama', code: 'JPYOK', country: 'Japan', type: TariffType.SEA, lat: 35.45, lon: 139.65, details: 'Tariff details for Port of Yokohama to be updated.' },
  { id: 'JPUKB', name: 'Port of Kobe', code: 'JPUKB', country: 'Japan', type: TariffType.SEA, lat: 34.68, lon: 135.2, details: 'Tariff details for Port of Kobe to be updated.' },
  { id: 'KRINC', name: 'Port of Incheon', code: 'KRINC', country: 'South Korea', type: TariffType.SEA, lat: 37.47, lon: 126.62, details: 'Tariff details for Port of Incheon to be updated.' },
  { id: 'VNHPH', name: 'Port of Haiphong', code: 'VNHPH', country: 'Vietnam', type: TariffType.SEA, lat: 20.85, lon: 106.68, details: 'Tariff details for Port of Haiphong to be updated.' },
  { id: 'PHMNL', name: 'Port of Manila', code: 'PHMNL', country: 'Philippines', type: TariffType.SEA, lat: 14.6, lon: 120.95, details: 'Tariff details for Port of Manila to be updated.' },
  { id: 'THBKK', name: 'Port of Bangkok', code: 'THBKK', country: 'Thailand', type: TariffType.SEA, lat: 13.72, lon: 100.5, details: 'Tariff details for Port of Bangkok to be updated.' },
  { id: 'PKKHI', name: 'Port of Karachi', code: 'PKKHI', country: 'Pakistan', type: TariffType.SEA, lat: 24.83, lon: 66.98, details: 'Tariff details for Port of Karachi to be updated.' },
  { id: 'BDCGP', name: 'Port of Chittagong', code: 'BDCGP', country: 'Bangladesh', type: TariffType.SEA, lat: 22.28, lon: 91.78, details: 'Tariff details for Port of Chittagong to be updated.' },
  { id: 'OMSOH', name: 'Port of Sohar', code: 'OMSOH', country: 'Oman', type: TariffType.SEA, lat: 24.5, lon: 56.7, details: 'Tariff details for Port of Sohar to be updated.' },
  { id: 'AEKHL', name: 'Port of Khalifa (Abu Dhabi)', code: 'AEKHL', country: 'UAE', type: TariffType.SEA, lat: 24.8, lon: 54.7, details: 'Tariff details for Port of Khalifa to be updated.' },
  { id: 'QAHMD', name: 'Port of Hamad', code: 'QAHMD', country: 'Qatar', type: TariffType.SEA, lat: 25.02, lon: 51.6, details: 'Tariff details for Port of Hamad to be updated.' },
  { id: 'ESBCN', name: 'Port of Barcelona', code: 'ESBCN', country: 'Spain', type: TariffType.SEA, lat: 41.35, lon: 2.16, details: 'Tariff details for Port of Barcelona to be updated.' },
  { id: 'ITGOA', name: 'Port of Genoa', code: 'ITGOA', country: 'Italy', type: TariffType.SEA, lat: 44.4, lon: 8.92, details: 'Tariff details for Port of Genoa to be updated.' },
  { id: 'FRMRS', name: 'Port of Marseille', code: 'FRMRS', country: 'France', type: TariffType.SEA, lat: 43.3, lon: 5.35, details: 'Tariff details for Port of Marseille to be updated.' },
  { id: 'FRLHV', name: 'Port of Le Havre', code: 'FRLHV', country: 'France', type: TariffType.SEA, lat: 49.48, lon: 0.1, details: 'Tariff details for Port of Le Havre to be updated.' },
  { id: 'GBSOU', name: 'Port of Southampton', code: 'GBSOU', country: 'United Kingdom', type: TariffType.SEA, lat: 50.9, lon: -1.4, details: 'Tariff details for Port of Southampton to be updated.' },
  { id: 'PLGDN', name: 'Port of Gdansk', code: 'PLGDN', country: 'Poland', type: TariffType.SEA, lat: 54.37, lon: 18.67, details: 'Tariff details for Port of Gdansk to be updated.' },
  { id: 'SEGOT', name: 'Port of Gothenburg', code: 'SEGOT', country: 'Sweden', type: TariffType.SEA, lat: 57.7, lon: 11.95, details: 'Tariff details for Port of Gothenburg to be updated.' },
  { id: 'USOAK', name: 'Port of Oakland', code: 'USOAK', country: 'USA', type: TariffType.SEA, lat: 37.8, lon: -122.28, details: 'Tariff details for Port of Oakland to be updated.' },
  { id: 'USSEA', name: 'Port of Seattle', code: 'USSEA', country: 'USA', type: TariffType.SEA, lat: 47.6, lon: -122.35, details: 'Tariff details for Port of Seattle to be updated.' },
  { id: 'CAMTR', name: 'Port of Montreal', code: 'CAMTR', country: 'Canada', type: TariffType.SEA, lat: 45.5, lon: -73.55, details: 'Tariff details for Port of Montreal to be updated.' },
  { id: 'MXVER', name: 'Port of Veracruz', code: 'MXVER', country: 'Mexico', type: TariffType.SEA, lat: 19.2, lon: -96.13, details: 'Tariff details for Port of Veracruz to be updated.' },
  { id: 'MXZLO', name: 'Port of Manzanillo', code: 'MXZLO', country: 'Mexico', type: TariffType.SEA, lat: 19.05, lon: -104.32, details: 'Tariff details for Port of Manzanillo to be updated.' },
  { id: 'BRRIO', name: 'Port of Rio de Janeiro', code: 'BRRIO', country: 'Brazil', type: TariffType.SEA, lat: -22.88, lon: -43.18, details: 'Tariff details for Port of Rio de Janeiro to be updated.' },
  { id: 'ARBUE', name: 'Port of Buenos Aires', code: 'ARBUE', country: 'Argentina', type: TariffType.SEA, lat: -34.58, lon: -58.37, details: 'Tariff details for Port of Buenos Aires to be updated.' },
  { id: 'CLSAI', name: 'Port of San Antonio', code: 'CLSAI', country: 'Chile', type: TariffType.SEA, lat: -33.6, lon: -71.62, details: 'Tariff details for Port of San Antonio to be updated.' },
  { id: 'COBUN', name: 'Port of Buenaventura', code: 'COBUN', country: 'Colombia', type: TariffType.SEA, lat: 3.88, lon: -77.07, details: 'Tariff details for Port of Buenaventura to be updated.' },
  { id: 'PECAL', name: 'Port of Callao', code: 'PECAL', country: 'Peru', type: TariffType.SEA, lat: -12.05, lon: -77.15, details: 'Tariff details for Port of Callao to be updated.' },
  { id: 'EGPSD', name: 'Port Said', code: 'EGPSD', country: 'Egypt', type: TariffType.SEA, lat: 31.26, lon: 32.3, details: 'Tariff details for Port Said to be updated.' },
  { id: 'MAPTM', name: 'Port of Tanger Med', code: 'MAPTM', country: 'Morocco', type: TariffType.SEA, lat: 35.88, lon: -5.52, details: 'Tariff details for Port of Tanger Med to be updated.' },
  { id: 'GHTEM', name: 'Port of Tema', code: 'GHTEM', country: 'Ghana', type: TariffType.SEA, lat: 5.63, lon: 0.0, details: 'Tariff details for Port of Tema to be updated.' },
  { id: 'KEMBA', name: 'Port of Mombasa', code: 'KEMBA', country: 'Kenya', type: TariffType.SEA, lat: -4.05, lon: 39.67, details: 'Tariff details for Port of Mombasa to be updated.' },
  { id: 'ZACPT', name: 'Port of Cape Town', code: 'ZACPT', country: 'South Africa', type: TariffType.SEA, lat: -33.9, lon: 18.45, details: 'Tariff details for Port of Cape Town to be updated.' },
  { id: 'AUFRE', name: 'Port of Fremantle', code: 'AUFRE', country: 'Australia', type: TariffType.SEA, lat: -32.05, lon: 115.74, details: 'Tariff details for Port of Fremantle to be updated.' },
  { id: 'NZAKL', name: 'Port of Auckland', code: 'NZAKL', country: 'New Zealand', type: TariffType.SEA, lat: -36.83, lon: 174.77, details: 'Tariff details for Port of Auckland to be updated.' },
  { id: 'KIX', name: 'Kansai International Airport', code: 'KIX', country: 'Japan', type: TariffType.AIR, details: 'Tariff details for Kansai International Airport to be updated.' },
  { id: 'BKK', name: 'Suvarnabhumi Airport', code: 'BKK', country: 'Thailand', type: TariffType.AIR, details: 'Tariff details for Suvarnabhumi Airport to be updated.' },
  { id: 'KUL', name: 'Kuala Lumpur International Airport', code: 'KUL', country: 'Malaysia', type: TariffType.AIR, details: 'Tariff details for Kuala Lumpur International Airport to be updated.' },
  { id: 'SGN', name: 'Tan Son Nhat International Airport', code: 'SGN', country: 'Vietnam', type: TariffType.AIR, details: 'Tariff details for Tan Son Nhat International Airport to be updated.' },
  { id: 'CGK', name: 'Soekarno-Hatta International Airport', code: 'CGK', country: 'Indonesia', type: TariffType.AIR, details: 'Tariff details for Soekarno-Hatta International Airport to be updated.' },
  { id: 'MNL', name: 'Ninoy Aquino International Airport', code: 'MNL', country: 'Philippines', type: TariffType.AIR, details: 'Tariff details for Ninoy Aquino International Airport to be updated.' },
  { id: 'BLR', name: 'Kempegowda International Airport Bengaluru', code: 'BLR', country: 'India', type: TariffType.AIR, details: 'Tariff details for Kempegowda International Airport to be updated.' },
  { id: 'MAA', name: 'Chennai International Airport', code: 'MAA', country: 'India', type: TariffType.AIR, details: 'Tariff details for Chennai International Airport to be updated.' },
  { id: 'RUH', name: 'King Khalid International Airport', code: 'RUH', country: 'Saudi Arabia', type: TariffType.AIR, details: 'Tariff details for King Khalid International Airport to be updated.' },
  { id: 'MXP', name: 'Milan Malpensa Airport', code: 'MXP', country: 'Italy', type: TariffType.AIR, details: 'Tariff details for Milan Malpensa Airport to be updated.' },
  { id: 'ZRH', name: 'Zurich Airport', code: 'ZRH', country: 'Switzerland', type: TariffType.AIR, details: 'Tariff details for Zurich Airport to be updated.' },
  { id: 'BRU', name: 'Brussels Airport', code: 'BRU', country: 'Belgium', type: TariffType.AIR, details: 'Tariff details for Brussels Airport to be updated.' },
  { id: 'DUB', name: 'Dublin Airport', code: 'DUB', country: 'Ireland', type: TariffType.AIR, details: 'Tariff details for Dublin Airport to be updated.' },
  { id: 'ARN', name: 'Stockholm Arlanda Airport', code: 'ARN', country: 'Sweden', type: TariffType.AIR, details: 'Tariff details for Stockholm Arlanda Airport to be updated.' },
  { id: 'SVO', name: 'Sheremetyevo International Airport', code: 'SVO', country: 'Russia', type: TariffType.AIR, details: 'Tariff details for Sheremetyevo International Airport to be updated.' },
  { id: 'EWR', name: 'Newark Liberty International Airport', code: 'EWR', country: 'USA', type: TariffType.AIR, details: 'Tariff details for Newark Liberty International Airport to be updated.' },
  { id: 'DFW', name: 'Dallas/Fort Worth International Airport', code: 'DFW', country: 'USA', type: TariffType.AIR, details: 'Tariff details for Dallas/Fort Worth International Airport to be updated.' },
  { id: 'SFO', name: 'San Francisco International Airport', code: 'SFO', country: 'USA', type: TariffType.AIR, details: 'Tariff details for San Francisco International Airport to be updated.' },
  { id: 'YVR', name: 'Vancouver International Airport', code: 'YVR', country: 'Canada', type: TariffType.AIR, details: 'Tariff details for Vancouver International Airport to be updated.' },
  { id: 'MEX', name: 'Mexico City International Airport', code: 'MEX', country: 'Mexico', type: TariffType.AIR, details: 'Tariff details for Mexico City International Airport to be updated.' },
  { id: 'BOG', name: 'El Dorado International Airport', code: 'BOG', country: 'Colombia', type: TariffType.AIR, details: 'Tariff details for El Dorado International Airport to be updated.' },
  { id: 'EZE', name: 'Ministro Pistarini International Airport', code: 'EZE', country: 'Argentina', type: TariffType.AIR, details: 'Tariff details for Ministro Pistarini International Airport to be updated.' },
  { id: 'SCL', name: 'Santiago International Airport', code: 'SCL', country: 'Chile', type: TariffType.AIR, details: 'Tariff details for Santiago International Airport to be updated.' },
  { id: 'CAI', name: 'Cairo International Airport', code: 'CAI', country: 'Egypt', type: TariffType.AIR, details: 'Tariff details for Cairo International Airport to be updated.' },
  { id: 'LOS', name: 'Murtala Muhammed International Airport', code: 'LOS', country: 'Nigeria', type: TariffType.AIR, details: 'Tariff details for Murtala Muhammed International Airport to be updated.' },
  { id: 'NBO', name: 'Jomo Kenyatta International Airport', code: 'NBO', country: 'Kenya', type: TariffType.AIR, details: 'Tariff details for Jomo Kenyatta International Airport to be updated.' },
  { id: 'ADD', name: 'Bole International Airport', code: 'ADD', country: 'Ethiopia', type: TariffType.AIR, details: 'Tariff details for Bole International Airport to be updated.' },
  { id: 'MEL', name: 'Melbourne Airport', code: 'MEL', country: 'Australia', type: TariffType.AIR, details: 'Tariff details for Melbourne Airport to be updated.' },
  { id: 'AKL', name: 'Auckland Airport', code: 'AKL', country: 'New Zealand', type: TariffType.AIR, details: 'Tariff details for Auckland Airport to be updated.' },
  { id: 'CNSHK', name: 'Port of Shekou (Shenzhen)', code: 'CNSHK', country: 'China', type: TariffType.SEA, lat: 22.48, lon: 113.92, details: 'Tariff details for Port of Shekou to be updated.' },
  { id: 'CNYTN', name: 'Port of Yantian (Shenzhen)', code: 'CNYTN', country: 'China', type: TariffType.SEA, lat: 22.58, lon: 114.28, details: 'Tariff details for Port of Yantian to be updated.' },
  { id: 'JPOSA', name: 'Port of Osaka', code: 'JPOSA', country: 'Japan', type: TariffType.SEA, lat: 34.65, lon: 135.43, details: 'Tariff details for Port of Osaka to be updated.' },
  { id: 'INCOK', name: 'Port of Cochin', code: 'INCOK', country: 'India', type: TariffType.SEA, lat: 9.97, lon: 76.25, details: 'Tariff details for Port of Cochin to be updated.' },
  { id: 'TRMER', name: 'Port of Mersin', code: 'TRMER', country: 'Turkey', type: TariffType.SEA, lat: 36.8, lon: 34.65, details: 'Tariff details for Port of Mersin to be updated.' },
  { id: 'ITLIV', name: 'Port of Livorno', code: 'ITLIV', country: 'Italy', type: TariffType.SEA, lat: 43.55, lon: 10.3, details: 'Tariff details for Port of Livorno to be updated.' },
  { id: 'GBLIV', name: 'Port of Liverpool', code: 'GBLIV', country: 'United Kingdom', type: TariffType.SEA, lat: 53.43, lon: -3.02, details: 'Tariff details for Port of Liverpool to be updated.' },
  { id: 'USBAL', name: 'Port of Baltimore', code: 'USBAL', country: 'USA', type: TariffType.SEA, lat: 39.27, lon: -76.58, details: 'Tariff details for Port of Baltimore to be updated.' },
  { id: 'PABLB', name: 'Port of Balboa', code: 'PABLB', country: 'Panama', type: TariffType.SEA, lat: 8.95, lon: -79.56, details: 'Tariff details for Port of Balboa to be updated.' },
  { id: 'EGAPG', name: 'Port of Alexandria', code: 'EGAPG', country: 'Egypt', type: TariffType.SEA, lat: 31.2, lon: 29.88, details: 'Tariff details for Port of Alexandria to be updated.' },
  { id: 'AUBNG', name: 'Port of Brisbane', code: 'AUBNG', country: 'Australia', type: TariffType.SEA, lat: -27.38, lon: 153.16, details: 'Tariff details for Port of Brisbane to be updated.' },
  { id: 'NZTRG', name: 'Port of Tauranga', code: 'NZTRG', country: 'New Zealand', type: TariffType.SEA, lat: -37.64, lon: 176.18, details: 'Tariff details for Port of Tauranga to be updated.' },
  { id: 'HGH', name: 'Hangzhou Xiaoshan International Airport', code: 'HGH', country: 'China', type: TariffType.AIR, details: 'Tariff details for Hangzhou Xiaoshan Airport to be updated.' },
  { id: 'CTU', name: 'Chengdu Shuangliu International Airport', code: 'CTU', country: 'China', type: TariffType.AIR, details: 'Tariff details for Chengdu Shuangliu Airport to be updated.' },
  { id: 'HYD', name: 'Rajiv Gandhi International Airport', code: 'HYD', country: 'India', type: TariffType.AIR, details: 'Tariff details for Rajiv Gandhi International Airport to be updated.' },
  { id: 'LGW', name: 'London Gatwick Airport', code: 'LGW', country: 'United Kingdom', type: TariffType.AIR, details: 'Tariff details for London Gatwick Airport to be updated.' },
  { id: 'MUC', name: 'Munich Airport', code: 'MUC', country: 'Germany', type: TariffType.AIR, details: 'Tariff details for Munich Airport to be updated.' },
  { id: 'FCO', name: 'Rome Fiumicino Airport', code: 'FCO', country: 'Italy', type: TariffType.AIR, details: 'Tariff details for Rome Fiumicino Airport to be updated.' },
  { id: 'IAD', name: 'Washington Dulles International Airport', code: 'IAD', country: 'USA', type: TariffType.AIR, details: 'Tariff details for Washington Dulles Airport to be updated.' },
  { id: 'CLT', name: 'Charlotte Douglas International Airport', code: 'CLT', country: 'USA', type: TariffType.AIR, details: 'Tariff details for Charlotte Douglas Airport to be updated.' },
  { id: 'YYC', name: 'Calgary International Airport', code: 'YYC', country: 'Canada', type: TariffType.AIR, details: 'Tariff details for Calgary International Airport to be updated.' },
  { id: 'LIM', name: 'Jorge Chávez International Airport', code: 'LIM', country: 'Peru', type: TariffType.AIR, details: 'Tariff details for Jorge Chávez International Airport to be updated.' },
  { id: 'CPT', name: 'Cape Town International Airport', code: 'CPT', country: 'South Africa', type: TariffType.AIR, details: 'Tariff details for Cape Town International Airport to be updated.' },
  // --- FIFTH EXPANDED LIST (FINAL 100+) ---
  { id: 'CNDLC', name: 'Port of Dalian', code: 'CNDLC', country: 'China', type: TariffType.SEA, lat: 38.92, lon: 121.65, details: 'Tariff details for Port of Dalian to be updated.' },
  { id: 'CGRZD', name: 'Port of Rizhao', code: 'CGRZD', country: 'China', type: TariffType.SEA, lat: 35.38, lon: 119.53, details: 'Tariff details for Port of Rizhao to be updated.' },
  { id: 'AUPHE', name: 'Port Hedland', code: 'AUPHE', country: 'Australia', type: TariffType.SEA, lat: -20.32, lon: 118.58, details: 'Tariff details for Port Hedland to be updated.' },
  { id: 'USORF', name: 'Port of Virginia (Norfolk)', code: 'USORF', country: 'USA', type: TariffType.SEA, lat: 36.93, lon: -76.28, details: 'Tariff details for Port of Virginia to be updated.' },
  { id: 'CAPRR', name: 'Port of Prince Rupert', code: 'CAPRR', country: 'Canada', type: TariffType.SEA, lat: 54.32, lon: -130.32, details: 'Tariff details for Port of Prince Rupert to be updated.' },
  { id: 'MXLZC', name: 'Port of Lázaro Cárdenas', code: 'MXLZC', country: 'Mexico', type: TariffType.SEA, lat: 17.92, lon: -102.18, details: 'Tariff details for Port of Lázaro Cárdenas to be updated.' },
  { id: 'DOBOC', name: 'Port of Caucedo', code: 'DOBOC', country: 'Dominican Republic', type: TariffType.SEA, lat: 18.43, lon: -69.63, details: 'Tariff details for Port of Caucedo to be updated.' },
  { id: 'JMKIN', name: 'Port of Kingston', code: 'JMKIN', country: 'Jamaica', type: TariffType.SEA, lat: 17.97, lon: -76.8, details: 'Tariff details for Port of Kingston to be updated.' },
  { id: 'COCTG', name: 'Port of Cartagena', code: 'COCTG', country: 'Colombia', type: TariffType.SEA, lat: 10.4, lon: -75.53, details: 'Tariff details for Port of Cartagena to be updated.' },
  { id: 'ECGYE', name: 'Port of Guayaquil', code: 'ECGYE', country: 'Ecuador', type: TariffType.SEA, lat: -2.28, lon: -79.9, details: 'Tariff details for Port of Guayaquil to be updated.' },
  { id: 'CLVAP', name: 'Port of Valparaíso', code: 'CLVAP', country: 'Chile', type: TariffType.SEA, lat: -33.03, lon: -71.63, details: 'Tariff details for Port of Valparaíso to be updated.' },
  { id: 'ITGIT', name: 'Port of Gioia Tauro', code: 'ITGIT', country: 'Italy', type: TariffType.SEA, lat: 38.45, lon: 15.9, details: 'Tariff details for Port of Gioia Tauro to be updated.' },
  { id: 'MTMAR', name: 'Port of Marsaxlokk', code: 'MTMAR', country: 'Malta', type: TariffType.SEA, lat: 35.83, lon: 14.53, details: 'Tariff details for Port of Marsaxlokk to be updated.' },
  { id: 'PTSIE', name: 'Port of Sines', code: 'PTSIE', country: 'Portugal', type: TariffType.SEA, lat: 37.95, lon: -8.87, details: 'Tariff details for Port of Sines to be updated.' },
  { id: 'BEZEE', name: 'Port of Zeebrugge', code: 'BEZEE', country: 'Belgium', type: TariffType.SEA, lat: 51.35, lon: 3.2, details: 'Tariff details for Port of Zeebrugge to be updated.' },
  { id: 'SAKAC', name: 'King Abdullah Port', code: 'SAKAC', country: 'Saudi Arabia', type: TariffType.SEA, lat: 22.5, lon: 39.1, details: 'Tariff details for King Abdullah Port to be updated.' },
  { id: 'SADMM', name: 'Port of Dammam', code: 'SADMM', country: 'Saudi Arabia', type: TariffType.SEA, lat: 26.5, lon: 50.2, details: 'Tariff details for Port of Dammam to be updated.' },
  { id: 'OMSLL', name: 'Port of Salalah', code: 'OMSLL', country: 'Oman', type: TariffType.SEA, lat: 16.95, lon: 54.02, details: 'Tariff details for Port of Salalah to be updated.' },
  { id: 'CIABJ', name: 'Port of Abidjan', code: 'CIABJ', country: 'Ivory Coast', type: TariffType.SEA, lat: 5.28, lon: -4.0, details: 'Tariff details for Port of Abidjan to be updated.' },
  { id: 'SNDKR', name: 'Port of Dakar', code: 'SNDKR', country: 'Senegal', type: TariffType.SEA, lat: 14.68, lon: -17.42, details: 'Tariff details for Port of Dakar to be updated.' },
  { id: 'TGLFW', name: 'Port of Lomé', code: 'TGLFW', country: 'Togo', type: TariffType.SEA, lat: 6.12, lon: 1.28, details: 'Tariff details for Port of Lomé to be updated.' },
  { id: 'TZDAR', name: 'Port of Dar es Salaam', code: 'TZDAR', country: 'Tanzania', type: TariffType.SEA, lat: -6.82, lon: 39.3, details: 'Tariff details for Port of Dar es Salaam to be updated.' },
  { id: 'NAWVB', name: 'Port of Walvis Bay', code: 'NAWVB', country: 'Namibia', type: TariffType.SEA, lat: -22.95, lon: 14.5, details: 'Tariff details for Port of Walvis Bay to be updated.' },
  { id: 'AOLAD', name: 'Port of Luanda', code: 'AOLAD', country: 'Angola', type: TariffType.SEA, lat: -8.8, lon: 13.23, details: 'Tariff details for Port of Luanda to be updated.' },
  { id: 'PHBTG', name: 'Port of Batangas', code: 'PHBTG', country: 'Philippines', type: TariffType.SEA, lat: 13.75, lon: 121.05, details: 'Tariff details for Port of Batangas to be updated.' },
  { id: 'IDSRG', name: 'Port of Semarang', code: 'IDSRG', country: 'Indonesia', type: TariffType.SEA, lat: -6.95, lon: 110.42, details: 'Tariff details for Port of Semarang to be updated.' },
  { id: 'INVTZ', name: 'Port of Visakhapatnam', code: 'INVTZ', country: 'India', type: TariffType.SEA, lat: 17.68, lon: 83.28, details: 'Tariff details for Port of Visakhapatnam to be updated.' },
  { id: 'INKAT', name: 'Port of Kattupalli', code: 'INKAT', country: 'India', type: TariffType.SEA, lat: 13.3, lon: 80.35, details: 'Tariff details for Port of Kattupalli to be updated.' },
  { id: 'NOOSL', name: 'Port of Oslo', code: 'NOOSL', country: 'Norway', type: TariffType.SEA, lat: 59.9, lon: 10.73, details: 'Tariff details for Port of Oslo to be updated.' },
  { id: 'DKCPH', name: 'Port of Copenhagen', code: 'DKCPH', country: 'Denmark', type: TariffType.SEA, lat: 55.7, lon: 12.6, details: 'Tariff details for Port of Copenhagen to be updated.' },
  { id: 'IEORK', name: 'Port of Cork', code: 'IEORK', country: 'Ireland', type: TariffType.SEA, lat: 51.85, lon: -8.3, details: 'Tariff details for Port of Cork to be updated.' },
  { id: 'PTLEI', name: 'Port of Leixões', code: 'PTLEI', country: 'Portugal', type: TariffType.SEA, lat: 41.18, lon: -8.7, details: 'Tariff details for Port of Leixões to be updated.' },
  { id: 'LVRIX', name: 'Port of Riga', code: 'LVRIX', country: 'Latvia', type: TariffType.SEA, lat: 57.0, lon: 24.08, details: 'Tariff details for Port of Riga to be updated.' },
  { id: 'LTKLJ', name: 'Port of Klaipėda', code: 'LTKLJ', country: 'Lithuania', type: TariffType.SEA, lat: 55.72, lon: 21.12, details: 'Tariff details for Port of Klaipėda to be updated.' },
  { id: 'USMIA', name: 'Port of Miami', code: 'USMIA', country: 'USA', type: TariffType.SEA, lat: 25.77, lon: -80.17, details: 'Tariff details for Port of Miami to be updated.' },
  { id: 'USJAX', name: 'Port of Jacksonville', code: 'USJAX', country: 'USA', type: TariffType.SEA, lat: 30.4, lon: -81.58, details: 'Tariff details for Port of Jacksonville to be updated.' },
  { id: 'USMOB', name: 'Port of Mobile', code: 'USMOB', country: 'USA', type: TariffType.SEA, lat: 30.68, lon: -88.03, details: 'Tariff details for Port of Mobile to be updated.' },
  { id: 'BRITJ', name: 'Port of Itajaí', code: 'BRITJ', country: 'Brazil', type: TariffType.SEA, lat: -26.9, lon: -48.65, details: 'Tariff details for Port of Itajaí to be updated.' },
  { id: 'VEPBL', name: 'Port of Puerto Cabello', code: 'VEPBL', country: 'Venezuela', type: TariffType.SEA, lat: 10.48, lon: -68.0, details: 'Tariff details for Port of Puerto Cabello to be updated.' },
  { id: 'DEN', name: 'Denver International Airport', code: 'DEN', country: 'USA', type: TariffType.AIR, details: 'Tariff details for Denver International Airport to be updated.' },
  { id: 'SEA', name: 'Seattle-Tacoma International Airport', code: 'SEA', country: 'USA', type: TariffType.AIR, details: 'Tariff details for Seattle-Tacoma Airport to be updated.' },
  { id: 'PHX', name: 'Phoenix Sky Harbor International Airport', code: 'PHX', country: 'USA', type: TariffType.AIR, details: 'Tariff details for Phoenix Sky Harbor Airport to be updated.' },
  { id: 'IAH', name: 'George Bush Intercontinental Airport', code: 'IAH', country: 'USA', type: TariffType.AIR, details: 'Tariff details for George Bush Airport to be updated.' },
  { id: 'BOS', name: 'Boston Logan International Airport', code: 'BOS', country: 'USA', type: TariffType.AIR, details: 'Tariff details for Boston Logan Airport to be updated.' },
  { id: 'MSP', name: 'Minneapolis-Saint Paul International Airport', code: 'MSP', country: 'USA', type: TariffType.AIR, details: 'Tariff details for Minneapolis-Saint Paul Airport to be updated.' },
  { id: 'DTW', name: 'Detroit Metropolitan Airport', code: 'DTW', country: 'USA', type: TariffType.AIR, details: 'Tariff details for Detroit Metropolitan Airport to be updated.' },
  { id: 'LGG', name: 'Liège Airport', code: 'LGG', country: 'Belgium', type: TariffType.AIR, details: 'Tariff details for Liège Airport to be updated.' },
  { id: 'CGN', name: 'Cologne Bonn Airport', code: 'CGN', country: 'Germany', type: TariffType.AIR, details: 'Tariff details for Cologne Bonn Airport to be updated.' },
  { id: 'VIE', name: 'Vienna International Airport', code: 'VIE', country: 'Austria', type: TariffType.AIR, details: 'Tariff details for Vienna International Airport to be updated.' },
  { id: 'WAW', name: 'Warsaw Chopin Airport', code: 'WAW', country: 'Poland', type: TariffType.AIR, details: 'Tariff details for Warsaw Chopin Airport to be updated.' },
  { id: 'PRG', name: 'Prague Václav Havel Airport', code: 'PRG', country: 'Czech Republic', type: TariffType.AIR, details: 'Tariff details for Prague Václav Havel Airport to be updated.' },
  { id: 'BUD', name: 'Budapest Ferenc Liszt International Airport', code: 'BUD', country: 'Hungary', type: TariffType.AIR, details: 'Tariff details for Budapest Ferenc Liszt Airport to be updated.' },
  { id: 'ATH', name: 'Athens International Airport', code: 'ATH', country: 'Greece', type: TariffType.AIR, details: 'Tariff details for Athens International Airport to be updated.' },
  { id: 'OSL', name: 'Oslo Gardermoen Airport', code: 'OSL', country: 'Norway', type: TariffType.AIR, details: 'Tariff details for Oslo Gardermoen Airport to be updated.' },
  { id: 'CPH', name: 'Copenhagen Airport', code: 'CPH', country: 'Denmark', type: TariffType.AIR, details: 'Tariff details for Copenhagen Airport to be updated.' },
  { id: 'HEL', name: 'Helsinki-Vantaa Airport', code: 'HEL', country: 'Finland', type: TariffType.AIR, details: 'Tariff details for Helsinki-Vantaa Airport to be updated.' },
  { id: 'SZX', name: 'Shenzhen Bao\'an International Airport', code: 'SZX', country: 'China', type: TariffType.AIR, details: 'Tariff details for Shenzhen Bao\'an Airport to be updated.' },
  { id: 'CKG', name: 'Chongqing Jiangbei International Airport', code: 'CKG', country: 'China', type: TariffType.AIR, details: 'Tariff details for Chongqing Jiangbei Airport to be updated.' },
  { id: 'XIY', name: 'Xi\'an Xianyang International Airport', code: 'XIY', country: 'China', type: TariffType.AIR, details: 'Tariff details for Xi\'an Xianyang Airport to be updated.' },
  { id: 'KMG', name: 'Kunming Changshui International Airport', code: 'KMG', country: 'China', type: TariffType.AIR, details: 'Tariff details for Kunming Changshui Airport to be updated.' },
  { id: 'GMP', name: 'Gimpo International Airport', code: 'GMP', country: 'South Korea', type: TariffType.AIR, details: 'Tariff details for Gimpo International Airport to be updated.' },
  { id: 'DPS', name: 'Ngurah Rai International Airport (Bali)', code: 'DPS', country: 'Indonesia', type: TariffType.AIR, details: 'Tariff details for Ngurah Rai Airport to be updated.' },
  { id: 'CCU', name: 'Netaji Subhas Chandra Bose International Airport', code: 'CCU', country: 'India', type: TariffType.AIR, details: 'Tariff details for Netaji Subhas Chandra Bose Airport to be updated.' },
  { id: 'DAC', name: 'Hazrat Shahjalal International Airport', code: 'DAC', country: 'Bangladesh', type: TariffType.AIR, details: 'Tariff details for Hazrat Shahjalal Airport to be updated.' },
  { id: 'KHI', name: 'Jinnah International Airport', code: 'KHI', country: 'Pakistan', type: TariffType.AIR, details: 'Tariff details for Jinnah International Airport to be updated.' },
  { id: 'AUH', name: 'Abu Dhabi International Airport', code: 'AUH', country: 'UAE', type: TariffType.AIR, details: 'Tariff details for Abu Dhabi International Airport to be updated.' },
  { id: 'JED', name: 'King Abdulaziz International Airport', code: 'JED', country: 'Saudi Arabia', type: TariffType.AIR, details: 'Tariff details for King Abdulaziz Airport to be updated.' },
  { id: 'BAH', name: 'Bahrain International Airport', code: 'BAH', country: 'Bahrain', type: TariffType.AIR, details: 'Tariff details for Bahrain International Airport to be updated.' },
  { id: 'KWI', name: 'Kuwait International Airport', code: 'KWI', country: 'Kuwait', type: TariffType.AIR, details: 'Tariff details for Kuwait International Airport to be updated.' },
  { id: 'MCT', name: 'Muscat International Airport', code: 'MCT', country: 'Oman', type: TariffType.AIR, details: 'Tariff details for Muscat International Airport to be updated.' },
  { id: 'BEY', name: 'Beirut-Rafic Hariri International Airport', code: 'BEY', country: 'Lebanon', type: TariffType.AIR, details: 'Tariff details for Beirut-Rafic Hariri Airport to be updated.' },
  { id: 'ALG', name: 'Algiers Houari Boumediene Airport', code: 'ALG', country: 'Algeria', type: TariffType.AIR, details: 'Tariff details for Algiers Houari Boumediene Airport to be updated.' },
  { id: 'CMN', name: 'Mohammed V International Airport', code: 'CMN', country: 'Morocco', type: TariffType.AIR, details: 'Tariff details for Mohammed V Airport to be updated.' },
  { id: 'TUN', name: 'Tunis-Carthage International Airport', code: 'TUN', country: 'Tunisia', type: TariffType.AIR, details: 'Tariff details for Tunis-Carthage Airport to be updated.' },
  { id: 'ACC', name: 'Kotoka International Airport', code: 'ACC', country: 'Ghana', type: TariffType.AIR, details: 'Tariff details for Kotoka International Airport to be updated.' },
  { id: 'DKR', name: 'Blaise Diagne International Airport', code: 'DKR', country: 'Senegal', type: TariffType.AIR, details: 'Tariff details for Blaise Diagne Airport to be updated.' },
  { id: 'PTY', name: 'Tocumen International Airport', code: 'PTY', country: 'Panama', type: TariffType.AIR, details: 'Tariff details for Tocumen International Airport to be updated.' },
  { id: 'GIG', name: 'Rio de Janeiro-Galeão International Airport', code: 'GIG', country: 'Brazil', type: TariffType.AIR, details: 'Tariff details for Rio de Janeiro-Galeão Airport to be updated.' },
  { id: 'CUN', name: 'Cancún International Airport', code: 'CUN', country: 'Mexico', type: TariffType.AIR, details: 'Tariff details for Cancún International Airport to be updated.' },
  { id: 'BNE', name: 'Brisbane Airport', code: 'BNE', country: 'Australia', type: TariffType.AIR, details: 'Tariff details for Brisbane Airport to be updated.' },
  { id: 'PER', name: 'Perth Airport', code: 'PER', country: 'Australia', type: TariffType.AIR, details: 'Tariff details for Perth Airport to be updated.' },
  { id: 'CHC', name: 'Christchurch Airport', code: 'CHC', country: 'New Zealand', type: TariffType.AIR, details: 'Tariff details for Christchurch Airport to be updated.' },
  // --- SIXTH EXPANDED LIST (200+) ---
  { id: 'ROCND', name: 'Port of Constanța', code: 'ROCND', country: 'Romania', type: TariffType.SEA, lat: 44.12, lon: 28.65, details: 'Tariff details for Port of Constanța to be updated.' },
  { id: 'BGVAR', name: 'Port of Varna', code: 'BGVAR', country: 'Bulgaria', type: TariffType.SEA, lat: 43.20, lon: 27.93, details: 'Tariff details for Port of Varna to be updated.' },
  { id: 'RUNVS', name: 'Port of Novorossiysk', code: 'RUNVS', country: 'Russia', type: TariffType.SEA, lat: 44.72, lon: 37.78, details: 'Tariff details for Port of Novorossiysk to be updated.' },
  { id: 'GEBUS', name: 'Port of Batumi', code: 'GEBUS', country: 'Georgia', type: TariffType.SEA, lat: 41.65, lon: 41.65, details: 'Tariff details for Port of Batumi to be updated.' },
  { id: 'TRHAY', name: 'Port of Haydarpaşa (Istanbul)', code: 'TRHAY', country: 'Turkey', type: TariffType.SEA, lat: 41.00, lon: 29.02, details: 'Tariff details for Port of Haydarpaşa to be updated.' },
  { id: 'LBBEY', name: 'Port of Beirut', code: 'LBBEY', country: 'Lebanon', type: TariffType.SEA, lat: 33.90, lon: 35.52, details: 'Tariff details for Port of Beirut to be updated.' },
  { id: 'CYLMS', name: 'Port of Limassol', code: 'CYLMS', country: 'Cyprus', type: TariffType.SEA, lat: 34.65, lon: 33.02, details: 'Tariff details for Port of Limassol to be updated.' },
  { id: 'ILASH', name: 'Port of Ashdod', code: 'ILASH', country: 'Israel', type: TariffType.SEA, lat: 31.82, lon: 34.65, details: 'Tariff details for Port of Ashdod to be updated.' },
  { id: 'ILHFA', name: 'Port of Haifa', code: 'ILHFA', country: 'Israel', type: TariffType.SEA, lat: 32.82, lon: 35.02, details: 'Tariff details for Port of Haifa to be updated.' },
  { id: 'EGDAM', name: 'Port of Damietta', code: 'EGDAM', country: 'Egypt', type: TariffType.SEA, lat: 31.42, lon: 31.82, details: 'Tariff details for Port of Damietta to be updated.' },
  { id: 'LYTIP', name: 'Port of Tripoli', code: 'LYTIP', country: 'Libya', type: TariffType.SEA, lat: 32.90, lon: 13.18, details: 'Tariff details for Port of Tripoli to be updated.' },
  { id: 'TNTUN', name: 'Port of Tunis', code: 'TNTUN', country: 'Tunisia', type: TariffType.SEA, lat: 36.82, lon: 10.30, details: 'Tariff details for Port of Tunis to be updated.' },
  { id: 'DZALG', name: 'Port of Algiers', code: 'DZALG', country: 'Algeria', type: TariffType.SEA, lat: 36.78, lon: 3.08, details: 'Tariff details for Port of Algiers to be updated.' },
  { id: 'MACAS', name: 'Port of Casablanca', code: 'MACAS', country: 'Morocco', type: TariffType.SEA, lat: 33.60, lon: -7.60, details: 'Tariff details for Port of Casablanca to be updated.' },
  { id: 'MRNKC', name: 'Port of Nouakchott', code: 'MRNKC', country: 'Mauritania', type: TariffType.SEA, lat: 18.00, lon: -16.02, details: 'Tariff details for Port of Nouakchott to be updated.' },
  { id: 'SLFNA', name: 'Port of Freetown', code: 'SLFNA', country: 'Sierra Leone', type: TariffType.SEA, lat: 8.50, lon: -13.22, details: 'Tariff details for Port of Freetown to be updated.' },
  { id: 'LRMLW', name: 'Port of Monrovia', code: 'LRMLW', country: 'Liberia', type: TariffType.SEA, lat: 6.35, lon: -10.80, details: 'Tariff details for Port of Monrovia to be updated.' },
  { id: 'CISPY', name: 'Port of San Pédro', code: 'CISPY', country: 'Ivory Coast', type: TariffType.SEA, lat: 4.73, lon: -6.62, details: 'Tariff details for Port of San Pédro to be updated.' },
  { id: 'BJCOO', name: 'Port of Cotonou', code: 'BJCOO', country: 'Benin', type: TariffType.SEA, lat: 6.35, lon: 2.43, details: 'Tariff details for Port of Cotonou to be updated.' },
  { id: 'CMDLA', name: 'Port of Douala', code: 'CMDLA', country: 'Cameroon', type: TariffType.SEA, lat: 4.05, lon: 9.68, details: 'Tariff details for Port of Douala to be updated.' },
  { id: 'GALBV', name: 'Port of Libreville', code: 'GALBV', country: 'Gabon', type: TariffType.SEA, lat: 0.42, lon: 9.43, details: 'Tariff details for Port of Libreville to be updated.' },
  { id: 'CGPNR', name: 'Port of Pointe-Noire', code: 'CGPNR', country: 'Congo', type: TariffType.SEA, lat: -4.78, lon: 11.83, details: 'Tariff details for Port of Pointe-Noire to be updated.' },
  { id: 'CDMAT', name: 'Port of Matadi', code: 'CDMAT', country: 'DR Congo', type: TariffType.SEA, lat: -5.82, lon: 13.45, details: 'Tariff details for Port of Matadi to be updated.' },
  { id: 'AOLOB', name: 'Port of Lobito', code: 'AOLOB', country: 'Angola', type: TariffType.SEA, lat: -12.35, lon: 13.57, details: 'Tariff details for Port of Lobito to be updated.' },
  { id: 'MZMPM', name: 'Port of Maputo', code: 'MZMPM', country: 'Mozambique', type: TariffType.SEA, lat: -25.97, lon: 32.55, details: 'Tariff details for Port of Maputo to be updated.' },
  { id: 'MZBEW', name: 'Port of Beira', code: 'MZBEW', country: 'Mozambique', type: TariffType.SEA, lat: -19.82, lon: 34.83, details: 'Tariff details for Port of Beira to be updated.' },
  { id: 'MGTOA', name: 'Port of Toamasina', code: 'MGTOA', country: 'Madagascar', type: TariffType.SEA, lat: -18.15, lon: 49.42, details: 'Tariff details for Port of Toamasina to be updated.' },
  { id: 'MUPLU', name: 'Port Louis', code: 'MUPLU', country: 'Mauritius', type: TariffType.SEA, lat: -20.15, lon: 57.50, details: 'Tariff details for Port Louis to be updated.' },
  { id: 'DJJIB', name: 'Port of Djibouti', code: 'DJJIB', country: 'Djibouti', type: TariffType.SEA, lat: 11.60, lon: 43.15, details: 'Tariff details for Port of Djibouti to be updated.' },
  { id: 'SDPZU', name: 'Port Sudan', code: 'SDPZU', country: 'Sudan', type: TariffType.SEA, lat: 19.60, lon: 37.22, details: 'Tariff details for Port Sudan to be updated.' },
  { id: 'YEADE', name: 'Port of Aden', code: 'YEADE', country: 'Yemen', type: TariffType.SEA, lat: 12.78, lon: 44.98, details: 'Tariff details for Port of Aden to be updated.' },
  { id: 'IRBND', name: 'Port of Bandar Abbas', code: 'IRBND', country: 'Iran', type: TariffType.SEA, lat: 27.15, lon: 56.22, details: 'Tariff details for Port of Bandar Abbas to be updated.' },
  { id: 'MMRGN', name: 'Port of Yangon', code: 'MMRGN', country: 'Myanmar', type: TariffType.SEA, lat: 16.77, lon: 96.17, details: 'Tariff details for Port of Yangon to be updated.' },
  { id: 'MYPEN', name: 'Port of Penang', code: 'MYPEN', country: 'Malaysia', type: TariffType.SEA, lat: 5.42, lon: 100.35, details: 'Tariff details for Port of Penang to be updated.' },
  { id: 'IDBLW', name: 'Port of Belawan', code: 'IDBLW', country: 'Indonesia', type: TariffType.SEA, lat: 3.78, lon: 98.70, details: 'Tariff details for Port of Belawan to be updated.' },
  { id: 'IDSUB', name: 'Port of Surabaya', code: 'IDSUB', country: 'Indonesia', type: TariffType.SEA, lat: -7.20, lon: 112.73, details: 'Tariff details for Port of Surabaya to be updated.' },
  { id: 'PHCEB', name: 'Port of Cebu', code: 'PHCEB', country: 'Philippines', type: TariffType.SEA, lat: 10.30, lon: 123.92, details: 'Tariff details for Port of Cebu to be updated.' },
  { id: 'RUVVO', name: 'Port of Vladivostok', code: 'RUVVO', country: 'Russia', type: TariffType.SEA, lat: 43.12, lon: 131.90, details: 'Tariff details for Port of Vladivostok to be updated.' },
  { id: 'KHKOS', name: 'Port of Sihanoukville', code: 'KHKOS', country: 'Cambodia', type: TariffType.SEA, lat: 10.62, lon: 103.50, details: 'Tariff details for Port of Sihanoukville to be updated.' },
  { id: 'AUGLT', name: 'Port of Gladstone', code: 'AUGLT', country: 'Australia', type: TariffType.SEA, lat: -23.83, lon: 151.27, details: 'Tariff details for Port of Gladstone to be updated.' },
  { id: 'NZLYT', name: 'Port of Lyttelton', code: 'NZLYT', country: 'New Zealand', type: TariffType.SEA, lat: -43.60, lon: 172.72, details: 'Tariff details for Port of Lyttelton to be updated.' },
  { id: 'FJFUV', name: 'Port of Suva', code: 'FJFUV', country: 'Fiji', type: TariffType.SEA, lat: -18.13, lon: 178.43, details: 'Tariff details for Port of Suva to be updated.' },
  { id: 'USANC', name: 'Port of Anchorage', code: 'USANC', country: 'USA', type: TariffType.SEA, lat: 61.23, lon: -149.88, details: 'Tariff details for Port of Anchorage to be updated.' },
  { id: 'USHNL', name: 'Port of Honolulu', code: 'USHNL', country: 'USA', type: TariffType.SEA, lat: 21.30, lon: -157.87, details: 'Tariff details for Port of Honolulu to be updated.' },
  { id: 'VEPDX', name: 'Port of Portland', code: 'VEPDX', country: 'USA', type: TariffType.SEA, lat: 45.65, lon: -122.77, details: 'Tariff details for Port of Portland to be updated.' },
  { id: 'USSAN', name: 'Port of San Diego', code: 'USSAN', country: 'USA', type: TariffType.SEA, lat: 32.70, lon: -117.17, details: 'Tariff details for Port of San Diego to be updated.' },
  { id: 'MXESE', name: 'Port of Ensenada', code: 'MXESE', country: 'Mexico', type: TariffType.SEA, lat: 31.85, lon: -116.62, details: 'Tariff details for Port of Ensenada to be updated.' },
  { id: 'CRCAL', name: 'Port of Caldera', code: 'CRCAL', country: 'Costa Rica', type: TariffType.SEA, lat: 9.92, lon: -84.72, details: 'Tariff details for Port of Caldera to be updated.' },
  { id: 'SVAQA', name: 'Port of Acajutla', code: 'SVAQA', country: 'El Salvador', type: TariffType.SEA, lat: 13.58, lon: -89.83, details: 'Tariff details for Port of Acajutla to be updated.' },
  { id: 'GTPRQ', name: 'Port of Puerto Quetzal', code: 'GTPRQ', country: 'Guatemala', type: TariffType.SEA, lat: 13.92, lon: -90.78, details: 'Tariff details for Port of Puerto Quetzal to be updated.' },
  { id: 'VELAG', name: 'Port of La Guaira', code: 'VELAG', country: 'Venezuela', type: TariffType.SEA, lat: 10.60, lon: -66.93, details: 'Tariff details for Port of La Guaira to be updated.' },
  { id: 'GYGEO', name: 'Port of Georgetown', code: 'GYGEO', country: 'Guyana', type: TariffType.SEA, lat: 6.82, lon: -58.15, details: 'Tariff details for Port of Georgetown to be updated.' },
  { id: 'SRPBM', name: 'Port of Paramaribo', code: 'SRPBM', country: 'Suriname', type: TariffType.SEA, lat: 5.82, lon: -55.15, details: 'Tariff details for Port of Paramaribo to be updated.' },
  { id: 'TTPOS', name: 'Port of Spain', code: 'TTPOS', country: 'Trinidad and Tobago', type: TariffType.SEA, lat: 10.65, lon: -61.52, details: 'Tariff details for Port of Spain to be updated.' },
  { id: 'PRSJU', name: 'Port of San Juan', code: 'PRSJU', country: 'Puerto Rico', type: TariffType.SEA, lat: 18.47, lon: -66.12, details: 'Tariff details for Port of San Juan to be updated.' },
  { id: 'DOHAI', name: 'Port of Rio Haina', code: 'DOHAI', country: 'Dominican Republic', type: TariffType.SEA, lat: 18.42, lon: -70.00, details: 'Tariff details for Port of Rio Haina to be updated.' },
  { id: 'HTPAP', name: 'Port-au-Prince', code: 'HTPAP', country: 'Haiti', type: TariffType.SEA, lat: 18.55, lon: -72.35, details: 'Tariff details for Port-au-Prince to be updated.' },
  { id: 'BSFPO', name: 'Port of Freeport', code: 'BSFPO', country: 'Bahamas', type: TariffType.SEA, lat: 26.52, lon: -78.78, details: 'Tariff details for Port of Freeport to be updated.' },
  { id: 'CAHAL', name: 'Port of Halifax', code: 'CAHAL', country: 'Canada', type: TariffType.SEA, lat: 44.63, lon: -63.57, details: 'Tariff details for Port of Halifax to be updated.' },
  { id: 'ISREK', name: 'Port of Reykjavik', code: 'ISREK', country: 'Iceland', type: TariffType.SEA, lat: 64.15, lon: -21.95, details: 'Tariff details for Port of Reykjavik to be updated.' },
  { id: 'NOBGO', name: 'Port of Bergen', code: 'NOBGO', country: 'Norway', type: TariffType.SEA, lat: 60.40, lon: 5.32, details: 'Tariff details for Port of Bergen to be updated.' },
  { id: 'DKAAR', name: 'Port of Aarhus', code: 'DKAAR', country: 'Denmark', type: TariffType.SEA, lat: 56.15, lon: 10.22, details: 'Tariff details for Port of Aarhus to be updated.' },
  { id: 'SEMMA', name: 'Port of Malmö', code: 'SEMMA', country: 'Sweden', type: TariffType.SEA, lat: 55.62, lon: 12.98, details: 'Tariff details for Port of Malmö to be updated.' },
  { id: 'KEF', name: 'Keflavik International Airport', code: 'KEF', country: 'Iceland', type: TariffType.AIR, details: 'Tariff details for Keflavik International Airport to be updated.' },
  { id: 'DUS', name: 'Düsseldorf Airport', code: 'DUS', country: 'Germany', type: TariffType.AIR, details: 'Tariff details for Düsseldorf Airport to be updated.' },
  { id: 'BER', name: 'Berlin Brandenburg Airport', code: 'BER', country: 'Germany', type: TariffType.AIR, details: 'Tariff details for Berlin Brandenburg Airport to be updated.' },
  { id: 'GVA', name: 'Geneva Airport', code: 'GVA', country: 'Switzerland', type: TariffType.AIR, details: 'Tariff details for Geneva Airport to be updated.' },
  { id: 'LIS', name: 'Lisbon Airport', code: 'LIS', country: 'Portugal', type: TariffType.AIR, details: 'Tariff details for Lisbon Airport to be updated.' },
  { id: 'OTP', name: 'Henri Coandă International Airport', code: 'OTP', country: 'Romania', type: TariffType.AIR, details: 'Tariff details for Henri Coandă International Airport to be updated.' },
  { id: 'SOF', name: 'Sofia Airport', code: 'SOF', country: 'Bulgaria', type: TariffType.AIR, details: 'Tariff details for Sofia Airport to be updated.' },
  { id: 'BEG', name: 'Belgrade Nikola Tesla Airport', code: 'BEG', country: 'Serbia', type: TariffType.AIR, details: 'Tariff details for Belgrade Nikola Tesla Airport to be updated.' },
  { id: 'ZAG', name: 'Zagreb Airport', code: 'ZAG', country: 'Croatia', type: TariffType.AIR, details: 'Tariff details for Zagreb Airport to be updated.' },
  { id: 'TLL', name: 'Tallinn Airport', code: 'TLL', country: 'Estonia', type: TariffType.AIR, details: 'Tariff details for Tallinn Airport to be updated.' },
  { id: 'VNO', name: 'Vilnius Airport', code: 'VNO', country: 'Lithuania', type: TariffType.AIR, details: 'Tariff details for Vilnius Airport to be updated.' },
  { id: 'MSQ', name: 'Minsk National Airport', code: 'MSQ', country: 'Belarus', type: TariffType.AIR, details: 'Tariff details for Minsk National Airport to be updated.' },
  { id: 'KBP', name: 'Boryspil International Airport', code: 'KBP', country: 'Ukraine', type: TariffType.AIR, details: 'Tariff details for Boryspil International Airport to be updated.' },
  { id: 'DME', name: 'Domodedovo International Airport', code: 'DME', country: 'Russia', type: TariffType.AIR, details: 'Tariff details for Domodedovo International Airport to be updated.' },
  { id: 'ALA', name: 'Almaty International Airport', code: 'ALA', country: 'Kazakhstan', type: TariffType.AIR, details: 'Tariff details for Almaty International Airport to be updated.' },
  { id: 'TAS', name: 'Tashkent International Airport', code: 'TAS', country: 'Uzbekistan', type: TariffType.AIR, details: 'Tariff details for Tashkent International Airport to be updated.' },
  { id: 'GYD', name: 'Heydar Aliyev International Airport', code: 'GYD', country: 'Azerbaijan', type: TariffType.AIR, details: 'Tariff details for Heydar Aliyev International Airport to be updated.' },
  { id: 'TBS', name: 'Tbilisi International Airport', code: 'TBS', country: 'Georgia', type: TariffType.AIR, details: 'Tariff details for Tbilisi International Airport to be updated.' },
  { id: 'EVN', name: 'Zvartnots International Airport', code: 'EVN', country: 'Armenia', type: TariffType.AIR, details: 'Tariff details for Zvartnots International Airport to be updated.' },
  { id: 'IKA', name: 'Imam Khomeini International Airport', code: 'IKA', country: 'Iran', type: TariffType.AIR, details: 'Tariff details for Imam Khomeini International Airport to be updated.' },
  { id: 'ISB', name: 'Islamabad International Airport', code: 'ISB', country: 'Pakistan', type: TariffType.AIR, details: 'Tariff details for Islamabad International Airport to be updated.' },
  { id: 'LHE', name: 'Allama Iqbal International Airport', code: 'LHE', country: 'Pakistan', type: TariffType.AIR, details: 'Tariff details for Allama Iqbal International Airport to be updated.' },
  { id: 'KTM', name: 'Tribhuvan International Airport', code: 'KTM', country: 'Nepal', type: TariffType.AIR, details: 'Tariff details for Tribhuvan International Airport to be updated.' },
  { id: 'CMB', name: 'Bandaranaike International Airport', code: 'CMB', country: 'Sri Lanka', type: TariffType.AIR, details: 'Tariff details for Bandaranaike International Airport to be updated.' },
  { id: 'RGN', name: 'Yangon International Airport', code: 'RGN', country: 'Myanmar', type: TariffType.AIR, details: 'Tariff details for Yangon International Airport to be updated.' },
  { id: 'HAN', name: 'Noi Bai International Airport', code: 'HAN', country: 'Vietnam', type: TariffType.AIR, details: 'Tariff details for Noi Bai International Airport to be updated.' },
  { id: 'PNH', name: 'Phnom Penh International Airport', code: 'PNH', country: 'Cambodia', type: TariffType.AIR, details: 'Tariff details for Phnom Penh International Airport to be updated.' },
  { id: 'ADL', name: 'Adelaide Airport', code: 'ADL', country: 'Australia', type: TariffType.AIR, details: 'Tariff details for Adelaide Airport to be updated.' },
  { id: 'WLG', name: 'Wellington Airport', code: 'WLG', country: 'New Zealand', type: TariffType.AIR, details: 'Tariff details for Wellington Airport to be updated.' },
  { id: 'NAN', name: 'Nadi International Airport', code: 'NAN', country: 'Fiji', type: TariffType.AIR, details: 'Tariff details for Nadi International Airport to be updated.' },
  { id: 'GDL', name: 'Guadalajara International Airport', code: 'GDL', country: 'Mexico', type: TariffType.AIR, details: 'Tariff details for Guadalajara International Airport to be updated.' },
  { id: 'SJO', name: 'Juan Santamaría International Airport', code: 'SJO', country: 'Costa Rica', type: TariffType.AIR, details: 'Tariff details for Juan Santamaría International Airport to be updated.' },
  { id: 'KIN', name: 'Norman Manley International Airport', code: 'KIN', country: 'Jamaica', type: TariffType.AIR, details: 'Tariff details for Norman Manley International Airport to be updated.' },
  { id: 'NAS', name: 'Lynden Pindling International Airport', code: 'NAS', country: 'Bahamas', type: TariffType.AIR, details: 'Tariff details for Lynden Pindling International Airport to be updated.' },
  { id: 'PUJ', name: 'Punta Cana International Airport', code: 'PUJ', country: 'Dominican Republic', type: TariffType.AIR, details: 'Tariff details for Punta Cana International Airport to be updated.' },
  { id: 'UIO', name: 'Mariscal Sucre International Airport', code: 'UIO', country: 'Ecuador', type: TariffType.AIR, details: 'Tariff details for Mariscal Sucre International Airport to be updated.' },
  { id: 'ASU', name: 'Silvio Pettirossi International Airport', code: 'ASU', country: 'Paraguay', type: TariffType.AIR, details: 'Tariff details for Silvio Pettirossi International Airport to be updated.' },
  { id: 'MVD', name: 'Carrasco International Airport', code: 'MVD', country: 'Uruguay', type: TariffType.AIR, details: 'Tariff details for Carrasco International Airport to be updated.' },
  { id: 'ABJ', name: 'Félix-Houphouët-Boigny International Airport', code: 'ABJ', country: 'Ivory Coast', type: TariffType.AIR, details: 'Tariff details for Félix-Houphouët-Boigny International Airport to be updated.' },
  { id: 'FIH', name: 'N\'djili Airport', code: 'FIH', country: 'DR Congo', type: TariffType.AIR, details: 'Tariff details for N\'djili Airport to be updated.' },
  { id: 'WDH', name: 'Hosea Kutako International Airport', code: 'WDH', country: 'Namibia', type: TariffType.AIR, details: 'Tariff details for Hosea Kutako International Airport to be updated.' },
  { id: 'HRE', name: 'Robert Gabriel Mugabe International Airport', code: 'HRE', country: 'Zimbabwe', type: TariffType.AIR, details: 'Tariff details for Robert Gabriel Mugabe International Airport to be updated.' },
  { id: 'LUN', name: 'Kenneth Kaunda International Airport', code: 'LUN', country: 'Zambia', type: TariffType.AIR, details: 'Tariff details for Kenneth Kaunda International Airport to be updated.' },
  { id: 'MPM', name: 'Maputo International Airport', code: 'MPM', country: 'Mozambique', type: TariffType.AIR, details: 'Tariff details for Maputo International Airport to be updated.' },
  { id: 'TNR', name: 'Ivato International Airport', code: 'TNR', country: 'Madagascar', type: TariffType.AIR, details: 'Tariff details for Ivato International Airport to be updated.' },
  { id: 'MRU', name: 'Sir Seewoosagur Ramgoolam International Airport', code: 'MRU', country: 'Mauritius', type: TariffType.AIR, details: 'Tariff details for Sir Seewoosagur Ramgoolam International Airport to be updated.' },
  { id: 'SEZ', name: 'Seychelles International Airport', code: 'SEZ', country: 'Seychelles', type: TariffType.AIR, details: 'Tariff details for Seychelles International Airport to be updated.' },
  { id: 'JIB', name: 'Djibouti–Ambouli International Airport', code: 'JIB', country: 'Djibouti', type: TariffType.AIR, details: 'Tariff details for Djibouti–Ambouli International Airport to be updated.' },
  { id: 'MGQ', name: 'Aden Adde International Airport', code: 'MGQ', country: 'Somalia', type: TariffType.AIR, details: 'Tariff details for Aden Adde International Airport to be updated.' },
  { id: 'KRT', name: 'Khartoum International Airport', code: 'KRT', country: 'Sudan', type: TariffType.AIR, details: 'Tariff details for Khartoum International Airport to be updated.' },
  { id: 'BKO', name: 'Modibo Keita International Airport', code: 'BKO', country: 'Mali', type: TariffType.AIR, details: 'Tariff details for Modibo Keita International Airport to be updated.' },
  { id: 'RAI', name: 'Nelson Mandela International Airport', code: 'RAI', country: 'Cape Verde', type: TariffType.AIR, details: 'Tariff details for Nelson Mandela International Airport to be updated.' },
];