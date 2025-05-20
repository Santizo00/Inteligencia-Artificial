import axios from 'axios';

export interface PreguntarPlantaParams {
  pregunta: string;
  contexto: any;
  historial?: Array<{ usuario: string; respuesta: string }>;
}

export interface PreguntarPlantaResponse {
  respuesta: string;
}

export async function preguntarPlanta({ pregunta, contexto, historial = [] }: PreguntarPlantaParams): Promise<string | null> {
  try {
    const res = await fetch('http://192.168.1.41:5000/preguntar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pregunta, contexto, historial }),
    });
    if (!res.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
    const data = await res.json();
    if (data && data.respuesta) {
      return data.respuesta;
    }
    return null;
  } catch (error) {
    console.error('Error en preguntarPlanta:', error);
    return null;
  }
}
