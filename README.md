## Qu'est ce que c'est?  
  
mini app très incomplète et basique, faites rapidement pour montrer une base de conception d'un rendu coté server via KOA.  
  
package.json
```
{
  "name": "ssr_koa",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "Aurelien_PREVOST",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "ejs": "^3.1.10",
    "jsonwebtoken": "^9.0.2",
    "koa": "^2.15.3",
    "koa-bodyparser": "^4.4.1",
    "koa-ejs": "^4.3.0",
    "koa-router": "^12.0.1",
    "koa-static": "^5.0.0",
    "koa-views": "^8.1.0"
  }
}
```
  
/!\ koa-views déprécié 
  
/!\ aucune securité, db dans un mock en clair.
  
Voir mock/users.json pour les connexions
  
git clone:
```
git clone https://github.com/AurelienPREVOST/SSR_koa.git
```
  
installer les dependances
```
npm i
```
  
lancer le server
```
node server 
```
  
rendez vous sur localhost:3000

ajout et suppression possible via les URL, voir router
