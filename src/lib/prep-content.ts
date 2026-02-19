// Prep content for the CAET Advanced Practical Qualification Tracker
// In production, this would come from an API or CMS

export interface TaskPrepContent {
  /** Short bullet-point preparation topics */
  prep_topics: string[]
  /** What the evaluator is specifically watching for */
  evaluator_watch: string[]
  /** Common mistakes candidates make */
  common_errors: string[]
  /** Full narrative explanation of the task — what it is, why it matters, technical background */
  overview: string
  /** Detailed step-by-step study guidance with technical depth */
  study_guide: string[]
  /** Practical tips from experienced technicians */
  pro_tips: string[]
  /** Regulatory references (FARs, ACs, TSOs) */
  references: string[]
}

export const PREP_CONTENT: Record<string, TaskPrepContent> = {
  '1-01': {
    prep_topics: ['Equipment connections', 'Adapter selection', 'Leak prevention during hookup'],
    evaluator_watch: ['Correct adapter for aircraft type', 'No cross-threading', 'System not pressurized during connection'],
    common_errors: ['Using wrong adapter causes leak at connection', 'Failing to cap unused ports', 'Over-tightening fittings'],
    overview: 'Connecting pitot-static test equipment is the foundational skill for all pitot-static system work. You must select the correct adapter for the specific aircraft static port and pitot tube configuration, then make leak-free connections without damaging the aircraft fittings. This task matters because every subsequent test depends on a solid, sealed connection — a leak at the test equipment interface will invalidate all readings and waste time chasing false failures.',
    study_guide: [
      'Identify the aircraft static port and pitot tube type before selecting adapters — common types include flush-mount static ports, protruding pitot tubes, and combined pitot-static probes, each requiring a different adapter.',
      'Ensure the pitot-static test set is within its calibration period and that all hoses are in good condition with no cracks, kinks, or contamination before connecting.',
      'Apply thread sealant or use O-ring adapters as appropriate for the connection type, but never use Teflon tape on AN fittings as it can introduce debris into the system.',
      'Cap or plug all unused ports on both the aircraft and the test set to prevent leaks during testing — an open port will make the system impossible to test accurately.',
      'After connecting, perform a preliminary quick-check by applying a small amount of pressure and monitoring for any immediate drop before beginning formal test procedures.',
      'Document which adapters were used for the specific aircraft type so the information is available for future tests on the same airframe.'
    ],
    pro_tips: [
      'Keep a labeled adapter kit organized by aircraft type — searching for the right adapter wastes time and increases the risk of selecting the wrong one.',
      'Always hand-tighten first to confirm thread engagement before using any wrench — cross-threading a static port fitting is an expensive mistake.',
      'Bring spare O-rings for your adapters to the aircraft; they wear out and a degraded O-ring is the most common source of connection leaks.',
      'If you encounter an unfamiliar static port configuration, consult the aircraft maintenance manual rather than forcing an adapter that seems close.'
    ],
    references: [
      '14 CFR 43, Appendix E — Altimeter System Test and Inspection',
      'AC 43.13-1B Chapter 12 — Instrument Systems',
      'Manufacturer test equipment operating manual for adapter selection charts'
    ],
  },
  '1-02': {
    prep_topics: ['Part 43 Appendix E procedures', 'Non-pressurized vs pressurized tolerances', 'Wait time requirements'],
    evaluator_watch: ['Correct altitude for test', 'Proper wait time', 'Accurate leak rate calculation'],
    common_errors: ['Pumping system during wait period', 'Wrong tolerance for aircraft type', 'Not allowing system to stabilize'],
    overview: 'The static system leak check per 14 CFR 91.411 is a required biennial test for aircraft operating under IFR. You evacuate the static system to a specified altitude and then monitor the leak rate over a one-minute period to confirm it falls within regulatory tolerances. This test ensures that the static system provides accurate pressure data to altimeters, airspeed indicators, and vertical speed indicators — instruments pilots rely on for safe IFR flight.',
    study_guide: [
      'Know the tolerances: for unpressurized aircraft, the static system must not leak more than 100 feet of altitude in one minute when tested at a minimum of 1,000 feet above the airfield elevation.',
      'For pressurized aircraft, the tolerances are tighter and additional tests at higher altitudes may be required — always consult 14 CFR Part 43 Appendix E for the specific requirements.',
      'After evacuating to the test altitude, allow the system to stabilize for at least one minute before beginning the timed leak check — temperature equalization causes initial drift that is not a true leak.',
      'Do not pump or adjust the test set during the one-minute wait period; the evaluator will be watching for any manipulation of the readings during the timed test.',
      'Calculate the leak rate accurately: record the altitude at the start and end of the one-minute period and compute the difference — this is your leak rate in feet per minute.',
      'If the system fails the leak check, do not sign it off — you must find and repair the leak, then retest until it passes before returning the system to service.'
    ],
    pro_tips: [
      'Temperature matters: if the aircraft has been sitting in hot sun, the system will take longer to stabilize because heated air in the lines contracts as it cools, mimicking a leak.',
      'Always perform the leak check before the altimeter scale error test — if the system leaks, scale error readings will drift and you will waste time.',
      'If you are right at the tolerance limit, recheck your connections first — a marginal test result often traces back to the test equipment interface rather than the aircraft system.'
    ],
    references: [
      '14 CFR 91.411 — Altimeter System and Altitude Reporting Equipment Tests and Inspections',
      '14 CFR 43, Appendix E — Altimeter System Test and Inspection',
      'AC 43-6A — Altimeter and Static System Test Procedures (if applicable to aircraft type)',
      'AC 43.13-1B Section 12 — Instrument Systems'
    ],
  },
  '1-03': {
    prep_topics: ['Pitot pressure application', 'Airspeed indicator response', 'Heater current check'],
    evaluator_watch: ['Smooth pressure application', 'Correct airspeed reading', 'No leaks under pressure'],
    common_errors: ['Rapid pressure changes can damage instruments', 'Not checking for leaks at connections'],
    overview: 'Testing the pitot system involves applying controlled ram air pressure to the pitot tube and verifying that the airspeed indicator responds correctly, while also confirming pitot heat functionality. The pitot system provides dynamic pressure data essential for airspeed indication, and the pitot heater prevents ice blockage during flight. A malfunctioning pitot system or failed heater has been a contributing factor in multiple fatal accidents, making thorough testing critical.',
    study_guide: [
      'Apply pressure slowly and smoothly using the test set — rapid pressure application can damage diaphragms inside the airspeed indicator, especially on older mechanical instruments.',
      'Verify the airspeed indicator reading at multiple test points against the test set output; compare readings to the instrument calibration card or the expected values from Part 43 Appendix E.',
      'Check the pitot heater by measuring current draw with a clamp-on ammeter while the heater is energized — compare to the manufacturer specification for normal current draw.',
      'Visually confirm that the pitot tube warms up within the expected time frame, typically noticeable by touch within 30-60 seconds depending on the heater element rating.',
      'Inspect the pitot tube drain hole to ensure it is clear — a blocked drain hole can trap moisture and cause erratic airspeed readings or system damage in freezing conditions.'
    ],
    pro_tips: [
      'Never leave the pitot heat on for extended periods during ground testing without airflow — without ram air cooling, the heater can overheat and damage the pitot tube or its internal elements.',
      'If the airspeed indicator reads erratically during pressure application, suspect a kinked or partially blocked pitot line before condemning the instrument.',
      'Use the aircraft circuit breaker panel to energize pitot heat rather than jumping wires — this tests the actual circuit the pilot will use in flight.'
    ],
    references: [
      '14 CFR 43, Appendix E — Altimeter System Test and Inspection (pitot system provisions)',
      'AC 43.13-1B Chapter 12 — Instrument Systems (pitot-static plumbing)',
      'Aircraft-specific maintenance manual for pitot heater current specifications'
    ],
  },
  '1-04': {
    prep_topics: ['Required test points', 'Tolerance at each altitude', 'Scale error vs case leak'],
    evaluator_watch: ['All required points tested', 'Tolerances met at each point', 'Proper documentation of readings'],
    common_errors: ['Missing a required test point', 'Confusing scale error with case leak tolerances'],
    overview: 'The altimeter scale error and case leak test verifies that the altimeter reads accurately across its operating range and that the instrument case itself does not leak. Scale error is the difference between what the altimeter indicates and the actual altitude applied by the test set at each required test point. Case leak is tested separately by sealing the static port connection and checking whether the altimeter drifts due to a leak in the instrument case itself. Both must be within Part 43 Appendix E tolerances.',
    study_guide: [
      'Know the required test points specified in Part 43 Appendix E — typically these include sea level, 1,000 feet, and then at intervals up to the maximum altitude for which the altimeter is approved.',
      'Understand the tolerance table: tolerances vary by altitude, and you must apply the correct tolerance at each test point — a common exam failure is applying the same tolerance across all altitudes.',
      'Distinguish between scale error and case leak: scale error measures accuracy at each altitude, while case leak checks whether the sealed instrument case maintains pressure — these are separate tests with separate tolerances.',
      'For the case leak test, cap the static port input to the altimeter and apply a vacuum equivalent to a specified altitude, then monitor for drift over the required time period.',
      'Record every reading at every test point — the evaluator expects thorough documentation, not just a pass/fail notation.',
      'If an altimeter fails scale error at one or more test points, it must be removed and sent to a certified repair station for recalibration — field adjustment of sensitive altimeters is not permitted.'
    ],
    pro_tips: [
      'Create a pre-formatted data sheet with all required test points and tolerances listed before starting the test — this prevents missing a test point and speeds up documentation.',
      'At each test point, allow the altimeter to stabilize for at least 10-15 seconds before recording the reading — pointer lag is normal and does not indicate a problem.',
      'If you find a case leak, check the altimeter glass-to-case seal and the static port fitting on the back of the instrument before assuming the instrument is defective.'
    ],
    references: [
      '14 CFR 43, Appendix E — Altimeter System Test and Inspection (scale error and case leak tolerances)',
      '14 CFR 91.411 — Altimeter System and Altitude Reporting Equipment Tests',
      'AC 43.13-1B Section 12-29 through 12-33 — Altimeter Testing'
    ],
  },
  '1-05': {
    prep_topics: ['Encoder output vs altimeter', '125-foot tolerance', 'Mode C correlation'],
    evaluator_watch: ['Encoder and altimeter compared at same altitude', 'Within 125 feet at all points'],
    common_errors: ['Not comparing at multiple altitudes', 'Confusing encoder tolerance with altimeter tolerance'],
    overview: 'The altitude encoder correlation check verifies that the altitude reported by the encoding altimeter or blind encoder to the transponder matches the altitude displayed on the primary altimeter within 125 feet. This is critical because ATC relies on the Mode C altitude data for traffic separation. If the encoder output does not correlate with the altimeter display, the aircraft will report an incorrect altitude to ATC, creating a serious safety hazard in the IFR environment.',
    study_guide: [
      'Understand the 125-foot tolerance requirement: at each test altitude, the encoder output (as reported through the transponder) must be within 125 feet of the altimeter indication — this is specified in Part 43 Appendix E.',
      'Test the correlation at multiple altitudes across the operating range, not just at one point — an encoder can be accurate at low altitudes and drift at higher ones due to non-linear errors.',
      'Use the transponder test set to read the Mode C altitude reply while simultaneously reading the altimeter, and compare the two values at each test point.',
      'If the aircraft has a blind encoder (separate from the altimeter), both instruments are reading the same static source but converting pressure independently — differences indicate an encoder calibration error.',
      'Know how Gillham code works: the encoder outputs altitude in 100-foot increments using a parallel Gray code — understanding this helps diagnose specific bit errors that cause fixed-offset failures.',
      'If the correlation fails, determine whether the error is in the encoder or the altimeter before replacing parts — test each independently against the known test set altitude.'
    ],
    pro_tips: [
      'A stuck bit in a Gillham code encoder will produce a characteristic pattern of errors — for example, always being off by exactly 200 feet suggests a specific bit failure in the code output.',
      'Check the encoder static line connection independently of the altimeter static line if they have separate plumbing — a partially blocked encoder static line will cause altitude lag, not a fixed offset.',
      'On modern aircraft with digital altitude sources, the correlation check may be done via ARINC 429 data label monitoring rather than Gillham code — verify which method applies to the aircraft you are testing.'
    ],
    references: [
      '14 CFR 43, Appendix E — Altimeter System Test and Inspection (encoder correlation)',
      '14 CFR 91.217 — Mode C transponder altitude reporting requirements',
      'TSO-C88a — Altitude Encoders (performance standards)',
      'AC 43-6A — Altitude Reporting Equipment Testing'
    ],
  },
  '1-06': {
    prep_topics: ['Heater circuit testing', 'Normal current draw ranges', 'Timer/relay operation'],
    evaluator_watch: ['Current measured with clamp meter or ammeter', 'Heat verified by touch or temp measurement', 'Timer function checked'],
    common_errors: ['Leaving heat on too long on ground without airflow', 'Not verifying both elements if dual-element probe'],
    overview: 'The pitot heat system test goes beyond a simple on/off check to verify the complete heating circuit including current draw, element resistance, timer or relay sequencing, and thermal performance. Pitot heat prevents ice accumulation that can block the pitot tube and cause total loss of airspeed indication — an emergency condition that has caused fatal accidents. The test must confirm that the heater draws the correct current, heats within specification, and that any cycling timers or relays function properly.',
    study_guide: [
      'Measure heater current draw using a clamp-on ammeter on the pitot heat supply wire and compare to the manufacturer specification — typical values range from 3 to 10 amps depending on the aircraft and heater type.',
      'Calculate element resistance by measuring voltage across the heater and dividing by current — compare to the maintenance manual specification to confirm the element is not partially open or shorted.',
      'Verify thermal performance by confirming the pitot tube reaches operating temperature within the specified time, typically 2-5 minutes — use an infrared thermometer or careful touch test.',
      'If the aircraft has a pitot heat timer or cycling relay, verify the on-time and off-time intervals match the specification — some systems cycle to reduce power consumption or prevent overheating.',
      'Check the pitot heat circuit breaker rating and wiring gauge to confirm they match the installation drawing — an undersized breaker will nuisance-trip, while an oversized one will not protect the circuit.'
    ],
    pro_tips: [
      'On dual-element pitot probes, test each element independently — one element can fail while the other masks the failure by keeping the probe partially warm.',
      'Do not touch the pitot tube with bare skin after extended energization; use the back of your hand near the tube first to sense heat before grasping it.',
      'If current draw is low but the heater still warms up, suspect a partially open element — it may work on the ground but fail at altitude where greater heat dissipation demands full current.',
      'Document the actual measured current and compare it to the last test — a trending decrease in current draw indicates a degrading heater element that may fail soon.'
    ],
    references: [
      'AC 43.13-1B Chapter 12 — Instrument Systems (pitot heat provisions)',
      'Aircraft-specific maintenance manual for pitot heater current and resistance specifications',
      'Advisory Circular 91-74B — Pilot Guide: Flight in Icing Conditions (background on pitot heat importance)'
    ],
  },
  '1-07': {
    prep_topics: ['18,000 ft test altitude', '±100 ft/min tolerance', 'Analog vs digital altimeter differences'],
    evaluator_watch: ['Correct test altitude reached', 'Leak rate within tolerance', 'Proper timing of test'],
    common_errors: ['Wrong test altitude', 'Inaccurate timing', 'Not distinguishing case leak from scale error'],
    overview: 'High-altitude static testing verifies system integrity at flight levels above FL180, where pressurized aircraft routinely operate. The test applies significantly greater vacuum to the static system than standard low-altitude checks, exposing leaks and instrument errors that may not appear at lower differential pressures. This is essential for aircraft certified for high-altitude operations where even small static errors translate into large altitude errors.',
    study_guide: [
      'Evacuate the static system to 18,000 feet or higher as specified for the aircraft type, applying vacuum slowly to avoid overstressing sensitive instrument diaphragms.',
      'Know the tolerance: leak rate must not exceed 100 feet per minute at the test altitude for unpressurized aircraft, with tighter requirements for pressurized or RVSM aircraft.',
      'Understand that analog altimeters use mechanical linkages that can introduce non-linear errors at high altitude, while digital altimeters are typically more linear but still require validation.',
      'Allow the system to stabilize for at least one minute at the test altitude before beginning the timed leak rate measurement.',
      'Record the altimeter reading at the start and end of the timed period, and calculate the difference — this is your leak rate in feet per minute.'
    ],
    pro_tips: [
      'At high test altitudes, even small temperature changes in the test hoses will cause significant indicated altitude drift — minimize handling of hoses during the test.',
      'If you see a leak rate that increases with altitude, suspect a fitting that seals at low differential pressure but opens up as the vacuum deepens.',
      'Some test sets have difficulty maintaining stable vacuum at high altitudes — verify your test set is rated for the required altitude before starting.'
    ],
    references: [
      '14 CFR 43, Appendix E — Altimeter System Test and Inspection',
      '14 CFR 91.411 — Altimeter System and Altitude Reporting Equipment Tests',
      'AC 43.13-1B Chapter 12 — Instrument Systems'
    ],
  },
  '1-08': {
    prep_topics: ['Systematic isolation technique', 'Common leak locations', 'Repair methods'],
    evaluator_watch: ['Logical isolation approach', 'Identifies leak location', 'Repair holds under retest'],
    common_errors: ['Shotgun approach instead of systematic isolation', 'Not retesting after repair'],
    overview: 'Troubleshooting a pitot-static leak requires a systematic isolation approach to identify the exact location of air ingress. Rather than randomly replacing fittings, you must divide the system into sections, test each independently, and narrow the leak to a specific fitting, line, or instrument. This skill demonstrates your ability to think analytically and avoid costly shotgun repairs that waste parts and time.',
    study_guide: [
      'Start by confirming the leak exists — perform a baseline leak check and document the leak rate before beginning isolation.',
      'Divide the static system into logical sections using tee fittings and caps to isolate segments: instrument panel connections, lines through the airframe, and static ports.',
      'Test each isolated section independently — the section that fails the leak check contains the leak.',
      'Within the failing section, inspect the most common leak locations first: B-nut fittings, static port gaskets, instrument case connections, and any splice or union in the tubing.',
      'After locating and repairing the leak, perform a complete system leak check to verify the repair and confirm no additional leaks were introduced during the troubleshooting process.'
    ],
    pro_tips: [
      'The most common leak locations are B-nut connections at instrument cases and static port gaskets that have hardened with age — check these first before pulling panels.',
      'Use a small mirror and flashlight to inspect hard-to-see fittings behind instrument panels without removing instruments unnecessarily.',
      'If a leak appears only when the aircraft skin flexes during temperature changes, suspect the static port-to-skin gasket or a cracked fitting at a structural pass-through.'
    ],
    references: [
      '14 CFR 43, Appendix E — Altimeter System Test and Inspection',
      'AC 43.13-1B Chapter 12 — Instrument Systems (static system plumbing)',
      'Aircraft-specific maintenance manual for static system routing diagrams'
    ],
  },
  '1-09': {
    prep_topics: ['OEM/STC data requirements', 'RVSM vs 91.411 tolerances', 'FL290-FL410 requirements', 'LOA requirements'],
    evaluator_watch: ['Uses correct approved data', 'Tighter RVSM tolerances applied', 'All required parameters tested'],
    common_errors: ['Using 91.411 tolerances instead of RVSM', 'Not testing standby altimeter separately', 'Missing LOA requirement in documentation'],
    overview: 'RVSM (Reduced Vertical Separation Minimum) static system testing applies significantly tighter tolerances than standard 91.411 testing for aircraft approved to operate between FL290 and FL410 with 1,000-foot vertical separation. The test must be performed using OEM or STC-approved procedures with calibrated equipment, and the aircraft must hold a current Letter of Authorization. This is among the most demanding pitot-static tests, requiring precision and thorough documentation.',
    study_guide: [
      'Understand that RVSM tolerances are tighter than standard 91.411 tolerances at every test point — the maximum allowable altimetry system error is specified in the RVSM approval documentation.',
      'Both the primary and standby altimeters must be tested independently and meet the RVSM tolerances — a common oversight is testing only the primary altimeter.',
      'Use the specific OEM or STC-approved test procedure for the aircraft type — generic procedures do not apply to RVSM testing.',
      'Verify the aircraft has a current LOA (Letter of Authorization) for RVSM operations and that the test data supports continued approval.',
      'Document the static source error correction (SSEC) values if applicable to the aircraft type — these correct for aerodynamic effects on the static ports at different airspeeds and altitudes.'
    ],
    pro_tips: [
      'RVSM test equipment must have a calibration accuracy significantly better than the tolerance being measured — verify your test set calibration certificate covers the required accuracy.',
      'Some RVSM procedures require testing at specific temperature-corrected altitudes — do not skip the temperature correction step.',
      'Keep a copy of the RVSM Minimum Equipment List (MMEL) provisions handy — operators frequently ask about dispatch with partial RVSM equipment inoperative.'
    ],
    references: [
      '14 CFR 91.180 — RVSM Operations Requirements',
      'AC 91-85 — Authorization of Aircraft and Operators for RVSM',
      '14 CFR 43, Appendix E — Altimeter System Test and Inspection',
      'Aircraft-specific RVSM compliance document or STC'
    ],
  },
  '1-10': {
    prep_topics: ['Required logbook entry elements', 'Data recording', 'Technician signatory requirements'],
    evaluator_watch: ['All required elements present', 'Test data recorded', 'Proper approval statement'],
    common_errors: ['Missing test data in entry', 'Incomplete approval statement', 'Wrong regulation reference'],
    overview: 'Proper documentation of pitot-static test results is a regulatory requirement and a professional obligation. The logbook entry must include all elements specified in 14 CFR Part 43, including a description of the work performed, the test data obtained, the applicable regulation reference, and a proper approval for return to service statement. Incomplete or inaccurate documentation can result in enforcement action and invalidates the test.',
    study_guide: [
      'Include all required elements per 14 CFR 43.9: description of work performed, date of completion, name of person performing the work, signature, certificate number, and approval for return to service.',
      'Record all test data: leak rates at each test altitude, altimeter readings at each scale error test point, encoder correlation results, and pitot system test values.',
      'Reference the correct regulation — for pitot-static: 14 CFR 91.411; for transponder: 14 CFR 91.413. Incorrect references are a common documentation error.',
      'Include the test equipment identification: manufacturer, model, serial number, and calibration due date for the pitot-static test set and any other test equipment used.',
      'The approval for return to service statement must specify that the system meets the requirements of the applicable regulation, not just that the test was performed.'
    ],
    pro_tips: [
      'Create a standardized documentation template for pitot-static tests that includes all required fields — this prevents missing elements under time pressure.',
      'Record the actual measured values, not just pass/fail — this data is invaluable for trend monitoring and troubleshooting future issues.',
      'Double-check the regulation reference before signing — writing 91.413 on a pitot-static entry or 91.411 on a transponder entry is an embarrassing and potentially actionable error.'
    ],
    references: [
      '14 CFR 43.9 — Content, Form, and Disposition of Maintenance Records',
      '14 CFR 43.11 — Content, Form, and Disposition of Records for Inspections',
      '14 CFR 91.411 — Altimeter System and Altitude Reporting Equipment Tests',
      '14 CFR 91.417 — Maintenance Records'
    ],
  },
  '2-01': {
    prep_topics: ['91.413 requirements', 'Transponder test set operation', 'Required test parameters'],
    evaluator_watch: ['All modes tested', 'Reply frequency verified', 'Power output measured'],
    common_errors: ['Missing Mode S specific tests', 'Not testing all reply codes'],
    overview: 'The transponder test per 14 CFR 91.413 is a required biennial test that verifies all transponder modes, reply frequency accuracy, power output, and suppression function. Modern transponders must support Mode A, Mode C, and Mode S at minimum, and the test must confirm proper operation of each. This test is critical for ATC surveillance and traffic separation — a malfunctioning transponder creates a significant safety hazard in controlled airspace.',
    study_guide: [
      'Know the required test parameters from 14 CFR 91.413 and Part 43 Appendix F: reply frequency (1090 MHz +/- 3 MHz), power output (minimum 21 dBW/125 watts peak), suppression ratio, and Mode A/C code accuracy.',
      'Test all installed modes: Mode A (identity), Mode C (altitude reporting), and Mode S (selective address) — each has specific pass/fail criteria.',
      'Verify the reply frequency using the transponder test set frequency counter function — an off-frequency transponder will not be reliably detected by ATC radar.',
      'Measure power output and confirm it meets the minimum specification — low power output is a common cause of intermittent radar contact.',
      'Test the SPI (Special Position Identification) function if the aircraft has an ident button, and verify the suppression function operates correctly to prevent interference.'
    ],
    pro_tips: [
      'Always test with the transponder antenna connected — testing into a dummy load is acceptable, but testing with the actual antenna reveals cable and connector issues that a bench test misses.',
      'Mode S transponders have a unique 24-bit ICAO address — verify this matches the aircraft registration during the test.',
      'If power output is marginally low, check the antenna cable loss before condemning the transponder — 3 dB of cable loss cuts the radiated power in half.'
    ],
    references: [
      '14 CFR 91.413 — ATC Transponder Tests and Inspections',
      '14 CFR 43, Appendix F — ATC Transponder Tests and Inspections',
      'TSO-C112 (Mode S) / TSO-C74c (Mode A/C) — Transponder Performance Standards'
    ],
  },
  '2-02': {
    prep_topics: ['91.227 requirements', 'ADS-B message content', 'Performance parameters'],
    evaluator_watch: ['Position source verified', 'NACp value checked', 'Message content correct'],
    common_errors: ['Not verifying GPS position source separately', 'Ignoring NACp requirement'],
    overview: 'ADS-B Out performance verification confirms that the aircraft broadcasts correct position, velocity, identity, and integrity information on 1090ES or UAT as required by 14 CFR 91.227. Unlike transponder testing, ADS-B verification must confirm the complete chain from GPS position source through the transponder to the transmitted message. This is a relatively new test requirement and many technicians are still developing proficiency.',
    study_guide: [
      'Understand the 91.227 performance requirements: NACp >= 8, NIC, SIL, SDA values must meet minimums, and the position source must be a compliant GPS receiver.',
      'Use an ADS-B test set or monitoring station to capture and decode the actual transmitted ADS-B message content — verify all required fields are present and correct.',
      'Check the GPS position source independently: verify it has current firmware, valid database, and is reporting position with adequate accuracy and integrity.',
      'Verify the aircraft ICAO address in the ADS-B message matches the assigned address for the aircraft registration.',
      'Confirm proper geometric altitude (GNSS altitude) is being reported in addition to pressure altitude — this is a common missing parameter.'
    ],
    pro_tips: [
      'Use the FAA PAPR (Public ADS-B Performance Report) tool online to check if the aircraft has any known ADS-B compliance issues before testing — this can save troubleshooting time.',
      'ADS-B compliance issues are often caused by the GPS source, not the transponder — always verify the GPS receiver performance parameters first.',
      'Some older GPS receivers report NACp values that were adequate when installed but no longer meet current requirements — check for mandatory software updates.'
    ],
    references: [
      '14 CFR 91.227 — ADS-B Out Equipment Performance Requirements',
      'AC 20-165B — ADS-B Out Equipment Performance Requirements',
      'TSO-C166b (1090ES) / TSO-C154c (UAT) — ADS-B Transmit Equipment Standards'
    ],
  },
  '2-03': {
    prep_topics: ['NACp categories', 'GPS integrity monitoring', 'Position accuracy requirements'],
    evaluator_watch: ['NACp >= 8 verified', 'Position source identified', 'Accuracy documented'],
    common_errors: ['Not understanding NACp thresholds', 'Confusing NACp with NIC'],
    overview: 'Navigation Accuracy Category for Position (NACp) is a critical ADS-B integrity parameter that indicates the accuracy of the position source. ADS-B Out requires NACp >= 8, meaning the position is accurate to within 92.6 meters (0.05 nautical miles) with 95% probability. Understanding NACp and how to verify it is essential for ADS-B compliance testing and troubleshooting.',
    study_guide: [
      'Know the NACp scale: NACp 8 = <92.6m, NACp 9 = <30m, NACp 10 = <10m, NACp 11 = <3m — higher numbers indicate better accuracy.',
      'NACp is determined by the GPS receiver based on its position solution quality and is transmitted in the ADS-B message — it is not a fixed configuration setting.',
      'Distinguish NACp from NIC (Navigation Integrity Category): NACp indicates accuracy, while NIC indicates the containment radius within which the position is guaranteed to lie.',
      'Verify NACp by monitoring the ADS-B output during GPS operation — it should consistently report NACp >= 8 when sufficient satellites are tracked with good geometry.',
      'Understand that NACp can degrade temporarily due to poor satellite geometry, interference, or GPS anomalies — a momentary dip below 8 during testing does not necessarily indicate a system failure.'
    ],
    pro_tips: [
      'If NACp is consistently low, check the GPS antenna installation first — a partially obstructed antenna or damaged cable is the most common cause of degraded position accuracy.',
      'Some GPS receivers require a specific minimum number of satellites to report NACp >= 8 — testing in a location with limited sky view may produce artificially low NACp values.',
      'Document the observed NACp values during your test along with satellite count and HDOP — this context helps distinguish equipment problems from environmental factors.'
    ],
    references: [
      '14 CFR 91.227 — ADS-B Out Equipment Performance Requirements',
      'AC 20-165B — ADS-B Out Equipment Performance Requirements (NACp thresholds)',
      'DO-260B / DO-282B — ADS-B MOPS (NACp definition and encoding)'
    ],
  },
  '2-04': {
    prep_topics: ['Common ADS-B failure modes', 'GPS vs transponder path', 'Systematic isolation'],
    evaluator_watch: ['Systematic approach used', 'GPS and transponder paths checked separately', 'Root cause identified'],
    common_errors: ['Replacing transponder when GPS is the issue', 'Not checking antenna connections'],
    overview: 'ADS-B troubleshooting requires understanding that the system has two distinct signal paths: the GPS position source path and the transponder transmission path. Most ADS-B compliance failures originate in the GPS path rather than the transponder, yet technicians commonly replace the transponder first. Systematic isolation of each path is essential to efficient troubleshooting.',
    study_guide: [
      'Start with the FAA PAPR report for the aircraft — it identifies specific compliance failures such as low NACp, incorrect ICAO address, or missing geometric altitude.',
      'Isolate the GPS path first: verify GPS antenna condition, cable integrity, receiver satellite tracking, and output data quality on the ARINC 429 bus to the transponder.',
      'Then verify the transponder path: confirm it is receiving correct GPS data on its input, processing it correctly, and transmitting proper ADS-B messages.',
      'Check the ARINC 429 interface between GPS and transponder — incorrect wiring, wrong bus speed, or label configuration errors can prevent GPS data from reaching the transponder.',
      'Verify the transponder software and configuration match the aircraft installation — some transponders require specific configuration to enable ADS-B Out functionality.'
    ],
    pro_tips: [
      'The most common ADS-B failures are GPS-related: old firmware, expired integrity databases, or antenna issues. Always check the GPS side before the transponder side.',
      'Use a bus analyzer to verify the GPS is actually sending position data to the transponder — a disconnected or miswired 429 bus will produce an ADS-B failure with no other symptoms.',
      'Check for STC compliance bulletins — many ADS-B installations have mandatory software updates that address compliance issues discovered after the initial installation.'
    ],
    references: [
      'AC 20-165B — ADS-B Out Equipment Performance Requirements (troubleshooting guidance)',
      'FAA InFO 16012 — ADS-B Out Compliance and Common Issues',
      'Aircraft-specific ADS-B STC installation instructions and service bulletins'
    ],
  },
  '2-05': {
    prep_topics: ['TCAS self-test procedures', 'Traffic display verification', 'RA logic check'],
    evaluator_watch: ['Self-test initiated correctly', 'TA and RA annunciations verified', 'Antenna function confirmed'],
    common_errors: ['Not verifying both top and bottom antennas', 'Skipping RA audio test'],
    overview: 'The TCAS functional test verifies that the Traffic Collision Avoidance System can detect traffic, generate Traffic Advisories (TAs) and Resolution Advisories (RAs), and drive the correct display and aural annunciations. TCAS is the last line of defense against midair collision, and a thorough functional test ensures the system will perform when needed. The test covers self-test functions, antenna performance, and advisory generation.',
    study_guide: [
      'Initiate the TCAS self-test using the cockpit controls and verify that all annunciations (visual and aural) activate correctly — the self-test exercises the display, speaker, and internal logic.',
      'Verify both directional antennas (top and bottom) are functioning by confirming the system can detect test targets from above and below.',
      'Test TA and RA annunciation separately: TAs provide traffic awareness (amber), while RAs provide escape commands (red) — both must display and annunciate correctly.',
      'Verify the RA audio alert is clearly audible and uses the correct phraseology (e.g., "CLIMB CLIMB", "DESCEND DESCEND", "MONITOR VERTICAL SPEED").',
      'If the aircraft has a TCAS traffic display, verify that traffic symbols appear in the correct relative position and altitude during test target presentation.'
    ],
    pro_tips: [
      'Some TCAS units require external test equipment to inject simulated targets — a simple self-test only checks internal logic, not antenna or receiver performance.',
      'Check the TCAS suppression bus connection to the transponder — if this interface fails, the TCAS may suppress transponder replies during interrogations, degrading ATC surveillance.',
      'Document the self-test results including any fault codes displayed — TCAS units store maintenance history that can reveal intermittent problems not evident during a single test.'
    ],
    references: [
      'TSO-C119c — Traffic Alert and Collision Avoidance System (TCAS) Airborne Equipment',
      'AC 20-131A — Airworthiness Approval of TCAS II',
      'Aircraft-specific TCAS maintenance manual for self-test and functional test procedures'
    ],
  },
  '2-06': {
    prep_topics: ['Active interrogation principle', 'TA vs RA differences', 'RA coordination between aircraft'],
    evaluator_watch: ['Understands active vs passive surveillance', 'Can explain RA escape logic', 'Knows pilot response requirements'],
    common_errors: ['Confusing TCAS active interrogation with ADS-B passive reception', 'Not understanding RA coordination'],
    overview: 'Understanding TCAS theory of operation is essential for avionics technicians working on surveillance systems. TCAS is an active system that interrogates nearby transponders to determine range, bearing, and relative altitude of traffic. It generates TAs for awareness and RAs with specific escape commands when collision is imminent. TCAS RAs are coordinated between equipped aircraft to ensure they do not maneuver into each other.',
    study_guide: [
      'TCAS actively interrogates nearby transponders using 1030 MHz and listens for replies on 1090 MHz — this is fundamentally different from ADS-B, which passively receives broadcast position reports.',
      'Traffic Advisories (TAs) are generated when traffic is projected to pass within a defined volume around your aircraft — TAs provide awareness but no escape command.',
      'Resolution Advisories (RAs) are generated when collision is imminent and provide specific vertical escape commands — pilots are required to follow RAs even if they conflict with ATC instructions.',
      'When two TCAS-equipped aircraft encounter each other, their systems coordinate via Mode S to ensure complementary escape maneuvers — one climbs while the other descends.',
      'Understand the sensitivity levels: TCAS adjusts its protection volume based on altitude, being most sensitive at lower altitudes where closure rates are highest relative to available reaction time.'
    ],
    pro_tips: [
      'When explaining TCAS to pilots or other technicians, emphasize that TCAS is the last line of defense — it assumes all other separation methods (ATC, see-and-avoid, ADS-B) have failed.',
      'A common misconception is that TCAS provides lateral escape commands — it does not. All RAs are vertical only (climb, descend, or maintain vertical speed).',
      'Understanding TCAS theory helps with troubleshooting: if the system generates false RAs, the issue may be antenna sensitivity, transponder power output of nearby aircraft, or incorrect altitude data rather than a TCAS computer fault.'
    ],
    references: [
      'TSO-C119c — TCAS II Equipment Standards',
      'AC 20-131A — Airworthiness Approval of TCAS II',
      'FAA Introduction to TCAS II (Version 7.1) — Operational and Technical Reference'
    ],
  },
  '2-07': {
    prep_topics: ['Antenna placement requirements', 'Pattern coverage', 'Physical inspection criteria'],
    evaluator_watch: ['Antenna condition assessed', 'Mounting hardware inspected', 'Cable connections checked'],
    common_errors: ['Missing corrosion on antenna base', 'Not checking cable for damage'],
    overview: 'Surveillance antenna inspection covers transponder, ADS-B, and TCAS antennas, which must be physically sound and properly installed to provide reliable operation. Antenna degradation is a leading cause of surveillance system performance issues, and many problems that appear to be equipment failures are actually antenna or cable faults. A thorough physical inspection can identify issues before they cause in-flight failures.',
    study_guide: [
      'Inspect the antenna element for physical damage: cracks, chips, erosion, paint damage, or lightning strike evidence — any of these can degrade antenna performance.',
      'Check the antenna base and mounting hardware for corrosion, loose screws, and proper gasket condition — dissimilar metal corrosion at the mounting interface is common and increases contact resistance.',
      'Inspect the coaxial cable from antenna to equipment for damage: kinks, crushed sections, chafing, or connector corrosion at either end.',
      'Verify the antenna location meets installation requirements: no obstructions within the required clearance zone, correct orientation, and adequate ground plane.',
      'For TCAS, verify both top and bottom antenna installations — damage to one antenna will reduce directional coverage and can generate false bearing information.'
    ],
    pro_tips: [
      'Use a flashlight to inspect antenna bases from below — corrosion often forms on the underside of the mounting flange where it is not visible from a casual exterior inspection.',
      'Check the sealant around the antenna base for gaps or cracks — moisture intrusion through degraded sealant causes corrosion and can eventually create a short circuit.',
      'If an antenna shows cosmetic damage but appears structurally intact, perform a VSWR test before and after to quantify any performance degradation rather than condemning based on appearance alone.'
    ],
    references: [
      'AC 43.13-1B Chapter 11 — Electrical and Avionics (antenna installation practices)',
      'TSO-C74d / TSO-C112 — Transponder Antenna Performance Standards',
      'Aircraft-specific antenna installation drawings and maintenance manual sections'
    ],
  },
  '2-08': {
    prep_topics: ['91.413 documentation requirements', 'ADS-B compliance statement', 'Test data recording'],
    evaluator_watch: ['All required elements present', 'ADS-B compliance documented separately', 'Test data complete'],
    common_errors: ['Missing ADS-B specific compliance data', 'Incomplete test parameter recording'],
    overview: 'Surveillance system documentation must satisfy both the traditional transponder test requirements of 14 CFR 91.413 and the newer ADS-B compliance verification requirements of 14 CFR 91.227. These are separate regulatory requirements with different test parameters, and both must be documented in the maintenance records. Incomplete documentation is one of the most common discrepancies found during FAA surveillance.',
    study_guide: [
      'Document transponder test results per 91.413/Part 43 Appendix F: reply frequency, power output, suppression, Mode A/C accuracy, and Mode S functions tested.',
      'Document ADS-B compliance separately per 91.227: NACp value, position source type and integrity, ICAO address verification, geometric altitude, and overall compliance status.',
      'Include test equipment identification for both tests: manufacturer, model, serial number, and calibration due date.',
      'Write a complete approval for return to service statement referencing the specific regulations (91.413 and/or 91.227) under which the tests were performed.',
      'Retain a copy of the complete test data printout from the test equipment — many shops attach this to the work order as supporting documentation.'
    ],
    pro_tips: [
      'Use separate documentation sections or forms for transponder (91.413) and ADS-B (91.227) test results — combining them makes it harder to verify that all requirements have been met.',
      'The ADS-B compliance verification is relatively new, and many technicians forget to include it — build a checklist that explicitly includes both 91.413 and 91.227 documentation requirements.',
      'If the ADS-B test reveals a non-compliance condition, document the specific failure even if you cannot resolve it during this visit — the aircraft operator needs to know their compliance status.'
    ],
    references: [
      '14 CFR 91.413 — ATC Transponder Tests and Inspections',
      '14 CFR 91.227 — ADS-B Out Equipment Performance Requirements',
      '14 CFR 43.9 — Content, Form, and Disposition of Maintenance Records',
      'AC 20-165B — ADS-B Out Equipment Performance Requirements'
    ],
  },
  '3-01': {
    prep_topics: ['Ground test procedures', 'Servo motion verification', 'Warning system checks'],
    evaluator_watch: ['Follows maintenance manual sequence', 'All axes verified', 'Warning lights tested'],
    common_errors: ['Skipping self-test sequence', 'Not testing all modes'],
    overview: 'The autopilot ground functional test verifies that all servo axes move correctly, warning systems function, and the system passes its built-in self-test. This test must follow the manufacturer maintenance manual procedure precisely, as autopilot systems have specific power-up sequences and test modes that must be executed in order. Skipping steps or performing them out of sequence can produce misleading results or miss a fault.',
    study_guide: [
      'Follow the maintenance manual ground test procedure exactly in the specified order — autopilot self-tests often check components sequentially, and skipping steps can mask faults.',
      'Verify servo motion in all installed axes (pitch, roll, yaw) by commanding inputs and confirming the correct control surface moves in the correct direction.',
      'Check all warning lights, flags, and aural alerts — the autopilot warning system is a critical safety backup that must function correctly.',
      'Verify the autopilot disengages cleanly from each mode and that all modes that are supposed to be available can be selected and engaged.',
      'Document any fault codes displayed during the self-test — even transient codes can indicate developing problems.'
    ],
    pro_tips: [
      'Always check that the flight controls move freely before engaging the autopilot for ground testing — a jammed control will cause the servo to stall and may generate misleading fault codes.',
      'Some autopilot systems require specific sensor inputs (valid heading, attitude, airspeed) before the self-test will run — set up all required inputs before starting.',
      'Run the self-test twice: once cold and once after the system has been operating for 10-15 minutes — thermal faults often appear only after warm-up.'
    ],
    references: [
      'Aircraft-specific autopilot maintenance manual (ground test procedures)',
      'AC 43.13-1B Chapter 12 — Instrument and Autopilot Systems',
      'TSO-C9c — Automatic Pilots'
    ],
  },
  '3-02': {
    prep_topics: ['Disconnect button', 'Control wheel override', 'Trim runaway disconnect', 'Warning annunciation'],
    evaluator_watch: ['All disconnect methods tested', 'Warning aural and visual confirmed', 'Servo releases verified'],
    common_errors: ['Only testing one disconnect method', 'Not verifying warning annunciation'],
    overview: 'Testing all autopilot disconnect and warning methods ensures the pilot can always override or disengage the autopilot. There are typically multiple disconnect methods: the AP disconnect button on the control yoke, manual override of the control wheel, and trim disconnect switches. Each must work independently, and each must produce the correct warning annunciation. A failure to disconnect is among the most dangerous autopilot malfunctions.',
    study_guide: [
      'Test every disconnect method independently: yoke disconnect button, control wheel force override, AP panel disconnect, and any trim disconnect switches.',
      'Verify that each disconnect method produces the correct warning: typically a visual light on the annunciator panel and an aural tone or voice alert.',
      'Confirm that the servos physically release when the AP is disconnected — apply gentle pressure to the control surfaces and verify they move freely after disconnect.',
      'Test the trim runaway disconnect: engage electric trim and verify the disconnect switch stops trim motion immediately in all axes.',
      'Verify the autopilot cannot be re-engaged while a disconnect condition is active — some systems require the pilot to acknowledge the disconnect before re-engagement.'
    ],
    pro_tips: [
      'The control wheel force override disconnect is the pilot last resort — test it with realistic force levels, not just gentle pressure, to confirm the servo clutch releases properly.',
      'If the disconnect button works but the warning tone does not sound, treat this as a serious finding — pilots rely on the aural alert when their attention is elsewhere.',
      'Test the disconnect in each axis independently if the system allows — a pitch disconnect that works does not guarantee the roll disconnect also functions.'
    ],
    references: [
      '14 CFR 23.1329 / 25.1329 — Automatic Pilot Systems (disconnect requirements)',
      'Aircraft-specific autopilot maintenance manual',
      'TSO-C9c — Automatic Pilots (disconnect provisions)'
    ],
  },
  '3-03': {
    prep_topics: ['Trim function in each axis', 'Runaway protection logic', 'Trim limit switches'],
    evaluator_watch: ['Trim moves correct direction', 'Runaway protection activates', 'Limits function properly'],
    common_errors: ['Not testing runaway protection', 'Wrong trim direction for command'],
    overview: 'The autopilot trim system test verifies that the electric trim actuators move in the correct direction for the commanded input, that trim travel limits are respected, and most critically, that the trim runaway protection system will disconnect electric trim if a malfunction commands continuous trim motion. Trim runaways have caused fatal accidents, making this one of the most safety-critical autopilot tests.',
    study_guide: [
      'Command trim in each axis and verify the trim tab or stabilizer moves in the correct direction — incorrect trim direction will cause a divergent flight condition.',
      'Test the trim speed: verify the trim actuator moves at the specified rate, neither too fast (could cause structural overload) nor too slow (insufficient authority).',
      'Deliberately trigger the runaway protection by simulating a continuous trim command and verify the protection circuit disconnects trim within the specified time.',
      'Test the trim limit switches at both ends of travel in each axis — verify the trim stops at the mechanical limit and does not attempt to drive past the stops.',
      'After testing runaway protection, verify the system can be reset and normal trim function restored — a protection circuit that cannot be reset will ground the aircraft.'
    ],
    pro_tips: [
      'When testing trim runaway protection, have someone monitor the trim tab or stabilizer position visually — a runaway protection that activates too slowly may allow the trim to reach an extreme position before disconnecting.',
      'Electric trim direction can be verified by referencing the trim position indicator if installed — do not rely solely on visual observation of the trim tab, as some configurations are counterintuitive.',
      'Check the trim motor current draw during operation — excessive current can indicate a binding trim mechanism that may lead to a slow-developing runaway.'
    ],
    references: [
      '14 CFR 23.677 / 25.677 — Trim Systems',
      '14 CFR 23.1329 / 25.1329 — Automatic Pilot Systems (trim provisions)',
      'Aircraft-specific autopilot maintenance manual (trim system test procedures)'
    ],
  },
  '3-04': {
    prep_topics: ['Mode engagement criteria', 'Annunciator verification', 'Mode interaction'],
    evaluator_watch: ['Each mode engages properly', 'Annunciators illuminate correctly', 'Modes don\'t interfere'],
    common_errors: ['Not testing mode transitions', 'Ignoring annunciator discrepancies'],
    overview: 'Flight director mode testing verifies that each available mode (HDG, NAV, APR, GS, ALT, VS, etc.) engages when selected, drives the correct command bars or display, and annunciates properly on the flight instruments. Mode testing must also verify that modes interact correctly — for example, that selecting approach mode properly captures the localizer and then the glideslope in sequence.',
    study_guide: [
      'Test each mode individually: select the mode, verify the annunciator illuminates, and confirm the flight director command bars show the appropriate guidance.',
      'Test mode transitions: verify that switching from one mode to another produces a smooth handoff without erratic command bar behavior.',
      'Test mode protection: verify that modes that should not be available under certain conditions (e.g., approach mode without a valid localizer signal) cannot be selected or properly annunciate an armed state.',
      'Verify that coupled modes (e.g., autopilot following flight director commands) track smoothly without oscillation or overshoot.',
      'Check that all annunciator segments are visible and correctly labeled — a burned-out annunciator segment can cause a pilot to misidentify the active mode.'
    ],
    pro_tips: [
      'Mode interaction problems are often the most subtle and difficult to find — create a test matrix listing every possible mode combination and test each one.',
      'If a mode engages but the command bars behave erratically, check the sensor input for that mode before troubleshooting the flight director computer — bad sensor data produces bad guidance.',
      'Some flight directors have a self-test that exercises all annunciator segments — use it, but also verify each segment individually during actual mode testing.'
    ],
    references: [
      'TSO-C9c — Automatic Pilots (mode requirements)',
      'TSO-C52a — Flight Director Equipment',
      'Aircraft-specific flight director maintenance and test procedures'
    ],
  },
  '3-05': {
    prep_topics: ['Engagement prerequisites', 'Sensor sync requirements', 'Common failure modes'],
    evaluator_watch: ['Systematic approach', 'Checks prerequisites first', 'Identifies root cause'],
    common_errors: ['Replacing AP computer before checking inputs', 'Not checking sensor validity'],
    overview: 'Troubleshooting an autopilot that will not engage requires understanding the engagement prerequisites — the conditions that must be met before the autopilot computer will allow engagement. Common prerequisites include valid attitude, heading, and airspeed data; flight director synchronization; proper sensor initialization; and no active fault conditions. The most common mistake is replacing the AP computer when the actual problem is a failed prerequisite.',
    study_guide: [
      'Review the maintenance manual for the complete list of engagement prerequisites specific to this autopilot model — they vary significantly between manufacturers.',
      'Check prerequisite sensors systematically: attitude gyro or AHRS, heading source, airspeed, altitude, and any navigation inputs required for the selected mode.',
      'Verify the flight director is synchronized (bars centered or tracking) before attempting autopilot engagement — most systems require FD sync as a prerequisite.',
      'Check for stored fault codes in the autopilot computer — many modern systems will refuse to engage if a fault code is active, even if the fault is transient.',
      'Verify the autopilot circuit breakers, engage switches, and disconnect switches are all in the correct position — a stuck disconnect switch will prevent engagement.'
    ],
    pro_tips: [
      'Before replacing any component, verify you can reproduce the failure consistently — an intermittent engagement failure may be caused by a loose connector or marginal sensor that only fails under certain conditions.',
      'The most common root causes for engagement failure are: invalid attitude data, unsynced flight director, active fault code, and defective engage switch — check these four things before going deeper.',
      'If the autopilot engages momentarily then immediately disconnects, check the feedback sensors — the system may be detecting an out-of-range condition and protecting itself.'
    ],
    references: [
      'Aircraft-specific autopilot maintenance manual (engagement prerequisites and fault codes)',
      'AC 43.13-1B Chapter 12 — Instrument and Autopilot Systems',
      'TSO-C9c — Automatic Pilots'
    ],
  },
  '3-06': {
    prep_topics: ['Gain and feedback concepts', 'Servo cable tension', 'Sensor signal quality'],
    evaluator_watch: ['Identifies which axis', 'Checks mechanical before electronic', 'Systematic isolation'],
    common_errors: ['Adjusting gain without checking mechanical rigging', 'Not isolating to specific axis'],
    overview: 'Flight control oscillation during autopilot operation can range from a mild porpoising to a violent Dutch roll or pitch oscillation. Troubleshooting requires understanding the closed-loop feedback system: sensor detects error, computer commands correction, servo moves surface, and sensor detects new position. Oscillation occurs when this loop becomes unstable — typically due to excessive gain, mechanical slop, degraded feedback, or incorrect sensor data.',
    study_guide: [
      'First identify which axis is oscillating (pitch, roll, or yaw) by observing the aircraft behavior or flight recorder data — each axis has independent feedback loops.',
      'Check mechanical causes first: control cable tension, push-rod play, servo mounting, and surface hinge bearing condition — mechanical slop introduces phase lag that can destabilize the feedback loop.',
      'Verify sensor signal quality: a noisy or intermittent attitude, heading, or rate sensor will cause the autopilot to chase erratic inputs, producing oscillation.',
      'Check servo feedback position sensors (synchros, potentiometers, or LVDTs) — a degraded feedback sensor makes the computer think the surface has not moved enough, causing it to over-command.',
      'Gain adjustment should be the last resort, not the first — changing gain to mask a mechanical or sensor problem creates a system that will oscillate again when conditions change.'
    ],
    pro_tips: [
      'Record the oscillation frequency if possible — mechanical causes typically produce low-frequency oscillation (1-2 Hz), while electronic causes produce higher-frequency oscillation.',
      'Try reducing gain slightly as a diagnostic test: if oscillation stops, the problem is likely mechanical slop or degraded feedback. If it continues, the issue is more likely a sensor problem.',
      'Weather and turbulence can excite marginal oscillation tendencies — if oscillation occurs only in rough air, the system may have marginal stability that needs attention.'
    ],
    references: [
      'Aircraft-specific autopilot maintenance manual (servo rigging and gain adjustment procedures)',
      'AC 43.13-1B Chapter 12 — Instrument and Autopilot Systems',
      'Manufacturer service bulletins related to autopilot stability'
    ],
  },
  '3-07': {
    prep_topics: ['FD displays commands', 'AP moves controls', 'Common computer with different outputs'],
    evaluator_watch: ['Clear distinction articulated', 'Understands shared computation', 'Knows when each is used'],
    common_errors: ['Thinking FD and AP are completely separate systems', 'Not understanding FD-only flight'],
    overview: 'Understanding the distinction between the flight director and autopilot is fundamental to avionics troubleshooting and pilot communication. Both systems typically share the same computer and sensor inputs, but their outputs are different: the flight director displays steering commands on the attitude indicator for the pilot to manually follow, while the autopilot physically moves the control surfaces through servos. Many operational scenarios use FD guidance without AP engagement.',
    study_guide: [
      'The flight director computes steering commands and displays them as command bars on the attitude indicator — the pilot flies by keeping the aircraft symbol centered on the command bars.',
      'The autopilot uses the same computed commands but routes them to servo motors that physically move the control surfaces — the pilot monitors rather than flying.',
      'Both systems typically share the same flight guidance computer — the difference is in the output path, not the computation.',
      'Flight director can operate without the autopilot engaged — this is common during takeoff, approach, and in turbulence where pilots prefer manual control with FD guidance.',
      'When troubleshooting, remember that a problem affecting both FD and AP likely originates in the shared computer or its sensor inputs, while a problem affecting only one indicates an output-path issue.'
    ],
    pro_tips: [
      'When a pilot reports "the autopilot is not tracking correctly," first determine whether they are using AP or FD — the troubleshooting path is different for each.',
      'FD command bar drift with the AP disengaged but correct AP tracking when engaged suggests a display or indicator problem, not a computer problem.',
      'Understanding FD/AP distinction helps with mode annunciator troubleshooting — some modes are FD-only, some are AP-only, and some can operate in either configuration.'
    ],
    references: [
      'TSO-C9c — Automatic Pilots',
      'TSO-C52a — Flight Director Equipment',
      'Aircraft-specific flight guidance system description in the maintenance manual'
    ],
  },
  '3-08': {
    prep_topics: ['Sensors \u2192 Computer \u2192 Servos \u2192 Surfaces', 'Feedback loops', 'Data bus connections'],
    evaluator_watch: ['Can trace signal from sensor to surface', 'Understands feedback concept', 'Identifies major components'],
    common_errors: ['Not understanding the feedback loop', 'Confusing sensor types for each axis'],
    overview: 'Understanding autopilot system architecture is essential for effective troubleshooting. The system follows a closed-loop pattern: sensors detect the aircraft state, the computer calculates required corrections, servos move the control surfaces, and sensors detect the resulting change to close the loop. Modern systems add digital data buses (ARINC 429, ARINC 629) to connect components, and understanding the data flow between system elements is key to isolating faults.',
    study_guide: [
      'Trace the complete signal path from sensor to surface: attitude sensors and navigation inputs feed the flight guidance computer, which outputs servo commands, which drive motors connected to control surfaces.',
      'Understand the feedback loop: the servo position sensor reports back to the computer, and the attitude sensors detect the aircraft response — both feedback paths must function for stable operation.',
      'Know the sensor types: attitude from gyros or AHRS, heading from magnetic compass or magnetometer, airspeed from pitot-static, altitude from static system, and navigation from VOR/LOC/GPS.',
      'Identify the data bus architecture: which sensors communicate on ARINC 429, which use analog signals, and where signal conversion happens — a bus fault will affect all systems downstream.',
      'Understand which components are line-replaceable units (LRUs) and how they interconnect — this determines your troubleshooting boundaries and what can be replaced in the field.'
    ],
    pro_tips: [
      'Draw the system block diagram from the maintenance manual before starting any complex autopilot troubleshooting — visualizing the signal path prevents chasing faults in the wrong direction.',
      'Data bus problems can masquerade as component failures — if multiple systems show related faults simultaneously, suspect the common data bus before replacing individual LRUs.',
      'Modern integrated avionics (Garmin G1000, Collins Pro Line, etc.) may use proprietary high-speed buses between components — manufacturer training is essential for troubleshooting these systems.'
    ],
    references: [
      'Aircraft-specific autopilot system description in the maintenance manual',
      'ARINC 429 — Digital Information Transfer System for avionics data bus',
      'AC 43.13-1B Chapter 12 — Instrument and Autopilot Systems'
    ],
  },
  '4-01': {
    prep_topics: ['LNAV roll steering output', 'VNAV pitch commands', 'ARINC 429 interface'],
    evaluator_watch: ['Both lateral and vertical coupling verified', 'Correct labels checked', 'Mode annunciation confirmed'],
    common_errors: ['Only checking one axis', 'Not verifying at the autopilot input'],
    overview: 'FMS/GPS coupling to autopilot verifies the data interface between the navigation computer and the autopilot/flight director. The FMS outputs LNAV roll steering commands and VNAV pitch commands via ARINC 429 data bus to guide the autopilot along programmed routes and vertical profiles. Proper coupling is essential for automated flight operations including RNAV approaches and departure procedures.',
    study_guide: [
      'Verify LNAV (lateral navigation) coupling: program a route in the FMS, engage LNAV mode, and confirm the autopilot tracks the programmed course with correct turn anticipation.',
      'Verify VNAV (vertical navigation) coupling: program altitude constraints, engage VNAV, and confirm the autopilot follows the programmed descent or climb profile.',
      'Use an ARINC 429 bus analyzer to verify the correct data labels are being transmitted from the FMS to the autopilot at the expected refresh rate.',
      'Confirm the mode annunciations reflect the active coupling state — LNAV and VNAV should appear on the flight mode annunciator when active.',
      'Test the reversion behavior: what happens when GPS signal is lost during LNAV tracking — the system should annunciate the reversion and the pilot should be alerted.'
    ],
    pro_tips: [
      'If the autopilot tracks LNAV correctly but overshoots turns, check the roll steering command rate and groundspeed data — incorrect groundspeed causes wrong turn anticipation.',
      'VNAV coupling issues are often caused by incorrect barometric correction data being sent to the FMS — verify the altimeter setting input.',
      'Some FMS/autopilot combinations require specific software versions to be compatible — always verify the software compatibility matrix before troubleshooting interface issues.'
    ],
    references: [
      'ARINC 429 — Digital Information Transfer System (label specifications for roll steering and pitch commands)',
      'Aircraft-specific FMS-to-autopilot interface control document (ICD)',
      'TSO-C115c / TSO-C146c — FMS Equipment Standards'
    ],
  },
  '4-02': {
    prep_topics: ['AIRAC cycle dates', '28-day currency', 'Expired database implications'],
    evaluator_watch: ['Knows where to find effective dates', 'Understands AIRAC cycle', 'Can determine if current'],
    common_errors: ['Not checking both effective and expiration dates', 'Not understanding grace periods'],
    overview: 'Navigation database currency verification ensures the FMS or GPS navigator contains current aeronautical data. Navigation databases follow the AIRAC (Aeronautical Information Regulation and Control) cycle, updated every 28 days worldwide. An expired database means the aircraft cannot legally fly IFR RNAV routes or GPS approaches, as the data may not reflect current airspace changes, new procedures, or frequency updates.',
    study_guide: [
      'Know the AIRAC cycle: databases are updated every 28 days on a predictable schedule — the effective and expiration dates are displayed on the FMS/GPS initialization page.',
      'Verify currency by checking the effective date on the unit against the current AIRAC cycle — the database is current only if today falls between the effective and expiration dates.',
      'Understand the operational implications of an expired database: IFR RNAV and GPS approaches cannot be flown, though VFR GPS navigation may still be permitted by some operators.',
      'Know where to find the database version and cycle information on different equipment types — each manufacturer displays this differently during initialization.',
      'Be aware that some operations require the database to be updated before the cycle changes, not after — check the operator flight operations manual for specific requirements.'
    ],
    pro_tips: [
      'Set a calendar reminder for each AIRAC effective date (28-day cycle) so database updates are performed proactively rather than discovered during a pre-flight check.',
      'Some FMS units allow viewing the upcoming database before the effective date — loading the new cycle a day early and letting the unit auto-switch at midnight is the most efficient approach.',
      'If an aircraft arrives with an expired database and needs to depart IFR urgently, the pilot may be able to file using VOR/ILS-based routes — but this is an operational decision, not a maintenance one.'
    ],
    references: [
      'ICAO Doc 8126 — Aeronautical Information Services (AIRAC cycle definition)',
      'AC 90-100A — U.S. Terminal and En Route Area Navigation (database currency requirements)',
      '14 CFR 91.205 — Instrument flight rules equipment (navigation database provisions)'
    ],
  },
  '4-03': {
    prep_topics: ['Backup procedures', 'Loading media types', 'Verification after load'],
    evaluator_watch: ['Backs up before loading', 'Follows correct procedure', 'Verifies successful load'],
    common_errors: ['Not backing up first', 'Wrong media format', 'Not verifying after load'],
    overview: 'Navigation database updates are performed every AIRAC cycle to keep aeronautical data current. The procedure varies by equipment: some use data cards, others use USB drives, and older systems may use proprietary data loaders. The key principle is: always backup before loading, follow the manufacturer procedure exactly, and verify the load was successful before returning the aircraft to service.',
    study_guide: [
      'Always backup the current configuration and database before loading a new one — if the update fails or corrupts data, you need the ability to restore the previous working state.',
      'Identify the correct media format for the specific equipment: SD card, compact flash, USB drive, or manufacturer-specific data loader — using the wrong format can corrupt the database or damage the media slot.',
      'Follow the manufacturer procedure step-by-step, including any required power-on sequences, menu navigation, and confirmation prompts — deviating from the procedure can cause a failed or partial load.',
      'After loading, verify the database by checking the cycle dates, revision numbers, and performing a spot-check of known waypoints to confirm data integrity.',
      'Never interrupt a database load in progress — power interruption during a load can corrupt the navigation database and may require the unit to be returned to the manufacturer for recovery.'
    ],
    pro_tips: [
      'Keep a log of which database version was loaded and when — this simplifies troubleshooting if navigation data issues are reported after an update.',
      'Some units require the avionics master switch to be on but the engine not running during database loads — excessive voltage fluctuation from engine start can corrupt the load.',
      'If a load fails, do not immediately retry — first check the data card or USB drive for corruption, try a fresh copy of the data, and verify the media slot is clean and undamaged.'
    ],
    references: [
      'Equipment-specific database loading procedure in the maintenance manual or pilot operating handbook',
      'ARINC 424 — Navigation System Database Standard (data format specification)',
      'RTCA DO-200B — Standards for Processing Aeronautical Data'
    ],
  },
  '4-04': {
    prep_topics: ['GPS antenna check', 'Satellite acquisition', 'Position initialization', 'Database integrity'],
    evaluator_watch: ['Systematic approach', 'Checks antenna first', 'Verifies GPS reception'],
    common_errors: ['Not checking the simplest cause first (antenna)', 'Skipping position initialization'],
    overview: 'FMS/GPS fault isolation requires systematic troubleshooting of the complete navigation chain: antenna, receiver, database, and display. GPS faults can manifest as no position, degraded accuracy, or failure to navigate programmed routes. The key principle is to start with the simplest and most common causes (antenna and cable) before investigating complex software or hardware issues inside the FMS.',
    study_guide: [
      'Start with the GPS antenna: inspect for physical damage, verify the cable connection, and check that the antenna has a clear view of the sky — a covered, damaged, or disconnected antenna is the most common GPS fault.',
      'Verify satellite acquisition: the receiver status page should show at least 4 satellites tracked with good geometry (low HDOP) — failure to acquire may indicate antenna, cable, or receiver problems.',
      'Check position initialization: some GPS units require a valid initial position before they can acquire satellites efficiently — if the stored position is far from the actual location, acquisition will be slow or fail.',
      'Verify database integrity: a corrupted navigation database can cause the FMS to fail initialization or report position errors — reload the database and test again.',
      'Check the ARINC 429 output from the GPS to downstream systems — a GPS that positions correctly but does not output valid data on the bus will appear non-functional to the autopilot and displays.'
    ],
    pro_tips: [
      'The single most common GPS fault is antenna related — always check the antenna cable connection and antenna condition before pulling the GPS receiver for bench testing.',
      'If the GPS acquires slowly but eventually positions correctly, suspect a marginal antenna or partially damaged cable — measure antenna cable loss and compare to specification.',
      'Some GPS receivers have a cold-start procedure that clears the stored almanac and forces a full satellite search — this can resolve persistent acquisition problems caused by corrupted almanac data.'
    ],
    references: [
      'TSO-C145e / TSO-C146e — GPS Equipment for IFR Operations',
      'AC 20-138D — Airworthiness Approval of GPS Navigation Equipment',
      'Aircraft-specific GPS/FMS maintenance manual (fault isolation procedures)'
    ],
  },
  '4-05': {
    prep_topics: ['Bus analyzer operation', 'Data label identification', 'Refresh rates and SSM bits'],
    evaluator_watch: ['Correct bus connection', 'Can identify labels', 'Compares to ICD specification'],
    common_errors: ['Wrong bus (TX vs RX)', 'Not referencing ICD for expected labels'],
    overview: 'ARINC 429 data bus monitoring is a fundamental avionics troubleshooting skill. ARINC 429 is the primary data bus used in most transport and business aircraft to transfer digital data between avionics systems. Using a bus analyzer, you can capture and decode data labels to verify that systems are communicating correctly — including verifying the data content, refresh rate, and sign/status matrix (SSM) bits.',
    study_guide: [
      'Connect the bus analyzer to the correct bus wire pair — ARINC 429 is a unidirectional point-to-point bus with separate TX and RX pairs. Connecting to the wrong pair will show no data.',
      'Identify data labels using the ARINC 429 label directory or the equipment-specific ICD (Interface Control Document) — each label number identifies a specific data parameter.',
      'Check the SSM (Sign/Status Matrix) bits for each label — these indicate whether the data is valid (Normal Operation), a test value, a failure warning, or not computed.',
      'Verify the refresh rate: critical parameters like attitude and heading should update at high rates (10-50 Hz), while less critical data may update slower (1-5 Hz) — abnormal rates indicate a fault.',
      'Compare observed data labels and values against the ICD specification — the ICD defines exactly which labels should be present, their encoding, and their expected range of values.'
    ],
    pro_tips: [
      'Always reference the ICD before monitoring a bus — without it, you are guessing at what the data means and may misinterpret normal data as a fault.',
      'If you see no data on a bus, verify your analyzer is set to the correct bus speed: ARINC 429 supports both low speed (12.5 kbps) and high speed (100 kbps) — using the wrong setting will show no activity.',
      'Save bus captures for comparison — recording a known-good data capture from each bus during a normal system test creates a reference baseline for future troubleshooting.'
    ],
    references: [
      'ARINC 429P1-18 — Digital Information Transfer System (bus specification)',
      'Equipment-specific Interface Control Documents (ICDs)',
      'AC 43.13-1B — Acceptable Methods for avionics data bus connections'
    ],
  },
  '4-06': {
    prep_topics: ['Satellite tracking status', 'Position accuracy verification', 'RAIM availability'],
    evaluator_watch: ['Satellite count and geometry checked', 'Position accuracy verified', 'RAIM status confirmed'],
    common_errors: ['Testing indoors without antenna', 'Not checking RAIM for IFR capability'],
    overview: 'GPS receiver performance verification goes beyond simply confirming that the receiver outputs a position — it verifies satellite tracking quality, position accuracy, and the availability of RAIM (Receiver Autonomous Integrity Monitoring) for IFR operations. A GPS receiver can appear to function normally while providing degraded performance that does not meet IFR requirements.',
    study_guide: [
      'Check the satellite tracking status page: verify the receiver is tracking at least 4 satellites (5 for RAIM), and note the HDOP (Horizontal Dilution of Precision) value — lower HDOP indicates better geometry.',
      'Verify position accuracy by comparing the GPS-reported position to a known survey point or the airport coordinates — the difference should be within the receiver accuracy specification.',
      'Confirm RAIM availability: for IFR GPS operations, the receiver must have RAIM capability to detect a satellite that is providing incorrect data — verify RAIM is active and functioning.',
      'Check the GPS time accuracy: the receiver should display UTC time that matches a known reference within 1 second — time errors indicate a degraded solution.',
      'Verify that the receiver can navigate a programmed route: enter a test flight plan and confirm the receiver provides correct course, distance, and steering guidance.'
    ],
    pro_tips: [
      'Always test GPS performance outdoors with the aircraft antenna connected — testing indoors or with a simulator antenna does not verify real-world antenna performance.',
      'RAIM prediction tools are available online from the FAA — use them to verify RAIM will be available during the planned time of flight before dispatching the aircraft.',
      'If the receiver tracks satellites but shows poor HDOP or accuracy, suspect antenna cable degradation or a partially obstructed antenna location — even small signal losses affect position quality.'
    ],
    references: [
      'TSO-C145e / TSO-C146e — GPS Equipment Standards (performance requirements)',
      'AC 20-138D — Airworthiness Approval of GPS Navigation Equipment',
      'FAA RAIM Prediction Tool — sapt.faa.gov'
    ],
  },
  '4-07': {
    prep_topics: ['WAAS correction data', 'LPV approach minimums', 'Integrity monitoring'],
    evaluator_watch: ['Understands WAAS adds integrity', 'Can explain LPV vs LNAV/VNAV', 'Knows equipment requirements'],
    common_errors: ['Confusing WAAS with standard GPS', 'Not understanding LPV gives near-ILS precision'],
    overview: 'WAAS (Wide Area Augmentation System) enhances standard GPS by providing correction data and integrity monitoring through geostationary satellites. WAAS-equipped receivers can fly LPV (Localizer Performance with Vertical guidance) approaches with minimums as low as 200 feet — comparable to Category I ILS. Understanding WAAS capability, requirements, and limitations is essential for avionics technicians working with modern GPS navigation equipment.',
    study_guide: [
      'WAAS improves GPS accuracy from approximately 15 meters to less than 1 meter by broadcasting ionospheric corrections and satellite orbit corrections through geostationary satellites.',
      'WAAS adds integrity monitoring: the system can detect a GPS satellite malfunction and alert the receiver within 6 seconds — this is critical for approach operations where position errors are safety-critical.',
      'LPV approaches provide both lateral and vertical guidance similar to an ILS but using WAAS GPS instead of ground-based transmitters — LPV minimums can be as low as 200 feet HAT.',
      'Know the equipment requirements: LPV capability requires a TSO-C145e or TSO-C146e GPS receiver with WAAS capability — not all GPS receivers support LPV even if they receive WAAS corrections.',
      'Understand the WAAS approach hierarchy: LPV > LNAV/VNAV > LNAV — the receiver automatically selects the best available approach type based on WAAS availability and integrity.'
    ],
    pro_tips: [
      'If a WAAS-capable receiver does not display LPV availability for a published LPV approach, check the database first — the approach data must be present in the current AIRAC cycle.',
      'WAAS coverage may be degraded at high latitudes or during ionospheric storms — if LPV is not available during testing, check current WAAS NOTAMs before troubleshooting the equipment.',
      'Some older WAAS receivers may require software updates to support the latest LPV approach minima — check the manufacturer website for mandatory service bulletins.'
    ],
    references: [
      'TSO-C145e / TSO-C146e — GPS/WAAS Equipment Standards',
      'AC 20-138D — Airworthiness Approval of GPS/WAAS Navigation Equipment',
      'FAA Order 8260.3D — RNAV Approach Design Criteria (LPV specifications)',
      'WAAS Performance Standard (SPS PS) — faa.gov/about/office_org/headquarters_offices/ato/service_units/techops/navservices/gnss/waas'
    ],
  },
  '4-08': {
    prep_topics: ['CDU, FMC, GPS, VOR/DME, IRS inputs', 'ARINC 429 data buses', 'System architecture'],
    evaluator_watch: ['Can name major components', 'Understands data flow', 'Knows bus architecture'],
    common_errors: ['Not understanding multi-sensor integration', 'Confusing CDU with FMC'],
    overview: 'Understanding FMS system architecture is essential for troubleshooting navigation issues efficiently. The FMS integrates multiple navigation sensors (GPS, VOR/DME, IRS) through a central Flight Management Computer (FMC) that computes the best position solution and provides steering commands to the autopilot. The CDU (Control Display Unit) is the pilot interface. Data flows between components on ARINC 429 buses, and knowing the architecture lets you isolate faults to specific components.',
    study_guide: [
      'Distinguish the CDU from the FMC: the CDU is the keyboard and display the pilot uses to enter data and view navigation information — the FMC is the computer that performs all calculations. They are separate LRUs.',
      'Know the sensor inputs to the FMC: GPS provides position and velocity, VOR/DME provides radio-based position fixes, IRS provides inertial position and attitude, and air data provides altitude and speed.',
      'Understand how the FMC computes a blended position solution using multiple sensors — it weights inputs based on accuracy and availability, providing the best composite position.',
      'Map the ARINC 429 bus connections: GPS to FMC, FMC to autopilot, FMC to displays, FMC to CDU — each is a separate bus pair that can be monitored independently.',
      'Know the data flow during different phases of flight: on the ground the FMC initializes from GPS and pilot input, in cruise it blends GPS with IRS, and during approach it may switch to GPS-primary or radio-primary depending on the approach type.'
    ],
    pro_tips: [
      'If the CDU displays an error but the FMC is computing correctly (as verified on other displays or the autopilot), the problem is likely the CDU or its 429 bus — do not replace the FMC.',
      'Modern glass-cockpit FMS systems (G1000, G3000, Pro Line Fusion) integrate the FMC, CDU, and display functions into a single unit — the architecture is different from older federated systems.',
      'Draw the bus architecture diagram from the maintenance manual and keep it handy during troubleshooting — it is the single most useful reference for isolating avionics faults.'
    ],
    references: [
      'ARINC 702A — Advanced Flight Management Computer System (FMS architecture standard)',
      'ARINC 429 — Digital Information Transfer System (data bus specification)',
      'Aircraft-specific FMS system description in the maintenance manual',
      'TSO-C115c — FMS Equipment Standards'
    ],
  },
  '5-01': {
    prep_topics: ['Transmit/receive on multiple frequencies', 'Squelch function', 'Sidetone verification'],
    evaluator_watch: ['Tests multiple frequencies', 'Checks both TX and RX', 'Verifies audio quality'],
    common_errors: ['Only testing one frequency', 'Not checking sidetone'],
    overview: 'COM radio functional testing verifies transmit and receive performance across the frequency range, squelch threshold, sidetone level, and audio quality. Aviation COM radios operate in the VHF band (118.000-136.975 MHz) with 8.33 kHz or 25 kHz channel spacing. A thorough functional test must verify operation at multiple frequencies because crystal oscillator and synthesizer problems can cause failures at specific frequencies while others work normally.',
    study_guide: [
      'Test transmit and receive at minimum three frequencies spread across the band: low (e.g., 118.0), mid (e.g., 127.0), and high (e.g., 135.0) to verify synthesizer operation across the full range.',
      'Verify squelch operation: with no signal present, the audio should be muted. Advance squelch threshold and confirm it opens at the appropriate sensitivity level.',
      'Check sidetone: during transmit, the pilot should hear their own voice in the headset at a comfortable level — no sidetone or excessive sidetone indicates an audio panel or radio configuration issue.',
      'Measure transmit audio quality using a COM test set or a second radio — verify modulation depth is within specification and there is no distortion or background noise on the transmitted signal.',
      'Verify the frequency display matches the actual transmit/receive frequency by checking against the test set reference — a display error could cause the pilot to transmit on the wrong frequency.'
    ],
    pro_tips: [
      'If a radio works on some frequencies but not others, suspect the frequency synthesizer rather than the RF amplifier — amplifier failures typically affect all frequencies equally.',
      'Always test with the actual aircraft headset and microphone connected — bench testing with test equipment may miss audio panel routing or impedance matching issues.',
      'Check the antenna connection torque: a finger-tight BNC connector may work intermittently and cause complaints that are impossible to reproduce on the bench.'
    ],
    references: [
      'TSO-C169a — VHF Air-Ground Digital Link (VDL) Equipment',
      'TSO-C37d / TSO-C38d — VHF COM Transceivers',
      'RTCA DO-186B — VHF Air-Ground Communication Equipment Standards'
    ],
  },
  '5-02': {
    prep_topics: ['VSWR measurement technique', 'Acceptable ranges', 'Frequency sweep'],
    evaluator_watch: ['Correct equipment setup', 'Measures across frequency range', 'Interprets results correctly'],
    common_errors: ['Measuring at one frequency only', 'Not recognizing bad VSWR values'],
    overview: 'VSWR (Voltage Standing Wave Ratio) measurement quantifies how well the antenna and coaxial cable system is matched to the radio transmitter impedance (50 ohms). A perfect match produces a VSWR of 1:1, meaning all transmitted power reaches the antenna. Higher VSWR values indicate impedance mismatch, which causes reflected power that reduces radiated signal strength and can damage the transmitter. VSWR must be measured across the operating frequency range.',
    study_guide: [
      'Connect the VSWR meter or antenna analyzer between the radio output and the antenna cable — the meter measures forward and reflected power to calculate the standing wave ratio.',
      'Know the acceptable ranges: VSWR below 1.5:1 is good, 1.5-2.0:1 is acceptable, 2.0-3.0:1 indicates a problem, and above 3.0:1 the antenna system should not be used.',
      'Sweep across the full operating frequency range (118-137 MHz for VHF COM) — an antenna can have good VSWR at its resonant frequency but poor VSWR at the band edges.',
      'A sudden spike in VSWR at a specific frequency may indicate an antenna element defect, while uniformly high VSWR across all frequencies typically indicates a cable or connector problem.',
      'After measuring, compare results to the antenna manufacturer specification and the installation baseline data if available.'
    ],
    pro_tips: [
      'Measure VSWR with all other antennas nearby in their normal state — nearby antennas can couple and affect VSWR readings, especially if they are close together on a small aircraft.',
      'If VSWR is borderline, measure the cable loss separately by disconnecting at the antenna end — high cable loss masks VSWR problems by attenuating both forward and reflected power.',
      'A VSWR that changes when you flex the antenna cable indicates a damaged cable or loose connector — this is a common cause of intermittent COM problems.'
    ],
    references: [
      'AC 43.13-1B Chapter 11 — Antenna Installation and Testing',
      'Antenna manufacturer installation and performance specifications',
      'Test equipment manufacturer operating manual for VSWR measurement procedures'
    ],
  },
  '5-03': {
    prep_topics: ['PTT circuit check', 'Mic wiring verification', 'Antenna and cable check', 'RF power output measurement'],
    evaluator_watch: ['Systematic approach from PTT to antenna', 'Uses wattmeter to verify output', 'Isolates fault to component'],
    common_errors: ['Replacing radio before checking PTT or cable', 'Not measuring RF power output'],
    overview: 'Troubleshooting a transmit failure requires systematic isolation of the complete transmit chain from the PTT switch through the microphone, audio panel, radio, coaxial cable, to the antenna. The most common mistake is replacing the radio first when the actual problem is often a defective PTT switch, broken microphone cable, or corroded antenna connector. Following the signal path from input to output prevents unnecessary part replacements.',
    study_guide: [
      'Start at the PTT switch: verify it makes a clean closure when pressed and opens cleanly when released — use an ohmmeter to check for proper switching and no intermittent contact.',
      'Check the microphone wiring: verify continuity from the mic element through the cable to the audio panel input — a broken wire in a coiled mic cord is a common failure.',
      'Verify the audio panel is routing the mic signal to the selected radio — on multi-radio installations, incorrect audio panel selection is a frequent cause of apparent transmit failure.',
      'Measure RF power output at the radio antenna connector using a wattmeter or power meter — if the radio outputs full power, the fault is in the cable or antenna, not the radio.',
      'Check the coaxial cable and antenna: measure VSWR and cable loss, and inspect connectors for corrosion or damage.'
    ],
    pro_tips: [
      'The PTT switch and microphone cable are the most common transmit failure causes — they are handled roughly and subject to wear. Check them first before pulling the radio.',
      'If the radio keys (you can see the TX indicator light) but no audio is transmitted, the problem is in the microphone path, not the RF path — focus on mic, cable, and audio panel.',
      'Use a portable COM radio tuned to the same frequency as a quick receive-side test to verify whether the aircraft is actually transmitting — this is faster than connecting test equipment.'
    ],
    references: [
      'AC 43.13-1B Chapter 11 — Communication System Troubleshooting',
      'Audio panel wiring diagram from the aircraft-specific installation manual',
      'Radio manufacturer maintenance manual (transmitter specifications)'
    ],
  },
  '5-04': {
    prep_topics: ['Antenna VSWR check', 'Cable loss measurement', 'Receiver sensitivity test'],
    evaluator_watch: ['Checks antenna and cable first', 'Measures cable loss', 'Tests receiver sensitivity'],
    common_errors: ['Assuming receiver is bad without checking antenna system', 'Not measuring cable insertion loss'],
    overview: 'Receive failure troubleshooting starts with the antenna system, not the radio. A weak or intermittent receive condition is more commonly caused by antenna degradation, cable loss, or connector corrosion than by a radio receiver failure. The antenna system is exposed to the environment and degrades over time, while the radio receiver is protected inside the cockpit. Systematic troubleshooting from antenna to receiver prevents unnecessary radio replacements.',
    study_guide: [
      'Check the antenna first: inspect for physical damage, corrosion, and proper mounting. Measure VSWR to verify the antenna is resonant at the operating frequency.',
      'Measure cable insertion loss: disconnect the cable at both ends and measure the loss using an antenna analyzer or signal generator — typical loss should be less than 3 dB for most aircraft installations.',
      'Inspect all connectors for corrosion, bent center pins, or damaged shields — a corroded BNC connector can add several dB of loss and cause intermittent reception.',
      'Test receiver sensitivity: inject a known signal level at the antenna input and verify the receiver can detect signals at or below its specified sensitivity (typically -93 to -97 dBm for VHF COM).',
      'If the antenna system checks good and receiver sensitivity is within specification, check the audio routing through the audio panel to the headset.'
    ],
    pro_tips: [
      'A 3 dB cable loss cuts the received signal power in half — in a marginal reception area, this can make the difference between clear communication and no reception.',
      'If reception is good on some frequencies but poor on others, check for interference from other aircraft systems — avionics power supplies and digital equipment can radiate noise in the VHF COM band.',
      'Compare reception quality between the COM1 and COM2 radios (if both are installed) tuned to the same frequency — this quickly determines whether the problem is radio-specific or system-wide.'
    ],
    references: [
      'AC 43.13-1B Chapter 11 — Communication System Troubleshooting',
      'TSO-C37d / TSO-C38d — VHF COM Receiver Sensitivity Standards',
      'Radio manufacturer maintenance manual (receiver specifications and sensitivity test procedures)'
    ],
  },
  '5-05': {
    prep_topics: ['Ground loop identification', 'Shield continuity', 'Power supply noise', 'Wire routing near power cables'],
    evaluator_watch: ['Checks grounding systematically', 'Verifies shield integrity', 'Isolates noise source'],
    common_errors: ['Treating symptoms without finding root cause', 'Not checking bonding connections'],
    overview: 'Audio noise in avionics systems can originate from ground loops, broken shield conductors, power supply interference, or improper wire routing. The challenge is identifying the noise source rather than treating symptoms. Audio noise troubleshooting requires methodical isolation: determine which circuit the noise enters, whether it is engine-speed dependent, and whether it appears on all audio channels or only specific ones.',
    study_guide: [
      'Characterize the noise first: is it a buzz (60 Hz or 400 Hz power), a whine (engine-speed dependent), a hiss (broadband), or a clicking (digital interference)? Each points to a different source.',
      'Check for ground loops: measure the resistance between the audio ground at each piece of equipment and the common airframe ground point — all should read less than a few milliohms.',
      'Verify shield continuity on all audio cables: a broken shield allows external electromagnetic interference to couple into the audio signal. Check from end to end with an ohmmeter.',
      'Isolate by disconnection: remove audio inputs one at a time to determine which circuit is introducing the noise — when the noise stops, the last disconnected circuit is the path.',
      'Check wire routing: audio cables routed parallel to power wires or near avionics power supplies can pick up interference through capacitive or inductive coupling.'
    ],
    pro_tips: [
      'Engine-speed-dependent whine almost always traces back to the alternator or a ground loop involving the alternator output circuit — check the alternator field wire shield and the main power ground.',
      'If noise appears only when a specific avionics unit is powered on, that unit is likely the source — check its power supply filter capacitors and grounding.',
      'Digital avionics can produce noise that sounds like a rapid clicking or buzzing — this is typically clock or data bus radiation coupling into audio cables through inadequate shielding.'
    ],
    references: [
      'AC 43.13-1B Chapter 11 — Audio and Electrical Noise Isolation',
      'AC 43-215 — Electromagnetic Interference and Compatibility',
      'RTCA DO-160G — Environmental Conditions and Test Procedures (conducted and radiated emissions)'
    ],
  },
  '5-06': {
    prep_topics: ['Outer/middle/inner marker identification', 'Audio and visual indicators', 'Sensitivity check'],
    evaluator_watch: ['All three markers tested', 'Audio and lights verified', 'Sensitivity appropriate'],
    common_errors: ['Not testing all three marker frequencies', 'Ignoring audio panel routing'],
    overview: 'Marker beacon receiver testing verifies the system can receive and identify all three ILS marker beacons: outer marker (75 MHz, 400 Hz tone, blue light), middle marker (75 MHz, 1300 Hz tone, amber light), and inner marker (75 MHz, 3000 Hz tone, white light). Although marker beacons are being decommissioned at some airports, they remain part of many ILS installations and must be tested when installed on the aircraft.',
    study_guide: [
      'All three markers transmit on 75 MHz but use different modulation tones: outer = 400 Hz (dashes), middle = 1300 Hz (alternating dots and dashes), inner = 3000 Hz (dots).',
      'Test each marker using a marker beacon test set: inject the appropriate tone-modulated signal and verify the correct colored light illuminates and the correct audio tone is heard.',
      'Verify the sensitivity setting: high sensitivity is used for en route marker reception, low sensitivity is used during ILS approaches — both settings should be tested.',
      'Check the audio routing through the audio panel: marker audio should be available on the selected headset output when the marker audio switch is enabled.',
      'Verify the marker beacon antenna is installed and connected — it is typically a flush-mounted antenna on the bottom of the fuselage.'
    ],
    pro_tips: [
      'If one marker works but another does not, the receiver is likely functioning and the issue is with the audio filter for that specific tone — bench testing is required.',
      'Many pilots leave the marker sensitivity in the low position, which may not receive markers at normal en route altitudes — this is not a maintenance issue but worth noting.',
      'Some modern GPS navigators provide marker beacon simulation for GPS overlay approaches — verify this function does not interfere with actual marker beacon reception.'
    ],
    references: [
      'TSO-C35d — Marker Beacon Receivers',
      '14 CFR 91.205 — Required instruments and equipment (marker beacon provisions)',
      'RTCA DO-143 — Marker Beacon Equipment Standards'
    ],
  },
  '5-07': {
    prep_topics: ['PTT switch testing', 'Wiring shorts to ground', 'Audio panel keying circuit'],
    evaluator_watch: ['Checks PTT switch mechanically and electrically', 'Inspects wiring for chafing', 'Tests audio panel keying'],
    common_errors: ['Not checking for intermittent shorts', 'Ignoring audio panel as source'],
    overview: 'A stuck mic (hot mic) condition occurs when the radio transmits continuously without the pilot pressing the PTT switch. This blocks the frequency for other users and is a serious operational and safety issue. The cause is typically a shorted PTT switch, chafed PTT wiring making contact with airframe ground, or an audio panel keying circuit malfunction. Troubleshooting must identify the exact cause to prevent recurrence.',
    study_guide: [
      'Check the PTT switch mechanism: physically inspect the switch for debris, contamination, or mechanical failure that prevents it from returning to the open position.',
      'Test the PTT wiring for shorts to ground: disconnect the PTT switch and measure the wiring insulation resistance to airframe ground — any reading below several megohms indicates a potential short.',
      'Inspect the PTT wiring path for chafing: trace the wires from the yoke through the control column and into the instrument panel, looking for areas where insulation has worn through.',
      'Check the audio panel keying circuit: some stuck mic conditions originate in the audio panel rather than the PTT — verify the audio panel is not commanding transmit on its own.',
      'Test for intermittent shorts by flexing the PTT wiring while monitoring the keying circuit — an intermittent short may only occur when the control yoke is in certain positions.'
    ],
    pro_tips: [
      'The most common cause of a stuck mic is a PTT switch that has been contaminated with coffee, soda, or other liquid — the residue makes the switch contacts stick together.',
      'On aircraft with yoke-mounted PTT switches, the wiring passes through a flex point in the control column — this is the most common location for chafing-induced shorts.',
      'If the stuck mic occurs only on one radio, the problem is likely in the audio panel keying circuit for that radio rather than the PTT switch, which usually keys all radios.'
    ],
    references: [
      'AC 43.13-1B Chapter 11 — Communication System Troubleshooting',
      'Audio panel wiring diagram from the aircraft-specific installation manual',
      'PTT switch manufacturer specifications for contact resistance and service life'
    ],
  },
  '5-08': {
    prep_topics: ['Impedance matching requirements', 'Low vs high impedance headsets', 'Audio panel specifications'],
    evaluator_watch: ['Knows impedance requirements', 'Can identify mismatch symptoms', 'Checks audio panel specs'],
    common_errors: ['Not checking impedance setting on audio panel', 'Mixing impedance types in same installation'],
    overview: 'Audio impedance matching ensures maximum power transfer between microphones, headsets, and the audio panel. Aviation uses two impedance standards: low impedance (150-600 ohms, typical of dynamic microphones and modern headsets) and high impedance (10,000+ ohms, typical of carbon microphones and older systems). Mismatched impedance causes low audio levels, distortion, or excessive noise, and is a common source of hard-to-diagnose audio problems.',
    study_guide: [
      'Know the two impedance standards: low impedance (150-600 ohms) is used in most modern installations, while high impedance (10K+ ohms) is found in older aircraft with carbon microphones.',
      'Check the audio panel impedance setting: most audio panels have a configuration option or jumper for high or low impedance microphone input — this must match the installed microphone type.',
      'Symptoms of impedance mismatch: low-impedance mic into high-impedance input produces weak, tinny audio; high-impedance mic into low-impedance input produces distorted, boomy audio.',
      'Verify headset impedance compatibility: most modern aviation headsets are designed for the standard output impedance of aviation audio panels, but aftermarket headsets may require impedance matching adapters.',
      'When replacing headsets or microphones, verify the impedance matches the audio panel configuration — do not assume all aviation audio equipment is interchangeable.'
    ],
    pro_tips: [
      'If a pilot reports low transmit audio that the avionics shop cannot reproduce on the bench, check whether the pilot is using a headset with a different impedance than what the audio panel expects.',
      'Carbon microphones are high impedance and require a DC bias voltage from the audio panel — if the audio panel is configured for low-impedance dynamic microphones, a carbon mic will not work at all.',
      'When converting an aircraft from high-impedance to low-impedance audio (common during avionics upgrades), all microphones, headset jacks, and audio panel settings must be changed together.'
    ],
    references: [
      'AC 43.13-1B Chapter 11 — Audio System Installation',
      'Audio panel manufacturer installation manual (impedance configuration)',
      'TSO-C58a / TSO-C139a — Audio Panel Equipment Standards'
    ],
  },
  '6-01': {
    prep_topics: ['Correct stripper selection', 'Strip length for terminal type', 'Insulation inspection after strip'],
    evaluator_watch: ['Correct tool for wire gauge', 'No conductor nicks', 'Proper strip length'],
    common_errors: ['Using wrong gauge die', 'Nicking strands', 'Too long or short strip'],
    overview: 'Proper wire stripping is one of the most fundamental aircraft wiring skills. The wire stripper must be matched to the wire gauge, the strip length must be correct for the terminal or splice to be installed, and the stripping operation must not nick or cut any conductor strands. A nicked strand creates a stress concentration point that can lead to wire breakage from vibration, potentially causing an open circuit in a critical system.',
    study_guide: [
      'Select the correct stripper die for the wire gauge — using a die that is too small will nick conductors, while a die that is too large will not cleanly cut through the insulation.',
      'Set the strip length based on the terminal or splice barrel length — too short and the conductor will not fully enter the barrel, too long and bare conductor will be exposed outside the terminal.',
      'Inspect the stripped wire under magnification: verify no strands are nicked, cut, or displaced. Even a single nicked strand on a small-gauge wire can significantly reduce its current capacity and fatigue life.',
      'Know the differences between thermal strippers and mechanical strippers: thermal strippers melt the insulation without contacting the conductor, making them preferred for Kapton and Tefzel insulations.',
      'Practice the technique: rotate the stripper around the wire rather than pulling straight off, which can stretch and nick the outer strands.'
    ],
    pro_tips: [
      'If you nick even one strand on a wire, cut back and re-strip — never tape over or ignore a nicked strand. It will break from vibration and the repair will be much harder to find later.',
      'Keep your stripping tools clean and sharp — dull cutting edges tear insulation rather than cutting it cleanly, increasing the risk of conductor damage.',
      'For multi-conductor cables, strip each wire individually rather than trying to strip multiple wires at once — it is slower but produces consistently better results.'
    ],
    references: [
      'AC 43.13-1B Chapter 11 — Wire Stripping Procedures',
      'SAE AS50881 — Wiring Aerospace Vehicle (wire stripping requirements)',
      'Wire stripper manufacturer calibration and operation procedures'
    ],
  },
  '6-02': {
    prep_topics: ['Terminal selection for wire gauge', 'Crimp tool calibration', 'Pull test requirements'],
    evaluator_watch: ['Correct terminal for gauge', 'Proper crimp tool and die', 'Crimp inspected visually'],
    common_errors: ['Wrong terminal barrel size', 'Using uncalibrated tool', 'Insulation in crimp barrel'],
    overview: 'Terminal crimping creates the mechanical and electrical connection between a wire conductor and a terminal. Aviation crimps must meet strict pull-test requirements and be performed with calibrated tools using the correct die for the terminal type and wire gauge. A properly crimped terminal has lower resistance and higher reliability than a soldered connection, and it is the standard connection method in aircraft wiring.',
    study_guide: [
      'Select the terminal by matching both the wire gauge range and the stud or receptacle size — terminals are color-coded by wire gauge range (red=22-18, blue=16-14, yellow=12-10) for standard insulated terminals.',
      'Verify the crimp tool is within its calibration period — an uncalibrated crimp tool can produce crimps that appear normal visually but fail under vibration or pull testing.',
      'Use the correct die in the crimp tool for the terminal type — open-barrel and closed-barrel terminals require different dies, and using the wrong die will produce a non-compliant crimp.',
      'Inspect the completed crimp: the wire should be visible through the inspection window (if present), no insulation should be trapped in the crimp barrel, and the crimp should be symmetrical.',
      'Perform a pull test on the completed crimp if required by the installation procedure — the wire should not pull free at the specified force for the wire gauge.'
    ],
    pro_tips: [
      'Before crimping, verify the wire is fully inserted into the barrel by looking through the inspection window or feeling the wire bottom out — a partially inserted wire will produce a weak crimp.',
      'If any insulation is caught in the crimp barrel, cut the terminal off and start over — insulation in the barrel prevents proper conductor-to-barrel contact and creates a high-resistance joint.',
      'For critical applications, use a crimp height gauge (go/no-go) to verify the crimp compression meets the terminal manufacturer specification.'
    ],
    references: [
      'AC 43.13-1B Chapter 11 — Terminal Crimping and Splicing',
      'SAE AS50881 — Wiring Aerospace Vehicle (crimping requirements)',
      'Crimp tool and terminal manufacturer specifications for die selection and pull-test values'
    ],
  },
  '6-03': {
    prep_topics: ['Contact insertion tools', 'Cavity identification', 'Retention check'],
    evaluator_watch: ['Correct cavity per pin-out', 'Contact fully seated', 'Retention verified with tug test'],
    common_errors: ['Wrong cavity', 'Contact not fully seated', 'Damaging contact during insertion'],
    overview: 'Connector pin insertion and removal requires understanding the specific connector type, identifying the correct cavity from the pin-out diagram, using the proper insertion tool, and verifying retention after insertion. Multi-pin avionics connectors carry critical signals, and a pin in the wrong cavity or a pin that is not fully seated can cause system malfunction or damage. Removal requires specific extraction tools to avoid bending or breaking the contact retention clip.',
    study_guide: [
      'Identify the connector type and reference the correct pin-out diagram — connectors are identified by part number, and each cavity is numbered or lettered in a specific pattern.',
      'Use the correct insertion tool for the contact type — pushing contacts in with pliers or screwdrivers can damage the contact or the connector insert.',
      'Insert the contact until you feel and hear the retention clip engage — then perform a gentle tug test to verify the contact is locked in place.',
      'For removal, use the correct extraction tool: insert it over the contact to depress the retention clip, then gently pull the contact straight out without twisting.',
      'After all contacts are inserted, perform a final inspection: verify each wire goes to the correct cavity by checking against the wiring diagram, and verify all contacts are fully seated.'
    ],
    pro_tips: [
      'Label or mark each wire with its destination cavity before starting insertion — this prevents wiring errors that can be extremely difficult to find after the connector is assembled.',
      'If a contact does not insert smoothly, do not force it — remove it and inspect both the contact and the cavity for damage or debris before trying again.',
      'Keep a set of spare contacts and a practice connector insert for training — developing the feel for proper insertion and retention takes practice.'
    ],
    references: [
      'AC 43.13-1B Chapter 11 — Connector Assembly and Disassembly',
      'MIL-DTL-38999 / MIL-DTL-5015 — Connector Specifications (as applicable)',
      'Connector manufacturer tool selection guides and insertion/extraction procedures'
    ],
  },
  '6-04': {
    prep_topics: ['Surface preparation', 'Hardware stacking order', 'Resistance measurement'],
    evaluator_watch: ['Paint removed to bare metal', 'Correct hardware order', 'Measured \u22643 milliohms'],
    common_errors: ['Not removing paint/primer', 'Wrong hardware stacking', 'Not measuring resistance'],
    overview: 'Proper grounding and bonding provides a low-resistance return path for electrical current, ensures static charge dissipation, and protects against lightning strike damage. Every ground and bond connection must achieve less than 3 milliohms of resistance, which requires removing paint and primer to bare metal, using the correct hardware stacking order, and verifying the connection with a milliohm meter after installation.',
    study_guide: [
      'Prepare the surface by removing all paint, primer, and anodize down to bare, clean metal in an area large enough for the bonding hardware plus a margin — use approved chemical stripper or abrasive methods.',
      'Follow the correct hardware stacking order per AC 43.13-1B: for grounding to structure, the typical sequence is bolt, washer, ground lug, lock washer, structure, washer, nut.',
      'Apply corrosion-preventive compound to the prepared surface immediately after cleaning — bare aluminum oxidizes rapidly, and even a thin oxide layer increases resistance.',
      'Measure the bond resistance with a calibrated milliohm meter: the total resistance from the ground terminal through the hardware to the structure must not exceed 3 milliohms.',
      'Protect the completed ground connection with sealant or primer to prevent future corrosion — an unprotected ground will degrade over time and eventually exceed the resistance limit.'
    ],
    pro_tips: [
      'The most common grounding failure is inadequate surface preparation — if you can see any paint or primer under the hardware, the bond will likely exceed 3 milliohms.',
      'Star washers (internal or external tooth lock washers) improve bond resistance by biting into the metal surface, but they are not a substitute for proper surface preparation.',
      'When measuring bond resistance, verify your meter leads are not contributing significant resistance — zero the meter by touching the leads together before measuring the bond.'
    ],
    references: [
      'AC 43.13-1B Chapter 11, Section 11-20 through 11-22 — Bonding and Grounding',
      'SAE AS50881 — Wiring Aerospace Vehicle (grounding and bonding requirements)',
      'MIL-B-5087B — Bonding, Electrical, and Lightning Protection'
    ],
  },
  '6-05': {
    prep_topics: ['Routing clearances', 'Clamp spacing', 'SWAMP area protection', 'Flight control clearance'],
    evaluator_watch: ['Proper clearance from controls', 'Adequate clamp spacing', 'Correct lacing/tie technique'],
    common_errors: ['Routing near heat sources', 'Inadequate control clearance', 'Wrong clamp type for area'],
    overview: 'Wire routing and clamping determines the long-term reliability of an aircraft wiring installation. Wires must maintain adequate clearance from flight controls, fluid lines, heat sources, and sharp edges. Clamps must be spaced correctly to prevent wire sagging and chafing, and wires in SWAMP (Severe Wind And Moisture Problem) areas require additional protection. Poor routing is one of the most common causes of wiring failures in aircraft.',
    study_guide: [
      'Maintain a minimum of 3 inches clearance between wire bundles and flight control cables, push-rods, or surfaces — verify clearance with controls at full travel in both directions.',
      'Space clamps at intervals not exceeding 24 inches to prevent sagging, and closer spacing in areas of vibration — the wire bundle should not contact any structure between clamps.',
      'Route wires away from heat sources (exhaust, heater ducts, hot bleed air lines) and provide thermal protection where routing near heat sources is unavoidable.',
      'In SWAMP areas (wheel wells, engine compartments, areas exposed to fluid spray), use moisture-resistant wire types and provide additional chafe protection with conduit or sleeving.',
      'Use the correct clamp type for the application: cushioned clamps for normal installations, bonded clamps where grounding is required, and no-snag clamps in areas where personnel may contact the installation.'
    ],
    pro_tips: [
      'Walk the entire wire route before installing clamps — identify potential chafe points, heat sources, and clearance conflicts before committing to a routing path.',
      'Always check flight control clearance with someone moving the controls through full travel while you observe the wire routing — static inspection misses dynamic clearance issues.',
      'Do not over-tighten clamps: the wire bundle should be snug but not compressed. Over-tightening crushes insulation and creates a stress point where wires will eventually break.'
    ],
    references: [
      'AC 43.13-1B Chapter 11, Section 11-46 through 11-54 — Wire Routing and Clamping',
      'SAE AS50881 — Wiring Aerospace Vehicle (routing and support requirements)',
      'Aircraft-specific installation drawings for approved wire routing paths'
    ],
  },
  '6-06': {
    prep_topics: ['Splice types and selection', 'Stagger requirement', 'Environmental protection'],
    evaluator_watch: ['Correct splice type selected', 'Splices staggered in bundle', 'Proper environmental seal'],
    common_errors: ['Splices aligned causing bulge', 'Wrong splice for wire gauge', 'No environmental protection'],
    overview: 'Wire splices provide permanent connections in situations where wires must be joined mid-run, such as during repairs, modifications, or STC installations. The splice type must be matched to the wire gauge, and when multiple splices are made in the same wire bundle, they must be staggered to prevent creating a bulge that can cause chafing. Environmental protection (heat shrink, sealant) prevents moisture intrusion that causes corrosion and eventual splice failure.',
    study_guide: [
      'Select the correct splice type based on wire gauge and application: butt splices for in-line connections, step-down splices for joining different gauge wires, and environmental splices for exposed areas.',
      'Stagger splices in a wire bundle: splices should not be aligned next to each other, as the resulting bulge creates a stiff point that concentrates vibration stress and can cause chafing against adjacent wires.',
      'Crimp the splice using a calibrated crimp tool with the correct die — the same crimping standards apply to splices as to terminal crimps.',
      'Apply environmental protection: heat-shrink tubing over the splice provides mechanical protection and moisture sealing. Use adhesive-lined heat shrink for maximum moisture protection.',
      'Limit the number of splices in any single wire run to the minimum necessary — excessive splicing degrades the wire harness and adds potential failure points.'
    ],
    pro_tips: [
      'When repairing a wire, make the splice in an accessible location rather than at the exact failure point — this makes future inspection and re-repair much easier.',
      'If multiple splices are needed in a small area, use a splice block or terminal strip instead of individual butt splices — it is neater, more maintainable, and provides better strain relief.',
      'Always perform a tug test on completed splices before applying heat shrink — once the heat shrink is in place, a weak crimp is impossible to inspect visually.'
    ],
    references: [
      'AC 43.13-1B Chapter 11 — Wire Splicing',
      'SAE AS50881 — Wiring Aerospace Vehicle (splicing requirements and limitations)',
      'Splice manufacturer specifications for crimp tools, die selection, and pull-test values'
    ],
  },
  '6-07': {
    prep_topics: ['15-inch marking interval', 'Marking methods for different insulations', 'Kapton restrictions'],
    evaluator_watch: ['Markings at each end and every 15 inches', 'Correct marking method for insulation type', 'Legible and durable'],
    common_errors: ['Exceeding 15-inch interval', 'Hot-stamping Kapton wire', 'Illegible markings'],
    overview: 'Wire marking and identification enables technicians to trace, identify, and troubleshoot aircraft wiring throughout its service life. Wires must be marked at each end, at each junction, and at intervals not exceeding 15 inches along the wire run. The marking method must be appropriate for the wire insulation type — critically, Kapton wire must never be hot-stamped, as the heat can damage the insulation and create a latent failure point.',
    study_guide: [
      'Mark every wire at both ends and at intervals not exceeding 15 inches — this ensures the wire can be identified at any point in its routing without tracing from end to end.',
      'Use the correct marking method for the insulation type: hot-stamping for Tefzel and most polymer insulations, but never for Kapton (polyimide) wire, which can crack from the heat and pressure.',
      'For Kapton wire, use sleeving, laser marking, or ink-jet printing as approved alternative marking methods — these do not apply heat or pressure to the insulation.',
      'Ensure markings are legible and durable: they must survive the aircraft environment (vibration, temperature, fluid exposure) for the service life of the wire.',
      'Follow the aircraft wiring diagram wire identification system — typically a circuit function code, wire gauge, and segment identifier that creates a unique identification for each wire in the aircraft.'
    ],
    pro_tips: [
      'Use a heat-shrink sleeve with pre-printed identification as an easy, reliable marking method that works on any insulation type — it is more time-consuming but more durable than ink marking.',
      'If hot-stamp markings become illegible over time, the stamping pressure or temperature setting was likely incorrect — calibrate the stamper per the manufacturer instructions.',
      'When adding wires to an existing installation, follow the existing wire identification scheme exactly — inconsistent marking creates confusion for future technicians.'
    ],
    references: [
      'AC 43.13-1B Chapter 11, Section 11-43 — Wire Identification',
      'SAE AS50881 — Wiring Aerospace Vehicle (marking requirements)',
      'MIL-W-5088 — Wiring, Aircraft, Installation (marking specifications)'
    ],
  },
  '6-08': {
    prep_topics: ['Continuity testing', 'Insulation resistance testing', 'Systematic isolation technique'],
    evaluator_watch: ['Correct meter function selected', 'Systematic approach', 'Fault located accurately'],
    common_errors: ['Not disconnecting power before testing', 'Testing with components connected', 'Random checking vs systematic'],
    overview: 'Wire fault isolation combines continuity testing and insulation resistance testing to locate opens, shorts, and grounds in aircraft wiring. This is a core troubleshooting skill that requires understanding how to use a multimeter correctly, how to isolate wire runs from connected equipment, and how to systematically narrow the fault location. Power must always be disconnected before testing, and components must be disconnected to avoid false readings.',
    study_guide: [
      'Always disconnect aircraft power and all circuit breakers before performing continuity or insulation resistance testing — applying test voltage to powered circuits can damage test equipment and avionics.',
      'Disconnect components at both ends of the wire being tested — a component connected to the wire will affect both continuity and insulation resistance readings, producing false results.',
      'For continuity testing: set the meter to ohms, connect to both ends of the wire, and verify near-zero resistance. An open circuit reads infinite resistance. Compare pin-to-pin against the wiring diagram.',
      'For insulation resistance testing: use a megohmmeter (megger) set to the appropriate voltage (typically 500V for aircraft wiring) and measure between the conductor and the wire shield or airframe ground — readings should be several megohms minimum.',
      'Use systematic isolation: divide the wire run into sections, test each section independently, and narrow the fault to a specific segment. This is faster and more reliable than random point-to-point testing.'
    ],
    pro_tips: [
      'Label or photograph the connector before disconnecting wires for testing — reassembling a multi-pin connector from memory under time pressure leads to wiring errors.',
      'An intermittent open circuit may test good with the wire at rest but fail when the wire is flexed or vibrated — gently manipulate the wire during continuity testing to detect intermittent opens.',
      'When performing insulation resistance testing, allow the reading to stabilize for at least 30 seconds — dielectric absorption in long cable runs causes the initial reading to be artificially low.'
    ],
    references: [
      'AC 43.13-1B Chapter 11 — Wire Testing and Troubleshooting',
      'SAE AS50881 — Wiring Aerospace Vehicle (testing requirements)',
      'Test equipment manufacturer operating manual for proper use of multimeter and megohmmeter'
    ],
  },
  '7-01': {
    prep_topics: ['Hardware part number matching', 'Software compatibility matrix', 'Data plate verification'],
    evaluator_watch: ['Checks hardware P/N against compatibility list', 'Verifies from data plate not memory', 'Documents verified compatibility'],
    common_errors: ['Assuming compatibility without checking', 'Using wrong compatibility document'],
    overview: 'Hardware/software compatibility verification ensures that an avionics unit hardware revision is compatible with the software or firmware being loaded. Manufacturers publish compatibility matrices that list which software versions are approved for which hardware part numbers. Loading incompatible software can cause malfunctions, loss of features, or even render the unit inoperative. Always verify from the data plate, never from memory.',
    study_guide: [
      'Locate the hardware part number and modification status from the unit data plate — never rely on memory, the work order description, or the part number painted on the case.',
      'Reference the manufacturer software compatibility matrix or service bulletin to determine which software versions are approved for the specific hardware revision.',
      'Understand that hardware revisions may have different processor types, memory sizes, or interface configurations that make them incompatible with certain software versions.',
      'Document the verified compatibility: record the hardware P/N, software P/N, and the compatibility reference document in the maintenance records.',
      'If the compatibility matrix shows the hardware requires a modification before the software can be loaded, the modification must be performed first — do not attempt to load incompatible software.'
    ],
    pro_tips: [
      'Bookmark the manufacturer compatibility pages for equipment you work on frequently — compatibility matrices are updated regularly and the information you used last month may have changed.',
      'Some manufacturers embed hardware revision codes in the part number suffix that are easy to overlook — check the complete part number including all dashes and suffixes.',
      'When multiple units of the same type are installed in an aircraft (e.g., dual nav/comm), verify compatibility for each unit individually — they may have different hardware revisions.'
    ],
    references: [
      'Equipment manufacturer service bulletins and software compatibility documents',
      'AC 43-12A — Preventive Maintenance (configuration management provisions)',
      '14 CFR 43.3 — Persons Authorized to Perform Maintenance (approved data requirements)'
    ],
  },
  '7-02': {
    prep_topics: ['Configuration export procedures', 'Storage media verification', 'Backup file verification'],
    evaluator_watch: ['Backup performed before any changes', 'Backup verified readable', 'Stored safely'],
    common_errors: ['Skipping backup entirely', 'Not verifying backup integrity', 'Overwriting previous backup'],
    overview: 'Configuration backup before any software or firmware change is a critical safety net. If the update fails or produces unexpected behavior, the backup allows you to restore the unit to its previous known-good state. The backup must be verified as readable and stored safely. Skipping this step is the most common cause of units being sent to the manufacturer for recovery after a failed software load.',
    study_guide: [
      'Always perform a configuration backup before making any software, firmware, or configuration changes — this is your insurance policy against failed updates.',
      'Follow the manufacturer procedure for exporting the current configuration: this may involve saving to a data card, USB drive, or using a maintenance computer to download the configuration.',
      'Verify the backup is complete and readable: load the backup file on a computer and confirm it contains data, or use the unit verification function to confirm the backup is valid.',
      'Store the backup media safely and label it clearly with the aircraft tail number, unit serial number, date, and software version — you may need it months later.',
      'Do not overwrite the previous backup with the new one until the update is confirmed successful — keep at least one rollback backup available.'
    ],
    pro_tips: [
      'Keep a shop archive of configuration backups organized by aircraft tail number — when an operator reports problems after an update, having the pre-update configuration available is invaluable.',
      'Test your backup media regularly: SD cards and USB drives can fail silently, and discovering your backup is corrupted during an emergency recovery is the worst possible time.',
      'Some avionics units have multiple configuration files (operating configuration, pilot preferences, databases) — verify you have backed up all of them, not just the operating software.'
    ],
    references: [
      'Equipment manufacturer maintenance manual (configuration backup procedures)',
      'AC 43-12A — Configuration Management in Aviation Maintenance',
      'Shop quality manual procedures for data backup and retention'
    ],
  },
  '7-03': {
    prep_topics: ['Manufacturer-specific procedures', 'Power requirements during load', 'Progress monitoring'],
    evaluator_watch: ['Follows manufacturer procedure', 'Power maintained throughout', 'Monitors progress'],
    common_errors: ['Interrupting load process', 'Power loss during update', 'Not following exact sequence'],
    overview: 'Software and firmware updates must follow the manufacturer procedure exactly, with particular attention to power stability during the load process. A power interruption during a firmware write can corrupt the unit boot sector, rendering it unable to start and requiring factory recovery. Each manufacturer has specific procedures, sequences, and requirements that must be followed without deviation.',
    study_guide: [
      'Read the complete update procedure before starting — understand every step, required equipment, and expected duration before beginning the process.',
      'Ensure stable power throughout the update: connect the aircraft to ground power or a dedicated power supply, and verify the voltage is stable before starting the load.',
      'Follow the manufacturer sequence exactly: some updates require loading files in a specific order, performing intermediate reboots, or confirming status at checkpoints during the process.',
      'Monitor the update progress: most units display a progress indicator or status messages — know what normal progress looks like and what error conditions look like.',
      'Never interrupt a software load in progress unless the procedure specifically instructs you to do so — interrupting a flash memory write is the most common cause of bricked avionics units.'
    ],
    pro_tips: [
      'Disable the aircraft battery charger during software loads — battery chargers can cause voltage fluctuations that disrupt the update process.',
      'If the update takes longer than expected but shows progress, wait. If it shows no progress for more than double the expected time, then follow the manufacturer stalled-update recovery procedure.',
      'Keep a laptop with the manufacturer update software charged and ready — some updates require a specific version of the loader software, and downloading it mid-procedure is not an option in a hangar without internet.'
    ],
    references: [
      'Equipment manufacturer software update procedures and release notes',
      'AC 43-12A — Configuration Management',
      '14 CFR 43.3 — Approved Data for Maintenance Actions'
    ],
  },
  '7-04': {
    prep_topics: ['Failed load indicators', 'Recovery procedures', 'When to escalate'],
    evaluator_watch: ['Recognizes failure condition', 'Follows recovery procedure', 'Does not panic'],
    common_errors: ['Attempting multiple rapid retries', 'Not checking media integrity', 'Sending unit to shop unnecessarily'],
    overview: 'Failed software load recovery requires calm, methodical action. When a software load fails, the unit may be in a partially updated state that requires specific recovery procedures. The key principles are: do not panic, do not attempt rapid retries without diagnosing the cause, and follow the manufacturer recovery procedure. Many units that are sent to manufacturers for failed load recovery could have been recovered in the field with the correct procedure.',
    study_guide: [
      'Recognize a failed load condition: the unit may display an error code, fail to boot, or show a maintenance mode screen — document the exact symptoms and any error codes displayed.',
      'Before retrying, diagnose the likely cause: check the data media for corruption, verify the file was downloaded correctly, confirm compatibility, and verify power was stable during the attempt.',
      'Follow the manufacturer recovery procedure: many units have a specific recovery mode (boot loader mode, safe mode) that allows reloading software even after a failed update.',
      'Know when to escalate: if the recovery procedure does not restore the unit after two attempts, contact the manufacturer technical support before continuing — additional retry attempts may make recovery harder.',
      'Document the failure: record what happened, what error codes appeared, and what recovery steps were taken — this information helps the manufacturer if the unit must be returned.'
    ],
    pro_tips: [
      'Keep the manufacturer technical support phone number readily available — calling early in a failed recovery saves hours compared to trying every possible fix on your own.',
      'The most common cause of a failed software load is a corrupted data file — always download a fresh copy from the manufacturer website and verify the file checksum before retrying.',
      'Some units have a hardware boot loader that is separate from the application software — as long as the boot loader is intact, the unit can be recovered. The boot loader is almost never damaged by a failed application load.'
    ],
    references: [
      'Equipment manufacturer maintenance manual (recovery and troubleshooting procedures)',
      'Manufacturer technical support contact information and escalation procedures',
      'AC 43-12A — Configuration Management'
    ],
  },
  '7-05': {
    prep_topics: ['Version verification', 'Configuration comparison', 'Feature activation check'],
    evaluator_watch: ['Verifies correct version loaded', 'Compares to expected configuration', 'Checks all features active'],
    common_errors: ['Not verifying version matches expected', 'Missing configuration items'],
    overview: 'Post-update verification confirms that the correct software version was loaded, the configuration matches the expected state, and all features and functions are active. This step catches partial updates, wrong software versions, or configuration loss that occurred during the update process. Skipping verification and returning the aircraft to service with incorrect software is a serious maintenance error.',
    study_guide: [
      'Verify the software version displayed on the unit startup screen or maintenance page matches the version you intended to load — do not assume the load was correct because it completed without errors.',
      'Compare the post-update configuration to the pre-update backup: verify all operator-specific settings, database configurations, and installed options are still present and correct.',
      'Check feature activation: some software updates enable or disable specific features based on the installed hardware or optional activation keys — verify all features the aircraft requires are active.',
      'Verify the unit passes its built-in test (BIT) or self-test after the update — a clean BIT confirms the software is running correctly on the hardware.',
      'If any configuration items are missing or incorrect after the update, restore them from the backup before returning the aircraft to service.'
    ],
    pro_tips: [
      'Create a pre-update checklist of all configurable items for each unit type you service — use it as a verification guide after every update to ensure nothing was lost.',
      'Some software updates intentionally reset certain configuration items to default values — the release notes will list these. Read the release notes before the update so you know what to reconfigure.',
      'Take a photo of the configuration screens before the update — this gives you a quick reference to compare against after the update without relying on memory or written notes.'
    ],
    references: [
      'Equipment manufacturer software release notes (known configuration effects)',
      'Aircraft-specific equipment list and approved configuration',
      'AC 43-12A — Configuration Management (verification requirements)'
    ],
  },
  '7-06': {
    prep_topics: ['Maintenance manual test procedures', 'Integration checks', 'Regression testing'],
    evaluator_watch: ['Follows maintenance manual procedure', 'Tests all affected functions', 'Documents results'],
    common_errors: ['Abbreviated testing', 'Not testing interface functions', 'Not documenting test results'],
    overview: 'Operational testing after a software change must verify not only the updated functions but also the integration with other connected systems. A software update can inadvertently affect interface functions, data bus outputs, or display formats that other systems depend on. The maintenance manual test procedure defines the minimum required tests, but experienced technicians also perform regression checks on functions that should not have changed.',
    study_guide: [
      'Follow the maintenance manual operational test procedure completely — do not abbreviate or skip tests based on your assumption that the update only affected certain functions.',
      'Test all interfaces to connected systems: verify ARINC 429 data bus outputs, analog signal outputs, display interfaces, and control inputs from other systems.',
      'Perform regression testing: verify that functions which should not have been affected by the update still work correctly — unexpected regressions are a known risk of software updates.',
      'Document all test results: record pass/fail for each test step, and note any anomalies even if they do not constitute a failure — this documentation supports future troubleshooting.',
      'If any test fails after a software update, document the failure and report it to the manufacturer — it may be a known issue with a workaround or require a software patch.'
    ],
    pro_tips: [
      'If the same unit interfaces with multiple systems (e.g., a GPS that feeds the autopilot, MFD, and transponder), test each interface independently — a problem on one bus does not necessarily affect the others.',
      'Save the test results alongside the update documentation in the aircraft records — when problems appear weeks later, these test results help determine whether the issue was present immediately after the update or developed subsequently.',
      'Some manufacturers publish known issues lists for each software version — review this list before testing so you know which items are known limitations versus actual failures.'
    ],
    references: [
      'Aircraft-specific maintenance manual (operational test procedures for the updated equipment)',
      'Equipment manufacturer software release notes (testing recommendations)',
      'AC 43-12A — Configuration Management (post-modification testing requirements)'
    ],
  },
  '7-07': {
    prep_topics: ['Equipment list', 'STC data', 'Configuration modules', 'EEPROM programming'],
    evaluator_watch: ['Can locate approved configuration', 'Understands configuration module purpose', 'Traces to approved data'],
    common_errors: ['Not knowing where to find approved configuration', 'Confusing installed vs approved'],
    overview: 'Configuration documentation review ensures you understand the approved installed configuration of each avionics unit — including hardware part number, software version, option modules, EEPROM programming, and database subscriptions. The approved configuration is defined by the Type Certificate, STC data, or field approval, and any deviation from the approved configuration is a regulatory non-compliance. Understanding how to find and verify the approved configuration is essential for all maintenance and modification work.',
    study_guide: [
      'Locate the approved configuration documentation: this may be in the STC installation instructions, the aircraft equipment list, the Type Certificate Data Sheet, or a field approval (Form 337).',
      'Understand configuration modules: many modern avionics use plug-in modules or software keys to enable optional features — the installed modules must match the approved configuration.',
      'Verify EEPROM programming: some units store configuration data in EEPROM that defines the unit behavior for the specific aircraft installation — this programming must match the approved configuration.',
      'Distinguish between installed configuration and approved configuration: the installed configuration is what is physically in the aircraft, while the approved configuration is what the regulatory documentation says should be there — they must match.',
      'When performing maintenance, always verify that the unit you are installing or configuring matches the approved configuration documentation for that specific aircraft serial number.'
    ],
    pro_tips: [
      'Keep a copy of the current approved configuration for each aircraft you service regularly — this saves time when performing maintenance and prevents inadvertently installing the wrong configuration.',
      'If you find a discrepancy between the installed configuration and the approved documentation, do not simply change the documentation to match — the installed configuration may be incorrect and require correction.',
      'Some operators maintain configuration management databases — check whether the operator has a system before relying solely on paper documentation.'
    ],
    references: [
      'Aircraft-specific Type Certificate Data Sheet and equipment list',
      'STC installation instructions for all installed STCs',
      '14 CFR 21.31 / 21.113 — Type Design and Altered Product (configuration requirements)',
      'AC 43-12A — Configuration Management in Aviation Maintenance'
    ],
  },
  '8-01': {
    prep_topics: ['Required entry elements', 'Test data inclusion', 'Approval statement wording'],
    evaluator_watch: ['All required elements present', 'Test data recorded accurately', 'Proper approval statement'],
    common_errors: ['Missing required elements', 'Vague descriptions', 'Wrong regulation reference'],
    overview: 'A proper maintenance logbook entry is a regulatory requirement per 14 CFR 43.9 and must include specific elements: a description of the work performed, the date of completion, the name and certificate number of the person performing the work, and an approval for return to service statement. Incomplete or inaccurate logbook entries are one of the most common findings during FAA inspections and can result in enforcement action.',
    study_guide: [
      'Include all elements required by 14 CFR 43.9: description of work, date of completion, name of person performing the work, certificate number and type, and signature.',
      'Write a clear, specific description of the work performed — not just "repaired wiring" but "repaired broken wire P3-17 from GPS antenna to navigator, installed splice per AC 43.13-1B, tested continuity and insulation resistance satisfactory."',
      'Include test data when applicable: measurement values, test equipment used, and pass/fail criteria referenced — this data supports the return to service determination.',
      'Write the approval for return to service statement correctly: it must reference the specific inspection or maintenance performed and include the phrase "approved for return to service" or equivalent.',
      'Sign the entry with your name, certificate number, and the date — an unsigned entry is not a valid maintenance record.'
    ],
    pro_tips: [
      'Develop a template or checklist for common logbook entries — this ensures you include all required elements every time, even when working under time pressure.',
      'Write the logbook entry as if a stranger (or an FAA inspector) will read it years from now — they need to understand exactly what was done, why, and what data supports the determination.',
      'If you find yourself writing vague descriptions, ask yourself: could another technician duplicate exactly what I did based on this entry alone? If not, add more detail.'
    ],
    references: [
      '14 CFR 43.9 — Content, Form, and Disposition of Maintenance Records',
      '14 CFR 43.11 — Content, Form, and Disposition of Records for Inspections',
      '14 CFR 91.417 — Maintenance Records (retention requirements)',
      'AC 43.9-1F — Instructions for Completion of FAA Form 337'
    ],
  },
  '8-02': {
    prep_topics: ['91.413 specific requirements', 'ADS-B compliance addition', 'Transponder test data'],
    evaluator_watch: ['91.413 specific elements present', 'ADS-B compliance documented', 'Test parameters recorded'],
    common_errors: ['Missing ADS-B compliance data', 'Confusing 91.411 and 91.413 requirements'],
    overview: 'Transponder and ADS-B test documentation has specific requirements beyond standard maintenance logbook entries. The 91.413 test entry must include all transponder test parameters (frequency, power, suppression, mode accuracy), and if the aircraft has ADS-B Out, the 91.227 compliance status must also be documented. These are separate regulatory requirements with different test parameters that must be recorded independently.',
    study_guide: [
      'Document all transponder test parameters per Part 43 Appendix F: reply frequency accuracy, power output, suppression ratio, Mode A code accuracy, Mode C altitude accuracy, and Mode S functions.',
      'Document ADS-B compliance status separately per 91.227: NACp value, position source integrity, ICAO address verification, geometric altitude reporting, and overall compliance determination.',
      'Include test equipment identification: transponder test set manufacturer, model, serial number, and calibration due date.',
      'Reference the correct regulation: 91.413 for transponder testing, 91.227 for ADS-B compliance — do not confuse these with 91.411 (pitot-static).',
      'State the compliance determination clearly: the aircraft either meets or does not meet the requirements of 91.413 and/or 91.227 — do not leave this ambiguous.'
    ],
    pro_tips: [
      'Attach the test equipment printout to the work order as supporting documentation — it provides detailed test data that supplements the logbook entry.',
      'Some operators want separate logbook entries for transponder (91.413) and ADS-B (91.227) testing — ask the operator preference before writing the entries.',
      'If the ADS-B compliance test reveals a non-compliance condition, document it clearly and inform the operator in writing — operating without ADS-B compliance in required airspace is a violation.'
    ],
    references: [
      '14 CFR 91.413 — ATC Transponder Tests and Inspections',
      '14 CFR 91.227 — ADS-B Out Equipment Performance Requirements',
      '14 CFR 43, Appendix F — ATC Transponder Tests and Inspections',
      'AC 20-165B — ADS-B Out Compliance Documentation'
    ],
  },
  '8-03': {
    prep_topics: ['Approved data sources', 'STC reference format', 'Description of work'],
    evaluator_watch: ['Approved data properly referenced', 'Work described accurately', 'Return to service statement'],
    common_errors: ['Missing approved data reference', 'Incomplete description', 'Wrong approval statement'],
    overview: 'STC installation documentation requires referencing the specific approved data used for the installation, describing the work performed in sufficient detail, and providing a proper return to service statement. The documentation must trace the work to the STC approval — including the STC number, the STC holder, and the specific instructions followed. This documentation is part of the permanent aircraft record and will be reviewed during future inspections and transactions.',
    study_guide: [
      'Reference the STC completely: include the STC number (e.g., SA01234NY), the STC holder name, the revision level of the installation instructions used, and the date of the instructions.',
      'Describe the work performed accurately: list all components installed (with part numbers and serial numbers), all wiring performed, all structural modifications, and all tests conducted.',
      'Include the return to service statement: "This installation was performed in accordance with STC [number] and the aircraft is approved for return to service."',
      'Reference the weight and balance change: any STC installation that changes the aircraft weight or CG must include updated weight and balance data per 14 CFR 43.9.',
      'Ensure the STC is applicable to the specific aircraft: verify the aircraft make, model, and serial number falls within the STC applicability list before starting the installation.'
    ],
    pro_tips: [
      'Obtain the most current revision of the STC installation instructions before starting — STCs are frequently revised, and installing per an outdated revision creates a compliance issue.',
      'Take progress photos during the installation — they support the documentation and can be invaluable if questions arise about the installation years later.',
      'Some STCs require a Form 337 in addition to the logbook entry — check the STC instructions for the specific documentation requirements.'
    ],
    references: [
      '14 CFR 43.9 — Content, Form, and Disposition of Maintenance Records',
      '14 CFR 21.303 — Supplemental Type Certificates (documentation requirements)',
      'AC 43.9-1F — Instructions for Completion of FAA Form 337',
      'The specific STC installation instructions for the work being performed'
    ],
  },
  '8-04': {
    prep_topics: ['When 337 is required', 'Form sections and fields', 'Approval blocks'],
    evaluator_watch: ['All blocks completed', 'Correct classification (major/minor)', 'Proper weight and balance data'],
    common_errors: ['Incomplete blocks', 'Wrong classification', 'Missing weight and balance'],
    overview: 'FAA Form 337 (Major Repair and Alteration) is required for all major repairs and major alterations to aircraft, engines, propellers, and appliances. The form documents the approved data used, the work performed, and the approval for return to service. Completing a 337 correctly requires understanding which blocks apply, how to classify the work (major vs. minor), and how to reference the approved data. Incorrect 337 completion is one of the most common FAA enforcement findings.',
    study_guide: [
      'Know when a 337 is required: all major repairs and major alterations as defined in 14 CFR Part 1 and 14 CFR 43, Appendix A — if the work is classified as major, a 337 is mandatory.',
      'Complete all blocks: the form has specific blocks for aircraft identification, description of work, approved data reference, weight and balance data, and approval signatures — every applicable block must be filled in.',
      'Classify the work correctly: major repair changes a part back to its original condition using complex methods; major alteration changes the aircraft design from its original type design — these have different documentation paths.',
      'Include weight and balance data: if the repair or alteration changes the aircraft empty weight or CG, updated weight and balance data must be recorded on the form or attached.',
      'Understand the approval blocks: Block 3 is for the person performing the work, and Block 7 is for the person approving the return to service (which may require IA authority for major repairs on most aircraft).'
    ],
    pro_tips: [
      'Use the FAA online 337 form filing system (FSIMS) to ensure the form reaches the FAA Flight Standards District Office (FSDO) — paper copies can be lost in transit.',
      'Keep a copy of every 337 you complete — you may need to reference it years later when the aircraft is sold, inspected, or the work is questioned.',
      'If you are unsure whether work is major or minor, consult with your IA or the local FSDO before starting — it is much easier to get the classification right upfront than to fix it after the fact.'
    ],
    references: [
      '14 CFR 43, Appendix A — Major Alterations, Major Repairs, and Preventive Maintenance',
      'AC 43.9-1F — Instructions for Completion of FAA Form 337',
      '14 CFR Part 1 — Definitions (major repair, major alteration)',
      'FAA Order 8300.16 — Major Repair and Alteration Data Approval'
    ],
  },
  '8-05': {
    prep_topics: ['14 CFR Part 1 definitions', 'AC 43.13 guidance', 'Practical examples'],
    evaluator_watch: ['Can articulate the distinction', 'Applies criteria to examples', 'Knows documentation difference'],
    common_errors: ['Confusing major repair with major alteration', 'Not understanding documentation implications'],
    overview: 'The distinction between major repair and major alteration determines the required documentation, approved data, and approval authority. A major repair restores a damaged part to its original condition using methods that go beyond simple techniques. A major alteration changes the aircraft from its original type design — adding, removing, or changing equipment or structure. The classification drives whether a 337 is required, who can approve the return to service, and what approved data must be referenced.',
    study_guide: [
      'Major repair: restores a damaged or worn part to its original, airworthy condition using methods, techniques, or practices that may appreciably affect weight, balance, structural strength, performance, powerplant operation, flight characteristics, or other qualities affecting airworthiness.',
      'Major alteration: a change to the aircraft type design that is not listed as a minor alteration in Part 43 Appendix A — this includes adding or removing equipment, changing structural configuration, or modifying systems.',
      'Documentation difference: both require a Form 337, but major repairs reference repair data (manufacturer repair manual, AC 43.13-1B), while major alterations reference alteration data (STC, field approval, TC holder engineering).',
      'Approval authority difference: major repairs require IA (Inspection Authorization) approval for most aircraft, while major alterations require IA approval and may also require FSDO involvement for field approvals.',
      'Apply the classification to practical examples: replacing a corroded wing skin panel is a major repair; adding a GPS antenna and running new wiring is a major alteration — both are on a 337 but use different approved data.'
    ],
    pro_tips: [
      'When in doubt about classification, refer to 14 CFR Part 43, Appendix A — it lists specific examples of major and minor repairs and alterations for each category.',
      'The classification is not based on complexity or difficulty but on whether the work restores (repair) or changes (alteration) the aircraft from its type design.',
      'A single work scope can include both repairs and alterations — for example, repairing damage discovered during an avionics upgrade involves both classifications.'
    ],
    references: [
      '14 CFR Part 1.1 — Definitions (major alteration, major repair)',
      '14 CFR 43, Appendix A — Major Alterations, Major Repairs, and Preventive Maintenance',
      'AC 43.13-1B — Acceptable Methods, Techniques, and Practices (repair guidance)',
      'FAA Order 8300.16 — Major Repair and Alteration Data Approval'
    ],
  },
  '8-06': {
    prep_topics: ['STC, TSO, TC, field approval', 'How to verify data is approved', 'Data hierarchy'],
    evaluator_watch: ['Can identify data sources', 'Knows how to verify approval', 'Understands hierarchy'],
    common_errors: ['Confusing advisory material with approved data', 'Not verifying STC applicability'],
    overview: 'Approved data identification is a critical competency for any aviation maintenance professional. Approved data includes Type Certificates, STCs, TSOs, Parts Manufacturer Approvals, field approvals (Form 337), and manufacturer maintenance manuals accepted by the FAA. Advisory material (ACs, service bulletins, industry standards) is not approved data unless specifically referenced by an approved document. Using non-approved data for maintenance is a regulatory violation.',
    study_guide: [
      'Know the approved data hierarchy: Type Certificate (TC) > Supplemental Type Certificate (STC) > Technical Standard Order (TSO) > Parts Manufacturer Approval (PMA) > Field Approval (Form 337).',
      'Understand what each type covers: TC defines the original design, STC approves modifications, TSO approves individual articles to minimum standards, PMA approves replacement parts, and field approvals authorize one-time modifications.',
      'Know the difference between approved data and advisory material: AC 43.13-1B is approved data when referenced in the aircraft maintenance manual or 14 CFR, but standing alone it is advisory guidance.',
      'Verify STC applicability: an STC is approved only for the specific aircraft make, model, and serial number range listed in the STC — using it outside the approved range is a violation.',
      'Know how to verify data is approved: check the FAA STC/PMA databases, verify TC data sheets on the FAA website, and confirm field approvals through FSDO records.'
    ],
    pro_tips: [
      'When in doubt about whether data is approved, ask: is there an FAA approval number (STC number, TSO authorization, PMA letter) associated with this data? If not, it is advisory.',
      'Manufacturer service bulletins are not approved data by themselves — they become approved when referenced by an AD, STC, or when the manufacturer maintenance manual (which is accepted data) references them.',
      'Keep a quick-reference list of common approved data sources for the aircraft types you service — this saves time when writing logbook entries and 337 forms.'
    ],
    references: [
      '14 CFR 43.13 — Performance Rules for Maintenance (approved data requirements)',
      '14 CFR 21 — Certification Procedures for Products and Parts (TC, STC, TSO, PMA)',
      'AC 43-210A — Standardized Procedures for Requesting Field Approval of Data',
      'FAA STC/PMA database — rgl.faa.gov'
    ],
  },
  '8-07': {
    prep_topics: ['AD search methods', 'Applicability determination', 'Compliance tracking'],
    evaluator_watch: ['Can search AD database', 'Determines applicability correctly', 'Understands compliance requirements'],
    common_errors: ['Missing applicable ADs', 'Not checking superseded ADs', 'Wrong compliance method'],
    overview: 'Airworthiness Directive (AD) compliance is mandatory — ADs are legally enforceable rules that require specific maintenance actions to address unsafe conditions found in aircraft, engines, propellers, or appliances. You must be able to search the AD database, determine applicability to a specific aircraft, understand the compliance requirements and timeline, and verify that all applicable ADs have been complied with. Failure to comply with an applicable AD renders the aircraft unairworthy.',
    study_guide: [
      'Search the FAA AD database (rgl.faa.gov) using multiple search criteria: aircraft make/model, engine type, appliance manufacturer, and keyword — ADs can be issued against any of these.',
      'Determine applicability carefully: each AD specifies affected serial numbers, part numbers, or configuration criteria — an AD may apply to only certain serial number ranges within a model.',
      'Understand compliance requirements: ADs specify what action must be taken, when it must be completed (hours, cycles, calendar time, or next inspection), and whether it is a one-time action or recurring.',
      'Check for superseded ADs: when a new AD supersedes an old one, the new AD may change the compliance requirements — verify you are working to the most current version.',
      'Document AD compliance in the aircraft records: include the AD number, revision, compliance date, method of compliance, and who performed the work.'
    ],
    pro_tips: [
      'Search for ADs by appliance part number in addition to aircraft model — an AD against a specific transponder model applies to every aircraft that has it installed, regardless of the aircraft type.',
      'When reviewing AD compliance status for an aircraft, verify that recurring ADs are current — a one-time AD that was complied with 10 years ago does not need to be repeated, but a recurring AD must be re-accomplished at each specified interval.',
      'Subscribe to the FAA AD email notification service for the aircraft types and appliances you work on — this ensures you are aware of new ADs as soon as they are issued.'
    ],
    references: [
      '14 CFR 39 — Airworthiness Directives (legal authority and compliance requirements)',
      '14 CFR 91.403 — General (owner/operator responsibility for AD compliance)',
      'FAA Regulatory and Guidance Library — rgl.faa.gov (AD search tool)',
      'AC 39-7D — Airworthiness Directives'
    ],
  },
  '8-08': {
    prep_topics: ['Who can return to service', 'Part 145 authority', 'IA authority', 'Limitations'],
    evaluator_watch: ['Understands authority levels', 'Knows Part 145 scope', 'Knows when IA is required'],
    common_errors: ['Confusing A&P and IA authority', 'Not understanding Part 145 scope limitations'],
    overview: 'Return-to-service authority determines who can sign off completed maintenance and approve the aircraft for flight. Different levels of work require different levels of authority. An A&P mechanic can return aircraft to service after most maintenance, but major repairs and alterations on most aircraft require an Inspection Authorization (IA). Part 145 repair stations have specific scopes that define their authority. Understanding these authority levels prevents unauthorized return-to-service signatures.',
    study_guide: [
      'A&P mechanics (14 CFR Part 65) can perform and return to service most maintenance, preventive maintenance, and minor repairs and alterations on aircraft they are rated for.',
      'Inspection Authorization (IA) holders can approve aircraft for return to service after annual inspections, major repairs, and major alterations — this authority is beyond what an A&P alone can do.',
      'Part 145 repair stations have a specific operations specification (OpSpec) that defines their scope: what types of work they can perform and what articles they can return to service.',
      'Part 145 repairmen work under the authority of the repair station, not their own certificate — they can only perform work within the repair station scope.',
      'Know the limitations: an A&P cannot perform an annual inspection without an IA, a Part 145 station cannot work outside its OpSpec scope, and no one can return an aircraft to service using non-approved data.'
    ],
    pro_tips: [
      'When in doubt about your authority to sign off a particular piece of work, consult with your IA or the repair station quality manager before signing — signing outside your authority is a certificate action risk.',
      'Part 145 scope limitations are specific: a repair station authorized for avionics maintenance may not be authorized for structural repair, and vice versa — verify the scope covers the specific work.',
      'Understanding return-to-service authority is not just about who can sign — it is about ensuring the work was performed using approved data, proper techniques, and adequate testing before the signature is applied.'
    ],
    references: [
      '14 CFR 43.3 — Persons Authorized to Perform Maintenance',
      '14 CFR 43.7 — Persons Authorized to Approve Aircraft, Airframes, Aircraft Engines, Propellers, Appliances, or Component Parts for Return to Service',
      '14 CFR Part 65 — Certification: Airmen Other Than Flight Crewmembers (A&P and IA)',
      '14 CFR Part 145 — Repair Stations'
    ],
  },
}
