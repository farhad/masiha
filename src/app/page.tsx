"use client";

import {
  BookOpen,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  Heart,
  Library,
  Moon,
  Search,
  Sprout,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  allBibleRows,
  bibleYearPlan,
  dailyLiturgy,
  journeys,
  salvationLessons,
  studyThemes,
} from "@/lib/content";
import { cn } from "@/lib/utils";

type Section =
  | "home"
  | "bible"
  | "salvation"
  | "journeys"
  | "themes"
  | "liturgy"
  | "year";

const navItems: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "bible", label: "Bible", icon: BookOpen },
  { id: "salvation", label: "Story", icon: Sprout },
  { id: "journeys", label: "Journeys", icon: Heart },
  { id: "themes", label: "Themes", icon: Library },
  { id: "liturgy", label: "Daily", icon: CalendarDays },
];

function useStoredStringArray(key: string) {
  const [value, setValue] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  });

  const update = (next: string[]) => {
    setValue(next);
    window.localStorage.setItem(key, JSON.stringify(next));
  };

  return [value, update] as const;
}

function useStoredNumber(key: string, initial: number) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initial;
    const raw = window.localStorage.getItem(key);
    return raw ? Number(raw) : initial;
  });

  const update = (next: number) => {
    setValue(next);
    window.localStorage.setItem(key, String(next));
  };

  return [value, update] as const;
}

