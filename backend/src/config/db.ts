import mongoose from 'mongoose';

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '');
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

export default conectarDB;