// Shared upgrade URL helper
export const UPGRADE_URL = 'https://pay.rev.cat/sandbox/skelxidydieztrqy/'
export const getUpgradeUrl = (userId?: string) => UPGRADE_URL + (userId || '')
