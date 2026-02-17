import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'GoRent - Platform Rental Kendaraan On-Demand Se-Indonesia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #10b981, #059669, #10b981)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          {/* Logo text */}
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              letterSpacing: '-2px',
            }}
          >
            <span style={{ fontWeight: 800, color: '#10b981' }}>Go</span>
            <span style={{ fontWeight: 500, color: '#ffffff' }}>Rent</span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              color: '#94a3b8',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Platform Rental On-Demand
          </div>

          {/* Divider */}
          <div
            style={{
              width: 80,
              height: 3,
              background: '#10b981',
              borderRadius: 4,
              marginTop: 8,
              marginBottom: 8,
            }}
          />

          {/* Features */}
          <div
            style={{
              display: 'flex',
              gap: 40,
              fontSize: 20,
              color: '#cbd5e1',
            }}
          >
            <span>10+ Kota</span>
            <span style={{ color: '#10b981' }}>•</span>
            <span>Armada Modern</span>
            <span style={{ color: '#10b981' }}>•</span>
            <span>Driver Profesional</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 18,
            color: '#64748b',
          }}
        >
          gorent.id
        </div>
      </div>
    ),
    { ...size },
  );
}
