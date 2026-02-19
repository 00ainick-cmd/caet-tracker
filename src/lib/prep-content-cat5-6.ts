// Rich prep content for Categories 5-6
// Audio & Communication, Wire Harness Fabrication

export const PREP_CONTENT_CAT5_6: Record<string, {
  overview: string
  study_guide: string[]
  pro_tips: string[]
  references: string[]
}> = {

  // ──────────────────────────────────────────────────────────
  // Category 5 — Audio & Communication
  // ──────────────────────────────────────────────────────────

  '5-01': {
    overview:
      'A COM radio functional check verifies that the transceiver can transmit and receive on its assigned VHF frequency range (118.000–136.975 MHz), that squelch properly gates background noise, and that sidetone feeds back to the pilot during transmit. This task matters because a radio that receives but cannot transmit — or transmits with poor modulation — is an airspace safety hazard that may not be caught until the pilot is talking to ATC. The technician must demonstrate the ability to key the transmitter on multiple frequencies, verify RF power output with a wattmeter, confirm receiver audio quality and squelch threshold, and check that sidetone is present and at an appropriate level through the audio panel.',
    study_guide: [
      'VHF COM radios operate in AM mode on 25 kHz or 8.33 kHz channel spacing; when performing a functional check, test at least three frequencies spread across the band — low (e.g., 118.0 MHz), mid (e.g., 127.0 MHz), and high (e.g., 136.0 MHz) — because oscillator drift or synthesizer faults may only appear at band edges.',
      'Transmit power output should be measured with an inline wattmeter or RF power meter connected between the radio and antenna; typical GA COM radios produce 10–16 watts carrier power, and output below the manufacturer minimum indicates a failing PA stage or excessive cable loss.',
      'Squelch testing requires slowly opening the squelch control until background noise just breaks through, then verifying the squelch tightens cleanly when the control is returned to its detent; a squelch that will not fully quiet or that gates erratically suggests a defective squelch circuit or excessive local RF interference.',
      'Sidetone is the audio feedback path that lets the pilot hear their own transmission in the headset; verify sidetone is present during transmit and is at a comfortable level — missing sidetone often leads pilots to believe the radio is inoperative even though it is transmitting normally.',
      'Always confirm audio routing through the audio panel for both the selected and unselected receiver modes; many audio panels allow monitoring COM 2 while COM 1 is selected for transmit, and the technician should verify that audio switching logic is correct for both crew positions.',
    ],
    pro_tips: [
      'Use a handheld COM radio as a quick listen-back tool when you do not have a ramp test set — key the aircraft radio and listen on the handheld to confirm modulation quality and approximate power before connecting instruments.',
      'If the radio works on the bench but not in the aircraft, check the antenna cable connector at the fuselage bulkhead — corrosion at the BNC or TNC connector is the number one cause of intermittent COM failures on aging airframes.',
      'Document the measured power output at each test frequency in your workorder notes; it creates a baseline that makes future troubleshooting significantly faster.',
    ],
    references: [
      '14 CFR 91.511 — Communication and navigation equipment for overwater operations',
      '14 CFR 91.205(d) — Required instruments and equipment for IFR flight (two-way radio)',
      'AC 43.13-1B Chapter 11 — Radio and Electronic Systems',
      'RTCA DO-186B — Minimum Operational Performance Standards for VHF Air-Ground Communications',
    ],
  },

  '5-02': {
    overview:
      'Measuring antenna VSWR (Voltage Standing Wave Ratio) quantifies how efficiently the antenna system transfers RF energy from the transmission line to free space. A VSWR of 1:1 represents a perfect match with zero reflected power, while values above 3:1 indicate a serious mismatch that wastes transmit power, degrades receiver sensitivity, and can damage the radio\'s output stage. This is a foundational measurement for any COM, NAV, or transponder antenna installation or troubleshooting effort, and the technician must demonstrate correct use of the VSWR meter or antenna analyzer across the operating frequency range.',
    study_guide: [
      'VSWR is derived from the ratio of forward to reflected power: VSWR = (1 + sqrt(Pr/Pf)) / (1 - sqrt(Pr/Pf)); for COM antennas, a VSWR of 1.5:1 or better across 118–137 MHz is considered excellent, and most manufacturers specify a maximum of 3:1 at band edges.',
      'An antenna analyzer (such as the RigExpert or Bird site analyzer) sweeps the entire frequency range and plots VSWR vs. frequency; always perform the sweep with the analyzer connected at the antenna feedpoint cable — measuring at the radio end includes cable loss which masks a poor antenna match.',
      'When using a Bird 43 thruline wattmeter, you must key the transmitter and read forward and reflected power with the appropriate frequency slug; always start with a low-power test if the radio supports it to avoid PA damage while diagnosing a high-VSWR condition.',
      'A VSWR measurement that is uniformly high across all frequencies usually indicates a cable fault (open center conductor, shorted shield, or water intrusion), whereas a VSWR that is acceptable at some frequencies but peaks sharply at others points to an antenna resonance issue — typically caused by incorrect antenna length, nearby metallic structure interference, or a damaged radiating element.',
    ],
    pro_tips: [
      'If VSWR is borderline at installation, it will only get worse over time as connectors corrode and sealant degrades — fix it now rather than releasing the aircraft and getting a callback in six months.',
      'On composite aircraft, antenna ground plane performance differs dramatically from aluminum structures; always verify VSWR in situ, not on the bench, because ground plane effects dominate antenna impedance on composite airframes.',
    ],
    references: [
      'AC 43.13-1B Section 11-31 — Antenna Installation',
      'AC 43.13-1B Section 11-33 — Antenna Transmission Lines',
      'RTCA DO-160G Section 21 — Emission of Radio Frequency Energy',
      'Antenna manufacturer installation manual (specific to type)',
    ],
  },

  '5-03': {
    overview:
      'Troubleshooting a no-transmit condition requires the technician to systematically trace the transmit signal path from the push-to-talk (PTT) switch through the audio panel keying circuit, the microphone audio path, the coaxial feed line, and the antenna. A no-transmit condition can originate anywhere in this chain — from a broken PTT switch wire to a failed radio PA transistor to a severed coax center conductor. The technician must demonstrate a logical isolation approach that avoids the common trap of swapping the radio first, which is the most expensive and least likely fix.',
    study_guide: [
      'Start at the PTT switch: with a multimeter on the mic jack, verify the PTT line goes to ground when the switch is pressed; an open PTT circuit is the most common cause of no-transmit and is frequently caused by a broken wire in the yoke column where repeated flexing fatigues the conductor.',
      'If PTT reaches the audio panel but the radio does not key, check the audio panel\'s keying relay or FET switch output on the COM TX line; many audio panels use separate keying output pins for COM 1 and COM 2, and a mis-wired installation can route PTT to the wrong radio.',
      'Measure RF power output at the antenna port of the radio using a wattmeter or dummy load; if the radio produces rated power into a dummy load but not through the installed antenna system, the fault is in the coax or antenna — not the radio.',
      'Verify microphone audio is reaching the radio by checking the mic line with an oscilloscope or audio level meter while speaking into the microphone; some headset microphones require bias voltage from the audio panel, and a missing bias supply produces carrier-only transmission (ATC hears a key-up with no voice).',
    ],
    pro_tips: [
      'Carry a known-good test headset with you — plugging it into the aircraft jacks instantly eliminates the headset, PTT switch, and mic element as variables.',
      'When ATC reports "carrier only, no voice," the radio is transmitting fine — focus on the microphone audio path, not the RF chain; check mic bias voltage and audio panel mic selection.',
      'On aircraft with multiple COM radios, try transmitting on the other COM using the same headset position — if the other radio transmits normally, you have isolated the fault to the specific radio or its dedicated keying/audio wiring.',
    ],
    references: [
      'Aircraft-specific wiring diagram (audio panel to COM radio interface)',
      'AC 43.13-1B Chapter 11 — Radio and Electronic Systems',
      'Audio panel installation manual — keying output circuit description',
      'Radio maintenance manual — transmitter troubleshooting section',
    ],
  },

  '5-04': {
    overview:
      'A weak or absent receive condition means the pilot hears little or no audio from ATC or other aircraft, even though the frequency is tuned correctly and volume is turned up. The receive path runs from the antenna through the coaxial cable to the radio receiver front end, and audio is then routed through the audio panel to the headset or speaker. The technician must distinguish between a radio receiver problem, an antenna system degradation, an audio panel routing issue, and a simple headset or speaker failure — each of which presents with subtly different symptoms.',
    study_guide: [
      'Begin by checking the simplest cause: verify the volume control is up and the correct COM receiver is selected on the audio panel; then check the headset or speaker by substituting a known-good unit — this five-second test eliminates the most embarrassing callback.',
      'If substituting the headset does not restore audio, check the antenna system next by measuring coaxial cable insertion loss with a cable analyzer or by measuring VSWR; cable loss greater than 3 dB at VHF frequencies represents a 50% signal loss that can push weak signals below the receiver\'s sensitivity threshold.',
      'Receiver sensitivity can be tested with a signal generator feeding a calibrated signal into the antenna port; the radio should produce usable audio at -93 dBm or better (typical VHF COM spec), and degraded sensitivity points to a failing RF front-end or local oscillator drift within the receiver.',
      'Water intrusion into coaxial connectors or the antenna base is a leading cause of gradual receive degradation; the corrosion increases cable loss and can detune the antenna, producing a condition where the radio works fine on strong local signals but cannot hear distant traffic.',
    ],
    pro_tips: [
      'If receive is weak on all frequencies equally, suspect cable or connector loss; if weak receive is frequency-dependent, suspect antenna resonance shift or receiver front-end issues.',
      'On aircraft that sit outside, always inspect the coax connector at the antenna base for green corrosion — a corroded N-connector or BNC at the belly antenna is probably the single most common cause of weak receive on piston singles.',
      'Ask the pilot whether the problem is constant or intermittent — intermittent weak receive often points to a loose coax connector or a fractured center conductor that makes contact when the aircraft is on the ground but opens under vibration in flight.',
    ],
    references: [
      'AC 43.13-1B Section 11-31 through 11-33 — Antenna and Transmission Line Installation',
      'Radio maintenance manual — receiver sensitivity test procedure',
      'RTCA DO-186B — VHF COM receiver sensitivity requirements',
      'Coaxial cable manufacturer specifications for insertion loss at VHF frequencies',
    ],
  },

  '5-05': {
    overview:
      'Audio hum or noise in the headsets is one of the most frustrating problems in avionics because it can originate from dozens of sources — power supply ripple, ground loops between equipment, electromagnetic interference from poorly routed wiring, alternator noise coupling through the bus, or even a defective audio panel amplifier. The technician must be able to identify the character of the noise (60 Hz buzz, 400 Hz hum, whine that changes with engine RPM, or broadband hiss) and systematically isolate it to a specific source. This task tests the technician\'s understanding of aircraft electrical grounding, audio signal paths, and EMI fundamentals.',
    study_guide: [
      'The frequency of the noise is your first diagnostic clue: 400 Hz hum indicates aircraft AC power coupling (common on turbine aircraft with 400 Hz generators), 60 Hz buzz suggests a ground loop with external power or shop equipment, alternator whine that tracks RPM points to inadequate alternator filtering or a ground loop through the audio shield, and broadband hiss suggests a failing audio amplifier stage.',
      'Ground loops form when audio shield grounds connect to airframe structure at two different points that are at slightly different potentials; the fix is to ensure all audio shield drains terminate at a single ground reference point, typically at the audio panel ground stud, with no secondary ground path through connector shells or rack mounting.',
      'Power supply noise couples into audio through inadequate filtering on the radio or audio panel power input; check the power bus filter capacitors and verify the equipment power wire is routed separately from audio signal wires — running power and audio in the same bundle is a classic installation error that creates crosstalk.',
      'After identifying the noise source, verify the repair by running the engine (or APU on turbine aircraft) through the full RPM range while monitoring headset audio; some noise only appears at specific RPMs where alternator harmonics resonate with the audio path.',
    ],
    pro_tips: [
      'Disconnect equipment one at a time from the audio panel while listening for the noise to disappear — when it stops, the last device you disconnected is either the source or completing the ground loop path.',
      'A 400 Hz hum that appeared after an avionics installation almost always means you created a new ground loop; check whether any new equipment shares a ground bus with the audio panel and whether shield drain wires are grounded at both ends.',
      'Keep a known-good audio panel ground bus bonding strap in your kit; poor bonding at the audio panel ground stud causes more noise complaints than any other single factor.',
    ],
    references: [
      'AC 43.13-1B Section 11-9 — Bonding and Grounding',
      'AC 43.13-1B Section 11-41 — Electrical Noise and Interference',
      'Audio panel installation manual — grounding and shielding requirements',
      'AEA Research Report R-14 — Audio System Noise Troubleshooting',
    ],
  },

  '5-06': {
    overview:
      'The marker beacon receiver detects 75 MHz signals transmitted from ground stations located along ILS approach paths. Outer marker (OM) transmits at 400 Hz modulation with blue light and dashes, middle marker (MM) at 1300 Hz with amber light and alternating dots and dashes, and inner marker (IM) at 3000 Hz with white light and dots. Although marker beacons are being decommissioned at many locations, they remain part of certified ILS installations and the CAET practical standard requires the technician to demonstrate a complete system test including audio and visual annunciation for all three marker types.',
    study_guide: [
      'Use a marker beacon test set (ramp tester) to inject calibrated 75 MHz signals modulated at 400 Hz, 1300 Hz, and 3000 Hz sequentially; verify that each modulation frequency triggers the correct colored lamp (blue/amber/white) and the correct audio tone pattern in the headset or speaker.',
      'Sensitivity testing requires checking both low and high sensitivity modes if the receiver supports them; in high sensitivity mode, the receiver should trigger at lower signal levels (useful during practice approaches), while low sensitivity narrows the detection zone for precision approaches.',
      'The marker beacon antenna is typically a flush-mounted blade or cavity antenna on the aircraft belly, oriented to receive vertically polarized signals; inspect the antenna for physical damage, paint over the radiating element, and secure mounting — a loose marker antenna produces intermittent reception that mimics receiver faults.',
      'Verify audio routing through the audio panel by confirming the marker beacon audio output is connected to the MKR BCN input on the audio panel and that the panel passes marker audio to the selected headset position; some audio panels have a separate marker beacon volume control or mute function that must be correctly set.',
    ],
    pro_tips: [
      'Many modern GPS navigators and FMS units provide pseudo-marker beacon indication derived from GPS position rather than a 75 MHz receiver; confirm whether the aircraft uses a real marker receiver or GPS-derived markers, as the test procedure differs significantly.',
      'When testing on the ramp, keep the test set antenna close to the aircraft marker antenna — 75 MHz signals are easily reflected by hangar structures, which can produce false triggers or missed detections if the test set is positioned poorly.',
    ],
    references: [
      '14 CFR 91.205(d)(3) — Marker beacon receiver required for IFR',
      'RTCA DO-143 — Marker Beacon Receiver MOPS',
      'AC 43.13-1B Chapter 11 — Navigation system testing',
      'ILS marker beacon ground station specifications (FAA Order 6750.24)',
    ],
  },

  '5-07': {
    overview:
      'A stuck microphone condition means the radio is continuously transmitting — keying the frequency and blocking other users. This is an urgent problem because it prevents ATC communications for all aircraft on that frequency and can cause the radio\'s power amplifier to overheat. The stuck mic can be caused by a mechanically jammed PTT switch, a short to ground in the PTT wiring, a failed audio panel keying transistor that latches in the transmit state, or even a headset jack wired incorrectly so the PTT contact is permanently grounded. The technician must demonstrate rapid, systematic isolation of the stuck keying source.',
    study_guide: [
      'The first step is to determine which radio is transmitting: look at the COM transmit annunciator on the audio panel or the TX indicator on each radio — on most installations the transmitting radio shows a "TX" light or the audio panel shows which COM is keyed.',
      'Disconnect the headset or hand mic from the aircraft jacks and observe whether the radio unkeys; if it does, the PTT switch in the headset or hand mic is shorted — test the PTT switch resistance with a meter (should be open when released, near zero when pressed).',
      'If removing the headset does not unkey the radio, the fault is downstream: disconnect the PTT wire at the audio panel input connector and check if the radio unkeys; if it does, the short is in the aircraft PTT wiring between the jack and the audio panel — look for chafed wire insulation against metal structure, especially inside the yoke column and under the instrument panel.',
      'If the radio stays keyed even with the PTT wire disconnected at the audio panel, the audio panel\'s keying output is latched — this indicates an audio panel fault (failed FET or relay) that requires removal and bench repair; as a temporary measure, pulling the circuit breaker for the affected COM radio stops the transmission immediately.',
    ],
    pro_tips: [
      'On aircraft with push-button audio panels (PMA450, GMA345, etc.), check whether an accidental panel button press has engaged a latching transmit mode or test mode — some audio panels have a "stuck mic" timeout feature that automatically unkeys after 30-60 seconds, but not all do.',
      'Carry a headset jack jumper plug in your kit that has no PTT connection — plugging it into the jack isolates the headset wiring from the circuit without leaving the jack open, which on some aircraft types can cause a floating PTT line to key randomly.',
      'After finding and fixing the stuck mic source, always perform a full transmit and receive functional check on both COM radios to verify the audio panel keying logic was not damaged by the sustained transmit event.',
    ],
    references: [
      'Audio panel installation/maintenance manual — keying circuit schematic',
      'AC 43.13-1B Section 11-17 — Wiring inspection for chafing',
      'Aircraft-specific wiring diagram — PTT circuit from jack panel to audio panel to COM radio',
    ],
  },

  '5-08': {
    overview:
      'Headset impedance compatibility is critical for proper audio level, frequency response, and noise rejection in the cockpit. Aviation headsets come in two impedance categories: low impedance (typically 150-300 ohms, used with most modern audio panels) and high impedance (typically 600-1000 ohms, common in older installations). An impedance mismatch between the headset and the audio panel output causes low audio volume, tinny or distorted sound, and poor signal-to-noise ratio. The technician must understand impedance matching principles and be able to verify compatibility between the installed audio panel and the headsets being used.',
    study_guide: [
      'Audio impedance is the AC resistance that a headset speaker or microphone presents to the driving circuit; when the audio panel output impedance and headset impedance are matched, maximum power transfer occurs and audio quality is optimal — a mismatch causes signal reflection and power loss, similar in concept to RF VSWR but at audio frequencies.',
      'Most modern audio panels (Garmin GMA series, PS Engineering PMA series) are designed for low-impedance headsets (150 ohms nominal) and include a selectable high/low impedance switch or configuration option; check the audio panel\'s configuration settings and verify they match the headset type being used before assuming a hardware fault.',
      'Microphone impedance matters too: dynamic microphones (low impedance, ~150-300 ohms) and electret microphones (which require bias voltage, typically 8-16 VDC from the audio panel) are not interchangeable without changing the audio panel\'s mic input configuration; plugging a dynamic mic into an electret-biased input results in low or distorted mic audio.',
      'When a customer reports that one crew position sounds fine and the other is too quiet, check whether different headset types are plugged into the two jack panels — one low-impedance and one high-impedance headset on the same audio panel set for a single impedance mode will produce noticeably different volume levels.',
    ],
    pro_tips: [
      'Always ask the customer what headset brand and model they use before troubleshooting audio level complaints — a surprising number of "audio panel failures" turn out to be impedance mismatches with a new headset the pilot just purchased.',
      'If the audio panel does not have a selectable impedance switch, check whether the manufacturer offers different output modules or resistor configurations on the circuit board for high vs. low impedance headsets — some older panels require a hardware modification rather than a menu setting.',
      'Label the aircraft jacks with the impedance setting (HI-Z or LO-Z) so future pilots and technicians know what headset type the system is configured for without having to open the panel.',
    ],
    references: [
      'Audio panel installation manual — impedance selection and configuration',
      'AC 43.13-1B Chapter 11 — Audio system installation practices',
      'Headset manufacturer specifications for impedance and mic type',
      'PS Engineering / Garmin audio panel technical reference — impedance settings',
    ],
  },

  // ──────────────────────────────────────────────────────────
  // Category 6 — Wire Harness Fabrication
  // ──────────────────────────────────────────────────────────

  '6-01': {
    overview:
      'Stripping wire insulation to the correct length without damaging the conductor is the most fundamental wiring skill in avionics. A nick in even one strand of a 22 AWG wire reduces the conductor cross-section and creates a stress riser that will eventually fracture under vibration, causing an intermittent open circuit that is extremely difficult to troubleshoot in the aircraft. The technician must select the correct stripping tool and die for the wire gauge and insulation type, set the strip length to match the terminal barrel or solder cup dimension, and inspect the stripped wire under magnification to verify no conductor damage.',
    study_guide: [
      'Select the correct stripping tool for the wire type: Tefzel and polyimide (Kapton) insulations require precision thermal or mechanical strippers with the correct die size — using a general-purpose stripper sized for PVC on Tefzel insulation will nick the conductor because Tefzel is harder and requires more precise blade depth control.',
      'Strip length must match the terminal or connector contact barrel: too short and the conductor will not fully engage the crimp barrel, reducing mechanical and electrical integrity; too long and bare conductor extends beyond the barrel, creating a potential short circuit to adjacent wires or structure.',
      'After stripping, inspect the conductor under a 10x loupe or magnifying lamp: look for nicked, cut, or scraped strands — per AC 43.13-1B, no more than the allowable percentage of strands may be nicked for the wire to remain serviceable, and any strand that is cut through must be addressed.',
      'For coaxial cable stripping (RG-400, RG-142), the process requires multiple strip steps: outer jacket, shield braid, dielectric, and center conductor exposure — each at a precise dimension specified by the connector manufacturer; a dedicated coax strip tool with adjustable blade depths ensures repeatability.',
    ],
    pro_tips: [
      'Practice on scrap wire of the same gauge and insulation type before stripping the actual harness wire — every insulation type has a slightly different feel, and dialing in the correct blade pressure on scrap avoids a costly mistake on the real wire.',
      'If you nick a strand and the wire is long enough, cut it back and re-strip rather than trying to use a damaged conductor — the few inches of wire are always cheaper than the troubleshooting time when that nick becomes an intermittent open six months later.',
      'Mark your strip lengths on the wire with a fine-tip marker before cutting insulation; this eliminates guesswork and ensures consistency across a large harness with dozens of terminations.',
    ],
    references: [
      'AC 43.13-1B Section 11-151 through 11-155 — Wire stripping procedures',
      'MIL-STD-1553 Wire Preparation — for applicable avionics buses',
      'Wire stripping tool manufacturer calibration procedures',
      'Aircraft wire manufacturer insulation stripping guidelines (Raychem, TE Connectivity)',
    ],
  },

  '6-02': {
    overview:
      'Crimping a terminal to specification means achieving a mechanically and electrically reliable connection that will survive the vibration, temperature cycling, and environmental exposure of the aircraft operating environment for decades. A proper crimp is actually more reliable than a soldered connection in aviation because it is not susceptible to cold solder joints, solder wicking, or thermal fatigue cracking. The technician must select the correct terminal for the wire gauge, use a calibrated crimp tool with the proper die set, perform the crimp, and verify it through visual inspection and a pull test per the terminal manufacturer\'s requirements.',
    study_guide: [
      'Terminal selection is the first critical step: the terminal barrel must match the wire gauge (color-coded red for 22-18 AWG, blue for 16-14 AWG, yellow for 12-10 AWG in standard insulated terminals), and the terminal type (ring, fork, pin, butt splice) must match the application — using an oversized barrel produces a loose, high-resistance crimp that will arc and overheat.',
      'Crimp tools must be calibrated per the manufacturer\'s schedule, typically annually, and the correct die set must be selected for the terminal being crimped; ratchet-type tools ensure the crimp cycle completes fully before releasing — never defeat the ratchet mechanism, as an incomplete crimp cycle produces an under-compressed connection.',
      'The crimp inspection window (visible on most insulated terminals) should show the conductor fully compressed and filling the barrel with no insulation trapped inside the crimp zone; use a 10x loupe to verify the conductor is visible through the inspection window and that the barrel is uniformly compressed without cracks.',
      'Pull test requirements vary by terminal and wire gauge: a properly crimped 22 AWG wire in a standard insulated terminal should withstand a minimum pull force of approximately 10-19 pounds (per MIL-T-7928); the technician should be able to state the pull test requirement for the terminal being used and demonstrate the test using a calibrated pull tester or spring scale.',
    ],
    pro_tips: [
      'Always do a "tug test" after every crimp as a basic check — a firm pull by hand that does not dislodge the wire gives confidence, but on critical terminations use a calibrated pull tester to verify quantitatively.',
      'If you find insulation trapped in the crimp barrel, cut it off and start over — a crimp with insulation in the barrel has dramatically reduced contact area and will fail, and there is no way to fix it after the fact.',
      'Keep a log of your crimp tool calibration dates on a sticker on the tool itself; inspectors and evaluators will ask, and having the answer immediately demonstrates professionalism.',
    ],
    references: [
      'AC 43.13-1B Section 11-160 through 11-164 — Terminal and Connector Crimping',
      'MIL-T-7928 — Terminals, Wire Termination (crimp style)',
      'Crimp tool manufacturer calibration and die selection charts (Daniels, TE Connectivity)',
      'SAE AS7928 — Crimping tools, wire termination requirements',
    ],
  },

  '6-03': {
    overview:
      'Installing connector contacts — pins and sockets — into multi-pin connectors requires precision and attention to the pin-out diagram. Each contact must be inserted into the correct cavity, fully seated past the contact retention clip, and verified with a gentle pull to confirm retention. An incorrectly inserted contact can cause a cross-wired system that damages avionics equipment on power-up, or a contact that is not fully seated can back out under vibration and create an intermittent open. This task is evaluated on the technician\'s ability to follow a pin-out drawing, use the correct insertion tool, and verify every contact.',
    study_guide: [
      'Before inserting any contacts, study the connector pin-out diagram and identify each cavity by its alphanumeric designation; connectors use standardized cavity layouts (MIL-DTL-38999, D-sub, etc.) with row and position markings molded into the connector shell — misidentifying a cavity results in a cross-wired connection that can destroy equipment.',
      'Use the correct insertion tool for the contact type and connector series; each manufacturer (Amphenol, ITT Cannon, Deutsch) supplies specific insertion/extraction tools that engage the contact retention clip without damaging it — using a screwdriver or incorrect tool deforms the clip and prevents proper retention.',
      'After inserting each contact, perform a retention check by pulling gently on the wire — the contact should not move; if it slides out, the retention clip did not engage, which usually means the contact was not pushed in far enough or the clip was damaged during insertion — reinsert with proper technique or replace the contact.',
      'For rear-release connectors, the contact must be pushed in until an audible or tactile click confirms the retention clip has engaged; for front-release types, the contact passes through the grommet seal and seats against the front face — verify full seating by looking at the contact from the mating face of the connector.',
    ],
    pro_tips: [
      'Lay out all your wires in order before starting insertions and mark each wire with its cavity designation using a wire marker — this prevents the frantic "which wire goes where" confusion when you have 37 pins to install.',
      'If a contact will not seat properly on the third attempt, inspect the cavity for debris or a damaged retention clip using a dental mirror and flashlight — forcing the contact will make the problem worse and may require replacing the entire connector shell.',
      'Practice extraction before you need it; knowing how to cleanly remove a mis-inserted contact without damaging adjacent contacts saves significant time during harness rework.',
    ],
    references: [
      'AC 43.13-1B Section 11-170 through 11-175 — Connector Assembly',
      'MIL-DTL-38999 — Connector, Electrical, Circular, Miniature (insertion procedures)',
      'Connector manufacturer contact insertion/extraction tool catalog (Daniels, Amphenol)',
      'Aircraft-specific wiring diagram — connector pin-out assignments',
    ],
  },

  '6-04': {
    overview:
      'A bonding jumper provides a low-resistance electrical path between metallic aircraft components to ensure static charge dissipation, lightning current conduction, and proper circuit return paths. The acceptance criterion is 3 milliohms or less of resistance across the completed bond, measured with a milliohm meter or DLRO (digital low-resistance ohmmeter). Achieving this requires meticulous surface preparation to remove paint, primer, and oxide from the contact area, correct hardware stacking order, and appropriate torque. A poor bond can create static discharge noise in avionics, prevent proper grounding of equipment, and in the worst case, create an arc point during a lightning strike.',
    study_guide: [
      'Surface preparation is the most critical step: all paint, primer, anodize coating, and corrosion must be removed from both mating surfaces to expose bare, clean metal; use a Scotch-Brite pad or approved abrasive — never a grinding wheel, which can remove too much material and weaken the structure — and apply the bonding jumper within two hours before the bare aluminum begins to re-oxidize.',
      'The correct hardware stacking order for a typical bonding jumper is: bolt, flat washer, bonding jumper lug, flat washer, bare metal structure, flat washer, lock washer, nut — the key principle is that the bonding lug and the structure must make direct metal-to-metal contact with no paint, washers, or other barriers between them.',
      'Measure bond resistance with a calibrated milliohm meter (DLRO) by placing the probes directly on the bonding lug and the structure, not on the bolt head — the reading must be 3 milliohms or less; readings above 3 milliohms indicate contaminated surfaces, insufficient torque, or incorrect hardware stacking that prevents metal-to-metal contact.',
      'After installation, apply corrosion-preventive compound (MIL-PRF-81309 or equivalent) over the exposed bare metal and jumper lug to prevent future corrosion from degrading the bond; some locations also require a sealant application per the aircraft structural repair manual.',
    ],
    pro_tips: [
      'Take your milliohm reading before applying corrosion treatment — the measurement must be done on the bare connection; if it fails after you have already applied sealant, you have to strip everything and start over.',
      'Carry a set of known-good bonding jumpers in various lengths in your kit; fabricating one from scratch takes much longer than using a pre-made jumper, and the pre-made ones have properly crimped lugs.',
      'If the bond resistance is consistently above 3 milliohms despite proper surface prep, check whether the structure is a dissimilar metal junction (aluminum to steel, for example) — dissimilar metal bonds require specific hardware and isolation techniques per AC 43.13-1B to prevent galvanic corrosion.',
    ],
    references: [
      'AC 43.13-1B Section 11-19 through 11-21 — Bonding and Grounding',
      'MIL-B-5087B — Bonding, Electrical, and Lightning Protection',
      'Aircraft structural repair manual — bonding jumper installation specifics',
      'MIL-PRF-81309 — Corrosion Preventive Compound application requirements',
    ],
  },

  '6-05': {
    overview:
      'Proper wire bundle routing and securing ensures that harnesses are protected from chafing, heat damage, fluid contamination, and mechanical interference with flight controls and moving components. This task encompasses selecting the correct clamp type and size, maintaining proper clamp spacing, observing clearance requirements from control cables and hot surfaces, and protecting wiring in SWAMP (Severe Wind And Moisture Problem) areas. Routing errors can have catastrophic consequences — a wire bundle that chafes against a control cable can cause a short circuit and a jammed control simultaneously.',
    study_guide: [
      'Maintain a minimum clearance of 3 inches from control cables, push-pull rods, and any moving flight control components; in areas where this clearance cannot be maintained, install a physical barrier or conduit to prevent contact — the FAA considers wire-to-flight-control chafing a potential catastrophic failure mode.',
      'Clamp spacing should not exceed 24 inches for supported runs, with additional clamps at any point where the bundle changes direction or passes through a bulkhead; clamps must be the correct size for the bundle diameter — an undersized clamp pinches insulation and an oversized clamp allows the bundle to slide and chafe.',
      'SWAMP areas (wheel wells, engine nacelles, and areas exposed to standing water, oil, or hydraulic fluid) require wiring to be routed along the top of the area where possible, with drip loops to prevent fluid from wicking along the bundle, and all connectors must be environmentally sealed with appropriate boots or potting.',
      'Use MS21919 cushion clamps (Adel clamps) for standard routing, with the cushion material appropriate for the temperature zone; in areas above 200 degrees F, use high-temperature Teflon-cushioned clamps — standard neoprene cushions will decompose and expose bare metal to the wire insulation.',
      'Lacing and tie wraps are used between clamp points to maintain bundle integrity; when using tie wraps (MS3367), ensure they are tightened to the point of snugness but not so tight that they deform the wire insulation — a tie wrap that indents the outer wires of a bundle creates a stress point.',
    ],
    pro_tips: [
      'Before routing a new harness, photograph the existing routing of adjacent bundles — this gives you a reference for where clamps, grommets, and pass-throughs are already located and helps you maintain clearances from existing wiring.',
      'Route the harness loosely first, secure it temporarily with tape, then verify all clearances before installing permanent clamps — it is much easier to adjust routing before 30 Adel clamps are bolted in place.',
      'Inspect existing adjacent wire bundles for chafing damage while you are in the area routing new wiring — it is much cheaper to repair a chafed wire you find now than to troubleshoot the intermittent fault it causes later.',
    ],
    references: [
      'AC 43.13-1B Section 11-100 through 11-120 — Wire Bundle Routing and Securing',
      'AC 43.13-1B Section 11-17 — Wire inspection for chafing',
      'MIL-DTL-5440 — Cushion Clamp specifications (Adel clamp)',
      'Aircraft-specific wiring installation drawings and routing diagrams',
    ],
  },

  '6-06': {
    overview:
      'Wire splicing is the approved method for repairing damaged wire or extending a conductor within a harness. The splice must maintain the mechanical strength, current-carrying capacity, and environmental protection of the original wire. Aviation splices use crimp-style splice connectors (butt splices or inline splices), not solder, because crimped splices resist vibration fatigue better than soldered joints. The technician must select the correct splice type for the wire gauge and environment, stagger splices within a bundle to prevent a bulge that could cause chafing, and apply environmental protection (heat-shrink tubing or other sealing method) to prevent moisture ingress.',
    study_guide: [
      'Select the correct splice connector for the wire gauge: standard insulated butt splices are color-coded (red = 22-18 AWG, blue = 16-14 AWG, yellow = 12-10 AWG) and must match the wire gauge being spliced; for environments subject to moisture or fluid exposure, use environmentally sealed splices with adhesive-lined heat shrink that melts and seals during shrinking.',
      'Splices within a wire bundle must be staggered — no two splices should be at the same location along the bundle length; AC 43.13-1B recommends at least a 1-to-2-inch offset between adjacent splices to prevent a hard lump in the bundle that can chafe against adjacent wires or structure.',
      'The maximum number of splices per wire run is limited by the approved data: generally no more than one splice per wire segment between termination points, and splices should not be located within 12 inches of a connector, terminal strip, or other termination point to maintain adequate flexing service loop.',
      'After crimping the splice, apply the appropriate environmental protection: adhesive-lined heat shrink tubing for standard environments (shrink with a heat gun at the manufacturer-specified temperature, typically 250-350 degrees F), or a cold-shrink silicone boot for high-temperature areas where heat shrink adhesive would soften.',
    ],
    pro_tips: [
      'Plan your splice locations before cutting wire — sketch out where each splice will fall within the bundle and verify stagger distances before making any cuts; rework is much more expensive than planning.',
      'When repairing a single damaged wire in a large bundle, carefully separate the damaged wire from the bundle for a few inches in each direction, perform the splice, and re-lace the wire back into the bundle — this minimizes disturbance to adjacent wires.',
      'Always perform a pull test on each completed splice before applying heat shrink; once the heat shrink is in place, a failed splice requires cutting the entire repair out and starting over.',
    ],
    references: [
      'AC 43.13-1B Section 11-158 through 11-160 — Wire Splicing',
      'MIL-T-7928 — Wire splice crimp requirements',
      'SAE ARP1975 — Splice installation and environmental protection',
      'Heat shrink tubing manufacturer application guidelines (Raychem, TE Connectivity)',
    ],
  },

  '6-07': {
    overview:
      'Wire identification marking ensures that every wire in the aircraft can be traced back to its function, origin, and destination using the wire ID printed on its insulation. AC 43.13-1B requires markings at each end of the wire and at intervals not exceeding 15 inches along the run, with markings also required on each side of a bulkhead, junction box, or disconnect. The marking method must be compatible with the wire insulation type — this is critically important because certain marking methods (hot-stamping) can damage polyimide (Kapton) insulation and create an arc-tracking hazard that has caused in-flight fires.',
    study_guide: [
      'Marking intervals: wire identification must appear within 3 inches of each termination point and at intervals not exceeding 15 inches along the run; in addition, markings are required on both sides of any bulkhead pass-through, splice, or junction so the wire can be identified without tracing the entire run.',
      'Marking methods vary by insulation type: ink stamping and laser marking are acceptable for all insulation types; hot-stamping is acceptable for PVC, Tefzel, and cross-linked ETFE insulations but is PROHIBITED on Kapton (polyimide) insulation because the heat and pressure can create microscopic cracks in the Kapton that lead to arc tracking — a progressive carbonization failure that has caused aircraft fires.',
      'For Kapton-insulated wire, use sleeve markers (heat-shrink or slide-on identification sleeves), ink stamping with compatible ink, or laser marking; the key principle is that no marking method may damage, indent, or crack the polyimide insulation layer.',
      'Wire identification codes follow the aircraft manufacturer\'s wire numbering system (e.g., J201A22 might indicate Junction box 2, wire 01, segment A, 22 AWG); the technician must be able to read and apply the correct wire ID from the wiring diagram and mark it legibly and durably on the wire.',
    ],
    pro_tips: [
      'When in doubt about whether a wire is Kapton-insulated, look for the distinctive amber color of polyimide insulation and check the aircraft wire list — if it is Kapton, never hot-stamp it under any circumstances.',
      'Pre-printed heat-shrink sleeves are the fastest and most professional-looking method for new harness fabrication; print all your sleeves before starting assembly and slide them onto the wires before crimping the far-end connectors.',
      'Use a fine-point permanent marker (Bic Mark-It or equivalent aviation-approved ink) for field repairs where a marking machine is not available — the marks are not as durable as machine printing but are acceptable for interim identification until the wire can be properly re-marked.',
    ],
    references: [
      'AC 43.13-1B Section 11-140 through 11-145 — Wire Identification and Marking',
      'MIL-STD-681 — Identification Coding and Application of Hookup and Lead Wire',
      'FAA Special Airworthiness Information Bulletin CE-11-17 — Kapton wire marking restrictions',
      'SAE AIR1377 — Aircraft Wire Identification Marking Methods',
    ],
  },

  '6-08': {
    overview:
      'Troubleshooting an open or short circuit in a wire harness requires systematic use of a multimeter to isolate the fault to a specific wire, splice, connector, or segment of the harness. An open circuit (infinite resistance where there should be continuity) causes a system to lose signal or power, while a short circuit (near-zero resistance between conductors that should be isolated, or between a conductor and ground) can blow fuses, damage equipment, or create a fire hazard. The technician must demonstrate the ability to safely disconnect power, select the correct meter function, and use a logical half-split isolation technique to locate the fault efficiently.',
    study_guide: [
      'Always disconnect aircraft power (battery master OFF, external power disconnected) and isolate the circuit under test by pulling the circuit breaker or disconnecting the affected wire from its terminations before performing continuity or insulation resistance tests; testing with power applied risks damaging the meter and gives misleading readings due to parallel circuit paths through connected equipment.',
      'For an open circuit: set the meter to the continuity or resistance function and measure end-to-end; if the circuit reads open, use the half-split technique — disconnect the harness at a midpoint connector or splice and test each half separately to determine which segment contains the open; continue splitting until you isolate the open to a specific connector, splice, or wire segment.',
      'For a short circuit: set the meter to resistance and measure between the shorted conductor and its unintended contact (adjacent wire or ground); disconnect connectors along the harness run to isolate which segment contains the short — the segment that still shows low resistance with connectors disconnected contains the fault, which is usually a chafed wire contacting structure or an adjacent conductor.',
      'Insulation resistance testing with a megohmmeter (typically at 500 VDC) can reveal insulation breakdown that does not appear on a standard multimeter\'s continuity test; this is particularly useful for detecting moisture-contaminated insulation or heat-damaged wire that has reduced but not zero insulation resistance — these faults cause intermittent problems that disappear when the wire is dry or cool.',
      'Document the fault location, cause (chafing, corrosion, manufacturing defect, etc.), and repair method in the work order; this information is valuable for trend analysis and may reveal a systemic routing or installation problem that affects other aircraft of the same type.',
    ],
    pro_tips: [
      'When you find a chafed wire that has shorted to structure, do not just repair the wire — investigate why it chafed; a missing clamp, incorrect routing, or a sharp edge on a bracket caused the chafe, and if you do not fix the root cause, the new wire will chafe in the same spot.',
      'For intermittent opens, gently flex and manipulate the harness while monitoring continuity on the meter — a fractured conductor inside intact insulation will momentarily show open when the wire is flexed at the break point.',
      'A tone generator and inductive probe (fox and hound) can trace a specific wire through a bundle without disconnecting every connector — inject tone at one end and trace the wire through the harness to locate where the signal stops (open) or appears on an adjacent wire (short).',
    ],
    references: [
      'AC 43.13-1B Section 11-180 through 11-185 — Wire Testing and Troubleshooting',
      'AC 43.13-1B Section 11-17 — Wire inspection for damage',
      'Multimeter and megohmmeter manufacturer operating instructions',
      'Aircraft-specific wiring diagrams and wire run lists',
    ],
  },
}
