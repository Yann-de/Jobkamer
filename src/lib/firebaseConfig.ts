// À terme, ces valeurs viendront de variables d'environnement
// Pour l'instant on utilise directement les configs
export const ENV = {
  dev: {
    apiKey: 'AIzaSyDPh6V0H6jNSGLAHBLAewvNSTnE9x9OHuk',
    authDomain: 'jobkamer-dev.firebaseapp.com',
    projectId: 'jobkamer-dev',
    storageBucket: 'jobkamer-dev.firebasestorage.app',
    messagingSenderId: '331786771892',
    appId: '1:331786771892:web:a6b7b4fa04a7bbd055a6e1',
  },
  staging: {
    // À remplir après création app dans jobkamer-staging
    apiKey: '',
    authDomain: 'jobkamer-staging.firebaseapp.com',
    projectId: 'jobkamer-staging',
    storageBucket: 'jobkamer-staging.firebasestorage.app',
    messagingSenderId: '',
    appId: '',
  },
  prod: {
    // À remplir après création app dans jobkamer-prod
    apiKey: '',
    authDomain: 'jobkamer-prod.firebaseapp.com',
    projectId: 'jobkamer-prod',
    storageBucket: 'jobkamer-prod.firebasestorage.app',
    messagingSenderId: '',
    appId: '',
  },
};

export const CURRENT_ENV = 'dev';
export const currentConfig = ENV[CURRENT_ENV];
