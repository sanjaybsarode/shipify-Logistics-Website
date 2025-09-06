
import { Container } from '../types';

export const CONTAINER_DATA: Container[] = [
  {
    id: '20ST',
    name: "20' Standard",
    // Internal dimensions in mm
    length: 5898,
    width: 2352,
    height: 2393,
    // Volume in cubic meters
    volume: 33.2,
    // Max payload in kg
    payload: 28480,
  },
  {
    id: '40ST',
    name: "40' Standard",
    length: 12032,
    width: 2352,
    height: 2393,
    volume: 67.7,
    payload: 26580,
  },
  {
    id: '40HC',
    name: "40' High Cube",
    length: 12032,
    width: 2352,
    height: 2700,
    volume: 76.4,
    payload: 26500,
  },
];
