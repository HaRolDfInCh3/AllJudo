import { TypeOffre } from "../enums/TypeOffre"

export class Article{
    idMongo?: string
  id?: number
  nom?: string
  prix?: number
  offre?: string
  marque?: string
  livraison?: number
  transporteur?: string
  descr?: string
  image_pre?: string
  video?: string
  type?: TypeOffre
  code_paypal?: string
  old_prix?: number
}