import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';

export type CarouselSlideProps = {
  slideNumber: 1 | 2 | 3 | 4 | 5 | 6;
  backgroundImage?: string;
};

// Slide content based on DEVI-24HOUR-POSTING-GUIDE.md Template 2
const slideContent = {
  1: {
    title: "Most trusted personal",
    subtitle: "development platform",
    detail: "(according to data)"
  },
  2: {
    title: "Mindvalley",
    rating: "⭐ 4.1/5",
    reviews: "(9,808 verified reviews)"
  },
  3: {
    title: "What experts say:",
    quote: '"Life-changing curriculum"',
    attribution: "- verified users"
  },
  4: {
    title: "Why it's trending:",
    detail: "Featured on 50+ podcasts in 2026"
  },
  5: {
    title: "30-day money-back guarantee",
    subtitle: "Expert instructors"
  },
  6: {
    title: "Full analysis",
    cta: "→ link in bio"
  }
};

export const MindvalleyCarousel: React.FC<CarouselSlideProps> = ({
  slideNumber,
  backgroundImage
}) => {
  const content = slideContent[slideNumber];

  // Default background images from public/images
  const defaultBackgrounds = {
    1: "images/slide1.png",
    2: "images/slide2.webp",
    3: "images/slide3.webp",
    4: "images/slide4.webp",
    5: "images/slide5.webp",
    6: "images/slide6.webp"
  };

  const bgImage = backgroundImage || defaultBackgrounds[slideNumber];

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Background Image with Overlay */}
      <AbsoluteFill>
        <Img
          src={staticFile(bgImage)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.4
          }}
        />
        {/* Dark gradient overlay for text readability */}
        <AbsoluteFill
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)'
          }}
        />
      </AbsoluteFill>

      {/* Content Container */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 80,
          textAlign: 'center'
        }}
      >
        {/* Slide 1: Title */}
        {slideNumber === 1 && (
          <>
            <div style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.2,
              marginBottom: 20,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              {content.title}
            </div>
            <div style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.2,
              marginBottom: 30,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              {content.subtitle}
            </div>
            <div style={{
              fontSize: 42,
              fontWeight: 400,
              color: '#ddd',
              fontStyle: 'italic',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}>
              {content.detail}
            </div>
          </>
        )}

        {/* Slide 2: Rating */}
        {slideNumber === 2 && (
          <>
            <div style={{
              fontSize: 80,
              fontWeight: 800,
              color: '#fff',
              marginBottom: 40,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              {content.title}
            </div>
            <div style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#FFD700',
              marginBottom: 20,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              {content.rating}
            </div>
            <div style={{
              fontSize: 38,
              fontWeight: 400,
              color: '#ddd',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}>
              {content.reviews}
            </div>
          </>
        )}

        {/* Slide 3: Quote */}
        {slideNumber === 3 && (
          <>
            <div style={{
              fontSize: 52,
              fontWeight: 600,
              color: '#fff',
              marginBottom: 50,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              {content.title}
            </div>
            <div style={{
              fontSize: 56,
              fontWeight: 300,
              color: '#fff',
              fontStyle: 'italic',
              marginBottom: 30,
              lineHeight: 1.4,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              {content.quote}
            </div>
            <div style={{
              fontSize: 36,
              fontWeight: 400,
              color: '#ddd',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}>
              {content.attribution}
            </div>
          </>
        )}

        {/* Slide 4: Trending */}
        {slideNumber === 4 && (
          <>
            <div style={{
              fontSize: 58,
              fontWeight: 700,
              color: '#fff',
              marginBottom: 50,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              {content.title}
            </div>
            <div style={{
              fontSize: 48,
              fontWeight: 500,
              color: '#fff',
              lineHeight: 1.4,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              {content.detail}
            </div>
          </>
        )}

        {/* Slide 5: Guarantees */}
        {slideNumber === 5 && (
          <>
            <div style={{
              fontSize: 58,
              fontWeight: 700,
              color: '#fff',
              marginBottom: 50,
              lineHeight: 1.3,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              {content.title}
            </div>
            <div style={{
              fontSize: 52,
              fontWeight: 500,
              color: '#ddd',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}>
              • {content.subtitle}
            </div>
          </>
        )}

        {/* Slide 6: CTA */}
        {slideNumber === 6 && (
          <>
            <div style={{
              fontSize: 68,
              fontWeight: 700,
              color: '#fff',
              marginBottom: 50,
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              {content.title}
            </div>
            <div style={{
              fontSize: 56,
              fontWeight: 600,
              color: '#FFD700',
              textShadow: '0 4px 20px rgba(0,0,0,0.8)'
            }}>
              {content.cta}
            </div>
          </>
        )}

        {/* Branding Footer */}
        <div style={{
          position: 'absolute',
          bottom: 60,
          fontSize: 28,
          fontWeight: 400,
          color: '#bbb',
          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
        }}>
          Curated by Devi AI
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
