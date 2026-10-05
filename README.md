# JobKamer

> Le réseau professionnel du Cameroun — Trouvez un emploi, recrutez des talents, développez votre réseau.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20iOS-green)
![Firebase](https://img.shields.io/badge/backend-Firebase-orange)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## À propos

JobKamer est une application mobile (Android & iOS) combinant un réseau social professionnel à la LinkedIn et une plateforme d'offres d'emploi adaptée au marché camerounais. Elle est bilingue (FR/EN) et cible en priorité les villes de Yaoundé, Douala, Bafoussam et Limbé.

Deux types de comptes :
- Candidat — cherche un emploi, postule, gère ses candidatures, développe son réseau
- Recruteur — publie des offres, gère les candidatures, contacte les talents

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Mobile | React Native + Expo SDK 50+ |
| Langage | TypeScript |
| Navigation | Expo Router |
| State | Zustand + TanStack Query |
| UI | NativeWind + Design System custom |
| Auth | Firebase Authentication |
| Base de données | Cloud Firestore |
| i18n | i18next (FR/EN) |
| Monitoring | Sentry (prévu) |

## Prérequis

- Node.js 18+
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Un émulateur Android/iOS ou l'app Expo Go sur votre téléphone

## Installation

```bash
git clone https://github.com/TON_USERNAME/JobKamer.git
cd JobKamer
npm install
```

### Lancer le projet

```bash
# Démarrer le serveur de développement
npx expo start

# Android
npx expo start --android

# iOS
npx expo start --ios
```

## Structure du projet

```text
src/
├── app/                    # Routes Expo Router
│   ├── (auth)/             # Écrans d'authentification
│   └── (tabs)/             # Navigation principale
├── components/             # Composants réutilisables
│   └── ui/                 # Design System (Button, Input, Card...)
├── features/               # Logique métier par domaine
│   ├── auth/               # Types et logique auth
│   ├── feed/               # Types feed et publications
│   ├── jobs/               # Types offres et candidatures
│   ├── messages/           # Types messagerie
│   └── notifications/      # Types notifications
├── lib/                    # Configuration Firebase, i18n, QueryClient
├── services/               # Appels API et Firebase
│   ├── auth/               # authService (Firebase Auth)
│   └── jobs/               # jobsService, applicationsService
├── stores/                 # Stores Zustand
├── theme/                  # Design tokens (couleurs, typo, spacing)
├── types/                  # Types TypeScript globaux
└── utils/                  # Utilitaires
```

## Environnements

Le projet utilise 3 environnements Firebase séparés :

| Env | Projet Firebase | Usage |
|-----|------------------|-------|
| dev | jobkamer-dev | Développement local |
| staging | jobkamer-staging | Tests avant production |
| prod | jobkamer-prod | Production |

Pour changer d'environnement, modifier `CURRENT_ENV` dans `src/lib/firebaseConfig.ts`.

## Fonctionnalités MVP

- Authentification (inscription, connexion, mot de passe oublié)
- Onboarding (profil minimal post-inscription)
- Profil Candidat et Recruteur avec édition inline
- Fil d'actualité mixte (publications + offres)
- Publication (article, mise à jour, offre d'emploi)
- Offres d'emploi avec recherche et filtres
- Candidature avec lettre de motivation
- Messagerie texte
- Notifications
- Paramètres (thème, langue, confidentialité, sécurité)
- Mode hors ligne avec fallback sur données locales
- Bilingue FR/EN
- Dark mode (fond noir #000000)

## Roadmap

### V2

- Upload de CV et photos
- Firebase Functions (backend sécurisé)
- Notifications push (FCM)
- Recherche avancée (Algolia)
- Système de connexions réseau

### V3

- Version web
- Matching IA candidat/offre
- Tableau de bord analytics recruteur

## Contribuer

1. Fork le projet
2. Créer une branche (`git checkout -b feature/ma-fonctionnalite`)
3. Commit (`git commit -m 'feat: ajouter ma fonctionnalité'`)
4. Push (`git push origin feature/ma-fonctionnalite`)
5. Ouvrir une Pull Request vers `develop`

## Auteur

Djoubissie Tchadgoue Yann Arsène

Projet personnel — portfolio développeur mobile

## Licence

MIT
