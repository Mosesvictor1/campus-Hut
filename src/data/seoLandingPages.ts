import homepage from "@/assets/homepage.png.asset.json";
import taskScheduler from "@/assets/task-scheduler.png.asset.json";
import personalisation from "@/assets/personalisation.png.asset.json";

export interface LandingFaq {
  question: string;
  answer: string;
}

export interface SeoLandingPageData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  intro: string;
  problemHeading: string;
  problem: string;
  solutionHeading: string;
  solution: string;
  features: { title: string; description: string }[];
  benefits: string[];
  steps: { title: string; description: string }[];
  faq: LandingFaq[];
  image: { src: string; alt: string };
  related: string[];
}

export const seoLandingPages: SeoLandingPageData[] = [
  {
    slug: "best-student-app-nigeria",
    title: "Looking for the best student app in Nigeria?",
    metaTitle: "Best Student App in Nigeria? Explore CampusHut",
    metaDescription: "Comparing the best student app in Nigeria? Explore CampusHut's AI study support, planning, reminders, CGPA tracking and learning resources.",
    focusKeyword: "best student app in Nigeria",
    intro: "Campus life asks you to keep track of courses, deadlines, revision and goals at the same time. CampusHut brings practical study and organisation tools together, so you can spend less energy switching between tasks and more time learning.",
    problemHeading: "When every course needs your attention",
    problem: "Lecture notes sit in one place, deadlines in another, and revision can be difficult to plan around a full semester. Students often need more than a calendar: they need a way to turn what they are learning into regular study actions.",
    solutionHeading: "One place to organise your academic routine",
    solution: "CampusHut combines AI-supported learning with tools for planning and academic progress. Set up your academic profile, explore study support for your courses and use reminders to keep upcoming work in view. The app is designed for university and tertiary students in Nigeria and across Africa.",
    features: [
      { title: "AI study support", description: "Explore AI-generated courses, quizzes and flashcards to make course revision more active." },
      { title: "Planning and reminders", description: "Keep tasks, assignments and study sessions organised with a scheduler and reminders." },
      { title: "Academic progress", description: "Track CGPA and academic goals alongside the learning resources you use." },
    ],
    benefits: ["Bring study, planning and progress tools into one student-focused app.", "Turn large academic goals into smaller sessions and tasks.", "Choose learning support that fits the topic you are working on."],
    steps: [
      { title: "Set up your profile", description: "Add your university, level, courses and academic goals." },
      { title: "Choose what to work on", description: "Use the AI Study Assistant and learning tools for a course or topic." },
      { title: "Plan your next session", description: "Organise study time and assignments with the planner and reminders." },
    ],
    faq: [
      { question: "What is CampusHut?", answer: "CampusHut is a student success app with AI learning support, study planning, reminders and academic progress tools." },
      { question: "Who can use CampusHut?", answer: "CampusHut is designed for students in universities and other tertiary institutions, including students in Nigeria and across Africa." },
      { question: "What can I use the AI study tools for?", answer: "You can use them to explore course topics, generate study materials such as quizzes and flashcards, and get learning guidance." },
    ],
    image: { src: homepage.url, alt: "CampusHut student app home screen with academic tools" },
    related: ["student-productivity-app-nigeria", "ai-study-app-for-university-students", "student-success-app-africa"],
  },
  {
    slug: "ai-study-app-for-university-students",
    title: "An AI study app for university students",
    metaTitle: "AI Study App for University Students | CampusHut",
    metaDescription: "Use CampusHut as an AI study app for university students, with course learning support, quizzes, flashcards and personalised study guidance.",
    focusKeyword: "AI study app for university students",
    intro: "A useful AI study app should help you do more than collect answers. CampusHut helps university students work through course topics with AI-supported learning tools, then connect that learning to a practical study routine.",
    problemHeading: "Getting from lecture notes to confident revision",
    problem: "A topic can feel clear during a lecture and difficult again when it is time to revise. Rereading notes alone may not show which ideas need more attention or give you a structure for practising what you have learned.",
    solutionHeading: "Turn topics into guided study activities",
    solution: "With CampusHut, students can explore AI-generated courses, use an AI Study Assistant for explanations and build quizzes or flashcards for revision. Personalised recommendations and study planning help keep the next learning step visible without replacing your own judgement or course materials.",
    features: [
      { title: "AI Study Assistant", description: "Ask about a topic and use AI-guided explanations as a starting point for deeper study." },
      { title: "Courses and practice", description: "Generate learning courses, quizzes and flashcards around the subjects you want to review." },
      { title: "Recommendations", description: "Use academic profile details and learning activity to receive personalised study guidance." },
    ],
    benefits: ["Move from passive rereading to active recall with quizzes and flashcards.", "Break a broad subject into learning activities you can revisit.", "Pair AI study support with a plan for your upcoming academic work."],
    steps: [
      { title: "Choose a course topic", description: "Start with a concept, chapter or subject you want to understand better." },
      { title: "Explore and practise", description: "Use explanations, generated learning materials, quizzes or flashcards to engage with the topic." },
      { title: "Revisit it on a plan", description: "Add study sessions to your routine and return to concepts that need more practice." },
    ],
    faq: [
      { question: "How does an AI study app help university students?", answer: "It can help structure learning with explanations and practice materials. CampusHut brings an AI Study Assistant, generated courses, quizzes and flashcards into one study experience." },
      { question: "Can CampusHut create quizzes and flashcards?", answer: "Yes. CampusHut includes AI-generated quizzes and flashcards to support revision and active recall." },
      { question: "Does AI replace my lecturer or course materials?", answer: "No. Use AI support as a study aid alongside your lectures, course materials and academic guidance." },
    ],
    image: { src: homepage.url, alt: "CampusHut app showing AI-supported learning tools for students" },
    related: ["ai-study-assistant-for-students", "ai-flashcards-quiz-app", "pdf-audio-analyser-for-students"],
  },
  {
    slug: "student-productivity-app-nigeria",
    title: "A student productivity app in Nigeria for a busy semester",
    metaTitle: "Student Productivity App in Nigeria | CampusHut",
    metaDescription: "CampusHut is a student productivity app in Nigeria for organising study plans, assignment reminders, learning tasks and academic goals.",
    focusKeyword: "student productivity app in Nigeria",
    intro: "Productivity at university is not about filling every hour. It is about knowing what needs attention, setting realistic study time and keeping assignments from disappearing in a crowded semester. CampusHut brings those habits into a student-focused app.",
    problemHeading: "A full calendar is not always a clear plan",
    problem: "Between classes, assignments, group work and revision, it is easy to lose track of priorities. A list of deadlines alone does not say when to begin or how to keep a study routine going.",
    solutionHeading: "Connect the plan to the work you need to do",
    solution: "CampusHut pairs a task scheduler and assignment reminders with AI learning tools. Add academic commitments, plan study sessions and use quizzes, flashcards or course guidance to make those sessions more focused. The goal is a manageable routine, not a promise of instant results.",
    features: [
      { title: "Task scheduler", description: "Keep study tasks and academic commitments together so upcoming work is easier to see." },
      { title: "Assignment reminders", description: "Use reminders to bring deadlines back into view as you organise your work." },
      { title: "Study tools", description: "Use AI-generated learning materials to give a planned revision session a clear focus." },
    ],
    benefits: ["See academic tasks and study plans in one workflow.", "Give revision a place in the week instead of leaving it until the deadline.", "Make it easier to return to a course topic with active practice."],
    steps: [
      { title: "List the work ahead", description: "Add assignments, important academic tasks and learning goals." },
      { title: "Set a study routine", description: "Schedule realistic sessions around your courses and existing commitments." },
      { title: "Use each session well", description: "Choose a topic, then practise with AI-supported courses, quizzes or flashcards." },
    ],
    faq: [
      { question: "What does a student productivity app do?", answer: "It helps students organise academic tasks and routines. CampusHut adds scheduling and reminders alongside study and progress tools." },
      { question: "Can CampusHut remind me about assignments?", answer: "CampusHut includes assignment reminders to help keep academic deadlines in view." },
      { question: "Is CampusHut only for students in Nigeria?", answer: "CampusHut is designed for students in Nigeria and across Africa, and supports university and tertiary study routines." },
    ],
    image: { src: "/assets/SeoProductivity.png", alt: "CampusHut study dashboard with semester progress, weekly stats and assignments for a productive semester" },
    related: ["study-planner-app-for-students", "best-student-app-nigeria", "student-success-app-africa"],
  },
  {
    slug: "ai-study-assistant-for-students",
    title: "An AI study assistant for students",
    metaTitle: "AI Study Assistant for Students | CampusHut",
    metaDescription: "Meet CampusHut's AI study assistant for students: explore course topics, create practice materials and organise your next study session.",
    focusKeyword: "AI study assistant for students",
    intro: "When a course concept will not click, a useful next step is to ask a better question and practise the idea in a new way. CampusHut's AI Study Assistant gives students a place to explore topics and connect explanations with structured learning activities.",
    problemHeading: "Knowing what to ask can be the hard part",
    problem: "Students can get stuck between a dense set of notes and an upcoming test. They may need a simpler explanation, a sequence of lessons or a way to check whether they can recall the key ideas.",
    solutionHeading: "Explore a topic, then put your understanding to work",
    solution: "CampusHut brings an AI Study Assistant together with course generation, quizzes and flashcards. Use these tools to approach a subject from different angles, then schedule time to return to the topics that still need attention. Treat generated guidance as support for your study, not as a substitute for verified course materials.",
    features: [
      { title: "Topic guidance", description: "Use the AI Study Assistant to explore academic topics and ask for learning support." },
      { title: "Generated study courses", description: "Create a structured learning path around a topic you want to study." },
      { title: "Practice and review", description: "Use quizzes and flashcards to revisit key concepts and check recall." },
    ],
    benefits: ["Get another way into a topic when your first explanation is not enough.", "Combine explanation, structured learning and revision in one study flow.", "Keep track of follow-up practice with your study plan."],
    steps: [
      { title: "Name the topic", description: "Start with a course concept, question or area you want to understand." },
      { title: "Work through the material", description: "Explore AI guidance and use generated courses to organise learning." },
      { title: "Check your understanding", description: "Practise with quizzes or flashcards and plan another review if needed." },
    ],
    faq: [
      { question: "What is an AI study assistant?", answer: "It is a learning tool that uses AI to support students as they explore topics and study. CampusHut combines the assistant with courses, quizzes, flashcards and planning." },
      { question: "Can I use CampusHut to prepare for exams?", answer: "You can use its study courses, quizzes, flashcards and planner to organise revision and practise course concepts." },
      { question: "Should I rely on AI answers as my only source?", answer: "No. Check important information against your lecturer's guidance and trusted course materials." },
    ],
    image: { src: homepage.url, alt: "CampusHut AI learning tools for student study support" },
    related: ["ai-study-app-for-university-students", "ai-flashcards-quiz-app", "pdf-audio-analyser-for-students"],
  },
  {
    slug: "cgpa-tracker-app",
    title: "A CGPA tracker app for students",
    metaTitle: "CGPA Tracker App for Students | CampusHut",
    metaDescription: "Use CampusHut as a CGPA tracker app to keep academic goals and progress visible alongside study planning and learning support.",
    focusKeyword: "CGPA tracker app",
    intro: "Your CGPA is one part of your academic picture. CampusHut helps students keep their CGPA and goals visible alongside study routines, course support and progress, so reflection can lead to a practical next step.",
    problemHeading: "Progress is easier to act on when it is visible",
    problem: "A number on its own does not tell you what to study next. Students also need to understand their current priorities, build consistent habits and make time for courses that need more attention.",
    solutionHeading: "Connect academic tracking with everyday study",
    solution: "CampusHut lets students include current CGPA and academic goals in their profile, then use study recommendations, a planner and learning tools to support their routine. Check your progress as one signal among many, and use your institution's official records for confirmed results.",
    features: [
      { title: "CGPA and goals", description: "Keep your academic standing and goals visible in your student profile." },
      { title: "Progress reports", description: "Review academic progress and learning activity as part of your ongoing study routine." },
      { title: "Study planning", description: "Pair goals with planned study time, assignment reminders and course revision." },
    ],
    benefits: ["Keep academic goals connected to the work you do each week.", "Use progress as a prompt to plan, reflect and adjust your study routine.", "Bring CGPA tracking together with AI study support and organisation tools."],
    steps: [
      { title: "Add your academic details", description: "Set up your profile with your course information and current CGPA." },
      { title: "Choose your next goal", description: "Identify an academic priority and the course work that supports it." },
      { title: "Plan and review", description: "Use study tools and scheduling, then revisit your progress over time." },
    ],
    faq: [
      { question: "Can CampusHut track my CGPA?", answer: "CampusHut includes a CGPA tracker and supports adding current CGPA to your academic profile. Check your institution's official records for confirmed results." },
      { question: "Does a CGPA tracker improve my grades automatically?", answer: "No. Tracking makes academic information easier to review, while study, attendance and course decisions remain yours." },
      { question: "Can I use the tracker with other study tools?", answer: "Yes. CampusHut brings academic goals and tracking together with its study planner, reminders and AI learning tools." },
    ],
    image: { src: "/assets/SeoCgpaTracker.png", alt: "CampusHut dashboard showing the predicted CGPA, semester progress and weekly study indicators" },
    related: ["student-productivity-app-nigeria", "study-planner-app-for-students", "best-student-app-nigeria"],
  },
  {
    slug: "pdf-audio-analyser-for-students",
    title: "A PDF and audio analyser for students",
    metaTitle: "PDF and Audio Analyser for Students | CampusHut",
    metaDescription: "Explore CampusHut's PDF and audio analyser for students, built to support review of learning materials and focused academic revision.",
    focusKeyword: "PDF and audio analyser for students",
    intro: "Lecture information can be spread across reading materials and recorded audio. CampusHut gives students an analyser for PDF and audio learning materials, helping bring those sources into a more focused study workflow.",
    problemHeading: "Useful course material is not always easy to revisit",
    problem: "Long documents and audio materials can take time to review, especially when you are trying to locate a specific idea before a class, assignment or exam. Without a clear next step, reviewing can become another pile of unfinished work.",
    solutionHeading: "Bring course resources into a deliberate review routine",
    solution: "Use CampusHut's PDF and Audio Analyser as part of your revision process, then organise follow-up study with the AI Study Assistant, planner and practice tools. Review extracted or generated material against your original lecture resources, and follow your institution's guidance on permitted use of course content.",
    features: [
      { title: "PDF analysis", description: "Work with PDF learning materials as part of your academic review workflow." },
      { title: "Audio analysis", description: "Use audio learning materials with CampusHut's analysis tools to support revision." },
      { title: "Study follow-through", description: "Connect resource review to AI study guidance, quizzes, flashcards and a study plan." },
    ],
    benefits: ["Bring document and audio resources into your study workflow.", "Give revision a clear follow-up through practice and scheduling.", "Use learning tools together instead of treating each study task separately."],
    steps: [
      { title: "Choose a resource", description: "Start with a PDF or audio learning material you are allowed to use." },
      { title: "Review with the analyser", description: "Use CampusHut's analysis tools to support your review of the material." },
      { title: "Study what matters next", description: "Check your understanding against the original source and plan follow-up practice." },
    ],
    faq: [
      { question: "Can CampusHut analyse PDFs for students?", answer: "CampusHut includes a PDF analyser for student learning materials and academic review." },
      { question: "Does CampusHut include audio analysis?", answer: "Yes. Audio analysis is included among CampusHut's learning tools for students." },
      { question: "Should I verify AI-supported study material?", answer: "Yes. Compare important details with the original document or recording and your lecturer's course materials." },
    ],
    image: { src: "/assets/SeoAnalyser.png", alt: "CampusHut AI Document Analyser screen for uploading PDF, DOCX and voice notes" },
    related: ["ai-study-assistant-for-students", "ai-study-app-for-university-students", "ai-flashcards-quiz-app"],
  },
  {
    slug: "ai-flashcards-quiz-app",
    title: "An AI flashcards and quiz app for students",
    metaTitle: "AI Flashcards and Quiz App for Students | CampusHut",
    metaDescription: "Create AI-generated flashcards and quizzes with CampusHut to practise course concepts and make revision more active.",
    focusKeyword: "AI flashcards and quiz app",
    intro: "Reading a concept again is not always the same as being able to recall it. CampusHut helps students make revision more active with AI-generated flashcards and quizzes connected to a broader set of study tools.",
    problemHeading: "Rereading can hide the gaps in your understanding",
    problem: "When notes look familiar, it can be tempting to assume the material is mastered. A better check is to retrieve an idea, answer a question and notice which concepts need another review.",
    solutionHeading: "Turn revision into small rounds of practice",
    solution: "Use CampusHut to generate flashcards and quizzes around study topics, then return to difficult ideas with AI guidance or a generated course. Add practice to your schedule so revision is spread across your study routine rather than saved for the last minute.",
    features: [
      { title: "AI flashcards", description: "Create question-and-answer prompts for concepts you want to revisit." },
      { title: "AI quizzes", description: "Practise topics with generated questions and use the results to guide further study." },
      { title: "Course learning support", description: "Pair practice with AI course generation and the Study Assistant when a concept needs more explanation." },
    ],
    benefits: ["Practise recalling course concepts instead of only rereading them.", "Spot topics that need extra study and return to them deliberately.", "Connect quick revision activities to a longer study plan."],
    steps: [
      { title: "Pick the topic", description: "Choose a course concept or set of notes you are ready to review." },
      { title: "Generate practice", description: "Use CampusHut's AI tools to create flashcards or a quiz for that topic." },
      { title: "Review and repeat", description: "Check uncertain answers, revisit the source material and schedule another practice round." },
    ],
    faq: [
      { question: "Can CampusHut make flashcards from my study topics?", answer: "CampusHut includes AI-generated flashcards to help students practise concepts and review course material." },
      { question: "Can I generate quizzes for exam revision?", answer: "Yes. Use AI-generated quizzes as one part of your revision, alongside lecture notes and other course materials." },
      { question: "Are AI-generated answers always correct?", answer: "AI-generated study material can make mistakes. Check important facts against your original sources and course guidance." },
    ],
    image: { src: "/assets/SeoFlashcardsQuiz.png", alt: "CampusHut lesson selection screen for generating quizzes from course modules and lessons" },
    related: ["ai-study-app-for-university-students", "ai-study-assistant-for-students", "pdf-audio-analyser-for-students"],
  },
  {
    slug: "study-planner-app-for-students",
    title: "A study planner app for university students",
    metaTitle: "Study Planner App for University Students | CampusHut",
    metaDescription: "Plan study sessions, assignments and revision with CampusHut, a study planner app for university students with reminders and AI learning tools.",
    focusKeyword: "study planner app for university students",
    intro: "A study plan only works when it fits around classes, assignments and the rest of your week. CampusHut gives university students a planner and task scheduler that can sit alongside reminders and learning tools.",
    problemHeading: "A deadline list does not tell you how to start",
    problem: "It is easy to keep a calendar of due dates and still have no clear time set aside for reading, practice or revision. When planning is disconnected from learning, important study can be left until the deadline is close.",
    solutionHeading: "Turn academic priorities into scheduled study",
    solution: "Use CampusHut to organise tasks, plan study sessions and keep assignment reminders visible. When it is time to study, open the AI Study Assistant, generated courses, quizzes or flashcards to give the session a concrete focus.",
    features: [
      { title: "Study planner", description: "Map learning goals and study sessions into a routine that works around academic commitments." },
      { title: "Task scheduler", description: "Keep upcoming tasks and assignments organised alongside your plans." },
      { title: "Reminders and revision", description: "Use assignment reminders and AI practice tools to follow through on planned work." },
    ],
    benefits: ["Make study time visible before the week becomes crowded.", "Break broad academic goals into focused sessions.", "Keep planning connected to the learning tools you use to revise."],
    steps: [
      { title: "Add commitments", description: "Start with classes, assignments and important academic dates." },
      { title: "Make a realistic plan", description: "Set aside sessions for reading, practice and revision around your schedule." },
      { title: "Review and adapt", description: "Use reminders to stay aware of tasks and adjust your plan as the semester changes." },
    ],
    faq: [
      { question: "What should a university study planner include?", answer: "A useful planner helps organise study sessions alongside academic tasks and deadlines. CampusHut combines planning with scheduling, reminders and learning support." },
      { question: "Can CampusHut help me plan exam revision?", answer: "You can organise revision sessions and use AI-generated courses, quizzes and flashcards as part of your preparation." },
      { question: "Does the planner replace my university timetable?", answer: "No. Use CampusHut alongside your official timetable and university communications." },
    ],
    image: { src: taskScheduler.url, alt: "CampusHut schedule view for student tasks, deadlines and study plans" },
    related: ["student-productivity-app-nigeria", "cgpa-tracker-app", "best-student-app-nigeria"],
  },
  {
    slug: "student-success-app-africa",
    title: "A student success app in Africa",
    metaTitle: "Student Success App in Africa | CampusHut",
    metaDescription: "CampusHut supports student success in Africa with AI learning tools, study planning, academic reminders and progress tracking.",
    focusKeyword: "student success app in Africa",
    intro: "Student success is built through everyday decisions: what to study, how to organise a week and where to find support when a topic is difficult. CampusHut brings learning and planning tools together for students in Africa's universities and tertiary institutions.",
    problemHeading: "Academic ambition needs practical support",
    problem: "Students can have clear goals and still face fragmented resources, inconsistent routines and competing deadlines. The tools they use should help make the next academic step easier to see and act on.",
    solutionHeading: "Support the full student learning routine",
    solution: "CampusHut combines an AI Study Assistant, generated courses and practice materials with a task scheduler, assignment reminders, CGPA tracking and learning resources. Students can build an academic profile, plan their work and return to progress over time.",
    features: [
      { title: "Personalised study guidance", description: "Use academic goals and learning preferences to receive recommendations and study support." },
      { title: "Organisation tools", description: "Keep study plans, tasks and assignment reminders in view as coursework progresses." },
      { title: "Progress and opportunity", description: "Track academic progress and explore learning, project and career resources available through CampusHut." },
    ],
    benefits: ["Bring study support and academic organisation together.", "Build a repeatable routine for coursework, practice and revision.", "Keep learning connected to longer-term academic and career goals."],
    steps: [
      { title: "Create your student profile", description: "Add your institution, courses, level and academic goals." },
      { title: "Use tools for the task ahead", description: "Choose learning guidance, practice materials or planning tools to support your current work." },
      { title: "Review your progress", description: "Return to your goals and update your routine as your courses and priorities change." },
    ],
    faq: [
      { question: "What is a student success app?", answer: "A student success app brings together tools that support learning, organisation and academic progress. CampusHut combines AI learning support with planning, reminders and progress features." },
      { question: "Is CampusHut designed for African students?", answer: "CampusHut is designed for students at higher institutions in Africa, with a focus on practical academic support." },
      { question: "Does CampusHut guarantee better grades?", answer: "No app can guarantee academic results. CampusHut provides tools students can use to organise study, practise course concepts and review their progress." },
    ],
    image: { src: "/assets/SeoStudentSuccess.png", alt: "CampusHut home screen with the study streak and AI recommendations supporting student success" },
    related: ["best-student-app-nigeria", "student-productivity-app-nigeria", "ai-study-app-for-university-students"],
  },
];

export const landingPageBySlug = (slug: string) =>
  seoLandingPages.find((page) => page.slug === slug);