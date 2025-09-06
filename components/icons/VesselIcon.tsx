
import React from 'react';

const VesselIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.012 11.25a.75.75 0 010-1.5h17.976a.75.75 0 010 1.5H3.012zm.482 4.5a.75.75 0 010-1.5h17.012a.75.75 0 010 1.5H3.494zm7.01-9a.75.75 0 00-.75.75v10.5a.75.75 0 001.5 0V7.5a.75.75 0 00-.75-.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8.25 8.25 0 005.25-15.655.25.25 0 00-.25-.245H6.999a.25.25 0 00-.25.245A8.25 8.25 0 0012 21z" />
  </svg>
);

export default VesselIcon;
