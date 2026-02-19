// Rich prep content for Categories 7-8
// Software & Configuration, Documentation & Compliance

export const PREP_CONTENT_CAT7_8: Record<string, {
  overview: string
  study_guide: string[]
  pro_tips: string[]
  references: string[]
}> = {

  // ── Category 7: Software & Configuration ──────────────────────────────

  '7-01': {
    overview:
      'Before loading any software onto an avionics unit, you must verify that the software part number and version are compatible with the hardware revision installed in the aircraft. Manufacturers publish compatibility matrices that cross-reference hardware part numbers, hardware mod levels, and approved software versions. Loading incompatible software can render the unit inoperative or cause subtle functional failures that may not appear during basic ground checks. This task requires you to physically read the data plate on the unit, locate the correct compatibility document, and confirm the match before proceeding.',
    study_guide: [
      'Compatibility is determined by the hardware part number and mod status printed on the unit data plate, not by what was previously loaded. Always verify from the data plate directly rather than relying on the current software version screen, since the unit may have had a hardware modification that changes what software it can accept.',
      'Manufacturers like Garmin, Collins, and Honeywell publish Service Bulletins, Service Letters, or compatibility charts that list which software versions are approved for which hardware revisions. These documents are typically found in the ICA (Instructions for Continued Airworthiness) or on the manufacturer support portal.',
      'Some avionics systems use configuration modules or personality EEPROMs that are aircraft-specific and must also be compatible with the new software version. A software update may require a corresponding configuration module update, and skipping this step can result in loss of aircraft-specific settings like autopilot gains or sensor configurations.',
      'For TSO-authorized equipment, the software part number is part of the TSO authorization. Loading unapproved software effectively removes the TSO authorization from the unit, which has airworthiness implications under 14 CFR 21.305.',
    ],
    pro_tips: [
      'Take a photo of the data plate before you start. If the unit is buried behind a panel, you will not want to pull it again just to re-read a part number.',
      'Keep a running spreadsheet of your fleet hardware revisions and compatible software versions. When a new software release comes out, you can quickly identify which aircraft can accept it without pulling every unit.',
      'If the compatibility matrix shows your hardware needs a mod before accepting new software, do not attempt the load anyway. The update will either fail or corrupt the unit firmware.',
    ],
    references: [
      '14 CFR 21.305 — TSO authorization and marking requirements',
      '14 CFR 43.13 — Performance rules for maintenance',
      'FAA Order 8110.49 — Software Approval Guidelines',
      'AC 20-115D — Airborne Software Assurance (DO-178C)',
      'Manufacturer-specific software compatibility matrices (e.g., Garmin STC/SB library, Collins Product Support)',
    ],
  },

  '7-02': {
    overview:
      'Backing up an avionics unit configuration before performing any software update or modification is a critical step that protects against data loss during the update process. Modern avionics units store aircraft-specific configuration data including autopilot gains, sensor calibrations, equipment option selections, and database subscriptions. If a software load fails or overwrites these settings, restoring from a known-good backup is the fastest path to recovery. This task demonstrates that the technician understands what data needs to be saved, how to export it, and how to verify the backup is complete and readable.',
    study_guide: [
      'Configuration data is distinct from operational software. The software is the program code that runs the unit, while configuration data includes aircraft-specific parameters such as autopilot gain settings, V-speed thresholds, fuel tank capacities, and installed equipment option flags. A software update may preserve configuration, but you cannot count on it.',
      'Export the configuration using the manufacturer-specified method, which may involve a USB drive, SD card, RS-232 data loader, or proprietary loading device. Verify the backup file is not zero-length and is readable by re-importing it into the unit or checking it on a computer where applicable.',
      'Label your backup media with the aircraft registration, unit part number, current software version, and date. If you maintain multiple aircraft, mixing up configuration files between airframes can produce dangerous misconfigurations such as wrong V-speeds or incorrect weight limits.',
      'Some units store configuration in non-volatile EEPROM or a removable configuration module. For these systems, the backup procedure may involve documenting the configuration settings on paper or photographing configuration screens rather than exporting a file.',
    ],
    pro_tips: [
      'Always verify your backup is readable before you begin the software load. A corrupt backup file discovered after a failed update doubles your recovery time.',
      'Keep backup files organized in a folder structure by tail number and date. When a customer comes back six months later with a configuration problem, having the pre-update backup can save hours of troubleshooting.',
      'For Garmin units, the configuration is typically stored on the SD card in a specific directory structure. Copy the entire card contents, not just the database files, to ensure you capture all configuration data.',
    ],
    references: [
      '14 CFR 43.13 — Performance rules for maintenance',
      'Manufacturer installation manuals — backup and restore procedures',
      'DO-178C / DO-278A — Software and data assurance considerations',
      'Applicable STC Instructions for Continued Airworthiness',
    ],
  },

  '7-03': {
    overview:
      'Performing a software update on an avionics unit is a procedure that demands strict adherence to the manufacturer process, uninterrupted power to the unit throughout the load, and careful monitoring of the progress indicators. A corrupted or incomplete software load can brick a unit, requiring expensive factory service. This task evaluates whether the technician can follow the documented load procedure precisely, maintain stable power throughout the process, and recognize normal versus abnormal progress indicators.',
    study_guide: [
      'Before starting the load, ensure the aircraft has stable electrical power. Connect external ground power if available, and verify battery voltage is adequate if ground power is not an option. Some manufacturers specify minimum bus voltage requirements during software loading, and a voltage dip during the write cycle can corrupt flash memory.',
      'Follow the manufacturer procedure step by step, including any required key sequences, menu selections, or hardware switch positions. Many units require a specific boot mode or maintenance mode to accept software. Loading software through the normal operating mode may not work or may produce incomplete results.',
      'Monitor the progress indicator throughout the load. Most units display a percentage bar or step counter. If the progress stalls for longer than the manufacturer-specified timeout, do not cycle power immediately. Consult the troubleshooting section of the load procedure for stall recovery steps.',
      'After the load completes, the unit will typically restart automatically. Allow the full boot sequence to complete before interacting with the unit. Premature power cycling during the post-load initialization can corrupt the newly loaded software.',
    ],
    pro_tips: [
      'Turn off all unnecessary avionics and accessories before starting a software load. This reduces electrical bus noise and minimizes the chance of voltage transients during the write process.',
      'For USB-based loads, use the manufacturer-recommended USB drive format (usually FAT32). Some units are particular about drive size and format, and using an incompatible drive is the most common cause of load failures.',
      'Never walk away from a software load in progress. If something goes wrong, the first few minutes of response time can make the difference between a simple retry and a factory return.',
    ],
    references: [
      'Manufacturer-specific software loading procedures (Installation Manual or Service Bulletin)',
      'AC 20-115D — Airborne Software Assurance',
      'FAA Order 8110.49 — Software Approval Guidelines',
      '14 CFR 43.13 — Performance rules for maintenance',
    ],
  },

  '7-04': {
    overview:
      'When a software load fails partway through, the technician must remain calm and follow the manufacturer recovery procedure rather than repeatedly retrying or cycling power randomly. Failed loads can leave a unit in an indeterminate state where the old software is partially overwritten but the new software is not fully written. Recovery procedures vary by manufacturer but generally involve entering a maintenance or bootloader mode and reattempting the load. This task evaluates whether the technician can recognize a failed load, avoid making it worse, and execute the correct recovery steps.',
    study_guide: [
      'A failed load is indicated by an error message, a frozen progress bar, or the unit failing to restart normally after the load attempt. Document the exact error message or failure point before taking any action, as this information is critical for troubleshooting and for the manufacturer technical support team if escalation is needed.',
      'The most common causes of load failures are corrupted source media, incompatible USB drives, insufficient power during the write cycle, and attempting to load software that is not compatible with the hardware revision. Check the source media integrity first by verifying checksums if available, or by trying a fresh download of the software files.',
      'Most modern avionics units have a bootloader that remains intact even after a failed application software load. The bootloader provides a recovery path to reattempt the load. Access the bootloader using the manufacturer-specified key combination or power-up sequence, which is documented in the maintenance manual or service bulletin.',
      'If repeated recovery attempts fail, contact the manufacturer technical support before sending the unit for repair. Many field-level recovery issues can be resolved over the phone with guidance from the manufacturer engineering team, saving the cost and downtime of a factory return.',
    ],
    pro_tips: [
      'When a load fails, resist the urge to immediately retry. Take two minutes to verify your media, check your power source, and re-read the load procedure. Most repeat failures occur because the root cause was not addressed before retrying.',
      'Keep the manufacturer tech support number programmed in your phone. During a failed load with an aircraft on the schedule, a five-minute call to tech support can save hours of guesswork.',
      'If you are loading from a USB drive and the load fails, try a different USB drive before anything else. USB drive incompatibility is responsible for a large percentage of load failures, especially with drives larger than 32 GB.',
    ],
    references: [
      'Manufacturer-specific recovery procedures (Service Bulletin or Maintenance Manual)',
      'AC 20-115D — Airborne Software Assurance',
      '14 CFR 43.13 — Performance rules for maintenance',
      'Manufacturer technical support resources',
    ],
  },

  '7-05': {
    overview:
      'After any software load, the technician must verify that the correct software version and configuration are active on the unit. This goes beyond simply confirming the load completed without errors. The technician must navigate to the unit status or diagnostic pages to confirm the software part number and version match what was intended, verify that the aircraft-specific configuration is intact, and confirm that all licensed or optional features are still activated. Failing to verify can result in an aircraft dispatching with the wrong software version or missing configuration parameters.',
    study_guide: [
      'Navigate to the unit software status page, which is typically found in a setup, maintenance, or diagnostic menu. Compare the displayed software part number and version string character by character against the approved configuration document, STC data, or service bulletin that authorized the update.',
      'Check that the aircraft-specific configuration has survived the update. This includes autopilot personality settings, V-speed values, fuel capacity entries, and equipment option flags. Compare against your pre-update backup documentation or the approved configuration worksheet from the original installation.',
      'Verify that all licensed features and optional capabilities are still active. Some software updates reset feature activation keys or subscription flags. If the aircraft had WAAS LPV capability, synthetic vision, or datalink weather enabled before the update, confirm each feature is still available and functional.',
      'Document the verified software version in your work records. The final logbook entry for the software update must reference the specific software part number installed, as this is the approved configuration that the return-to-service statement covers.',
    ],
    pro_tips: [
      'Create a post-update checklist for each unit type you commonly service. Include every configuration parameter and feature flag that needs verification. It is easy to miss a single setting when you are checking thirty parameters from memory.',
      'If the configuration was lost during the update, restore it from your pre-update backup before flight. Do not attempt to manually re-enter configuration parameters from memory. Even one wrong digit in a V-speed or weight limit can create a safety hazard.',
      'Screenshot or photograph the software version page after verification. This provides a permanent record that matches your logbook entry and can resolve any future questions about what was installed.',
    ],
    references: [
      'Manufacturer Installation Manual — configuration verification procedures',
      'Applicable STC data — approved software configurations',
      'AC 20-115D — Airborne Software Assurance',
      '14 CFR 43.13 — Performance rules for maintenance',
      '14 CFR 43.9 — Content, form, and disposition of maintenance records',
    ],
  },

  '7-06': {
    overview:
      'A software update can affect any function that the unit provides, including functions that interface with other systems in the aircraft. The post-update operational test must go beyond verifying that the unit powers up and displays correctly. The technician must perform the complete operational test specified in the maintenance manual, paying special attention to interfaces with other avionics, autopilot coupling, sensor inputs, and any function that changed in the new software release notes. This task ensures the technician understands that software changes can have system-wide effects.',
    study_guide: [
      'Follow the operational test procedure in the aircraft or unit maintenance manual. This procedure is designed to exercise all functions of the unit and verify correct operation after maintenance. Do not abbreviate the test procedure, even if the software update was described as minor. A one-line code change can affect system behavior in unexpected ways.',
      'Pay special attention to interfaces with other systems. If the updated unit provides roll steering to the autopilot, verify autopilot coupling. If it provides data to a display, verify the display shows correct information. If it receives sensor inputs, verify all sensor data is being processed correctly.',
      'Review the software release notes for any changed functionality, new features, or known issues. The release notes often specify additional test steps beyond the standard operational check. They may also document behavioral changes that the pilot needs to be briefed on.',
      'Perform regression testing on functions that were not targeted by the update. Software changes can inadvertently affect unrelated functions. If the update targeted the GPS engine, still verify that the COM radio interface, display brightness, and other unrelated functions work correctly.',
    ],
    pro_tips: [
      'Read the release notes before you start the update, not after. If the release notes mention a new test requirement or a changed procedure, you need to be prepared for it before the update is installed.',
      'If you find a discrepancy during post-update testing, document it precisely before contacting the manufacturer. A detailed description of what is wrong, what you expected, and what you observed will dramatically speed up the tech support process.',
      'After the update, run the unit through a complete power cycle and verify all functions again. Some issues only appear after a cold start, not after the warm restart that follows the software load.',
    ],
    references: [
      'Aircraft or unit Maintenance Manual — operational test procedures',
      'Manufacturer software release notes',
      'Applicable STC data — post-installation test requirements',
      '14 CFR 43.13 — Performance rules for maintenance',
    ],
  },

  '7-07': {
    overview:
      'Every avionics unit installed in a certificated aircraft must conform to an approved configuration, which includes specific hardware and software part numbers, modification status, and option settings. The technician must be able to locate the documentation that defines what software and configuration is approved for a given installation, whether that is an STC, a Type Certificate Data Sheet supplement, a field approval, or the original equipment manufacturer installation data. Understanding where to find and how to interpret this documentation is fundamental to ensuring the aircraft remains in an airworthy condition after any software or configuration change.',
    study_guide: [
      'The approved software configuration for an installation is defined by the approved data that authorized the installation. For STC installations, the STC data package specifies the approved software part numbers and versions. For TC-holder installations, the aircraft Type Certificate Data Sheet or the equipment manufacturer ICA defines the approved configuration.',
      'Configuration modules, personality EEPROMs, and configuration files contain aircraft-specific settings that customize a generic avionics unit for a particular airframe. These are considered part of the approved configuration and must match the installation data. Changing a configuration module without approved data is effectively an unauthorized modification.',
      'The equipment list in the aircraft flight manual or a supplemental equipment list may reference specific software configurations. This is another source of approved configuration data, particularly for equipment that affects aircraft performance or operating limitations.',
      'When multiple STCs are stacked on the same aircraft, software compatibility between the units installed under different STCs must be verified. Each STC holder is responsible only for the equipment in their STC, so the installing shop must verify cross-STC compatibility using compatibility letters or engineering analysis.',
    ],
    pro_tips: [
      'Build a configuration control file for each aircraft you maintain regularly. List every avionics unit, its part number, software version, and the approved data that authorizes its installation. When it is time for an update, the approved configuration is already documented.',
      'If you cannot find approved data that authorizes a specific software version for an installation, do not load it. Contact the STC holder or the manufacturer to confirm what is approved. Installing unapproved software can void the STC and affect the aircraft airworthiness certificate.',
      'Pay attention to Service Bulletin effectivity. Not all software updates apply to all serial numbers or hardware revisions. A Service Bulletin may authorize a software version for units above a certain serial number only.',
    ],
    references: [
      '14 CFR 21.305 — TSO marking and approval',
      '14 CFR 43.13 — Performance rules for maintenance',
      '14 CFR 91.403 — General maintenance requirements',
      'Applicable STC data packages — approved configurations',
      'FAA Order 8300.10 — Airworthiness Inspector Handbook, Chapter 43 (approved data)',
    ],
  },

  // ── Category 8: Documentation & Compliance ────────────────────────────

  '8-01': {
    overview:
      'A 91.411 logbook entry documents the completion of a pitot-static system test and altimeter certification as required by 14 CFR 91.411 for IFR flight. This entry must contain specific elements defined by Part 43.9 and Part 43.11, including the date of the test, a description of the work performed, the test data showing the altimeter met tolerance at each required test point, the specific regulation (91.411) under which the test was performed, and a proper approval for return to service statement. An incomplete or improperly worded logbook entry can ground an aircraft during a ramp check or annual inspection.',
    study_guide: [
      'The required elements of a maintenance record entry under 14 CFR 43.9 include: a description of the work performed (or reference to data acceptable to the Administrator), the date of completion, the name of the person performing the work, their signature, certificate number, and kind of certificate. For a 91.411 entry, the description must specify that the test was performed in accordance with Part 43 Appendix E.',
      'Test data must be recorded in the entry or on an attached test sheet referenced by the entry. The data should include the altimeter readings at each required test point, the tolerance at each point, and whether each point passed. For static system leak tests, record the altitude at which the leak test was performed, the duration, and the measured leak rate.',
      'The approval for return to service statement must reference the specific regulation that required the test. For pitot-static work, the entry should state that the system was tested and found to comply with 14 CFR 91.411 and Part 43 Appendix E. Using the wrong regulation reference (such as citing 91.413 for a pitot-static test) is a common error that indicates a lack of regulatory understanding.',
      'Under Part 145, the repair station uses its own work order system and the return to service is made under the authority of the repair station certificate. The signatory must be authorized by the repair station to approve the work. The entry must still contain all Part 43.9 required elements.',
    ],
    pro_tips: [
      'Develop a standard template for your 91.411 entries that includes all required elements. Using a consistent template prevents you from forgetting an element when you are writing entries at the end of a long day.',
      'Attach the test data printout from your pitot-static test set to the work order and reference it in the logbook entry. A printout is more credible during an audit than hand-written test data, and it provides a permanent record of exactly what was measured.',
      'When writing the description of work, be specific enough that another technician could understand what was done. "Performed 91.411 test" is insufficient. "Performed pitot-static system test and altimeter correlation check per 14 CFR 91.411 and Part 43 Appendix E using Barfield DPS-450 S/N 12345" is complete.',
    ],
    references: [
      '14 CFR 91.411 — Altimeter system and altitude reporting equipment tests and inspections',
      '14 CFR 43.9 — Content, form, and disposition of maintenance records',
      '14 CFR 43.11 — Content, form, and disposition of records for inspections',
      '14 CFR Part 43 Appendix E — Altimeter System Test and Inspection',
      '14 CFR 145.201 — Privileges and limitations of repair stations',
    ],
  },

  '8-02': {
    overview:
      'A 91.413 logbook entry documents the completion of transponder and ADS-B Out testing as required by 14 CFR 91.413 for operation in controlled airspace. Since the 2020 ADS-B Out mandate, transponder testing must include verification of ADS-B Out performance parameters in addition to traditional Mode A, Mode C, and Mode S transponder checks. The entry must document both transponder functionality and ADS-B compliance, referencing the specific test parameters that demonstrate the aircraft meets the requirements of both 91.413 and 91.227. This is a separate entry from the 91.411 pitot-static entry, even when both tests are performed during the same visit.',
    study_guide: [
      'The 91.413 test must be performed every 24 calendar months. The entry must reference 14 CFR 91.413 and Part 43 Appendix F, which specifies the transponder test parameters including reply frequency, reply delay, power output, suppression, and Mode S specific parameters.',
      'ADS-B Out compliance verification is now an integral part of the 91.413 test. The entry must document that ADS-B Out message content, NACp (Navigation Accuracy Category for Position), NIC (Navigation Integrity Category), and SIL (Surveillance Integrity Level) were verified per 14 CFR 91.227 requirements.',
      'Record the specific test parameters in the entry or on an attached test data sheet. This includes transponder reply frequency (1090 MHz for Mode S), power output in watts, and ADS-B message content including the ICAO address, call sign, position source, and integrity parameters. The test set printout should be retained with the work order.',
      'Do not combine the 91.411 and 91.413 entries into a single logbook entry. These are two distinct regulatory requirements with different test procedures and different compliance criteria. Combining them creates confusion about which tests were performed and makes it harder to track compliance dates independently.',
    ],
    pro_tips: [
      'Use separate logbook stickers or entries for 91.411 and 91.413 testing, even when both are done at the same time. This makes compliance tracking straightforward for the aircraft owner and any future inspector.',
      'Always test ADS-B Out with the GPS position source active and verified. A transponder can pass all Mode S tests while ADS-B Out fails because the GPS is not providing valid position data to the transponder. Test the complete chain.',
      'Document the ADS-B test set model and serial number in your entry. As ADS-B test standards evolve, having a record of what test equipment was used can be important for compliance verification.',
    ],
    references: [
      '14 CFR 91.413 — ATC transponder tests and inspections',
      '14 CFR 91.227 — Automatic Dependent Surveillance-Broadcast (ADS-B) Out equipment performance requirements',
      '14 CFR Part 43 Appendix F — ATC Transponder Tests and Inspections',
      '14 CFR 43.9 — Content, form, and disposition of maintenance records',
      'AC 43-6C — Altitude Reporting Equipment and Transponder System Maintenance and Inspection Practices',
    ],
  },

  '8-03': {
    overview:
      'When installing avionics equipment, the logbook entry must reference the approved data that authorized the installation, whether that is an STC, a field approval, the aircraft manufacturer installation instructions, or AC 43.13 for minor alterations. The entry must describe the equipment installed, reference the specific approved data by document number and revision, and include a return to service statement that covers both the installation work and any required functional tests. This task tests the technician\'s ability to write a complete installation entry that would withstand scrutiny from an FAA inspector or during an annual inspection review.',
    study_guide: [
      'Every installation requires approved data. The most common source of approved data for avionics installations is an STC (Supplemental Type Certificate). The logbook entry must reference the STC number, revision level, and the specific aircraft applicability. For example: "Installed per STC SA12345NY, Rev 3, applicable to Cessna 172S."',
      'The description of work must identify the equipment installed by manufacturer, model, part number, and serial number. If equipment was removed, identify the removed equipment similarly. Include the aircraft location of the installation and any airframe modifications performed (antenna holes, rack mounting, wire routing).',
      'The return to service statement for an installation must cover both the physical installation and the operational verification. The entry should state that the equipment was installed per the approved data, a functional test was performed per the manufacturer installation manual, and the aircraft is approved for return to service.',
      'If the installation is a major alteration (which most avionics installations under STC are), an FAA Form 337 is also required. The logbook entry should reference the 337 form number. The 337 and the logbook entry are companion documents; neither replaces the other.',
    ],
    pro_tips: [
      'Write your logbook entry as if the next person reading it knows nothing about the job. Include enough detail that an inspector can determine what was installed, why it was approved, and what testing was done, without needing to call you.',
      'Always reference the approved data revision level in addition to the document number. Approved data gets revised, and the revision that was current at the time of installation is the one that authorized your work.',
      'If you are stacking multiple STCs on the same aircraft, document the compatibility verification in your work order notes. Note which STCs are installed and how you confirmed they are compatible with each other.',
    ],
    references: [
      '14 CFR 43.9 — Content, form, and disposition of maintenance records',
      '14 CFR 43.3 — Persons authorized to perform maintenance',
      '14 CFR 21.113 — Requirement for STC for major alterations',
      'FAA Order 8300.10 — Airworthiness Inspector Handbook (approved data)',
      'AC 43-210A — Standardized Procedures for Requesting Field Approval of Data',
    ],
  },

  '8-04': {
    overview:
      'FAA Form 337 (Major Repair and Alteration) is required for any major repair or major alteration performed on a certificated aircraft. Most avionics installations qualify as major alterations because they change the aircraft type design by adding or modifying equipment, antennas, wiring, and circuit breakers. The technician must be able to correctly complete all blocks of the form, including the proper classification of the work, a complete description with weight and balance impact, and the correct approval block signatures. An improperly completed 337 is one of the most common findings during FAA surveillance of repair stations.',
    study_guide: [
      'Block 1 identifies the aircraft by registration, make, model, and serial number. Block 2 identifies the owner. Block 3 captures the name and address of the repair station or person performing the work. Block 4 classifies the work as a major repair or major alteration, and identifies the unit (airframe, powerplant, propeller, or appliance) affected.',
      'Block 5 is the description of the work. This must include a detailed description of the alteration or repair, the approved data used (STC number, engineering order, etc.), and materials used. For avionics installations, this includes equipment part numbers, antenna types and locations, wiring gauge and routing, circuit breaker size and location, and weight and balance data showing the change in empty weight and moment.',
      'Block 6 is the approval block. For work done under an STC at a Part 145 repair station, the repair station inspector or authorized person signs Block 6, approving the work for return to service. The approval authority and certificate number must be entered correctly. If the work was a field approval, the FSDO must sign Block 6.',
      'The 337 must be submitted to the FAA Aircraft Registration Branch in Oklahoma City (the original goes to the FAA, a copy stays with the aircraft records). Failing to submit the 337 does not invalidate the work, but it is a regulatory violation and can cause problems during aircraft sale or registration transfer.',
    ],
    pro_tips: [
      'Fill out the 337 as you do the work, not after. If you wait until the end of the job, you will inevitably forget a detail about antenna location, wire gauge, or circuit breaker size that belongs in Block 5.',
      'Include a weight and balance change calculation even if the net change is less than one pound. Showing that you considered weight and balance demonstrates thoroughness and is specifically required by the form instructions.',
      'Keep a copy of every 337 your shop produces in a permanent file organized by tail number. You will need these when the same aircraft comes back for additional work, and they are invaluable during annual inspection reviews.',
    ],
    references: [
      '14 CFR 43.9 — Content, form, and disposition of maintenance records',
      'FAA Form 337 instructions — Major Repair and Alteration',
      'FAA Order 8300.10 — Airworthiness Inspector Handbook, Chapter 54',
      'AC 43.9-1G — Instructions for Completion of FAA Form 337',
      '14 CFR Part 43 Appendix B — Recording of Major Repairs and Major Alterations',
    ],
  },

  '8-05': {
    overview:
      'The distinction between a major alteration and a minor alteration determines the documentation requirements, the approved data requirements, and who has the authority to approve the work. A major alteration requires a 337 form, approved data (STC, field approval, or TC holder data), and may require IA or repair station authority for approval. A minor alteration requires only a logbook entry and can be approved by an A&P mechanic. Misjudging this classification can result in either performing a major alteration without proper approval or unnecessarily burdening a minor alteration with extra paperwork. Both errors have regulatory consequences.',
    study_guide: [
      'The definitions are found in 14 CFR Part 1: a major alteration is one that is not done according to accepted practices or that might appreciably affect weight, balance, structural strength, performance, powerplant operation, flight characteristics, or other qualities affecting airworthiness. AC 43.13-2B provides additional guidance and examples, but the regulatory definition in Part 1 is the legal standard.',
      'For avionics work, most new equipment installations are major alterations because they typically involve cutting antenna holes (structural), adding circuit breakers (electrical system), changing weight and balance, and adding equipment not in the original type design. Replacing an existing unit with a like-for-like replacement using the same mounting, wiring, and antenna is generally maintenance, not an alteration at all.',
      'A minor alteration is one that has no appreciable effect on airworthiness and is done according to accepted practices. Examples might include replacing a headset jack with the same type, or adding a USB charging port in a location that does not affect any aircraft system. When in doubt, classify the work as major. It is better to over-document than to under-document.',
      'The documentation requirements are the key practical difference. Major alterations require a 337 form, approved data, and appropriate approval authority. Minor alterations require only a logbook entry referencing acceptable data such as AC 43.13 or manufacturer instructions. Understanding this distinction is essential for every technician.',
    ],
    pro_tips: [
      'When in doubt, call your FSDO or the STC holder. Misclassifying a major alteration as minor can result in a violation, but asking for guidance beforehand is always acceptable and shows professionalism.',
      'The most common gray area in avionics is antenna installations. If you are drilling a new hole in the aircraft skin for an antenna, it is almost certainly a major alteration regardless of how small the antenna is, because you are affecting structural integrity.',
      'Keep a reference list of common avionics tasks and their major/minor classification based on your FSDO guidance. Different FSDOs may interpret borderline cases differently, so know what your local FSDO expects.',
    ],
    references: [
      '14 CFR Part 1.1 — Definitions (major alteration, major repair, minor alteration, minor repair)',
      '14 CFR Part 43 Appendix A — Major Alterations, Major Repairs, and Preventive Maintenance',
      'AC 43.13-2B — Acceptable Methods for Alterations',
      'FAA Order 8300.10 — Airworthiness Inspector Handbook',
      '14 CFR 43.3 — Persons authorized to perform maintenance',
    ],
  },

  '8-06': {
    overview:
      'Every avionics installation must be performed using approved data. The technician must understand the hierarchy of approved data sources and be able to verify that a given piece of data is actually approved for the intended installation. Approved data includes STCs, Type Certificate holder data (service bulletins, service letters, engineering orders), TSO authorizations, field approvals from the FSDO, and in limited cases AC 43.13 for minor alterations. Using unapproved data or failing to verify that data is approved for the specific aircraft and installation is one of the most serious regulatory errors a technician can make.',
    study_guide: [
      'An STC (Supplemental Type Certificate) is the most common form of approved data for aftermarket avionics installations. The STC must be applicable to the specific aircraft make, model, and series. Always verify applicability in the STC data package itself, not just from a marketing brochure or sales listing. The STC package includes the approved model list, installation instructions, wiring diagrams, and Instructions for Continued Airworthiness.',
      'A TSO (Technical Standard Order) authorizes the manufacture of a part to a specific performance standard, but a TSO alone does not approve the installation of that part on any particular aircraft. A TSO-authorized GPS receiver still requires an STC, field approval, or TC holder data to be installed. Confusing TSO authorization with installation approval is a common error.',
      'AC 43.13-2B provides acceptable methods for performing minor alterations without specific STC or TC holder data. However, AC 43.13 is only acceptable data for minor alterations. Using AC 43.13 as the sole basis for a major alteration is not acceptable and requires additional approved data.',
      'Field approvals (FAA Form 8110-3 or FSDO-issued DER-approved data) are another path for installations that do not have an STC. The process involves submitting engineering data to the FSDO for review and approval. This is more common for one-off or experimental installations and takes significantly more time than using an existing STC.',
    ],
    pro_tips: [
      'Before starting any installation job, verify the approved data is in your hands and is applicable to the specific aircraft. Do not start pulling panels based on a verbal confirmation that "the STC covers that airplane." Read the approved model list yourself.',
      'When stacking multiple STCs, verify that the STC holders have issued compatibility statements or that the STCs do not conflict. Two STCs may both be individually approved for an aircraft but may not be compatible when installed together, particularly if they share wiring, circuit breakers, or antenna locations.',
      'Keep your STC library current. STC holders issue revisions that may change installation procedures, wiring diagrams, or approved model lists. Using an outdated revision of an STC is the same as using unapproved data.',
    ],
    references: [
      '14 CFR 21.113 — Requirement for supplemental type certificate',
      '14 CFR 21.305 — TSO approval requirements',
      'AC 43.13-2B — Acceptable Methods, Techniques, and Practices for Aircraft Alterations',
      'AC 43-210A — Standardized Procedures for Requesting Field Approval of Data',
      'FAA Order 8110.4C — Type Certification',
      'FAA Order 8300.10 — Airworthiness Inspector Handbook (Chapter 43)',
    ],
  },

  '8-07': {
    overview:
      'Airworthiness Directives (ADs) are legally enforceable rules issued by the FAA when an unsafe condition exists in a product. Before performing any avionics work, the technician must research applicable ADs to determine if any affect the equipment being installed, removed, or maintained. AD compliance is not optional. An aircraft cannot be returned to service with a known non-compliance. The technician must be able to search the AD database, determine applicability to the specific aircraft and equipment, and understand the compliance requirements including terminating actions, recurring inspections, and alternative methods of compliance.',
    study_guide: [
      'ADs are searchable through the FAA Regulatory and Guidance Library (RGL) at rgl.faa.gov, by aircraft make and model, by product type, or by AD number. When researching ADs for an avionics installation, search both the aircraft ADs and the appliance ADs for the specific equipment being installed. An AD may exist against the avionics unit itself, even if there is no AD against the aircraft.',
      'AD applicability is determined by the equipment make, model, and serial number (or part number and effectivity). Read the applicability section of each AD carefully. An AD may apply only to units with specific serial number ranges, specific software versions, or units manufactured before a certain date. Do not assume applicability based on the AD title alone.',
      'Compliance methods in an AD may include inspection, modification, replacement, or operational limitation. Some ADs offer alternative methods of compliance (AMOCs) that may be more practical for a given installation. Some ADs have terminating actions, meaning that performing a specific modification or installing a specific part terminates the recurring requirement of the AD.',
      'AD compliance status must be documented in the aircraft maintenance records. When you install a new avionics unit, check whether any ADs apply to that unit and document the compliance status in the logbook entry. When you remove a unit, check whether the removal affects compliance with any airframe ADs.',
    ],
    pro_tips: [
      'Make AD research part of your standard pre-installation checklist. Run an AD search for both the aircraft and the equipment before you quote the job. An applicable AD can significantly change the scope and cost of an installation.',
      'Subscribe to AD email notifications for the aircraft types and equipment you commonly service. This keeps you current on new ADs without having to manually search the database regularly.',
      'When an AD has been superseded, read both the original and the superseding AD. The superseding AD may change the compliance requirements, applicability, or available AMOCs. Do not assume the new AD is identical to the old one.',
    ],
    references: [
      '14 CFR 39 — Airworthiness Directives',
      '14 CFR 91.403(a) — Owner responsibility for AD compliance',
      '14 CFR 43.16 — Airworthiness limitations',
      'FAA RGL (Regulatory and Guidance Library) — AD search at rgl.faa.gov',
      'AC 39-7D — Airworthiness Directives',
    ],
  },

  '8-08': {
    overview:
      'Return to service authority determines who can sign off completed maintenance and approve an aircraft for flight. The answer depends on the type of work performed (maintenance vs. inspection vs. major alteration), the certificate held by the person or organization (A&P, IA, Part 145 repair station), and the scope of their authorization. A technician who signs off work without proper authority has committed a regulatory violation, and the aircraft may not be legally airworthy even if the work itself was performed correctly. Understanding the authority structure is essential for every avionics technician working in a Part 145 environment.',
    study_guide: [
      'An A&P mechanic (14 CFR 43.3 and 43.7) can perform and approve maintenance, preventive maintenance, and minor alterations on aircraft. An A&P can also perform major alterations and major repairs, but cannot approve them for return to service unless they also hold an Inspection Authorization (IA) or the work is done under a Part 145 repair station certificate.',
      'An Inspection Authorization (IA) holder, under 14 CFR 43.3 and 43.7, can approve major repairs, major alterations, and annual inspections for return to service. The IA is an additional authorization beyond the A&P certificate and requires annual renewal based on activity requirements.',
      'A Part 145 repair station (14 CFR 145.201) can perform and approve any maintenance, preventive maintenance, and alterations within the scope of its operations specifications and ratings. The repair station designates specific individuals as authorized to approve work for return to service. These individuals exercise the authority of the repair station certificate, not their personal A&P authority, even though they are typically A&P holders.',
      'The scope of a Part 145 repair station is defined by its ratings (Limited, Airframe, Powerplant, Accessory, or specialized ratings) and its operations specifications. A repair station with a Limited Instrument rating can approve avionics work within that scope but cannot approve airframe structural repairs. Always verify that the work being performed falls within your repair station\'s authorized scope.',
    ],
    pro_tips: [
      'Know exactly what your repair station operations specifications authorize. If a job falls outside your ratings, you cannot approve it for return to service, even if you are fully capable of performing the work. Subcontracting to an appropriately rated facility is the correct path.',
      'When signing off work under Part 145 authority, use the repair station certificate number in your logbook entry, not your personal A&P number. You are exercising repair station authority, and the entry must reflect that.',
      'If you are an A&P working independently (not under a repair station), remember that you cannot approve major alterations or major repairs for return to service without an IA. This is the most commonly misunderstood limitation of the A&P certificate.',
    ],
    references: [
      '14 CFR 43.3 — Persons authorized to perform maintenance, preventive maintenance, rebuilding, and alteration',
      '14 CFR 43.7 — Persons authorized to approve aircraft, airframes, aircraft engines, propellers, appliances, or component parts for return to service',
      '14 CFR 145.201 — Privileges and limitations of certificated repair stations',
      '14 CFR 65.81 — General privileges and limitations of A&P mechanics',
      '14 CFR 65.95 — Inspection authorization privileges and limitations',
      'FAA Order 8900.1 — Flight Standards Information Management System (return to service guidance)',
    ],
  },
}
