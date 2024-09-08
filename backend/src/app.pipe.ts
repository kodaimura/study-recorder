import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    BadRequestException
} from '@nestjs/common';


//引数を整数型に変換する
//変換できない場合は NaN とする
const toIntOrNaN = (value: any): number => {
    return (['number', 'string'].includes(typeof value)) ?
        parseInt(String(value)) : NaN;
}


//数値または文字列を 整数 1 ~ 12 に変換可能か検証する
//変換可能の場合は変換した値を返す
//undefind はそのまま undefined を返す 
@Injectable()
export class MonthPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (value === undefined) {
            return undefined;
        }
        const month = toIntOrNaN(value);
        if (!month || month < 1 || 12 < month) {
            throw new BadRequestException('Validation failed');
        }

        return month;
    }
}


//数値または文字列を 4桁の整数 YYYY に変換可能か検証する
//変換可能の場合は変換した値を返す
//undefind はそのまま undefined を返す 
@Injectable()
export class YearPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (value === undefined) {
            return undefined;
        }
        const year = toIntOrNaN(value);
        if (!year || year < 2000 || 3000 < year) {
            throw new BadRequestException('Validation failed');
        }

        return year;
    }
}


//数値または文字列を 整数 1 ~ 31 に変換可能か検証する
//変換可能の場合は変換した値を返す
//undefind はそのまま undefined を返す 
@Injectable()
export class DayPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (value === undefined) {
            return undefined;
        }
        const day = toIntOrNaN(value);
        if (!day || day < 1 || 31 < day) {
            throw new BadRequestException('Validation failed');
        }

        return day;
    }
}