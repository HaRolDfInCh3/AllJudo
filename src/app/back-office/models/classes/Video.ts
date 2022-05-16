import { Sexe } from "../enums/Sexe"
import { VideoCategorie } from "../enums/VideoCategorie"

export class Video{
    idMongo?: string
  id?: number
  titre?: string
  date?: Date
  duree?: string
  objet?: string
  categorie?: VideoCategorie
  vignette?: string
  a_la_une?: Boolean
  champion_id?: number
  technique_id?: number
  technique2_id?: number
  evenement_id?: number
  poidID?: string
  sexe?: Sexe
  top_ippon?: Boolean
}