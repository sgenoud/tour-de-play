# Tour de Play

Modifiez [`club.json`](club.json) pour mettre à jour les dates, l’heure, le lieu ou les coordonnées. Ajoutez les soirées confirmées à `dates` au format `AAAA-MM-JJ`, entre guillemets et séparées par des virgules. Le calendrier affiche les dates à partir du début du mois précédent, triées par année et par mois. Modifiez `usualSchedule` pour mettre à jour le rythme habituel des soirées.

La page sélectionne la première date à partir d’aujourd’hui, selon l’heure suisse. Le lendemain d’une soirée, la page affiche la prochaine date saisie. Une fois la dernière date passée, la page affiche « Date à venir ».

« S’abonner au calendrier » utilise l’adresse publique `/calendar/tour-de-play.ics`. Ce flux réunit toutes les soirées saisies, y compris les dates passées. Gardez la même adresse HTTPS, accessible sans connexion, lors de chaque déploiement. Les personnes abonnées reçoivent les changements à la prochaine actualisation de leur agenda. Le téléchargement `.ics` reste disponible pour un import ponctuel.

```sh
npm ci
npm run dev
```

Utilisez Node.js 22.12 ou plus récent. Après avoir modifié `club.json`, lancez `npm run build` pour régénérer la page et les fichiers `.ics` dans `dist/`, puis redéployez ce dossier.
