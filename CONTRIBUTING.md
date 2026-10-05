# Guide de contribution — JobKamer

## Branches

| Branche | Usage |
|---------|-------|
| `main` | Production stable |
| `develop` | Développement actif |
| `feature/*` | Nouvelles fonctionnalités |
| `fix/*` | Corrections de bugs |

## Convention de commits

Format : `type(scope): description`

| Type | Usage |
|------|-------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation |
| `style` | Formatage, pas de changement logique |
| `refactor` | Refactoring sans nouvelle fonctionnalité |
| `chore` | Maintenance, dépendances |

Exemples :
- `feat(auth): add Google sign-in`
- `fix(jobs): correct salary display format`
- `docs: update README installation steps`

## Process

1. Toujours partir de `develop` à jour
2. Une branche par fonctionnalité
3. `npx tsc --noEmit` doit passer avant tout commit
4. `npx expo-doctor` doit afficher `21/21`
5. PR vers `develop` uniquement — jamais directement vers `main`
