import { Routes } from '@angular/router';
import { Register } from './components/register/register'
import { Login } from './components/login/login'
import { MessageWindow } from './components/message-window/message-window'
import { Usuarios } from './components/usuarios/usuarios';
import { Perfil } from './components/perfil/perfil';
import { EditarPerfil} from './components/editar-perfil/editar-perfil'
export const routes: Routes = [
    { path: 'register', component: Register},
    { path: 'login', component: Login},
    { path: '', component: Login},
    { path: 'chat', component: MessageWindow},
    { path: 'usuarios', component: Usuarios},
    { path: 'perfil/:id', component: Perfil },
    { path: 'editar-perfil', component: EditarPerfil}
    
];
