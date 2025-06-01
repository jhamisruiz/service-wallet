import { CustomHttpException } from "@common/exceptions";
import { HttpStatus } from "./HttpStatus";

/**
 * @param bit param type bit
 * @return boolean
 */
export function convertBitToBool(bit: any): boolean {
    if (Buffer.isBuffer(bit)) {
        return bit[0] === 1;
    }
    return !!bit;  // Si no es buffer, simplemente conviértelo a booleano
}

/**
 * @param params Array de columnas a usar en el LIKE (por ejemplo: ["name1", "name2"])
 * @param search Cadena a buscar
 * @return string
 */
export function likeSqlToString(params: string[], search: string): string {
    let res = '';

    params.forEach((value, index) => {
        const or = (index < params.length - 1) ? ' OR ' : '';
        res += `${value} LIKE '%${search}%'${or}`;
    });

    return res;
}

export function compareTO<T>(object: T, data: T): void {
    const isEqual = Object.keys(data).every(
        key => object[key] === data[key],
    );
    if (isEqual) throw new CustomHttpException('No se detectan cambios en los datos para actualizar', HttpStatus.ACCEPTED);
};

export function deleteValue(deleteResult: any): void {
    if (deleteResult.affected && deleteResult.affected > 0) 
        throw new CustomHttpException('Dato eliminado exitosamente.', HttpStatus.OK);
};

export function substring(text: string | null, start: number, end: number): any {
    if (text) {
        return text.slice(start, end);
    }
    return text;
}

export function recurseValidate(errors: Array<any>) {
    const errorMessages = [];

    const errorChildMessages = [];

    let parent;
    function recurse(errors, prop?: string) {
        errors.map((err) => {
            if (err.constraints) {
                for (const [_, message] of Object.entries(err.constraints)) {
                    errorChildMessages.push({ property: err.property, message, rowPos: prop, parent: parent });
                }
            }
            if (err.children && err.children.length > 0) {
                recurse(err.children, err.property);
            }
        });
    }
    //recurse(errors);

    errors.map((err) => {
        if (err.constraints) {
            for (const [_, message] of Object.entries(err.constraints)) {
                errorMessages.push({ property: err.property, message });
            }
        }
    });

    if (errorMessages.length > 0) return errorMessages;

    errors.map((err) => {
        parent = err.property;
        if (err.children && err.children.length > 0) {
            recurse(err.children, err.property);
        }
    });
    return errorChildMessages;
}