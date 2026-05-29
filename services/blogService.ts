import clientAxios from '@/lib/api/clientAxios';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogRequest {
  title: string;
  content: string;
  excerpt: string;
}

export interface UpdateBlogRequest {
  title?: string;
  content?: string;
  excerpt?: string;
}

export const blogService = {
  getAllBlogs: async (params?: { page?: number; limit?: number }): Promise<{ blogs: Blog[]; total: number }> => {
    const response = await clientAxios.get('/blogs', { params });
    return response.data;
  },

  getBlogById: async (id: string): Promise<Blog> => {
    const response = await clientAxios.get(`/blogs/${id}`);
    return response.data;
  },

  getBlogBySlug: async (slug: string): Promise<Blog> => {
    const response = await clientAxios.get(`/blogs/slug/${slug}`);
    return response.data;
  },

  createBlog: async (data: CreateBlogRequest): Promise<Blog> => {
    const response = await clientAxios.post('/blogs', data);
    return response.data;
  },

  updateBlog: async (id: string, data: UpdateBlogRequest): Promise<Blog> => {
    const response = await clientAxios.put(`/blogs/${id}`, data);
    return response.data;
  },

  deleteBlog: async (id: string): Promise<void> => {
    await clientAxios.delete(`/blogs/${id}`);
  },
};
