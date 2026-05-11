import { motion } from 'framer-motion';

interface GlassHeartPreviewProps {
  photoUrl?: string;
  name?: string;
  dateRange?: string;
  quote?: string;
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

export default function GlassHeartPreview({
  photoUrl,
  name = 'Naam',
  dateRange = '1940 – 2024',
  quote = 'Voor altijd in ons hart.',
  size = 'medium',
  animated = true,
}: GlassHeartPreviewProps) {
  const sizeClasses = {
    small: 'w-48 h-48',
    medium: 'w-64 h-64',
    large: 'w-80 h-80',
  };

  return (
    <motion.div
      animate={animated ? { y: [0, -8, 0] } : undefined}
      transition={animated ? { duration: 6, repeat: Infinity, ease: 'easeInOut' } : undefined}
      className="relative flex items-center justify-center"
    >
      {/* Outer glow */}
      <div
        className={`absolute ${sizeClasses[size]} rounded-full opacity-20 blur-3xl bg-gold-gradient`}
      />

      {/* Heart SVG shape */}
      <div className={`relative ${sizeClasses[size]}`}>
        <svg viewBox="0 0 200 185" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_8px_40px_rgba(201,168,106,0.3)]">
          <defs>
            <clipPath id="heartClip">
              <path d="M100 170 C100 170 10 115 10 60 C10 32 30 10 58 10 C74 10 88 18 100 30 C112 18 126 10 142 10 C170 10 190 32 190 60 C190 115 100 170 100 170Z" />
            </clipPath>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,253,248,0.95)" />
              <stop offset="40%" stopColor="rgba(247,241,232,0.85)" />
              <stop offset="100%" stopColor="rgba(232,216,195,0.9)" />
            </linearGradient>
            <linearGradient id="shineGrad" x1="0%" y1="0%" x2="60%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D6B98C" />
              <stop offset="50%" stopColor="#C9A86A" />
              <stop offset="100%" stopColor="#A68B6B" />
            </linearGradient>
            <filter id="engraveFilter">
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.7" />
              </feComponentTransfer>
            </filter>
          </defs>

          {/* Glass fill */}
          <path
            d="M100 170 C100 170 10 115 10 60 C10 32 30 10 58 10 C74 10 88 18 100 30 C112 18 126 10 142 10 C170 10 190 32 190 60 C190 115 100 170 100 170Z"
            fill="url(#glassGrad)"
            stroke="url(#goldBorder)"
            strokeWidth="1.5"
          />

          {/* Photo layer */}
          {photoUrl && (
            <image
              href={photoUrl}
              x="10"
              y="10"
              width="180"
              height="160"
              clipPath="url(#heartClip)"
              filter="url(#engraveFilter)"
              preserveAspectRatio="xMidYMid slice"
              opacity="0.55"
            />
          )}

          {/* Shine overlay */}
          <path
            d="M100 170 C100 170 10 115 10 60 C10 32 30 10 58 10 C74 10 88 18 100 30 C112 18 126 10 142 10 C170 10 190 32 190 60 C190 115 100 170 100 170Z"
            fill="url(#shineGrad)"
          />

          {/* Reflection line top-left */}
          <path
            d="M40 30 Q55 22 70 28"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Engraved text */}
          {name && (
            <text
              x="100"
              y="115"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, serif"
              fontSize="16"
              fill="rgba(35,35,35,0.7)"
              fontWeight="500"
            >
              {name}
            </text>
          )}
          {dateRange && (
            <text
              x="100"
              y="133"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              fontSize="9"
              fill="rgba(35,35,35,0.5)"
              letterSpacing="1"
            >
              {dateRange}
            </text>
          )}
          {quote && (
            <text
              x="100"
              y="150"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, serif"
              fontSize="8"
              fontStyle="italic"
              fill="rgba(166,139,107,0.8)"
            >
              {quote.length > 28 ? quote.substring(0, 28) + '…' : quote}
            </text>
          )}
        </svg>
      </div>
    </motion.div>
  );
}
