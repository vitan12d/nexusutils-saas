// صندوق يعرض رابط بث رسمي نشط لمباراة معينة
export default function StreamLink({ stream }) {
  if (!stream) return null;
  return (
    <a href={stream.url} target="_blank" rel="noopener noreferrer nofollow" className="stream-box">
      <span className="badge-live">مباشر الآن</span>
      <span className="stream-box-text">
        شاهد عبر <strong>{stream.channel}</strong>
      </span>
      <span className="stream-box-go">فتح الرابط ←</span>
    </a>
  );
}
