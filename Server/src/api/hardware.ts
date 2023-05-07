import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from "@app/utils/logger"

import {
    IsLoaded, CppNumber, CppString, CppArray, CppObject, SetBigInt, SetBoolean, SetDate, SetInteger, SetNumber, SetString
} from "@assist"


const hardwareRoute = Router();


// Trick for serializing BigInt
(BigInt.prototype as any).toJSON = function () { return this.toString() }

/**
 * Aivable methods (from CppAssist):
 * - SetBigInt
 * - SetBoolean
 * - SetDate
 * - SetInteger
 * - SetNumber
 * - SetString
 */
hardwareRoute.post('/', (req, res) => {
    try {
        const obj = req.body as any;

        let changesNo = 0;

        if (obj.valueBigInt !== undefined) {
            if (SetBigInt(BigInt(obj.valueBigInt))) {
                changesNo++;
            }
        }
        if (obj.valueBoolean !== undefined) {
            if (SetBoolean(obj.valueBoolean)) {
                changesNo++;
            }
        }
        if (obj.valueDate !== undefined) {
            if (SetDate(new Date(obj.valueDate))) {
                changesNo++;
            }
        }
        if (obj.valueInteger !== undefined) {
            if (SetInteger(parseInt(obj.valueInteger))) {
                changesNo++;
            }
        }
        if (obj.valueNumber !== undefined) {
            if (SetNumber(parseFloat(obj.valueNumber))) {
                changesNo++;
            }
        }
        if (obj.valueString !== undefined) {
            if (SetString(obj.valueString)) {
                changesNo++;
            }
        }

        if (changesNo == 0) {
            res.status(StatusCodes.BAD_REQUEST).send({ status: 'error' });
            return;
        }

        res.status(StatusCodes.OK).send({ status: 'ok', changed: changesNo });
    } catch (error) {
        logger.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            error: 'Internal Server Error',
        });
    }
})

/**
 * Aivable methods (from CppAssist):
 * - IsLoaded
 * - CppNumber
 * - CppString
 * - CppArray
 * - CppObject
 */
hardwareRoute.get('/:cmd', (req, res) => {
    try {
        const cmd = req.params.cmd;
        // Message from addon (c++)
        let msg;

        if (cmd == "IsLoaded") {
            msg = IsLoaded()
        } else if (cmd == "CppNumber") {
            msg = CppNumber(2, 4)
        } else if (cmd == "CppString") {
            msg = CppString("q", "ww")
        } else if (cmd == "CppArray") {
            msg = CppArray()
        } else if (cmd == "CppObject") {
            msg = CppObject()
        } else {
            res.status(StatusCodes.FORBIDDEN).send({ status: 'error' });
            return;
        }

        res.status(StatusCodes.OK).send({ status: 'ok', result: msg });
    } catch (error) {
        logger.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            error: 'Internal Server Error',
        });
    }
})



export default hardwareRoute
