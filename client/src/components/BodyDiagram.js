// src/components/BodyDiagram.js
import React from "react";

function BodyDiagram({ bodyParts, painLevels, onClickPart }) {
  const getFillColor = (partKey) => {
    const painLevel = painLevels[partKey] || 0;
    if (painLevel === 0) {
      return "#9CA3AF"; // gray
    }
    const alpha = 0.1 + 0.9 * (painLevel / 10);
    return `rgba(255, 0, 0, ${alpha})`;
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <svg
        viewBox="0 0 160 260"
        preserveAspectRatio="xMidYMid meet"
        className="block w-full h-auto"
      >
        {bodyParts.map(({ key, path }) => (
          <path
            key={key}
            d={path}
            fill={getFillColor(key)}
            stroke="#fff"
            strokeWidth="2"
            tabIndex="0"
            aria-label={`Select ${key} for pain level`}
            className="cursor-pointer hover:opacity-75"
            onClick={() => onClickPart(key)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onClickPart(key);
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default BodyDiagram;