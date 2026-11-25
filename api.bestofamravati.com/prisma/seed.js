import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

// ==========================================
// 30 AMRAVATI CATEGORIES (Structured for Data Analysis)
// ==========================================
const CATEGORIES_SEED = [
  {
    name: "IT & Software",
    slug: "it-software",
    sector: "Technology",
    icon: "terminal",
    description: "Custom software development, mobile apps, cloud computing, and digital transformation.",
    featured: true,
    status: "active",
    sortOrder: 1,
    metadata: { marketSizeTier: "High Growth", avgDealValue: 150000, searchKeywords: ["software", "website", "app development", "cloud", "seo"], targetDemographics: "Startups, SMEs, Enterprises", nicCode: "6201" }
  },
  {
    name: "Hospitals & Healthcare",
    slug: "hospitals-healthcare",
    sector: "Healthcare",
    icon: "local_hospital",
    description: "Multi-speciality hospitals, pediatric centers, intensive care, and specialized surgery.",
    featured: true,
    status: "active",
    sortOrder: 2,
    metadata: { marketSizeTier: "Essential Civic", avgDealValue: 12000, searchKeywords: ["hospital", "doctor", "clinic", "icu", "surgery"], targetDemographics: "Residents, Families, Senior Citizens", nicCode: "8610" }
  },
  {
    name: "Restaurants & Cafes",
    slug: "restaurants-cafes",
    sector: "Hospitality & Food",
    icon: "restaurant",
    description: "Fine dining, family restaurants, multi-cuisine banquets, bakeries, and rooftop cafes.",
    featured: true,
    status: "active",
    sortOrder: 3,
    metadata: { marketSizeTier: "High Frequency", avgDealValue: 850, searchKeywords: ["food", "restaurant", "cafe", "dinner", "family dining", "thali"], targetDemographics: "Youth, Families, Corporate Outings", nicCode: "5610" }
  },
  {
    name: "Real Estate & Builders",
    slug: "real-estate-builders",
    sector: "Construction & Real Estate",
    icon: "home_work",
    description: "Residential townships, 2/3 BHK luxury apartments, commercial complexes, and civil contractors.",
    featured: true,
    status: "active",
    sortOrder: 4,
    metadata: { marketSizeTier: "High Capital", avgDealValue: 3500000, searchKeywords: ["flats", "apartments", "builder", "property", "plots", "real estate"], targetDemographics: "Home Buyers, Investors, NRIs", nicCode: "6810" }
  },
  {
    name: "Education & Coaching",
    slug: "education-coaching",
    sector: "Education & Training",
    icon: "school",
    description: "Engineering & medical entrance institutes, degree colleges, CBSE schools, and skill hubs.",
    featured: true,
    status: "active",
    sortOrder: 5,
    metadata: { marketSizeTier: "Strategic Hub", avgDealValue: 45000, searchKeywords: ["coaching", "jee", "neet", "college", "school", "training"], targetDemographics: "Students, Parents, Aspirants", nicCode: "8549" }
  },
  {
    name: "Automobiles & Garages",
    slug: "automobiles-garages",
    sector: "Automotive & Transport",
    icon: "directions_car",
    description: "Authorized vehicle dealerships, multi-brand servicing, EV charging hubs, and spares.",
    featured: true,
    status: "active",
    sortOrder: 6,
    metadata: { marketSizeTier: "Asset Driven", avgDealValue: 4500, searchKeywords: ["car service", "bike showroom", "mechanic", "tyres", "auto garage"], targetDemographics: "Vehicle Owners, Logistics Operators", nicCode: "4520" }
  },
  {
    name: "Beauty & Wellness",
    slug: "beauty-wellness",
    sector: "Personal Care & Lifestyle",
    icon: "spa",
    description: "Luxury unisex salons, bridal makeover studios, ayurvedic spas, and fitness gyms.",
    featured: true,
    status: "active",
    sortOrder: 7,
    metadata: { marketSizeTier: "Consumer Discretionary", avgDealValue: 1200, searchKeywords: ["salon", "spa", "haircut", "bridal makeup", "facial", "beauty parlor"], targetDemographics: "Women, Men, Brides & Grooms", nicCode: "9602" }
  },
  {
    name: "Legal & Financial Services",
    slug: "legal-financial-services",
    sector: "Professional & Corporate",
    icon: "gavel",
    description: "Corporate law firms, civil litigation advocates, chartered accountants, and GST taxation.",
    featured: true,
    status: "active",
    sortOrder: 8,
    metadata: { marketSizeTier: "High Compliance", avgDealValue: 18000, searchKeywords: ["lawyer", "advocate", "legal advice", "notary", "civil court"], targetDemographics: "Businesses, Property Owners, Litigants", nicCode: "6910" }
  },
  {
    name: "Retail & Supermarkets",
    slug: "retail-supermarkets",
    sector: "Retail & Commerce",
    icon: "shopping_cart",
    description: "Hypermarkets, departmental stores, organic grocery chains, and wholesale provisions.",
    featured: true,
    status: "active",
    sortOrder: 9,
    metadata: { marketSizeTier: "High Volume", avgDealValue: 1400, searchKeywords: ["supermarket", "grocery", "shopping", "dry fruits", "provisions"], targetDemographics: "Households, Homemakers, Bulk Buyers", nicCode: "4711" }
  },
  {
    name: "Agriculture & Agro-Tech",
    slug: "agriculture-agro-tech",
    sector: "Agriculture & Allied",
    icon: "agriculture",
    description: "Drip irrigation systems, organic fertilizers, hybrid seeds, and farm machinery.",
    featured: true,
    status: "active",
    sortOrder: 10,
    metadata: { marketSizeTier: "Regional Backbone", avgDealValue: 65000, searchKeywords: ["agro", "seeds", "fertilizer", "drip irrigation", "farming equipment", "cotton"], targetDemographics: "Farmers, Agro-dealers, Cotton Mills", nicCode: "0161" }
  },
  {
    name: "Hotels & Banquets",
    slug: "hotels-banquets",
    sector: "Hospitality & Tourism",
    icon: "hotel",
    description: "Luxury business hotels, AC banquet halls, marriage lawns, and executive stays in Amravati.",
    featured: false,
    status: "active",
    sortOrder: 11,
    metadata: { marketSizeTier: "Hospitality Premium", avgDealValue: 75000, searchKeywords: ["hotel", "rooms", "banquet hall", "marriage lawn", "stay"], targetDemographics: "Wedding parties, Corporate Travellers", nicCode: "5510" }
  },
  {
    name: "Jewelry & Ornaments",
    slug: "jewelry-ornaments",
    sector: "Luxury & Retail",
    icon: "diamond",
    description: "Hallmarked 916 gold jewelry, diamond ornaments, silver bridal sets, and traditional Maharashtrian designs.",
    featured: false,
    status: "active",
    sortOrder: 12,
    metadata: { marketSizeTier: "High Ticket", avgDealValue: 85000, searchKeywords: ["gold", "jewellers", "diamond", "silver", "bridal jewelry"], targetDemographics: "Families, Brides, Investors", nicCode: "4773" }
  },
  {
    name: "Interior & Architecture",
    slug: "interior-architecture",
    sector: "Architecture & Design",
    icon: "brush",
    description: "Turnkey interior designers, 3D architectural planning, modular kitchens, and residential elevation.",
    featured: false,
    status: "active",
    sortOrder: 13,
    metadata: { marketSizeTier: "Creative High Value", avgDealValue: 450000, searchKeywords: ["interior designer", "modular kitchen", "architect", "false ceiling"], targetDemographics: "New Homeowners, Commercial Offices", nicCode: "7110" }
  },
  {
    name: "Event & Wedding Planners",
    slug: "event-wedding-planners",
    sector: "Events & Entertainment",
    icon: "celebration",
    description: "Complete wedding management, stage decoration, sound & light setups, and corporate event organizers.",
    featured: false,
    status: "active",
    sortOrder: 14,
    metadata: { marketSizeTier: "Service Aggregator", avgDealValue: 120000, searchKeywords: ["wedding planner", "event management", "mandap decoration", "dj sound"], targetDemographics: "Wedding Hosts, Corporate Entities", nicCode: "8230" }
  },
  {
    name: "Fitness Gyms & Sports",
    slug: "fitness-gyms-sports",
    sector: "Sports & Fitness",
    icon: "fitness_center",
    description: "Modern fitness gyms, crossfit training centers, badminton arenas, and sports academies.",
    featured: false,
    status: "active",
    sortOrder: 15,
    metadata: { marketSizeTier: "Subscription Driven", avgDealValue: 12000, searchKeywords: ["gym", "fitness", "workout", "crossfit", "personal trainer", "sports"], targetDemographics: "Youth, Working Professionals, Athletes", nicCode: "9311" }
  },
  {
    name: "Diagnostics & Pathology Labs",
    slug: "diagnostics-pathology",
    sector: "Healthcare & Life Sciences",
    icon: "biotech",
    description: "NABL accredited pathology labs, digital X-Ray, CT Scan, Sonography, and health packages.",
    featured: false,
    status: "active",
    sortOrder: 16,
    metadata: { marketSizeTier: "Essential Healthcare", avgDealValue: 2200, searchKeywords: ["blood test", "pathology lab", "x-ray", "mri scan", "health checkup"], targetDemographics: "Patients, Seniors, Health Conscious", nicCode: "8690" }
  },
  {
    name: "Electronics & Home Appliances",
    slug: "electronics-appliances",
    sector: "Consumer Electronics",
    icon: "tv",
    description: "Multi-brand consumer electronics showrooms, LED TVs, refrigerators, laptops, and mobile stores.",
    featured: false,
    status: "active",
    sortOrder: 17,
    metadata: { marketSizeTier: "High Retail", avgDealValue: 28000, searchKeywords: ["electronics", "mobile showroom", "refrigerator", "laptop", "smart tv"], targetDemographics: "Households, Tech Enthusiasts, Students", nicCode: "4752" }
  },
  {
    name: "Furniture & Home Decor",
    slug: "furniture-home-decor",
    sector: "Home & Living",
    icon: "chair",
    description: "Solid teakwood furniture, modular sofas, ergonomic office chairs, and designer home furnishings.",
    featured: false,
    status: "active",
    sortOrder: 18,
    metadata: { marketSizeTier: "Lifestyle Durable", avgDealValue: 35000, searchKeywords: ["furniture", "sofa", "dining table", "bed", "office furniture"], targetDemographics: "Homeowners, Offices, Institutions", nicCode: "4759" }
  },
  {
    name: "Logistics, Packers & Movers",
    slug: "logistics-packers-movers",
    sector: "Transport & Supply Chain",
    icon: "local_shipping",
    description: "Household relocation services, interstate goods transport, cargo packing, and warehouse storage.",
    featured: false,
    status: "active",
    sortOrder: 19,
    metadata: { marketSizeTier: "B2B & B2C Relocation", avgDealValue: 16000, searchKeywords: ["packers and movers", "relocation", "truck transport", "parcel service"], targetDemographics: "Transferable Employees, Businesses", nicCode: "4923" }
  },
  {
    name: "Printing & Advertising",
    slug: "printing-advertising",
    sector: "Media & Marketing",
    icon: "print",
    description: "Digital flex printing, offset press, billboard hoardings, corporate branding, and promotional gifts.",
    featured: false,
    status: "active",
    sortOrder: 20,
    metadata: { marketSizeTier: "Commercial B2B", avgDealValue: 15000, searchKeywords: ["flex printing", "hoardings", "visiting cards", "pamphlets", "branding"], targetDemographics: "Local Businesses, Politicians, Institutes", nicCode: "1811" }
  },
  {
    name: "Bakeries & Sweet Marts",
    slug: "bakeries-sweet-marts",
    sector: "Food & Confectionery",
    icon: "bakery_dining",
    description: "Traditional Amravati mawa jalebi, kaju katli, fresh designer birthday cakes, and savory snacks.",
    featured: false,
    status: "active",
    sortOrder: 21,
    metadata: { marketSizeTier: "High Repeat Retail", avgDealValue: 450, searchKeywords: ["sweets", "mithai", "bakery", "cake shop", "namkeen", "pastry"], targetDemographics: "Families, Festival Shoppers, Youth", nicCode: "1071" }
  },
  {
    name: "Security & CCTV Solutions",
    slug: "security-cctv",
    sector: "Safety & Surveillance",
    icon: "videocam",
    description: "HD CCTV camera installations, biometric attendance, fire alarms, and private security guards.",
    featured: false,
    status: "active",
    sortOrder: 22,
    metadata: { marketSizeTier: "Commercial Security", avgDealValue: 24000, searchKeywords: ["cctv camera", "security guards", "biometric", "alarm system"], targetDemographics: "Commercial Shops, Housing Societies, Banks", nicCode: "8020" }
  },
  {
    name: "Solar & Electrical Systems",
    slug: "solar-electrical",
    sector: "Renewable Energy & Power",
    icon: "solar_power",
    description: "Rooftop solar panel installation, government solar subsidies, inverters, and heavy electrical works.",
    featured: false,
    status: "active",
    sortOrder: 23,
    metadata: { marketSizeTier: "Green Energy High Growth", avgDealValue: 180000, searchKeywords: ["solar panel", "rooftop solar", "inverter", "electrical contractor"], targetDemographics: "Homeowners, Factories, Hospitals", nicCode: "4321" }
  },
  {
    name: "Tours & Travel Agencies",
    slug: "tours-travel",
    sector: "Travel & Tourism",
    icon: "flight",
    description: "Domestic and international holiday packages, flight bookings, Chikhaldara hill tours, and luxury car rentals.",
    featured: false,
    status: "active",
    sortOrder: 24,
    metadata: { marketSizeTier: "Tourism & Leisure", avgDealValue: 42000, searchKeywords: ["tours", "travel agent", "holiday packages", "car rental", "flight tickets"], targetDemographics: "Vacationers, Pilgrims, Corporates", nicCode: "7911" }
  },
  {
    name: "Fashion & Clothing Stores",
    slug: "fashion-clothing",
    sector: "Fashion & Apparel",
    icon: "checkroom",
    description: "Exclusive bridal sarees, designer sherwanis, branded casual menswear, and kids wear showrooms.",
    featured: false,
    status: "active",
    sortOrder: 25,
    metadata: { marketSizeTier: "High Retail Festive", avgDealValue: 3800, searchKeywords: ["clothing", "saree shop", "menswear", "bridal wear", "dresses"], targetDemographics: "Men, Women, Festive & Wedding Shoppers", nicCode: "4771" }
  },
  {
    name: "Hardware & Building Supplies",
    slug: "hardware-building-supplies",
    sector: "Industrial & Construction",
    icon: "build",
    description: "Cement, TMT steel bars, plumbing fittings, Asian Paints dealers, and sanitary ware wholesalers.",
    featured: false,
    status: "active",
    sortOrder: 26,
    metadata: { marketSizeTier: "Industrial Wholesale", avgDealValue: 65000, searchKeywords: ["cement", "steel", "paints", "plumbing", "hardware store", "sanitaryware"], targetDemographics: "Contractors, Masons, Home Renovators", nicCode: "4663" }
  },
  {
    name: "Pet Care & Veterinary Clinics",
    slug: "pet-care-veterinary",
    sector: "Veterinary & Pets",
    icon: "pets",
    description: "Veterinary doctors, pet grooming salons, vaccinated puppies, cat food, and pet accessories.",
    featured: false,
    status: "active",
    sortOrder: 27,
    metadata: { marketSizeTier: "Niche Rapid Growth", avgDealValue: 1600, searchKeywords: ["vet clinic", "pet shop", "dog food", "pet doctor", "grooming"], targetDemographics: "Pet Owners, Animal Lovers", nicCode: "7500" }
  },
  {
    name: "Optical & Eye Care",
    slug: "optical-eye-care",
    sector: "Vision & Healthcare",
    icon: "visibility",
    description: "Computerized eye testing, branded spectacle frames, polarized sunglasses, and contact lenses.",
    featured: false,
    status: "active",
    sortOrder: 28,
    metadata: { marketSizeTier: "Healthcare Retail", avgDealValue: 2800, searchKeywords: ["optician", "chashma", "spectacles", "eye testing", "sunglasses"], targetDemographics: "Students, IT Professionals, Seniors", nicCode: "4774" }
  },
  {
    name: "Chartered Accountants & Tax",
    slug: "chartered-accountants-tax",
    sector: "Finance & Compliance",
    icon: "account_balance",
    description: "Income tax filing, GST audit, statutory company audits, business loans, and startup consulting.",
    featured: false,
    status: "active",
    sortOrder: 29,
    metadata: { marketSizeTier: "Professional Advisory", avgDealValue: 25000, searchKeywords: ["chartered accountant", "ca", "income tax", "gst return", "company audit"], targetDemographics: "Business Owners, Salaried Taxpayers", nicCode: "6920" }
  },
  {
    name: "Industrial Equipment & Fabrication",
    slug: "industrial-fabrication",
    sector: "Manufacturing & Engineering",
    icon: "precision_manufacturing",
    description: "Heavy steel fabrication, lathe machining, industrial shed construction, and agro machinery manufacturing.",
    featured: false,
    status: "active",
    sortOrder: 30,
    metadata: { marketSizeTier: "Heavy Industry B2B", avgDealValue: 220000, searchKeywords: ["fabrication", "industrial shed", "lathe machine", "welding", "manufacturing"], targetDemographics: "Factories, Warehouses, MIDC Industries", nicCode: "2511" }
  }
];

