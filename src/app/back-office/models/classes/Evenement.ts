import { CategorieEvenementSexe } from "../enums/CategorieEvenementSexe"
import { typeEvenement } from "../enums/TypeEvenement"

export class Evenement{
    idMongo?: string
    id?: number
    nom?: string
    sexe?: CategorieEvenementSexe
    dateDebut?: Date
    dateFin?: Date
    datePub?: Date
    presentation?: string
    visible?: true
    type?: typeEvenement
    document1?: string
    document2?: string
    document3?: string
    contact?: string
    telephone?: string
    mail?: string
    web?: string
    valider?: true
    pack?: true
    paysID?: string
    categorieID?: number
    categorieageID?: number
    compteur?: number
}