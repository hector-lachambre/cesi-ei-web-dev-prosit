# CESI Ecole d'Ingénieurs - Module Programmation Web

## Résolution DNS locale

Pour que votre poste n'essaie pas d'accéder au nom de domaine publique `exiadrink.com` ou `exiadiscount.com` vous devez déclarer ces domaines dans le fichier host de votre machine en les faisant pointant sur votre ip local `127.0.0.1`

```conf
# A inserer à la fin du fichier :
#     Windows: C:\Windows\System32\drivers\etc\hosts
#     MacOS/Linux: /etc/hosts

127.0.0.1 exiadrink.com 
127.0.0.1 exiadiscount.com 
```

## Configuration Apache sous Docker

Le fichier de configuration utilisé par le conteneur est `apache_conf/apache.docker.conf`

Lancement du conteneur xammp :

```bash 
docker compose up
```

## Configuration Apache sous XAMPP (Windows)

Dans le fichier `apache_conf/apache.xampp.conf` remplacer le chemin `D:/Workspace/CESI/CESI-EI-PROSIT1-2022` par le chemin absolu de votre dossier de travail

Puis copier le contenu du fichier à la fin du fichier de configuration apache de xampp normalement situé dans `C:\xampp\apache\conf\httpd.conf`

Lancer XAMPP et démarrer le service Apache

## Authentification sur exiadiscount.com

L'utilisateur déclaré a pour identifiant `admin` pour mot de passe `admin`

Pour ajouter un utilisateur avec XAMPP
```
C:/xampp/apache/bin/htpasswd.exe ./exiadiscount/users <user>
```

Pour les adeptes de Docker :

* Bind le fichier `./exiadiscount/users` dans le conteneur
* Accéder au conteneur et installer `htpasswd`
    ```bash
    apt update && apt install apache2-utils
    ```
* Vous pouvez exécuter `htpasswd` en pointant sur le fichier `users` à l'intérieur du conteneur