// ==========================================
// 5 BUSINESSES FOR EACH OF THE 30 CATEGORIES = 150 BUSINESSES
// ==========================================
const AMRAVATI_LOCALITIES = [
  "Saturna MIDC", "Camp Road", "Rajapeth Flyover", "Badnera Road",
  "Maltekdi Square", "Dastur Nagar", "Panchavati Square", "Irwin Square",
  "Gadge Nagar", "Rukhmini Nagar", "VMV Road", "Morshi Road",
  "Jawahar Gate", "Cotton Market", "Ambadevi Temple Road", "Tapovan",
  "Jaistambh Chowk", "Shyam Chowk", "Navsari", "Congress Nagar"
];

// Master mapping of 5 businesses per category
const CATEGORY_BUSINESSES = {
  "it-software": [
    {
      name: "BIZONANCE INDIA PVT. LTD.",
      slug: "bizonance-india-pvt-ltd",
      subCategory: "Custom Software & Enterprise Cloud",
      owner: "Ritesh Wankhade",
      phone: "+91 7212530123",
      whatsapp: "918956727311",
      email: "contact@bizonance.com",
      website: "https://bizonance.com",
      address: "Ravi Kiran, near Delhi Public School, Colony, Saturna, Amravati, Maharashtra 444605",
      locality: "Saturna",
      pincode: "444605",
      establishedYear: 2020,
      employeeCount: "25-50",
      pricingTier: "Enterprise / Custom",
      rating: 5.0,
      reviewCount: 47,
      status: "verified",
      featured: true,
      verified: true,
      services: ["Custom ERP Solutions", "Web & Mobile App Development", "Cloud Architecture", "Digital Marketing & SEO", "AI Integration"],
      tags: ["software", "cloud", "mobile app", "erp", "it consulting", "bizonance"]
    },
    {
      name: "Vidarbha TechSolutions & Web Studio",
      slug: "vidarbha-techsolutions",
      subCategory: "Web Hosting & Corporate Portals",
      owner: "Aniket Deshmukh",
      phone: "+91 7212550190",
      whatsapp: "919422880011",
      email: "hello@vidarbhatech.in",
      website: "https://vidarbhatech.in",
      address: "2nd Floor, City Center Mall, Near Rajapeth, Amravati 444605",
      locality: "Rajapeth",
      pincode: "444605",
      establishedYear: 2018,
      employeeCount: "10-20",
      pricingTier: "Moderate",
      rating: 4.8,
      reviewCount: 32,
      status: "verified",
      featured: false,
      verified: true,
      services: ["WordPress Websites", "E-commerce Stores", "Domain & Hosting", "SEO Marketing"],
      tags: ["web design", "ecommerce", "seo", "hosting"]
    },
    {
      name: "Ambika Software Solutions",
      slug: "ambika-software-solutions",
      subCategory: "Billing & Accounting Software",
      owner: "Pravin Kulkarni",
      phone: "+91 7212674400",
      whatsapp: "919822119933",
      email: "support@ambikasoft.com",
      website: "https://ambikasoft.com",
      address: "Shop 14, Tapovan Commercial Complex, Amravati 444604",
      locality: "Tapovan",
      pincode: "444604",
      establishedYear: 2016,
      employeeCount: "5-15",
      pricingTier: "Budget",
      rating: 4.7,
      reviewCount: 26,
      status: "verified",
      featured: false,
      verified: true,
      services: ["GST Billing Software", "Inventory Management", "Retail POS", "Tally Customization"],
      tags: ["billing", "pos", "accounting", "retail"]
    },
    {
      name: "NextGen Cloud Labs",
      slug: "nextgen-cloud-labs",
      subCategory: "Cloud DevOps & Cybersecurity",
      owner: "Saurabh Thakare",
      phone: "+91 7212560888",
      whatsapp: "919766554422",
      email: "info@nextgencloud.io",
      website: "https://nextgencloud.io",
      address: "Plot 42, Camp Road, Near Collector Office, Amravati 444602",
      locality: "Camp",
      pincode: "444602",
      establishedYear: 2021,
      employeeCount: "15-30",
      pricingTier: "Premium",
      rating: 4.9,
      reviewCount: 19,
      status: "verified",
      featured: true,
      verified: true,
      services: ["AWS / Azure DevOps", "Cybersecurity Audits", "API Architecture", "Microservices"],
      tags: ["devops", "cloud", "aws", "security"]
    },
    {
      name: "SmartCode App Developers",
      slug: "smartcode-app-developers",
      subCategory: "Flutter & React Native Mobile Apps",
      owner: "Nikhil Tayade",
      phone: "+91 7212681122",
      whatsapp: "919890443322",
      email: "contact@smartcodeapps.com",
      website: "https://smartcodeapps.com",
      address: "Opp. Govt Engineering College, VMV Road, Amravati 444604",
      locality: "VMV Road",
      pincode: "444604",
      establishedYear: 2022,
      employeeCount: "8-15",
      pricingTier: "Moderate",
      rating: 4.8,
      reviewCount: 22,
      status: "verified",
      featured: false,
      verified: true,
      services: ["Android Apps", "iOS Apps", "UI/UX Prototyping", "Backend Integration"],
      tags: ["mobile apps", "flutter", "react native", "android"]
    }
  ],

  "hospitals-healthcare": [
    {
      name: "Apex Diagnostic & Multispeciality Clinic",
      slug: "apex-diagnostic-multispeciality-clinic",
      subCategory: "Cardiology & Intensive Care",
      owner: "Dr. Sameer Deshmukh",
      phone: "+91 7212660440",
      whatsapp: "919422114400",
      email: "info@apexdiagnostic.in",
      website: "https://apexdiagnostic.in",
      address: "Opposite District Hospital, Camp Road, Amravati 444602",
      locality: "Camp",
      pincode: "444602",
      establishedYear: 2012,
      employeeCount: "50-100",
      pricingTier: "Moderate",
      rating: 4.9,
      reviewCount: 58,
      status: "verified",
      featured: true,
      verified: true,
      services: ["24x7 Emergency ICU", "Digital X-Ray & ECG", "Cardiology Consultation", "General Surgery"],
      tags: ["hospital", "icu", "cardiology", "emergency", "clinic"]
    },
    {
      name: "Dr. Panjabrao Deshmukh Memorial Medical Hospital",
      slug: "pdmmc-hospital-amravati",
      subCategory: "Tertiary Care & Super-Speciality",
      owner: "PDMMC Trust",
      phone: "+91 7212551401",
      whatsapp: "919422851401",
      email: "dean@pdmmc.edu.in",
      website: "https://pdmmc.edu.in",
      address: "Shivaji Nagar, Panchavati Square, Amravati 444603",
      locality: "Panchavati",
      pincode: "444603",
      establishedYear: 1984,
      employeeCount: "200+",
      pricingTier: "Affordable / Civic",
      rating: 4.8,
      reviewCount: 120,
      status: "verified",
      featured: true,
      verified: true,
      services: ["General Medicine", "Trauma & Orthopedics", "NICU & Pediatrics", "Oncology Services"],
      tags: ["medical college", "hospital", "panjabrao", "trauma"]
    },
    {
      name: "LifeLine Children & Maternity Hospital",
      slug: "lifeline-children-maternity-hospital",
      subCategory: "Gynecology & Pediatrics",
      owner: "Dr. Neha Bhende",
      phone: "+91 7212678900",
      whatsapp: "919822678900",
      email: "lifeline.amravati@gmail.com",
      website: "https://lifelineamravati.com",
      address: "Dastur Nagar Road, Near Sharda Square, Amravati 444606",
      locality: "Dastur Nagar",
      pincode: "444606",
      establishedYear: 2015,
      employeeCount: "25-50",
      pricingTier: "Moderate",
      rating: 4.9,
      reviewCount: 44,
      status: "verified",
      featured: false,
      verified: true,
      services: ["Normal & C-Section Delivery", "NICU Incubator Care", "Vaccination", "Infertility Clinic"],
      tags: ["maternity", "pediatric", "gynecologist", "baby clinic"]
    },
    {
      name: "Shree Krupa Orthopedic & Joint Replacement Hospital",
      slug: "shree-krupa-orthopedic",
      subCategory: "Joint Replacement & Spine Surgery",
      owner: "Dr. Milind Joshi",
      phone: "+91 7212564321",
      whatsapp: "919422154321",
      email: "shreekrupa.ortho@gmail.com",
      website: "https://shreekrupaortho.in",
      address: "Near Irwin Hospital Square, Morshi Road, Amravati 444601",
      locality: "Irwin Square",
      pincode: "444601",
      establishedYear: 2010,
      employeeCount: "20-40",
      pricingTier: "Premium",
      rating: 4.8,
      reviewCount: 39,
      status: "verified",
      featured: false,
      verified: true,
      services: ["Knee & Hip Replacement", "Fracture Management", "Arthroscopy", "Physiotherapy"],
      tags: ["orthopedic", "joint replacement", "spine surgery", "bone"]
    },
    {
      name: "City Dental Care & Implant Center",
      slug: "city-dental-care-implant-center",
      subCategory: "Cosmetic & Implant Dentistry",
      owner: "Dr. Rahul Agrawal",
      phone: "+91 7212683344",
      whatsapp: "919890123344",
      email: "citydental.amt@gmail.com",
      website: "https://citydentalamravati.com",
      address: "1st Floor, Gandhi Complex, Rajapeth, Amravati 444605",
      locality: "Rajapeth",
      pincode: "444605",
      establishedYear: 2017,
      employeeCount: "5-15",
      pricingTier: "Moderate",
      rating: 4.9,
      reviewCount: 31,
      status: "verified",
      featured: false,
      verified: true,
      services: ["Dental Implants", "Root Canal Treatment", "Teeth Whitening", "Invisalign Braces"],
      tags: ["dentist", "dental implant", "rct", "teeth cleaning"]
    }
  ],

  "restaurants-cafes": [
    {
      name: "Grand Mehfil Fine Dining & Banquets",
      slug: "grand-mehfil-fine-dining",
      subCategory: "Multi-Cuisine Luxury Dining",
      owner: "Rajesh Jaiswal",
      phone: "+91 7212570020",
      whatsapp: "919823055112",
      email: "reservations@grandmehfil.com",
      website: "https://grandmehfil.com",
      address: "Camp Road, Maltekdi Square, Amravati 444603",
      locality: "Maltekdi",
      pincode: "444603",
      establishedYear: 2008,
      employeeCount: "40-80",
      pricingTier: "Premium",
      rating: 4.8,
      reviewCount: 85,
      status: "verified",
      featured: true,
      verified: true,
      services: ["Buffet & Ala Carte", "Continental & Mughlai", "AC Family Cabins", "Cocktail Lounge"],
      tags: ["fine dining", "banquet", "family restaurant", "hotel mehfil"]
    },
    {
      name: "Hotel Radhey Pure Veg Restaurant",
      slug: "hotel-radhey-pure-veg",
      subCategory: "Authentic Gujarati & North Indian Thali",
      owner: "Mahesh Patel",
      phone: "+91 7212563344",
      whatsapp: "919422893344",
      email: "contact@hotelradhey.com",
      website: "https://hotelradhey.com",
      address: "Near Jaistambh Chowk, Station Road, Amravati 444601",
      locality: "Jaistambh Chowk",
      pincode: "444601",
      establishedYear: 2004,
      employeeCount: "25-50",
      pricingTier: "Moderate",
      rating: 4.7,
      reviewCount: 94,
      status: "verified",
      featured: false,
      verified: true,
      services: ["Unlimited Gujarati Thali", "Paneer Delicacies", "Jain Food Prep", "Sweet Counters"],
      tags: ["pure veg", "thali", "gujarati", "family restaurant"]
    },
    {
      name: "Cafe Chokolade & Mocktail Lounge",
      slug: "cafe-chokolade-amravati",
      subCategory: "Shakes, Pizzas & Youth Hangout",
      owner: "Tushar Wani",
      phone: "+91 7212687722",
      whatsapp: "919822787722",
      email: "chokolade.amr@gmail.com",
      website: "",
      address: "Near Panchavati Square, Gadge Nagar Road, Amravati 444603",
      locality: "Panchavati",
      pincode: "444603",
      establishedYear: 2019,
      employeeCount: "10-20",
      pricingTier: "Pocket Friendly",
      rating: 4.6,
      reviewCount: 62,
      status: "verified",
      featured: false,
      verified: true,
      services: ["Thick B'Chak Shakes", "Woodfired Style Pizzas", "Cheese Burgers", "Free Wi-Fi"],
      tags: ["cafe", "shakes", "pizza", "coffee", "youth hangout"]
    },
    {
      name: "Barbeque Nation Amravati",
      slug: "barbeque-nation-amravati",
      subCategory: "Live Grill & Unlimited Buffet",
      owner: "Barbeque Nation Hospitality",
      phone: "+91 7212558800",
      whatsapp: "919822338800",
      email: "feedback@barbequenation.com",
      website: "https://barbequenation.com",
      address: "3rd Floor, Tapovan Urban Hub, Badnera Road, Amravati 444605",
      locality: "Badnera Road",
      pincode: "444605",
      establishedYear: 2021,
      employeeCount: "30-60",
      pricingTier: "Premium Buffet",
      rating: 4.8,
      reviewCount: 78,
      status: "verified",
      featured: true,
      verified: true,
      services: ["Live Table Grill", "Kulfi Nation Counter", "Corporate Lunch", "Birthday Celebrations"],
      tags: ["barbeque", "buffet", "grill", "kebabs", "fine dining"]
    },
    {
      name: "Up & Above Rooftop Restro",
      slug: "up-and-above-rooftop-restro",
      subCategory: "Open Sky Dining & Live Acoustic Music",
      owner: "Gaurav Sarda",
      phone: "+91 7212690011",
      whatsapp: "919890450011",
      email: "upandabove.amt@gmail.com",
      website: "",
      address: "Rooftop, Prime Heights, Dastur Nagar Road, Amravati 444606",
      locality: "Dastur Nagar",
      pincode: "444606",
      establishedYear: 2022,
      employeeCount: "15-30",
      pricingTier: "Moderate",
      rating: 4.7,
      reviewCount: 45,
      status: "verified",
      featured: false,
      verified: true,
      services: ["Rooftop Sunset Views", "Mocktails & Starters", "Live Acoustic Music", "Candlelight Dinner"],
      tags: ["rooftop", "cafe", "music", "view", "couple dining"]
    }
  ],

  "real-estate-builders": [
    {
      name: "Vidarbha Reality Developers",
      slug: "vidarbha-reality-developers",
      subCategory: "Luxury Gated Townships & 3 BHK",
      owner: "Nitin Rathi",
      phone: "+91 7212678899",
      whatsapp: "919890123456",
      email: "sales@vidarbhareality.in",
      website: "https://vidarbhareality.in",
      address: "Badnera Road, Near Rajapeth Flyover, Amravati 444605",
      locality: "Badnera Road",
      pincode: "444605",
      establishedYear: 2011,
      employeeCount: "20-50",
      pricingTier: "High Capital",
      rating: 4.8,
      reviewCount: 41,
      status: "verified",
      featured: true,
      verified: true,
      services: ["2 & 3 BHK Apartments", "Commercial Showroom Spaces", "RERA Approved Projects", "Home Loan Assistance"],
      tags: ["builder", "flats", "real estate", "apartments", "badnera road"]
    },
    {
      name: "Shri Balaji Infra & Township Projects",
      slug: "shri-balaji-infra-amravati",
      subCategory: "Residential Plots & Villa Layouts",
      owner: "Sanjay Agrawal",
      phone: "+91 7212554422",
      whatsapp: "919422115522",
      email: "info@balajiinfra.org",
      website: "https://balajiinfra.org",
      address: "Camp Road, Opposite Circuit House, Amravati 444602",
      locality: "Camp",
      pincode: "444602",
      establishedYear: 2009,
      employeeCount: "25-40",
      pricingTier: "Premium",
      rating: 4.7,
      reviewCount: 38,
      status: "verified",
      featured: false,
      verified: true,
      services: ["NMRDA Approved Plots", "Bungalow Construction", "Clear Title Lands", "Gated Infrastructure"],
      tags: ["plots", "township", "villa", "land"]
    },
    {
      name: "Khandelwal Construction Group",
      slug: "khandelwal-construction-group",
      subCategory: "Commercial Complexes & IT Parks",
      owner: "Ashok Khandelwal",
      phone: "+91 7212667700",
      whatsapp: "919822337700",
      email: "khandelwal.infra@gmail.com",
      website: "",
      address: "Near Congress Nagar Square, Morshi Road, Amravati 444606",
      locality: "Congress Nagar",
      pincode: "444606",
      establishedYear: 2005,
      employeeCount: "50-100",
      pricingTier: "Commercial High Value",
      rating: 4.9,
      reviewCount: 52,
      status: "verified",
      featured: true,
      verified: true,
      services: ["Office Complex Leasing", "Shopping Mall Construction", "Industrial Warehousing", "Civil Engineering"],
      tags: ["commercial", "office space", "builder", "construction"]
    },
    {
      name: "Surya Heights Developers",
      slug: "surya-heights-developers",
      subCategory: "Affordable 1 & 2 BHK Housing",
      owner: "Vikas Deshmukh",
      phone: "+91 7212581234",
      whatsapp: "919766001234",
      email: "sales@suryaheights.in",
      website: "https://suryaheights.in",
      address: "Navsari Road, Near Dastur Nagar, Amravati 444606",
      locality: "Dastur Nagar",
      pincode: "444606",
      establishedYear: 2017,
      employeeCount: "15-30",
      pricingTier: "Budget Housing",
      rating: 4.6,
      reviewCount: 29,
      status: "verified",
      featured: false,
      verified: true,
      services: ["PMAY Subsidy Assistance", "1 BHK Smart Homes", "Lift & Generator Backup", "Kids Play Area"],
      tags: ["budget flats", "1 bhk", "2 bhk", "housing"]
    },
    {
      name: "Mayur Associates & Property Brokers",
      slug: "mayur-associates-property",
      subCategory: "Property Sale, Purchase & Rental Consult",
      owner: "Mayur Thakare",
      phone: "+91 7212569988",
      whatsapp: "919890459988",
      email: "mayur.realestate@gmail.com",
      website: "",
      address: "Panchavati Square, Near State Bank, Amravati 444603",
      locality: "Panchavati",
      pincode: "444603",
      establishedYear: 2014,
      employeeCount: "5-10",
      pricingTier: "Brokerage Advisory",
      rating: 4.8,
      reviewCount: 35,
      status: "verified",
      featured: false,
      verified: true,
      services: ["Commercial Shop Rentals", "Residential Resale", "Registry Documentation", "Property Valuation"],
      tags: ["broker", "rental", "property consultant", "resale"]
    }
  ],

  "education-coaching": [
    {
      name: "Shri Shivaji Education Society Institutes",
      slug: "shri-shivaji-education-society",
      subCategory: "Colleges & Academic Excellence",
      owner: "Shivaji Education Society",
      phone: "+91 7212662179",
      whatsapp: "919422862179",
      email: "info@ssesco.org",
      website: "https://ssesco.org",
      address: "Shivaji Nagar, Morshi Road, Amravati 444603",
      locality: "Morshi Road",
      pincode: "444603",
      establishedYear: 1932,
      employeeCount: "200+",
      pricingTier: "Academic",
      rating: 4.9,
      reviewCount: 145,
      status: "verified",
      featured: true,
      verified: true,
      services: ["Senior Degree Colleges", "Polytechnic & Engineering", "Science Research Labs", "Sports Hostels"],
      tags: ["college", "education", "degree", "polytechnic", "shivaji"]
    },
    {
      name: "Allen Career Institute Amravati Center",
      slug: "allen-career-institute-amravati",
      subCategory: "IIT-JEE & NEET Premier Coaching",
      owner: "Allen Career Institute",
      phone: "+91 7212559090",
      whatsapp: "919822339090",
      email: "amravati@allen.ac.in",
      website: "https://allen.ac.in",
      address: "Near Dastur Nagar Square, Badnera Road, Amravati 444605",
      locality: "Dastur Nagar",
      pincode: "444605",
      establishedYear: 2019,
      employeeCount: "40-80",
      pricingTier: "Premium Coaching",
      rating: 4.8,
      reviewCount: 92,
      status: "verified",
      featured: true,
      verified: true,
      services: ["IIT-JEE Main & Advanced", "NEET-UG Medical", "Olympiad Foundation", "Test Series"],
      tags: ["iit jee", "neet", "allen", "coaching", "science"]
    },
    {
      name: "Pote Group of Educational Institutions",
      slug: "pote-group-educational-institutions",
      subCategory: "Engineering, MBA & Pharmacy",
      owner: "Shri P. R. Pote (Patil)",
      phone: "+91 7212530089",
      whatsapp: "919422110089",
      email: "prpotepatilcollege@gmail.com",
      website: "https://prpcem.org",
      address: "Pote Estate, Kathora Road, Amravati 444604",
      locality: "VMV Road",
      pincode: "444604",
      establishedYear: 2007,
      employeeCount: "100-200",
      pricingTier: "Professional Degree",
      rating: 4.7,
      reviewCount: 88,
      status: "verified",
      featured: false,
      verified: true,
      services: ["B.Tech Engineering", "MBA & MCA", "B.Pharmacy", "Placement Cell"],
      tags: ["engineering college", "mba", "pharmacy", "pote"]
    },
    {
      name: "Chanakya IAS & MPSC Academy",
      slug: "chanakya-ias-mpsc-academy",
      subCategory: "Civil Services & State MPSC Coaching",
      owner: "Prof. Vinod Jadhav",
      phone: "+91 7212675511",
      whatsapp: "919890115511",
      email: "chanakya.amr@gmail.com",
      website: "",
      address: "Top Floor, Ambadevi Complex, Gandhi Chowk, Amravati 444601",
      locality: "Jawahar Gate",
      pincode: "444601",
      establishedYear: 2013,
      employeeCount: "10-25",
      pricingTier: "Moderate",
      rating: 4.8,
      reviewCount: 54,
      status: "verified",
      featured: false,
      verified: true,
      services: ["UPSC Civil Services", "MPSC Rajyaseva & Combined", "Library with 24h Study Room", "Mock Interviews"],
      tags: ["mpsc", "upsc", "civil services", "academy"]
    },
    {
      name: "T.I.M.E. Institute Amravati",
      slug: "time-institute-amravati",
      subCategory: "CAT, Banking & GRE Prep",
      owner: "Siddharth Mundhada",
      phone: "+91 7212563311",
      whatsapp: "919766443311",
      email: "amravati@time4education.com",
      website: "https://time4education.com",
      address: "Near Girls High School, Camp Road, Amravati 444602",
      locality: "Camp",
      pincode: "444602",
      establishedYear: 2015,
      employeeCount: "8-20",
      pricingTier: "Moderate",
      rating: 4.7,
      reviewCount: 40,
      status: "verified",
      featured: false,
      verified: true,
      services: ["CAT MBA Coaching", "Bank PO & Clerk", "Campus Placement Training", "GD & PI Mentorship"],
      tags: ["cat", "banking", "mba entrance", "coaching"]
    }
  ]
};

// Procedural generator for remaining 25 categories to ensure comprehensive, high quality coverage
const OTHER_CATEGORIES_DATA = [
  {
    catSlug: "automobiles-garages",
    subCat: "Automobile Dealership & Spares",
    businesses: [
      { name: "Jaika Motors Tata Commercial & Passenger", loc: "Saturna MIDC", phone: "+91 7212530400", owner: "Kunal Patwardhan" },
      { name: "Sarda Honda Two Wheeler Showroom", loc: "Rajapeth Flyover", phone: "+91 7212560123", owner: "Vivek Sarda" },
      { name: "Kiran Auto Garage & Bosch Diesel Center", loc: "Badnera Road", phone: "+91 7212678120", owner: "Kiran Gole" },
      { name: "Amravati Speed Wheels Multibrand Car Service", loc: "Dastur Nagar", phone: "+91 7212554090", owner: "Roshan Tayade" },
      { name: "GreenDrive Electric Scooters Showroom", loc: "Panchavati Square", phone: "+91 7212681144", owner: "Sumeet Kale" }
    ]
  },
  {
    catSlug: "beauty-wellness",
    subCat: "Salons & Rejuvenation Spas",
    businesses: [
      { name: "Habibs Hair & Beauty Unisex Salon", loc: "Camp Road", phone: "+91 7212571212", owner: "Farhan Khan" },
      { name: "Kaya Kalp Ayurvedic Panchakarma Spa", loc: "Maltekdi Square", phone: "+91 7212663322", owner: "Dr. Vaidya Kulkarni" },
      { name: "Glitz Bridal Studio & Academy", loc: "Dastur Nagar", phone: "+91 7212580044", owner: "Snehal Deshmukh" },
      { name: "Looks Men Luxury Grooming Lounge", loc: "Rajapeth", phone: "+91 7212556677", owner: "Akash Wankhade" },
      { name: "Ozone Skin & Laser Cosmetic Center", loc: "Panchavati Square", phone: "+91 7212691100", owner: "Dr. Pallavi Joshi" }
    ]
  },
  {
    catSlug: "legal-financial-services",
    subCat: "Legal Advocacy & Financial Consultancy",
    businesses: [
      { name: "Deshmukh & Associates Law Chambers", loc: "Camp Road", phone: "+91 7212567788", owner: "Adv. Chandrakant Deshmukh" },
      { name: "Vidarbha Corporate Financial Planners", loc: "Rajapeth", phone: "+91 7212554499", owner: "Sunil Agrawal" },
      { name: "Nyaya Mitra Notary & Documentation Hub", loc: "Irwin Square", phone: "+91 7212683311", owner: "Adv. Meena Patil" },
      { name: "Amravati Tax Shield Consultants", loc: "Badnera Road", phone: "+91 7212672200", owner: "Prashant Gandhi" },
      { name: "Apex Mutual Funds & Wealth Advisors", loc: "Dastur Nagar", phone: "+91 7212591122", owner: "Rohit Mundhada" }
    ]
  },
  {
    catSlug: "retail-supermarkets",
    subCat: "Grocery & Departmental Stores",
    businesses: [
      { name: "D-Mart Amravati Hypermarket", loc: "Badnera Road", phone: "+91 7212559900", owner: "Avenue Supermarts" },
      { name: "Shivaji Super Bazaar Cooperative", loc: "Panchavati Square", phone: "+91 7212661122", owner: "Cooperative Trust" },
      { name: "Khandesh Dry Fruits & Spices", loc: "Jawahar Gate", phone: "+91 7212574433", owner: "Rameshwar Kothari" },
      { name: "Green Valley Organic Grocery", loc: "Camp Road", phone: "+91 7212582211", owner: "Shrikant Bhende" },
      { name: "V-Mart Retail Department Store", loc: "Rajapeth Flyover", phone: "+91 7212567733", owner: "V-Mart Retail Ltd" }
    ]
  },
  {
    catSlug: "agriculture-agro-tech",
    subCat: "Agro Seeds & Drip Irrigation",
    businesses: [
      { name: "Vidarbha Krushi Seva Kendra", loc: "Cotton Market", phone: "+91 7212571100", owner: "Pandurang Patil" },
      { name: "Jain Irrigation Systems Authorized Depot", loc: "Morshi Road", phone: "+91 7212664488", owner: "Milind Sarda" },
      { name: "Amravati Cotton & Ginning Machinery Spares", loc: "Saturna MIDC", phone: "+91 7212530188", owner: "Nandkishor Rathi" },
      { name: "Kisan Doot Organic Bio-Fertilizers", loc: "Tapovan", phone: "+91 7212685522", owner: "Dr. Suresh Thakare" },
      { name: "Mahyco & Rasi Hybrid Seeds Agency", loc: "Cotton Market", phone: "+91 7212563399", owner: "Gajanan Deshmukh" }
    ]
  },
  {
    catSlug: "hotels-banquets",
    subCat: "Hotels & Celebration Lawns",
    businesses: [
      { name: "Hotel Mehfil Inn & Convention Center", loc: "Camp Road", phone: "+91 7212570025", owner: "Mehfil Hospitality" },
      { name: "Hotel Vrajbhoomi & Banquet Halls", loc: "Rajapeth", phone: "+91 7212561188", owner: "Vrajesh Shah" },
      { name: "Shree Krishna Celebration Lawn & Resort", loc: "Badnera Road", phone: "+91 7212679900", owner: "Pawan Agrawal" },
      { name: "Hotel Regency Executive Business Stay", loc: "Maltekdi Square", phone: "+91 7212554411", owner: "Sanjay Joshi" },
      { name: "Utsav Grand Wedding Banquets", loc: "Dastur Nagar", phone: "+91 7212583300", owner: "Manish Rathi" }
    ]
  },
  {
    catSlug: "jewelry-ornaments",
    subCat: "Gold, Silver & Diamonds",
    businesses: [
      { name: "Tanishq Showroom Amravati", loc: "Camp Road", phone: "+91 7212558833", owner: "Titan Company Ltd" },
      { name: "PNG Jewellers Amravati Branch", loc: "Rajapeth", phone: "+91 7212562244", owner: "P. N. Gadgil Sons" },
      { name: "Rokde Jewellers Gold & Diamond Palace", loc: "Ambadevi Temple Road", phone: "+91 7212573311", owner: "Bhaiyyaji Rokde" },
      { name: "Kalyan Jewellers Amravati", loc: "Badnera Road", phone: "+91 7212671155", owner: "Kalyan Jewellers Ltd" },
      { name: "Mahalakshmi Silver & Antique Ornaments", loc: "Jawahar Gate", phone: "+91 7212569944", owner: "Govind Soni" }
    ]
  },
  {
    catSlug: "interior-architecture",
    subCat: "Interior Planning & 3D Design",
    businesses: [
      { name: "Studio 9 Architects & Turnkey Interiors", loc: "Camp Road", phone: "+91 7212574488", owner: "Ar. Rohit Bhende" },
      { name: "DesignMatrix Modular Kitchen & Wardrobes", loc: "Badnera Road", phone: "+91 7212673322", owner: "Hemant Kale" },
      { name: "VastuShilp Architectural Consultants", loc: "Panchavati Square", phone: "+91 7212665511", owner: "Ar. Shilpa Kulkarni" },
      { name: "SpaceCraft Luxury Living Decors", loc: "Dastur Nagar", phone: "+91 7212586600", owner: "Vikas Mundhada" },
      { name: "Apex False Ceiling & Gypsum Solutions", loc: "Rajapeth", phone: "+91 7212558811", owner: "Naveen Agrawal" }
    ]
  },
  {
    catSlug: "event-wedding-planners",
    subCat: "Weddings, Stage & Mandap",
    businesses: [
      { name: "Royal Shahi Wedding Decorators", loc: "Dastur Nagar", phone: "+91 7212589900", owner: "Prashant Jadhav" },
      { name: "Vivah Dreams Event Management", loc: "Camp Road", phone: "+91 7212572233", owner: "Ananya Deshmukh" },
      { name: "Rockstar Sound & Dynamic DJ Lights", loc: "Badnera Road", phone: "+91 7212674455", owner: "Sunny Verma" },
      { name: "Mangalam Flower Stage & Mandap Designers", loc: "Rajapeth", phone: "+91 7212563388", owner: "Manoj Mali" },
      { name: "Amravati Celebrations Corporate Organizers", loc: "Panchavati Square", phone: "+91 7212667799", owner: "Sameer Joshi" }
    ]
  },
  {
    catSlug: "fitness-gyms-sports",
    subCat: "Gymnasiums & Training",
    businesses: [
      { name: "Gold's Gym Amravati Center", loc: "Badnera Road", phone: "+91 7212677700", owner: "Gold's Gym Franchise" },
      { name: "Iron Temple Fitness & CrossFit Hub", loc: "Camp Road", phone: "+91 7212575511", owner: "Vikram Rathi" },
      { name: "Ozone Wellness Club & Swimming Pool", loc: "Maltekdi Square", phone: "+91 7212558822", owner: "Dhiraj Deshmukh" },
      { name: "Champion Badminton & Martial Arts Academy", loc: "VMV Road", phone: "+91 7212682233", owner: "Coach Santosh Pawar" },
      { name: "Fitness First Women Zumba & Yoga Studio", loc: "Dastur Nagar", phone: "+91 7212590055", owner: "Pooja Wankhade" }
    ]
  },
  {
    catSlug: "diagnostics-pathology",
    subCat: "Pathology & Imaging Scans",
    businesses: [
      { name: "Dr. Lal PathLabs Amravati Diagnostic Center", loc: "Irwin Square", phone: "+91 7212561144", owner: "Dr. Lal PathLabs" },
      { name: "Metropolis Healthcare Pathology Lab", loc: "Rajapeth", phone: "+91 7212552288", owner: "Metropolis Healthcare" },
      { name: "Amravati MRI & Multi-Slice CT Scan Center", loc: "Camp Road", phone: "+91 7212578811", owner: "Dr. Sandeep Joshi" },
      { name: "Apollo Diagnostics Blood Collection Hub", loc: "Panchavati Square", phone: "+91 7212669933", owner: "Apollo Health" },
      { name: "Nidan Digital X-Ray & Sonography Clinic", loc: "Dastur Nagar", phone: "+91 7212584422", owner: "Dr. Smita Agrawal" }
    ]
  },
  {
    catSlug: "electronics-appliances",
    subCat: "Consumer Durables & Gadgets",
    businesses: [
      { name: "Vijay Sales Electronic Mega Mall", loc: "Badnera Road", phone: "+91 7212678833", owner: "Vijay Sales Pvt Ltd" },
      { name: "Reliance Digital Electronics Store", loc: "Camp Road", phone: "+91 7212579900", owner: "Reliance Retail" },
      { name: "Croma Electronics Showroom", loc: "Rajapeth", phone: "+91 7212564411", owner: "Infiniti Retail" },
      { name: "Shree Ganesh Mobile World & Apple Reseller", loc: "Jawahar Gate", phone: "+91 7212572299", owner: "Bhushan Sarda" },
      { name: "Godrej & Voltas AC Air Conditioning Hub", loc: "Panchavati Square", phone: "+91 7212668822", owner: "Pravin Khandelwal" }
    ]
  },
  {
    catSlug: "furniture-home-decor",
    subCat: "Teak & Modular Furniture",
    businesses: [
      { name: "Damro Teak & Modern Furniture Mall", loc: "Badnera Road", phone: "+91 7212675544", owner: "Damro Group" },
      { name: "Godrej Interio Official Showroom", loc: "Camp Road", phone: "+91 7212573366", owner: "Godrej & Boyce" },
      { name: "Durian Luxury Sofas & Recliners", loc: "Rajapeth", phone: "+91 7212568855", owner: "Durian Industries" },
      { name: "WoodCraft Teakwood Dining & Bed Emporium", loc: "Cotton Market", phone: "+91 7212561133", owner: "Shyam Sundar Soni" },
      { name: "Sleepwell Mattress & Bedding Experience Store", loc: "Dastur Nagar", phone: "+91 7212587744", owner: "Rajendra Agrawal" }
    ]
  },
  {
    catSlug: "logistics-packers-movers",
    subCat: "Relocation & Cargo Logistics",
    businesses: [
      { name: "Agarwal Packers and Movers DRS Group", loc: "Saturna MIDC", phone: "+91 7212530999", owner: "DRS Logistics" },
      { name: "Gati KWE Express Cargo Amravati Hub", loc: "Badnera Road", phone: "+91 7212671188", owner: "Gati Ltd" },
      { name: "VRL Logistics Parcel Booking Office", loc: "Cotton Market", phone: "+91 7212567700", owner: "VRL Logistics Ltd" },
      { name: "Safexpress B2B Logistics Distribution Hub", loc: "Saturna MIDC", phone: "+91 7212530777", owner: "Safexpress Pvt Ltd" },
      { name: "Vidarbha Quick Movers & Local Shifting", loc: "Dastur Nagar", phone: "+91 7212585511", owner: "Raju Gaikwad" }
    ]
  },
  {
    catSlug: "printing-advertising",
    subCat: "Flex, Hoardings & Digital Offset",
    businesses: [
      { name: "Navneet Digital Offset Press & Packaging", loc: "Cotton Market", phone: "+91 7212568899", owner: "Dilip Joshi" },
      { name: "Amravati Outdoor Advertising & Billboard Hoardings", loc: "Rajapeth", phone: "+91 7212553355", owner: "Sanjay Rathi" },
      { name: "Sai Flex & Neon Sign Boards", loc: "Badnera Road", phone: "+91 7212672277", owner: "Vijay Kale" },
      { name: "PrintHub Visiting Cards & Corporate Brochures", loc: "Panchavati Square", phone: "+91 7212664411", owner: "Amol Tayade" },
      { name: "Apex Promotional Gifts & T-Shirt Printing", loc: "Camp Road", phone: "+91 7212571166", owner: "Girish Mundhada" }
    ]
  },
  {
    catSlug: "bakeries-sweet-marts",
    subCat: "Mawa Jalebi, Cakes & Snacks",
    businesses: [
      { name: "Bhaiyyaji Jalebi Wale (Famous Amravati Mawa Jalebi)", loc: "Jawahar Gate", phone: "+91 7212570099", owner: "Narayan Prasad Gupta" },
      { name: "Monginis Cake Shop & Confectionery", loc: "Camp Road", phone: "+91 7212576633", owner: "Monginis Franchise" },
      { name: "Shree Bikaner Mishthan Bhandar", loc: "Rajapeth", phone: "+91 7212569911", owner: "Ramswaroop Sharma" },
      { name: "Ribbons and Balloons The Cake Shop", loc: "Badnera Road", phone: "+91 7212670088", owner: "Vikas Thakare" },
      { name: "Modern Bakery & Fresh Bread Mart", loc: "Panchavati Square", phone: "+91 7212663377", owner: "Altaf Hussain" }
    ]
  },
  {
    catSlug: "security-cctv",
    subCat: "Surveillance & Guards",
    businesses: [
      { name: "CP PLUS World CCTV & Biometrics Agency", loc: "Rajapeth", phone: "+91 7212557799", owner: "Aditya Sarda" },
      { name: "Eagle Eye Security Services & Armed Guards", loc: "Camp Road", phone: "+91 7212574411", owner: "Col. (Retd) R. K. Shinde" },
      { name: "Hikvision Authorized Security Camera Depot", loc: "Badnera Road", phone: "+91 7212673399", owner: "Mahendra Patil" },
      { name: "SecureForce Biometrics & Fire Alarms", loc: "Dastur Nagar", phone: "+91 7212586633", owner: "Devendra Wankhade" },
      { name: "Amravati Shield Automation & Video Door Phones", loc: "Panchavati Square", phone: "+91 7212665588", owner: "Pankaj Kulkarni" }
    ]
  },
  {
    catSlug: "solar-electrical",
    subCat: "Rooftop Solar & Transformers",
    businesses: [
      { name: "Tata Power Solar Authorized Channel Partner", loc: "Badnera Road", phone: "+91 7212679944", owner: "Tata Solar Dealer" },
      { name: "Vidarbha Solar Energy Systems", loc: "Saturna MIDC", phone: "+91 7212530666", owner: "Milind Deshmukh" },
      { name: "Havells Galaxy Electricals & Lightings", loc: "Rajapeth", phone: "+91 7212561100", owner: "Ashish Agrawal" },
      { name: "SuryaShakti Rooftop On-Grid Solar Plant", loc: "Dastur Nagar", phone: "+91 7212582277", owner: "Sanjay Tayade" },
      { name: "Luminous Solar & Inverter Battery Mega Hub", loc: "Panchavati Square", phone: "+91 7212667744", owner: "Kailash Gandhi" }
    ]
  },
  {
    catSlug: "tours-travel",
    subCat: "Holiday Packages & Rentals",
    businesses: [
      { name: "Veena World Amravati Authorized Sales Lounge", loc: "Camp Road", phone: "+91 7212578855", owner: "Veena World Franchise" },
      { name: "Chikhaldara Eco-Tours & Safari Bookings", loc: "Maltekdi Square", phone: "+91 7212556633", owner: "Sameer Joshi" },
      { name: "Sairam Travels Luxury Sleeper Bus Services", loc: "Rajapeth Flyover", phone: "+91 7212562299", owner: "Vithalrao Shinde" },
      { name: "Amravati Air Travels & Passport Advisory", loc: "Irwin Square", phone: "+91 7212567711", owner: "Irfan Qureshi" },
      { name: "Vidarbha Self-Drive & Chauffeur Car Rentals", loc: "Badnera Road", phone: "+91 7212674488", owner: "Ganesh Thakare" }
    ]
  },
  {
    catSlug: "fashion-clothing",
    subCat: "Bridal Sarees & Menswear",
    businesses: [
      { name: "Manyavar & Mohey Groom & Bridal Showroom", loc: "Camp Road", phone: "+91 7212579944", owner: "Vedant Fashions Ltd" },
      { name: "Kala Niketan Paithani & Silk Sarees", loc: "Jawahar Gate", phone: "+91 7212571188", owner: "Purushottam Mundhada" },
      { name: "Raymond Made to Measure Menswear", loc: "Rajapeth", phone: "+91 7212563366", owner: "Raymond Ltd Franchise" },
      { name: "Zudio Fashion Value Store", loc: "Badnera Road", phone: "+91 7212678811", owner: "Trent Ltd" },
      { name: "Little Champs Kids & Teen Wear", loc: "Panchavati Square", phone: "+91 7212665533", owner: "Sunita Agrawal" }
    ]
  },
  {
    catSlug: "hardware-building-supplies",
    subCat: "Cement, Steel & Paints",
    businesses: [
      { name: "Ultratech Cement & TMT Steel Stockist", loc: "Saturna MIDC", phone: "+91 7212530222", owner: "Khandelwal Steels" },
      { name: "Asian Paints Color Ideas Exclusive Store", loc: "Rajapeth", phone: "+91 7212565577", owner: "Deepak Sarda" },
      { name: "Jaquar Bath Fittings & Cera Sanitaryware", loc: "Badnera Road", phone: "+91 7212673388", owner: "Naveen Kothari" },
      { name: "Amravati Plywood & Hardware Super Mart", loc: "Cotton Market", phone: "+91 7212564499", owner: "Bhanwarlal Patel" },
      { name: "Supreme PVC Pipes & Water Tanks Agency", loc: "Dastur Nagar", phone: "+91 7212581166", owner: "Manoj Deshmukh" }
    ]
  },
  {
    catSlug: "pet-care-veterinary",
    subCat: "Pet Clinics & Nutrition",
    businesses: [
      { name: "Amravati Pet Clinic & Surgical Center", loc: "Camp Road", phone: "+91 7212577744", owner: "Dr. Anand Kulkarni" },
      { name: "Royal Canin & Pedigree Pet Nutrition Lounge", loc: "Badnera Road", phone: "+91 7212676611", owner: "Sachin Wankhade" },
      { name: "Paws & Claws Pet Grooming & Spa", loc: "Dastur Nagar", phone: "+91 7212589922", owner: "Ruchika Joshi" },
      { name: "Vidarbha Veterinary Pharmacy & Vaccines", loc: "Panchavati Square", phone: "+91 7212668855", owner: "Dr. Nitin Patil" },
      { name: "Aquarium World & Exotic Birds Paradise", loc: "Rajapeth", phone: "+91 7212561122", owner: "Shoeb Khan" }
    ]
  },
  {
    catSlug: "optical-eye-care",
    subCat: "Computerized Eye Testing & Specs",
    businesses: [
      { name: "Lenskart.com Store Amravati", loc: "Camp Road", phone: "+91 7212578899", owner: "Lenskart Solutions Ltd" },
      { name: "Titan Eyeplus Authorized Store", loc: "Rajapeth", phone: "+91 7212564477", owner: "Titan Company Ltd" },
      { name: "Optic Vision Computerized Testing & Ray-Ban", loc: "Badnera Road", phone: "+91 7212672233", owner: "Kishor Gandhi" },
      { name: "Royal Chashma Ghar & Contact Lens Center", loc: "Jawahar Gate", phone: "+91 7212570044", owner: "Haresh Bhai" },
      { name: "Netra Care Prescription Frames & Sunglasses", loc: "Panchavati Square", phone: "+91 7212661199", owner: "Dr. Uday Bhende" }
    ]
  },
  {
    catSlug: "chartered-accountants-tax",
    subCat: "CA Firms & Corporate Audits",
    businesses: [
      { name: "Khandelwal & Mundhada Chartered Accountants", loc: "Camp Road", phone: "+91 7212572200", owner: "CA Rajesh Khandelwal" },
      { name: "Sarda & Associates CA Firm", loc: "Rajapeth", phone: "+91 7212568822", owner: "CA Manish Sarda" },
      { name: "Vidarbha Tax Consultants & GST Filing", loc: "Badnera Road", phone: "+91 7212675588", owner: "CA Pradeep Agrawal" },
      { name: "Agrawal & Joshi Financial Audit Partners", loc: "Dastur Nagar", phone: "+91 7212584477", owner: "CA Sunil Joshi" },
      { name: "Apex Statutory Audits & Company Formations", loc: "Panchavati Square", phone: "+91 7212662244", owner: "CA Ashwini Deshmukh" }
    ]
  },
  {
    catSlug: "industrial-fabrication",
    subCat: "Structural Steel & Agro Machines",
    businesses: [
      { name: "Vidarbha Heavy Steel Fabricators", loc: "Saturna MIDC", phone: "+91 7212530333", owner: "Suresh Rathi" },
      { name: "Amravati Precision Lathe & CNC Machine Works", loc: "Saturna MIDC", phone: "+91 7212530555", owner: "Ashok Patil" },
      { name: "Shree Ganesh Agro Machinery & Thresher Manufacturer", loc: "Badnera Road", phone: "+91 7212679922", owner: "Vilasrao Deshmukh" },
      { name: "Apex Industrial Sheds & PEB Structures", loc: "Morshi Road", phone: "+91 7212668800", owner: "Dhananjay Kale" },
      { name: "Modern Shutter & Aluminum Fabrication Center", loc: "Cotton Market", phone: "+91 7212563300", owner: "Iqbal Ahmed" }
    ]
  }
];

