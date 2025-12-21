# Commandes Git pour pousser les modifications

## Commandes à exécuter dans l'ordre :

```bash
git add .
git commit -m "Ajout export PDF avec Puppeteer"
git push -u origin main
```

## Explication :

1. **`git add .`** - Ajoute tous les fichiers modifiés à l'index
2. **`git commit -m "message"`** - Crée un commit avec un message descriptif
3. **`git push -u origin main`** - Pousse les commits vers le dépôt distant (GitHub)

## Si vous avez des erreurs :

- Si le dépôt n'existe pas encore sur GitHub, créez-le d'abord sur github.com
- Si vous n'avez pas configuré le remote, utilisez :
  ```bash
  git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git
  ```

