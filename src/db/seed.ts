import { db } from "./index";
import { products, productVariants, options, optionValues, variantOptionValues } from "./schema";
import { faker } from "@faker-js/faker";

async function seed() {
    console.log("🌱 Starting seeding...");

    await db.delete(variantOptionValues);
    await db.delete(productVariants);
    await db.delete(optionValues);
    await db.delete(options);
    await db.delete(products);

    // 1. Create Options
    const optionDefinitions = ["Color", "Size"];
    const insertedOptions = await db.insert(options).values(
        optionDefinitions.map(name => ({ name }))
    ).returning();

    const colorOption = insertedOptions.find(o => o.name === "Color")!;
    const sizeOption = insertedOptions.find(o => o.name === "Size")!;

    // 2. Create Option Values
    const colors = ["Red", "Blue", "Green", "Black", "White"];
    const sizes = ["S", "M", "L", "XL"];

    const insertedColors = await db.insert(optionValues).values(
        colors.map(value => ({ optionId: colorOption.id, value }))
    ).returning();

    const insertedSizes = await db.insert(optionValues).values(
        sizes.map(value => ({ optionId: sizeOption.id, value }))
    ).returning();

    // 3. Create Products
    for (let i = 0; i < 50; i++) {
        const productName = faker.commerce.productName();
        const insertedProduct = await db.insert(products).values({
            name: productName,
            description: faker.commerce.productDescription(),
            basePrice: faker.commerce.price({ min: 10, max: 200 }),
        }).returning();

        const product = insertedProduct[0];

        // 4. Create Variants for each product (Random 1-3 variants per product for simplicity)
        const numVariants = faker.number.int({ min: 1, max: 3 });

        for (let j = 0; j < numVariants; j++) {
            const color = faker.helpers.arrayElement(insertedColors);
            const size = faker.helpers.arrayElement(insertedSizes);

            const variant = await db.insert(productVariants).values({
                productId: product.id,
                sku: `${faker.string.alphanumeric(6).toUpperCase()}-${color.value[0]}-${size.value}`,
                stock: faker.number.int({ min: 0, max: 100 }),
                priceOverride: Math.random() > 0.8 ? faker.commerce.price({ min: 10, max: 200 }) : null,
            }).returning();

            // Link Variant to Option Values
            await db.insert(variantOptionValues).values([
                { variantId: variant[0].id, optionValueId: color.id },
                { variantId: variant[0].id, optionValueId: size.id },
            ]);
        }
    }

    console.log("✅ Seeding completed!");
}

seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
