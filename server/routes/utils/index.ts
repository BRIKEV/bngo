import { Request } from 'express';

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 15;

export const getFilters = (req: Request) => {
  const { size, page, servings, time, search } = req.query;
  const filters = {
    size: size ? +size : DEFAULT_PAGE_SIZE,
    page: page ? +page : DEFAULT_PAGE,
    search: search ? (search as string).trim() : undefined,
    servings: servings ? +servings : undefined,
    time: time ? +time : undefined,
  };
  return filters;
};
