

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { GetDataService } from '../get-data.service';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";
import { Users, UsersComponent } from './users.component';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { By } from '@angular/platform-browser';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let service: GetDataService;
  let httpMock: HttpTestingController;
  let testUsers: Users[] = [
    {
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
events_url: "https://api.github.com/users/mojombo/events{/privacy}",
followers_url: "https://api.github.com/users/mojombo/followers",
following_url: "https://api.github.com/users/mojombo/following{/other_user}",
gists_url: "https://api.github.com/users/mojombo/gists{/gist_id}",
gravatar_id: "",
html_url: "https://github.com/mojombo",
id: 1,
login: "mojombo",
node_id: "MDQ6VXNlcjE=",
organizations_url: "https://api.github.com/users/mojombo/orgs",
received_events_url: "https://api.github.com/users/mojombo/received_events",
repos_url: "https://api.github.com/users/mojombo/repos",
site_admin: false,
starred_url: "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
subscriptions_url: "https://api.github.com/users/mojombo/subscriptions",
type: "User",
url: "https://api.github.com/users/mojombo"
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule, NgxPaginationModule,HttpClientTestingModule],
      declarations: [ UsersComponent ],
    
      providers: [GetDataService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(GetDataService);
    httpMock = fixture.debugElement.injector.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should call ngOnInit', () => {
    let spy_getPostDetails = spyOn(component,"getUsers").and.returnValue();
    component.ngOnInit();
    expect(component.users).toEqual([]);
  })
  
  it('should call getUsers and get response as empty array', fakeAsync(() => {
    
    let fixture = TestBed.createComponent(UsersComponent);
    let component = fixture.componentInstance;
    component.getUsers();
    console.log(component,'get');
    //expect(component.users).toEqual(testUsers);
     
    let spy_getPosts = spyOn(service,"getUsers").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.getUsers();
    tick(100);
    expect(component.users).toEqual([]);
  })) ; 
  
  it('should test the table ', (done) => {
    
  
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
  
      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(1);
  
      // Header row
      let headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe('Username');
      expect(headerRow.cells[1].innerHTML).toBe('About');
     
  
      // Data rows
     // let row1 = tableRows[1];
   //   expect(row1.cells[0].innerHTML).toBe('dummy@mail.com');
     // expect(row1.cells[1].innerHTML).toBe('01-01-2020');
     // expect(row1.cells[2].innerHTML).toBe('admin,standard');
  
      // Test more rows here..
  
      done();
    });
  });

  it ('should have loading button',() => {
    let buttonElement = fixture.debugElement.query(By.css('.autobutton'));
    expect(buttonElement).toBeTruthy();
    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.callInterval).toBeTruthy();
      
    });

  })

});
