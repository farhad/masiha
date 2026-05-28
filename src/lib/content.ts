export type BibleBook = {
  name: string;
  testament: "Old" | "New";
  chapters: {
    chapter: number;
    summary: string;
    verses: {
      verse: number;
      farsi: string;
      english: string;
      interlinear: string;
    }[];
  }[];
};

export type Lesson = {
  id: string;
  title: string;
  reading: string;
  body: string;
  question: string;
  choices: string[];
  answer: string;
};

export type Journey = {
  id: string;
  title: string;
  subtitle: string;
  tone: string;
  lessons: Lesson[];
};

export type StudyTheme = {
  id: string;
  title: string;
  description: string;
  days: {
    day: number;
    reading: string;
    reflection: string;
  }[];
};

export const bibleBooks: BibleBook[] = [
  {
    name: "Genesis",
    testament: "Old",
    chapters: [
      {
        chapter: 1,
        summary: "God creates with order, goodness, and blessing.",
        verses: [
          {
            verse: 1,
            farsi: "در ابتدا خدا آسمانها و زمین را آفرید.",
            english: "In the beginning God created the heavens and the earth.",
            interlinear: "Beginning | God | created | heavens | earth",
          },
          {
            verse: 27,
            farsi: "پس خدا انسان را به صورت خود آفرید.",
            english: "So God created mankind in his own image.",
            interlinear: "God | created | humanity | image | likeness",
          },
          {
            verse: 31,
            farsi: "خدا هر آنچه ساخته بود دید، و بسیار نیکو بود.",
            english: "God saw all that he had made, and it was very good.",
            interlinear: "God | saw | made | very | good",
          },
        ],
      },
    ],
  },
  {
    name: "Psalms",
    testament: "Old",
    chapters: [
      {
        chapter: 23,
        summary: "The Lord shepherds his people through want, fear, and rest.",
        verses: [
          {
            verse: 1,
            farsi: "خداوند شبان من است؛ محتاج به هیچ چیز نخواهم بود.",
            english: "The Lord is my shepherd, I lack nothing.",
            interlinear: "Lord | shepherd | me | lack | nothing",
          },
          {
            verse: 4,
            farsi: "هرچند از وادی سایه مرگ بگذرم، از بدی نخواهم ترسید.",
            english:
              "Even though I walk through the darkest valley, I will fear no evil.",
            interlinear: "walk | valley | shadow | fear | no evil",
          },
        ],
      },
    ],
  },
  {
    name: "Isaiah",
    testament: "Old",
    chapters: [
      {
        chapter: 53,
        summary: "The suffering servant bears the grief of many.",
        verses: [
          {
            verse: 5,
            farsi: "به سبب زخمهای او ما شفا یافته‌ایم.",
            english: "By his wounds we are healed.",
            interlinear: "wounds | his | we | are healed",
          },
        ],
      },
    ],
  },
  {
    name: "Matthew",
    testament: "New",
    chapters: [
      {
        chapter: 5,
        summary: "Jesus announces the blessed life of the kingdom.",
        verses: [
          {
            verse: 9,
            farsi: "خوشا به حال صلح‌کنندگان، زیرا آنان فرزندان خدا خوانده خواهند شد.",
            english:
              "Blessed are the peacemakers, for they will be called children of God.",
            interlinear: "blessed | peacemakers | called | children | God",
          },
        ],
      },
      {
        chapter: 6,
        summary: "Jesus teaches prayer, trust, and freedom from anxiety.",
        verses: [
          {
            verse: 34,
            farsi: "پس نگران فردا مباشید، زیرا فردا نگرانی خود را خواهد داشت.",
            english:
              "Do not worry about tomorrow, for tomorrow will worry about itself.",
            interlinear: "do not worry | tomorrow | itself | enough | trouble",
          },
        ],
      },
    ],
  },
  {
    name: "John",
    testament: "New",
    chapters: [
      {
        chapter: 1,
        summary: "The eternal Word enters human history as light and life.",
        verses: [
          {
            verse: 1,
            farsi: "در ابتدا کلمه بود، و کلمه نزد خدا بود، و کلمه خدا بود.",
            english:
              "In the beginning was the Word, and the Word was with God, and the Word was God.",
            interlinear: "beginning | Word | with God | was God",
          },
          {
            verse: 14,
            farsi: "و کلمه جسم گردید و میان ما ساکن شد.",
            english: "The Word became flesh and made his dwelling among us.",
            interlinear: "Word | became | flesh | dwelt | among us",
          },
        ],
      },
      {
        chapter: 3,
        summary: "God's love is revealed in the sending of the Son.",
        verses: [
          {
            verse: 16,
            farsi: "زیرا خدا جهان را آنقدر محبت نمود که پسر یگانه خود را داد.",
            english:
              "For God so loved the world that he gave his one and only Son.",
            interlinear: "God | loved | world | gave | Son",
          },
        ],
      },
    ],
  },
  {
    name: "Romans",
    testament: "New",
    chapters: [
      {
        chapter: 8,
        summary: "Life in Christ is stronger than condemnation, fear, and death.",
        verses: [
          {
            verse: 1,
            farsi: "پس اکنون برای آنان که در مسیح عیسی هستند، هیچ محکومیتی نیست.",
            english:
              "There is now no condemnation for those who are in Christ Jesus.",
            interlinear: "now | no condemnation | in | Christ Jesus",
          },
          {
            verse: 39,
            farsi: "هیچ چیز نمی‌تواند ما را از محبت خدا جدا سازد.",
            english:
              "Nothing will be able to separate us from the love of God.",
            interlinear: "nothing | separate | us | love | God",
          },
        ],
      },
    ],
  },
  {
    name: "Revelation",
    testament: "New",
    chapters: [
      {
        chapter: 21,
        summary: "God renews creation and dwells with his people forever.",
        verses: [
          {
            verse: 5,
            farsi: "اینک همه چیز را نو می‌سازم.",
            english: "I am making everything new.",
            interlinear: "behold | all things | making | new",
          },
        ],
      },
    ],
  },
];

