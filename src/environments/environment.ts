// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apirest local laravel
  // apiUrl: "http://127.0.0.1:8000/api",
  // apiUrlMedia: "http://127.0.0.1:8000/storage/app/",
  //apirest local node
  apiUrl: "http://localhost:5001/api",
  apiUrlMedia: "http://localhost:5001/api/uploads/",
  //apirest local
  // apiUrl: "http://localhost:8888/proyectos/backend-api-daniel/public/api",
  // apiUrlMedia: "http://localhost:8888/proyectos/backend-api-daniel/storage/app/",
  //remoto
  // apiUrl: "https://miweb.net/backend-api-daniel/public/api",
  // apiUrlMedia: "https://miweb.net/backend-api-daniel/storage/app/",
  clientSandboxId: 'AXlazeNsZ0CmjfJIronSzcqzw4hLHkcoVEM5fO5BY7AbD-_GhKoKezRcavq6-T4kQuRqaTXFB_VXmheG',
  clientId: '',
  clientGoogle: '291137676127-svvuuca518djs47q2v78se9q6iggi4nq.apps.googleusercontent.com',
  paypalKey:'Aebb_SJ2-L8OrgRAvAERINfyMb7eKrqZ7xPt5JreBd9eYfDjzfDildStuo5Gjcx6GNvWbTZaiwBiMeAf'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
