import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, BookOpen, Building2, GraduationCap, LockKeyhole, Mail, ShieldCheck,
} from "lucide-react";

const portals = [
  {
    id: "administrator",
    title: "Administrator",
    description: "Manage campus operations, spaces, schedules, and approvals.",
    icon: ShieldCheck,
    detail: "Campus operations",
  },
  {
    id: "teacher",
    title: "Teacher",
    description: "View your teaching schedule, classes, and room assignments.",
    icon: BookOpen,
    detail: "Faculty workspace",
  },
  {
    id: "student",
    title: "Student",
    description: "Check your timetable, exams, and campus announcements.",
    icon: GraduationCap,
    detail: "Student portal",
  },
];

export default function Login() {
  const { role: roleId } = useParams();
  const navigate = useNavigate();
  const role = portals.find((portal) => portal.id === roleId);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!role) return;

    sessionStorage.setItem("campusOSSession", JSON.stringify({
      role: role.id,
      name: identifier.trim(),
    }));
    navigate("/", { replace: true });
  }

  return (
    <main className="login-page">
      <section className="login-story">
        <Link to="/login" className="login-brand">
          <span className="login-brand-mark"><Building2 size={19} /></span>
          <span>Campus<span>OS</span></span>
        </Link>
        <div className="login-story-copy">
          <span className="login-overline">NORTHFIELD INSTITUTE</span>
          <h1>One campus.<br />Your space to thrive.</h1>
          <p>A connected home for the people, places, and plans that keep campus moving.</p>
        </div>
        <div className="login-story-art" aria-hidden="true">
          <div className="login-art-orbit orbit-one" />
          <div className="login-art-orbit orbit-two" />
          <div className="login-art-core"><Building2 size={34} /></div>
          <span className="login-art-node node-one"><BookOpen size={17} /></span>
          <span className="login-art-node node-two"><GraduationCap size={18} /></span>
          <span className="login-art-node node-three"><ShieldCheck size={16} /></span>
        </div>
        <div className="login-story-footer"><span>Campus operations suite</span><span>01 / 03</span></div>
      </section>

      <section className="login-panel">
        <div className="login-panel-inner">
          {!role ? (
            <>
              <span className="login-overline">WELCOME BACK</span>
              <h2>Choose your portal</h2>
              <p className="login-intro">Select your account type to continue to the right workspace.</p>
              <div className="portal-list">
                {portals.map(({ id, title, description, icon: Icon, detail }) => (
                  <Link to={`/login/${id}`} className="portal-option" key={id}>
                    <span className={`portal-icon portal-${id}`}><Icon size={20} /></span>
                    <span className="portal-copy">
                      <b>{title}</b>
                      <small>{description}</small>
                    </span>
                    <span className="portal-detail">{detail}</span>
                    <ArrowRight className="portal-arrow" size={17} />
                  </Link>
                ))}
              </div>
              <p className="login-footnote"><LockKeyhole size={14} /> Your portal determines which workspace you enter.</p>
            </>
          ) : (
            <>
              <Link to="/login" className="login-back"><ArrowLeft size={15} /> All portals</Link>
              <span className="login-overline">{role.detail.toUpperCase()}</span>
              <h2>{role.title} sign in</h2>
              <p className="login-intro">Use your Northfield Institute account to continue.</p>
              <form className="login-form" onSubmit={handleSubmit}>
                <label>
                  <span>{role.id === "student" ? "Student ID" : role.id === "teacher" ? "Faculty email" : "Administrator email"}</span>
                  <span className="login-input-wrap">
                    {role.id === "student" ? <GraduationCap size={17} /> : <Mail size={17} />}
                    <input
                      autoComplete={role.id === "student" ? "username" : "email"}
                      type={role.id === "student" ? "text" : "email"}
                      placeholder={role.id === "student" ? "e.g. NF20260124" : `name@northfield.edu`}
                      value={identifier}
                      onChange={(event) => setIdentifier(event.target.value)}
                      required
                    />
                  </span>
                </label>
                <label>
                  <span>Password</span>
                  <span className="login-input-wrap">
                    <LockKeyhole size={17} />
                    <input
                      autoComplete="current-password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />
                  </span>
                </label>
                <button className="login-submit" type="submit">Continue to {role.title.toLowerCase()} portal <ArrowRight size={16} /></button>
              </form>
              <p className="login-demo-note">Prototype sign-in only. Credentials are not verified or sent to a server.</p>
              <Link to="/login" className="login-switch">Use a different portal</Link>
            </>
          )}
          <div className="login-legal">Need access help? Contact your campus administrator.</div>
        </div>
      </section>
    </main>
  );
}
