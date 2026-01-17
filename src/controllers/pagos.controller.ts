import { Request, Response, NextFunction } from 'express';
import * as pagosService from '../services/pagos.service';
import { sendSuccess } from '../utils/response';
import { registrarAccion } from '../utils/logger';

export const createPago = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const pago = await pagosService.registrarPago(req.body);
    
    await registrarAccion(user.id, 'PAGOS', 'CREATE', req);

    return sendSuccess(res, { 
      status: 201, 
      message: 'Pago aplicado correctamente', 
      data: pago 
    });
  } catch (error) {
    next(error);
  }
};

export const getHistorial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { facturaId } = req.params;
    const historial = await pagosService.obtenerHistorialPorFactura(Number(facturaId));
    return sendSuccess(res, { data: historial });
  } catch (error) {
    next(error);
  }
};

export const getCierreCaja = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reporte = await pagosService.obtenerCierreCajaDiario();
    return sendSuccess(res, { data: reporte });
  } catch (error) {
    next(error);
  }
};