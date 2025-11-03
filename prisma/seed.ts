import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tag1 = await prisma.tag.create({data:{ name: "Hello"}});
  const tag2 = await prisma.tag.create({data:{ name: "Hi"}});
  const tag3 = await prisma.tag.create({data:{ name: "tralalelo"}});
  const tag4 = await prisma.tag.create({data:{ name: "tralala"}});

  const post = await prisma.post.create({
    data: {
      title: "перший пост",
      description: "гіикререичврм",
      image: "https://123.com",
      likes: 10,
      tags: {
        create: [
          {tag:{connect:{id: tag1.id}}},
          {tag:{connect:{id: tag2.id}}},
          {tag:{connect:{id: tag3.id}}},
          {tag:{connect:{id: tag4.id}}}
        ]
      }
    },
    include: {tags:{include:{tag: true}}}
  });

  const post2 = await prisma.post.create({
    data: {
      title: "другий пост",
      description: "еруикгікеигім",
      image: "https://123.com",
      likes: 3,
      tags: {
        create: [
          {tag:{connect:{id: tag1.id}}}
        ]
      }
    },
    include:{tags:{include:{tag: true}}}
  });

  console.log("икгкесмкег", post, post2);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());