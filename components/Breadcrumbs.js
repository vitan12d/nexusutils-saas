import Link from 'next/link';
import { breadcrumbSchema, JsonLd } from '../lib/schema';

export default function Breadcrumbs({ crumbs }) {
  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      {crumbs.map((c, i) => (
        <span key={c.path}>
          {i > 0 && <span className="sep">/</span>}
          {i < crumbs.length - 1
            ? <Link href={c.path}>{c.name}</Link>
            : <span className="current">{c.name}</span>}
        </span>
      ))}
    </nav>
  );
}
