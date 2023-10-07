import { PrismaClient, Product } from '@prisma/client';
import * as dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config();

const prisma = new PrismaClient();

async function createProducts(quantity: number) {
  const products: Product[] = [];

  const userId = await prisma.user.findFirstOrThrow({
    select: {
      id: true,
    },
  });

  for (let i = 0; i < quantity; i++) {
    const productName = faker.commerce.productName();
    const categoryName = faker.commerce.department();

    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: faker.helpers.slugify(productName).toLowerCase(),
        description: faker.lorem.paragraph(),
        price: +faker.commerce.price({ min: 1, max: 1000, dec: 2 }),
        quantity: Math.floor(Math.random() * 1000),
        images: Array.from({ length: Math.floor(Math.random() * 5) }).map(() =>
          faker.image.url({ width: 200, height: 200 }),
        ),
        category: {
          create: {
            name: categoryName,
          },
        },
        reviews: {
          create: [
            {
              rating: 5,
              text: faker.lorem.paragraph(),
              user: {
                connect: {
                  id: +userId,
                },
              },
            },
          ],
        },
      },
    });

    products.push(product);
  }

  console.log(`Created ${products.length} products.`);
}

async function main() {
  console.log('Seeding started...');

  await createProducts(1000);
}

main()
  .catch(error => console.log(error))
  .finally(async () => {
      await prisma.$disconnect();
    },
  );