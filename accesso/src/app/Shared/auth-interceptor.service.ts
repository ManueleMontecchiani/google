import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';

import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const user: User = this.authService.user;
    if (!user) {
      return next.handle(req);
    }
    const modifiedReq = req.clone({
      params: new HttpParams().set('auth', user.token)//todo se user==null user.token lancia eccezione ??
    });
    return next.handle(modifiedReq);
  }
}
