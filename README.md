# ARRANCAR BBDD
La aplicación cuenta con un script de inicialización que carga de dos archivos json de anuncios y usuarios.
El script se llama install_db.js y lo que haces es borrar los registros de las dos tablas, carga los anuncios, y los usuarios.

Para ejecutar ese script se añadií en el package.json:
>>> "installDB": "node ./install/install_db.js"
Y para arrancar debes usar 
>>> run installDB.


