import { createContext, useContext, useState, useEffect } from 'react';
import { settingsService } from '../services';
import { defaultSettings, defaultProcessSteps, defaultFaqs } from '../data/defaults';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await settingsService.getPublic();
        const data = response?.data || response;

        if (data && Object.keys(data).length > 0) {
          // Merge with defaults to ensure all fields are present
          setSettings({ ...defaultSettings, ...data });
          setUsingFallback(false);
        } else {
          setSettings(defaultSettings);
          setUsingFallback(true);
        }
      } catch (error) {
        console.warn('Failed to fetch settings, using defaults:', error.message);
        setSettings(defaultSettings);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const value = {
    settings,
    loading,
    usingFallback,
    hero: settings.hero,
    trustStats: settings.trustStats?.length > 0 ? settings.trustStats : defaultSettings.trustStats,
    differentiator: settings.differentiator,
    contact: settings.contact,
    socialLinks: settings.socialLinks,
    certifications: settings.certifications?.length > 0 ? settings.certifications : defaultSettings.certifications,
    ctaSection: settings.ctaSection,
    footer: settings.footer,
    processSteps: settings.processSteps?.length > 0 ? settings.processSteps : defaultProcessSteps,
    faqs: settings.faqs?.length > 0 ? settings.faqs : defaultFaqs,
    // New homepage sections
    homepageSections: settings.homepageSections?.length > 0 ? settings.homepageSections : defaultSettings.homepageSections,
    statsSection: settings.statsSection || defaultSettings.statsSection,
    testimonialsSection: settings.testimonialsSection || defaultSettings.testimonialsSection,
    ctaBanner: settings.ctaBanner || defaultSettings.ctaBanner,
    // About page settings
    aboutPage: settings.aboutPage || defaultSettings.aboutPage
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsContext;