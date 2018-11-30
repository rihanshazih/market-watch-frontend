// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    tokenVersion: 'market-watch-token-v1',
    ssoUrl: 'https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=' +
        'https%3A%2F%2Feve-market-watch.firebaseapp.com' +
        '%2Fcallback&client_id=f55a481f1db042e6b18f4a78f0f9caf2' +
        '&scope=esi-search.search_structures.v1%20esi-universe.read_structures.v1%20esi-markets.structure_markets.v1&state=d8s7df',
    apiUrl: 'https://n8nzyvddi5.execute-api.us-east-1.amazonaws.com/dev'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
