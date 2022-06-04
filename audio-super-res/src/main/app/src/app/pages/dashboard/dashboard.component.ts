import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // content = "$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$";
  snrFormula = "\\[ SNR = \\frac{P_{signal}}{P_{noise}}\\]\n";
  snrFormula2 = "\\[ SNR_{dB} = 10 \\cdot \\log_{10}\\left(\\frac{P_{signal}}{P_{noise}}\\right) \\]\n";
  pSignal = "$ P_{signal} $";
  pNoise = "$ P_{noise} $";
  rmseFormula = "\\[ RMSE = \\sqrt{\\frac{\\sum_{i=1}^{n} (y_i - \\lambda (x_i))^2}{n}} \\]\n";
  nrmseFormula = "\\[ NRMSE = \\frac{RMSE}{IQR} \\]\n";

  ngOnInit() {
  }

  checkLocalStorageToken(): boolean {
    let token = localStorage.getItem("token");
    return token !== null;
  }

}
