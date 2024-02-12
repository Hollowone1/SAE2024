# Atelier - GeoQuizz

## Liens 
http://docketu.iutnc.univ-lorraine.fr:45057 : Lien vers le fron-end
http://docketu.iutnc.univ-lorraine.fr:45051 : Lien vers l'api node
http://docketu.iutnc.univ-lorraine.fr:45053 : Lien vers l'api d'authentification
http://docketu.iutnc.univ-lorraine.fr:45056 : Lien vers le directus


## Constitution du groupe:  
- Bresson Jules
- Rionde Antoine
- Serrier Mathéo
- Stoecklin Antoine
- Tamourgh Elias

## Fonctionnalités de base :  
| Fonctionnalité                                                                                                | Auteur   | Statut |
|---------------------------------------------------------------------------------------------------------------|----------|--|
| 1. Une seule série : Nancy (par exemple)                                                                      |          | OK |
| 2. Une distance D pour le calcul des points identique pour toutes les parties                                 |   Élias       | OK |
| 3. 10 photos par partie, la liste de photos et l'ordre de ces photos sont choisis aléatoirement dans la série |          | OK |
| 4. Backoffice : ajout / géolocalisation de photos à la série existante                                        |          | OK |
| 5. Notification d’événements à tous les clients connectés: démarrage d’une partie, fin et score d’une partie  |          | NON FONCTIONNEL |
| 6. Inscription et authentification                                                                            |          | OK |

## Fonctionnalités étendues :
| Fonctionnalité                                                                                                                                                                                               | Auteur | Statut |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|--------|
| 1. Plusieurs séries possibles : le choix de la série est fait à la création de la partie; l'ajout de photo permet d'indiquer la série associée                                                               |        | OK     |
| 2. Différents niveaux de jeu, qui se différencient par le nombre de photos à localiser dans la partie et par la distance D utilisée pour calculer les points                                                 |        | NON    |
| 3. profil de l’utilisateur : historique des parties créées et jouées, scores, high-scores par séries                                                                                                         |        | NON    |
| 4. Possibilité de rejouer une partie pour améliorer son score                                                                                                                                                |        | OK     |
| 5. Parties publiques : une partie peut être rendu publique par son créateur, elle peut être alors être jouée (à tout moment, pas de manière simultanée) par différents utilisateurs pour comparer les scores |        | NON    |