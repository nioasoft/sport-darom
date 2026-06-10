/**
 * External websites of the three partner organizations.
 * Used by the Hero partner chips and the About page partner cards.
 */
export const partnerLinks = {
  spivak: 'https://iscd.com/',
  ilan: 'https://ilan-israel.co.il/',
  paralympic: 'https://isad.org.il/',
} as const;

export type PartnerKey = keyof typeof partnerLinks;
