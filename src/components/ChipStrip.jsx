import React from 'react';

const CHIPS = [
  'Fresh Projects',
  'Commercial',
  'Residential',
  'Rentals',
  'Plots',
  'Investments',
];

// Duplicate 4× for a seamless loop
const TRACK = [...CHIPS, ...CHIPS, ...CHIPS, ...CHIPS];

function Chip({ label, style = {} }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium flex-shrink-0 mr-3"
      style={{
        background: '#fff',
        border: '1px solid #2d6a4f',
        color: '#1a3a2e',
        ...style,
      }}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: '#2d6a4f' }}
      />
      {label}
    </span>
  );
}

export default function ChipStrip({ mintBg = false }) {
  return (
    <div
      style={{
        background: mintBg ? '#e8f5ee' : '#fdfaf5',
        borderTop: '1px solid #c8ddd0',
        borderBottom: '1px solid #c8ddd0',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        position: 'relative',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      }}
    >
      <div className="chip-track">
        {TRACK.map((chip, i) => (
          <Chip
            key={i}
            label={chip}
            style={mintBg ? { background: '#d4eadb', border: '1px solid #c8ddd0', color: '#1a3a2e' } : {}}
          />
        ))}
      </div>
    </div>
  );
}
