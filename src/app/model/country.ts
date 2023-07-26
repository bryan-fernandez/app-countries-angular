import { Flag, Name } from "./ApiResponse";

export interface Country {
    name: Name;
    capital: string[];
    region: string;
    flags: Flag
}