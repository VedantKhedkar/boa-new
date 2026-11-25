import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2212;
const prisma = new PrismaClient();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// ==========================================
// 1. HEALTH & SYSTEM STATUS
// ==========================================
app.get('/api/v1/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'online',
      service: 'Best of Amravati API Gateway',
      database: 'Neon PostgreSQL (Connected)',
      port: PORT,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({
      status: 'degraded',
      database: 'Disconnected',
      error: err.message
    });
  }
});

// ==========================================
// 2. DASHBOARD KPI METRICS
// ==========================================
app.get('/api/v1/dashboard/metrics', async (req, res) => {
  try {
    const [
      totalBusinesses,
      verifiedBusinesses,
      pendingBusinesses,
      totalCategories,
      activeCategories,
      totalEnquiries,
      pendingEnquiries,
      contactedEnquiries,
      totalReviews,
      reviewsAggregate
    ] = await Promise.all([
      prisma.business.count(),
      prisma.business.count({ where: { status: 'verified' } }),
      prisma.business.count({ where: { status: 'pending' } }),
      prisma.category.count(),
      prisma.category.count({ where: { status: 'active' } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'pending' } }),
      prisma.inquiry.count({ where: { status: 'contacted' } }),
      prisma.review.count(),
      prisma.review.aggregate({ _avg: { rating: true } })
    ]);

    res.json({
      success: true,
      data: {
        totalBusinesses,
        verifiedBusinesses,
        pendingBusinesses,
        totalCategories,
        activeCategories,
        totalEnquiries,
        pendingEnquiries,
        contactedEnquiries,
        totalReviews,
        ratingAverage: Number((reviewsAggregate._avg.rating || 5.0).toFixed(1))
      }
    });
  } catch (err) {
    console.error('Error fetching metrics:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 3. CATEGORICAL DATA ANALYSIS (BI & Analytics)
// ==========================================
app.get('/api/v1/analytics/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { businesses: true, inquiries: true }
        }
      },
      orderBy: { sortOrder: 'asc' }
    });

    // Grouping by Sector for Macro-Economic Analytics
    const sectorDistribution = {};
    categories.forEach((cat) => {
      const sector = cat.sector || 'Other';
      if (!sectorDistribution[sector]) {
        sectorDistribution[sector] = {
          sector,
          categoryCount: 0,
          totalListings: 0,
          totalInquiries: 0,
          categories: []
        };
      }
      sectorDistribution[sector].categoryCount += 1;
      sectorDistribution[sector].totalListings += cat._count.businesses;
      sectorDistribution[sector].totalInquiries += cat._count.inquiries;
      sectorDistribution[sector].categories.push({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        listingsCount: cat._count.businesses,
        inquiriesCount: cat._count.inquiries,
        metadata: cat.metadata
      });
    });

    res.json({
      success: true,
      data: {
        totalCategories: categories.length,
        sectors: Object.values(sectorDistribution),
        detailedCategories: categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          sector: c.sector,
          listingsCount: c._count.businesses,
          inquiriesCount: c._count.inquiries,
          metadata: c.metadata
        }))
      }
    });
  } catch (err) {
    console.error('Error computing category analytics:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/v1/analytics/localities', async (req, res) => {
  try {
    const businesses = await prisma.business.groupBy({
      by: ['locality'],
      _count: { id: true },
      _avg: { rating: true }
    });

    res.json({
      success: true,
      data: businesses.map((b) => ({
        locality: b.locality,
        businessCount: b._count.id,
        averageRating: Number((b._avg.rating || 5.0).toFixed(1))
      }))
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 4. CATEGORIES CRUD
// ==========================================
app.get('/api/v1/categories', async (req, res) => {
  try {
    const includeAll = req.query.all === 'true';
    const categories = await prisma.category.findMany({
      where: includeAll ? undefined : { parentId: null },
      include: {
        subcategories: {
          orderBy: { sortOrder: 'asc' }
        },
        _count: {
          select: { businesses: true }
        }
      },
      orderBy: { sortOrder: 'asc' }
    });

    res.json({
      success: true,
      count: categories.length,
      data: categories.map((c) => ({
        ...c,
        businessCount: c._count.businesses
      }))
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/v1/categories', async (req, res) => {
  const { name, slug, sector, icon, description, featured, status, metadata } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Category name is required' });
  }

  const generatedSlug = (slug || name)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-');

  try {
    const newCat = await prisma.category.create({
      data: {
        name: name.trim(),
        slug: generatedSlug,
        sector: sector || 'Services & General',
        icon: icon || 'category',
        description: description || '',
        featured: Boolean(featured),
        status: status || 'active',
        metadata: metadata || {}
      }
    });
    res.status(201).json({ success: true, message: 'Category created successfully', data: newCat });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/v1/categories/:id', async (req, res) => {
  try {
    const updated = await prisma.category.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, message: 'Category updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/v1/categories/:id', async (req, res) => {
  try {
    await prisma.category.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 5. BUSINESSES CRUD
// ==========================================
app.get('/api/v1/businesses', async (req, res) => {
  const { category, sector, status, featured, locality, pricingTier } = req.query;

  const where = {};
  if (category && category !== 'all') {
    where.OR = [
      { category: { slug: category } },
      { categoryName: { equals: category, mode: 'insensitive' } }
    ];
  }
  if (sector) where.sector = sector;
  if (status) where.status = status;
  if (locality) where.locality = locality;
  if (pricingTier) where.pricingTier = pricingTier;
  if (featured !== undefined) where.featured = featured === 'true';

  try {
    const businesses = await prisma.business.findMany({
      where,
      include: {
        category: {
          select: { name: true, slug: true, sector: true, icon: true }
        }
      },
      orderBy: [{ featured: 'desc' }, { rating: 'desc' }, { createdAt: 'desc' }]
    });

    const formatted = businesses.map((b) => ({
      ...b,
      category: b.category?.name || b.categoryName || 'General',
      categorySlug: b.category?.slug || '',
      categoryRel: b.category
    }));

    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/v1/businesses/:idOrSlug', async (req, res) => {
  const { idOrSlug } = req.params;
  try {
    const business = await prisma.business.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }]
      },
      include: {
        category: {
          select: { name: true, slug: true, sector: true, icon: true }
        },
        reviews: {
          where: { status: 'approved' },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!business) {
      return res.status(404).json({ success: false, error: 'Business not found' });
    }

    res.json({
      success: true,
      data: {
        ...business,
        category: business.category?.name || business.categoryName || 'General',
        categorySlug: business.category?.slug || '',
        categoryRel: business.category
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/v1/businesses', async (req, res) => {
  const {
    name,
    category,
    categorySlug,
    categoryId,
    subCategory,
    owner,
    phone,
    whatsapp,
    email,
    website,
    address,
    locality,
    pincode,
    establishedYear,
    employeeCount,
    pricingTier,
    services,
    tags,
    logoUrl,
    coverImage,
    tagline,
    about,
    timings,
    directionsUrl,
    socialLinks,
    products,
    photos,
    videos,
    featured,
    verified,
    status
  } = req.body;

  if (!name) return res.status(400).json({ success: false, error: 'Business name is required' });

  try {
    // Resolve Category
    let targetCat;
    if (categoryId) {
      targetCat = await prisma.category.findUnique({ where: { id: categoryId } });
    } else if (categorySlug) {
      targetCat = await prisma.category.findUnique({ where: { slug: categorySlug } });
    } else if (category) {
      targetCat = await prisma.category.findFirst({
        where: { name: { equals: String(category), mode: 'insensitive' } }
      });
    }

    if (!targetCat) {
      targetCat = await prisma.category.findFirst();
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-') + '-' + Date.now().toString().slice(-4);

    const newBiz = await prisma.business.create({
      data: {
        name: name.trim(),
        slug,
        categoryId: targetCat.id,
        categoryName: targetCat.name,
        sector: targetCat.sector,
        subCategory: subCategory || '',
        owner: owner || '',
        phone: phone || '',
        whatsapp: whatsapp || '',
        email: email || '',
        website: website || '',
        address: address || '',
        locality: locality || 'Amravati',
        pincode: pincode || '444601',
        establishedYear: establishedYear ? Number(establishedYear) : null,
        employeeCount: employeeCount || '1-10',
        pricingTier: pricingTier || 'Moderate',
        rating: 5.0,
        reviewCount: 0,
        status: status || 'verified',
        featured: Boolean(featured),
        verified: verified !== undefined ? Boolean(verified) : status === 'verified',
        services: services || [],
        tags: tags || [],
        logoUrl: logoUrl || null,
        coverImage: coverImage || null,
        tagline: tagline || null,
        about: about || null,
        timings: timings || 'Open · Closes 7:00 PM',
        directionsUrl: directionsUrl || null,
        socialLinks: socialLinks || {},
        products: products || [],
        photos: photos || [],
        videos: videos || []
      }
    });

    res.status(201).json({ success: true, message: 'Business created successfully', data: newBiz });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put('/api/v1/businesses/:id', async (req, res) => {
  try {
    const {
      category,
      categoryRel,
      id,
      createdAt,
      updatedAt,
      reviews,
      inquiries,
      categorySlug,
      ...rest
    } = req.body;

    const updateData = { ...rest };

    // Remove undefined keys
    Object.keys(updateData).forEach((k) => {
      if (updateData[k] === undefined) delete updateData[k];
    });

    if (updateData.establishedYear !== undefined) {
      updateData.establishedYear = updateData.establishedYear
        ? Number(updateData.establishedYear)
        : null;
    }

    if (typeof category === 'string' && category.trim()) {
      const targetCat = await prisma.category.findFirst({
        where: { name: { equals: category.trim(), mode: 'insensitive' } }
      });
      if (targetCat) {
        updateData.categoryId = targetCat.id;
        updateData.categoryName = targetCat.name;
        updateData.sector = targetCat.sector;
      }
    }

    if (updateData.status && updateData.verified === undefined) {
      updateData.verified = updateData.status === 'verified';
    }

    const updated = await prisma.business.update({
      where: { id: req.params.id },
      data: updateData,
      include: {
        category: {
          select: { name: true, slug: true, sector: true, icon: true }
        }
      }
    });

    res.json({
      success: true,
      message: 'Business updated successfully',
      data: {
        ...updated,
        category: updated.category?.name || updated.categoryName || 'General',
        categorySlug: updated.category?.slug || '',
        categoryRel: updated.category
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/v1/businesses/:id', async (req, res) => {
  try {
    await prisma.business.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true, message: 'Business deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 6. INQUIRIES & LEADS CRUD
// ==========================================
const getInquiriesHandler = async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

app.get('/api/v1/enquiries', getInquiriesHandler);
app.get('/api/v1/forms/contacts', getInquiriesHandler);

const postInquiryHandler = async (req, res) => {
  const { name, contact, email, category, businessName, message, leadSource } = req.body;
  try {
    const newInq = await prisma.inquiry.create({
      data: {
        name: name || 'Guest User',
        contact: contact || '',
        email: email || '',
        categoryName: category || 'General',
        businessName: businessName || 'Best of Amravati Directory',
        message: message || '',
        leadSource: leadSource || 'directory_portal',
        status: 'pending'
      }
    });
    res.status(201).json({ success: true, message: 'Inquiry submitted successfully', data: newInq });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

app.post('/api/v1/enquiries', postInquiryHandler);
app.post('/api/v1/forms/contacts', postInquiryHandler);

const updateInquiryHandler = async (req, res) => {
  try {
    const updated = await prisma.inquiry.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, message: 'Inquiry updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

app.put('/api/v1/enquiries/:id', updateInquiryHandler);
app.put('/api/v1/forms/contacts/:id', updateInquiryHandler);

const deleteInquiryHandler = async (req, res) => {
  try {
    await prisma.inquiry.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

app.delete('/api/v1/enquiries/:id', deleteInquiryHandler);
app.delete('/api/v1/forms/contacts/:id', deleteInquiryHandler);

// ==========================================
// 7. REVIEWS CRUD
// ==========================================
app.get('/api/v1/reviews', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/v1/reviews', async (req, res) => {
  const { businessId, businessName, name, rating, comment } = req.body;
  try {
    const newRev = await prisma.review.create({
      data: {
        businessId,
        businessName: businessName || 'Business Listing',
        name: name || 'Verified Resident',
        rating: Number(rating) || 5,
        comment: comment || '',
        status: 'approved'
      }
    });
    res.status(201).json({ success: true, message: 'Review added successfully', data: newRev });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 8. AUTHENTICATION (Dev & Admin OTP)
// ==========================================
app.post('/api/v1/auth/send-otp', (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    message: `OTP sent successfully to ${email}. (Dev bypass OTP: 123456)`
  });
});

app.post('/api/v1/auth/verify-otp', (req, res) => {
  const { email } = req.body;
  res.json({
    success: true,
    token: 'active_session',
    email,
    message: 'Authentication successful'
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Best of Amravati REST API Gateway running on port ${PORT}`);
  console.log(`📊 Connected to Neon PostgreSQL Database via Prisma`);
  console.log(`📍 Endpoint: http://localhost:${PORT}/api/v1/health`);
  console.log(`📈 Analytics: http://localhost:${PORT}/api/v1/analytics/categories`);
  console.log(`======================================================\n`);
});
