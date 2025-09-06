
import React from 'react';

const ChatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.158 2.098.286 3.098.384v-1.631M2.25 12.76c0-1.6 1.123-2.994 2.707-3.227 1.068-.158 2.098-.286 3.098-.384v1.631M21.75 12.76c0 1.6-1.123 2.994-2.707 3.227-1.068.158-2.098.286-3.098.384v-1.631M21.75 12.76c0-1.6-1.123-2.994-2.707-3.227-1.068-.158-2.098-.286-3.098-.384v1.631m0 0A2.25 2.25 0 0113.5 13.5v.75a2.25 2.25 0 01-2.25 2.25H9a2.25 2.25 0 01-2.25-2.25v-.75a2.25 2.25 0 012.25-2.25h4.5z" />
    </svg>
);

export default ChatIcon;
