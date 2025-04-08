// bulkUpdateMaterials.js

const imageFiles = [
    "Quillfin_Icon.webp",
    "Quillfin_Essence_Icon.webp",
    "Ribbon_Eel_Icon.webp",
    "Ribbon_Eel_Essence_Icon.webp",
    "Ruffin_Icon.webp",
    "Ruffin_Essence_Icon.webp",
    "Toque_Fish_Icon.webp",
    "Toque_Fish_Essence_Icon.webp",
    "Tuletail_Icon.webp",
    "Tuletail_Essence_Icon.webp",
    "Whisker_Fish_Icon.webp",
    "Whisker_Fish_Essence_Icon.webp",
    "Avoidance_Button_Icon.webp",
    "Bedrock_Crystal_Command_Icon.webp",
    "Bedrock_Crystal_Energy_Icon.webp",
    "Bedrock_Crystal_Hurl_Icon.webp",
    "Bedrock_Crystal_Plummet_Icon.webp",
    "Bedrock_Crystal_Tumble_Icon.webp",
    "Bitey_Fabric_Icon.webp",
    "Brokenheart_Patch_Icon.webp",
    "Furious_Ribbon_Icon.webp",
    "Grudging_Cloth_Icon.webp",
    "Hard_Scrap_Icon.webp",
    "Hollow_Knot_Icon.webp",
    "Radical_Leather_Icon.webp",
    "Reckless_Iron_Buckle_Icon.webp",
    "Stern_Belt_Icon.webp",
    "Struggled_Patch_Icon.webp",
    "Tangled_Ribbon_Icon.webp",
    "Tough_Leather_Icon.webp",
    "Tricky_Patch_Icon.webp",
    "Wings_Fabric_Icon.webp",
    "Threads_Icon.webp",
    "Blings_Icon.webp",
    "Glimmering_Scale_Icon.webp",
    "Golden_Dew_Icon.webp",
    "Golden_Fruit_Icon.webp",
    "Silver_Petals_Icon.webp",
    "Vine_of_Dream_Icon.webp",
    "Astral_Feather_Icon.webp",
    "Astral_Feather_Essence_Icon.webp",
    "Bullquet_Felt_Icon.webp"
];

const updates = imageFiles.map(filename => {
    const name = filename.replace(/_Icon\.webp$/, '').replace(/_/g, ' ');
    const image_url = `/assets/materialimg/${filename}`;
    return {
        updateOne: {
            filter: { name: name },
            update: { $set: { image_url } },
            upsert: false
        }
    };
});

db.materials.bulkWrite(updates);
console.log("Bulk update completed");
