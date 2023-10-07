import { Injectable } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PaginationService {
  pagination(dto: PaginationDto, defaultPerPage = 15) {
    const page = dto.page ? +dto.page : 1;
    const perPage = dto.perPage ? +dto.perPage : defaultPerPage;

    const skip = (page - 1) * perPage;

    return { perPage, skip };
  }
}
