import { Routes } from '@angular/router';
import { Register } from './components/register/register'
import { Login } from './components/login/login'
import { MessageWindow } from './components/message-window/message-window'
export const routes: Routes = [
    { path: 'register', component: Register},
    { path: '', component: Login},
    { path: 'chat', component: MessageWindow},

    
];
