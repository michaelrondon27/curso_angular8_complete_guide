import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';

@Injectable({
    providedIn: 'root'
})
export class ServerResolver implements Resolve<Server> {

    constructor(
        private serversService: ServersService
    ) {}

    resolve(
        activatedRouteSnapshot: ActivatedRouteSnapshot,
        routerStateSnapshot: RouterStateSnapshot
    ): Observable<Server> | Promise<Server> | Server {

        return this.serversService.getServer(+activatedRouteSnapshot.params['id']);

    }

}

interface Server {
    id: number;
    name: string;
    status: string;
}
