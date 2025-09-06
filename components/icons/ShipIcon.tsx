
import React from 'react';

const ShipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56v4.82a6 6 0 01-1.158 3.585l-1.32 1.32a6 6 0 01-8.49-8.49L9.63 9.63a6 6 0 013.585-1.158m2.37-1.043L15.59 14.37m-5.84-2.56L11.77 11.77m-1.043-2.37L15.59 14.37" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default ShipIcon;
