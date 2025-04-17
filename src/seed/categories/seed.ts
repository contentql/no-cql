import { getPayload } from "payload"
import config from "@payload-config"
import { categories } from "./data"
import { Ora } from "ora"

const seed = async (spinner: Ora) => {
    try {
        spinner.start("Seeding categories...");
        const payload = await getPayload({ config });

        for (const category of categories) {
            const parentCategory = await payload.create({
                collection: "categories",
                data: {
                    name: category.name,
                    color: category.color,
                    slug: category.slug,
                    parent: null,
                },
            });

            for (const subCategory of category.subcategories || []) {
                await payload.create({
                    collection: "categories",
                    data: {
                        name: subCategory.name,
                        slug: subCategory.slug,
                        parent: parentCategory.id,
                    },
                });
            }
        }

        spinner.succeed("Seeding categories completed successfully!");
    } catch (error) {
        spinner.fail("Seeding failed at categories.");
        console.error("Error during seeding:", error);
    } finally {
        process.exit(0);
    }
};

export default seed;
