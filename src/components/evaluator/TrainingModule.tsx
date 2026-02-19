import { useState } from 'react'
import { Bar, AICard } from '../shared'

// ── Training Module Content ────────────────────────────────────────

interface Scenario {
  description: string
  question: string
  options: { label: string; correct: boolean; explanation: string }[]
}

interface ModuleContent {
  id: string
  sections: { title: string; content: string }[]
  scenarios: Scenario[]
  passingScore: number
}

const MODULE_CONTENT: Record<string, ModuleContent> = {
  'ET-01': {
    id: 'ET-01',
    sections: [
      {
        title: 'The Trust Question',
        content:
          'Every sign-off comes down to one question: "Would I trust this technician to do this task unsupervised on an aircraft going back to a customer tomorrow?" This is the competency standard. Not "did they get the answer right" or "can they explain the theory" — but would you put your name on their work, knowing it goes on a real aircraft?',
      },
      {
        title: 'Competent vs. Proficient vs. Expert',
        content:
          'We test for competent — not proficient, not expert. A competent technician can perform the task correctly, independently, safely, and consistently. They may work slower than a veteran. They may need to reference documentation. That\'s fine. What matters is the outcome: the work is airworthy, and they can do it without you guiding each step.',
      },
      {
        title: 'Observation, Not Testing',
        content:
          'Your role is to watch the candidate perform the task. You are not quizzing them on theory. You are not testing their memory. You are observing whether they can do the work. If they perform the task correctly, they pass — even if they can\'t recite the relevant FAR from memory.',
      },
      {
        title: 'Evaluate First, Coach After',
        content:
          'During an evaluation, you must not coach. If the candidate starts making an error, do not correct them (unless safety is at risk). Let the evaluation run its course, then give feedback. If you coached them through it, you evaluated your own teaching — not their competency. The candidate needs to demonstrate that they can do it on their own.',
      },
    ],
    scenarios: [
      {
        description:
          'A candidate is performing a pitot-static test. They correctly connect the test equipment, run the procedure accurately, and document results properly. However, they hesitated twice and had to look at the manual to confirm the altitude tolerance.',
        question: 'Is this candidate competent?',
        options: [
          {
            label: 'Yes — competent',
            correct: true,
            explanation:
              'Correct. Referencing the manual is acceptable. The candidate performed the task correctly, independently, and safely. Hesitation is normal — we\'re testing competency, not speed.',
          },
          {
            label: 'No — not yet qualified',
            correct: false,
            explanation:
              'Incorrect. Referencing documentation is acceptable and even encouraged. The standard is competency, not memorization. The candidate performed the task correctly.',
          },
          {
            label: 'Need more observation',
            correct: false,
            explanation:
              'The description provides sufficient information. The candidate performed all steps correctly and documented results. This meets the competency standard.',
          },
        ],
      },
      {
        description:
          'A candidate wires a connector pin-to-pin correctly, but when you ask them to explain the wire routing logic, they struggle to articulate the reasoning behind the schematic layout.',
        question: 'Is this candidate competent at the wiring task?',
        options: [
          {
            label: 'No — they can\'t explain the reasoning',
            correct: false,
            explanation:
              'Incorrect. We evaluate practical demonstration, not theoretical explanation. If the wiring was done correctly, the task is competent.',
          },
          {
            label: 'Yes — the work was done correctly',
            correct: true,
            explanation:
              'Correct. The evaluation is based on observation of the task performance. The candidate wired it correctly. Verbal explanation of theory is not part of the practical competency standard.',
          },
          {
            label: 'Partial credit — sign off with notes',
            correct: false,
            explanation:
              'There is no partial credit in competency-based evaluation. Either the task was performed to standard or it wasn\'t. In this case, it was.',
          },
        ],
      },
      {
        description:
          'During a navigation system test, you notice the candidate is about to skip the self-test step. You mention "don\'t forget the self-test" and they complete the procedure correctly after your prompt.',
        question: 'Can you sign off this task?',
        options: [
          {
            label: 'Yes — they completed it correctly after the reminder',
            correct: false,
            explanation:
              'Incorrect. You coached the candidate during the evaluation. They did not demonstrate independent competency — you intervened before they could show whether they would have caught the error themselves.',
          },
          {
            label: 'No — the coaching invalidated the evaluation',
            correct: true,
            explanation:
              'Correct. By prompting them, you turned this into a coached performance rather than an independent evaluation. The candidate should try again on another occasion without prompts.',
          },
          {
            label: 'Yes, but note the prompt in the sign-off notes',
            correct: false,
            explanation:
              'Notes don\'t fix a compromised evaluation. The standard requires "independently" — the candidate was prompted. Schedule a re-evaluation.',
          },
        ],
      },
    ],
    passingScore: 3,
  },

  'ET-02': {
    id: 'ET-02',
    sections: [
      {
        title: 'Reading the Task Preparation Briefs',
        content:
          'Each of the 65 tasks has a preparation brief that outlines what the candidate should know and be able to demonstrate. Before evaluating a task, review the prep brief to understand what "good" looks like. The brief includes key preparation topics, observable behaviors to watch for, and common errors.',
      },
      {
        title: 'Observable Behaviors vs. Assumptions',
        content:
          'Base your evaluation on what you actually observe, not what you assume. "They probably know how to do this" is not an observation. "I watched them correctly identify the test points, connect the equipment, and record accurate readings" is an observation. Write down what you see, not what you think.',
      },
      {
        title: 'Critical Errors — Automatic Not-Yet',
        content:
          'Some errors are automatic failures regardless of other performance: safety violations (no eye protection during soldering, working on energized circuits without lockout), skipping required documentation, damaging equipment or components, and falsifying test results. These are non-negotiable.',
      },
      {
        title: 'Documenting What You Observe',
        content:
          'Good sign-off notes are specific and behavioral: "Candidate correctly soldered 14-pin connector with proper heat sink application, inspected under 10x magnification, zero defects." Poor notes: "Looked good." Notes serve as evidence of competency and protect both you and the candidate.',
      },
    ],
    scenarios: [
      {
        description:
          'You\'re evaluating a candidate on cable harness fabrication. They complete the harness, but you notice one cable tie is slightly off-spec (5mm from the specified position instead of within 3mm). All other work is excellent.',
        question: 'How should you handle this?',
        options: [
          {
            label: 'Sign off — minor discrepancy doesn\'t affect airworthiness',
            correct: false,
            explanation:
              'Incorrect. Specifications exist for reasons. If the tolerance is defined, work outside that tolerance is not to specification. The right approach is to note the discrepancy and have them correct it.',
          },
          {
            label: 'Not Yet Qualified — they need to redo the entire harness',
            correct: false,
            explanation:
              'This is overly harsh. A single correctable discrepancy doesn\'t invalidate the entire demonstration. The candidate should correct the specific issue.',
          },
          {
            label: 'Have them correct it, then evaluate the corrected work',
            correct: true,
            explanation:
              'Correct. Point out the discrepancy, have them fix it, and evaluate the final product. If they can identify and correct it properly, that demonstrates competency. Note the correction in your sign-off notes.',
          },
        ],
      },
      {
        description:
          'A candidate performs a transponder test and gets all the correct readings. But their test data sheet has one field left blank — the equipment serial number.',
        question: 'Can you sign off the task?',
        options: [
          {
            label: 'Yes — the actual test was performed correctly',
            correct: false,
            explanation:
              'Incomplete documentation is a critical error. The work isn\'t done until the paperwork is done. Documentation is part of the task.',
          },
          {
            label: 'No — incomplete documentation means incomplete task',
            correct: true,
            explanation:
              'Correct. Documentation is integral to every task. A blank field means the record is incomplete. Have them complete the documentation, then review the entire package.',
          },
          {
            label: 'Sign off with a note about the missing field',
            correct: false,
            explanation:
              'You can\'t sign off incomplete work with a note. The candidate needs to complete all aspects of the task, including documentation, before sign-off.',
          },
        ],
      },
      {
        description:
          'Write appropriate sign-off notes for a candidate who successfully demonstrated an ILS localizer alignment. They used the correct test equipment, followed the approved procedure, achieved results within tolerance, and documented everything properly.',
        question: 'Which sign-off notes are most appropriate?',
        options: [
          {
            label: '"Looks good. Pass."',
            correct: false,
            explanation:
              'Too vague. This provides no evidence of what was observed. Good notes describe specific actions and outcomes.',
          },
          {
            label: '"Candidate aligned ILS localizer using IFR-6000 per maintenance manual procedure 34-51. DDM readings within ±0.005 tolerance at all test points. Documentation complete and accurate."',
            correct: true,
            explanation:
              'Excellent. These notes are specific, reference the equipment and procedure used, cite actual measurements, and confirm documentation. This is evidence-based evaluation.',
          },
          {
            label: '"Candidate seemed confident and knowledgeable about the procedure."',
            correct: false,
            explanation:
              'This describes feelings and impressions, not observations. "Seemed confident" is subjective. Notes should describe what the candidate did, not how they appeared.',
          },
        ],
      },
    ],
    passingScore: 3,
  },

  'ET-03': {
    id: 'ET-03',
    sections: [
      {
        title: 'The Halo Effect',
        content:
          'When a candidate does well on one task, it\'s tempting to assume they\'ll do well on all tasks. This is the halo effect. A technician who excels at avionics troubleshooting may still struggle with wire harness fabrication. Each task must be evaluated independently on its own merits.',
      },
      {
        title: 'Familiarity Bias',
        content:
          'Your most experienced technician still needs to demonstrate competency. "I know they can do this" is not the same as "I watched them do this." Every candidate gets the same standard — new hire or 20-year veteran. The sign-off means you observed the performance, not that you believe in the person.',
      },
      {
        title: 'Anchoring',
        content:
          'First impressions stick. If a candidate struggles at the start of a task, you might view the entire performance negatively — even if they recover and complete it well. Conversely, a strong start might cause you to overlook later errors. Evaluate the complete performance, not just the beginning.',
      },
      {
        title: 'Saying "Not Yet" to Someone You Know',
        content:
          'This is the hardest part of being an evaluator. When a coworker or friend doesn\'t meet the standard, you have to say so. Remember: you\'re protecting the candidate, the customer, and the integrity of the program. A premature sign-off helps no one. "Not yet qualified" is feedback, not failure — it tells them what to work on.',
      },
    ],
    scenarios: [
      {
        description:
          'Marcus is your best bench technician — 15 years of experience. He\'s been doing autopilot work for years. He asks you to sign off Task 5-03 (autopilot servo testing) based on the fact that you\'ve seen him do this work "a hundred times" over the years.',
        question: 'Can you sign off based on your history with Marcus?',
        options: [
          {
            label: 'Yes — you\'ve observed this competency over many years',
            correct: false,
            explanation:
              'Incorrect. Sign-offs must be based on a specific, current observation — not accumulated history. Marcus needs to demonstrate the task in a formal evaluation setting.',
          },
          {
            label: 'No — each sign-off requires a fresh, formal observation',
            correct: true,
            explanation:
              'Correct. Past performance doesn\'t substitute for current observation. Marcus needs to perform the task while you formally evaluate it. This protects both of you and the integrity of the program.',
          },
          {
            label: 'Only if he does a quick demo right now',
            correct: false,
            explanation:
              'A proper evaluation requires the full task performance under proper conditions, not a rushed demo. Set up a proper evaluation opportunity.',
          },
        ],
      },
      {
        description:
          'Sarah is evaluating her first task. She struggles initially with setting up the test equipment but recovers well, performs the actual procedure flawlessly, and documents everything correctly. Your initial impression was negative because of the setup difficulty.',
        question: 'How should you rate this evaluation?',
        options: [
          {
            label: 'Not Yet Qualified — she struggled with setup',
            correct: false,
            explanation:
              'This is anchoring bias — your initial negative impression is coloring the entire evaluation. The setup is part of the task, but she recovered and completed everything correctly.',
          },
          {
            label: 'Competent — evaluate the complete performance, not just the start',
            correct: true,
            explanation:
              'Correct. Fight the anchoring bias. She demonstrated competency in the complete task. Some initial hesitation is normal and acceptable. The question is whether the work was done correctly, independently, safely, and consistently.',
          },
          {
            label: 'Ask her to do it again from scratch',
            correct: false,
            explanation:
              'Not necessary. She completed the task correctly. Requiring a do-over due to initial hesitation is letting anchoring bias drive the evaluation.',
          },
        ],
      },
      {
        description:
          'Tyler is a friend of yours outside of work. During an evaluation, he incorrectly identifies two wire gauges and uses the wrong crimp tool for the connector type. He laughs it off and says "close enough, right?"',
        question: 'What should you do?',
        options: [
          {
            label: 'Sign off — he\'s close enough and you don\'t want to hurt the friendship',
            correct: false,
            explanation:
              'This is familiarity bias at its worst. Signing off incorrect work puts your name on substandard performance. Wrong wire gauge and wrong crimp tool are objective failures.',
          },
          {
            label: 'Record Not Yet Qualified with specific areas to improve',
            correct: true,
            explanation:
              'Correct. Document specifically what went wrong: incorrect wire gauge identification and wrong crimp tool selection. These are the areas to improve. Your friendship doesn\'t change the standard.',
          },
          {
            label: 'Let him try again right now with hints',
            correct: false,
            explanation:
              'Coaching during evaluation invalidates the result. He needs to study the wire types and crimp specifications, then schedule a new evaluation.',
          },
        ],
      },
      {
        description:
          'You\'ve just signed off 6 tasks for a very talented candidate in one session. The 7th task is a borderline performance — technically acceptable but you wouldn\'t describe it as confident execution.',
        question: 'What bias might affect your judgment here?',
        options: [
          {
            label: 'Halo effect — previous good performance may cause you to overlook issues',
            correct: true,
            explanation:
              'Correct. The halo from 6 strong performances can make you more lenient on the 7th. Each task stands alone. If this performance is truly borderline, evaluate it on its own merits without considering the prior successes.',
          },
          {
            label: 'Anchoring — you\'re anchored to the first impression of this task',
            correct: false,
            explanation:
              'The primary risk here is the halo effect from the 6 previous successes, not anchoring within this specific task.',
          },
          {
            label: 'No bias — the candidate has proven their ability',
            correct: false,
            explanation:
              'Each task is evaluated independently. Previous successes don\'t guarantee competency on the current task. This thinking IS the halo effect.',
          },
        ],
      },
    ],
    passingScore: 4,
  },

  'ET-04': {
    id: 'ET-04',
    sections: [
      {
        title: 'Finding Your Students',
        content:
          'When you log in, the Students tab shows all candidates assigned to your shop. You can see each student\'s overall progress, category breakdown, and pace analysis. Use the search bar to quickly find a specific candidate. Click any student to see their full task list.',
      },
      {
        title: 'The Digital Sign-off',
        content:
          'When a candidate demonstrates competency, find their name, navigate to the task, and click "Sign Off." You\'ll see the evaluation criteria from the task prep brief. Review each criterion, add your notes describing what you observed, and confirm. Your name, timestamp, and notes are permanently recorded.',
      },
      {
        title: 'Writing Effective Notes',
        content:
          'Sign-off notes should be specific and evidence-based. Include: what equipment was used, what procedure was followed, key measurements or results observed, and any notable aspects of the performance. Avoid vague statements like "did well" or "looked good." Notes are part of the permanent qualification record.',
      },
      {
        title: 'Reversing a Sign-off',
        content:
          'If you made an error or discover that a sign-off was premature, use the Reverse button. You must provide a reason for the reversal. Reversals are logged with your name and timestamp. The candidate will need to re-demonstrate the task. Use reversals rarely and only when genuinely warranted.',
      },
    ],
    scenarios: [
      {
        description:
          'You signed off Task 3-04 for a candidate last week. Today, you observed them doing similar work on a production job and noticed they were using an incorrect technique that could cause intermittent connections.',
        question: 'What should you do?',
        options: [
          {
            label: 'Reverse the sign-off and have them re-evaluate',
            correct: true,
            explanation:
              'Correct. If you have evidence that the candidate cannot consistently perform the task correctly, a reversal is warranted. Note the specific technique issue as your reversal reason.',
          },
          {
            label: 'Leave the sign-off — it was valid at the time',
            correct: false,
            explanation:
              'Sign-offs represent current competency. If you now have evidence the candidate can\'t consistently perform the task safely, the sign-off should be reversed. Consistency is part of the standard.',
          },
          {
            label: 'Coach them but don\'t reverse — everyone has off days',
            correct: false,
            explanation:
              'An incorrect technique that could cause intermittent connections is a safety and quality issue, not an "off day." Reverse and re-evaluate.',
          },
        ],
      },
      {
        description:
          'You need to sign off a task but notice the "Notes" field is optional. You performed a thorough evaluation.',
        question: 'Should you add notes even though they\'re optional?',
        options: [
          {
            label: 'No — if it\'s optional, skip it to save time',
            correct: false,
            explanation:
              'While technically optional, notes significantly strengthen the qualification record. They\'re your evidence of what you observed.',
          },
          {
            label: 'Yes — always document what you observed',
            correct: true,
            explanation:
              'Correct. Good evaluators always document their observations. Notes protect you, the candidate, and the program. "Candidate tested NAV receiver sensitivity using IFR-4000, all channels within spec, documented in test data sheet #2847" is a professional record.',
          },
          {
            label: 'Only for borderline evaluations',
            correct: false,
            explanation:
              'All evaluations benefit from documentation, not just borderline ones. Notes demonstrate the thoroughness of your evaluation process.',
          },
        ],
      },
    ],
    passingScore: 2,
  },

  'ET-05': {
    id: 'ET-05',
    sections: [
      {
        title: 'Why Calibration Matters',
        content:
          'Different evaluators will naturally have different thresholds for "competent." Calibration exercises ensure that all evaluators across all shops apply the same standard. If Shop A signs off candidates who can barely perform a task while Shop B requires perfection, the certification loses its meaning.',
      },
      {
        title: 'Scenario 1: Clear Competency',
        content:
          'A candidate connects a GPS antenna, performs the installation per the STC instructions, runs the system test, and verifies signal acquisition across all visible satellites. Work is clean, properly secured, and documented. The candidate worked methodically and referenced the STC document twice during installation. This is clear competency — correct, independent, safe, consistent.',
      },
      {
        title: 'Scenario 2: Borderline — One Prompt Needed',
        content:
          'A candidate is performing a comm radio installation check. They complete the physical installation correctly, perform the audio checks, verify transmit power — but forget to log the frequency range test. The evaluator says "anything else to check?" and the candidate then completes the frequency range test. This is NOT competent — the evaluator prompted, invalidating independence.',
      },
      {
        title: 'Scenario 3: Not Yet Qualified',
        content:
          'A candidate attempts an EGPWS database update. They connect the loader correctly but select the wrong database file. They don\'t perform the verification check after loading. When asked (after the evaluation), they can\'t explain how to verify the database version. Multiple errors across different aspects of the task — clearly not yet competent.',
      },
    ],
    scenarios: [
      {
        description:
          'Scenario A: A candidate performs a marker beacon test. They set up the equipment correctly, run the test, and all sensitivity readings are within limits. However, they used a test procedure from memory rather than having the manual open on the bench.',
        question: 'Score this evaluation:',
        options: [
          {
            label: 'Competent — correct results obtained through proper method',
            correct: true,
            explanation:
              'Correct. Working from memory is acceptable as long as the procedure is followed correctly and results are within limits. Having the manual open is good practice but not required if the work is correct.',
          },
          {
            label: 'Not yet — should have referenced the manual',
            correct: false,
            explanation:
              'We don\'t require manual reference if the procedure is followed correctly. The standard is competency (correct, independent, safe, consistent), not adherence to a specific study method.',
          },
          {
            label: 'Cannot determine from this description',
            correct: false,
            explanation:
              'The description provides sufficient detail: correct setup, correct procedure, results within limits. This meets the competency standard.',
          },
        ],
      },
      {
        description:
          'Scenario B: A candidate performs an altimeter correlation check. During the test, they notice a discrepancy at 18,000 feet and independently decide to re-run that test point. The second reading is within tolerance. They document both readings in their test data.',
        question: 'Score this evaluation:',
        options: [
          {
            label: 'Not yet — the first reading was out of tolerance',
            correct: false,
            explanation:
              'The candidate identified the issue independently and took appropriate action. Re-testing a questionable data point is proper procedure, not a failure.',
          },
          {
            label: 'Competent — demonstrated critical thinking and proper procedure',
            correct: true,
            explanation:
              'Correct. Identifying a suspect reading, independently deciding to re-test, obtaining proper results, and documenting both readings demonstrates strong competency. This is actually above-average performance.',
          },
          {
            label: 'Competent, but note the initial discrepancy as a concern',
            correct: false,
            explanation:
              'The initial discrepancy is not a concern — it\'s evidence of competency. The candidate caught it and handled it properly. An initial out-of-tolerance reading can have many causes (equipment settling, environmental factors).',
          },
        ],
      },
      {
        description:
          'Scenario C: A candidate is performing a VOR receiver accuracy check. They connect the test set, but orient the course card 180 degrees off. They proceed through the entire test without noticing the error. When results don\'t match expected values, they express confusion but don\'t identify the root cause.',
        question: 'Score this evaluation:',
        options: [
          {
            label: 'Competent — they did the physical work correctly',
            correct: false,
            explanation:
              'The physical connection alone doesn\'t constitute competency. A 180-degree error on the course card is a fundamental setup mistake that invalidates all readings. The candidate couldn\'t identify the cause.',
          },
          {
            label: 'Not Yet Qualified — fundamental setup error not caught',
            correct: true,
            explanation:
              'Correct. A 180-degree orientation error is fundamental, and the inability to identify the root cause of unexpected results shows a gap in understanding. The candidate needs more practice with VOR test procedures.',
          },
          {
            label: 'Have them redo it with guidance',
            correct: false,
            explanation:
              'Guidance during evaluation invalidates independence. Record NYQ with specific areas to improve, then schedule a fresh evaluation after the candidate has studied.',
          },
        ],
      },
    ],
    passingScore: 3,
  },
}

