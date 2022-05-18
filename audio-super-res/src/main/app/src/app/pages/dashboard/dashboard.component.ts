import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ngOnInit() {
  }

  checkLocalStorageToken(): boolean {
    let token = localStorage.getItem("token");
    return token !== null;
  }

}
