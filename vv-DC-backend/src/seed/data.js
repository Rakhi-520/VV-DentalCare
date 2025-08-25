import bcrypt from 'bcrypt'

// Admin user
export const adminData = {
  email: 'admin@dental.local',
  passwordHash: await bcrypt.hash('admin123', 12),
  role: 'admin',
}

// Services data
export const servicesData = [
  {
    title: 'Dental Implants',
    slug: 'dental-implants',
    shortDescription: 'A permanent solution to missing teeth',
    description: 'Dental implants are titanium posts that are surgically placed into the jawbone to replace missing tooth roots. They provide a strong foundation for permanent or removable replacement teeth that are made to match your natural teeth.',
    icon: 'tooth',
    heroImage: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: [
      'Permanent solution',
      'Natural appearance',
      'Preserves jawbone',
      'No impact on adjacent teeth'
    ],
    order: 1,
    isActive: true,
  },
  {
    title: 'Invisalign/Aligners',
    slug: 'invisalign-aligners',
    shortDescription: 'Transparent braces for correcting teeth alignment',
    description: 'Invisalign uses a series of clear, removable aligners to gradually move your teeth into the desired position. Unlike traditional metal braces, Invisalign aligners are virtually invisible and can be removed for eating and cleaning.',
    icon: 'aligners',
    heroImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: [
      'Nearly invisible',
      'Removable convenience',
      'Comfortable fit',
      'Predictable results'
    ],
    order: 2,
    isActive: true,
  },
  {
    title: 'Root Canals',
    slug: 'root-canals',
    shortDescription: 'A substitute to tooth extraction',
    description: 'Root canal treatment is needed when the nerve of a tooth is affected by decay or infection. During treatment, the nerve and bacteria are removed, and the inside is cleaned and sealed. This procedure can save your natural tooth.',
    icon: 'root-canal',
    heroImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: [
      'Saves natural tooth',
      'Eliminates pain',
      'Prevents further infection',
      'Maintains chewing function'
    ],
    order: 3,
    isActive: true,
  },
  {
    title: 'Pediatric Dentistry',
    slug: 'pediatric-dentistry',
    shortDescription: 'Specialized treatment for children',
    description: 'Pediatric dentistry focuses on the oral health of children from infancy through the teen years. We provide comprehensive dental care in a child-friendly environment, including preventive care, education, and treatment.',
    icon: 'child',
    heroImage: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: [
      'Child-friendly environment',
      'Preventive care focus',
      'Early intervention',
      'Parent education'
    ],
    order: 4,
    isActive: true,
  },
]

// Doctors data
export const doctorsData = [
  {
    fullName: 'Dr. Maya Sharma',
    role: 'Prosthodontist',
    bio: 'Dr. Maya Sharma specializes in prosthodontics with over 8 years of experience in restorative and cosmetic dentistry. She is known for her meticulous attention to detail and commitment to providing the highest quality dental care.',
    yearsExperience: 8,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    badges: ['Prosthodontics Specialist', 'Cosmetic Dentistry', 'Digital Dentistry'],
  },
  {
    fullName: 'Dr. Neha Verma',
    role: 'Orthodontist',
    bio: 'Dr. Neha Verma is an experienced orthodontist with 10 years of experience in teeth alignment and jaw correction. She specializes in both traditional braces and modern clear aligner systems.',
    yearsExperience: 10,
    avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    badges: ['Orthodontics Specialist', 'Invisalign Provider', 'TMJ Treatment'],
  },
  {
    fullName: 'Dr. Arjun Patel',
    role: 'Endodontist',
    bio: 'Dr. Arjun Patel is a skilled endodontist with 12 years of experience in root canal therapy and endodontic procedures. He uses the latest technology to ensure comfortable and effective treatment.',
    yearsExperience: 12,
    avatarUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    badges: ['Endodontics Specialist', 'Microscopic Dentistry', 'Pain Management'],
  },
]

