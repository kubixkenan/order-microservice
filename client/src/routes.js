/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import LoginComponent from "views/login/Login";
import Modules from "views/module/index";
import Companies from "views/companies/index";
import AddModule from "views/module/add-module";
import AddForm from "views/forms/add";
import AddCompany from "views/companies/add";
import FormUpdate from "views/forms/update";
import FormDetail from "views/forms/detail";

var routes = [
  {
    path: "/login",
    component: LoginComponent,
    visible: false
  },
  {
    path: "/module/add",
    component: AddModule,
    visible: false,
    layout: '/admin'
  },
  {
    path: "/add-company",
    component: AddCompany,
    visible: false,
    layout: '/admin'
  },
  {
    path: "/forms/add-form/:id",
    component: AddForm,
    visible: false,
    layout: '/admin'
  },
  {
    path: "/forms/update/:id",
    component: FormUpdate,
    visible: false,
    layout: '/admin'
  },
  {
    path: "/forms/detail/:id",
    component: FormDetail,
    visible: false,
    layout: '/admin'
  },
  {
    path: "/modules/:id",
    component: Modules,
    visible: false,
    layout: '/admin'
  },
  {
    path: "/index",
    name: "Genel Bakış",
    icon: "ni ni-chart-pie-35 text-primary",
    component: Index,
    visible: true,
    layout: "/admin"
  },
  {
    path: "/companies",
    name: "Şirketler",
    icon: "ni ni-building text-primary",
    component: Companies,
    visible: true,
    layout: "/admin"
  },
  (localStorage.getItem('companyId') ?
    {
      path: "/module/add",
      name: "Yeni Modül Ekle",
      icon: "ni ni-fat-add text-primary",
      component: Companies,
      visible: true,
      layout: "/admin"
    }
    : {})
];
export default routes;
