import { Routes } from '@angular/router';
import { Register } from './components/register/register'
import { Login } from './components/login/login'
import { MessageWindow } from './components/message-window/message-window'
import { Usuarios } from './components/usuarios/usuarios';
import { Perfil } from './components/perfil/perfil';
import { EditarPerfil} from './components/editar-perfil/editar-perfil'
import { Activacion } from './components/activacion/activacion';
import { Recovery } from './components/recovery/recovery';
import { PasswordReset } from './components/password-reset/password-reset';
export const routes: Routes = [
    { path: 'register', component: Register},
    { path: 'login', component: Login},
    { path: '', component: Login},
    { path: 'chat', component: MessageWindow},
    { path: 'usuarios', component: Usuarios},
    { path: 'perfil/:id', component: Perfil },
    { path: 'editar-perfil', component: EditarPerfil},
    { path: 'activar', component: Activacion },
    { path: 'recovery', component: Recovery },
    { path: 'password-reset', component: PasswordReset }
];