// Testimonials data
export const testimonialsData = [
  {
    patientName: 'Jennifer S.',
    quote: 'Great service! I received calling and WhatsApp reminders before and during the whole treatment. The staff was professional and the results exceeded my expectations.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b812?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    patientName: 'William T.',
    quote: 'Great treatment from start to finish. Really appreciated the doctor\'s patience and professionalism. The entire team made me feel comfortable throughout the process.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    patientName: 'Chloe M.',
    quote: 'Incredible service! Ultra-high quality in equipment, techniques, service and products. I would definitely recommend this clinic to anyone looking for quality dental care.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
]

// FAQ data
export const faqsData = [
  {
    question: 'What is the treatment procedure for implants?',
    answer: 'The implant procedure involves several steps: initial consultation and planning, surgical placement of the titanium implant into the jawbone, healing period (3-6 months for osseointegration), and finally placing the crown. The entire process typically takes 3-6 months to complete.',
    order: 1,
    isActive: true,
  },
  {
    question: 'What do you mean by sterility protocols?',
    answer: 'Our sterility protocols include strict sterilization procedures such as autoclaving all instruments at high temperature, using disposable materials where possible, maintaining sterile environments during procedures, and following CDC guidelines for infection control to ensure patient safety.',
    order: 2,
    isActive: true,
  },
  {
    question: 'Do you provide post-treatment care?',
    answer: 'Yes, we provide comprehensive post-treatment care including detailed aftercare instructions, follow-up appointments to monitor healing, 24/7 emergency support for any concerns, and long-term maintenance plans to ensure the longevity of your treatment.',
    order: 3,
    isActive: true,
  },
]

// Blog posts data
export const blogData = [
  {
    title: 'Implants vs Bridges: Which is Right for You?',
    slug: 'implants-vs-bridges-comparison',
    excerpt: 'Comparing dental implants and bridges to help you make the best choice for replacing missing teeth.',
    content: `# Implants vs Bridges: Which is Right for You?

When you're missing one or more teeth, you have several options for replacement. The two most popular choices are dental implants and dental bridges. Both have their advantages and considerations.

## Dental Implants

Dental implants are titanium posts surgically placed into the jawbone. They act as artificial tooth roots and support crowns, bridges, or dentures.

### Advantages:
- **Permanent solution**: Can last a lifetime with proper care
- **Bone preservation**: Prevents jawbone deterioration
- **Natural feel**: Functions like a natural tooth
- **No impact on adjacent teeth**: Doesn't require altering healthy teeth

### Considerations:
- Higher upfront cost
- Requires surgical procedure
- Longer treatment timeline

## Dental Bridges

A dental bridge literally "bridges" the gap created by missing teeth using crowns on adjacent teeth to support a replacement tooth.

### Advantages:
- **Faster treatment**: Can be completed in 2-3 weeks
- **Lower upfront cost**: Less expensive initially
- **No surgery required**: Non-invasive procedure
- **Proven track record**: Well-established treatment

### Considerations:
- Requires altering healthy adjacent teeth
- May need replacement every 10-15 years
- More difficult to clean

## Making the Right Choice

The best option depends on your specific situation, including:
- Overall oral health
- Bone density and gum health
- Budget considerations
- Time constraints
- Long-term goals

Consult with our dental team to determine which option is best for your unique situation.`,
    coverImageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfdb7ee46c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['implants', 'bridges', 'tooth-replacement'],
    publishedAt: new Date('2024-01-15'),
    isPublished: true,
  },
  {
    title: 'Complete Guide to Clear Aligners',
    slug: 'complete-guide-clear-aligners',
    excerpt: 'Everything you need to know about clear aligners, from how they work to maintenance tips.',
    content: `# Complete Guide to Clear Aligners

Clear aligners have revolutionized orthodontic treatment, offering a nearly invisible way to straighten teeth. Here's everything you need to know.

## What are Clear Aligners?

Clear aligners are custom-made, removable trays that gradually move your teeth into the desired position. They're made from smooth, comfortable plastic that's virtually invisible when worn.

## How Do They Work?

1. **Digital scanning**: We create a 3D model of your teeth
2. **Treatment planning**: Computer software maps out your treatment
3. **Custom aligners**: A series of aligners are created for your treatment
4. **Progressive movement**: Each aligner moves your teeth slightly
5. **Regular changes**: You switch to a new aligner every 1-2 weeks

## Benefits of Clear Aligners

- **Nearly invisible**: Most people won't notice you're wearing them
- **Removable**: Take them out for eating, drinking, and special occasions
- **Comfortable**: No metal brackets or wires
- **Easy maintenance**: Simple to clean and maintain
- **Predictable results**: Digital treatment planning shows expected outcomes

## Treatment Process

### Initial Consultation
- Comprehensive examination
- Digital impressions or scans
- Treatment planning and timeline discussion

### Active Treatment
- Wearing aligners 20-22 hours per day
- Changing aligners as directed
- Regular check-ups every 6-8 weeks

### Retention Phase
- Wearing retainers to maintain results
- Long-term follow-up care

## Care and Maintenance

- Clean aligners daily with lukewarm water
- Brush and floss before reinserting
- Store in provided case when not wearing
- Avoid hot liquids while wearing aligners

## Who is a Good Candidate?

Clear aligners can treat:
- Crowded teeth
- Gaps between teeth
- Overbite and underbite
- Crossbite
- Open bite

However, severe cases may require traditional braces or additional treatments.

Ready to start your clear aligner journey? Contact us for a consultation!`,
    coverImageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['invisalign', 'orthodontics', 'clear-aligners'],
    publishedAt: new Date('2024-02-01'),
    isPublished: true,
  },
  {
    title: 'Sensitive Teeth: What Helps and When to See a Doctor',
    slug: 'sensitive-teeth-causes-treatment',
    excerpt: 'Understanding tooth sensitivity, its causes, and effective treatment options available.',
    content: `# Sensitive Teeth: What Helps and When to See a Doctor

Tooth sensitivity is a common dental problem that can significantly impact your quality of life. Understanding its causes and treatment options can help you find relief.

## What is Tooth Sensitivity?

Tooth sensitivity occurs when the underlying layer of your teeth (dentin) becomes exposed. This can happen when the protective enamel is worn down or when gums recede.

## Common Causes

### Enamel Erosion
- Acidic foods and drinks
- Aggressive brushing
- Teeth grinding (bruxism)
- Age-related wear

### Gum Recession
- Gum disease
- Aggressive brushing
- Genetics
- Age

### Dental Procedures
- Recent dental work
- Teeth whitening
- Deep cleaning

### Dental Problems
- Cracked or chipped teeth
- Worn fillings
- Cavities

## Symptoms

- Sharp, sudden pain when exposed to:
  - Hot or cold foods/drinks
  - Sweet or acidic foods
  - Cold air
  - Brushing or flossing

## At-Home Remedies

### Use Desensitizing Toothpaste
- Contains compounds that block pain signals
- Use regularly for best results
- Look for ADA-approved brands

### Practice Good Oral Hygiene
- Use a soft-bristled toothbrush
- Brush gently in circular motions
- Floss daily but be gentle

### Avoid Triggers
- Limit acidic foods and drinks
- Use a straw for cold beverages
- Don't brush immediately after eating acidic foods

### Try Natural Remedies
- Salt water rinse
- Green tea mouth rinse
- Coconut oil pulling

## Professional Treatments

### In-Office Options
- Fluoride applications
- Desensitizing agents
- Dental bonding
- Gum grafts for severe recession

### Prescription Options
- High-fluoride toothpaste
- Prescription mouth rinses
- Custom night guards for grinding

## When to See a Dentist

Contact us if you experience:
- Persistent sensitivity despite using desensitizing products
- Severe pain that interferes with daily activities
- Sensitivity in one specific tooth
- Signs of infection (swelling, fever)
- Changes in sensitivity patterns

## Prevention Tips

- Use fluoride toothpaste and mouthwash
- Avoid excessive teeth whitening
- Treat teeth grinding with a night guard
- Regular dental check-ups and cleanings
- Maintain a balanced diet low in acidic foods

Don't let tooth sensitivity control your life. Our team can help identify the cause and develop an effective treatment plan tailored to your needs.`,
    coverImageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['sensitivity', 'dental-care', 'oral-health'],
    publishedAt: new Date('2024-02-15'),
    isPublished: true,
  },
]

// Gallery assets data
export const galleryData = [
  {
    filename: 'smile-1.jpg',
    url: 'https://images.unsplash.com/photo-1445053023192-8d45cb66099d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'image',
    alt: 'Beautiful smile transformation',
  },
  {
    filename: 'smile-2.jpg',
    url: 'https://images.unsplash.com/photo-1606811841689-23dfdb7ee46c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'image',
    alt: 'Perfect dental alignment',
  },
  {
    filename: 'treatment-1.jpg',
    url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'image',
    alt: 'Modern dental treatment',
  },
  {
    filename: 'office-1.jpg',
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'image',
    alt: 'Modern dental office',
  },
  {
    filename: 'equipment-1.jpg',
    url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'image',
    alt: 'Advanced dental equipment',
  },
  {
    filename: 'team-1.jpg',
    url: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    type: 'image',
    alt: 'Professional dental team',
  },
]