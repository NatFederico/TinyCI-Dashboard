import { LogLevel } from 'src/app/core/models/logger/log-entry.model';

export const environment = {
  production: false,
  loggerLevel: LogLevel.Debug,
  storage: {
    keys: {
      culture: 'template_culture',
      referenceId: 'template_referenceId',
      routeAfterLogin: 'template_route_callback'
    }
  },
  auth: {
    clientId: 'it.unitn.icts.template-spa',
    responseType: 'id_token token',
    scope: 'openid profile account email',
    authority: 'https://test-unitn-idsrv/identity',
    discoveryEndpoint: 'https://webappstest.unitn.it/sts/identity/.well-known/openid-configuration',
    redirectUri: 'http://localhost:4200/oauth/callback',
    silentRedirectUri: 'http://localhost:4200/oauth/silent',
    postLogoutRedirectUri: 'http://localhost:4200/oauth/endsession'
  },
  authorization: {
    userRoles: [],
    backofficerRoles: [],
    administratorRoles: []
  },
  apiUrlPrefix: 'https://webapitest.unitn.it/template/',
  apiVersion: '1.0',
  version: '1.0.0'
};
