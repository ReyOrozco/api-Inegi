# Script para Consulta de Precios de Combustible y Actualización de Base de Datos

Este proyecto consiste en un script que realiza consultas a la API de INEGI para obtener los precios de combustible actualizados y almacenarlos en una base de datos MySQL. Está diseñado para ejecutarse automáticamente todos los días a las 8:00 AM utilizando el Programador de Tareas de Windows.

---

## **Descripción del Script**

### **Objetivo**
- Consultar los precios de combustibles a través de la API proporcionada por INEGI.
- Guardar los datos en una tabla de MySQL llamada `combustibles`, con las siguientes columnas:
  - `tipo`: Tipo de combustible (e.g., Magna, Premium, Diésel).
  - `fecha_actualizacion`: Fecha en formato `YYYY-MM-DD`.
  - `costo`: Precio del combustible.

---

## **Requisitos**

### **Software necesario**
- [Node.js](https://nodejs.org/) (v14 o superior).
- [MySQL Server](https://www.mysql.com/).
- Cliente para administrar MySQL (MySQL Workbench, PhpMyAdmin, etc.).

### **Configuración**
1. Clona este proyecto o copia el archivo `consulta.js` en tu máquina local.
2. Asegúrate de instalar los paquetes necesarios ejecutando:
   ```bash
   npm install mysql axios




### **Configura tu base de datos MySQL** 
Crea una base de datos si no la tienes.
Asegúrate de tener una tabla combustibles con los siguientes campos:
sql
Copiar código
CREATE TABLE combustibles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(50),
  fecha_actualizacion DATE,
  costo DECIMAL(10, 2)
);
Ejecución del Script
Manual
Abre una terminal.
Dirígete al directorio donde está ubicado el archivo consulta.js:
bash
Copiar código
cd C:\xampp\htdocs\API Combustible
Ejecuta el script:
bash
Copiar código
node consulta.js
Automática (Programador de Tareas de Windows)
Configura una tarea en el Programador de Tareas para ejecutar el siguiente comando:
bash
Copiar código
C:\Windows\System32\cmd.exe /c "cd C:\xampp\htdocs\API Combustible && node consulta.js"
Establece la frecuencia de ejecución (todos los días a las 8:00 AM).
Archivo de Registro (log.txt)
El script genera un archivo log.txt en el mismo directorio para registrar las ejecuciones y errores:

Inicio y fin del script.
Errores en la consulta a la API.
Errores al insertar datos en la base de datos.
Para verificar, revisa el contenido de log.txt después de ejecutar el script.

Avances del Proyecto
Funciones implementadas
Conexión a la API de INEGI: Consulta los precios de combustible.
Inserción de datos en MySQL: Almacena los resultados de la API en la tabla combustibles.
Automatización: Configuración para ejecución automática con el Programador de Tareas.
Registro de errores y eventos: Se agrega un archivo log.txt para monitorear las ejecuciones.


### **InformacioN De la API INEGI**  

Retorna 4 tipos de combustibles más comunes y su costo promedio que se consultan el primer día hábil de cada semana en la página web de la Comisión Reguladora de Energía del Gobierno Federal: https://www.gob.mx/cre
Debido a la liberación de los precios de la gasolina al inicio de 2017, donde el precio está condicionado a la ubicación de las estaciones de servicio en las 90 regiones en las que ha sido dividido el País, además de los ajustes que se estén dando a lo largo del año, el dato que provee esta API solo es una referencia en función del precio promedio nacional excluyendo las 7 regiones sobre la frontera. También lo que refiere al gas LP el precio es un promedio ponderado que publica la Comisión Reguladora de Energía. A partir del 30 de noviembre de 2017 se liberaron los precios de las gasolinas lo que dificulta estimar un promedio, por tanto, se estarán mostrando los precios a esta fecha hasta que se tenga una fuente confiable de consulta. Se sugiere para la interface la opción de que el usuario registre el costo que el considere conveniente para su estimación.
https://gaia.inegi.org.mx/sakbe_v3.1/combustible
Parámetros
Los parámetros son enviados mediante el método POST.
•	type: Tipo de formato a regresar (json o xml).
•	key: Cadena única por usuario de 36 caracteres.
Resultado
•	tipo_costo: Tipo y costo promedio del combustible.
•	costo: Costo promedio del combustible.
•	tipo: Nombre del combustible.
https://gaia.inegi.org.mx/sakbe_v3.1/combustible
{
type:"json",
key:“<token>”
}
JSON y XML recibido

{data: [{tipo: "Magna", tipo_costo: "Magna $15.97/1", costo: 15.97),..),...}
▼ data
: [{tipo: "Magna", tipo_costo: "Magna $15.97/1", costo: 15.97),...]
▼0: {tipo: "Magna", tipo_costo: "Magna $15.97/1", costo: 15.97)
costo: 15.97
tipo: "Magna"
tipo_costo: "Magna $15.97/1"
►1: {tipo: "Premium", tipo_costo: "Premium $17.77/1", costo: 17.77}
► 2: (tipo: "Diésel", tipo_costo: "Diésel $17.03/1", costo: 17.03}
►3: {
tipo: "Gas", tipo_costo: "Gas $7.81/1", costo: 7.81}
meta: (fuente: "INEGI, SAKBÉ Sistema de Ruteo de México v3.0, Red Nacional de Caminos Edición 2024"}
response: (success: true, message: "OK"}
<sakbe>
<fuente>INEGI, SAKBÉ Sistema de Ruteo de México v3.0, Red Nacional de Caminos Edición 2024</fuente>
▼<combustible>
<tipo_costo>Magna $15.99/1</tipo_costo>
<costo>15.99</costo>
<tipo>Magna</tipo>
</combustible>
▼<combustible>
<tipo_costo>Premium $17.79/1</tipo_costo>
<costo 17.79</costo>
<tipo>Premium</tipo>
</combustible>
▼<combustible>
<tipo_costo>Diésel $17.05/1</tipo_costo>
<costo>17.05</costo>
<tipo>Diésel</tipo>
</combustible>
▼<combustible>
<tipo_costo Gas $7.81/1</tipo_costo>
<costo>7.81</costo>
<tipo>Gas</tipo>
</combustible>
</sakbe>


## **API INEGI Registro y solicitud del token**
Se otorga el token de manera automatizada y de forma inmediata vía correo electrónico una vez que han sido registrados los datos del usuario y un correo válido. Estos datos son importantes para proveerles información de actualizaciones de este sistema o para fines de notificación de alguna ventana de tiempo para mantenimiento de servidores.
https://gaia.inegi.org.mx/sakbe_v3.1/genera_token.jsp
 
Una vez registrados los datos oprimir el botón “Generar Token” y le será enviado el token, key o llave por correo electrónico, que deberá utilizar en cada una de las peticiones hacia la API.
Se permite un solo registro de correo electrónico. Si intenta registrarse nuevamente recibirá a su correo el token generado anteriormente.

