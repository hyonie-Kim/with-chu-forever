export interface Wedding {
    id: number;
    date: string;
    location:Location;

    message: {
        intro:string;
        invitation: string;
    }
    galleryImages: string[]
    attendCount:number

    groom: Person & {parents: Person[]}
    bride: Person & {parents: Person[]}
}

export interface Location {
    lat: number;
    lng: number;
    name:string;
    address:string;
    link:string;
    waytocome:{
        metro: string[];
        bus: string[];

    }

}


export interface Person {
    name: string;
    account: Account;
    phoneNumber:string;
}


export interface Account {
    bankName: string;
    accountNumber:string;
    kakaoPayLink?:string;
}