export const salvationLessons: Lesson[] = [
  {
    id: "creation",
    title: "Creation as Gift",
    reading: "Genesis 1:1, 27, 31",
    body: "The Bible opens with a world that is not accidental. Creation is spoken into being, ordered by wisdom, and called good. Humanity begins with dignity because human life bears the image of God.",
    question: "What does Genesis say creation is?",
    choices: ["A gift called good", "A mistake to escape", "A random accident"],
    answer: "A gift called good",
  },
  {
    id: "fall",
    title: "The Fracture",
    reading: "Genesis 3",
    body: "Sin enters as mistrust: humanity reaches for life apart from God. The result is shame, hiding, blame, and death, but God begins the search for restoration immediately.",
    question: "What breaks first in the fall?",
    choices: ["Trust with God", "The weather", "Language"],
    answer: "Trust with God",
  },
  {
    id: "covenant",
    title: "A People of Promise",
    reading: "Genesis 12:1-3",
    body: "God calls Abraham so blessing can move outward to all nations. Salvation is not a private rescue plan; it is God's patient renewal of the world through covenant love.",
    question: "Why does God bless Abraham?",
    choices: ["To bless all nations", "To hide from the world", "To build an empire"],
    answer: "To bless all nations",
  },
  {
    id: "christ",
    title: "The Word Became Flesh",
    reading: "John 1:1-14",
    body: "In Jesus, God does not send only a message. The eternal Word becomes flesh, entering weakness, history, language, and grief to bring light from inside the human story.",
    question: "How does John describe Jesus entering the world?",
    choices: ["The Word became flesh", "A distant idea", "A temporary symbol"],
    answer: "The Word became flesh",
  },
  {
    id: "cross",
    title: "Love Through the Cross",
    reading: "Isaiah 53:5; John 3:16",
    body: "The cross is where human violence meets divine mercy. Christ bears sin and opens the way home, revealing that God's holiness and love are not rivals.",
    question: "What does the cross reveal?",
    choices: ["Merciful love", "Divine indifference", "A failed mission"],
    answer: "Merciful love",
  },
  {
    id: "new-creation",
    title: "Everything Made New",
    reading: "Revelation 21:5",
    body: "The Bible ends with renewal, not abandonment. God heals creation, wipes tears, and dwells with his people. Salvation is the restoration of communion with God.",
    question: "Where does the biblical story end?",
    choices: ["New creation", "Meaningless collapse", "Escape from creation"],
    answer: "New creation",
  },
];

