// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apirest local node
   apiUrl: "http://localhost:5001/api",
  apiUrlMedia: "http://localhost:5001/api/uploads/",
  //remoto
  // apiUrl: "https://backend-daniel-node-mongo.vercel.app/api",
  // apiUrlMedia: "https://backend-daniel-node-mongo.vercel.app/api/uploads/",
  //paypal
  clientSandboxId: 'AXlazeNsZ0CmjfJIronSzcqzw4hLHkcoVEM5fO5BY7AbD-_GhKoKezRcavq6-T4kQuRqaTXFB_VXmheG',
  paypalKey:'Aebb_SJ2-L8OrgRAvAERINfyMb7eKrqZ7xPt5JreBd9eYfDjzfDildStuo5Gjcx6GNvWbTZaiwBiMeAf',
  clientId: '',
  //google
  clientGoogle: '291137676127-svvuuca518djs47q2v78se9q6iggi4nq.apps.googleusercontent.com',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
