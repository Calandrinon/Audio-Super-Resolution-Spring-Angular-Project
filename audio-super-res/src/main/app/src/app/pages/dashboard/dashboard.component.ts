import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ngOnInit() {
  }

  checkLocalStorageId(): boolean {
    let currentUser = localStorage.getItem("current-user");
    if (currentUser !== null) {
      let contents = Number(JSON.parse(currentUser));
      console.log(contents);
      return (contents !== -1);
    }
    return false;
  }

}
