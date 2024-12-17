import { prisma } from "../utils/prisma";

async function seedData() {

    const categories = [
        { name: 'politics-philosophy', displayName: 'Politics | Philosophy' },
        { name: 'education-career', displayName: 'Education | Career' },
        { name: 'business-technology', displayName: 'Business | Technology' },
        { name: 'health-fitness', displayName: 'Health | Fitness' },
        { name: 'short-stories', displayName: 'Short Stories' },
        { name: 'family-relationships', displayName: 'Family | Relationships' },
        { name: 'travel-food', displayName: 'Travel | Food' },
        { name: 'DIY', displayName: 'DIY' },
        { name: 'entertainment-sports', displayName: 'Entertainment | Sports' },
        { name: 'other', displayName: 'Other' },
    ];

    for (const category of categories) {
        await prisma.blogCategory.upsert({
            where: { name: category.name }, // Step 1
            update: {},               // Step 2
            create: { name: category.name, displayName: category.displayName }, // Step 3
        });
    }
}

seedData();