export default function Home() {
  const [section, setSection] = useState<Section>("home");
  const [bookmarks, setBookmarks] = useStoredStringArray("masiha:bookmarks");
  const [completed, setCompleted] = useStoredStringArray("masiha:completed");
  const [yearDay, setYearDay] = useStoredNumber("masiha:year-day", 1);
  const [query, setQuery] = useState("");
  const [activeJourney, setActiveJourney] = useState(journeys[0].id);
  const [journeyStep, setJourneyStep] = useState(0);
  const [themeId, setThemeId] = useState(studyThemes[0].id);
  const [themeDay, setThemeDay] = useState(1);
  const { resolvedTheme, setTheme } = useTheme();

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return allBibleRows;
    return allBibleRows.filter((row) =>
      [
        row.reference,
        row.book,
        row.farsi,
        row.english,
        row.summary,
        row.interlinear,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  const selectedJourney =
    journeys.find((journey) => journey.id === activeJourney) ?? journeys[0];
  const selectedLesson = selectedJourney.lessons[journeyStep];
  const selectedTheme =
    studyThemes.find((theme) => theme.id === themeId) ?? studyThemes[0];
  const selectedThemeDay =
    selectedTheme.days.find((day) => day.day === themeDay) ??
    selectedTheme.days[0];

  const toggleBookmark = (id: string) => {
    setBookmarks(
      bookmarks.includes(id)
        ? bookmarks.filter((bookmark) => bookmark !== id)
        : [...bookmarks, id],
    );
  };

  const toggleComplete = (id: string) => {
    setCompleted(
      completed.includes(id)
        ? completed.filter((item) => item !== id)
        : [...completed, id],
    );
  };

  const journeyProgress =
    (selectedJourney.lessons.filter((lesson) =>
      completed.includes(`lesson:${selectedJourney.id}:${lesson.id}`),
    ).length /
      selectedJourney.lessons.length) *
    100;

  const yearProgress = (yearDay / bibleYearPlan.length) * 100;

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-20 bg-[var(--background)]/94 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <button
            className="flex shrink-0 items-center gap-3 text-left"
            onClick={() => setSection("home")}
          >
            <span className="grid h-11 w-11 place-items-center rounded-md bg-[var(--ember)] text-[var(--ember-foreground)] shadow-[0_12px_28px_var(--shadow-warm)]">
              <Flame size={22} />
            </span>
            <span>
              <span className="font-display block text-xl font-semibold">
                Masiha
              </span>
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                Scripture and formation
              </span>
            </span>
          </button>

          <div className="flex min-w-0 items-center gap-3">
            <nav className="flex min-w-0 flex-1 gap-2 overflow-x-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-semibold text-[var(--muted-foreground)] transition",
                    section === item.id
                      ? "bg-[var(--surface-strong)] text-[var(--foreground)]"
                      : "hover:bg-[var(--surface-strong)] hover:text-[var(--foreground)]",
                  )}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </nav>
            <Button
              size="icon"
              variant="outline"
              aria-label="Toggle theme"
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            >
              {resolvedTheme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="illumination">
        <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-8 pt-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="space-y-6">
            <Badge>First version PWA</Badge>
            <div className="space-y-4">
              <h1 className="font-display max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                A warm daily home for Scripture, prayer, and Christian growth.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
                Read the Bible in Farsi and English, follow bite-sized journeys,
                study themes that meet real life, and return each day for
                liturgy and a one-year reading rhythm.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setSection("journeys")}>
                Continue a journey <ChevronRight size={17} />
              </Button>
              <Button variant="outline" onClick={() => setSection("bible")}>
                Open the Bible
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Badge>Today</Badge>
                  <h2 className="mt-3 text-2xl font-semibold">
                    Daily Liturgy
                  </h2>
                </div>
                <CalendarDays className="text-[var(--gold)]" size={32} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-semibold">{dailyLiturgy.reading}</p>
              <p className="leading-7 text-[var(--muted-foreground)]">
                {dailyLiturgy.prayer}
              </p>
              <Button
                className="w-full"
                variant="secondary"
                onClick={() => setSection("liturgy")}
              >
                View today
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <MetricCard
            label="Bookmarks"
            value={bookmarks.length}
            icon={Bookmark}
          />
          <MetricCard
            label="Completed steps"
            value={completed.length}
            icon={Check}
          />
          <Card>
            <CardHeader>
              <h2 className="font-semibold">Bible in One Year</h2>
              <Progress value={yearProgress} />
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-[var(--muted-foreground)]">
                Day {yearDay} of 365
              </p>
              <Button
                className="w-full"
                variant="secondary"
                onClick={() => setSection("year")}
              >
                Continue plan
              </Button>
            </CardContent>
          </Card>
        </aside>

        <section className="min-w-0">
          {section === "home" && (
            <HomeGrid
              setSection={setSection}
              journeyProgress={journeyProgress}
              yearProgress={yearProgress}
            />
          )}
          {section === "bible" && (
            <BibleReader
              query={query}
              setQuery={setQuery}
              results={searchResults}
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmark}
            />
          )}
          {section === "salvation" && (
            <LessonTrack
              title="Story of Salvation"
              subtitle="The overarching story of the Bible in bite-sized scenes."
              lessons={salvationLessons}
              completed={completed}
              toggleComplete={toggleComplete}
              prefix="salvation"
            />
          )}
          {section === "journeys" && (
            <JourneyPanel
              journeys={journeys}
              selectedJourney={selectedJourney}
              activeJourney={activeJourney}
              setActiveJourney={(id) => {
                setActiveJourney(id);
                setJourneyStep(0);
              }}
              step={journeyStep}
              setStep={setJourneyStep}
              lesson={selectedLesson}
              completed={completed}
              toggleComplete={toggleComplete}
            />
          )}
          {section === "themes" && (
            <ThemesPanel
              themes={studyThemes}
              selectedTheme={selectedTheme}
              themeId={themeId}
              setThemeId={(id) => {
                setThemeId(id);
                setThemeDay(1);
              }}
              selectedDay={selectedThemeDay}
              day={themeDay}
              setDay={setThemeDay}
              completed={completed}
              toggleComplete={toggleComplete}
            />
          )}
          {section === "liturgy" && <LiturgyPanel />}
          {section === "year" && (
            <YearPanel
              yearDay={yearDay}
              setYearDay={setYearDay}
              completed={completed}
              toggleComplete={toggleComplete}
            />
          )}
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between pt-5">
        <div>
          <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
        <Icon className="text-[var(--gold)]" size={28} />
      </CardContent>
    </Card>
  );
}

