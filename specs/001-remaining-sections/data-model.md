# Data Model: Remaining Homepage Sections

Since the data is statically hardcoded locally, this document defines the expected shape of the JavaScript object arrays used within the components.

## Trainers Array

```typescript
type Trainer = {
  id: string;
  name: string;
  specialty: string;
  image: string;       // URL to high-quality image
  statistic: string;   // e.g., "10+ Years Exp", "Olympic Coach"
  quote: string;       // Short motivational quote
}
```

## Testimonials Array

```typescript
type Testimonial = {
  id: string;
  author: string;
  duration: string;    // e.g., "Member since 2021"
  text: string;        // The review content
  rating: number;      // 1-5 scale (defaults to 5)
}
```

## Gallery Assets Array

```typescript
type GalleryAsset = {
  id: string;
  url: string;         // URL to high-res image
  alt: string;         // Descriptive alt text for accessibility
  aspectRatio: string; // 'square', 'portrait', or 'landscape' for masonry/grid layout styling
}
```
