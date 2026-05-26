import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mrfstudios.learnpath',
  appName: 'Learnpath',
  webDir: 'public',
  server: {
    url: 'https://learnpathnow.com/app',
    cleartext: false,
    allowNavigation: ['learnpathnow.com', '*.learnpathnow.com']
  }
};

export default config;