function HomeGrid({
  setSection,
  journeyProgress,
  yearProgress,
}: {
  setSection: (section: Section) => void;
  journeyProgress: number;
  yearProgress: number;
}) {
  const cards = [
    {
      title: "Read Scripture",
      copy: "Search passages, compare Farsi with English, and save bookmarks.",
      section: "bible" as Section,
      icon: BookOpen,
    },
    {
      title: "Story of Salvation",
      copy: "Walk from creation to new creation through the biblical arc.",
      section: "salvation" as Section,
      icon: Sprout,
    },
    {
      title: "Study Themes",
      copy: "Temptation, anxiety, hope, loss, healing, and more.",
      section: "themes" as Section,
      icon: Library,
    },
    {
      title: "Daily Liturgy",
      copy: "A reading and prayer for today, kept simple and repeatable.",
      section: "liturgy" as Section,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <Card key={card.title} className="transition hover:-translate-y-0.5">
            <CardHeader>
              <card.icon className="text-[var(--gold)]" size={28} />
              <h2 className="text-xl font-semibold">{card.title}</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-7 text-[var(--muted-foreground)]">
                {card.copy}
              </p>
              <Button variant="secondary" onClick={() => setSection(card.section)}>
                Open
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Badge>Journey progress</Badge>
            <h2 className="text-xl font-semibold">Formation path</h2>
            <Progress value={journeyProgress} />
          </CardHeader>
          <CardContent>
            <Button onClick={() => setSection("journeys")}>Continue</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Badge>Reading plan</Badge>
            <h2 className="text-xl font-semibold">Bible in One Year</h2>
            <Progress value={yearProgress} />
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => setSection("year")}>
              Open plan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BibleReader({
  query,
  setQuery,
  results,
  bookmarks,
  toggleBookmark,
}: {
  query: string;
  setQuery: (query: string) => void;
  results: typeof allBibleRows;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <Badge>Bible</Badge>
        <h2 className="mt-3 text-3xl font-semibold">Reader and search</h2>
      </div>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
          size={18}
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search John 3, hope, Genesis, محبت..."
          className="h-12 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] pl-10 pr-4 text-[var(--foreground)] outline-none ring-offset-2 ring-offset-[var(--background)] placeholder:text-[var(--muted-foreground)] focus:ring-2 focus:ring-[var(--ring)]"
        />
      </div>
      <div className="grid gap-4">
        {results.map((row) => {
          const isBookmarked = bookmarks.includes(row.id);
          return (
            <Card key={row.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <Badge>{row.testament}</Badge>
                  <h3 className="mt-3 text-xl font-semibold">
                    {row.reference}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {row.summary}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant={isBookmarked ? "primary" : "outline"}
                  aria-label="Toggle bookmark"
                  onClick={() => toggleBookmark(row.id)}
                >
                  {isBookmarked ? (
                    <BookmarkCheck size={18} />
                  ) : (
                    <Bookmark size={18} />
                  )}
                </Button>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-md bg-[var(--surface-strong)] p-4">
                  <p className="scripture">{row.farsi}</p>
                </div>
                <div className="space-y-3 rounded-md border border-[var(--border)] p-4">
                  <p className="leading-7">{row.english}</p>
                  <p className="font-mono text-sm text-[var(--muted-foreground)]">
                    {row.interlinear}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function LessonTrack({
  title,
  subtitle,
  lessons,
  completed,
  toggleComplete,
  prefix,
}: {
  title: string;
  subtitle: string;
  lessons: typeof salvationLessons;
  completed: string[];
  toggleComplete: (id: string) => void;
  prefix: string;
}) {
  return (
    <div className="space-y-5">
      <div>
        <Badge>Guided story</Badge>
        <h2 className="mt-3 text-3xl font-semibold">{title}</h2>
        <p className="mt-2 text-[var(--muted-foreground)]">{subtitle}</p>
      </div>
      <div className="grid gap-4">
        {lessons.map((lesson, index) => {
          const key = `${prefix}:${lesson.id}`;
          return (
            <Card key={lesson.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent-foreground)]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{lesson.title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {lesson.reading}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="leading-7 text-[var(--muted-foreground)]">
                  {lesson.body}
                </p>
                <QuestionBlock lesson={lesson} />
                <Button
                  variant={completed.includes(key) ? "secondary" : "primary"}
                  onClick={() => toggleComplete(key)}
                >
                  {completed.includes(key) ? "Completed" : "Mark complete"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function JourneyPanel({
  journeys,
  selectedJourney,
  activeJourney,
  setActiveJourney,
  step,
  setStep,
  lesson,
  completed,
  toggleComplete,
}: {
  journeys: typeof import("@/lib/content").journeys;
  selectedJourney: (typeof journeys)[number];
  activeJourney: string;
  setActiveJourney: (id: string) => void;
  step: number;
  setStep: (step: number) => void;
  lesson: (typeof selectedJourney.lessons)[number];
  completed: string[];
  toggleComplete: (id: string) => void;
}) {
  const key = `lesson:${selectedJourney.id}:${lesson.id}`;

  return (
    <div className="space-y-5">
      <div>
        <Badge>Duolingo-style formation</Badge>
        <h2 className="mt-3 text-3xl font-semibold">Learning Journeys</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {journeys.map((journey) => (
          <Button
            key={journey.id}
            variant={activeJourney === journey.id ? "primary" : "outline"}
            onClick={() => setActiveJourney(journey.id)}
          >
            {journey.title}
          </Button>
        ))}
      </div>
      <Card className="overflow-hidden">
        <CardHeader className="bg-[var(--surface-strong)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge>{selectedJourney.tone}</Badge>
              <h3 className="mt-3 text-2xl font-semibold">
                {selectedJourney.title}
              </h3>
              <p className="text-[var(--muted-foreground)]">
                {selectedJourney.subtitle}
              </p>
            </div>
            <span className="text-sm font-semibold text-[var(--muted-foreground)]">
              Step {step + 1} / {selectedJourney.lessons.length}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-5">
          <Progress value={((step + 1) / selectedJourney.lessons.length) * 100} />
          <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h4 className="text-2xl font-semibold">{lesson.title}</h4>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              {lesson.reading}
            </p>
            <p className="mt-4 leading-8 text-[var(--muted-foreground)]">
              {lesson.body}
            </p>
          </div>
          <QuestionBlock lesson={lesson} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={step === 0}
                onClick={() => setStep(Math.max(0, step - 1))}
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={step === selectedJourney.lessons.length - 1}
                onClick={() =>
                  setStep(Math.min(selectedJourney.lessons.length - 1, step + 1))
                }
              >
                <ChevronRight size={18} />
              </Button>
            </div>
            <Button
              variant={completed.includes(key) ? "secondary" : "primary"}
              onClick={() => toggleComplete(key)}
            >
              {completed.includes(key) ? "Completed" : "Complete lesson"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function QuestionBlock({ lesson }: { lesson: { question: string; choices: string[]; answer: string } }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--surface-strong)] p-4">
      <p className="font-semibold">{lesson.question}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {lesson.choices.map((choice) => (
          <button
            key={choice}
            onClick={() => setSelected(choice)}
            className={cn(
              "rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-3 text-left text-sm font-semibold transition",
              selected === choice && "border-[var(--gold)] bg-[var(--accent-soft)]",
            )}
          >
            {choice}
          </button>
        ))}
      </div>
      {selected && (
        <p className="mt-3 text-sm font-semibold text-[var(--accent-foreground)]">
          {selected === lesson.answer
            ? "Correct. Let that truth settle."
            : `Good attempt. The strongest answer is: ${lesson.answer}.`}
        </p>
      )}
    </div>
  );
}

function ThemesPanel({
  themes,
  selectedTheme,
  themeId,
  setThemeId,
  selectedDay,
  day,
  setDay,
  completed,
  toggleComplete,
}: {
  themes: typeof studyThemes;
  selectedTheme: (typeof studyThemes)[number];
  themeId: string;
  setThemeId: (id: string) => void;
  selectedDay: (typeof studyThemes)[number]["days"][number];
  day: number;
  setDay: (day: number) => void;
  completed: string[];
  toggleComplete: (id: string) => void;
}) {
  const key = `theme:${selectedTheme.id}:${day}`;

  return (
    <div className="space-y-5">
      <div>
        <Badge>Discover Study Themes</Badge>
        <h2 className="mt-3 text-3xl font-semibold">Readings for real life</h2>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setThemeId(theme.id)}
            className={cn(
              "shrink-0 rounded-md border border-[var(--border)] px-3 py-2 text-sm font-semibold",
              themeId === theme.id
                ? "bg-[var(--ember)] text-[var(--ember-foreground)]"
                : "bg-[var(--surface)] text-[var(--muted-foreground)]",
            )}
          >
            {theme.title}
          </button>
        ))}
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold">{selectedTheme.title}</h3>
              <p className="text-[var(--muted-foreground)]">
                {selectedTheme.description}
              </p>
            </div>
            <Badge>Day {day}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <Progress value={(day / selectedTheme.days.length) * 100} />
          <div className="rounded-md bg-[var(--surface-strong)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
              Reading
            </p>
            <p className="mt-2 text-2xl font-semibold">{selectedDay.reading}</p>
            <p className="mt-4 leading-7 text-[var(--muted-foreground)]">
              {selectedDay.reflection}
            </p>
          </div>
          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={day === 1}
                onClick={() => setDay(Math.max(1, day - 1))}
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={day === selectedTheme.days.length}
                onClick={() =>
                  setDay(Math.min(selectedTheme.days.length, day + 1))
                }
              >
                <ChevronRight size={18} />
              </Button>
            </div>
            <Button
              variant={completed.includes(key) ? "secondary" : "primary"}
              onClick={() => toggleComplete(key)}
            >
              {completed.includes(key) ? "Completed" : "Mark day complete"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LiturgyPanel() {
  return (
    <div className="space-y-5">
      <div>
        <Badge>Daily Liturgy</Badge>
        <h2 className="mt-3 text-3xl font-semibold">Reading and prayer</h2>
      </div>
      <Card>
        <CardHeader>
          <CalendarDays className="text-[var(--gold)]" size={30} />
          <h3 className="text-2xl font-semibold">{dailyLiturgy.reading}</h3>
        </CardHeader>
        <CardContent>
          <p className="max-w-3xl text-xl leading-9 text-[var(--muted-foreground)]">
            {dailyLiturgy.prayer}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function YearPanel({
  yearDay,
  setYearDay,
  completed,
  toggleComplete,
}: {
  yearDay: number;
  setYearDay: (day: number) => void;
  completed: string[];
  toggleComplete: (id: string) => void;
}) {
  const entry = bibleYearPlan[yearDay - 1];
  const key = `year:${yearDay}`;

  return (
    <div className="space-y-5">
      <div>
        <Badge>Bible in One Year</Badge>
        <h2 className="mt-3 text-3xl font-semibold">Daily reading plan</h2>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold">Day {yearDay}</h3>
              <p className="text-[var(--muted-foreground)]">
                Resume, catch up, and review completed days.
              </p>
            </div>
            <Badge>{Math.round((yearDay / 365) * 100)}%</Badge>
          </div>
          <Progress value={(yearDay / 365) * 100} />
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-md bg-[var(--surface-strong)] p-5">
            <p className="text-2xl font-semibold">{entry.reading}</p>
            <p className="mt-3 text-[var(--muted-foreground)]">{entry.note}</p>
          </div>
          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={yearDay === 1}
                onClick={() => setYearDay(Math.max(1, yearDay - 1))}
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={yearDay === 365}
                onClick={() => setYearDay(Math.min(365, yearDay + 1))}
              >
                <ChevronRight size={18} />
              </Button>
            </div>
            <Button
              variant={completed.includes(key) ? "secondary" : "primary"}
              onClick={() => {
                toggleComplete(key);
                if (yearDay < 365 && !completed.includes(key)) {
                  setYearDay(yearDay + 1);
                }
              }}
            >
              {completed.includes(key) ? "Completed" : "Complete and advance"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
