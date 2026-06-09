// lib/upgrade.ts
// Single source of truth for the Pro checkout link.
//
// This is the PRODUCTION RevenueCat Web Purchase link (project code
// "sffmwnoklfherqwk") — the one every in-app Upgrade button already uses. The old
// value here pointed at the SANDBOX link ("/sandbox/skelxidydieztrqy/") and was
// imported nowhere, so it was dead. If you ever rotate the link, change it here only.
//
// NOTE: confirm "sffmwnoklfherqwk" is your production offering in the RevenueCat
// dashboard (Web Billing -> the offering attached to this purchase link). If you later
// embed the Web SDK (Purchases.js) for an in-app paywall, this stays the fallback URL.
export const UPGRADE_URL = 'https://pay.rev.cat/sffmwnoklfherqwk/'

/** Build the checkout URL, appending the RevenueCat App User ID when available. */
export const getUpgradeUrl = (userId?: string) => UPGRADE_URL + (userId || '')