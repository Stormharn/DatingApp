import { Photo } from "./photo";

export interface Member {
    id: number;
    userName: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: string;
    interestedIn: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    state: string;
    photos: Photo[];
}