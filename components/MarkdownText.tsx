import { Link, routing } from "@/i18n/routing";
import ReactMarkdown from "react-markdown";

interface MarkdownTextProps {
  children: string;
  className?: string;
}

// Extract valid routes from the routing configuration
type ValidInternalRoute = keyof typeof routing.pathnames;

const isValidInternalRoute = (href: string): href is ValidInternalRoute => {
  return href in routing.pathnames;
};

export default function MarkdownText({
  children,
  className,
}: MarkdownTextProps) {
  return (
    <ReactMarkdown
      className={className}
      components={{
        a: ({ href, children }) => {
          if (!href) return null;

          // Check if the link is external
          const isExternal = /^https?:\/\//.test(href);

          if (isExternal) {
            return (
              <a
                href={href}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          }

          // For internal links, check if it's a valid route
          if (isValidInternalRoute(href)) {
            return (
              <Link
                href={href as ValidInternalRoute}
                className="text-blue-600 hover:underline"
              >
                {children}
              </Link>
            );
          }

          // For unknown internal routes, use regular anchor tag
          return (
            <a href={href} className="text-blue-600 hover:underline">
              {children}
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
