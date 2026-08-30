import { useEffect } from 'react';
import { useContent } from '../../context/ContentContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalPath?: string;
  structuredData?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage,
  canonicalPath = '',
  structuredData,
}) => {
  const { siteData } = useContent();
  const { siteConfig } = siteData;

  const fullTitle = title
    ? `${title} | ${siteConfig.brandName}`
    : `${siteConfig.brandName} | ${siteConfig.tagline}`;

  const metaDesc = description || siteConfig.shortDescription;
  const siteUrl = 'https://drivecraft-academy.vercel.app';
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  useEffect(() => {
    // Set title
    document.title = fullTitle;

    // Set meta description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', metaDesc);

    // Set keywords
    if (keywords) {
      let keyMeta = document.querySelector('meta[name="keywords"]');
      if (!keyMeta) {
        keyMeta = document.createElement('meta');
        keyMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keyMeta);
      }
      keyMeta.setAttribute('content', keywords);
    }

    // Set Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Set OpenGraph title and desc
    const setOg = (property: string, content: string) => {
      let og = document.querySelector(`meta[property="${property}"]`);
      if (!og) {
        og = document.createElement('meta');
        og.setAttribute('property', property);
        document.head.appendChild(og);
      }
      og.setAttribute('content', content);
    };

    setOg('og:title', fullTitle);
    setOg('og:description', metaDesc);
    setOg('og:url', canonicalUrl);
    if (ogImage) {
      setOg('og:image', ogImage);
    }

    // Structured JSON-LD Data
    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: siteConfig.brandName,
      description: siteConfig.shortDescription,
      url: siteUrl,
      telephone: siteConfig.phoneDisplay,
      email: siteConfig.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.branches[0]?.address,
        addressLocality: siteConfig.branches[0]?.city,
        postalCode: siteConfig.branches[0]?.pincode,
        addressCountry: 'IN',
      },
    };

    const schemaToUse = structuredData || defaultSchema;

    let scriptTag = document.getElementById('seo-structured-data') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'seo-structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaToUse);
  }, [fullTitle, metaDesc, canonicalUrl, keywords, ogImage, structuredData, siteConfig]);

  return null;
};
