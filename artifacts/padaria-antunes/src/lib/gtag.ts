declare global {
  interface Window {
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

export function trackWhatsAppConversion(url: string): void {
  if (typeof window.gtag_report_conversion === "function") {
    window.gtag_report_conversion();
  }
  window.open(url, "_blank");
}
