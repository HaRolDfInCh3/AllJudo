import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Pari_composition } from 'src/app/back-office/models/classes/Pari_composition';
import { Pari_compositionElement } from 'src/app/back-office/models/classes/Pari_compositionElement';
import { EcritureService } from 'src/app/back-office/services-backoffice/ecriture.service';
import { ProviderService } from 'src/app/back-office/services-backoffice/provider.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  id?:number;
  listOfData:any;
  listOfDisplayedData:any;
  currentPari: any;
submitForm(): void {
 
  
}

constructor(private dataProvider:ProviderService,private fb: FormBuilder,private router: Router,private msg: NzMessageService,private ecritService:EcritureService,private route: ActivatedRoute) {
  

  
}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.id = parseInt(params["id"]);
});
this.dataProvider.getPariCompositions(this.id||0).subscribe(
  data => {
    this.msg.success(data.length+' pari compositions recuperes');
    this.listOfData=data
    this.listOfDisplayedData=data
    console.log("exemple de compisition:",data[0])
  },
  err => {
    console.log("erreur survenue lors de la reception");
    this.msg.error("erreur survenue lors de la reception");
  }
);
  
  
}
edit(idCompo:number,idCompoElement:number,index:number){
  //console.log("position: "+idCompoElement+" eme element de la composition "+idCompo)
 // console.log("valeur", this.listOfDisplayedData[index].elements[idCompoElement-1])
  }
  send(idCompo:number,index:number){
   // console.log("position: "+idCompo+" eme composition ")
   // console.log("valeur", this.listOfDisplayedData[index])
    const pariComposition=new Pari_composition()
    pariComposition.id=this.listOfDisplayedData[index].id
    pariComposition.idMongo=this.listOfDisplayedData[index].idMongo
    pariComposition.pari=this.listOfDisplayedData[index].pari
    pariComposition.sexe=this.listOfDisplayedData[index].sexe
    pariComposition.poid=this.listOfDisplayedData[index].poid
    pariComposition.date=this.listOfDisplayedData[index].date
    pariComposition.participant=this.listOfDisplayedData[index].participant
    pariComposition.forfait=this.listOfDisplayedData[index].forfait
    pariComposition.podium_final=this.listOfDisplayedData[index].podium_final
    pariComposition.premier_final=this.listOfDisplayedData[index].premier_final
    let elements: Array<Pari_compositionElement>=[]
    this.listOfDisplayedData[index].elements.forEach( (value:any) => {

      const pce =new Pari_compositionElement()
      pce.id=value.id
      pce.idMongo=value.idMongo
      pce.participant=value.participant
      pce.podium=value.podium
      pce.premier=value.premier
      pce.paricompositionid=this.listOfDisplayedData[index].id
      elements.push(pce)
  });
  pariComposition.elements=elements
  console.log(pariComposition)
  this.ecritService.updatePari_composition(idCompo||0,pariComposition).subscribe(
    data => {
      this.msg.success(' pari compositions mis a jour');
    },
    err => {
      console.log("erreur survenue lors de la mise a jour");
      this.msg.error("erreur survenue lors de la mise a jour");
    }
  );

  }
getId(id:number){
  return "id"+id
}
getIdRef(id:number){
  return "#id"+id
}

}



