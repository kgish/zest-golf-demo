export interface IAddress {
    address1: string;
    address2: string;
    number: string;
    addition: string;
    zipcode: string;
    place: string;
    state: string;
    country: string;
}

export interface IServices {
    mid: number;
    drivingRange: boolean;
    chippingArea: boolean;
    puttingGreen: boolean;
    proShop: boolean;
    golfSchool: boolean;
    golfBuggy: boolean;
    pushTrolley: boolean;
    electricTrolley: boolean;
    golfClubRentals: boolean;
    caddies: boolean;
    restaurant: boolean;
    bar: boolean;
    lockerRoom: boolean;
    wifi: boolean;
    shuttleService: boolean;
}

export interface IFacility {
    id: number;
    name: string;
    website: string;
    email: string;
    address: IAddress;

    // Detail only
    latitude?: number;
    longitude?: number;
    phoneNumber?: string;
    foundedIn?: number;
    description?: string;
    services?: IServices;
    logo?: string;
    images?: string[];
}
