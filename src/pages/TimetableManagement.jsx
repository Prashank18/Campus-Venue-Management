import { useMemo, useState } from "react";
import {
  AlertTriangle, ArrowRight, CalendarDays, CheckCircle2, Clock3, Download, MapPin,
  Pencil, Plus, Sparkles, Trash2,
} from "lucide-react";
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField,
} from "@mui/material";
import PageTitle from "../components/PageHeader.jsx";

const branches = ["CSE", "ECE", "EEE", "Mechanical", "Civil"];
const years = ["First", "Second", "Third"];
const semesters = Array.from({ length: 6 }, (_, index) => `Semester ${index + 1}`);
const facultyMembers = [
  "Dr. Ananya Rao",
  "Dr. K. Suresh",
  "Dr. Meera Nair",
  "Prof. R. Prakash",
  "Dr. Lakshmi Devi",
  "Prof. V. Karthik",
];
const rooms = [
  "CC-201",
  "CC-204",
  "ECE-104",
  "EEE-203",
  "ME-202",
  "CE-301",
  "CSE Lab-1",
  "ECE Lab-2",
  "EEE Lab-1",
];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hours = Array.from({ length: 9 }, (_, index) => index + 8);

const initialSessions = [
  { id: "cit-cse-201", subject: "Data Structures & Algorithms", code: "CS201", branch: "CSE", year: "Second", section: "A", semester: "Semester 3", faculty: "Dr. Ananya Rao", room: "CC-201", type: "Lecture", day: "Monday", start: "10:00", end: "11:00" },
  { id: "cit-ece-conflict", subject: "Embedded Systems", code: "EC301", branch: "ECE", year: "Third", section: "A", semester: "Semester 5", faculty: "Dr. Ananya Rao", room: "ECE-104", type: "Lecture", day: "Monday", start: "10:00", end: "11:00" },
  { id: "cit-cse-204", subject: "Discrete Mathematics", code: "MA205", branch: "CSE", year: "Second", section: "A", semester: "Semester 3", faculty: "Dr. K. Suresh", room: "CC-204", type: "Tutorial", day: "Monday", start: "11:00", end: "12:00" },
  { id: "cit-cse-305", subject: "Database Systems", code: "CS305", branch: "CSE", year: "Third", section: "B", semester: "Semester 5", faculty: "Dr. Ananya Rao", room: "CSE Lab-1", type: "Practical lab", day: "Monday", start: "14:00", end: "16:00" },
  { id: "cit-ece-104", subject: "Circuit Theory", code: "EC201", branch: "ECE", year: "Second", section: "A", semester: "Semester 3", faculty: "Dr. Meera Nair", room: "ECE-104", type: "Lecture", day: "Tuesday", start: "09:00", end: "10:00" },
  { id: "cit-ece-220", subject: "Signals & Systems", code: "EC302", branch: "ECE", year: "Third", section: "A", semester: "Semester 5", faculty: "Dr. Meera Nair", room: "ECE-104", type: "Tutorial", day: "Tuesday", start: "10:00", end: "11:00" },
  { id: "cit-eee-203", subject: "Electrical Machines I", code: "EE203", branch: "EEE", year: "Second", section: "B", semester: "Semester 3", faculty: "Prof. V. Karthik", room: "EEE-203", type: "Lecture", day: "Tuesday", start: "14:00", end: "15:00" },
  { id: "cit-eee-conflict", subject: "Power Electronics", code: "EE305", branch: "EEE", year: "Third", section: "A", semester: "Semester 5", faculty: "Dr. Meera Nair", room: "EEE-203", type: "Tutorial", day: "Tuesday", start: "14:00", end: "15:00" },
  { id: "cit-me-202", subject: "Engineering Mechanics", code: "ME201", branch: "Mechanical", year: "Second", section: "A", semester: "Semester 3", faculty: "Prof. R. Prakash", room: "ME-202", type: "Lecture", day: "Wednesday", start: "09:00", end: "10:00" },
  { id: "cit-cse-303", subject: "Operating Systems", code: "CS303", branch: "CSE", year: "Third", section: "A", semester: "Semester 5", faculty: "Dr. K. Suresh", room: "CC-201", type: "Lecture", day: "Wednesday", start: "11:00", end: "12:00" },
  { id: "cit-cse-group-clash", subject: "Software Engineering Tutorial", code: "CS304T", branch: "CSE", year: "Third", section: "A", semester: "Semester 5", faculty: "Dr. Ananya Rao", room: "CC-204", type: "Tutorial", day: "Wednesday", start: "11:00", end: "12:00" },
  { id: "cit-civil-301", subject: "Reinforced Concrete Design", code: "CE301", branch: "Civil", year: "Third", section: "A", semester: "Semester 5", faculty: "Dr. Lakshmi Devi", room: "CE-301", type: "Lecture", day: "Thursday", start: "10:00", end: "11:00" },
  { id: "cit-ece-lab", subject: "Digital Electronics Lab", code: "EC205L", branch: "ECE", year: "Second", section: "B", semester: "Semester 3", faculty: "Dr. Meera Nair", room: "ECE Lab-2", type: "Practical lab", day: "Thursday", start: "14:00", end: "16:00" },
  { id: "cit-me-lab", subject: "Manufacturing Processes", code: "ME305L", branch: "Mechanical", year: "Third", section: "B", semester: "Semester 5", faculty: "Prof. R. Prakash", room: "ME-202", type: "Practical lab", day: "Friday", start: "09:00", end: "11:00" },
  { id: "cit-eee-tut", subject: "Power Systems", code: "EE302", branch: "EEE", year: "Third", section: "A", semester: "Semester 5", faculty: "Prof. V. Karthik", room: "EEE-203", type: "Tutorial", day: "Friday", start: "11:00", end: "12:00" },
  { id: "cit-civil-lab", subject: "Surveying Practice", code: "CE202L", branch: "Civil", year: "Second", section: "A", semester: "Semester 3", faculty: "Dr. Lakshmi Devi", room: "CE-301", type: "Practical lab", day: "Saturday", start: "09:00", end: "11:00" },
  { id: "cit-cse-tut", subject: "Computer Networks", code: "CS401", branch: "CSE", year: "Third", section: "B", semester: "Semester 5", faculty: "Dr. K. Suresh", room: "CC-204", type: "Tutorial", day: "Saturday", start: "13:00", end: "14:00" },
];

