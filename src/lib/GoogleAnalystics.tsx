import Script from "next/script";

const GoogleAnalytics = () => (
  <>
    <Script
      defer
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      strategy="afterInteractive"
    />
    <Script id="ga" defer strategy="afterInteractive">
      {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
    </Script>
  </>
);

export const trackingEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
) => {
  // @ts-ignore
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export default GoogleAnalytics;
