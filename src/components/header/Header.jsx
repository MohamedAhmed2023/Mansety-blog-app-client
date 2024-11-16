import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-titles">
          <h1 className="header-title-lg">مرحبًا بك في منصتي لرفع المقالات</h1>
          <p className="header-description">
            منصة تتيح للصحفيين رفع مقالاتهم ومشاركتها مع العالم. استكشف المقالات
            الأخيرة وابدأ في الكتابة!
          </p>
        </div>
      </div>
    </header>
  );
}
