import { Login as Login_Login } from './Login/Login.component';
import { Routing as Routing_Routing } from './Routing/Routing.component';
import { Admin as Admin_Admin } from './Admin/Admin.component';
import { Sales as Sales_Sales } from './Sales/Sales.component';

export const title = "";

export const magicGenCmpsHash = {               Sales_Sales:Sales_Sales,
                      Admin_Admin:Admin_Admin,
                      Routing_Routing:Routing_Routing,
                      Login_Login:Login_Login,
       
};

export const magicGenComponents = [ Sales_Sales ,  Admin_Admin ,  Routing_Routing ,  Login_Login 
];


export const LazyLoadModulesMap = {};