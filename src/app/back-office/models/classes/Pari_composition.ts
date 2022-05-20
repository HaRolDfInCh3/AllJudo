import { Sexe } from "../enums/Sexe"
import { Pari_compositionElement } from "./Pari_compositionElement"

export class Pari_composition{
    idMongo?: string
    id?: number
    sexe?: Sexe
    poid?: string
    date?: Date
    participant?: string
    forfait?: string
    podium_final?: string
    premier_final?: string
    pari?: number
    elements?:Array<Pari_compositionElement>
}