import { Link, routing } from "@/i18n/routing";
import ReactMarkdown, { type Components } from "react-markdown";

interface MarkdownTextProps {
  children: string;
  className?: string;
}

type ValidInternalRoute = keyof typeof routing.pathnames;

const isValidInternalRoute = (href: string): href is ValidInternalRoute => {
  return href in routing.pathnames;
};

const AnchorRenderer: NonNullable<Components["a"]> = ({ href, children }) => {
  if (!href) return null;

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

  return (
    <a href={href} className="text-blue-600 hover:underline">
      {children}
    </a>
  );
};

const MARKDOWN_COMPONENTS: Components = {
  a: AnchorRenderer,
};

export default function MarkdownText({
  children,
  className,
}: MarkdownTextProps) {
  return (
    <ReactMarkdown className={className} components={MARKDOWN_COMPONENTS}>
      {children}
    </ReactMarkdown>
  );
}
