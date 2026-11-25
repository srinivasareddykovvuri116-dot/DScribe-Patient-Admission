
import { Bell, CalendarDays } from "lucide-react";

export default function Header() {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="top-header">
      <div>
        <div className="breadcrumb">Workspace / Dashboard</div>
        <h1>Patient Dashboard</h1>
      </div>

      <div className="header-actions">
        <div className="header-date">
          <CalendarDays size={17} />
          <span>{today}</span>
        </div>

        <div className="header-profile">
          <div className="profile-avatar">A</div>
          <div className="profile-info">
            <strong>Administrator</strong>
            <span>Hospital Staff</span>
          </div>
        </div>
      </div>
    </header>
  );
}
