export type ReviewProductAsset = {
  productName: string;
  productHref: string;
  image: string;
  imageAlt: string;
};

const reviewProductAssets = {
  "smart-dehumidifier": {
    productName: "Midea Cube 50 Pint Dehumidifier",
    productHref: "https://www.amazon.com/dp/B0GL78KXLF",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Modern living room setup for smart home humidity control",
  },
  "creator-desk-lighting": {
    productName: "NEEWER Basics 12W Clip-On LED Desk Lamp",
    productHref: "https://www.amazon.com/dp/B0G4BZM13B",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Creator desk setup with laptop and lighting gear",
  },
  "action-camera-travel-kit": {
    productName: "GoPro HERO13 Black",
    productHref:
      "https://www.amazon.com/GoPro-HERO13-Black-Compatability-HB/dp/B0DCM34GXX",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Travel camera kit packed for an outdoor trip",
  },
} satisfies Record<string, ReviewProductAsset>;

export function getReviewProductAsset(slug: string) {
  return reviewProductAssets[slug as keyof typeof reviewProductAssets] ?? null;
}
