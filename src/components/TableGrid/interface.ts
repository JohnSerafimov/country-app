export interface Country {
    id?: string | number;
    capitalName: string;
    code: string;
    flag: string;
    latLng: number[];
    name: string;
    population: number;
    region: string;
    subregion: string;
}

export interface Countries {
    countries: Country[]
}