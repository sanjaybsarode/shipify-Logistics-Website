import React from 'react';

const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 100 50"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#F97316" />   {/* Orange-600 */}
        <stop offset="15%" stopColor="#FBBF24" /> {/* Amber-400 */}
        <stop offset="35%" stopColor="#84CC16" /> {/* Lime-500 */}
        <stop offset="50%" stopColor="#10B981" /> {/* Emerald-500 */}
        <stop offset="65%" stopColor="#0EA5E9" /> {/* Sky-500 */}
        <stop offset="80%" stopColor="#8B5CF6" /> {/* Violet-500 */}
        <stop offset="100%" stopColor="#EC4899" />{/* Pink-500 */}
      </linearGradient>

      {/* Define the paths for the two loops */}
      <path
        id="right-loop-path"
        d="M 50,25 C 65,5 85,5 75,25 C 85,45 65,45 50,25"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="left-loop-path"
        d="M 50,25 C 35,5 15,5 25,25 C 15,45 35,45 50,25"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </defs>

    {/* Render the right loop first (so it's "under" at the crossover) */}
    {/* Shadow for 3D effect */}
    <use href="#right-loop-path" stroke="rgba(0,0,0,0.1)" strokeWidth="11" transform="translate(0, 0.75)"/>
    {/* Main gradient body */}
    <use href="#right-loop-path" stroke="url(#logo-gradient)" strokeWidth="10" />

    {/* Render the left loop second (so it's "over" at the crossover) */}
    {/* Shadow for 3D effect */}
    <use href="#left-loop-path" stroke="rgba(0,0,0,0.1)" strokeWidth="11" transform="translate(0, 0.75)"/>
    {/* Main gradient body */}
    <use href="#left-loop-path" stroke="url(#logo-gradient)" strokeWidth="10" />

    {/* Inner shadows and highlights to create the ribbon twist effect */}
    
    {/* Inner shadow on the bottom-right curve */}
    <path
      d="M 75,25 C 85,45 65,45 50,25"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="rgba(0,0,0,0.15)"
      strokeWidth="4"
    />
    
    {/* Inner shadow on the top-left curve (where it goes "under") */}
    <path
      d="M 50,25 C 35,5 15,5 25,25"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="rgba(0,0,0,0.15)"
      strokeWidth="4"
    />

    {/* Inner highlight on the top-right curve */}
    <path
      d="M 50,25 C 65,5 85,5 75,25"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="rgba(255,255,255,0.5)"
      strokeWidth="1.5"
    />

    {/* Inner highlight on the bottom-left curve (where it's on "top") */}
    <path
      d="M 25,25 C 15,45 35,45 50,25"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="rgba(255,255,255,0.5)"
      strokeWidth="1.5"
    />
  </svg>
);

export default Logo;