// ── Training Module Component ──────────────────────────────────────

interface TrainingModuleProps {
  moduleId: string
  moduleTitle: string
  onComplete: (score: number) => void
  onBack: () => void
}

export function TrainingModule({ moduleId, moduleTitle, onComplete, onBack }: TrainingModuleProps) {
  const content = MODULE_CONTENT[moduleId]
  const [phase, setPhase] = useState<'reading' | 'assessment' | 'results'>('reading')
  const [currentSection, setCurrentSection] = useState(0)
  const [currentScenario, setCurrentScenario] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(
    content ? new Array(content.scenarios.length).fill(null) : []
  )
  const [showExplanation, setShowExplanation] = useState(false)

  if (!content) {
    return (
      <div className="text-center py-12 text-slate-500">
        Module content not available.
        <button onClick={onBack} className="block mx-auto mt-4 text-xs text-slate-400 hover:text-white">
          ← Back to Training
        </button>
      </div>
    )
  }

  const totalSections = content.sections.length
  const totalScenarios = content.scenarios.length
  const correctCount: number = answers.reduce<number>((count, ans, i) => {
    if (ans === null) return count
    return count + (content.scenarios[i].options[ans].correct ? 1 : 0)
  }, 0)
  const passed = correctCount >= content.passingScore

  function selectAnswer(optionIndex: number) {
    if (answers[currentScenario] !== null) return // Already answered
    const newAnswers = [...answers]
    newAnswers[currentScenario] = optionIndex
    setAnswers(newAnswers)
    setShowExplanation(true)
  }

  function nextScenario() {
    setShowExplanation(false)
    if (currentScenario < totalScenarios - 1) {
      setCurrentScenario(currentScenario + 1)
    } else {
      setPhase('results')
    }
  }

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-xs text-slate-500 hover:text-slate-300">
        ← Back to Training
      </button>

      {/* Module header */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-indigo-400">{moduleId}</span>
          <h2 className="text-lg font-bold text-white">{moduleTitle}</h2>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => setPhase('reading')}
            className={`text-xs px-3 py-1 rounded-md ${
              phase === 'reading' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Reading ({currentSection + 1}/{totalSections})
          </button>
          <button
            onClick={() => { if (phase !== 'reading') setPhase('assessment') }}
            className={`text-xs px-3 py-1 rounded-md ${
              phase === 'assessment' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            } ${phase === 'reading' ? 'opacity-50' : ''}`}
          >
            Assessment ({answers.filter(a => a !== null).length}/{totalScenarios})
          </button>
          {phase === 'results' && (
            <span className={`text-xs font-bold ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
              {passed ? 'PASSED' : 'NOT PASSED'}
            </span>
          )}
        </div>
      </div>

      {/* READING PHASE */}
      {phase === 'reading' && (
        <div className="space-y-4">
          <Bar
            pct={Math.round(((currentSection + 1) / totalSections) * 100)}
            color="bg-indigo-500"
            h="h-1"
            showPct={false}
          />

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
            <h3 className="text-base font-semibold text-white mb-3">
              {content.sections[currentSection].title}
            </h3>
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {content.sections[currentSection].content}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className="text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed px-3 py-1.5"
            >
              ← Previous
            </button>
            {currentSection < totalSections - 1 ? (
              <button
                onClick={() => setCurrentSection(currentSection + 1)}
                className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md font-medium"
              >
                Next Section →
              </button>
            ) : (
              <button
                onClick={() => { setPhase('assessment'); setCurrentScenario(0) }}
                className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-md font-medium"
              >
                Begin Assessment →
              </button>
            )}
          </div>
        </div>
      )}

      {/* ASSESSMENT PHASE */}
      {phase === 'assessment' && (
        <div className="space-y-4">
          <Bar
            pct={Math.round(((currentScenario + 1) / totalScenarios) * 100)}
            color="bg-amber-500"
            h="h-1"
            showPct={false}
          />

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
            <div className="text-xs text-slate-500 mb-2">
              Scenario {currentScenario + 1} of {totalScenarios}
            </div>
            <div className="text-sm text-slate-300 leading-relaxed mb-4 bg-slate-800/50 rounded-lg p-3 border-l-2 border-indigo-500">
              {content.scenarios[currentScenario].description}
            </div>
            <h4 className="text-sm font-semibold text-white mb-3">
              {content.scenarios[currentScenario].question}
            </h4>
            <div className="space-y-2">
              {content.scenarios[currentScenario].options.map((opt, oi) => {
                const selected = answers[currentScenario] === oi
                const answered = answers[currentScenario] !== null
                const isCorrect = opt.correct
                return (
                  <button
                    key={oi}
                    onClick={() => selectAnswer(oi)}
                    disabled={answered}
                    className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                      !answered
                        ? 'border-slate-700 hover:border-slate-500 text-slate-300'
                        : selected && isCorrect
                          ? 'border-emerald-600 bg-emerald-950/30 text-emerald-300'
                          : selected && !isCorrect
                            ? 'border-rose-600 bg-rose-950/30 text-rose-300'
                            : isCorrect && answered
                              ? 'border-emerald-600/50 bg-emerald-950/20 text-emerald-400'
                              : 'border-slate-800 text-slate-600'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 mt-0.5">
                        {answered
                          ? selected && isCorrect
                            ? '✓'
                            : selected && !isCorrect
                              ? '✗'
                              : isCorrect
                                ? '✓'
                                : '○'
                          : '○'}
                      </span>
                      <span>{opt.label}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && answers[currentScenario] !== null && (
            <AICard
              title={content.scenarios[currentScenario].options[answers[currentScenario]!].correct ? 'Correct' : 'Incorrect'}
              variant={content.scenarios[currentScenario].options[answers[currentScenario]!].correct ? 'success' : 'warning'}
            >
              {content.scenarios[currentScenario].options[answers[currentScenario]!].explanation}
            </AICard>
          )}

          {showExplanation && (
            <div className="flex justify-end">
              <button
                onClick={nextScenario}
                className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-md font-medium"
              >
                {currentScenario < totalScenarios - 1 ? 'Next Scenario →' : 'See Results →'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* RESULTS PHASE */}
      {phase === 'results' && (
        <div className="space-y-4">
          <div className={`rounded-lg p-5 border ${
            passed ? 'bg-emerald-950/20 border-emerald-800/40' : 'bg-rose-950/20 border-rose-800/40'
          }`}>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-1 ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                {correctCount}/{totalScenarios}
              </div>
              <div className="text-sm text-slate-300 mb-2">
                {passed ? 'Module Complete!' : 'Not Yet Passed'}
              </div>
              <div className="text-xs text-slate-500">
                Required: {content.passingScore}/{totalScenarios} correct
              </div>
            </div>
          </div>

          {/* Answer review */}
          <div className="space-y-2">
            {content.scenarios.map((scenario, si) => {
              const ans = answers[si]
              const correct = ans !== null && scenario.options[ans].correct
              return (
                <div key={si} className={`bg-slate-900 border rounded-lg p-3 ${
                  correct ? 'border-emerald-800/30' : 'border-rose-800/30'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={correct ? 'text-emerald-400' : 'text-rose-400'}>
                      {correct ? '✓' : '✗'}
                    </span>
                    <span className="text-xs text-slate-400">Scenario {si + 1}</span>
                  </div>
                  <p className="text-xs text-slate-500">{scenario.question}</p>
                  {ans !== null && (
                    <p className="text-xs text-slate-400 mt-1">
                      Your answer: <span className={correct ? 'text-emerald-400' : 'text-rose-400'}>{scenario.options[ans].label}</span>
                    </p>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex gap-2">
            {!passed && (
              <button
                onClick={() => {
                  setPhase('reading')
                  setCurrentSection(0)
                  setCurrentScenario(0)
                  setAnswers(new Array(totalScenarios).fill(null))
                  setShowExplanation(false)
                }}
                className="flex-1 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 font-medium"
              >
                Review & Try Again
              </button>
            )}
            {passed && (
              <button
                onClick={() => onComplete(Math.round((correctCount / totalScenarios) * 100))}
                className="flex-1 py-2 text-sm text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 font-semibold"
              >
                Complete Module
              </button>
            )}
            <button
              onClick={onBack}
              className="flex-1 py-2 text-sm text-slate-400 bg-slate-800 rounded-lg hover:bg-slate-700"
            >
              Back to Training
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