const sampleConflicts = [
  { type: "Faculty double booking", severity: "high", time: "Mon · 10:00–11:00", affected: "Dr. Ananya Rao · CS201 / EC301", reason: "The faculty member is assigned to CSE and ECE groups in the same slot.", sessionIds: ["cit-cse-201", "cit-ece-conflict"] },
  { type: "Room double booking", severity: "high", time: "Tue · 14:00–15:00", affected: "EEE-203 · EE203 / EE305", reason: "Two EEE sessions request EEE-203 at the same time.", sessionIds: ["cit-eee-203", "cit-eee-conflict"] },
  { type: "Student group clash", severity: "medium", time: "Wed · 11:00–12:00", affected: "CSE · Third year · Section A", reason: "The group has overlapping lecture and tutorial assignments.", sessionIds: ["cit-cse-303", "cit-cse-group-clash"] },
  { type: "Unavailable room", severity: "medium", time: "Thu · 14:00–16:00", affected: "ECE Lab-2 · EC205L", reason: "The room is marked unavailable for maintenance in this sample.", sessionId: "cit-ece-lab" },
  { type: "Faculty leave conflict", severity: "low", time: "Fri · 09:00–11:00", affected: "Prof. R. Prakash · ME305L", reason: "The assigned faculty member has a leave request for this period.", sessionId: "cit-me-lab" },
];

const emptyForm = {
  subject: "",
  code: "",
  branch: "CSE",
  year: "Second",
  section: "A",
  semester: "Semester 3",
  academicYear: "2026–27",
  faculty: facultyMembers[0],
  room: rooms[0],
  type: "Lecture",
  day: "Monday",
  start: "09:00",
  end: "10:00",
};

