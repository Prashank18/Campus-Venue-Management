import { ArrowUpRight } from "lucide-react";

export default function StatCard({ label, value, change, icon: Icon, tone = "blue", detail }) {
  return <article className="stat-card">
    <div className="stat-top">
      <span>{label}</span>
      <span className={`stat-icon ${tone}`}><Icon size={17} /></span>
    </div>
    <div className="stat-number">{value}</div>
    <div className="stat-foot">
      <span className="trend"><ArrowUpRight size={14} />{change}</span>
      <span>{detail}</span>
    </div>
  </article>;
}
