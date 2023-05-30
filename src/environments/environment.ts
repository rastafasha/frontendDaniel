// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apirest local
  // apiUrl: "http://127.0.0.1:8000/api",
  // apiUrlMedia: "http://127.0.0.1:8000/storage/app/",
  //apirest local
  apiUrl: "http://localhost:8888/proyectos/backend-api-daniel/public/api",
  apiUrlMedia: "http://localhost:8888/proyectos/backend-api-daniel/storage/app/",
  //remoto
  // apiUrl: "https://ursigalletti.net/backend-api-daniel/public/api",
  // apiUrlMedia: "https://ursigalletti.net/backend-api-daniel/storage/app/",
  clientSandboxId: 'AXlazeNsZ0CmjfJIronSzcqzw4hLHkcoVEM5fO5BY7AbD-_GhKoKezRcavq6-T4kQuRqaTXFB_VXmheG',
  clientId: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
