import { Login as Login_Login } from './Login/Login.component';
import { Routing as Routing_Routing } from './Routing/Routing.component';
import { Admin as Admin_Admin } from './Admin/Admin.component';
import { Sales as Sales_Sales } from './Sales/Sales.component';
import { LogOut as LogOut_LogOut } from './LogOut/LogOut.component';

export const title = "";

export const magicGenCmpsHash = {               LogOut_LogOut:LogOut_LogOut,
                      Sales_Sales:Sales_Sales,
                      Admin_Admin:Admin_Admin,
                      Routing_Routing:Routing_Routing,
                      Login_Login:Login_Login,
       
};

export const magicGenComponents = [ LogOut_LogOut ,  Sales_Sales ,  Admin_Admin ,  Routing_Routing ,  Login_Login 
];


export const LazyLoadModulesMap = {};