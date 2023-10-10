import { Prisma } from '@prisma/client';
import { returnReviewObject } from '../review/return-review.object';
import { returnCategoryObject } from '../category/return-category.object';

export const returnProductObject: Prisma.ProductSelect = {
  id: true,
  images: true,
  description: true,
  name: true,
  price: true,
  quantity: true,
  slug: true,
  createdAt: true,
};

export const returnProductFullObject: Prisma.ProductSelect = {
  ...returnProductObject,
  reviews: {
    select: returnReviewObject,
  },
  category: {
    select: returnCategoryObject,
  },
};