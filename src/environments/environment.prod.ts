export const environment = {
    production: true,
    tokenVersion: 'market-watch-token-v1',
    ssoUrl: 'https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=' +
        'https%3A%2F%2Feve-market-watch.firebaseapp.com' +
        '%2Fcallback&client_id=f55a481f1db042e6b18f4a78f0f9caf2' +
        '&scope=esi-search.search_structures.v1%20esi-universe.read_structures.v1%20esi-markets.structure_markets.v1&state=d8s7df',
    apiUrl: 'https://n8nzyvddi5.execute-api.us-east-1.amazonaws.com/dev'
};
