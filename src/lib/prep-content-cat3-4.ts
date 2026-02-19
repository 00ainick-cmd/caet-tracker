// Rich prep content for Categories 3-4
// Autopilot & Flight Control, FMS & Navigation

export const PREP_CONTENT_CAT3_4: Record<string, {
  overview: string
  study_guide: string[]
  pro_tips: string[]
  references: string[]
}> = {
  '3-01': {
    overview:
      'The autopilot ground check is a structured procedure performed per the aircraft maintenance manual that verifies every axis of servo authority, engagement logic, warning systems, and mode annunciation before the aircraft returns to flight. This task matters because an autopilot malfunction at altitude can cause an uncommanded control input, potentially leading to a loss-of-control event. The technician must understand the specific sequence the manufacturer requires, including power-up self-tests, servo slew checks, and the verification of disconnect warnings, and must confirm that the system passes all steps before signing off the work.',
    study_guide: [
      'Begin by reviewing the specific maintenance manual section for the installed autopilot, because ground check procedures vary significantly between manufacturers such as Garmin, Collins, and Honeywell. Each will specify a unique power-up sequence, self-test acceptance criteria, and servo verification steps.',
      'During the ground check, verify that each servo — pitch, roll, and yaw if installed — drives its respective control surface in the correct direction and at the expected rate. An incorrect servo sense (reversed direction) is a critical safety finding that must be corrected before flight.',
      'Confirm that all warning and annunciation systems activate correctly, including the autopilot disconnect warning tone, the trim failure annunciator, and any flight director bar flags. These warnings are the pilot\'s primary defense against autopilot malfunctions in flight.',
      'Check that the autopilot self-test, often initiated through the control panel or flight display, completes without fault codes. Document any fault codes encountered, as they indicate specific LRU or wiring problems that must be resolved before the ground check can pass.',
    ],
    pro_tips: [
      'Always perform the ground check with the aircraft on jacks or with control locks removed so you can physically observe surface movement. Watching the surfaces move is the only way to confirm correct direction and authority — relying solely on cockpit annunciations is not sufficient.',
      'Keep a copy of the maintenance manual ground check procedure physically in front of you and check off each step as you go. Skipping a step in a 30-step procedure is easy to do from memory, and the one you skip could be the one that catches a real problem.',
    ],
    references: [
      'Aircraft-specific Maintenance Manual — Autopilot Ground Check procedure',
      '14 CFR 43.13 — Performance rules for maintenance',
      'AC 43.13-1B Chapter 11 — Instrument and autopilot systems',
      'Autopilot manufacturer installation manual — Ground test section',
    ],
  },

  '3-02': {
    overview:
      'Testing all autopilot disconnect methods ensures that the pilot can immediately override or disengage the autopilot in any situation, which is a critical safety function. Modern autopilot systems provide multiple disconnect paths: the yoke or stick-mounted disconnect button, control wheel force override (where the pilot physically overpowers the servos), the autopilot panel disengage switch, and in some aircraft, a circuit breaker or trim interrupt switch. Each method must be tested to confirm that the servos release cleanly, the disconnect warning activates, and the autopilot does not attempt to re-engage.',
    study_guide: [
      'The primary disconnect is the yoke-mounted (or sidestick) autopilot disconnect button. When pressed, it must immediately release all servo clutches and produce both a visual annunciation (AP warning light) and an aural warning (disconnect tone or chime). Verify that pressing and releasing the button silences the aural alert.',
      'Control wheel override disconnect is the pilot\'s backup method. Apply force to the control column or wheel sufficient to overpower the servo clutch. The system should sense the override, disengage the autopilot, and trigger the disconnect warning. If the override force is too high, the servo clutch may need adjustment or the bridle cable tension may be incorrect.',
      'Test the panel-mounted disengage switch or button. Some systems also have a go-around button that disengages the autopilot and commands a go-around pitch mode. Each of these paths must annunciate the disconnect and release servo authority.',
      'On aircraft with electric trim, verify that the trim interrupt or cutout switch also disables autopilot trim commands. An autopilot that disengages but continues to drive trim can create an equally dangerous out-of-trim condition.',
    ],
    pro_tips: [
      'During disconnect testing, have someone at the control surfaces to confirm that they actually go free when the disconnect fires. A servo that continues to hold pressure after disconnect is a serious airworthiness issue that may not be obvious from the cockpit alone.',
      'Listen carefully to the disconnect warning tone — it should be unmistakable and distinct from other cockpit warnings. If the tone is weak or muffled, check the warning speaker and its wiring, because a pilot who cannot hear the disconnect warning may not realize the autopilot has failed.',
    ],
    references: [
      '14 CFR 23.1329 / 25.1329 — Automatic pilot system requirements',
      'Aircraft Maintenance Manual — Autopilot disconnect test procedure',
      'AC 23.1329-1 — Autopilot certification guidance',
    ],
  },

  '3-03': {
    overview:
      'The electric trim system works in conjunction with the autopilot to maintain aircraft trim as speed, configuration, and load change during flight. Runaway trim protection is a safety-critical feature that detects an uncommanded or continuous trim input and automatically stops the trim motor before it drives the stabilizer to an extreme position. Testing this system involves verifying normal trim operation in each axis (pitch at minimum, with roll and yaw trim if installed), confirming correct trim direction, and then intentionally triggering the runaway protection circuit to verify it activates within the required time and authority limits.',
    study_guide: [
      'Start by verifying normal electric trim operation: the trim switch on the yoke or panel should move the trim tab or stabilizer in the correct direction, and the trim position indicator should track the movement accurately. Incorrect trim direction is a potentially fatal wiring error and must be caught during this test.',
      'Runaway trim protection typically uses a timer or motion-sensing circuit that detects continuous trim motor operation beyond a preset duration (often 1 to 3 seconds). When triggered, it opens a relay that cuts power to the trim motor. Verify that this cutoff occurs within the time limit specified in the maintenance manual.',
      'After the runaway protection fires, the trim cutout switch on the yoke or panel should also be tested. This switch is the pilot\'s manual backup to stop a runaway trim condition. Confirm that activating it immediately stops all electric trim movement and that releasing it restores normal trim function.',
      'On aircraft with autopilot trim (where the autopilot commands the trim motor to relieve servo load), verify that the autopilot trim commands the correct direction and that the runaway protection circuit also monitors autopilot-commanded trim inputs.',
    ],
    pro_tips: [
      'When testing runaway protection, watch the trim position indicator closely during the test. If the trim travels excessively before the protection fires, the timer circuit may be out of adjustment or a relay may be slow to open. Even a half-second delay matters at high trim rates.',
      'Mark the starting trim position before each test so you can measure how far the trim moved during the runaway test. This gives you a quantitative check against the maintenance manual limits, rather than a subjective judgment that it "seemed about right."',
    ],
    references: [
      '14 CFR 23.677 / 25.677 — Trim system requirements',
      '14 CFR 23.1329(b) — Autopilot trim engagement',
      'Aircraft Maintenance Manual — Electric trim and runaway protection test',
      'Service Bulletin history for trim system — check for applicable modifications',
    ],
  },

  '3-04': {
    overview:
      'Verifying autopilot mode engagement means confirming that each lateral and vertical mode — heading (HDG), altitude hold (ALT), navigation tracking (NAV), and others such as approach (APR) and vertical speed (VS) — engages correctly when selected, annunciates properly on the flight display, and commands the expected aircraft response. This is essential because each mode uses different sensor inputs and control laws: HDG follows the heading bug using the magnetometer or AHRS, ALT holds barometric altitude using the air data computer, and NAV tracks a VOR radial, GPS course, or FMS lateral path. The technician must understand the engagement prerequisites for each mode and verify that transitions between modes occur correctly.',
    study_guide: [
      'Heading mode (HDG) engagement requires a valid heading reference from the AHRS or magnetometer. When engaged, the autopilot should turn the aircraft toward the heading bug. During ground test, verify that the autopilot commands a roll in the correct direction toward the selected heading and that the HDG annunciator illuminates on the flight display.',
      'Altitude hold (ALT) engagement captures and holds the current barometric altitude using air data computer inputs. Verify that ALT hold engages at the current altitude (not at a previously selected altitude) and that the annunciator shows ALT captured. Some systems require the aircraft to be within a specific vertical speed range before ALT will engage.',
      'Navigation mode (NAV) couples the autopilot to a lateral navigation source such as a VOR, GPS, or FMS flight plan. Engagement typically requires a valid navigation source, course deviation within capture limits, and the correct nav source selected on the CDI or HSI. Verify that the system tracks the selected course and that switching between GPS and VOR nav sources updates the autopilot tracking correctly.',
      'Test mode transitions: for example, switching from HDG to NAV, or from VS to ALT capture. The autopilot should transition smoothly without large transients, and the annunciators should update to reflect the active mode. Failed mode transitions are a common squawk that often points to sensor input or data bus issues.',
    ],
    pro_tips: [
      'When verifying NAV mode on the ground, you need a valid navigation signal. Use a VOR ramp test set or ensure the GPS has a valid position fix. Without a valid signal, NAV mode will not engage and you will not be able to complete the test — this is not a fault, it is a normal engagement prerequisite.',
      'Document which modes you tested and the annunciator state for each. If the aircraft comes back with a mode engagement squawk, your documentation will help narrow whether it is a new problem or a recurrence of something that was borderline during your original test.',
    ],
    references: [
      'Aircraft Maintenance Manual — Autopilot mode engagement verification',
      '14 CFR 23.1329 / 25.1329 — Automatic pilot system requirements',
      'Autopilot manufacturer installation manual — Mode logic and engagement criteria',
    ],
  },

  '3-05': {
    overview:
      'Troubleshooting an autopilot that will not engage requires a systematic approach starting with the engagement prerequisites and working through the signal chain to identify the specific fault. Autopilot engagement is gated by multiple conditions: valid sensor inputs (attitude, heading, air data), correct flight configuration (flaps, gear, speed within range), serviceable servos, and in many systems, an initial self-test that must pass. A failure of any single prerequisite will prevent engagement, and the technician must work through each one methodically rather than jumping to component replacement.',
    study_guide: [
      'Start by checking the autopilot self-test. Most systems run a power-up BIT (built-in test) that checks internal processor health, servo driver circuits, and sensor input validity. If the self-test fails, the system will inhibit engagement and typically store a fault code. Retrieve and interpret these codes before proceeding further.',
      'Verify that all prerequisite sensor inputs are valid. The attitude reference (AHRS or vertical gyro) must be providing valid pitch and roll data, the heading reference must be aligned, and the air data computer must be supplying valid airspeed and altitude. An invalid input on any of these will prevent engagement. Check for data bus flags or fail indications on the flight displays.',
      'Check mechanical prerequisites: servo clutches must be able to engage (verify electrical continuity to servo clutch coils and confirm the bridle cables or capstans are not binding), and control surface position sensors must be providing valid feedback. A jammed or disconnected feedback potentiometer will prevent servo engagement as a safety measure.',
      'Review aircraft configuration inputs. Many autopilots will not engage with certain flap positions, gear down, or if the stall warning system is active. Check these discrete inputs at the autopilot computer connector to ensure they are in the correct state for engagement.',
    ],
    pro_tips: [
      'Before you start swapping LRUs, spend five minutes at the autopilot computer connector with a multimeter checking power, ground, and discrete input states. More than half of autopilot no-engage squawks trace back to a missing input signal rather than a failed computer.',
      'Check the aircraft\'s MEL and deferred maintenance log. Sometimes an unrelated system that is MEL\'d or deferred (such as a yaw damper or flight director) provides an interlock input that prevents autopilot engagement. The maintenance manual wiring diagram will show these interlocks.',
    ],
    references: [
      'Aircraft Maintenance Manual — Autopilot troubleshooting',
      'Autopilot manufacturer Component Maintenance Manual (CMM)',
      'Wiring diagram manual — Autopilot system schematic',
      'AC 43.13-1B Chapter 11 — Troubleshooting guidance',
    ],
  },

  '3-06': {
    overview:
      'Autopilot oscillation in one axis — where the aircraft hunts or porpoises in pitch, rolls back and forth in the lateral axis, or yaws rhythmically — indicates a problem in the servo feedback loop for that specific axis. The autopilot is a closed-loop control system: it commands a surface deflection, senses the aircraft response through attitude and rate sensors, and adjusts. If the feedback gain is too high, the sensor signal is noisy, or there is mechanical slop in the servo linkage, the system will overshoot and correct repeatedly, producing oscillation. Troubleshooting requires isolating whether the problem is mechanical (cable tension, servo slop, surface binding) or electronic (sensor noise, gain setting, data bus errors).',
    study_guide: [
      'First, identify which axis is oscillating. Pitch oscillation produces a porpoising motion, roll oscillation produces a wing-rocking or Dutch roll effect, and yaw oscillation produces a fishtailing motion. Each axis has its own servo, feedback sensor, and gain parameters, so isolating the axis focuses your troubleshooting.',
      'Check the mechanical path first. Verify servo cable tension per the rigging section of the maintenance manual, check for play or backlash in the servo capstan and cable system, and confirm that the control surface moves freely without binding. Mechanical slop introduces a dead band that causes the servo to overshoot, creating oscillation that no amount of electronic adjustment will fix.',
      'If the mechanical path checks good, examine the sensor inputs. A noisy attitude gyro, a degraded rate sensor, or an intermittent AHRS signal will cause the autopilot to chase erratic inputs. Monitor the sensor data on the flight display or with a bus analyzer to look for jitter or dropouts on the relevant ARINC 429 labels.',
      'Some autopilot systems have adjustable gain settings for each axis (either through potentiometers on the computer or through software configuration). If gain was recently changed or if a new autopilot computer was installed, the gain may need adjustment per the manufacturer\'s procedure. Never adjust gain without the maintenance manual procedure — incorrect gain can make oscillation worse or mask a real mechanical problem.',
    ],
    pro_tips: [
      'A quick way to distinguish mechanical from electronic oscillation: disconnect the servo from the control surface (if the maintenance manual permits) and run the autopilot. If the servo arm oscillates by itself, the problem is electronic. If it runs smoothly but oscillates when connected to the surface, look for mechanical causes — binding pushrods, cable tension, or bellcrank wear.',
      'When cable tension is borderline, oscillation often appears at altitude where cold temperatures cause cable contraction and increase tension. If the squawk is intermittent and altitude-related, recheck cable tension and consider that it may be at the edge of the tolerance range.',
    ],
    references: [
      'Aircraft Maintenance Manual — Autopilot rigging and servo adjustment',
      'Aircraft Maintenance Manual — Flight control cable tension chart',
      'Autopilot manufacturer troubleshooting guide — Oscillation and hunting',
      'AC 43.13-1B Section 11 — Control system rigging',
    ],
  },

  '3-07': {
    overview:
      'The flight director and the autopilot share the same computational core and use the same navigation and attitude inputs, but they serve fundamentally different purposes. The flight director computes the optimal pitch and roll commands to achieve the selected mode (heading, altitude, nav tracking) and displays them as command bars on the attitude indicator — the pilot then manually flies to center the bars. The autopilot takes those same computed commands and drives the servo actuators to move the control surfaces automatically. Understanding this distinction is critical for technicians because a flight director problem (wrong bar commands) and an autopilot problem (wrong surface movement) can have very different root causes even though they share the same computer.',
    study_guide: [
      'The flight director is a display-only system: it shows the pilot what to do but does not move any control surfaces. The command bars (also called V-bars or crossbars depending on the display format) deflect to show the pilot which direction and how much to pitch and roll. The pilot follows the bars manually. No servos are involved in flight director operation.',
      'The autopilot receives the same pitch and roll commands that drive the flight director bars, but routes them to servo amplifiers that drive the pitch and roll servos. When the autopilot is engaged, the command bars typically center because the autopilot is executing the commands that the bars are displaying. If the bars do not center with autopilot engaged, there may be a servo authority or feedback problem.',
      'Because the flight director and autopilot share the same mode logic and computation, a mode selection error (such as wrong heading bug tracking) will affect both systems identically. However, a problem isolated to one system — such as a FD bar flag with working autopilot — points to a display path issue rather than a computation issue.',
      'In FD-only flight (autopilot disengaged, flight director on), the pilot manually follows the command bars. This mode is commonly used during takeoff, approach, and landing. Technicians must verify that FD-only mode provides correct command guidance independent of autopilot servo function.',
    ],
    pro_tips: [
      'When a pilot reports that the autopilot is not tracking correctly, ask whether the flight director bars were also showing the wrong command. If the bars were correct but the aircraft was not following them, the problem is in the servo path. If the bars themselves were wrong, the problem is upstream in the mode logic or sensor inputs.',
      'During ground checks, you can verify flight director operation independently of the autopilot by engaging the FD without the AP. The command bars should respond to mode selections and heading/altitude changes. This is a useful diagnostic step to separate FD computation from AP servo issues.',
    ],
    references: [
      '14 CFR 23.1329 / 25.1329 — Automatic pilot and flight director requirements',
      'Aircraft Flight Manual — Flight director operating procedures',
      'Autopilot/FD manufacturer installation manual — System description',
    ],
  },

  '3-08': {
    overview:
      'Identifying autopilot system components and understanding signal flow is foundational knowledge for any avionics technician working on flight control systems. A typical autopilot system consists of sensors (AHRS, air data computer, magnetometer, navigation receivers), a flight control computer that processes mode logic and computes commands, servo actuators that drive the control surfaces, feedback sensors that report surface position back to the computer, and annunciator/display systems that show the pilot what the autopilot is doing. The signal flows in a closed loop: sensors provide aircraft state data to the computer, the computer generates control commands, servos execute the commands, and feedback sensors close the loop by reporting the result back to the computer.',
    study_guide: [
      'The sensor suite provides the autopilot computer with aircraft state information. The AHRS (Attitude and Heading Reference System) provides pitch, roll, and heading data. The air data computer provides altitude, airspeed, and vertical speed. Navigation receivers (GPS, VOR, ILS) provide lateral and vertical deviation. All of these inputs typically arrive via ARINC 429 digital data buses.',
      'The flight control computer (also called the autopilot computer or flight guidance computer) is the central processing unit of the system. It receives sensor data, applies the control laws for the selected mode, computes pitch and roll commands, and sends those commands to the servo amplifiers. It also monitors system health and will disconnect the autopilot if it detects a fault.',
      'Servo actuators convert the computer\'s electrical commands into mechanical motion at the control surfaces. Common types include electric motor-driven capstan servos (which use a cable-and-drum arrangement) and electromechanical linear actuators. Each servo includes a clutch mechanism that can be released to disengage the autopilot, and a feedback sensor (usually a potentiometer or LVDT) that tells the computer the actual surface position.',
      'The feedback loop is what makes the autopilot a closed-loop system. Without feedback, the computer would not know if its commands were being executed correctly. If the feedback sensor fails or provides incorrect data, the autopilot will either oscillate, drive the surface to a limit, or disconnect — which is why feedback sensor integrity is critical to verify during maintenance.',
    ],
    pro_tips: [
      'Draw the signal flow on paper when troubleshooting: sensor to computer to servo to surface, with feedback from surface back to computer. Then mark where in that chain you think the problem is. This simple diagram keeps you from chasing symptoms in the wrong part of the system.',
      'When identifying components on the aircraft, use the wiring diagram manual to trace each connection from the computer connector pins to the physical components. Do not rely on general system descriptions — the actual wiring in a specific aircraft installation may differ from the textbook diagram due to STCs, service bulletins, or configuration options.',
    ],
    references: [
      'Aircraft Maintenance Manual — Autopilot system description',
      'Wiring Diagram Manual — Autopilot system schematic',
      'Autopilot manufacturer installation manual — System architecture',
      'AC 43.13-1B Chapter 11 — Autopilot and flight director systems',
    ],
  },

  '4-01': {
    overview:
      'Verifying FMS-to-autopilot coupling confirms that the Flight Management System can command the autopilot through LNAV (lateral navigation) and VNAV (vertical navigation) modes to fly a programmed flight plan automatically. This coupling is the integration point between navigation planning and flight control execution, and it must be verified after any FMS installation, autopilot work, or software update. LNAV provides roll steering commands to track the lateral flight plan path, while VNAV provides pitch commands to follow altitude constraints and vertical profiles. Both are transmitted from the FMS to the autopilot computer via ARINC 429 data bus labels.',
    study_guide: [
      'LNAV coupling sends roll steering commands from the FMS to the autopilot. When LNAV is engaged, the autopilot follows the lateral path defined by the active flight plan rather than tracking a VOR radial or heading bug. Verify that the autopilot tracks the FMS course by loading a flight plan with course changes and confirming the autopilot commands turns at each waypoint.',
      'VNAV coupling sends pitch commands from the FMS to the autopilot to follow a vertical profile. This includes climb and descent paths, altitude constraints at waypoints, and speed management. Verify VNAV by loading a flight plan with altitude constraints and confirming that the autopilot commands pitch changes to meet the constraints.',
      'The data interface between the FMS and autopilot is typically ARINC 429 using specific label groups for roll steering, pitch command, and mode annunciation. Use the ICD (Interface Control Document) for your specific installation to identify the correct labels and verify their presence with a bus analyzer if coupling problems arise.',
      'Mode annunciation is a critical verification point. When LNAV or VNAV is engaged, the corresponding annunciator must illuminate on the flight display. If the FMS is commanding and the autopilot is following but the annunciator does not show the correct mode, there may be a discrete signal or ARINC 429 status label issue.',
    ],
    pro_tips: [
      'To verify LNAV coupling on the ground without flying, load a flight plan and monitor the roll steering command output on the bus analyzer while slewing the aircraft position in the FMS (if the system supports simulation mode). You should see the roll command change as the simulated position deviates from the flight plan course.',
      'If LNAV engages but the autopilot does not track correctly, check that the correct navigation source is selected as the primary on the CDI/HSI. Many installations require the CDI to be set to GPS/FMS before LNAV will actively steer, even though the mode annunciator may show LNAV armed.',
    ],
    references: [
      'FMS manufacturer installation manual — Autopilot interface section',
      'ARINC 429 specification — Label assignments for roll steering and pitch command',
      'Aircraft Maintenance Manual — FMS/autopilot integration test',
      'TSO-C115d — FMS equipment requirements',
    ],
  },

  '4-02': {
    overview:
      'Navigation database currency is a regulatory and safety requirement for IFR flight using FMS, GPS, and multi-sensor navigation systems. The database contains waypoints, airways, procedures (SIDs, STARs, approaches), airport data, and airspace boundaries that must match the current real-world navigation infrastructure. Databases are updated on a 28-day AIRAC (Aeronautical Information Regulation and Control) cycle published by ICAO. An expired database means the procedures and waypoints may no longer match published charts, creating a risk of navigation errors. The technician must know how to verify database currency, understand the implications of an expired database, and document the status correctly.',
    study_guide: [
      'The AIRAC cycle is a fixed 28-day schedule published by ICAO that synchronizes worldwide navigation data updates. Each cycle has an effective date and an expiration date. The database loaded in the FMS or GPS must have an effective date that covers the current date. Check the database status page in the FMS/GPS to find both the effective and expiration dates.',
      'An expired navigation database does not necessarily ground the aircraft, but it restricts operations. Under 14 CFR 91.511 and AC 90-100A, IFR operations using GPS or FMS require a current database for procedure navigation. The pilot may still use the system for situational awareness, but cannot fly database-driven procedures such as GPS approaches or RNAV departures with an expired database.',
      'When verifying database currency after a maintenance event, check the database status on every FMS and GPS unit in the aircraft. In dual-FMS installations, both units must have the same current cycle loaded. A mismatch between left and right FMS databases can cause confusing crew alerts and potential navigation discrepancies.',
      'Some operators obtain advance copies of the next AIRAC cycle database before the effective date. Do not load a future-cycle database as current unless the system supports dual-database storage with automatic switchover on the effective date. Loading a not-yet-effective database and using it before its effective date is functionally the same as using an expired one.',
    ],
    pro_tips: [
      'Write the database effective and expiration dates in the aircraft logbook entry when you perform any FMS or GPS maintenance. This gives the flight crew an easy reference and protects you by documenting what was current at the time of your maintenance.',
      'Know your AIRAC cycle dates. They fall on fixed 28-day intervals starting from a known reference date. Jeppesen and FAA publish annual calendars of AIRAC effective dates. Keeping one posted in the shop saves time when verifying database currency.',
    ],
    references: [
      'AC 90-100A — U.S. Terminal and En Route Area Navigation Operations',
      '14 CFR 91.511 — Communication and navigation equipment for overwater operations',
      'ICAO Annex 15 — Aeronautical Information Services (AIRAC cycle definition)',
      'TSO-C146d / TSO-C196b — GPS/SBAS equipment database requirements',
    ],
  },

  '4-03': {
    overview:
      'Loading a navigation database update is a routine but critical maintenance task that ensures the aircraft has current procedure and waypoint data for IFR operations. The update process varies by manufacturer and may involve data cards (CompactFlash, SD, or proprietary media), USB drives, or wireless data transfer. A failed or corrupted database load can leave the aircraft without a usable navigation database, which is why backup procedures, correct media handling, and post-load verification are essential steps. The technician must follow the manufacturer\'s specific loading procedure exactly, maintain power to the unit throughout the process, and verify that the load completed successfully with the correct AIRAC cycle.',
    study_guide: [
      'Before loading a new database, back up the current database if the system supports it. This gives you a recovery path if the new load fails or is corrupted. Some systems store the backup internally, while others require you to save it to external media. Follow the manufacturer\'s procedure for backup.',
      'Database loading media must be handled carefully. Data cards can be damaged by static discharge, so use ESD precautions when handling them. Verify that the data card or USB drive contains the correct database for the specific equipment part number and software version — loading a database intended for a different hardware revision can cause a load failure or system malfunction.',
      'During the loading process, maintain continuous power to the avionics unit. A power interruption during database loading can corrupt the database and potentially require the unit to be returned to the manufacturer for recovery. If the aircraft is on battery power, connect external power before beginning the load.',
      'After the load completes, verify the database by checking the effective dates, performing a spot-check of a known waypoint or procedure, and confirming that the unit accepts the database as valid. Some systems will display a database integrity check result. Document the new database cycle and effective dates in the maintenance record.',
    ],
    pro_tips: [
      'If a database load fails, do not immediately retry. First check the media for damage, verify it is the correct media for the unit, and confirm power is stable. Then consult the manufacturer\'s troubleshooting guidance for failed loads. Repeated failed load attempts can sometimes lock out the database slot, requiring a shop-level reset.',
      'Label your database media clearly with the AIRAC cycle, effective date, and the equipment part number it is intended for. In a busy shop with multiple aircraft types, loading the wrong database into the wrong unit is a real and preventable error.',
    ],
    references: [
      'FMS/GPS manufacturer maintenance manual — Database loading procedure',
      'AC 20-153A — Acceptance of Aeronautical Data',
      'RTCA DO-200B — Standards for Processing Aeronautical Data',
      'TSO-C146d — Stand-Alone Airborne Navigation Equipment (database requirements)',
    ],
  },

  '4-04': {
    overview:
      'An FMS position invalid condition means the Flight Management System cannot determine a reliable aircraft position, which prevents it from providing navigation guidance. The FMS derives position from multiple sources — GPS receivers, VOR/DME stations, IRS/AHRS, and manual entry — and cross-checks them for consistency. A position invalid alert can result from GPS antenna problems, satellite signal blockage, failed or degraded navigation sensors, a corrupted database, or an incorrect initial position entry. Troubleshooting requires systematically checking each position source and the data paths that feed them to the FMS.',
    study_guide: [
      'Start with the GPS receiver, as it is the primary position source for most modern FMS installations. Check the GPS antenna for damage, obstruction, and cable continuity. Verify that the GPS receiver is tracking a sufficient number of satellites (typically four or more for a 3D fix). If the receiver shows zero satellites or a low count, the problem is likely in the antenna, cable, or RF path rather than the FMS itself.',
      'Check for a valid position initialization. Some FMS units require the crew to confirm the initial position on the ground before GPS acquires. If the initialized position is grossly wrong (entered in the wrong hemisphere or at the wrong airport), the GPS receiver may reject the satellite solution because it does not match the expected position, resulting in a position invalid condition.',
      'Verify navigation database integrity. A corrupted database can cause the FMS to compute nonsensical positions when attempting to use VOR/DME updating or waypoint-referenced position solutions. Reload the database if corruption is suspected, and verify by checking that known waypoints display at their correct coordinates.',
      'If GPS is healthy but the FMS still shows position invalid, check secondary position sources. VOR/DME updating relies on functional VOR and DME receivers and a valid database for station locations. IRS or AHRS drift beyond tolerance will cause the FMS to flag position as unreliable. Check each source independently to isolate which one is providing bad data.',
    ],
    pro_tips: [
      'The simplest cause of FMS position invalid is also the most overlooked: the GPS antenna is blocked by a hangar roof, a ground power cart parked on the ramp, or even heavy snow or ice on the fuselage above the antenna. Before you start pulling connectors, move the aircraft outside and try again.',
      'When troubleshooting intermittent position invalid conditions, check the GPS antenna cable for water intrusion, especially at the antenna base and at fuselage penetration points. Water in the coax degrades the signal enough to cause intermittent satellite tracking loss, and the problem is worse in rain or humid conditions.',
    ],
    references: [
      'FMS manufacturer troubleshooting guide — Position invalid conditions',
      'GPS receiver CMM — Satellite acquisition and position solution',
      'Aircraft Maintenance Manual — FMS position source configuration',
      'TSO-C145e / TSO-C146d — GPS/SBAS equipment requirements',
    ],
  },

  '4-05': {
    overview:
      'ARINC 429 is the predominant digital data bus used in civil aviation for communication between avionics LRUs (Line Replaceable Units). Verifying ARINC 429 communication with a bus analyzer is a fundamental avionics troubleshooting skill used to confirm that systems are transmitting the correct data labels at the correct rates, with valid sign/status matrix (SSM) bits, and that receiving systems are processing the data correctly. This task involves connecting a bus analyzer to the aircraft wiring, identifying and decoding data labels, and comparing the observed data to the Interface Control Document (ICD) specification for the installation.',
    study_guide: [
      'ARINC 429 is a unidirectional, twisted-pair data bus that transmits 32-bit words at either high speed (100 kbps) or low speed (12.5 kbps). Each word contains an 8-bit label (identifying the data parameter), a 2-bit source/destination identifier (SDI), a data field, and a 2-bit sign/status matrix (SSM) that indicates data validity. Understanding this word structure is essential for interpreting bus analyzer output.',
      'When connecting a bus analyzer, identify the correct bus pair in the aircraft wiring. ARINC 429 uses separate transmit and receive buses — if you need to see what an FMS is sending, you must connect to the FMS transmit bus, not the receive bus at the FMS connector. The wiring diagram manual will identify which pins at which connectors carry each bus.',
      'Once connected, the bus analyzer will display decoded labels with their data values, SSM status, and refresh rates. Compare each label to the ICD (Interface Control Document) for the installation to verify that the expected labels are present, the data values are reasonable, and the SSM bits indicate normal operation (typically SSM = 00 for normal/valid data). Missing labels or SSM indicating failure state point to the transmitting unit as the problem source.',
      'Pay attention to refresh rates. Each ARINC 429 label has a specified update rate (for example, heading data might update at 10-20 Hz while database data might update at 1 Hz). A label that is present but updating too slowly may cause the receiving system to flag it as stale and reject it. The bus analyzer should show the measured refresh rate for each label.',
    ],
    pro_tips: [
      'Label numbers in ARINC 429 are specified in octal, not decimal or hexadecimal. Make sure your bus analyzer is displaying labels in octal (the standard), and that you are reading the ICD label numbers in the same format. Confusing octal label 310 with decimal 310 will send you looking at the wrong parameter entirely.',
      'When chasing an intermittent data bus problem, use the bus analyzer\'s recording or logging function to capture data over time. Intermittent failures often show up as occasional SSM changes to failure status or momentary label dropouts that you would miss watching the display in real time.',
    ],
    references: [
      'ARINC Specification 429 — Digital Information Transfer System',
      'Installation-specific ICD (Interface Control Document) — Label assignments',
      'Wiring Diagram Manual — ARINC 429 bus routing',
      'AC 43.13-1B Chapter 11 — Digital systems and data buses',
    ],
  },

  '4-06': {
    overview:
      'Performing a GPS receiver operational check verifies that the installed GPS equipment is tracking satellites, computing a valid position solution, and providing accurate position data to downstream systems such as the FMS, transponder (for ADS-B), and flight displays. This check is required after GPS receiver installation, antenna work, or any maintenance that could affect GPS performance. The technician must verify satellite tracking status, position accuracy, RAIM (Receiver Autonomous Integrity Monitoring) availability for IFR operations, and the data output to connected systems.',
    study_guide: [
      'Begin the operational check with the aircraft positioned outdoors with a clear view of the sky. GPS signals are extremely weak (approximately -130 dBm at the antenna) and cannot penetrate hangars or buildings. The receiver needs to track a minimum of four satellites for a 3D position fix, but good geometry (low DOP — Dilution of Precision) typically requires five or more satellites well distributed across the sky.',
      'Verify position accuracy by comparing the GPS-reported position to the known surveyed coordinates of your ramp or parking position. The position should agree within the accuracy specification of the receiver (typically 15 meters for standard GPS, 3 meters or better for WAAS-enabled receivers). A significant position error with good satellite tracking suggests an antenna or database coordinate issue.',
      'RAIM is essential for IFR GPS operations. RAIM uses redundant satellite measurements to detect a faulty satellite signal that could corrupt the position solution. Verify that the GPS receiver reports RAIM available. If RAIM is not available, the receiver cannot be used for IFR navigation. RAIM availability depends on satellite geometry and requires at least five satellites (six for fault exclusion).',
      'Verify the GPS data output by checking the ARINC 429 bus labels that carry position, velocity, and integrity data to downstream systems. The GPS must output position with the correct label, at the correct rate, and with valid SSM bits. If the GPS is the position source for ADS-B, verify that the transponder is receiving and using the GPS position data.',
    ],
    pro_tips: [
      'Cold starts (first power-up after installation or long storage) can take 12-15 minutes for the GPS receiver to download the full satellite almanac and acquire a position fix. Do not declare the receiver faulty after two minutes — let it complete the cold start acquisition before troubleshooting. Subsequent warm starts should acquire in 1-2 minutes.',
      'If the GPS tracks satellites but reports poor accuracy or RAIM not available, check the antenna cable for excessive loss. GPS antenna cables should have low insertion loss (typically under 5 dB at 1575.42 MHz). A damaged cable, corroded connector, or excessively long cable run can degrade signal strength enough to lose satellites and reduce accuracy.',
    ],
    references: [
      'TSO-C145e — Airborne Navigation Sensors Using GPS Augmented by SBAS',
      'TSO-C196b — Airborne Supplemental Navigation Sensors for GPS Equipment',
      'AC 20-138D — Airworthiness Approval of Positioning and Navigation Systems',
      'GPS receiver manufacturer installation/maintenance manual — Operational check',
    ],
  },

  '4-07': {
    overview:
      'WAAS (Wide Area Augmentation System) is a satellite-based augmentation system that improves GPS accuracy, integrity, and availability for aviation use. WAAS enables LPV (Localizer Performance with Vertical guidance) approaches, which provide approach minimums comparable to a Category I ILS without requiring ground-based navigation equipment at the airport. Understanding WAAS and LPV is essential for avionics technicians because these approaches are now the primary precision-like approach type at thousands of airports that do not have ILS installations, and the avionics equipment must be properly installed and configured to support them.',
    study_guide: [
      'WAAS improves standard GPS in three key ways: it provides differential corrections that improve position accuracy from approximately 15 meters to 1-2 meters, it adds integrity monitoring that alerts the pilot within 6 seconds if the GPS position is unreliable (compared to RAIM which can take longer), and it improves availability by allowing operations to continue with fewer satellites than standalone GPS requires.',
      'LPV approaches use WAAS to provide both lateral and vertical guidance similar to an ILS. The lateral guidance replaces the ILS localizer, and the angular vertical guidance replaces the glideslope. LPV decision altitudes can be as low as 200 feet above the runway (comparable to CAT I ILS), making them a true precision-like approach. The avionics must be TSO-C145/C146 approved with WAAS capability to fly LPV approaches.',
      'The hierarchy of GPS/WAAS approach types, from most capable to least, is: LPV (best minimums, requires WAAS), LNAV/VNAV (vertical guidance from WAAS or baro-VNAV, higher minimums), LP (lateral precision only, no vertical, requires WAAS), and LNAV (basic GPS lateral guidance only, highest minimums). The FMS or GPS navigator will automatically select the best available approach type based on equipment capability and WAAS signal availability.',
      'WAAS signal reception depends on receiving correction data from one of the WAAS geostationary satellites (currently WAAS satellites cover North America). The avionics must be able to track the WAAS satellite in addition to the GPS constellation. If the WAAS satellite is not tracked, the system will downgrade from LPV to a lower approach type. Antenna location and sky visibility affect WAAS satellite tracking.',
    ],
    pro_tips: [
      'When a pilot reports that they did not get LPV on an approach they expected, check the NOTAM for the WAAS satellite status. WAAS outages are published via NOTAMs and affect LPV availability. Also check that the navigation database is current — the approach procedure must be in the database to fly it.',
      'During installation or troubleshooting of WAAS-capable GPS equipment, verify that the equipment configuration includes WAAS-capable antenna and that the GPS receiver software is approved for WAAS operations. Some GPS receivers are capable of WAAS but ship with WAAS disabled by default and require a configuration change or software option to activate it.',
    ],
    references: [
      'TSO-C145e — Airborne Navigation Sensors Using GPS Augmented by SBAS',
      'TSO-C146d — Stand-Alone Airborne Navigation Equipment Using GPS Augmented by SBAS',
      'AC 20-138D — Airworthiness Approval of Positioning and Navigation Systems',
      'FAA Order 8260.58A — United States Standard for Performance Based Navigation Instrument Procedures',
      'AIM Chapter 1-1-18 — Wide Area Augmentation System (WAAS)',
    ],
  },

  '4-08': {
    overview:
      'The Flight Management System is an integrated avionics suite whose components work together to provide flight planning, navigation, performance management, and guidance to the autopilot and flight displays. Identifying these components and understanding their interfaces is essential for installation, troubleshooting, and maintenance. A typical FMS installation includes a Flight Management Computer (FMC), a Control Display Unit (CDU) for crew interaction, GPS and radio navigation receivers for position input, an AHRS or IRS for attitude and inertial data, an air data computer for altitude and airspeed, and ARINC 429 data buses connecting everything together.',
    study_guide: [
      'The Flight Management Computer (FMC) is the core processing unit. It stores the navigation database, executes flight plan computations, calculates the lateral and vertical flight path, and generates steering commands for the autopilot. The FMC receives position data from GPS, VOR/DME, and IRS sensors, blends them using a Kalman filter, and outputs a best-estimate position. Do not confuse the FMC with the CDU — the FMC is the computer that does the work; the CDU is just the interface the crew uses to talk to it.',
      'The Control Display Unit (CDU) is the crew interface to the FMS. It provides a keyboard for data entry and a screen for displaying flight plans, navigation data, and system messages. The CDU communicates with the FMC via ARINC 429 or ARINC 739 (for higher-bandwidth character-based displays). In a dual-FMS installation, there are typically two CDUs, each paired with its respective FMC, with the ability to cross-talk.',
      'Navigation sensor inputs to the FMS include GPS receivers (providing satellite-based position), VOR and DME receivers (providing ground-based radio navigation position), and IRS or AHRS (providing inertial position, attitude, and heading). The FMS integrates these inputs to compute a blended position that is more accurate and reliable than any single source. The ARINC 429 labels carrying this data are defined in the system ICD.',
      'The FMS interfaces with the autopilot via ARINC 429 buses carrying roll steering and pitch commands (LNAV/VNAV), with the flight displays via buses carrying flight plan overlay and map data, and with the air data computer for altitude, airspeed, and temperature inputs used in performance calculations. Understanding this bus architecture — which unit talks to which, on which bus, using which labels — is the key to systematic FMS troubleshooting.',
    ],
    pro_tips: [
      'When troubleshooting an FMS problem, start by identifying which component in the chain is at fault. If the CDU shows no data, is it because the FMC is not computing, or because the ARINC 429 bus between them is broken? If the FMS position is wrong, is it the GPS input, the VOR/DME input, the blending algorithm, or the database? Trace the data flow from source to display to isolate the faulty link.',
      'In multi-FMS installations, cross-compare the two FMS units. If FMS 1 shows a problem but FMS 2 works normally, the issue is likely in FMS 1 or its unique sensor inputs. If both show the same problem, look at a shared input source such as the GPS antenna, air data computer, or a common navigation database that was loaded on both units.',
    ],
    references: [
      'FMS manufacturer installation manual — System description and architecture',
      'ARINC Characteristic 702A — Flight Management System',
      'ARINC 429 specification — FMS-related label assignments',
      'TSO-C115d — Flight Management System requirements',
      'Wiring Diagram Manual — FMS system schematic and bus architecture',
    ],
  },
}