export const journeys: Journey[] = [
  {
    id: "seeker",
    title: "Seeker / Curious Journey",
    subtitle: "A gentle path into the Bible, Jesus, prayer, and Christian hope.",
    tone: "Begin with wonder",
    lessons: [
      {
        id: "why-scripture",
        title: "Why the Bible Matters",
        reading: "Luke 24:27",
        body: "Christians read Scripture as one unfolding witness to God's character, humanity's wound, and the healing revealed in Jesus.",
        question: "What is the center of Christian Scripture?",
        choices: ["God's saving work", "Private opinions", "Ancient trivia"],
        answer: "God's saving work",
      },
      {
        id: "who-is-jesus",
        title: "Who Is Jesus?",
        reading: "John 1:14",
        body: "Jesus is not merely a teacher pointing toward God. Christians confess him as the Word made flesh: God with us in humility, truth, and love.",
        question: "What does John call Jesus?",
        choices: ["The Word made flesh", "A distant angel", "A political slogan"],
        answer: "The Word made flesh",
      },
      {
        id: "how-to-pray",
        title: "Learning to Pray",
        reading: "Matthew 6:9-13",
        body: "Prayer begins with trust. Jesus teaches us to speak to God as Father, ask for daily bread, receive mercy, and become merciful.",
        question: "Prayer begins with what posture?",
        choices: ["Trust", "Performance", "Panic"],
        answer: "Trust",
      },
      {
        id: "first-step",
        title: "The First Step",
        reading: "Psalm 34:8",
        body: "Faith grows through encounter. The invitation is simple: taste and see, ask honest questions, and take one faithful step at a time.",
        question: "How does this journey invite people to begin?",
        choices: ["One faithful step", "Pretend certainty", "Wait forever"],
        answer: "One faithful step",
      },
    ],
  },
  {
    id: "growing",
    title: "Growing in Faith Journey",
    subtitle: "Daily formation in Scripture, prayer, virtue, and resilient hope.",
    tone: "Practice the way",
    lessons: [
      {
        id: "daily-rule",
        title: "A Daily Rule of Life",
        reading: "Acts 2:42",
        body: "Christian maturity is shaped by repeated loves: teaching, fellowship, breaking bread, prayer, generosity, repentance, and worship.",
        question: "What forms Christian maturity?",
        choices: ["Repeated faithful practices", "Occasional inspiration", "Status"],
        answer: "Repeated faithful practices",
      },
      {
        id: "scripture-habit",
        title: "Scripture as Daily Bread",
        reading: "Psalm 119:105",
        body: "Scripture gives light for the next step, not always the whole map. The faithful life is learned by returning to God's word again and again.",
        question: "What image does Psalm 119 use for God's word?",
        choices: ["A lamp", "A locked door", "A trophy"],
        answer: "A lamp",
      },
      {
        id: "virtue",
        title: "Virtue Under Pressure",
        reading: "Galatians 5:22-23",
        body: "The fruit of the Spirit is not self-improvement decoration. It is Christ's life taking root in ordinary emotions, habits, conflicts, and desires.",
        question: "Where does Christian virtue grow?",
        choices: ["Ordinary life", "Only in public", "Only in comfort"],
        answer: "Ordinary life",
      },
      {
        id: "hope",
        title: "Hope That Endures",
        reading: "Romans 8:39",
        body: "Christian hope is anchored in God's love, not in perfect circumstances. Nothing can separate those in Christ from the love of God.",
        question: "What anchors Christian hope?",
        choices: ["God's love", "Perfect circumstances", "Personal control"],
        answer: "God's love",
      },
    ],
  },
];

