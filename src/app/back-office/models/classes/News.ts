import { typeNews } from "../enums/typeNews"

export class News{
    idMongo?: String
  id?: number
  date?: Date
  source?: string
  titre?: string
  titre_en?: string
  chapo?: string
  texte?: string
  photo?: string
  type?: typeNews
  nom?: string
  url?: string
  legende?: string
  lien1?: string
  textlien1?: string
  lien2?: string
  textlien2?: string
  lien3?: string
  textlien3?: string
  aLaUne?: boolean
  aLaDeux?: boolean
  evenementID?: number
  categorieID?: number
  admin?: string|null
  alaDeux?: boolean
  alaUne?: boolean


  
}