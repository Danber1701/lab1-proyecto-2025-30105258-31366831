import { Request, Response, NextFunction } from 'express';
import * as facturaService from '../services/facturas.service';
import { sendSuccess } from '../utils/response';
import { registrarAccion } from '../utils/logger';

/**
 * Genera una nueva factura validando aranceles y autorizaciones
 */
export const createFactura = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    
    // Llamada al servicio con lógica de negocio compleja
    const factura = await facturaService.generarFactura(req.body);

    // Registro de auditoría
    if (user) {
      await registrarAccion(user.id, 'FACTURACION', 'CREATE_FACTURA', req);
    }

    return sendSuccess(res, { 
      status: 201, 
      message: 'Factura generada exitosamente',
      data: factura 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene el detalle de una factura por ID
 * Resuelve el error: Property 'getFacturaById' does not exist
 */
export const getFacturaById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const factura = await facturaService.obtenerFacturaPorId(Number(id));

    return sendSuccess(res, { 
      message: 'Factura recuperada exitosamente',
      data: factura 
    });
  } catch (error) {
    next(error);
  }
};