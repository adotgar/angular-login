import { Component } from '@angular/core';
import { TerritoriesService } from '../services/territories.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { Territory } from '../Territory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  territories?: Territory[]

  constructor(
    private territoriesService: TerritoriesService,
    private router: Router
  ){}

  ngOnInit(){
    this.territoriesService.getTerritories().subscribe((res: any)=>{
      if(res && res.data){
        this.territories = this.convertFlatToTree(res.data);
      }
    })
  }

  signOut(){
    localStorage.removeItem('userName');
    this.router.navigate(['/account/login']);
  }

  toggleExpand(territory: Territory): void {
    territory.expanded = !territory.expanded;
  }

  convertFlatToTree(flatTerritories: Territory[]): Territory[] {
    const territoryDict: { [id: number]: Territory } = {};
    
    for (const territory of flatTerritories) {
      territoryDict[territory.id] = territory;
    }
  
    const treeTerritories: Territory[] = [];

    for (const territory of flatTerritories) {
      const parentID = territory.parent;
      const parentTerritory = territoryDict[parentID!];
  
      if (parentTerritory) {
        if (!parentTerritory.children) {
          parentTerritory.children = [];
        }
        parentTerritory.children.push(territory);
      } else {
        treeTerritories.push(territory);
      }
    }
    return treeTerritories;
  }
  

}