function toMinutes(time) {
  const [hoursValue, minutesValue] = time.split(":").map(Number);
  return hoursValue * 60 + minutesValue;
}

function displayTime(time) {
  const [hoursValue, minutesValue] = time.split(":").map(Number);
  const suffix = hoursValue >= 12 ? "PM" : "AM";
  return `${hoursValue % 12 || 12}:${String(minutesValue).padStart(2, "0")} ${suffix}`;
}

function escapeCsv(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <TextField
      className="tm-filter"
      label={label}
      select
      size="small"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
    </TextField>
  );
}

export default function TimetableManagement({ notify }) {
  const [sessions, setSessions] = useState(initialSessions);
  const [filters, setFilters] = useState({
    academicYear: "2026–27",
    semester: "All semesters",
    branch: "All branches",
    year: "All years",
    section: "All sections",
    faculty: "All faculty",
    room: "All rooms",
  });
  const [sessionDialogOpen, setSessionDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [generateOptions, setGenerateOptions] = useState({
    semester: "Semester 3",
    academicYear: "2026–27",
    branches: ["CSE", "ECE", "EEE", "Mechanical", "Civil"],
  });
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [focusedSession, setFocusedSession] = useState("");

  const generatedSessions = useMemo(() => sessions.filter((session) => (
    (session.academicYear || "2026–27") === generateOptions.academicYear
    && session.semester === generateOptions.semester
    && generateOptions.branches.includes(session.branch)
  )), [generateOptions, sessions]);

  const filteredSessions = useMemo(() => sessions.filter((session) => (
    (filters.academicYear === "All academic years" || !session.academicYear || session.academicYear === filters.academicYear)
    && (filters.semester === "All semesters" || session.semester === filters.semester)
    && (filters.branch === "All branches" || session.branch === filters.branch)
    && (filters.year === "All years" || session.year === filters.year)
    && (filters.section === "All sections" || session.section === filters.section)
    && (filters.faculty === "All faculty" || session.faculty === filters.faculty)
    && (filters.room === "All rooms" || session.room === filters.room)
  )), [filters, sessions]);

  const filterOptions = {
    semesters: ["All semesters", ...semesters],
    branches: ["All branches", ...branches],
    years: ["All years", ...years],
    sections: ["All sections", "A", "B", "C"],
    faculty: ["All faculty", ...facultyMembers],
    rooms: ["All rooms", ...rooms],
  };

  function setFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function openNewSession() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      branch: filters.branch === "All branches" ? emptyForm.branch : filters.branch,
      year: filters.year === "All years" ? emptyForm.year : filters.year,
      section: filters.section === "All sections" ? emptyForm.section : filters.section,
      semester: filters.semester === "All semesters" ? emptyForm.semester : filters.semester,
      faculty: filters.faculty === "All faculty" ? emptyForm.faculty : filters.faculty,
      room: filters.room === "All rooms" ? emptyForm.room : filters.room,
    });
    setSessionDialogOpen(true);
  }

  function openEditSession(session) {
    setEditingId(session.id);
    setForm({ ...emptyForm, ...session });
    setSessionDialogOpen(true);
  }

  function saveSession(event) {
    event.preventDefault();
    if (toMinutes(form.start) < 480 || toMinutes(form.end) > 1020 || toMinutes(form.end) <= toMinutes(form.start)) {
      notify("Choose a valid time between 8:00 AM and 5:00 PM, with the end after the start.");
      return;
    }
    const updatedSession = {
      ...form,
      id: editingId || `cit-session-${Date.now()}`,
    };
    setSessions((current) => editingId
      ? current.map((session) => session.id === editingId ? updatedSession : session)
      : [...current, updatedSession]);
    setSessionDialogOpen(false);
    notify(editingId ? "Timetable session updated." : "Timetable session added.");
  }

  function confirmDelete() {
    setSessions((current) => current.filter((session) => session.id !== deleteCandidate.id));
    setDeleteCandidate(null);
    setSessionDialogOpen(false);
    notify("Timetable session deleted.");
  }

  function exportTimetable() {
    const columns = ["Academic year", "Semester", "Day", "Start", "End", "Subject", "Code", "Branch", "Year", "Section", "Faculty", "Room", "Session type"];
    const records = filteredSessions.map((session) => [
      session.academicYear || "2026–27",
      session.semester,
      session.day,
      session.start,
      session.end,
      session.subject,
      session.code,
      session.branch,
      session.year,
      session.section,
      session.faculty,
      session.room,
      session.type,
    ]);
    const csv = [columns, ...records].map((row) => row.map(escapeCsv).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "cit-timetable-2026-27.csv";
    link.click();
    URL.revokeObjectURL(url);
    notify(`Exported ${filteredSessions.length} timetable sessions.`);
  }

  function toggleGenerationBranch(branch) {
    setGenerated(false);
    setGenerateOptions((current) => ({
      ...current,
      branches: current.branches.includes(branch)
        ? current.branches.filter((item) => item !== branch)
        : [...current.branches, branch],
    }));
  }

  function generatePreview() {
    if (!generateOptions.branches.length) {
      notify("Select at least one branch to generate a preview.");
      return;
    }
    setGenerating(true);
    setGenerated(false);
    window.setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 900);
  }

  function focusConflict(conflict) {
    const sessionId = conflict.sessionId || conflict.sessionIds?.[0];
    setFocusedSession(sessionId);
    document.getElementById(`timetable-${sessionId}`)?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    window.setTimeout(() => setFocusedSession(""), 1800);
  }

  function resetFilters() {
    setFilters({
      academicYear: "2026–27",
      semester: "All semesters",
      branch: "All branches",
      year: "All years",
      section: "All sections",
      faculty: "All faculty",
      room: "All rooms",
    });
  }

  return (
    <div className="timetable-management">
      <PageTitle
        eyebrow="ACADEMIC PLANNING"
        title="Timetable Management"
        subtitle="Manage and monitor academic schedules."
        action={
          <div className="tm-header-actions">
            <Button variant="outlined" startIcon={<Download size={16} />} onClick={exportTimetable}>Export Timetable</Button>
            <Button variant="outlined" startIcon={<Plus size={16} />} onClick={openNewSession}>Add Session</Button>
            <Button variant="contained" startIcon={<Sparkles size={16} />} onClick={() => setGenerateOpen((open) => !open)}>Generate Timetable</Button>
          </div>
        }
      />

      <section className="tm-filter-panel" aria-label="Timetable filters">
        <div className="tm-filter-heading">
          <div><b>Schedule filters</b><small>Choose the academic group and teaching space to review.</small></div>
          <button type="button" className="tm-reset-button" onClick={resetFilters}>Reset filters</button>
        </div>
        <div className="tm-filter-grid">
          <FilterSelect label="Academic year" value={filters.academicYear} options={["2026–27", "All academic years"]} onChange={(value) => setFilter("academicYear", value)} />
          <FilterSelect label="Semester" value={filters.semester} options={filterOptions.semesters} onChange={(value) => setFilter("semester", value)} />
          <FilterSelect label="Branch" value={filters.branch} options={filterOptions.branches} onChange={(value) => setFilter("branch", value)} />
          <FilterSelect label="Year" value={filters.year} options={filterOptions.years} onChange={(value) => setFilter("year", value)} />
          <FilterSelect label="Section" value={filters.section} options={filterOptions.sections} onChange={(value) => setFilter("section", value)} />
          <FilterSelect label="Faculty" value={filters.faculty} options={filterOptions.faculty} onChange={(value) => setFilter("faculty", value)} />
          <FilterSelect label="Room" value={filters.room} options={filterOptions.rooms} onChange={(value) => setFilter("room", value)} />
        </div>
      </section>

      {generateOpen && (
        <section className="tm-generate-panel" aria-label="Generate timetable preview">
          <div className="tm-generate-heading">
            <div className="tm-generate-icon"><Sparkles size={19} /></div>
            <div><h2>Generate timetable</h2><p>Configure a semester and preview the generated schedule. Scheduling is simulated in this frontend.</p></div>
            <button type="button" className="tm-close-button" aria-label="Close generation panel" onClick={() => setGenerateOpen(false)}>×</button>
          </div>
          <div className="tm-generation-controls">
            <FilterSelect label="Academic year" value={generateOptions.academicYear} options={["2026–27"]} onChange={(value) => { setGenerated(false); setGenerateOptions((current) => ({ ...current, academicYear: value })); }} />
            <FilterSelect label="Semester" value={generateOptions.semester} options={semesters} onChange={(value) => { setGenerated(false); setGenerateOptions((current) => ({ ...current, semester: value })); }} />
            <div className="tm-branch-picker"><span>Branches</span><div>{branches.map((branch) => <button type="button" key={branch} aria-pressed={generateOptions.branches.includes(branch)} className={generateOptions.branches.includes(branch) ? "selected" : ""} onClick={() => toggleGenerationBranch(branch)}>{branch}</button>)}</div></div>
            <Button variant="contained" disabled={generating} startIcon={<Sparkles size={16} />} onClick={generatePreview}>{generating ? "Generating preview..." : "Generate preview"}</Button>
          </div>
          {generating && <div className="tm-progress" role="status"><span /><b>Building a draft timetable from the selected groups…</b></div>}
          {generated && (
            <div className="tm-generated-preview">
              <div className="tm-preview-status"><CheckCircle2 size={17} /><span><b>Preview ready</b><small>Frontend preview generated. Backend validation is required before publishing.</small></span></div>
              <div className="tm-preview-metrics"><span><b>{generateOptions.branches.length}</b><small>Branches</small></span><span><b>{generatedSessions.length}</b><small>Sample sessions</small></span><span><b>{sampleConflicts.length}</b><small>Sample warnings</small></span></div>
              <div className="tm-preview-list">{generatedSessions.slice(0, 3).map((session) => <span key={session.id}><b>{session.code}</b>{session.subject}<small>{session.day} · {displayTime(session.start)} · {session.room}</small></span>)}</div>
              <div className="tm-simulation-note"><AlertTriangle size={14} /> Timetable generation and clash detection are UI simulations. No schedule was saved or published.</div>
            </div>
          )}
        </section>
      )}

      <div className="tm-calendar-heading">
        <div><span className="tm-eyebrow">WEEKLY VIEW · 09–14 NOV 2026</span><h2>Academic timetable</h2><p>{filteredSessions.length} sessions shown · 8:00 AM–5:00 PM · Lunch break 12:00–1:00 PM</p></div>
        <div className="tm-calendar-tools"><span><i className="tm-live-dot" />2026–27</span><span>Semester view</span></div>
      </div>

      <div className="tm-legend" aria-label="Session type legend">
        <span><i className="tm-legend-dot lecture" />Lecture</span>
        <span><i className="tm-legend-dot tutorial" />Tutorial</span>
        <span><i className="tm-legend-dot lab" />Practical lab</span>
        <span><i className="tm-legend-dot conflict" />Needs review</span>
      </div>

      <section className="tm-calendar-scroll" aria-label="Weekly timetable">
        <div className="tm-calendar">
          <div className="tm-time-column">
            <div className="tm-day-header tm-time-header">IST</div>
            {hours.map((hour) => <div className="tm-hour-label" key={hour}>{hour > 12 ? hour - 12 : hour}:00 <small>{hour >= 12 ? "PM" : "AM"}</small></div>)}
            <div className="tm-hour-end">5:00 PM</div>
          </div>
          {days.map((day, dayIndex) => {
            const daySessions = filteredSessions.filter((session) => session.day === day);
            return (
              <div className="tm-day-column" key={day}>
                <div className={`tm-day-header ${dayIndex === 0 ? "is-current" : ""}`}><span>{day.slice(0, 3).toUpperCase()}</span><b>{String(9 + dayIndex).padStart(2, "0")}</b></div>
                <div className="tm-day-track">
                  <div className="tm-lunch-break"><span>Lunch break · 12–1</span></div>
                  {daySessions.map((session) => {
                    const top = ((toMinutes(session.start) - 480) / 60) * 74 + 4;
                    const height = Math.max(((toMinutes(session.end) - toMinutes(session.start)) / 60) * 74 - 8, 48);
                    const hasConflict = sampleConflicts.some((conflict) => conflict.sessionId === session.id || conflict.sessionIds?.includes(session.id));
                    const overlapGroup = daySessions
                      .filter((other) => toMinutes(other.start) < toMinutes(session.end) && toMinutes(other.end) > toMinutes(session.start))
                      .sort((left, right) => left.id.localeCompare(right.id));
                    const lane = overlapGroup.findIndex((item) => item.id === session.id);
                    const placement = overlapGroup.length > 1
                      ? { left: lane === 0 ? "4px" : "calc(50% + 1px)", width: "calc(50% - 5px)" }
                      : { left: "4px", right: "4px" };
                    return (
                      <article
                        id={`timetable-${session.id}`}
                        className={`tm-session tm-session--${session.type === "Practical lab" ? "lab" : session.type.toLowerCase()} ${hasConflict ? "is-conflict" : ""} ${focusedSession === session.id ? "is-focused" : ""}`}
                        key={session.id}
                        style={{ top: `${top}px`, height: `${height}px`, ...placement }}
                      >
                        <div className="tm-session-top"><span>{session.code}</span><button type="button" aria-label={`Edit ${session.subject}`} onClick={() => openEditSession(session)}><Pencil size={13} /></button></div>
                        <b className="tm-subject">{session.subject}</b>
                        <span className="tm-session-meta"><span>{session.faculty}</span><span><MapPin size={11} />{session.room}</span></span>
                        <span className="tm-session-time">{displayTime(session.start)}–{displayTime(session.end)} <i>{session.type}</i></span>
                        {hasConflict && <AlertTriangle className="tm-card-alert" size={14} aria-label="Scheduling warning" />}
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {filteredSessions.length === 0 && (
        <div className="tm-empty-state"><CalendarDays size={22} /><b>No sessions match these filters</b><span>Try another branch, semester, faculty member, or room.</span><button type="button" onClick={resetFilters}>Clear filters</button></div>
      )}

      <section className="tm-conflicts-panel" id="timetable-conflicts">
        <div className="tm-section-heading"><div><span className="tm-eyebrow">VALIDATION</span><h2>Conflict warnings</h2><p>Sample findings for the interface; automatic clash detection is not connected yet.</p></div><span className="tm-conflict-count"><AlertTriangle size={15} />{sampleConflicts.length} sample warnings</span></div>
        <div className="tm-conflict-list">
          {sampleConflicts.map((conflict) => (
            <button className="tm-conflict-row" type="button" key={conflict.type} onClick={() => focusConflict(conflict)}>
              <span className={`tm-conflict-icon ${conflict.severity}`}><AlertTriangle size={16} /></span>
              <span className="tm-conflict-copy"><b>{conflict.type}</b><small>{conflict.affected}</small><span>{conflict.reason}</span></span>
              <span className="tm-conflict-time">{conflict.time}</span>
              <ArrowRight size={15} className="tm-conflict-arrow" />
            </button>
          ))}
        </div>
      </section>

      <div className="tm-footer-note"><Clock3 size={15} /><span>Changes on this page are held in the current browser session only. Connect a backend to save, publish, or validate live schedules.</span></div>

      <Dialog open={sessionDialogOpen} onClose={() => setSessionDialogOpen(false)} fullWidth maxWidth="md">
        <form onSubmit={saveSession}>
          <DialogTitle>{editingId ? "Edit timetable session" : "Add timetable session"}</DialogTitle>
          <DialogContent>
            <div className="tm-session-form">
              <TextField label="Subject name" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} required fullWidth />
              <TextField label="Subject code" value={form.code} onChange={(event) => setForm({ ...form, code: event.target.value })} required fullWidth />
              <TextField label="Branch" select value={form.branch} onChange={(event) => setForm({ ...form, branch: event.target.value })} fullWidth>{branches.map((branch) => <MenuItem value={branch} key={branch}>{branch}</MenuItem>)}</TextField>
              <TextField label="Year" select value={form.year} onChange={(event) => setForm({ ...form, year: event.target.value })} fullWidth>{years.map((year) => <MenuItem value={year} key={year}>{year}</MenuItem>)}</TextField>
              <TextField label="Section" select value={form.section} onChange={(event) => setForm({ ...form, section: event.target.value })} fullWidth>{["A", "B", "C"].map((section) => <MenuItem value={section} key={section}>{section}</MenuItem>)}</TextField>
              <TextField label="Semester" select value={form.semester} onChange={(event) => setForm({ ...form, semester: event.target.value })} fullWidth>{semesters.map((semester) => <MenuItem value={semester} key={semester}>{semester}</MenuItem>)}</TextField>
              <TextField label="Academic year" select value={form.academicYear} onChange={(event) => setForm({ ...form, academicYear: event.target.value })} fullWidth><MenuItem value="2026–27">2026–27</MenuItem></TextField>
              <TextField label="Faculty" select value={form.faculty} onChange={(event) => setForm({ ...form, faculty: event.target.value })} fullWidth>{facultyMembers.map((faculty) => <MenuItem value={faculty} key={faculty}>{faculty}</MenuItem>)}</TextField>
              <TextField label="Room" select value={form.room} onChange={(event) => setForm({ ...form, room: event.target.value })} fullWidth>{rooms.map((room) => <MenuItem value={room} key={room}>{room}</MenuItem>)}</TextField>
              <TextField label="Session type" select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} fullWidth>{["Lecture", "Tutorial", "Practical lab"].map((type) => <MenuItem value={type} key={type}>{type}</MenuItem>)}</TextField>
              <TextField label="Day" select value={form.day} onChange={(event) => setForm({ ...form, day: event.target.value })} fullWidth>{days.map((day) => <MenuItem value={day} key={day}>{day}</MenuItem>)}</TextField>
              <TextField label="Start time" type="time" value={form.start} onChange={(event) => setForm({ ...form, start: event.target.value })} required fullWidth InputLabelProps={{ shrink: true }} inputProps={{ min: "08:00", max: "16:59" }} />
              <TextField label="End time" type="time" value={form.end} onChange={(event) => setForm({ ...form, end: event.target.value })} required fullWidth InputLabelProps={{ shrink: true }} inputProps={{ min: "08:01", max: "17:00" }} />
            </div>
            <p className="tm-form-hint">Select a time between 8:00 AM and 5:00 PM. End time must be later than start time.</p>
          </DialogContent>
          <DialogActions className="tm-dialog-actions">
            {editingId && <Button color="error" startIcon={<Trash2 size={15} />} onClick={() => setDeleteCandidate(sessions.find((session) => session.id === editingId))}>Delete</Button>}
            <span />
            <Button onClick={() => setSessionDialogOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" startIcon={editingId ? <CheckCircle2 size={15} /> : <Plus size={15} />}>{editingId ? "Save changes" : "Add session"}</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={Boolean(deleteCandidate)} onClose={() => setDeleteCandidate(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Delete this session?</DialogTitle>
        <DialogContent><p className="tm-delete-copy">This removes <b>{deleteCandidate?.subject}</b> from the current timetable preview.</p></DialogContent>
        <DialogActions><Button onClick={() => setDeleteCandidate(null)}>Keep session</Button><Button color="error" variant="contained" onClick={confirmDelete}>Delete session</Button></DialogActions>
      </Dialog>
    </div>
  );
}
