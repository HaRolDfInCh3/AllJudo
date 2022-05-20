import { StatusBanniere } from "../enums/StatusBanniere"

export class Bannieres_par_taille{
    idMongo?: string
  id?: number
  nom?: string
  code?: string
  image?: string
  url?: string
  actif?: StatusBanniere
  restriction?: string
  taille?: string
}