// ==========================================
// 10 BASIC PACK BUSINESSES (Pending Verification / Entry Tier)
// ==========================================
const BASIC_PACK_BUSINESSES = [
  {
    name: "Sai Krupa Xerox & Stationary Mart",
    slug: "sai-krupa-xerox-stationary",
    categorySlug: "education-coaching",
    subCategory: "Photocopy & College Stationery",
    owner: "Ganesh Wankhade",
    phone: "+91 9422001122",
    whatsapp: "919422001122",
    email: "saikrupa.xerox@gmail.com",
    address: "Opp. Shivaji Science College, Morshi Road, Amravati 444603",
    locality: "Morshi Road",
    pincode: "444603",
    establishedYear: 2023,
    employeeCount: "1-5",
    pricingTier: "Basic Pack",
    rating: 4.4,
    reviewCount: 6,
    status: "pending",
    featured: false,
    verified: false,
    services: ["Spiral Binding", "Project Xerox", "Stationery Supplies"],
    tags: ["xerox", "stationery", "binding"]
  },
  {
    name: "Om Tea & Snack Corner",
    slug: "om-tea-snack-corner",
    categorySlug: "restaurants-cafes",
    subCategory: "Local Irani Tea & Poha Center",
    owner: "Vinayak Joshi",
    phone: "+91 9890223344",
    whatsapp: "919890223344",
    email: "omteacorner@yahoo.com",
    address: "Near Rajapeth Flyover, Amravati 444605",
    locality: "Rajapeth",
    pincode: "444605",
    establishedYear: 2024,
    employeeCount: "1-5",
    pricingTier: "Basic Pack",
    rating: 4.3,
    reviewCount: 8,
    status: "pending",
    featured: false,
    verified: false,
    services: ["Morning Poha", "Special Ginger Tea", "Samosa"],
    tags: ["tea", "poha", "snacks"]
  },
  {
    name: "Classic Tyre Puncture & Air Check",
    slug: "classic-tyre-puncture-service",
    categorySlug: "automobiles-garages",
    subCategory: "Two Wheeler & Car Puncture Repairs",
    owner: "Shaikh Rafiq",
    phone: "+91 9766114455",
    whatsapp: "919766114455",
    email: "",
    address: "Opp. Petrol Pump, Badnera Road, Amravati 444605",
    locality: "Badnera Road",
    pincode: "444605",
    establishedYear: 2023,
    employeeCount: "1-3",
    pricingTier: "Basic Pack",
    rating: 4.2,
    reviewCount: 5,
    status: "pending",
    featured: false,
    verified: false,
    services: ["Tubeless Tyre Puncture", "Nitrogen Air Refill"],
    tags: ["puncture", "tyre", "air"]
  },
  {
    name: "Durga Kirana & General Stores",
    slug: "durga-kirana-general-stores",
    categorySlug: "retail-supermarkets",
    subCategory: "Neighborhood Retail Provision",
    owner: "Rameshwar Sahu",
    phone: "+91 9822776655",
    whatsapp: "919822776655",
    email: "",
    address: "Galli No. 3, Rukhmini Nagar, Amravati 444606",
    locality: "Rukhmini Nagar",
    pincode: "444606",
    establishedYear: 2022,
    employeeCount: "1-3",
    pricingTier: "Basic Pack",
    rating: 4.5,
    reviewCount: 9,
    status: "pending",
    featured: false,
    verified: false,
    services: ["Daily Provisions", "Dairy Products", "Home Delivery"],
    tags: ["kirana", "provisions", "grocery"]
  },
  {
    name: "Shree Mobile Care & Screen Guard",
    slug: "shree-mobile-care-screen-guard",
    categorySlug: "electronics-appliances",
    subCategory: "Mobile Accessories & Quick Glass Replacement",
    owner: "Mayur Chawla",
    phone: "+91 9423554433",
    whatsapp: "919423554433",
    email: "shreemobilecare@gmail.com",
    address: "Near Shyam Chowk, Amravati 444601",
    locality: "Shyam Chowk",
    pincode: "444601",
    establishedYear: 2024,
    employeeCount: "1-4",
    pricingTier: "Basic Pack",
    rating: 4.3,
    reviewCount: 7,
    status: "pending",
    featured: false,
    verified: false,
    services: ["Screen Guard Installation", "Mobile Back Covers", "Charging Cords"],
    tags: ["mobile repair", "screen guard", "covers"]
  },
  {
    name: "Amravati Dry Cleaners & Ironing",
    slug: "amravati-dry-cleaners-ironing",
    categorySlug: "beauty-wellness",
    subCategory: "Steam Press & Saree Roll Press",
    owner: "Ashok Dhotre",
    phone: "+91 9890667788",
    whatsapp: "919890667788",
    email: "",
    address: "Dastur Nagar Main Road, Amravati 444606",
    locality: "Dastur Nagar",
    pincode: "444606",
    establishedYear: 2023,
    employeeCount: "1-4",
    pricingTier: "Basic Pack",
    rating: 4.4,
    reviewCount: 11,
    status: "pending",
    featured: false,
    verified: false,
    services: ["Dry Cleaning", "Suit Pressing", "Saree Polishing"],
    tags: ["laundry", "dry cleaning", "ironing"]
  },
  {
    name: "Green Garden Nursery & Flower Pots",
    slug: "green-garden-nursery-amravati",
    categorySlug: "agriculture-agro-tech",
    subCategory: "Ornamental Plants & Terracotta Pots",
    owner: "Bhagwan Mali",
    phone: "+91 9765332211",
    whatsapp: "919765332211",
    email: "greengarden.amt@gmail.com",
    address: "Tapovan Road, Near University Gate, Amravati 444602",
    locality: "Tapovan",
    pincode: "444602",
    establishedYear: 2023,
    employeeCount: "2-5",
    pricingTier: "Basic Pack",
    rating: 4.6,
    reviewCount: 14,
    status: "pending",
    featured: false,
    verified: false,
    services: ["Bonsai Plants", "Ceramic Pots", "Garden Soil Mix"],
    tags: ["nursery", "plants", "gardening"]
  },
  {
    name: "Quick Key & Locksmith Center",
    slug: "quick-key-locksmith-center",
    categorySlug: "hardware-building-supplies",
    subCategory: "Computerized Key Making & Padlocks",
    owner: "Satish Lohar",
    phone: "+91 9422883311",
    whatsapp: "919422883311",
    email: "",
    address: "Jaistambh Chowk, Station Road, Amravati 444601",
    locality: "Jaistambh Chowk",
    pincode: "444601",
    establishedYear: 2022,
    employeeCount: "1-2",
    pricingTier: "Basic Pack",
    rating: 4.5,
    reviewCount: 10,
    status: "pending",
    featured: false,
    verified: false,
    services: ["Car Sensor Keys", "Godrej Duplicate Keys", "Door Lock Repairs"],
    tags: ["locksmith", "keys", "locks"]
  },
  {
    name: "Shubham Tailors & Alteration",
    slug: "shubham-tailors-alteration",
    categorySlug: "fashion-clothing",
    subCategory: "Blouse Stitching & Trouser Alteration",
    owner: "Shubham Shimpi",
    phone: "+91 9823445566",
    whatsapp: "919823445566",
    email: "",
    address: "Cotton Market Chowk, Amravati 444601",
    locality: "Cotton Market",
    pincode: "444601",
    establishedYear: 2023,
    employeeCount: "2-4",
    pricingTier: "Basic Pack",
    rating: 4.3,
    reviewCount: 8,
    status: "pending",
    featured: false,
    verified: false,
    services: ["Ladies Blouse", "Kurti Stitching", "Pant Alterations"],
    tags: ["tailor", "stitching", "alteration"]
  },
  {
    name: "City Parcel & Courier Drop Point",
    slug: "city-parcel-courier-drop-point",
    categorySlug: "logistics-packers-movers",
    subCategory: "Domestic Parcel Booking Agent",
    owner: "Dhiraj Deshpande",
    phone: "+91 9890554433",
    whatsapp: "919890554433",
    email: "citycourier.amt@gmail.com",
    address: "Near Irwin Square, Amravati 444601",
    locality: "Irwin Square",
    pincode: "444601",
    establishedYear: 2024,
    employeeCount: "1-3",
    pricingTier: "Basic Pack",
    rating: 4.2,
    reviewCount: 5,
    status: "pending",
    featured: false,
    verified: false,
    services: ["Domestic Courier", "Document Speed Post", "Parcel Packing"],
    tags: ["courier", "parcel", "delivery"]
  }
];

