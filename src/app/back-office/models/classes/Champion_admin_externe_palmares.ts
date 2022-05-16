import { CompetitionType } from "../enums/CompetitionType"
import { IntituleCompetitionFrancais } from "../enums/IntituleCompetitionFrancais"

export class Champion_admin_externe_palmares{
    idMongo?: string
  id?: number
  rang?: string
  championID?: number
  poidsID?: string
  date?: Date
  categorieAge?: number
  competitionType?: CompetitionType
  competitionLieu?: string
  competitionDepID?: number
  competitionRegID?: number
  competitionFr?: IntituleCompetitionFrancais
}