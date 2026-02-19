// Rich prep content for Categories 1-2
// Pitot-Static & Air Data Systems, Surveillance Systems

export const PREP_CONTENT_CAT1_2: Record<string, {
  overview: string
  study_guide: string[]
  pro_tips: string[]
  references: string[]
}> = {
  '1-01': {
    overview:
      'Connecting pitot-static test equipment is the foundation of every air data system check, and doing it without introducing leaks is critical because even a tiny leak will invalidate every subsequent test. The technician must select the correct adapter for the aircraft static ports and pitot probe, verify thread compatibility, and make each connection while the system is unpressurized. Understanding the specific port configurations for different aircraft types — flush-mount static ports versus protruding fittings, for example — determines which adapter kit components you will use and how the seal is achieved.',
    study_guide: [
      'Always identify the aircraft static port type before selecting adapters. Flush-mount static ports typically require suction-cup style adapters with a pliable seal, while threaded or protruding fittings use screw-on adapters. Using the wrong adapter is the most common cause of connection leaks.',
      'Ensure the system is completely at ambient pressure before making or breaking any connection. Residual pressure or vacuum in the lines can blow adapters off or draw contaminants into the system. Open the drain valves or alternate static source briefly to equalize.',
      'Apply a thin film of silicone-based sealant or use the O-rings provided with the adapter kit to achieve a proper seal. Never use petroleum-based lubricants, which can degrade rubber seals and contaminate the system. Cross-threading is the second most common source of leaks — start all fittings by hand.',
      'Cap or plug all unused ports during testing. An open alternate static port, drain valve, or unused pitot drain will cause immediate and confusing leak indications that waste diagnostic time.',
    ],
    pro_tips: [
      'Keep a logbook of which adapter set works for each aircraft type in your hangar. It saves time on repeat visits and prevents fumbling through an entire adapter kit.',
      'Before connecting to the aircraft, perform a quick self-leak-check on your test equipment by capping the output hoses and pumping to altitude. If your own equipment leaks, nothing you measure on the aircraft will be valid.',
      'Warm your adapter O-rings in your hands before fitting them in cold weather. Cold rubber seals are stiff and much more likely to leak or fail to seat properly.',
    ],
    references: [
      '14 CFR Part 43, Appendix E — Altimeter System Test and Inspection',
      'AC 43.13-1B Chapter 12 — Instrument Systems',
      'Barfield DPS-450/DPS-500 Operating Manual (or equivalent test set manual)',
      'Aircraft-specific maintenance manual, pitot-static system section',
    ],
  },
  '1-02': {
    overview:
      'The static system leak test per Part 43 Appendix E is a required inspection that verifies the integrity of the entire static pressure system from the static ports through all plumbing to each connected instrument. A leaking static system directly affects altimeter accuracy, which is a safety-of-flight issue — especially in RVSM airspace where vertical separation is only 1,000 feet. The test involves evacuating the static system to a simulated altitude and monitoring for pressure loss over a timed interval.',
    study_guide: [
      'Part 43 Appendix E specifies that for unpressurized aircraft, the static system must be evacuated to approximately 1,000 feet above the airfield elevation and must not leak more than 100 feet in one minute. For pressurized aircraft, the test altitude is the maximum differential pressure altitude and the allowable leak rate is tighter — typically 100 feet in one minute as well, but some aircraft have manufacturer-specified tolerances that are more stringent.',
      'Allow the system to stabilize for at least one minute after reaching the test altitude before starting the timed leak check. Incomplete stabilization is the most common reason technicians get false leak readings. Temperature changes in the tubing and instruments cause transient pressure drift that is not a true leak.',
      'During the timed test period, do not pump or adjust the test set. Any input during the measurement window invalidates the test. Simply observe the altitude indication and record the drift over the specified time interval.',
      'If the system fails, begin systematic isolation by clamping off sections of the static plumbing to identify which segment contains the leak. Always retest the complete system after any repair to confirm the fix did not introduce a new problem.',
    ],
    pro_tips: [
      'Temperature matters more than most techs realize. A static system tested in a cold hangar and then moved into sunlight can show apparent leaks due to thermal expansion of trapped air. Try to test in a stable temperature environment.',
      'If you are getting an intermittent marginal leak, lightly tap the static lines and fittings while the system is under vacuum. Vibration can reveal a connection that seals under static conditions but leaks during flight.',
    ],
    references: [
      '14 CFR Part 43, Appendix E, paragraph (a) — Static system test',
      '14 CFR 91.411 — Altimeter system and altitude reporting equipment tests and inspections',
      'AC 43-6A — Altitude Reporting Equipment and Transponder System Maintenance and Inspection Practices',
    ],
  },
  '1-03': {
    overview:
      'The pitot system operational check verifies that the pitot tube, plumbing, and connected airspeed indicator respond correctly to applied ram air pressure. Unlike the static system which measures ambient pressure, the pitot system measures dynamic pressure — the difference between ram air and static pressure — which the airspeed indicator converts to indicated airspeed. A blocked or leaking pitot system gives the pilot unreliable airspeed, which has been a causal factor in multiple fatal accidents.',
    study_guide: [
      'Apply pitot pressure slowly and smoothly using calibrated test equipment. Rapid pressure application can over-range the airspeed indicator mechanism, bending the Bourdon tube or diaphragm and permanently damaging the instrument. Most test sets have a fine-adjust valve specifically for this purpose.',
      'Verify the airspeed indicator reads correctly at multiple points across its range. Part 43 Appendix E does not specify exact pitot test points the way it does for altimeters, but good practice is to check at low speed (near the bottom of the green arc), cruise speed, and Vne or high-speed range to confirm linearity across the full scale.',
      'Check for leaks by stabilizing at a mid-range airspeed and observing for any drift downward over 60 seconds. A pitot system leak will show as a gradually decreasing airspeed indication. Unlike static leaks, pitot leaks cause the airspeed to read lower than actual.',
      'If the aircraft has a pitot-static computer or air data computer instead of mechanical instruments, verify that the digital outputs correspond to the applied pressure values using the ADC maintenance test mode or by monitoring ARINC 429 output labels.',
    ],
    pro_tips: [
      'Always check the pitot drain hole is clear before testing. A clogged drain can trap moisture and give erratic readings, and it will also affect leak test results since the drain is a designed opening that should be sealed during testing.',
      'On aircraft with dual pitot systems (captain and first officer), test each side independently and compare readings. A discrepancy between sides reveals a problem even if both are individually within tolerance.',
    ],
    references: [
      '14 CFR Part 43, Appendix E',
      'AC 43.13-1B, Section 12 — Instrument Systems',
      'Aircraft-specific maintenance manual, pitot system section',
    ],
  },
  '1-04': {
    overview:
      'Testing the altimeter at required points per Part 43 Appendix E is a precision measurement task that verifies the altimeter reads within specified tolerances at defined altitude increments. The altimeter is the single most critical instrument for vertical separation of air traffic, and its accuracy at every point in the flight envelope must be confirmed. This test checks both the instrument scale error (the difference between applied and indicated altitude) and the overall system response from static port through plumbing to instrument display.',
    study_guide: [
      'Part 43 Appendix E requires altimeter testing at a minimum of the ground level altitude, then at 1,000-foot increments up to the aircraft maximum operating altitude or the highest altitude to be flown. At each test point, the altimeter must read within the tolerances specified in the appendix — typically plus or minus 20 feet at sea level, increasing to plus or minus 80 feet at higher altitudes.',
      'Set the altimeter barometric setting (Kollsman window) to 29.92 inches Hg before beginning the scale error test. All test points are referenced to standard pressure altitude. Record the exact reading at each increment and note whether the error is positive or negative, because the sign and trend of the error matter for determining if the altimeter mechanism is within tolerance.',
      'Test both increasing and decreasing altitude to check for hysteresis — the tendency of the mechanism to read differently depending on the direction of pressure change. Excessive hysteresis indicates worn or fatigued components in the altimeter aneroid capsule assembly.',
      'For encoding altimeters and altitude encoders, verify that the digitized altitude output (Gillham code or serial altitude) agrees with the analog display at each test point. Correlation between the display and the encoded output is a separate requirement.',
    ],
    pro_tips: [
      'Plot the scale error on a graph as you go. A smooth, gradually increasing error curve is normal. Any sudden jumps or reversals in the error trend indicate a mechanical problem in the altimeter even if individual points are within tolerance.',
      'If the altimeter barely passes at one or two points, mention it in the documentation. An altimeter at the edge of tolerance will likely fail next time, and the operator should plan for overhaul or replacement.',
    ],
    references: [
      '14 CFR Part 43, Appendix E, paragraph (b) — Altimeter test',
      '14 CFR 91.411',
      'TSO-C10b — Altimeters, Pressure Actuated (or current revision)',
      'AC 43-6A',
    ],
  },
  '1-05': {
    overview:
      'Altitude encoder correlation verifies that the digitized altitude output sent to the transponder matches the altimeter display within 125 feet. This is what ATC sees on their radar screen as your Mode C altitude readout. If the encoder output does not correlate with the altimeter, ATC will see a different altitude than what the pilot is reading, which creates a direct conflict hazard in the traffic separation system. This check must be performed at multiple altitudes to catch non-linear encoder errors.',
    study_guide: [
      'The 125-foot correlation tolerance comes from the combination of allowable errors in the altimeter and the encoder. The altimeter has its own scale error tolerance, and the encoder has a quantization step of 100 feet (Gillham code outputs in 100-foot increments). The 125-foot total correlation window accounts for both sources of error, so an encoder that is consistently 120 feet off from the altimeter is technically passing but warrants attention.',
      'Check correlation at a minimum of three altitudes spread across the operating range — low, mid, and high. Encoders can develop non-linear errors where they track well at low altitudes but diverge at higher altitudes due to mechanical wear or electrical drift in the encoding mechanism.',
      'The transponder test set or ADS-B test set will display the altitude the transponder is reporting. Compare this directly to the altimeter reading at each test point. Both the altimeter and transponder must be connected to the same static system during this test.',
      'Blind encoders (those without a display) are tested by reading the Gillham code output or the serial altitude data on the transponder test set while simultaneously reading the altimeter on the panel. If the aircraft uses a digitally encoded altimeter with integrated encoding, the correlation is checked by comparing the analog display to the digital serial output.',
    ],
    pro_tips: [
      'If the encoder fails correlation at one altitude but passes at others, suspect a stuck or intermittent bit in the Gillham code. A single stuck bit causes a predictable, repeatable error at specific altitudes. Learn the Gillham code weighting to quickly identify which bit is the problem.',
      'When testing older aircraft with separate blind encoders, ensure both the encoder and the altimeter are connected to the same static source. Some installations have the encoder tapped into a different static line, and differential leaks between the two lines will show as correlation errors.',
    ],
    references: [
      '14 CFR Part 43, Appendix E',
      '14 CFR 91.217 — Mode C transponder requirements',
      'TSO-C88a — Automatic Pressure Altitude Digitizers',
      'AC 43-6A',
    ],
  },
  '1-06': {
    overview:
      'Testing pitot heat operation and current draw verifies that the heating element in the pitot probe will prevent ice accumulation during flight in icing conditions. Pitot icing has caused multiple fatal accidents by rendering the airspeed indicator inoperative. The test confirms the heating element is functional, draws the correct current indicating proper element resistance, and that any associated timer or cycling relay operates correctly to manage power to the heater.',
    study_guide: [
      'Measure the current draw of the pitot heater using a clamp-on ammeter around the power supply wire. Compare the measured current to the aircraft maintenance manual specification. A heater drawing significantly less current than specified has a partially failed element, while excessive current draw may indicate a short within the element. Typical pitot heater current draws range from 3 to 10 amps depending on the probe type.',
      'Verify heat output by carefully touching the pitot probe after a few seconds of operation — it should become warm to hot very quickly. On the ground without airflow, the probe can reach temperatures that cause burns within 30 to 60 seconds, so use caution and do not leave the heater energized for extended periods without airflow across the probe.',
      'If the aircraft has a pitot heat cycling timer or relay, verify it cycles on and off at the correct intervals. Some systems use a duty cycle to reduce power consumption and prevent overheating on the ground. Check that the timer resets properly and that the relay contacts are not welded or sticking.',
      'For dual-element pitot probes, test each element independently. It is possible for one element to fail while the other continues to operate, giving the appearance of normal operation but reducing the probe heat capacity below what is needed to prevent ice in severe conditions.',
    ],
    pro_tips: [
      'If the current draw is low but the heater still gets warm, suspect a high-resistance connection in the power feed wire or ground, not necessarily a bad element. Check the connector pins and ground stud at the probe before condemning the heater.',
      'In cold weather, take your current measurement quickly after energizing the heater. Element resistance changes with temperature — the cold resistance will be lower and the initial current higher. The maintenance manual spec is usually given for a stabilized warm condition.',
    ],
    references: [
      'Aircraft-specific maintenance manual, pitot heat system',
      'AC 91-74B — Pilot Guide: Flight In Icing Conditions',
      'TSO-C16a — Electrically Heated Pitot and Pitot-Static Tubes',
    ],
  },
  '1-07': {
    overview:
      'The altimeter case leak test at 18,000 feet verifies the integrity of the altimeter instrument case at the altitude corresponding to the standard transition altitude. At flight levels above 18,000 feet, all aircraft operate on a standard barometric setting of 29.92 inches Hg, so altimeter accuracy at this altitude is essential for flight level separation. A case leak means outside air is bypassing the static system and entering the instrument through the case, introducing error that is independent of the static system plumbing. This is a separate and distinct test from the static system leak test.',
    study_guide: [
      'The case leak test evaluates the altimeter instrument itself, not the static plumbing. Apply vacuum through the static system to bring the altimeter to 18,000 feet, then seal off the static input at the instrument and monitor the indicated altitude. Case leak is measured as the drift in feet per minute caused by air entering the case through seals, glass, or fittings.',
      'The allowable case leak rate for most altimeters is plus or minus 100 feet per minute at 18,000 feet. Note that this tolerance is for the case leak alone — it is separate from and in addition to any static system leak rate. If the static system already has a marginal leak, the combined effect of static leak plus case leak may cause the altimeter to fail the overall system test even though each passes individually.',
      'Analog altimeters with glass crystals and mechanical seals are more susceptible to case leaks than modern digital units. Over time, the sealant around the glass crystal dries out and cracks, or the case back seal hardens. These are overhaulable items, not field-repairable.',
      'Be careful to distinguish case leak from scale error at 18,000 feet. Scale error is the difference between applied and indicated altitude at a stable point. Case leak is the rate of change after the static input has been sealed. They are measured differently and have different tolerances.',
    ],
    pro_tips: [
      'If an altimeter passes the case leak test but the readings are unstable or oscillating, the aneroid capsule may be fatigued. This is a separate failure mode that technically passes the leak test but indicates an instrument that should be overhauled.',
      'Mark the exact time you seal the static input on your test worksheet. Case leak calculations are time-dependent, and sloppy timing leads to inaccurate leak rate numbers.',
    ],
    references: [
      '14 CFR Part 43, Appendix E, paragraph (b)(3) — Case leak test',
      'TSO-C10b — Altimeters, Pressure Actuated',
      'AC 43-6A',
    ],
  },
  '1-08': {
    overview:
      'Isolating and repairing a static system leak requires a systematic, methodical approach to identify which segment of the static plumbing is leaking and then make an airworthy repair. The static system can be extensive — running from the static ports on the fuselage through multiple tee fittings, selector valves, drain traps, and instrument connections. A shotgun approach of tightening everything wastes time and often fails to find the actual leak. The goal is to segment the system, test each segment, pinpoint the failure, and repair it with approved methods.',
    study_guide: [
      'Begin by reviewing the static system schematic for the aircraft to understand the routing, branches, and connection points. Identify every tee, union, instrument connection, alternate static valve, and drain valve in the system. Each of these is a potential leak point, and you need to know where they all are before you can systematically isolate them.',
      'Use a pinch-off clamp or section valve to divide the system into segments. Pressurize or evacuate one segment at a time and perform a leak test on that segment alone. Start at the static port and work inboard, or start at the instruments and work outboard. Either direction works as long as you are consistent and systematic.',
      'Common leak sources include cracked or hardened static port sealant, loose B-nut connections at instrument fittings, cracked plastic tubing (especially near bends or clamp points), failed alternate static source valves, and corroded or cracked selector valves. On older aircraft, the rubber hose sections at instrument connections are a frequent failure point.',
      'All repairs must use approved materials. Replacement tubing must be the same type and specification as the original. Flare fittings must be properly formed, and B-nuts tightened to the correct torque. After repair, retest the entire static system per Part 43 Appendix E before returning the aircraft to service.',
    ],
    pro_tips: [
      'Soapy water or leak detection fluid applied to suspect fittings while the system is under slight positive pressure can help pinpoint the exact leak location. Watch for tiny bubbles forming at fittings and connections.',
      'On pressurized aircraft, remember that the static system is also exposed to cabin pressure differential. A leak that is marginal on the ground may worsen at altitude when cabin pressure pushes against the static line seals. If you find a marginal fitting, repair it even if it barely passes the ground test.',
      'Document exactly where you found the leak and what you did to fix it. Future technicians troubleshooting a recurrence will benefit enormously from knowing the history.',
    ],
    references: [
      '14 CFR Part 43, Appendix E',
      'AC 43.13-1B, Chapter 12 — Instrument Systems',
      'Aircraft-specific maintenance manual, static system plumbing',
      'AC 43-6A',
    ],
  },
  '1-09': {
    overview:
      'RVSM (Reduced Vertical Separation Minimum) certification testing is a more stringent version of the standard altimeter system test, required for aircraft operating between FL290 and FL410 where vertical separation is reduced from 2,000 feet to 1,000 feet. The tighter separation demands tighter altimeter accuracy, so RVSM testing imposes more demanding tolerances on altimeter scale error, static system leak rate, and system repeatability. The testing must be performed using approved data — either from the OEM or an STC holder — and the aircraft must have an LOA (Letter of Authorization) or OpSpec to operate in RVSM airspace.',
    study_guide: [
      'RVSM tolerances are significantly tighter than standard Part 43 Appendix E tolerances. Typical RVSM altimeter scale error tolerances are plus or minus 30 feet at sea level through plus or minus 80 feet at high altitude, compared to the broader tolerances in Appendix E. Static system leak rates must generally be less than 100 feet in one minute, and many RVSM programs require less than 60 feet per minute. Always use the specific tolerances from the approved RVSM data package for the aircraft.',
      'RVSM aircraft require two independent altimetry systems (primary and standby or captain and first officer), and each must be tested separately. The correlation between the two systems is also tested — both altimeters must agree within specified limits when connected to their respective static systems. The standby altimeter may have different tolerances depending on the approved data.',
      'RVSM testing also evaluates static source error (SSE), which is the error introduced by the airflow around the aircraft affecting the static port reading. SSE data is usually provided by the aircraft manufacturer and is applied as a correction factor. The test procedure accounts for SSE at different altitudes and Mach numbers.',
      'Complete documentation for RVSM testing includes all individual test point data, the approved data package reference (STC or OEM document number), correlation data between altimetry systems, and a compliance statement that the aircraft meets the RVSM height-keeping performance requirements. This documentation supports the operator LOA application or renewal.',
    ],
    pro_tips: [
      'If an aircraft barely passes RVSM tolerances, advise the operator that it may fail on the next test cycle. RVSM test failures ground the aircraft from flight levels above FL290 until corrected, which is operationally very disruptive for Part 91 and Part 135 operators.',
      'Keep a copy of every RVSM-approved data package you use. Approved data packages get revised, and you need to verify you are using the current revision before each test.',
    ],
    references: [
      '14 CFR 91.180 — Operations within RVSM airspace',
      '14 CFR Part 43, Appendix E',
      'AC 91-85 — Authorization of Aircraft and Operators for Flight in RVSM Airspace',
      'FAA Order 8900.1, Volume 4, Chapter 12 — RVSM',
      'Aircraft-specific RVSM approved data (OEM or STC)',
    ],
  },
  '1-10': {
    overview:
      'Completing the 91.411 documentation with all required elements is the legal record that the altimeter system and altitude reporting equipment have been tested and found within tolerance. Without proper documentation, the test is essentially worthless — the aircraft cannot legally operate in controlled airspace under IFR regardless of the actual condition of the instruments. The logbook entry must contain specific elements mandated by regulation, and missing any one of them can be flagged during an FAA ramp check or audit.',
    study_guide: [
      'The maintenance record entry for a 91.411 inspection must include: the date of the test, the aircraft make, model, and registration, a description of the work performed (referencing the specific tests conducted per Part 43 Appendix E), the test data or a reference to where the data is recorded, the signature and certificate number of the person approving the return to service, and a statement that the altimeter system and altitude reporting equipment meet the requirements of Part 43 Appendix E.',
      'Test data should include the actual readings at each test point, the tolerance at each point, and a pass/fail determination for each measurement. Many repair stations use standardized test forms that capture all data points and are referenced in the logbook entry. The test data must be retained with the maintenance records.',
      'The approval for return to service statement must reference 14 CFR 43.9 (for certificated mechanics) or 14 CFR 145.163 (for repair stations). The statement must affirm that the work was performed in accordance with the applicable requirements and that the aircraft is approved for return to service. Part 145 repair stations must also reference their operations specifications.',
      'The 91.411 inspection is required every 24 calendar months. The due date is calculated from the last test date, not from when the aircraft was returned to the operator. Ensure the test date in the logbook is the actual date the test was performed, not the date the paperwork was completed.',
    ],
    pro_tips: [
      'Create a documentation checklist specific to your repair station that includes every required element. Review the checklist before closing out any 91.411 job. An incomplete entry that gets caught during an FAA audit reflects poorly on the entire shop.',
      'Record the serial numbers of the altimeter, encoder, and any air data computers tested. While not always explicitly required, this information is invaluable if a question arises later about which specific instruments were in the aircraft at the time of the test.',
    ],
    references: [
      '14 CFR 91.411 — Altimeter system and altitude reporting equipment tests and inspections',
      '14 CFR 43.9 — Content, form, and disposition of maintenance records',
      '14 CFR 43.11 — Content, form, and disposition of records for inspections',
      '14 CFR 145.163 — Maintenance recordkeeping (Part 145 repair stations)',
      '14 CFR Part 43, Appendix E',
    ],
  },
  '2-01': {
    overview:
      'The transponder ground test per 14 CFR 91.413 verifies that the transponder operates within specified parameters for reply frequency, power output, receiver sensitivity, suppression, and Mode S data link functions. This test is required every 24 calendar months and must be performed by a certificated repair station, holder of a continuous airworthiness maintenance program, or the manufacturer. A transponder that fails to meet these specifications can cause missed interrogations, incorrect altitude reporting, and degraded ATC surveillance.',
    study_guide: [
      'Part 43 Appendix F specifies the transponder test parameters: reply frequency must be 1090 MHz plus or minus 3 MHz, transmitter power output must be within the TSO limits for the installed unit, receiver sensitivity must detect interrogations at or below the minimum trigger level (MTL), and the suppression function must work properly to prevent interference when the aircraft has multiple transponders.',
      'Mode S transponders require additional testing beyond Mode A/C. The Mode S address (24-bit ICAO code) must be verified correct for the aircraft registration. Mode S data link functions, including short and extended squitter, must be tested. The diversity operation (top and bottom antenna switching) must be confirmed functional if the installation uses antenna diversity.',
      'Test all reply codes: Mode A (identity), Mode C (altitude), and for Mode S units, the all-call reply, squitter transmission, and any installed data link capabilities such as EHS (Enhanced Surveillance) registers. Verify that the SPI (Special Position Identification) pulse is generated when the IDENT button is pressed.',
      'The transponder test set simulates an ATC interrogation and analyzes the transponder replies. Familiarize yourself with the specific test set used by your shop — the Aeroflex/IFR 6000, Viavi/Aeroflex IFR 6000, or equivalent — and understand how to interpret the measured parameters against the tolerances in Part 43 Appendix F.',
    ],
    pro_tips: [
      'Before blaming the transponder for weak replies, check the antenna and coaxial cable. Measure the cable loss and antenna VSWR. More than half of transponder reply power problems originate in the antenna system, not the transponder itself.',
      'When testing Mode S transponders, verify the ICAO 24-bit address matches the current aircraft registration. Address mismatches cause ATC correlation problems and ADS-B non-compliance. If the aircraft was re-registered or the transponder was swapped from another aircraft, the address may need reprogramming.',
    ],
    references: [
      '14 CFR 91.413 — ATC transponder tests and inspections',
      '14 CFR Part 43, Appendix F — ATC Transponder Tests and Inspections',
      'TSO-C112 (Mode S) / TSO-C74c (Mode A/C) — Air Traffic Control Radar Beacon System Airborne Equipment',
      'AC 43-6A',
    ],
  },
  '2-02': {
    overview:
      'Verifying ADS-B Out operation per 14 CFR 91.227 confirms that the aircraft is broadcasting the correct position, velocity, identification, and integrity information required for operation in ADS-B rule airspace. Since January 1, 2020, ADS-B Out has been mandatory in most controlled airspace in the United States. The verification goes beyond a simple transponder test — it specifically evaluates the content and quality of the ADS-B broadcast message, including the position source, navigation integrity category, and other performance parameters that ATC and other aircraft depend on for traffic separation.',
    study_guide: [
      '14 CFR 91.227 specifies the minimum performance requirements for ADS-B Out equipment. The system must broadcast position with a Navigation Accuracy Category for Position (NACp) of 8 or better, which corresponds to a horizontal position accuracy of less than 92.6 meters. It must also broadcast velocity, pressure altitude, the ICAO 24-bit address, the emitter category, and a valid emergency/priority code capability.',
      'ADS-B Out operates on 1090 MHz Extended Squitter (1090ES) for aircraft operating above 18,000 feet and can use either 1090ES or 978 MHz UAT for aircraft operating below 18,000 feet. Verify which link the installed equipment uses and test accordingly. Dual-link installations must have both links tested.',
      'Use an ADS-B test set or an ADS-B ground station monitoring tool to verify the content of the ADS-B Out broadcast. Check that the transmitted ICAO address matches the aircraft registration, the emitter category code is correct for the aircraft type, the NIC (Navigation Integrity Category) and NACp values meet minimums, and the SIL (Source Integrity Level) is appropriate for the installed GPS source.',
      'The position source for ADS-B must meet TSO-C145a/C146a (WAAS GPS) or TSO-C196 (GPS with SBAS) standards. Verify that the installed GPS receiver is an approved ADS-B position source by checking its TSO marking. A non-compliant GPS source will produce ADS-B transmissions that do not meet the 91.227 performance requirements even though they appear to work.',
    ],
    pro_tips: [
      'Use the FAA PAPR (Public ADS-B Performance Report) tool to see how ATC is actually receiving the aircraft ADS-B transmissions. The PAPR report shows real-world compliance status and can reveal intermittent problems that a one-time ground test might miss.',
      'If the ADS-B system is broadcasting but the NACp or NIC values are too low, the problem is almost always in the GPS source, not the transponder. Check the GPS antenna installation, cable loss, and receiver configuration before troubleshooting the transponder.',
    ],
    references: [
      '14 CFR 91.225 — ADS-B Out equipment and use',
      '14 CFR 91.227 — ADS-B Out equipment performance requirements',
      'AC 20-165B — Airworthiness Approval of ADS-B Out Systems',
      'AC 90-114A — ADS-B Operations',
      'TSO-C166b — Extended Squitter ADS-B and TIS-B Equipment Operating on 1090 MHz',
    ],
  },
  '2-03': {
    overview:
      'Testing the ADS-B position source and verifying the NACp (Navigation Accuracy Category for Position) value ensures that the GPS receiver feeding the ADS-B transponder meets the accuracy and integrity requirements mandated by 14 CFR 91.227. The NACp value is not just a number — it is a real-time declaration by the GPS receiver of how accurate its current position solution is. If the NACp drops below the minimum of 8, the ADS-B system is non-compliant, and ATC may lose the ability to use the aircraft position for separation services.',
    study_guide: [
      'NACp is reported as a value from 0 to 11, with higher numbers indicating greater position accuracy. A NACp of 8 means the position is accurate to within 92.6 meters (approximately 0.05 nautical miles). For ADS-B compliance under 91.227, NACp must be 8 or higher during flight. Values below 8 indicate degraded GPS performance that does not meet the ADS-B standard.',
      'The NACp value is determined by the GPS receiver based on its current satellite geometry, signal quality, and integrity monitoring. Factors that reduce NACp include poor satellite geometry (high PDOP), signal interference, antenna obstructions, degraded WAAS corrections, or GPS receiver faults. During ground testing, NACp may be lower than in flight due to multipath reflections from hangars and buildings.',
      'Test the position source by verifying the GPS receiver acquires satellites, achieves a 3D position fix, and reports a NACp of 8 or higher. Use the GPS receiver built-in test or maintenance page to view satellite tracking status, HDOP/PDOP values, and WAAS correction status. Then verify that the NACp value transmitted in the ADS-B message matches what the GPS receiver is reporting internally.',
      'Do not confuse NACp with NIC (Navigation Integrity Category) or SIL (Source Integrity Level). NACp is about accuracy — how close the reported position is to the true position. NIC is about integrity containment — the probability that the position error exceeds the containment radius without alerting. SIL is about the probability of the integrity function itself failing. All three are reported in the ADS-B message but serve different purposes.',
    ],
    pro_tips: [
      'If you consistently get NACp below 8 during ground testing near hangars, try moving the aircraft to an open ramp area with clear sky view. Metal buildings create GPS multipath that degrades accuracy. Document where the test was performed.',
      'When troubleshooting low NACp, check the GPS antenna cable for excessive loss first. A cable with 3 dB of loss effectively cuts the received signal power in half, which directly degrades the GPS position accuracy and integrity metrics.',
    ],
    references: [
      '14 CFR 91.227',
      'AC 20-165B — Airworthiness Approval of ADS-B Out Systems',
      'DO-260B — Minimum Operational Performance Standards for 1090 MHz ADS-B',
      'TSO-C145a/C146a — WAAS GPS Equipment',
      'TSO-C196 — GPS with SBAS',
    ],
  },
  '2-04': {
    overview:
      'Troubleshooting an ADS-B failure requires a systematic approach that traces the signal path from the GPS position source through the data interface to the transponder and out through the antenna. ADS-B is an integrated system, and a failure could originate in the GPS receiver, the data bus connection between the GPS and transponder, the transponder itself, or the antenna system. Jumping to a conclusion without methodical isolation leads to unnecessary component swaps, wasted time, and frustrated operators.',
    study_guide: [
      'Start with the reported symptom and work backward through the system. If ATC reports no ADS-B target, verify the transponder is transmitting by performing a basic transponder ground test. If the transponder replies are normal but ADS-B is absent, the problem is likely in the GPS position source or the data interface between the GPS and transponder.',
      'Check the GPS receiver status first. Verify it has a valid position fix with adequate satellite tracking. If the GPS is not providing position data, the transponder has nothing to broadcast for ADS-B. Common GPS failures include antenna problems, cable faults, receiver software issues, and expired databases that affect the RAIM algorithm.',
      'Verify the ARINC 429 or other data bus connection between the GPS receiver and the transponder. Use a bus analyzer if available to confirm that the GPS is sending the required labels (typically ARINC 429 labels 110, 111, and others depending on the installation) and that the transponder is receiving them. A broken or intermittent data bus connection is a common cause of ADS-B failures that is easy to overlook.',
      'Check the FAA PAPR report for the aircraft to see the historical ADS-B performance. The PAPR report may show intermittent compliance issues — periods where NACp drops below 8, ICAO address mismatches, or emitter category errors — that point to the root cause. This is one of the most valuable diagnostic tools available for ADS-B troubleshooting.',
    ],
    pro_tips: [
      'The most common ADS-B failure is not a hardware failure at all — it is a configuration error. Incorrect ICAO address programming, wrong emitter category, or mismatched GPS and transponder configurations cause ADS-B non-compliance without any obvious fault indication in the cockpit.',
      'If you suspect an intermittent GPS problem, leave the aircraft powered up and monitor the GPS status and ADS-B output continuously for 30 minutes or more. Intermittent antenna connection issues or GPS receiver faults may only appear after thermal cycling or vibration during a prolonged power-on period.',
    ],
    references: [
      '14 CFR 91.225 and 91.227',
      'AC 20-165B',
      'FAA PAPR (Public ADS-B Performance Report) — ads-b.faa.gov',
      'Transponder and GPS receiver IPC and maintenance manuals',
    ],
  },
  '2-05': {
    overview:
      'Performing a TCAS (Traffic Collision Avoidance System) operational check verifies that the TCAS unit can track intruder aircraft, generate Traffic Advisories (TAs), and issue Resolution Advisories (RAs) as designed. TCAS is an independent safety net that operates regardless of ATC — it actively interrogates nearby transponders and computes collision threats. A non-functional TCAS leaves the crew without this last line of defense against midair collision. The operational check confirms self-test passage, antenna function, and proper display and aural annunciation.',
    study_guide: [
      'Initiate the TCAS self-test from the cockpit control panel. The self-test exercises the TCAS processor, verifies internal memory and computation, and checks the display interface. Observe that the self-test completes without failure flags and that the TCAS status annunciator shows normal operation after the test. Any self-test failure code should be referenced against the TCAS maintenance manual for diagnosis.',
      'Verify that both the top and bottom TCAS directional antennas are functional. TCAS II uses directional antenna arrays (typically four elements on top and four on the bottom of the fuselage) to determine the bearing to intruder aircraft. If one antenna array is non-functional, TCAS may lose the ability to generate accurate bearing information for traffic display, even though TA and RA advisories can still be computed based on range alone.',
      'Test the TA and RA aural annunciations. A TA generates a "Traffic, Traffic" voice alert, while RAs generate specific climb or descend commands such as "Climb, Climb" or "Descend, Descend." Verify that the audio is routed correctly through the audio panel to the pilot headsets or speakers and that the volume is adequate.',
      'If the aircraft has a TCAS traffic display (either dedicated or integrated into an MFD or EFIS), verify that traffic targets appear correctly during the self-test with the correct symbology — open diamonds for non-threat traffic, solid amber circles for TAs, and solid red squares for RAs. The displayed range and bearing should correspond to the self-test target positions.',
    ],
    pro_tips: [
      'TCAS self-test results can be misleading if the system has degraded antenna performance. The self-test primarily checks the processor and internal circuits. Always verify antenna function separately by checking for normal traffic tracking when the aircraft is on a busy ramp with other transponder-equipped aircraft nearby.',
      'If the TCAS displays traffic but never generates TAs or RAs during the self-test, check the sensitivity level setting. Some TCAS units have a reduced-sensitivity mode for ground operation that suppresses advisories. Ensure the system is in the correct test mode for operational checks.',
    ],
    references: [
      'TSO-C119c — TCAS II with Hybrid Surveillance',
      'RTCA DO-185B — TCAS II MOPS',
      'AC 20-131A — Airworthiness and Operational Approval of TCAS II',
      'Aircraft TCAS maintenance manual',
    ],
  },
  '2-06': {
    overview:
      'Understanding and explaining TCAS operation, including RA coordination between aircraft, is a knowledge-based task that demonstrates the technician comprehends the underlying principles of how TCAS prevents midair collisions. TCAS II is an active system that interrogates transponders on nearby aircraft, tracks their range and closure rate, computes a predicted closest point of approach, and issues coordinated escape maneuvers when a collision threat is detected. The coordination logic between two TCAS-equipped aircraft is what makes the system work — without coordination, both aircraft could maneuver in the same direction, making the situation worse.',
    study_guide: [
      'TCAS operates independently of ATC ground systems by actively interrogating Mode C and Mode S transponders on nearby aircraft. It uses the 1030 MHz interrogation frequency and receives replies on 1090 MHz. From the reply timing, TCAS determines the range to each intruder. From the Mode C altitude report, it determines the relative altitude. By tracking these values over time, TCAS computes the closure rate and time to closest approach.',
      'A Traffic Advisory (TA) is generated when an intruder aircraft reaches approximately 35 seconds from closest approach. The TA alerts the crew to search visually for the traffic and prepare for a possible RA. A Resolution Advisory (RA) is generated at approximately 25 seconds from closest approach and commands a specific vertical maneuver — climb, descend, or maintain current vertical rate — to increase separation.',
      'When two TCAS II-equipped aircraft encounter each other, the RA coordination logic uses Mode S data link to exchange intentions. One aircraft is commanded to climb while the other is commanded to descend. This coordination happens automatically and in real time through the Mode S extended squitter. If the coordination link fails, TCAS defaults to a safe escape maneuver based on the aircraft current vertical rate and position relative to the intruder.',
      'Pilots are required by regulation to follow TCAS RAs, even if they conflict with ATC instructions. The technician should understand that TCAS is the last layer of collision avoidance and its commands take priority. This is why proper TCAS operation and testing are safety-critical maintenance tasks — a TCAS failure removes the final safety net.',
    ],
    pro_tips: [
      'When explaining TCAS to pilots or other technicians, emphasize that TCAS is active surveillance — it sends out interrogations, unlike ADS-B which passively receives broadcasts. This distinction matters because TCAS can detect any transponder-equipped aircraft, even those without ADS-B, while ADS-B In can only see aircraft that have ADS-B Out.',
      'The most common misconception is that TCAS and ADS-B are the same system or that ADS-B replaces TCAS. They are complementary systems with different purposes. TCAS provides collision avoidance with escape commands. ADS-B provides traffic awareness and surveillance. Both are required for different reasons.',
    ],
    references: [
      'RTCA DO-185B — TCAS II MOPS',
      'AC 20-131A — Airworthiness and Operational Approval of TCAS II',
      'TSO-C119c — TCAS II',
      '14 CFR 91.221 — Traffic alert and collision avoidance system equipment and use',
      'FAA InFO 17012 — Reporting of TCAS Resolution Advisories',
    ],
  },
  '2-07': {
    overview:
      'Inspecting transponder and TCAS antenna installations verifies the physical condition, mounting integrity, and installation compliance of the antennas that are essential to the surveillance system. Antenna problems are the most common cause of degraded transponder and TCAS performance — a corroded antenna, damaged cable, or improperly installed mounting can reduce reply power, create pattern distortion, and degrade the TCAS directional bearing accuracy. This inspection covers the antenna element, the mounting hardware, the coaxial cable, and the connector interfaces.',
    study_guide: [
      'Visually inspect the antenna element for physical damage, corrosion, paint contamination, and erosion. Transponder antennas (blade or stub type) are exposed to the airstream and are subject to lightning strikes, hail damage, and erosion from rain and ice particles. Any cracking, delamination, or discoloration of the antenna element warrants further investigation or replacement.',
      'Check the antenna mounting hardware for security, corrosion, and proper torque. The antenna base must be bonded to the aircraft skin with a low-resistance path — typically less than 3 milliohms. Verify that the bonding surface is clean, free of paint or primer under the mounting flange, and that the bonding jumper (if used) is intact. Poor bonding causes elevated VSWR and reduced antenna performance.',
      'Inspect the coaxial cable from the antenna to the transponder or TCAS unit. Look for sharp bends, chafing, moisture intrusion at connectors, and proper support. Measure the cable loss using an antenna analyzer or network analyzer if the equipment is available. Excessive cable loss directly reduces both the transmitted power reaching the antenna and the received signal reaching the transponder.',
      'For TCAS directional antenna arrays, verify that all four antenna elements in each array (top and bottom) are intact and properly connected. A single failed element in the four-element array degrades the bearing accuracy of the TCAS traffic display. Check the array-to-processor cable harness for damage and proper connector seating.',
    ],
    pro_tips: [
      'VSWR measurement is the single most informative antenna system test. A VSWR below 1.5:1 at 1090 MHz indicates a healthy antenna and cable. VSWR above 2:1 warrants investigation — check the connector, cable, and antenna in that order. VSWR above 3:1 means the antenna system is significantly degraded.',
      'On aircraft with belly-mounted transponder antennas, look for evidence of ground handling damage — antenna elements bent by tow bars, ground power cables, or wheel chocks. This kind of damage is common and not always reported by ground crews.',
    ],
    references: [
      'AC 43.13-1B, Chapter 11 — Electrical Systems, antenna installation',
      'AC 20-165B — ADS-B Out Systems',
      'Antenna manufacturer installation manual',
      'Aircraft-specific wiring diagram and antenna installation drawing',
    ],
  },
  '2-08': {
    overview:
      'Completing the 91.413 transponder test documentation with ADS-B compliance is the regulatory record that both the transponder and the ADS-B Out system meet performance requirements. Since ADS-B Out compliance is now mandatory, the 91.413 documentation must go beyond the traditional transponder test parameters to include ADS-B-specific performance data. Missing or incomplete ADS-B documentation can result in the aircraft being flagged as non-compliant during FAA ramp checks or when cross-referenced against the PAPR database.',
    study_guide: [
      'The 91.413 logbook entry must include all elements required by 14 CFR 43.9 plus the specific transponder test results per Part 43 Appendix F. This includes the transponder reply frequency, power output, receiver sensitivity, suppression ratio, Mode S address verification, and all reply code tests. Each measured parameter should be recorded along with the applicable tolerance and a pass/fail determination.',
      'For ADS-B compliance documentation, additionally record: the verification of the ICAO 24-bit address against the aircraft registration, the NACp value achieved during the test, the NIC and SIL values, the emitter category code, and confirmation that the GPS position source meets TSO-C145a/C146a or TSO-C196 requirements. Reference 14 CFR 91.227 as the applicable performance standard.',
      'Document the specific test equipment used, including its model number, serial number, and calibration due date. Both the transponder test set and any ADS-B test equipment must have current calibration. The FAA may request this information during audits, and missing calibration records can invalidate the test.',
      'If the aircraft has both 1090ES and 978 UAT installed, each link must be tested and documented separately. The documentation should clearly state which ADS-B link was tested and the results for each. Many test forms have separate sections for each link.',
    ],
    pro_tips: [
      'Develop a standardized test form for your repair station that has fields for every required transponder and ADS-B parameter. A well-designed form prevents omissions and speeds up documentation. Have the form reviewed by your repair station quality department and keep it current with regulatory changes.',
      'Include the FAA PAPR compliance status in your documentation when possible. Noting that the PAPR report shows the aircraft as compliant provides an additional verification layer and demonstrates thoroughness. Retain a copy of the PAPR report with the test records.',
    ],
    references: [
      '14 CFR 91.413 — ATC transponder tests and inspections',
      '14 CFR 91.227 — ADS-B Out equipment performance requirements',
      '14 CFR Part 43, Appendix F',
      '14 CFR 43.9 — Content, form, and disposition of maintenance records',
      'AC 43-6A',
      'AC 20-165B',
    ],
  },
}
