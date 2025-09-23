import { useEffect, useRef } from 'react';

interface TwitterEmbedProps {
  tweetUrl: string;
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export function TwitterEmbed({ tweetUrl }: TwitterEmbedProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && window.twttr) {
      ref.current.innerHTML = '';
      
      const blockquote = document.createElement('blockquote');
      blockquote.className = 'twitter-tweet';
      blockquote.setAttribute('data-width', '350'); 
      blockquote.setAttribute('data-theme', 'light');
      blockquote.innerHTML = `<a href="${tweetUrl.replace('x.com', 'twitter.com')}"></a>`;
      blockquote.setAttribute('data-width', '300'); 
      blockquote.setAttribute('data-cards', 'visible');
      
      ref.current.appendChild(blockquote);
      window.twttr.widgets.load(ref.current);
    }
  }, [tweetUrl]);

  return <div ref={ref} className="max-w-sm"></div>; 
}