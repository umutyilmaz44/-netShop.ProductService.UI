import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    rtlTitle: "",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/suppliers",
    title: "Suppliers",
    rtlTitle: "",
    icon: "icon-world",
    class: ""
  },
  {
    path: "/brands",
    title: "Brands",
    rtlTitle: "",
    icon: "icon-molecule-40",
    class: ""
  },
  {
    path: "/models",
    title: "Models",
    rtlTitle: "",
    icon: "icon-book-bookmark",
    class: "" },
  {
    path: "/products",
    title: "Products",
    rtlTitle: "",
    icon: "icon-puzzle-10",
    class: ""
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menuItems?: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

}
