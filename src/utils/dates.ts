import { format, parseISO, isValid, differenceInYears, startOfDay, endOfDay } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formatea una fecha para visualización (Ej: 20 de Diciembre, 2025)
 */
export const formatDateToDisplay = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, "d ' de ' MMMM, yyyy", { locale: es });
};

/**
 * Formatea una fecha para base de datos (YYYY-MM-DD)
 */
export const formatDateToDB = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Calcula la edad de un paciente a partir de su fecha de nacimiento
 */
export const calculateAge = (birthDate: Date | string): number => {
  const date = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
  return differenceInYears(new Date(), date);
};

/**
 * Valida si una cadena de texto es una fecha válida
 */
export const isValidDate = (date: any): boolean => {
  if (typeof date === 'string') {
    return isValid(parseISO(date));
  }
  return isValid(date);
};

/**
 * Obtiene el rango de inicio y fin de un día (útil para filtrar citas del día)
 */
export const getDayRange = (date: Date = new Date()) => {
  return {
    start: startOfDay(date),
    end: endOfDay(date),
  };
};