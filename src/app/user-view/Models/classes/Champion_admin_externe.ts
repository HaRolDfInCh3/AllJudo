import { SituationAdminExterne } from "../enums/SituationAdminExterne"

export class Champion_admin_externe{
    idMongo?:string
	 id?:number
	 nom?:string
	 prenom?:string
	 telephone?:string
	situation?: SituationAdminExterne 
	 video?:string
	 user_id?:number
	 champion_id?:number
	 
	
	 ip_creation?:string
	 date_mod2?:Date
	 date_creation2?:Date
	 date_creation?:string
	 ip_mod?:string
	 date_mod?:string
	 actif?:boolean
}