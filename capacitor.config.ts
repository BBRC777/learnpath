import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.mrfstudios.learnpath',
  appName: 'Learnpath',
  webDir: 'public',
  server: {
    url: 'https://learnpathnow.com/app',
    cleartext: false
  }
};
export default config;
