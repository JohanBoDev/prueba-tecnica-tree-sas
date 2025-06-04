import mongoose, { Schema, Document } from 'mongoose';
import { ITarea } from '../interfaces/ITarea';

export interface ITareaModel extends ITarea, Document {}

const TareaSchema: Schema = new Schema(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaLimite: { type: Date, required: true },
    prioridad: { type: String, enum: ['Alta', 'Media', 'Baja'], required: true },
    categoria: { type: String, enum: ['Trabajo', 'Personal', 'Estudio'], required: true },
    estado: { type: String, enum: ['Pendiente', 'Completada'], default: 'Pendiente' },
    activa: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITareaModel>('Tarea', TareaSchema);
