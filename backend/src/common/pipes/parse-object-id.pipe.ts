import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

/**
 * ParseObjectIdPipe — validates that a route param is a valid MongoDB ObjectId.
 * Usage: @Param('id', ParseObjectIdPipe) id: string
 */
@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (!value || value.length !== 24) {
      throw new BadRequestException(`"${value}" is not a valid ObjectId`);
    }
    return value;
  }
}
