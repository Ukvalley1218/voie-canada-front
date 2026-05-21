import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ImmigrationPage from '../pages/ImmigrationPage';
import ImmigrationServiceDetailPage from '../pages/ImmigrationServiceDetailPage';
import EducationPage from '../pages/EducationPage';
import EducationServiceDetailPage from '../pages/EducationServiceDetailPage';
import SuccessStoriesPage from '../pages/SuccessStoriesPage';
import ResourcesPage from '../pages/ResourcesPage';
import BlogDetailPage from '../pages/BlogDetailPage';
import ContactPage from '../pages/ContactPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="immigration" element={<ImmigrationPage />} />
      <Route path="immigration/:slug" element={<ImmigrationServiceDetailPage />} />
      <Route path="education" element={<EducationPage />} />
      <Route path="education/:slug" element={<EducationServiceDetailPage />} />
      <Route path="success-stories" element={<SuccessStoriesPage />} />
      <Route path="resources" element={<ResourcesPage />} />
      <Route path="resources/blog/:slug" element={<BlogDetailPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="assessment" element={<ContactPage />} />
      <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="terms-of-service" element={<TermsOfServicePage />} />
    </Route>
  )
);

export default router;