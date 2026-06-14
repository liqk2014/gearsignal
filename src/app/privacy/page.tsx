import type { Metadata } from "next";

import { Container } from "@/components/container";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "GearSignal privacy policy covering analytics, affiliate links, cookies, and contact information.",
  alternates: {
    canonical: absoluteUrl("/privacy"),
  },
  openGraph: {
    type: "article",
    url: absoluteUrl("/privacy"),
    title: "Privacy Policy",
    description:
      "GearSignal privacy policy covering analytics, affiliate links, cookies, and contact information.",
  },
};

export default function PrivacyPage() {
  return (
    <Container className="py-16 md:py-20">
      <article className="surface max-w-4xl rounded-lg p-8 md:p-12">
        <p className="text-xs uppercase text-muted">Privacy policy</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground md:text-5xl">
          Privacy Policy
        </h1>
        <div className="prose mt-8">
          <p>
            GearSignal is an editorial product research website. This policy
            explains the limited information that may be collected when readers
            browse the site, click outbound links, or contact the editorial
            team.
          </p>
          <h2>Information we collect</h2>
          <p>
            We may receive basic analytics information such as page views,
            referrers, device type, browser type, approximate location, and
            performance metrics. If you email us, we receive the information
            you choose to include in that message.
          </p>
          <h2>Affiliate and outbound links</h2>
          <p>
            Some outbound links may route to Amazon, PartnerBoost merchants, or
            other affiliate partners. Those third-party sites may use cookies,
            tracking parameters, or similar technologies under their own
            policies.
          </p>
          <h2>How we use information</h2>
          <p>
            Analytics help us understand which guides are useful, diagnose site
            performance, and decide which product categories need clearer
            comparisons. Contact information is used only to respond to the
            inquiry.
          </p>
          <h2>Data sharing</h2>
          <p>
            We do not sell personal information. Analytics and affiliate
            partners may process limited technical information needed to provide
            measurement, attribution, and site functionality.
          </p>
          <h2>Contact</h2>
          <p>
            Privacy questions should be sent through the publisher contact
            email submitted with the affiliate network application.
          </p>
        </div>
      </article>
    </Container>
  );
}
