RequirementsCRUD
================

Ejemplo tomado del tutorial:

http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/

Recomiendo que en el directorio el proyecto hagan esto antes de comenzar:
- sudo npm cache clean -f 
- sudo npm update npm -g 
- sudo npm install -g n 
- sudo n stable 
- sudo npm install -g

Una vez listo eso ya pueden probar el proyecto haciendo:
- npm start

Si las cosas han funcionado hasta ese momento ahora es necesario que creen su propia base de datos dentro del directorio data como se especifica en el tutorial. Se tiene un archivo .gitignore especificamente en la carpeta data para que nuestras bases de datos no se compartan en el repositorio pero idealmente los cambios realizados podran aplicar a las bases de datos de cada uno si las hacemos con el mismo formato. Inserten algunos documentos en la base de datos como se especifica en el tutorial. El nombre de la base de datos debe ser requirements. Recomiendo que utilicen postman para probar las cosas que devuelve la aplicacion guiandose por el documento en Drive que se llama Request Frontend.
