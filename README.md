# Tuto sur Node.js de Grafikart

### Prérequis

Vous avez besoin d'avoir Node.js et `npm` d'installé sur votre machine.

### Installation du back end

Cloner le repo. Dans le dossier du projet, lancer le serveur avec `npm run dev`.

## 🗒 Le projet

Avec un **REST client** (ex: [Thunder Client](https://www.thunderclient.com/), [Insomnia](https://insomnia.rest/)), vous pouvez faire des appels API pour ***CRUD*** (Create, Read, Update, Delete) sur des tâches:

- Affiche la liste des tâches => GET : http://localhost:3000/todos
![image](https://user-images.githubusercontent.com/105924315/228882268-f19631a4-e460-48c1-ac33-fc3889a6fe06.png)

- Créer une tâche => POST : http://localhost:3000/todos + un body ` {"title": "New task"} `
![image](https://user-images.githubusercontent.com/105924315/228882531-9686215d-53ee-402c-a74b-c2a092016edb.png)

- Modifier le titre d'une tâche => PUT : http://localhost:3000/todos?id=1680184329885 + un body ` {"title": "New title"} `
![image](https://user-images.githubusercontent.com/105924315/228882741-a9288058-74a8-4c9d-8218-672da92495d6.png)

- Supprimer une tâche => DELETE : http://localhost:3000/todos?id=1680184329885
![image](https://user-images.githubusercontent.com/105924315/228882818-d355be27-5b91-48c3-ac0b-1ee9d7014f37.png)
