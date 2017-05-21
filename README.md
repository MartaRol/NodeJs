# Iniciar APP

> npm install

> nodemon

# Arrancar Base de Datos

La aplicación cuenta con un script de inicialización que carga de dos archivos json de anuncios y usuarios.
El script se llama install_db.js y lo que haces es borrar los registros de las dos tablas, carga los anuncios, y los usuarios.

Para ejecutar ese script se añadió en el package.json:

> "installDB": "node ./install/install_db.js"

Y para arrancar debes usar 

> run installDB.

## Funcionalidades

- Consulta anuncios a usuarios registrados.
- Consulta de usuarios
- Consulta de tags exitentes
- Búsqueda de anuncios pagina con filtros por tag, tipo de anuncio (venta o búsqueda), rango de precio, nombre del artículo (que empiece por el dato buscado).
- Si el usuario especifica la propiedad includeTotal en la petición para listar los anuncios, se le devolverá el total de registros que cumplen con el filtro indicado.
- Búsqueda de usuarios con varios criterios.
- Registro de usuarios, para ello es obligatorio introducir nombre, email y contraseña
- La autenticación se ha hecho con JWT (JSON Web Token).
- Los lenguajes soportados son inglés (en) y español (es). 
- El idioma será especificado por el usuario cada petición ya sea por la cabecera, en la query, o en el body. Sólo se devuelve traducido los mensajes de error.

## Acceso
- El acceso se realiza sobre la url http://localhost:3000
- Los datos son recibidos en formato JSON.

## HTTP
- `GET`: para consulta de recursos
- `POST`: para creación de recursos
- `DELETE`: para el borrado de un registro

### Creación de usuarios

Crear un usuario en el sistema.

#### URL 
http://localhost:3000/users

#### Método 
POST

#### Parámetros
- **name** : obligatorio
- **email**: obligatorio
- **key**: obligatorio

### Registro de usuarios

Registrar un usuario en el sistema para poder utilizar los servicios.

#### URL 
http://localhost:3000/login

#### Método 
POST

#### Parámetros
- **name** : obligatorio
- **email**: obligatorio
- **key**: obligatorio

### Búsqueda de usuarios

Buscar los usuario del sistema.

#### URL 
http://localhost:3000/users

#### Método 
GET

#### Parámetros
- **name** 
- **email**
- **key**

- **limit** : Paginación
- **skip** : Omitir ciertos registros
- **fields** : Campos que desea obtener
- **sort** : Ordenación

### Obtener un usuario concreto

Mostrar un usuario especifico.

#### URL 
http://localhost:3000/users/*id*

#### Método 
GET

#### Ejemplo 
http://localhost:3000/users/5920b9865910dd0dd04281b8

### Borrar un usuario

Borrar anuncios de nuestro sistema

#### URL 
http://localhost:3000/users/*id*

#### Método 
DELETE

#### Ejemplo 
http://localhost:3000/users/5920b9865910dd0dd04281b8

### Listar tags existentes

Listar los tags existentes en el sistema.

#### URL 
http://localhost:3000/tags

#### Método 
GET

### Búsqueda de anuncios

Buscar los anuncios que hay en el sistema.

#### URL 
http://localhost:3000/advertisements

#### Método 
GET

#### Parámetros
- **name** : Que empiece por el dato buscado
- **sale**: Especificar si el anuncio es de venta o de búsqueda
- **price**: Rango de precio (Precio mín. y precio máx.) separado por guión (10-50)
- **tags**: Especificar los tags separados por comas
- **includeTotal**: Total de registros que cumplen con la búsqueda (true si desea obtenerlo)

- **limit** : Paginación
- **skip** : Omitir ciertos registros
- **fields** : Campos que desea obtener
- **sort** : Ordenación

### Obtener un anuncio concreto

Mostrar un anuncio especifico.

#### URL 
http://localhost:3000/advertisements/*id*

#### Método 
GET

#### Ejemplo 
http://localhost:3000/advertisements/5920b9865910dd0dd04281ba

### Subir un anuncio

Subir un anuncio a nuestro sistema

#### URL 
http://localhost:3000/advertisements

#### Método 
POST

#### Parámetros
- **name** :
- **sale**:
- **price**:
- **tags**:

### Eliminar un anuncio

Borrar anuncios de nuestro sistema

#### URL 
http://localhost:3000/advertisements/*id*

#### Método 
DELETE

#### Ejemplo 
http://localhost:3000/advertisements/5920b9865910dd0dd04281ba



