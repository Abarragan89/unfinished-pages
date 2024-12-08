import { prisma } from "../utils/prisma";

async function seedData() {

    const categories = [
        { name: 'philosophy', displayName: 'Philosophy' },
        { name: 'religion', displayName: 'Religion' },
        { name: 'education', displayName: 'Education' },
        { name: 'technology', displayName: 'Technology' },
        { name: 'government', displayName: 'Government' },
        { name: 'health', displayName: 'Health' },
        { name: 'mental-health', displayName: 'Mental Health' },
        { name: 'current-events', displayName: 'Current Events' },
        { name: 'pop-culture', displayName: 'Pop Culture' },
        { name: 'short-stories', displayName: 'Short Stories' },
        { name: 'family', displayName: 'Family' },
        { name: 'life-style', displayName: 'Life Style' },
        { name: 'travel', displayName: 'Travel' },
        { name: 'food', displayName: 'Food' },
        { name: 'finance', displayName: 'Finance' },
        { name: 'arts', displayName: 'Art' },
        { name: 'science', displayName: 'Science' },
        { name: 'business', displayName: 'Business' },
        { name: 'diy-crafts', displayName: 'DIY & Crafts' },
        { name: 'sports', displayName: 'Sports' },
        { name: 'environment', displayName: 'Environment' },
        { name: 'history', displayName: 'History' },
        { name: 'fashion', displayName: 'Fashion' },
        { name: 'music', displayName: 'Music' },
        { name: 'automotive', displayName: 'Automotive' },
        { name: 'gaming', displayName: 'Gaming' },
        { name: 'pets', displayName: 'Pets' },
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
