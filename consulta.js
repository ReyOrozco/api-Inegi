const mysql = require('mysql');
const axios = require('axios');

// Configuración de la conexión a la base de datos MySQL
// IMPORTANTE: Reemplaza 'Datos propios' con tus credenciales de conexión
const db = mysql.createConnection({
  host: 'Datos propios',      // Ejemplo: 'localhost' o el nombre de tu servidor
  user: 'Datos propios',      // Usuario de la base de datos
  password: 'Datos propios',  // Contraseña del usuario
  database: 'Datos propios', // Nombre de la base de datos
  port: 3306                  // Puerto, por defecto es 3306
});

// Manejo de errores en la conexión
db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    process.exit(1); // Finaliza el script si no puede conectarse
  }
  console.log('Conexión a MySQL exitosa.');
});

// Token proporcionado por INEGI
// IMPORTANTE: Reemplaza 'tu token' con el token asignado por INEGI
const token = 'tu token';
// Parámetros de la solicitud
const params = {
  type: 'json', // Formato de respuesta: 'json' o 'xml'
  key: token    // Token de acceso
};

// Obtener la fecha actual en formato YYYY-MM-DD
const fechaActualizacion = new Date().toISOString().slice(0, 10);

console.log("Inicio del script: " + new Date());

// Solicitud a la API
axios.post('https://gaia.inegi.org.mx/sakbe_v3.1/combustible', null, { params })
  .then(response => {
    if (response.data && response.data.data) {
      const combustibles = response.data.data;

      // Iterar sobre los datos y almacenarlos en la base de datos
      combustibles.forEach(combustible => {
        const { tipo, costo } = combustible;

        const query = `
          INSERT INTO combustibles (tipo, fecha_actualizacion, costo)
          VALUES (?, ?, ?)
          ON DUPLICATE KEY UPDATE 
            costo = VALUES(costo),
            fecha_actualizacion = VALUES(fecha_actualizacion)
        `;

        db.query(query, [tipo, fechaActualizacion, costo], (err, result) => {
          if (err) {
            console.error('Error al insertar datos en la base de datos:', err.stack);
            return;
          }
          console.log(`Datos de ${tipo} insertados/actualizados correctamente.`);
        });
      });
    } else {
      console.warn('No se encontraron datos en la respuesta de la API.');
    }
  })
  .catch(error => {
    console.error('Error al obtener datos de la API:', error.message);
  })
  .finally(() => {
    // Cerrar la conexión después de finalizar todas las operaciones
    db.end(err => {
      if (err) {
        console.error('Error al cerrar la conexión a la base de datos:', err.stack);
      }
      console.log('Conexión a la base de datos cerrada.');
      console.log("Fin del script: " + new Date());
    });
  });