const themeReadings: Record<string, string[]> = {
  temptation: ["Matthew 4:1-11", "1 Corinthians 10:13", "James 1:12-15"],
  anxiety: ["Matthew 6:25-34", "Philippians 4:6-7", "1 Peter 5:7"],
  depression: ["Psalm 42", "Lamentations 3:19-24", "Romans 8:38-39"],
  love: ["John 3:16", "1 Corinthians 13", "1 John 4:7-12"],
  anger: ["James 1:19-20", "Ephesians 4:26-32", "Proverbs 15:1"],
  hope: ["Romans 5:1-5", "Hebrews 6:19", "Revelation 21:1-5"],
  peace: ["John 14:27", "Philippians 4:7", "Matthew 5:9"],
  fear: ["Psalm 23:4", "Isaiah 41:10", "2 Timothy 1:7"],
  stress: ["Matthew 11:28-30", "Psalm 46:10", "Mark 6:31"],
  patience: ["Romans 12:12", "James 5:7-8", "Psalm 27:14"],
  doubt: ["John 20:24-29", "Mark 9:24", "Jude 22"],
  joy: ["Psalm 16:11", "John 15:11", "Philippians 4:4"],
  jealousy: ["James 3:14-18", "Proverbs 14:30", "Galatians 5:25-26"],
  loss: ["John 11:25-36", "Psalm 34:18", "Revelation 21:4"],
  healing: ["Isaiah 53:5", "Mark 5:25-34", "James 5:14-16"],
};

const themeDescriptions: Record<string, string> = {
  temptation: "Learning to desire what leads to life.",
  anxiety: "Practicing trust when tomorrow feels heavy.",
  depression: "Praying honestly from the valley without losing hope.",
  love: "Receiving and becoming the self-giving love of God.",
  anger: "Letting truth, patience, and mercy govern the fire within.",
  hope: "Anchoring the heart in God's promised renewal.",
  peace: "Resting in Christ's presence amid conflict and uncertainty.",
  fear: "Walking through danger with the Shepherd near.",
  stress: "Receiving limits, rest, and the yoke of Christ.",
  patience: "Enduring slowly without surrendering love.",
  doubt: "Bringing honest questions into the presence of Christ.",
  joy: "Discovering gladness that is deeper than mood.",
  jealousy: "Learning contentment and freedom from comparison.",
  loss: "Grieving with Christ, who weeps and raises the dead.",
  healing: "Seeking wholeness of body, memory, sin, and community.",
};

export const studyThemes: StudyTheme[] = Object.entries(themeReadings).map(
  ([id, readings]) => ({
    id,
    title: id[0].toUpperCase() + id.slice(1),
    description: themeDescriptions[id],
    days: readings.map((reading, index) => ({
      day: index + 1,
      reading,
      reflection:
        index === 0
          ? "Name the place where you need grace today."
          : index === 1
            ? "Notice one promise in this passage and carry it into prayer."
            : "Choose one small act of obedience shaped by this reading.",
    })),
  }),
);

export const dailyLiturgy = {
  reading: "Psalm 23; John 10:11-18",
  prayer:
    "Lord Jesus Christ, shepherd of our souls, guide us today in truth, guard us from fear, and teach us to hear your voice with a faithful heart. Amen.",
};

export const bibleYearPlan = Array.from({ length: 365 }, (_, index) => {
  const cycle = [
    "Genesis 1-2; Matthew 1",
    "Genesis 3-4; Matthew 2",
    "Psalm 1-2; John 1",
    "Exodus 12; Luke 22",
    "Isaiah 53; John 19",
    "Romans 8; Psalm 23",
    "Revelation 21; John 20",
  ];

  return {
    day: index + 1,
    reading: cycle[index % cycle.length],
    note:
      index % 7 === 6
        ? "Weekly review: revisit a passage that stirred prayer."
        : "Read slowly and mark one word or promise to remember.",
  };
});

export const allBibleRows = bibleBooks.flatMap((book) =>
  book.chapters.flatMap((chapter) =>
    chapter.verses.map((verse) => ({
      id: `${book.name}.${chapter.chapter}.${verse.verse}`,
      book: book.name,
      testament: book.testament,
      chapter: chapter.chapter,
      verse: verse.verse,
      summary: chapter.summary,
      reference: `${book.name} ${chapter.chapter}:${verse.verse}`,
      farsi: verse.farsi,
      english: verse.english,
      interlinear: verse.interlinear,
    })),
  ),
);
