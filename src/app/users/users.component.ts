
import { typeSourceSpan } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { GetDataService } from '../get-data.service';
 export interface Users {
  avatar_url: String,
events_url: String,
followers_url: String,
following_url: String,
gists_url: String,
gravatar_id: String,
html_url: String,
id: number,
login: String,
node_id: String,
organizations_url: String,
received_events_url: String,
repos_url: String,
site_admin: boolean,
starred_url: String,
subscriptions_url: String,
type: String,
url: String
 } 

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

 //users:any=[];
users:Users[]=[];
  page = 1;
  total :number=0;
  pageSize= 5;
  disableNext = false;
   callInterval: any;
   n=0;
  

  constructor(private _getData : GetDataService) { 
  }

  ngOnInit() {
    this.getUsers();
    this.page = Number(localStorage.getItem('currentPage'));
  }


  getUsers() {
    this._getData.getUsers().subscribe((res ) => {
      console.log(res,'res',typeof(res));
      
      this.users = res || [];
      this.total = this.users.length;
      
    })
  }

  next(){
    this.page++;

    if(this.page === this.total/this.pageSize)
      {
        clearInterval(this.callInterval);
      this.callInterval=null;
      }
        
  }
  automatic() {
    
    if(!this.callInterval) {
    this.callInterval = setInterval(()=>{
      this.next();
      console.log(this.n++);
    }, 30000);
    }
    else {
      clearInterval(this.callInterval);
      this.callInterval=null;
    }
  }

  pageChange(pageNumber: number){
    this.page=pageNumber;
    localStorage.setItem('currentPage', JSON.stringify(this.page));

    if(this.callInterval) {
    clearInterval(this.callInterval);
    this.callInterval=null;
    this.automatic();
    }
  }
}
