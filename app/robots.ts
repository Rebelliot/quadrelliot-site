import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
return {
rules: {
userAgent: "*",
allow: "/",
},
sitemap: "https://quadrelliot.co.uk/sitemap.xml",
host: "https://quadrelliot.co.uk",
};
}
