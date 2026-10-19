import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import StoreButtons from "@/components/StoreButtons";
import { landingPageBySlug, seoLandingPages } from "@/data/seoLandingPages";

const SITE_URL = "https://mycampushut.com";

const SeoLandingPage = () => {
  const { slug = "" } = useParams();
  const page = landingPageBySlug(slug);

  if (!page) return null;

  const relatedPages = page.related
    .map((relatedSlug) => seoLandingPages.find((item) => item.slug === relatedSlug))
    .filter((item): item is (typeof seoLandingPages)[number] => Boolean(item));
  const canonicalUrl = `${SITE_URL}/${page.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.metaTitle,
    description: page.metaDescription,
    url: canonicalUrl,
    inLanguage: "en",
    about: { "@type": "Thing", name: page.focusKeyword },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: page.title, item: canonicalUrl },
      ],
    },
  };

  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta name="keywords" content={[page.focusKeyword, ...page.related].join(", ")} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${SITE_URL}${page.image.src}`} />
        <meta property="og:image:alt" content={page.image.alt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.metaTitle} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={`${SITE_URL}${page.image.src}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-white pt-24 text-gray-900">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-campusGreen-700">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
              <li aria-current="page" className="text-gray-700">{page.title}</li>
            </ol>
          </nav>

          <header className="grid items-center gap-10 border-b border-gray-200 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-20">
            <div>
              <p className="mb-4 text-sm font-semibold text-campusGreen-700">CampusHut · Student learning and planning</p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">{page.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">{page.intro}</p>
              <div className="mt-8">
                <StoreButtons size="lg" />
              </div>
            </div>
            <figure className="mx-auto w-full max-w-md">
              <img
                src={page.image.src}
                alt={page.image.alt}
                className="mx-auto max-h-[620px] w-full object-contain"
                fetchPriority="high"
              />
            </figure>
          </header>

          <section className="grid gap-8 border-b border-gray-200 py-14 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:py-16">
            <h2 className="text-2xl font-bold leading-snug sm:text-3xl">{page.problemHeading}</h2>
            <p className="text-lg leading-8 text-gray-600">{page.problem}</p>
          </section>

          <section className="grid gap-8 border-b border-gray-200 py-14 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:py-16">
            <h2 className="text-2xl font-bold leading-snug sm:text-3xl">{page.solutionHeading}</h2>
            <p className="text-lg leading-8 text-gray-600">{page.solution}</p>
          </section>

          <section className="border-b border-gray-200 py-14 md:py-16">
            <div className="mb-8 max-w-2xl">
              <h2 className="text-2xl font-bold sm:text-3xl">Tools for your next study session</h2>
              <p className="mt-3 leading-7 text-gray-600">Choose the CampusHut tools that fit the work in front of you.</p>
            </div>
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
              {page.features.map((feature) => (
                <article key={feature.title} className="border-t-2 border-campusGreen-600 pt-4">
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="mt-2 leading-7 text-gray-600">{feature.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-8 border-b border-gray-200 py-14 md:grid-cols-2 md:gap-16 md:py-16">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">A more manageable way to study</h2>
              <ul className="mt-6 space-y-4">
                {page.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 leading-7 text-gray-700">
                    <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-campusGreen-700" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Getting started with CampusHut</h2>
              <ol className="mt-6 space-y-5">
                {page.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-campusGreen-100 text-sm font-bold text-campusGreen-800">{index + 1}</span>
                    <div>
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="mt-1 leading-7 text-gray-600">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="border-b border-gray-200 py-14 md:py-16">
            <h2 className="text-2xl font-bold sm:text-3xl">Questions students ask</h2>
            <div className="mt-6 divide-y divide-gray-200">
              {page.faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="cursor-pointer list-none pr-8 text-lg font-semibold marker:hidden">
                    {item.question}
                    <span className="float-right text-campusGreen-700 group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="mt-3 max-w-4xl leading-7 text-gray-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="grid gap-6 border-b border-gray-200 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-16">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Make your next study step count</h2>
              <p className="mt-3 max-w-2xl leading-7 text-gray-600">Explore CampusHut's learning and planning tools, and choose the support that fits your academic routine.</p>
            </div>
            <StoreButtons />
          </section>

          <nav aria-label="Related student resources" className="pt-10">
            <h2 className="text-lg font-bold">Explore related student resources</h2>
            <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
              {relatedPages.map((related) => (
                <li key={related.slug}>
                  <Link className="inline-flex items-center gap-1 text-campusGreen-800 underline decoration-campusGreen-300 underline-offset-4 hover:decoration-campusGreen-700" to={`/${related.slug}`}>
                    {related.title}<ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </li>
              ))}
              <li><Link className="text-campusGreen-800 underline decoration-campusGreen-300 underline-offset-4 hover:decoration-campusGreen-700" to="/blog">Read the CampusHut student blog</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SeoLandingPage;