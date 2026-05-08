import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {isCuid} from "@paralleldrive/cuid2";

@Injectable()
export class ParseCuidPipe implements PipeTransform<string, string>{
    transform(value: string, metadata: ArgumentMetadata): string {
        if (!isCuid(value, {minLength: 24})) {
            throw new BadRequestException("id must be a valid cuid");
        }

        return value;
    }
}