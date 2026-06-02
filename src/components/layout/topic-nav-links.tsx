"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type TopicNavItem = {
  label: string;
  href: string;
  query?: string;
};

type TopicNavLinksProps = {
  items: TopicNavItem[];
};

export function TopicNavLinks({ items }: TopicNavLinksProps) {
  const activeTopic = useSearchParams().get("topic");

  return (
    <>
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={
            activeTopic === item.query || (!activeTopic && item.label === "All")
              ? "nav-link-active py-3"
              : "nav-link py-3"
          }
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
