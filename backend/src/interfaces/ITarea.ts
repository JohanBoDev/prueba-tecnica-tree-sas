export interface ITarea {
  titulo: string;
  descripcion: string;
  fechaLimite: Date;
  prioridad: 'Alta' | 'Media' | 'Baja';
  categoria: 'Trabajo' | 'Personal' | 'Estudio';
  estado: 'Pendiente' | 'Completada';
  activa: boolean;
}


