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

export interface IFacility {
    id: number;
    name: string;
    website: string;
    email: string;
    address: IAddress;
}
