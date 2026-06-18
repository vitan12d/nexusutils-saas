import { getVideos } from '../../lib/content';

export const metadata = { title: 'فيديو' };
export const revalidate = 60;

export default async function VideosPage() {
  const items = await getVideos('ar');
  return (
    <>
      <h1 className="section-title">فيديو</h1>
      {items.length === 0 && <div className="empty">لا توجد مقاطع بعد.</div>}
      <div className="grid">
        {items.map((v) => (
          <div key={v.slug || v.id} className="match-card">
            <h3 className="card-title">{v.title}</h3>
            {v.youtubeId ? (
              <div className="video-embed">
                <iframe
                  src={`https://www.youtube.com/embed/${v.youtubeId}`}
                  title={v.title}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : <p className="card-excerpt">{v.excerpt}</p>}
          </div>
        ))}
      </div>
    </>
  );
}
