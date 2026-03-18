import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ImmigrationPage from '../pages/ImmigrationPage';
import EducationPage from '../pages/EducationPage';
import SuccessStoriesPage from '../pages/SuccessStoriesPage';
import ResourcesPage from '../pages/ResourcesPage';
import ContactPage from '../pages/ContactPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="immigration" element={<ImmigrationPage />}>
        <Route path=":slug" element={<ImmigrationPage />} />
      </Route>
      <Route path="education" element={<EducationPage />}>
        <Route path=":slug" element={<EducationPage />} />
      </Route>
      <Route path="success-stories" element={<SuccessStoriesPage />} />
      <Route path="resources" element={<ResourcesPage />} />
      <Route path="resources/blog/:slug" element={<ResourcesPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="assessment" element={<ContactPage />} />
    </Route>
  )
);

export default router;