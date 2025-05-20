import axios from 'axios';
import { URL_BACKEND } from '../components/Config';

export interface DiagnosticoAgricola {
  tipo_planta: string;
  nivel_maduracion: string;
  enfermedades_visibles: string;
  necesidades_nutricionales: string;
  tiempo_estimado_desde_siembra: string;
  fecha_tentativa_cosecha: string;
}

export async function uploadImage(uri: string): Promise<DiagnosticoAgricola | null> {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);

    const res = await axios.post(`${URL_BACKEND}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    let data = res.data;

    if (typeof data === 'string') {
      try {
        const clean = data.trim().replace(/^[^\{]*/, '').replace(/[^\}]*$/, '');
        data = JSON.parse(clean);
      } catch {
        return null;
      }
    }

    if (data.resultado) {
      data = data.resultado;
    }

    const requiredKeys = [
      'tipo_planta',
      'nivel_maduracion',
      'enfermedades_visibles',
      'necesidades_nutricionales',
      'tiempo_estimado_desde_siembra',
      'fecha_tentativa_cosecha',
    ];

    const hasRequiredKeys = requiredKeys.every((key) => key in data);
    return hasRequiredKeys ? data : null;
  } catch (error) {
    console.error('Error en uploadImage:', error);
    return null;
  }
}
