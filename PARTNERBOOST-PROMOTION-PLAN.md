# PartnerBoost Promotion Plan

## What PartnerBoost appears to support

Public PartnerBoost materials show three useful publisher-facing paths:

- Publisher partnerships across retail, travel, financial services, DTC, and subscription verticals.
- Amazon seller and Amazon Attribution campaigns where publishers can work with Amazon sellers and use performance-based commission links.
- API/datafeed workflows for Amazon products, including product search by criteria, ASIN tracking links, partnered brands, storefront links, Amazon Associates ASIN lists, ACC campaign ASIN lists, reports, coupons, and payments.

Useful public sources:

- https://www.partnerboost.com/publishers/
- https://www.partnerboost.com/amazon/
- https://www.partnerboost.com/api-docs/
- https://www.partnerboost.com/partners
- https://www.tradedoubler.com/post/how-to-access-amazon-s-affiliate-ecosystem-through-tradedoubler-partnerboost

## Product directions worth promoting first

1. Smart home and appliances
   - Evidence: API example includes `category: Appliances` and a `Midea_US` partnered brand response shape.
   - First pages: smart dehumidifier setup, air purifier for pet rooms, compact kitchen appliance comparison.

2. Creator and travel gear
   - Evidence: Publisher page displays creator/publisher positioning and consumer-brand logo signals such as GoPro and Xiaomi.
   - First pages: creator desk lighting kit, action camera travel kit, travel charger kit.

3. DTC consumer brands
   - Evidence: Publisher page presents retail and DTC positioning and logo signals such as Glossier, Warby Parker, ColourPop, and MVMT.
   - First pages: beauty routine kits, eyewear buying guide, everyday wearable accessories.

4. Amazon seller and affiliate tools
   - Evidence: Partner Directory lists services such as CaptainBI, Geniuslink, Lasso, Linkby, Roundforest, and agencies around Amazon affiliate growth.
   - First pages: best Amazon link management tools, product research tools for sellers, affiliate link routing stack.

## Site MVP shipped here

This repo now contains a first promotional site in `affiliate-site`:

- Home page focused on PartnerBoost-ready Amazon gear categories.
- Three review/category pages:
  - `/reviews/smart-dehumidifier`
  - `/reviews/creator-desk-lighting`
  - `/reviews/action-camera-travel-kit`
- One shortlist page:
  - `/best/amazon-gear-categories-for-partnerboost`
- Disclosure page updated for Amazon/PartnerBoost affiliate links.

Current outbound URLs are non-tracked Amazon search URLs. Replace them with approved PartnerBoost deep links or ASIN links after publisher access is approved.

## Link replacement order after approval

1. Use PartnerBoost `get_fba_products` or dashboard filters to pull products by category, price, rating, coupon, discount, and bestseller rank.
2. Generate product links with product IDs or ASINs.
3. Replace each MDX `affiliateHref` with the strongest approved product or storefront URL.
4. Add real product names, image URLs, prices, discount status, and availability only after they are verified in the dashboard/feed.
5. Refresh pages monthly because Amazon availability, coupons, and seller campaigns can change quickly.
