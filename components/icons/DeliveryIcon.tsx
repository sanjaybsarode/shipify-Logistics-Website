import React from 'react';

const DeliveryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V9.75m1.5-4.5h13.5A2.25 2.25 0 0121 7.5v7.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V7.5a2.25 2.25 0 012.25-2.25m13.5-3H6.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export default DeliveryIcon;