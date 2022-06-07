const { DataTypes, UUID } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

/*[ ] Genero con las siguientes propiedades:
  - ID
  - Nombre */
  
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
     id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },  
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },      
  });
};
