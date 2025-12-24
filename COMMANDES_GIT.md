# Commandes Git pour pousser les modifications

## Commandes à exécuter dans l'ordre :

```bash
git add .
git commit -m "Amélioration page estimation: pièces standard, navigation non bloquante, préremplissage automatique"
git push
```

## Explication :

1. **`git add .`** - Ajoute tous les fichiers modifiés à l'index
2. **`git commit -m "message"`** - Crée un commit avec un message descriptif
3. **`git push`** - Pousse les commits vers le dépôt distant (GitHub)

## Alternative : Utiliser le script push-git.bat

Double-cliquez sur `push-git.bat` dans l'explorateur Windows pour exécuter toutes les commandes automatiquement.

## Si vous avez des erreurs :

- Si le dépôt n'existe pas encore sur GitHub, créez-le d'abord sur github.com
- Si vous n'avez pas configuré le remote, utilisez :
  ```bash
  git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git
  ```