// ==========================================
// SEED EXECUTION
const SUBCATEGORIES_BY_CATEGORY = {
  "it-software": [
    "Custom Software Development", "Web Design & Development", "Mobile App Development",
    "Digital Marketing & SEO", "Cloud & DevOps Services", "ERP & CRM Solutions",
    "E-Commerce Development", "IT Consulting & Training", "Cybersecurity & Networking",
    "UI/UX Design Studios"
  ],
  "hospitals-healthcare": [
    "Multi-Speciality Hospitals", "Dental Clinics & Implants", "Maternity & Gynecology",
    "Pediatrics & Child Care", "Orthopedic & Joint Care", "Cardiology & Heart Care",
    "Dermatology & Skin Clinics", "ENT & Hearing Care", "Physiotherapy & Rehab",
    "Ayurveda & Homeopathy"
  ],
  "restaurants-cafes": [
    "Fine Dining Restaurants", "Family & Thali Dining", "Rooftop & Lounge Cafes",
    "Pure Veg Restaurants", "South Indian & Tiffin", "Fast Food & Burgers",
    "Biryani & Mughlai", "Chinese & Pan-Asian", "Coffee & Bakery Cafes",
    "Ice Cream & Dessert Parlors"
  ],
  "real-estate-builders": [
    "Residential Apartments", "Luxury Villas & Row Houses", "Commercial Complexes",
    "NA Plots & Land Developers", "Civil Contractors", "Property Consultants & Brokers",
    "Township Projects", "Renovation & Remodeling", "Industrial Sheds & Warehouses",
    "Real Estate Legal & Valuation"
  ],
  "education-coaching": [
    "JEE & NEET Coaching", "MPSC & UPSC Academies", "CBSE & State Board Schools",
    "Engineering & Degree Colleges", "Spoken English & IELTS", "Computer & Coding Institutes",
    "Commerce & CA Coaching", "Play Schools & Daycare", "Music, Dance & Art Classes",
    "Skill Development Centers"
  ],
  "automobiles-garages": [
    "Car Showrooms & Dealers", "Two-Wheeler Showrooms", "Multi-Brand Car Servicing",
    "Two-Wheeler Repair & Service", "Tyres & Wheel Alignment", "Car Detailing & Ceramic Coating",
    "Auto Spare Parts", "EV Charging & Electric Scooters", "Car Accessories & Audio",
    "24/7 Roadside Assistance"
  ],
  "beauty-wellness": [
    "Unisex Hair Salons", "Bridal Makeup Studios", "Spa & Massage Centers",
    "Laser & Skin Aesthetics", "Nail Art & Eyelash Studios", "Men's Grooming & Barbers",
    "Yoga & Meditation Centers", "Slimming & Weight Loss", "Hair Transplant Clinics",
    "Ayurvedic Panchakarma"
  ],
  "legal-financial-services": [
    "Civil & Criminal Advocates", "Corporate & Startup Law", "Property & RERA Lawyers",
    "Home & Business Loans", "Insurance Advisors", "Mutual Funds & Wealth Management",
    "Notary & Documentation", "Trademark & IP Registration", "Debt Recovery & Arbitration",
    "GST & Compliance Consultants"
  ],
  "retail-supermarkets": [
    "Hypermarkets & Superstores", "Organic & Health Stores", "Kirana & Wholesale Marts",
    "Baby Care & Toy Stores", "Cosmetics & Personal Care", "Dry Fruits & Spices",
    "Household & Kitchenware", "Stationery & Book Depots", "Sports & Outdoor Goods",
    "Gift & Novelty Shops"
  ],
  "agriculture-agro-tech": [
    "Seeds & Crop Protection", "Drip & Sprinkler Irrigation", "Tractors & Farm Machinery",
    "Organic Fertilizers & Bio-Inputs", "Cold Storage & Warehousing", "Dairy & Poultry Equipment",
    "Soil & Water Testing Labs", "Greenhouse & Polyhouse", "Agri Drones & Precision Tech",
    "Grain & Cotton Traders"
  ],
  "hotels-banquets": [
    "Luxury Business Hotels", "Budget & Family Stays", "Wedding Lawns & Gardens",
    "AC Banquet Halls", "Conference & Seminar Venues", "Resorts & Weekend Getaways",
    "Service Apartments", "Catering & Event Kitchens", "Guest Houses & Lodges",
    "Corporate Stay Packages"
  ],
  "jewelry-ornaments": [
    "Gold & Bridal Jewelry", "Diamond & Solitaire", "Silverware & Pooja Articles",
    "Temple & Heritage Jewelry", "Platinum & Couple Rings", "Imitation & Fashion Jewelry",
    "Gemstones & Birthstones", "Custom Jewelry Designers", "Gold Loan & Bullion",
    "Jewelry Repair & Polishing"
  ],
  "interior-architecture": [
    "Residential Architects", "Commercial Interior Designers", "Modular Kitchen Studios",
    "3D Visualization & Vastu", "False Ceiling & Lighting", "Turnkey Interior Contractors",
    "Landscape & Garden Design", "Office & Retail Fit-Outs", "Wallpaper & Flooring",
    "Glass & Aluminum Work"
  ],
  "event-wedding-planners": [
    "Destination Wedding Planners", "Floral & Stage Decor", "Candid Wedding Photography",
    "DJ, Sound & Lighting", "Corporate Event Management", "Birthday & Theme Parties",
    "Mehendi & Sangeet Artists", "Bridal Trousseau & Invitation", "Live Bands & Anchors",
    "Tent House & Mandap Decor"
  ],
  "fitness-gyms-sports": [
    "Modern Gyms & Fitness Clubs", "CrossFit & Functional Training", "Zumba & Aerobics Studios",
    "Swimming Pools & Academies", "Badminton & Turf Arenas", "Cricket & Football Coaching",
    "Martial Arts & Boxing", "Personal Trainers & Nutrition", "Sports Nutrition & Supplements",
    "Indoor Games & Snooker"
  ],
  "diagnostics-pathology": [
    "Blood & Pathology Labs", "MRI & CT Scan Centers", "Digital X-Ray & Sonography",
    "Full Body Health Checkups", "Home Sample Collection", "ECG & Cardiac Diagnostics",
    "Allergy & Hormone Testing", "Histopathology & Biopsy", "Prenatal & Genetic Screening",
    "Corporate Health Screening"
  ],
  "electronics-appliances": [
    "Smartphones & Accessories", "Laptops & Desktops", "LED TVs & Home Theatre",
    "AC, Fridge & Washing Machines", "Kitchen Chimneys & Hobs", "Appliance Repair & AMC",
    "Gaming Consoles & PCs", "Refurbished Tech Stores", "Cameras & Drones",
    "Smart Home Automation"
  ],
  "furniture-home-decor": [
    "Solid Wood & Teak Furniture", "Sofas & Recliners", "Orthopedic Mattresses",
    "Office Chairs & Workstations", "Curtains, Blinds & Upholstery", "Wall Art & Mirrors",
    "Outdoor & Patio Furniture", "Kids Room Furniture", "Custom Carpentry & Polish",
    "Handicrafts & Brass Decor"
  ],
  "logistics-packers-movers": [
    "Home Shifting & Packers", "Office Relocation Services", "Car & Bike Transport",
    "Express Courier & Parcels", "FTL & Part-Load Freight", "Cold Chain Logistics",
    "Warehouse & Storage Units", "Local Tempo & Mini Trucks", "International Air Cargo",
    "Fleet & GPS Tracking"
  ],
  "printing-advertising": [
    "Offset & Brochure Printing", "Flex, Vinyl & Glow Signboards", "LED Hoardings & Billboards",
    "Corporate Gifting & Merchandise", "Packaging & Box Printing", "Digital & UV Printing",
    "Newspaper & Radio Ads", "T-Shirt & Mug Printing", "Visiting Cards & Letterheads",
    "Exhibition Stalls & Standees"
  ],
  "bakeries-sweet-marts": [
    "Custom Designer Cakes", "Traditional Indian Mithai", "Bengali Sweets & Rasmalai",
    "Dry Fruit & Kaju Sweets", "Artisan Breads & Pastries", "Namkeen, Farsan & Snacks",
    "Festive Gift Hampers", "Sugar-Free & Vegan Sweets", "Live Jalebi & Samosa",
    "Cookies & Rusks"
  ],
  "security-cctv": [
    "HD & IP CCTV Cameras", "Biometric & Face Attendance", "Video Door Phones & Smart Locks",
    "Fire Alarm & Suppression", "GPS Vehicle Trackers", "Intercom & EPABX Systems",
    "Boom Barriers & Access Control", "Security Guard Agencies", "24/7 Remote Monitoring",
    "Alarm & Intrusion Sensors"
  ],
  "solar-electrical": [
    "Rooftop Solar Panels", "On-Grid & Hybrid Inverters", "Solar Water Heaters",
    "Industrial Electrical Panels", "Home Wiring & Earthing", "UPS, Batteries & Stabilizers",
    "LED Street & Commercial Lights", "EV Home Chargers", "Substation & Transformer Work",
    "Electrical Safety Audits"
  ],
  "tours-travel": [
    "Domestic Holiday Packages", "International Tours & Visas", "Flight & Train Ticketing",
    "Outstation Car & Tempo Rentals", "Pilgrimage & Yatra Tours", "Honeymoon & Luxury Cruises",
    "Corporate Travel Desk", "Bus Booking & Sleeper Coaches", "Passport & Forex Assistance",
    "Weekend Jungle Safaris"
  ],
  "fashion-clothing": [
    "Bridal Lehengas & Sarees", "Men's Ethnic & Sherwanis", "Formal Suits & Blazers",
    "Western Wear & Denim", "Kids & Infants Apparel", "Designer Boutiques & Tailoring",
    "Handloom & Cotton Wear", "Footwear & Leather Bags", "Winter & Sportswear",
    "Uniforms & Corporate Apparel"
  ],
  "hardware-building-supplies": [
    "Cement, Steel & TMT Bars", "Sanitaryware & Bath Fittings", "Tiles, Marble & Granite",
    "Asian & Exterior Paints", "Plywood, Laminates & Veneers", "Power Tools & Fasteners",
    "Waterproofing Chemicals", "UPVC Doors & Windows", "Plumbing & PVC Pipes",
    "Water Tanks & Pumps"
  ],
  "pet-care-veterinary": [
    "Veterinary Clinics & Surgery", "Pet Grooming & Spa", "Pet Food & Nutrition",
    "Dog & Cat Boarding Hostels", "Pet Vaccination & Deworming", "Aquariums & Exotic Fish",
    "Pet Accessories & Toys", "Obedience & Dog Training", "Pet Adoption & Kennels",
    "24/7 Pet Emergency Care"
  ],
  "optical-eye-care": [
    "Designer Eyeglasses & Frames", "Prescription Sunglasses", "Contact Lenses & Solutions",
    "Computerized Eye Testing", "Cataract & LASIK Centers", "Kids Eyewear & Myopia Care",
    "Blue-Light & Anti-Glare Lenses", "Progressive & Bifocal Lenses", "Low Vision Aids",
    "Eyewear Repair & Adjustments"
  ],
  "chartered-accountants-tax": [
    "Income Tax & ITR Filing", "GST Registration & Returns", "Statutory & Tax Audits",
    "Company & LLP Incorporation", "Project Reports & CMA Data", "Bookkeeping & Tally Accounting",
    "TDS & Payroll Compliance", "ROC & Secretarial Filings", "NRI Taxation & FEMA",
    "Trust & NGO Registration"
  ],
  "industrial-fabrication": [
    "MS & SS Steel Fabrication", "PEB & Industrial Sheds", "CNC & Laser Cutting",
    "Gates, Grills & Railings", "Rolling Shutters & Motorized Gates", "Heavy Structural Welding",
    "Powder Coating & Galvanizing", "Storage Racks & Mezzanine", "Sheet Metal Bending",
    "Custom Machinery Parts"
  ]
};

