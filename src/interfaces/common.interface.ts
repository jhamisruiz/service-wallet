/**
 * Interfaz para respuestas estandarizadas de la API.
 * @template T El tipo de los datos contenidos en la respuesta.
 */
export interface StandardResponse<T> {
  success: boolean;
  error: boolean;
  code: string; // Código de estado personalizado, como '200', '400', '1001'
  message: string | any;
  data: T | null; // Los datos de la respuesta, o null en caso de fallo
}