import { http, HttpResponse } from 'msw';
import { expect } from 'vitest';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const handlers = [
  // Auth handlers
  http.post(`${API_BASE}/auth/login`, async () => {
    return HttpResponse.json({
      accessToken: 'mock-token-123',
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      },
    });
  }),

  http.post(`${API_BASE}/auth/register`, async () => {
    return HttpResponse.json({
      accessToken: 'mock-token-123',
      user: {
        id: '1',
        email: 'newuser@example.com',
        name: 'New User',
      },
    });
  }),

  http.post(`${API_BASE}/auth/logout`, async () => {
    return HttpResponse.json({ success: true });
  }),

  http.get(`${API_BASE}/auth/me`, async () => {
    return HttpResponse.json({
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
    });
  }),

  http.post(`${API_BASE}/auth/refresh`, async () => {
    return HttpResponse.json({
      accessToken: 'new-mock-token-456',
    });
  }),

  // Blog handlers
  http.get(`${API_BASE}/blogs`, async () => {
    return HttpResponse.json({
      blogs: [
        {
          id: '1',
          title: 'First Blog Post',
          slug: 'first-blog-post',
          content: 'This is the first blog post content.',
          excerpt: 'This is a preview of the first blog post.',
          author: {
            id: '1',
            name: 'Test User',
          },
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
        },
        {
          id: '2',
          title: 'Second Blog Post',
          slug: 'second-blog-post',
          content: 'This is the second blog post content.',
          excerpt: 'This is a preview of the second blog post.',
          author: {
            id: '1',
            name: 'Test User',
          },
          createdAt: '2024-01-14T10:00:00Z',
          updatedAt: '2024-01-14T10:00:00Z',
        },
      ],
      total: 2,
    });
  }),

  http.get(`${API_BASE}/blogs/:id`, async ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      title: 'Blog Post Title',
      slug: 'blog-post-title',
      content: 'This is the full blog post content.',
      excerpt: 'This is a preview of the blog post.',
      author: {
        id: '1',
        name: 'Test User',
      },
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    });
  }),

  http.get(`${API_BASE}/blogs/slug/:slug`, async ({ params }) => {
    return HttpResponse.json({
      id: '1',
      title: 'Blog Post by Slug',
      slug: params.slug,
      content: 'This is the full blog post content.',
      excerpt: 'This is a preview of the blog post.',
      author: {
        id: '1',
        name: 'Test User',
      },
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    });
  }),

  http.post(`${API_BASE}/blogs`, async ({ request }) => {
    const body = (await request.json()) as any;
    return HttpResponse.json({
      id: '3',
      title: body.title,
      slug: body.title.toLowerCase().replace(/\s+/g, '-'),
      content: body.content,
      excerpt: body.excerpt,
      author: {
        id: '1',
        name: 'Test User',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }),

  http.put(`${API_BASE}/blogs/:id`, async ({ request, params }) => {
    const body = (await request.json()) as any;
    return HttpResponse.json({
      id: params.id,
      title: body.title || 'Updated Blog Post',
      slug: 'updated-blog-post',
      content: body.content || 'Updated content',
      excerpt: body.excerpt || 'Updated excerpt',
      author: {
        id: '1',
        name: 'Test User',
      },
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: new Date().toISOString(),
    });
  }),

  http.delete(`${API_BASE}/blogs/:id`, async () => {
    return HttpResponse.json({ success: true });
  }),


  // componenes testing

http.get(
  "https://api.coingecko.com/api/v3/coins/markets",
  ({ request }) => {
    const url = new URL(request.url);

    const currency = url.searchParams.get("vs_currency");

    if (currency !== "usd") {
      return HttpResponse.json(
        { error: "invalid currency" },
        { status: 400 }
      );
    }

    return HttpResponse.json([
      {
      "id":"bitcoin","name":"Bitcoin","price":73592,
    }
    ]);
  }
),

];


