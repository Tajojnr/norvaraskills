"use client";

import { useEffect, useRef } from "react";

type YouTubePlayerInstance = {
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};

type YouTubeEvent = {
  data: number;
  target: YouTubePlayerInstance;
};

type YouTubePlayerOptions = {
  host?: string;
  playerVars?: Record<string, number | string>;
  events: {
    onReady: (event: YouTubeEvent) => void;
    onStateChange: (event: YouTubeEvent) => void;
    onError: () => void;
  };
};

declare global {
  interface Window {
    YT?: {
      Player: new (element: HTMLElement, options: YouTubePlayerOptions) => YouTubePlayerInstance;
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<void> | undefined;

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve();
  if (!youtubeApiPromise) {
    youtubeApiPromise = new Promise<void>((resolve, reject) => {
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousCallback?.();
        resolve();
      };

      const existingScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://www.youtube.com/iframe_api"]',
      );
      if (existingScript) {
        existingScript.addEventListener("error", () => reject(new Error("YouTube player failed to load.")), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.onerror = () => reject(new Error("YouTube player failed to load."));
      document.head.appendChild(script);
    });
  }
  return youtubeApiPromise;
}

export function getYouTubeVideoId(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    if (host !== "youtube.com" && host !== "m.youtube.com" && host !== "youtu.be" && host !== "youtube-nocookie.com") {
      return null;
    }

    const parts = url.pathname.split("/").filter(Boolean);
    const id = host === "youtu.be"
      ? parts[0]
      : url.searchParams.get("v") ?? (["embed", "shorts", "live"].includes(parts[0] ?? "") ? parts[1] : null);

    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export default function YouTubePlayer({
  videoId,
  onProgress,
  onEnded,
  onError,
}: {
  videoId: string;
  onProgress: (percent: number) => void;
  onEnded: () => void;
  onError: () => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const onProgressRef = useRef(onProgress);
  const onEndedRef = useRef(onEnded);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onProgressRef.current = onProgress;
    onEndedRef.current = onEnded;
    onErrorRef.current = onError;
  }, [onProgress, onEnded, onError]);

  useEffect(() => {
    let active = true;
    let player: YouTubePlayerInstance | undefined;
    let progressTimer: ReturnType<typeof setInterval> | undefined;

    loadYouTubeApi().then(() => {
      if (!active || !mountRef.current || !window.YT) return;

      player = new window.YT.Player(mountRef.current, {
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          enablejsapi: 1,
          origin: window.location.origin,
          rel: 0,
        },
        events: {
          onReady: () => undefined,
          onStateChange: (event) => {
            if (event.data === window.YT?.PlayerState.PLAYING && !progressTimer) {
              const reportProgress = () => {
                const duration = event.target.getDuration();
                if (duration > 0) {
                  onProgressRef.current(Math.min(99, Math.floor((event.target.getCurrentTime() / duration) * 100)));
                }
              };
              progressTimer = setInterval(reportProgress, 10000);
            }
            if (event.data === window.YT?.PlayerState.PAUSED && progressTimer) {
              clearInterval(progressTimer);
              progressTimer = undefined;
            }
            if (event.data === window.YT?.PlayerState.ENDED) {
              if (progressTimer) clearInterval(progressTimer);
              progressTimer = undefined;
              onEndedRef.current();
            }
          },
          onError: () => onErrorRef.current(),
        },
      });
    }).catch(() => {
      if (active) onErrorRef.current();
    });

    return () => {
      active = false;
      if (progressTimer) clearInterval(progressTimer);
      player?.destroy();
    };
  }, [videoId]);

  return <div ref={mountRef} className="aspect-video w-full overflow-hidden rounded-2xl bg-black" />;
}