// ==========================================
async function seed() {
  console.log("🌱 Starting Comprehensive Seed for Best of Amravati Directory...");

  // 1. Upsert All 30 Categories
  console.log("\n📁 Upserting 30 Categories with Analytical Metadata...");
  const categoryMap = new Map();

  for (const cat of CATEGORIES_SEED) {
    let existing = await prisma.category.findFirst({
      where: {
        OR: [{ slug: cat.slug }, { name: cat.name }]
      }
    });

    let upserted;
    if (existing) {
      upserted = await prisma.category.update({
        where: { id: existing.id },
        data: {
          name: cat.name,
          slug: cat.slug,
          sector: cat.sector,
          icon: cat.icon,
          description: cat.description,
          featured: cat.featured,
          status: cat.status,
          sortOrder: cat.sortOrder,
          metadata: cat.metadata,
          parentId: null
        }
      });
    } else {
      upserted = await prisma.category.create({
        data: {
          name: cat.name,
          slug: cat.slug,
          sector: cat.sector,
          icon: cat.icon,
          description: cat.description,
          featured: cat.featured,
          status: cat.status,
          sortOrder: cat.sortOrder,
          metadata: cat.metadata,
          parentId: null
        }
      });
    }
    categoryMap.set(cat.slug, upserted);
    console.log(`  ✓ Category [${upserted.sortOrder}/30]: ${upserted.name} (${upserted.sector})`);

    // 1b. Upsert 10 Subcategories for each main category
    const subNames = SUBCATEGORIES_BY_CATEGORY[cat.slug] || [];
    for (let sIdx = 0; sIdx < subNames.length; sIdx++) {
      const subName = subNames[sIdx];
      const subSlug = `${cat.slug}-${subName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}`;

      const existingSub = await prisma.category.findFirst({
        where: { OR: [{ slug: subSlug }, { name: subName }] }
      });

      if (existingSub) {
        await prisma.category.update({
          where: { id: existingSub.id },
          data: {
            name: subName,
            slug: subSlug,
            sector: cat.sector,
            icon: cat.icon,
            description: `${subName} under ${cat.name} in Amravati`,
            featured: false,
            status: "active",
            sortOrder: sIdx + 1,
            parentId: upserted.id
          }
        });
      } else {
        await prisma.category.create({
          data: {
            name: subName,
            slug: subSlug,
            sector: cat.sector,
            icon: cat.icon,
            description: `${subName} under ${cat.name} in Amravati`,
            featured: false,
            status: "active",
            sortOrder: sIdx + 1,
            parentId: upserted.id
          }
        });
      }
    }
    console.log(`    ↳ ${subNames.length} subcategories seeded for ${upserted.name}`);
  }

  // Reusable helper to avoid any duplicate slug or name collisions & populate full profile fields
  async function upsertBusiness(raw) {
    const servicesArr = Array.isArray(raw.services) ? raw.services : [];
    const data = {
      ...raw,
      tagline:
        raw.tagline ||
        (raw.slug === "bizonance-india-pvt-ltd"
          ? "The Special Kind of Business Reinforcement"
          : `Trusted ${raw.subCategory || raw.categoryName} in ${raw.locality}, Amravati`),
      about:
        raw.about ||
        `${raw.name} is a ${raw.verified ? "verified" : "community-listed"} ${raw.categoryName} establishment in ${raw.locality}, Amravati${
          raw.establishedYear ? `, serving Vidarbha since ${raw.establishedYear}` : ""
        }. Led by ${raw.owner || "our dedicated team"}, we deliver ${
          servicesArr.length > 0 ? servicesArr.join(", ") : raw.categoryName
        } with transparent pricing and local reliability.`,
      timings: raw.timings || "Open · Closes 7:00 PM",
      directionsUrl:
        raw.directionsUrl ||
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${raw.name} ${raw.address}`
        )}`,
      logoUrl:
        raw.logoUrl ||
        (raw.slug === "bizonance-india-pvt-ltd" ? "/bizonance_logo.png" : "/boalogo.svg"),
      socialLinks: raw.socialLinks || {
        instagram: "https://instagram.com/bestofamravati/",
        linkedin: "https://linkedin.com",
        facebook: "https://facebook.com",
        youtube: "https://youtube.com/@bestofamravati"
      },
      products: raw.products || [
        `${raw.categoryName} Standard Package`,
        `${raw.categoryName} Premium Service`,
        "Custom Consultation"
      ],
      videos: raw.videos || ["https://www.youtube.com/@bestofamravati"]
    };

    let existing = await prisma.business.findFirst({
      where: {
        OR: [{ slug: data.slug }, { name: data.name }]
      }
    });

    if (existing) {
      return await prisma.business.update({
        where: { id: existing.id },
        data
      });
    } else {
      return await prisma.business.create({
        data
      });
    }
  }

  // 2. Prepare 5 Businesses for Each Category (30 * 5 = 150 Businesses)
  console.log("\n🏢 Seeding 5 Businesses for Each of the 30 Categories (150 Total)...");
  let seededCount = 0;

  // A. First 5 detailed categories
  for (const [catSlug, businesses] of Object.entries(CATEGORY_BUSINESSES)) {
    const category = categoryMap.get(catSlug);
    if (!category) continue;

    for (const biz of businesses) {
      await upsertBusiness({
        name: biz.name,
        slug: biz.slug,
        categoryId: category.id,
        categoryName: category.name,
        sector: category.sector,
        subCategory: biz.subCategory,
        owner: biz.owner,
        phone: biz.phone,
        whatsapp: biz.whatsapp,
        email: biz.email,
        website: biz.website,
        address: biz.address,
        locality: biz.locality,
        pincode: biz.pincode,
        establishedYear: biz.establishedYear,
        employeeCount: biz.employeeCount,
        pricingTier: biz.pricingTier,
        rating: biz.rating,
        reviewCount: biz.reviewCount,
        status: biz.status,
        featured: biz.featured,
        verified: biz.verified,
        services: biz.services,
        tags: biz.tags
      });
      seededCount++;
    }
    console.log(`  ✓ ${businesses.length} businesses seeded for ${category.name}`);
  }

  // B. Remaining 25 categories (5 businesses each)
  for (const group of OTHER_CATEGORIES_DATA) {
    const category = categoryMap.get(group.catSlug);
    if (!category) continue;

    for (let idx = 0; idx < group.businesses.length; idx++) {
      const b = group.businesses[idx];
      const slug = b.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-");

      const bizRating = Number((4.6 + (idx % 4) * 0.1).toFixed(1));
      const bizReviews = 18 + idx * 7;
      const isFeatured = idx === 0;

      await upsertBusiness({
        name: b.name,
        slug,
        categoryId: category.id,
        categoryName: category.name,
        sector: category.sector,
        subCategory: group.subCat,
        owner: b.owner,
        phone: b.phone,
        whatsapp: b.phone.replace(/[^0-9]/g, ""),
        email: `contact@${slug.slice(0, 15)}.in`,
        website: `https://${slug.slice(0, 15)}.in`,
        address: `${b.loc}, Near Main Square, Amravati`,
        locality: b.loc,
        pincode: "444601",
        establishedYear: 2012 + (idx % 10),
        employeeCount: idx % 2 === 0 ? "10-25" : "5-15",
        pricingTier: "Verified",
        rating: bizRating,
        reviewCount: bizReviews,
        status: "verified",
        featured: isFeatured,
        verified: true,
        services: [`${category.name} Services`, "Customer Support", "Emergency Assistance"],
        tags: [category.slug, b.loc.toLowerCase(), "amravati"]
      });
      seededCount++;
    }
    console.log(`  ✓ ${group.businesses.length} businesses seeded for ${category.name}`);
  }

  // 3. Seed 10 Basic Pack Businesses
  console.log("\n📦 Seeding 10 Basic Pack Businesses (Pending / Entry Tier)...");
  for (const basicBiz of BASIC_PACK_BUSINESSES) {
    const parentCategory = categoryMap.get(basicBiz.categorySlug);

    await upsertBusiness({
      name: basicBiz.name,
      slug: basicBiz.slug,
      categoryId: parentCategory ? parentCategory.id : null,
      categoryName: parentCategory ? parentCategory.name : "General",
      sector: parentCategory ? parentCategory.sector : "General",
      subCategory: basicBiz.subCategory,
      owner: basicBiz.owner,
      phone: basicBiz.phone,
      whatsapp: basicBiz.whatsapp,
      email: basicBiz.email,
      address: basicBiz.address,
      locality: basicBiz.locality,
      pincode: basicBiz.pincode,
      establishedYear: basicBiz.establishedYear,
      employeeCount: basicBiz.employeeCount,
      pricingTier: basicBiz.pricingTier,
      rating: basicBiz.rating,
      reviewCount: basicBiz.reviewCount,
      status: basicBiz.status,
      featured: basicBiz.featured,
      verified: basicBiz.verified,
      services: basicBiz.services,
      tags: basicBiz.tags
    });
    seededCount++;
    console.log(`  ✓ Basic Pack Listing: ${basicBiz.name} (${basicBiz.locality} - Status: ${basicBiz.status})`);
  }

  console.log(`\n🎉 Seeding Completed Successfully!`);
  console.log(`  • Categories: 30 Active Categorical Sectors`);
  console.log(`  • Verified / Premium Businesses: 150 (5 per category)`);
  console.log(`  • Basic Pack Businesses: 10 (Pending review / Entry tier)`);
  console.log(`  • Total Commercial Establishments: ${seededCount}`);
}

seed()
  .catch((e) => {
    console.error("❌ Seeding Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
