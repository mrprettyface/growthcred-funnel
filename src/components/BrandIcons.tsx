/**
 * Channel logos for contact buttons: WhatsApp, iMessage, LinkedIn, email and
 * YouTube. Drawn inline (no library, nothing added to the bundle) in each
 * brand's own colour, so a visitor finds the channel they want at a glance.
 * The email mark is the one line icon: it takes currentColor, because email
 * has no brand colour of its own.
 *
 * Decorative: the button text names the channel, so every icon is aria-hidden.
 */

export type Brand = "whatsapp" | "imessage" | "linkedin" | "email" | "youtube";

export function BrandIcon({ name, className = "h-5 w-5" }: { name: Brand; className?: string }) {
  const common = { viewBox: "0 0 24 24", "aria-hidden": true, focusable: false, className: `shrink-0 ${className}` } as const;
  switch (name) {
    case "whatsapp":
      return (
        <svg {...common}>
          <path fill="#25D366" d="M12 1.5a10.5 10.5 0 0 0-9.1 15.7L1.5 22.5l5.4-1.4A10.5 10.5 0 1 0 12 1.5Z" />
          <path
            fill="#fff"
            d="M8.1 6.4c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.2.2 2.3 3.6 5.6 4.9 2.8 1.1 3.3.9 3.9.8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.1-.3-.2-.7-.4l-2.2-1.1c-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2.1-.4 0-.6l-1-2.3Z"
          />
        </svg>
      );
    case "imessage":
      return (
        <svg {...common}>
          <rect width="24" height="24" rx="5.5" fill="#34C759" />
          <path fill="#fff" d="M12 5c-4.1 0-7.5 2.8-7.5 6.2 0 1.9 1 3.6 2.7 4.8-.1 1-.6 2-1.4 2.8 1.6-.1 3-.7 4-1.5.7.1 1.4.2 2.2.2 4.1 0 7.5-2.8 7.5-6.2S16.1 5 12 5Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect width="24" height="24" rx="4" fill="#0A66C2" />
          <circle cx="7.3" cy="7.2" r="1.6" fill="#fff" />
          <rect x="5.9" y="9.6" width="2.8" height="8.4" fill="#fff" />
          <path fill="#fff" d="M10.8 9.6h2.7v1.2c.4-.7 1.4-1.4 2.8-1.4 2.3 0 3.3 1.4 3.3 3.9V18h-2.8v-4.2c0-1.1-.3-1.9-1.4-1.9-1 0-1.8.8-1.8 2V18h-2.8V9.6Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="#FF0000" />
          <path fill="#fff" d="m9.8 8.6 5.8 3.4-5.8 3.4V8.6Z" />
        </svg>
      );
    case "email":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
  }
}
