# Documentation concernant l'évaluation BDD avancé
## script SQL bdd
```SQL
CREATE DATABASE company;

CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    office_number INT NOT NULL
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(190) UNIQUE NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    service_id INT,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
);

CREATE TABLE manage (
    service_id INT,
    employee_id INT,
    start_date DATE NOT NULL,
    PRIMARY KEY (service_id, employee_id),
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

```

## Demarche

Lors de l'évalutation j'ai préférer tout d'abord, créer la base de donnée en mysql à l'aide de wamp et phpmyadmin.
Ensuite j'ai créé les tables services, employees et manage en utilisant la commande SQL.
Je me suis servi d'une ia pour avoir quelque donnée exhaustive, que j'ai du modifier certaine à la main pour le bien des tests.
J'ai préférer tout d'abord de tester mes codes SQL sur phpmyadmin pour voir les resultats que les scripts retournaient.
Une fois la requête fonctionnait je faisais en sorte qu'elle soit compréhensible et que le resultat soit parlant.
Puis je reportais mon code sur question.md afin que ça soit plus facile à suivre.

## Problèmes rencontrés

- Je crois que j'ai du cassé ma bdd 2 fois avec des requêtes bizarre et je n'arrivais plus à acceder aux valeurs souhaitées.
- Je pense qu'il y a de la mise en cache parfois à force de faire des appels similaires.
- Relancé mon appli nodeJs à chaque modification.
- Les requests depuis les URLs.
- Les tests unitaires.

## solutions mises en place

- J'avais 2 bases de données une avec des valeurs par défault et je la cloonais dès que la BDD "test" ne répondait pas.
- Le controle F5 suffisait à réglé le soucis de synchronisation.
- J'ai installé nodemon, c'est très pratique pour ce genre de projet.
- J'ai privélégié les request query quand j'avais beaucoup de valeur, plus long à mettre en place mais plus compréhensible.
- La mise en place de l'acces à la base de donnée pour les tests