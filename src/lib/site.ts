export const siteConfig = {
  name: "GearSignal",
  description:
    "Plain-English buying guides for smart home, creator, and everyday Amazon gear.",
  tagline: "Sharper shortlists for Amazon gear buyers who want fewer bad choices.",
  nav: [
    { href: "/reviews", label: "Reviews" },
    { href: "/best", label: "Shortlists" },
    { href: "/about", label: "About" },
    { href: "/disclosure", label: "Disclosure" },
  ],
};

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configured) {
    return "http://localhost:3000";
  }

  return configured.endsWith("/") ? configured.slice(0, -1) : configured;
}

export function absoluteUrl(pathname = "/") {
  const relativePath = pathname.startsWith("/") ? pathname.slice(1) : pathname;

  return new URL(relativePath, `${getSiteUrl()}/`).toString();
}
