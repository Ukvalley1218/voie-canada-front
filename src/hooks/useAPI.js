import { useState, useEffect } from 'react';
import api from '../services/api';

export const useSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/settings/public');
        setSettings(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
};

export const useServices = (category = null) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const params = {};
        if (category) params.category = category;

        const response = await api.get('/services', { params });
        setServices(response.data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [category]);

  return { services, loading, error };
};

export const useService = (slug) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchService = async () => {
      try {
        const response = await api.get(`/services/${slug}`);
        setService(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch service');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  return { service, loading, error };
};

export const useTestimonials = (options = {}) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const params = {};
        if (options.category) params.category = options.category;
        if (options.featured) params.featured = options.featured;
        if (options.limit) params.limit = options.limit;

        const response = await api.get('/testimonials', { params });
        setTestimonials(response.data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [options.category, options.featured, options.limit]);

  return { testimonials, loading, error };
};

export const useBlogPosts = (options = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params = {};
        if (options.category) params.category = options.category;
        if (options.limit) params.limit = options.limit;
        if (options.page) params.page = options.page;

        const response = await api.get('/blog', { params });
        setPosts(response.data || []);
        setPagination(response.pagination || {});
      } catch (err) {
        setError(err.message || 'Failed to fetch blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [options.category, options.limit, options.page]);

  return { posts, loading, error, pagination };
};

export const useBlogPost = (slug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const response = await api.get(`/blog/${slug}`);
        setPost(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
};

export const useResources = (options = {}) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const params = {};
        if (options.category) params.category = options.category;
        if (options.type) params.type = options.type;
        if (options.featured) params.featured = options.featured;
        if (options.limit) params.limit = options.limit;

        const response = await api.get('/resources', { params });
        setResources(response.data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch resources');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [options.category, options.type, options.featured, options.limit]);

  return { resources, loading, error };
};

export const useInquiry = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitInquiry = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await api.post('/inquiries', data);
      setSuccess(true);
      return { success: true };
    } catch (err) {
      setError(err.message || 'Failed to submit inquiry');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { submitInquiry, loading, error, success };
};