// import image1 from "../images/dataScience.jpg";
// import image2 from "../images/img 2.jpg";
// import image3 from "../images/img 3.jpg";
// import image4 from "../images/digitalMarketing.jpg";
// import { physics_questions } from "./physics_questions";
// import { chemistry_questions } from "./chemistry_questions";
// import { mathematics_questions } from "./mathematics_questions";
// import { ict_questions } from "./ict_questions";
// import { shuffleArray } from "../reuseable functions/shuffleArray";

const availableQuizzesRaw = [
  {
    image: "/images/dataScience.jpg",
    title: "Physics",
    level: "Intermediate",
    time: "25",
    questions: [
      {
        question:
          "What is the work done when a force of 10 N moves an object 5 meters in the direction of the force?",
        options: ["2 J", "5 J", "50 J", "0.5 J"],
        correct_answer: "50 J",
        explanation:
          "Work done = Force × Distance = 10 N × 5 m = 50 J (joules). Work is only done when the object moves in the direction of the force.",
      },
      {
        question:
          "A car accelerates from 10 m/s to 30 m/s in 5 seconds. What is its acceleration?",
        options: ["2 m/s²", "4 m/s²", "6 m/s²", "8 m/s²"],
        correct_answer: "4 m/s²",
        explanation:
          "Acceleration = (Final velocity - Initial velocity)/Time = (30 m/s - 10 m/s)/5 s = 20 m/s / 5 s = 4 m/s².",
      },
      {
        question: "What is the momentum of a 5 kg object moving at 10 m/s?",
        options: ["0.5 kg·m/s", "2 kg·m/s", "50 kg·m/s", "500 kg·m/s"],
        correct_answer: "50 kg·m/s",
        explanation:
          "Momentum (p) = mass × velocity = 5 kg × 10 m/s = 50 kg·m/s.",
      },
      {
        question: "If the frequency of a wave is 50 Hz, what is its period?",
        options: ["0.02 s", "0.05 s", "0.2 s", "5 s"],
        correct_answer: "0.02 s",
        explanation:
          "Period (T) is the reciprocal of frequency (f): T = 1/f = 1/50 Hz = 0.02 seconds.",
      },
      {
        question:
          "What is the power consumed by a 100 Ω resistor with 10 V across it?",
        options: ["0.1 W", "1 W", "10 W", "100 W"],
        correct_answer: "1 W",
        explanation: "Power (P) = V²/R = (10 V)² / 100 Ω = 100 / 100 = 1 watt.",
      },
      {
        question:
          "Which of these is conserved in an elastic collision but not in an inelastic collision?",
        options: [
          "Momentum",
          "Kinetic energy",
          "Potential energy",
          "Total energy",
        ],
        correct_answer: "Kinetic energy",
        explanation:
          "In an elastic collision, both momentum and kinetic energy are conserved. In an inelastic collision, momentum is conserved but kinetic energy is not (some is converted to other forms like heat).",
      },
      {
        question:
          "What is the efficiency of a machine that outputs 80 J of work for every 100 J of input energy?",
        options: ["80%", "125%", "20%", "180%"],
        correct_answer: "80%",
        explanation:
          "Efficiency = (Useful energy output / Total energy input) × 100% = (80 J / 100 J) × 100% = 80%.",
      },
      {
        question:
          "A 2 kg mass is lifted 10 meters vertically. What is the increase in its gravitational potential energy? (g = 9.81 m/s²)",
        options: ["19.62 J", "98.1 J", "196.2 J", "20 J"],
        correct_answer: "196.2 J",
        explanation:
          "Gravitational potential energy (PE) = mgh = 2 kg × 9.81 m/s² × 10 m = 196.2 J.",
      },
      {
        question:
          "What is the wavelength of a 300 MHz radio wave? (speed of light = 3×10⁸ m/s)",
        options: ["1 m", "10 m", "100 m", "0.1 m"],
        correct_answer: "1 m",
        explanation:
          "Wavelength (λ) = speed of light (c) / frequency (f) = (3×10⁸ m/s) / (300×10⁶ Hz) = 1 meter.",
      },
      {
        question:
          "If the current through a resistor is 2 A and the voltage across it is 12 V, what is the resistance?",
        options: ["0.17 Ω", "6 Ω", "24 Ω", "14 Ω"],
        correct_answer: "6 Ω",
        explanation: "Using Ohm's Law: R = V/I = 12 V / 2 A = 6 ohms.",
      },
      {
        question:
          "What is the centripetal acceleration of an object moving in a circle of radius 5 m at 10 m/s?",
        options: ["2 m/s²", "20 m/s²", "50 m/s²", "200 m/s²"],
        correct_answer: "20 m/s²",
        explanation:
          "Centripetal acceleration a = v²/r = (10 m/s)² / 5 m = 100 / 5 = 20 m/s².",
      },
      {
        question:
          "Which temperature scale has its zero point at absolute zero?",
        options: ["Fahrenheit", "Celsius", "Kelvin", "Rankine"],
        correct_answer: "Kelvin",
        explanation:
          "The Kelvin scale is an absolute temperature scale with its zero point at absolute zero (-273.15°C), the theoretical temperature at which all thermal motion ceases.",
      },
      {
        question:
          "What is the equivalent resistance of two 10 Ω resistors in parallel?",
        options: ["5 Ω", "10 Ω", "20 Ω", "100 Ω"],
        correct_answer: "5 Ω",
        explanation:
          "For parallel resistors: 1/R_total = 1/R₁ + 1/R₂ = 1/10 + 1/10 = 2/10 → R_total = 10/2 = 5 Ω.",
      },
      {
        question:
          "A ray of light enters glass from air. What happens to its speed and wavelength?",
        options: [
          "Both decrease",
          "Speed decreases, wavelength decreases",
          "Speed decreases, wavelength increases",
          "Speed increases, wavelength decreases",
        ],
        correct_answer: "Both decrease",
        explanation:
          "When light enters a denser medium (like glass from air), its speed decreases, and since frequency remains constant, the wavelength must also decrease (v = fλ).",
      },
      {
        question:
          "What is the force required to keep a 1000 kg car moving at constant velocity on a frictionless surface?",
        options: ["0 N", "1000 N", "9800 N", "Depends on the speed"],
        correct_answer: "0 N",
        explanation:
          "According to Newton's first law, no net force is needed to maintain constant velocity (including zero) in the absence of friction or other forces.",
      },
      {
        question:
          "If the half-life of a radioactive element is 10 years, what fraction remains after 30 years?",
        options: ["1/2", "1/4", "1/8", "1/16"],
        correct_answer: "1/8",
        explanation:
          "30 years represents 3 half-lives (30/10). After each half-life, the quantity halves: (1/2)³ = 1/8 remains after 3 half-lives.",
      },
      {
        question:
          "What is the energy of a photon with frequency 6×10¹⁴ Hz? (h = 6.63×10⁻³⁴ J·s)",
        options: [
          "3.98×10⁻¹⁹ J",
          "1.10×10⁻⁴⁸ J",
          "6.63×10⁻²⁰ J",
          "9.95×10⁻¹⁰ J",
        ],
        correct_answer: "3.98×10⁻¹⁹ J",
        explanation:
          "Photon energy E = hf = (6.63×10⁻³⁴ J·s) × (6×10¹⁴ Hz) = 3.978×10⁻¹⁹ J ≈ 3.98×10⁻¹⁹ J.",
      },
      {
        question: "Which principle explains why airplanes can fly?",
        options: [
          "Pascal's principle",
          "Bernoulli's principle",
          "Archimedes' principle",
          "Heisenberg's principle",
        ],
        correct_answer: "Bernoulli's principle",
        explanation:
          "Bernoulli's principle states that an increase in fluid speed occurs simultaneously with a decrease in pressure, which helps create lift on airplane wings.",
      },
      {
        question:
          "What is the angular velocity (in rad/s) of a wheel rotating at 30 rpm?",
        options: ["π", "2π", "3π", "4π"],
        correct_answer: "π",
        explanation:
          "First convert rpm to rps: 30 rpm = 0.5 rps. Angular velocity ω = 2π × frequency = 2π × 0.5 = π rad/s.",
      },
      {
        question:
          "A sound wave with frequency 500 Hz travels at 340 m/s. What is its wavelength?",
        options: ["0.68 m", "1.47 m", "170 m", "500 m"],
        correct_answer: "0.68 m",
        explanation: "Wavelength λ = v/f = 340 m/s / 500 Hz = 0.68 meters.",
      },
      {
        question:
          "What is the capacitance of a capacitor that stores 2 μC of charge at 4 V?",
        options: ["0.5 μF", "2 μF", "4 μF", "8 μF"],
        correct_answer: "0.5 μF",
        explanation:
          "Capacitance C = Q/V = (2 μC)/(4 V) = 0.5 μF (microfarads).",
      },
      {
        question:
          "Which law relates the pressure and volume of a gas at constant temperature?",
        options: [
          "Charles's Law",
          "Boyle's Law",
          "Gay-Lussac's Law",
          "Avogadro's Law",
        ],
        correct_answer: "Boyle's Law",
        explanation:
          "Boyle's Law states that at constant temperature, the pressure of a given mass of gas is inversely proportional to its volume (P ∝ 1/V).",
      },
      {
        question:
          "What is the escape velocity from Earth's surface? (Earth's radius ≈ 6.37×10⁶ m, g ≈ 9.81 m/s²)",
        options: ["7.9 km/s", "11.2 km/s", "3.1 km/s", "15.8 km/s"],
        correct_answer: "11.2 km/s",
        explanation:
          "Escape velocity vₑ = √(2GM/R) = √(2gR) ≈ √(2 × 9.81 × 6.37×10⁶) ≈ 11,180 m/s or 11.2 km/s.",
      },
      {
        question:
          "Which phenomenon causes the apparent position of a star to shift when viewed from different positions of Earth's orbit?",
        options: [
          "Doppler effect",
          "Stellar parallax",
          "Gravitational lensing",
          "Redshift",
        ],
        correct_answer: "Stellar parallax",
        explanation:
          "Stellar parallax is the apparent shift in position of a nearby star against distant background objects when viewed from different positions in Earth's orbit, used to measure stellar distances.",
      },
      {
        question:
          "What is the de Broglie wavelength of an electron moving at 1% the speed of light? (mₑ = 9.11×10⁻³¹ kg, c = 3×10⁸ m/s, h = 6.63×10⁻³⁴ J·s)",
        options: [
          "2.43×10⁻¹⁰ m",
          "2.43×10⁻¹² m",
          "4.86×10⁻¹² m",
          "4.86×10⁻¹⁰ m",
        ],
        correct_answer: "2.43×10⁻¹⁰ m",
        explanation:
          "λ = h/p = h/(mv) = (6.63×10⁻³⁴)/(9.11×10⁻³¹ × 0.01×3×10⁸) ≈ 2.43×10⁻¹⁰ m.",
      },
      {
        question: "Which thermodynamic process occurs at constant temperature?",
        options: ["Adiabatic", "Isobaric", "Isothermal", "Isochoric"],
        correct_answer: "Isothermal",
        explanation:
          "An isothermal process occurs at constant temperature, typically involving heat transfer to maintain equilibrium with a thermal reservoir.",
      },
      {
        question:
          "What is the magnification of a convex lens with focal length 10 cm when the object is placed 15 cm from the lens?",
        options: ["0.5", "1", "2", "3"],
        correct_answer: "2",
        explanation:
          "Using lens formula 1/f = 1/v - 1/u, then M = v/u. Calculations give v = 30 cm, so M = 30/15 = 2.",
      },
      {
        question: "Which particle mediates the electromagnetic force?",
        options: ["Graviton", "Photon", "Gluon", "W/Z boson"],
        correct_answer: "Photon",
        explanation:
          "The photon is the gauge boson (force carrier) for the electromagnetic force in quantum field theory.",
      },
      {
        question: "What is the power factor of a purely resistive AC circuit?",
        options: ["0", "0.5", "1", "∞"],
        correct_answer: "1",
        explanation:
          "In a purely resistive AC circuit, the current and voltage are in phase, resulting in a power factor of 1 (cos 0° = 1).",
      },
      {
        question:
          "Which principle states that no two electrons in an atom can have the same set of quantum numbers?",
        options: [
          "Heisenberg's principle",
          "Pauli exclusion principle",
          "Aufbau principle",
          "Hund's rule",
        ],
        correct_answer: "Pauli exclusion principle",
        explanation:
          "The Pauli exclusion principle states that no two fermions (including electrons) can occupy the same quantum state simultaneously in a quantum system.",
      },
    ],
    numbOfQuestions: "20",
    rating: 4.5,
    attempts: 100,
  },
  {
    image: "/images/img2.jpg",
    title: "Chemistry",
    level: "Beginner",
    time: "30",
    numbOfQuestions: "15",
    questions: [
      {
        question:
          "What is the smallest unit of matter that retains the properties of an element?",
        options: ["Atom", "Molecule", "Cell", "Proton"],
        correct_answer: "Atom",
        explanation:
          "An atom is the smallest unit of matter that retains all the chemical properties of an element. Atoms combine to form molecules.",
      },
      {
        question:
          "Which of these is NOT one of the three main states of matter?",
        options: ["Solid", "Liquid", "Gas", "Plasma"],
        correct_answer: "Plasma",
        explanation:
          "The three main states of matter are solid, liquid, and gas. Plasma is sometimes considered a fourth state but is not one of the main three.",
      },
      {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct_answer: "Au",
        explanation:
          "The chemical symbol for gold is Au, from the Latin word 'aurum'. Ag is the symbol for silver (from 'argentum').",
      },
      {
        question: "What does the pH scale measure?",
        options: ["Temperature", "Pressure", "Acidity/basicity", "Density"],
        correct_answer: "Acidity/basicity",
        explanation:
          "The pH scale measures how acidic or basic a solution is, ranging from 0 (very acidic) to 14 (very basic), with 7 being neutral.",
      },
      {
        question: "Which gas do plants absorb during photosynthesis?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        correct_answer: "Carbon dioxide",
        explanation:
          "Plants absorb carbon dioxide (CO₂) and release oxygen (O₂) during photosynthesis, the process by which they make their food.",
      },
      {
        question: "What is the chemical formula for water?",
        options: ["HO", "H₂O", "H₂O₂", "H₃O"],
        correct_answer: "H₂O",
        explanation:
          "Water is composed of two hydrogen atoms bonded to one oxygen atom, giving it the chemical formula H₂O.",
      },
      {
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
        correct_answer: "Hydrogen",
        explanation:
          "Hydrogen is the first element on the periodic table with atomic number 1, meaning it has 1 proton in its nucleus.",
      },
      {
        question: "What is the main gas found in the air we breathe?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        correct_answer: "Nitrogen",
        explanation:
          "The air we breathe is about 78% nitrogen, 21% oxygen, and 1% other gases including argon and carbon dioxide.",
      },
      {
        question: "What process changes a liquid to a gas?",
        options: ["Freezing", "Melting", "Evaporation", "Condensation"],
        correct_answer: "Evaporation",
        explanation:
          "Evaporation is the process by which a liquid changes to a gas, typically occurring at temperatures below the boiling point.",
      },
      {
        question: "Which of these is a noble gas?",
        options: ["Oxygen", "Chlorine", "Neon", "Nitrogen"],
        correct_answer: "Neon",
        explanation:
          "Neon is a noble gas (Group 18 element), known for being chemically inert. Other noble gases include helium, argon, and xenon.",
      },
      {
        question: "What is the center of an atom called?",
        options: ["Nebula", "Nucleus", "Core", "Hub"],
        correct_answer: "Nucleus",
        explanation:
          "The nucleus is the dense center of an atom containing protons and neutrons, with electrons orbiting around it.",
      },
      {
        question: "Which of these is a compound?",
        options: ["Oxygen (O₂)", "Gold (Au)", "Salt (NaCl)", "Iron (Fe)"],
        correct_answer: "Salt (NaCl)",
        explanation:
          "Salt (sodium chloride, NaCl) is a compound made of sodium and chlorine atoms chemically bonded together. The others are elements.",
      },
      {
        question: "What is the chemical symbol for sodium?",
        options: ["So", "Sd", "Na", "No"],
        correct_answer: "Na",
        explanation:
          "The chemical symbol for sodium is Na, from the Latin word 'natrium'. This is why table salt is called NaCl (sodium chloride).",
      },
      {
        question: "Which process causes iron to rust?",
        options: ["Oxidation", "Reduction", "Evaporation", "Sublimation"],
        correct_answer: "Oxidation",
        explanation:
          "Rusting is an oxidation reaction where iron reacts with oxygen in the presence of water to form iron oxide.",
      },
      {
        question: "What is the lightest element?",
        options: ["Helium", "Hydrogen", "Oxygen", "Lithium"],
        correct_answer: "Hydrogen",
        explanation:
          "Hydrogen is the lightest element with an atomic weight of about 1.008. It consists of just one proton and one electron.",
      },
      {
        question: "Which gas is produced when metals react with acids?",
        options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"],
        correct_answer: "Hydrogen",
        explanation:
          "When metals react with acids, they typically produce hydrogen gas (H₂) along with a salt.",
      },
      {
        question: "What is the common name for sodium bicarbonate?",
        options: ["Vinegar", "Baking soda", "Table salt", "Bleach"],
        correct_answer: "Baking soda",
        explanation:
          "Sodium bicarbonate (NaHCO₃) is commonly known as baking soda, used in cooking and as an antacid.",
      },
      {
        question: "Which of these is a metal?",
        options: ["Oxygen", "Chlorine", "Copper", "Sulfur"],
        correct_answer: "Copper",
        explanation:
          "Copper is a reddish-brown metal that is ductile and an excellent conductor of electricity. The others are nonmetals.",
      },
      {
        question: "What is the main component of natural gas?",
        options: ["Ethane", "Propane", "Methane", "Butane"],
        correct_answer: "Methane",
        explanation:
          "Natural gas is primarily composed of methane (CH₄), typically 70-90%, along with smaller amounts of other hydrocarbons.",
      },
      {
        question: "Which of these is NOT a subatomic particle?",
        options: ["Proton", "Neutron", "Electron", "Molecule"],
        correct_answer: "Molecule",
        explanation:
          "Protons, neutrons, and electrons are subatomic particles. A molecule is a group of atoms bonded together.",
      },
      {
        question: "What is the chemical formula for table salt?",
        options: ["NaCl", "H₂O", "CO₂", "C₆H₁₂O₆"],
        correct_answer: "NaCl",
        explanation:
          "Table salt is sodium chloride, with the chemical formula NaCl - one sodium atom bonded to one chlorine atom.",
      },
      {
        question: "Which element is essential for combustion?",
        options: ["Nitrogen", "Oxygen", "Carbon dioxide", "Helium"],
        correct_answer: "Oxygen",
        explanation:
          "Oxygen is essential for combustion (burning) to occur. Most fuels require oxygen to sustain the chemical reaction of burning.",
      },
      {
        question:
          "What is the process called when a solid changes directly to a gas?",
        options: ["Evaporation", "Condensation", "Sublimation", "Deposition"],
        correct_answer: "Sublimation",
        explanation:
          "Sublimation is the direct transition from solid to gas without passing through the liquid phase (e.g., dry ice turning into CO₂ gas).",
      },
      {
        question: "Which of these is an alkaline earth metal?",
        options: ["Sodium", "Magnesium", "Aluminum", "Chlorine"],
        correct_answer: "Magnesium",
        explanation:
          "Magnesium is in Group 2 of the periodic table, known as the alkaline earth metals. Others in this group include calcium and barium.",
      },
      {
        question: "What is the chemical formula for carbon dioxide?",
        options: ["CO", "CO₂", "C₂O", "CHO"],
        correct_answer: "CO₂",
        explanation:
          "Carbon dioxide consists of one carbon atom double-bonded to two oxygen atoms, giving it the formula CO₂.",
      },
      {
        question: "Which gas gives soda its fizz?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        correct_answer: "Carbon dioxide",
        explanation:
          "Carbon dioxide (CO₂) is dissolved under pressure in sodas, creating bubbles (fizz) when the pressure is released upon opening.",
      },
      {
        question: "What is the most abundant element in the Earth's crust?",
        options: ["Iron", "Oxygen", "Silicon", "Aluminum"],
        correct_answer: "Oxygen",
        explanation:
          "Oxygen is the most abundant element in Earth's crust (about 46% by mass), followed by silicon (about 28%).",
      },
      {
        question: "Which of these is a halogen?",
        options: ["Sodium", "Chlorine", "Calcium", "Argon"],
        correct_answer: "Chlorine",
        explanation:
          "Chlorine is in Group 17 of the periodic table, known as the halogens. Other halogens include fluorine, bromine, and iodine.",
      },
      {
        question: "What is the common name for ascorbic acid?",
        options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
        correct_answer: "Vitamin C",
        explanation:
          "Ascorbic acid is the chemical name for Vitamin C, an essential nutrient found in citrus fruits and other foods.",
      },
      {
        question: "Which of these is a property of acids?",
        options: [
          "Feel slippery",
          "Taste bitter",
          "Turn litmus paper red",
          "pH greater than 7",
        ],
        correct_answer: "Turn litmus paper red",
        explanation:
          "Acids turn blue litmus paper red, taste sour, and have pH values less than 7. Bases have the opposite properties.",
      },
    ],
    rating: 3.9,
    attempts: 80,
  },
  {
    image: "/images/img3.jpg",
    title: "Mathematics",
    level: "Advanced",
    time: "45",
    questions: [
      {
        question: "Solve for x:",
        isMath: true,
        mathExpression: "2x^2 - 4x - 6 = 0",
        options: ["x = 3, -1", "x = -3, 1", "x = 2, -3", "x = 1, -2"],
        answer: "x = 3, -1",
        explanation:
          "Using the quadratic formula: x = [4 ± √(16 + 48)] / 4 = (4 ± 8) / 4 → x = 3, -1",
      },
      {
        question: "Simplify:",
        isMath: true,
        mathExpression: "\\frac{x^2 - 9}{x + 3}",
        options: ["x + 3", "x - 3", "x^2 - 3", "x + 9"],
        answer: "x - 3",
        explanation:
          "Factor numerator: (x - 3)(x + 3) / (x + 3) → cancel (x + 3), result is x - 3.",
      },
      {
        question: "What is the derivative of f(x) = x^2 + 3x?",
        isMath: false,
        mathExpression: "",
        options: ["x + 3", "2x + 3", "2x", "x^2 + 3"],
        answer: "2x + 3",
        explanation:
          "Derivative: d/dx(x²) = 2x and d/dx(3x) = 3. So f'(x) = 2x + 3.",
      },
      {
        question: "Evaluate:",
        isMath: true,
        mathExpression: "\\log_{2} 8",
        options: ["3", "2", "4", "1"],
        answer: "3",
        explanation: "2³ = 8, so log base 2 of 8 is 3.",
      },
      {
        question: "Find the distance between (3, 4) and (0, 0):",
        isMath: true,
        mathExpression: "\\sqrt{(3 - 0)^2 + (4 - 0)^2}",
        options: ["5", "7", "4", "3"],
        answer: "5",
        explanation: "√(9 + 16) = √25 = 5.",
      },
      {
        question: "Factor the expression:",
        isMath: true,
        mathExpression: "x^2 - 2x - 15",
        options: [
          "(x - 3)(x + 5)",
          "(x + 3)(x - 5)",
          "(x - 5)(x + 3)",
          "(x + 2)(x - 7)",
        ],
        answer: "(x - 5)(x + 3)",
        explanation:
          "Find two numbers that multiply to -15 and add to -2: -5 and 3.",
      },
      {
        question:
          "Find the next number in the geometric sequence: 2, 6, 18, 54, ...",
        isMath: false,
        mathExpression: "",
        options: ["108", "162", "81", "72"],
        answer: "162",
        explanation: "Each term is multiplied by 3: 54 × 3 = 162.",
      },
      {
        question: "Find the probability of rolling a sum of 7 on two dice.",
        isMath: false,
        mathExpression: "",
        options: ["1/6", "1/9", "1/12", "1/36"],
        answer: "1/6",
        explanation:
          "There are 6 combinations out of 36 that give sum 7, so 6/36 = 1/6.",
      },
      {
        question: "Solve for x in:",
        isMath: true,
        mathExpression: "2^{x} = 32",
        options: ["4", "5", "6", "3"],
        answer: "5",
        explanation: "2^5 = 32, so x = 5.",
      },
      {
        question: "What is the integral of f(x) = 3x^2?",
        isMath: false,
        mathExpression: "",
        options: ["x^3", "x^2", "x^3 + C", "3x^3"],
        answer: "x^3 + C",
        explanation: "∫3x² dx = x³ + C, since ∫x^n = x^(n+1)/(n+1).",
      },
      {
        question: "What is the solution to:",
        isMath: true,
        mathExpression: "|x - 4| = 3",
        options: ["x = 1 or 7", "x = -1 or 7", "x = 1 or -7", "x = 3 or 4"],
        answer: "x = 1 or 7",
        explanation: "x - 4 = ±3 → x = 4 ± 3 → x = 1 or 7.",
      },
      {
        question: "Find the value of the determinant:",
        isMath: true,
        mathExpression: "\\begin{vmatrix} 2 & 3 \\\\ 1 & 4 \\end{vmatrix}",
        options: ["5", "7", "11", "8"],
        answer: "5",
        explanation: "Det = (2×4) - (3×1) = 8 - 3 = 5.",
      },
      {
        question: "Find the midpoint between the points (2, 4) and (6, 10).",
        isMath: false,
        mathExpression: "",
        options: ["(4, 7)", "(3, 7)", "(4, 6)", "(5, 7)"],
        answer: "(4, 7)",
        explanation: "Midpoint = ((2+6)/2, (4+10)/2) = (4, 7).",
      },
      {
        question: "Simplify:",
        isMath: true,
        mathExpression: "\\frac{a^3 \\cdot a^2}{a}",
        options: ["a^4", "a^5", "a^2", "a^3"],
        answer: "a^4",
        explanation: "Use exponent rules: a³ × a² = a⁵; a⁵ ÷ a = a⁴.",
      },
      {
        question: "Solve:",
        isMath: true,
        mathExpression: "x^2 = 49",
        options: ["x = ±7", "x = 7", "x = -7", "x = 0"],
        answer: "x = ±7",
        explanation: "Taking square root: x = ±√49 = ±7.",
      },
      {
        question: "If \\log_{10} x = 2, then x = ?",
        isMath: true,
        mathExpression: "\\log_{10} x = 2",
        options: ["10", "100", "20", "1000"],
        answer: "100",
        explanation: "x = 10^2 = 100.",
      },
      {
        question:
          "What is the length of the hypotenuse in a right triangle with sides 5 and 12?",
        isMath: false,
        mathExpression: "",
        options: ["13", "10", "11", "14"],
        answer: "13",
        explanation: "Use Pythagoras: √(5² + 12²) = √169 = 13.",
      },
      {
        question: "Evaluate:",
        isMath: true,
        mathExpression: "\\int 6x \\, dx",
        options: ["3x^2", "6x^2", "x^2", "3x"],
        answer: "3x^2 + C",
        explanation: "∫6x dx = 6x²/2 + C = 3x² + C.",
      },
      {
        question: "If a circle has radius 7, find its area.",
        isMath: false,
        mathExpression: "",
        options: ["154", "49", "100", "44"],
        answer: "154",
        explanation: "Area = πr² = 22/7 × 7² = 22 × 7 = 154.",
      },
      {
        question: "Find the domain of f(x) = 1 / (x - 2).",
        isMath: false,
        mathExpression: "",
        options: ["x ≠ 2", "x ≥ 2", "x = 2", "x > 0"],
        answer: "x ≠ 2",
        explanation: "Function is undefined when denominator = 0, so x ≠ 2.",
      },
      {
        question:
          "Find the slope of the line passing through (1, 2) and (3, 6).",
        isMath: false,
        mathExpression: "",
        options: ["2", "1", "4", "3"],
        answer: "2",
        explanation: "Slope = (6 - 2) / (3 - 1) = 4 / 2 = 2.",
      },
      {
        question: "What is the sum of interior angles of a hexagon?",
        isMath: false,
        mathExpression: "",
        options: ["720°", "540°", "360°", "900°"],
        answer: "720°",
        explanation: "Sum = (6 - 2) × 180 = 4 × 180 = 720°.",
      },
      {
        question: "Differentiate:",
        isMath: true,
        mathExpression: "f(x) = \\sin x",
        options: ["cos x", "-sin x", "-cos x", "sec x"],
        answer: "cos x",
        explanation: "d/dx(sin x) = cos x.",
      },
      {
        question: "Solve the inequality:",
        isMath: true,
        mathExpression: "2x - 3 < 5",
        options: ["x < 4", "x > 4", "x < 1", "x > 1"],
        answer: "x < 4",
        explanation: "Add 3: 2x < 8 → x < 4.",
      },
      {
        question: "What is the inverse of the function f(x) = 3x + 1?",
        isMath: false,
        mathExpression: "",
        options: [
          "f⁻¹(x) = (x - 1)/3",
          "f⁻¹(x) = 1/3x - 1",
          "f⁻¹(x) = 3x - 1",
          "f⁻¹(x) = (x + 1)/3",
        ],
        answer: "f⁻¹(x) = (x - 1)/3",
        explanation: "Solve y = 3x + 1 for x: x = (y - 1)/3.",
      },
      {
        question: "Solve:",
        isMath: true,
        mathExpression: "9^{x} = 81",
        options: ["2", "3", "4", "1"],
        answer: "2",
        explanation: "9² = 81, so x = 2.",
      },
      {
        question: "Find the area under the curve y = 4 from x = 0 to x = 3.",
        isMath: false,
        mathExpression: "",
        options: ["12", "7", "10", "8"],
        answer: "12",
        explanation: "Area = height × width = 4 × 3 = 12.",
      },
      {
        question: "If A = \\pi r^2 and r = 2, what is the area of the circle?",
        isMath: true,
        mathExpression: "A = \\pi r^2, \\ r = 2",
        options: ["4π", "2π", "8π", "16π"],
        answer: "4π",
        explanation: "A = π × 2² = π × 4 = 4π.",
      },
      {
        question: "Evaluate the limit:",
        isMath: true,
        mathExpression: "\\lim_{x \\to 0} \\frac{\\sin x}{x}",
        options: ["1", "0", "Undefined", "Infinity"],
        answer: "1",
        explanation: "Standard limit identity: lim x→0 sin(x)/x = 1.",
      },
      {
        question: "Find the standard deviation of [2, 4, 4, 4, 5, 5, 7, 9].",
        isMath: false,
        mathExpression: "",
        options: ["2", "1", "3", "4"],
        answer: "2",
        explanation:
          "Standard deviation = √variance = 2 for this dataset (based on full calculation).",
      },
    ],
    numbOfQuestions: "15",
    rating: 4.8,
    attempts: 120,
  },
  {
    image: "/images/digitalMarketing.jpg",
    title: "Basic Computing",
    level: "Beginner",
    time: "60",
    numbOfQuestions: "50",
    questions: [
      {
        question: "What does 'ICT' stand for?",
        options: [
          "International Communication Technology",
          "Information and Computer Technology",
          "Information and Communication Technology",
          "Internet Connection Technology",
        ],
        correct_answer: "Information and Communication Technology",
        explanation:
          "ICT stands for Information and Communication Technology, which refers to technologies that provide access to information through telecommunications.",
      },
      {
        question: "Which of these is an input device?",
        options: ["Monitor", "Printer", "Keyboard", "Speaker"],
        correct_answer: "Keyboard",
        explanation:
          "A keyboard is an input device used to enter data into a computer. Monitors, printers and speakers are output devices.",
      },
      {
        question: "What is the main function of RAM in a computer?",
        options: [
          "Permanent storage of files",
          "Processing visual graphics",
          "Temporary storage for running programs",
          "Connecting to the internet",
        ],
        correct_answer: "Temporary storage for running programs",
        explanation:
          "RAM (Random Access Memory) provides temporary storage that allows your computer to access data quickly for running programs.",
      },
      {
        question: "Which of these is NOT an operating system?",
        options: ["Windows", "macOS", "Linux", "Google Chrome"],
        correct_answer: "Google Chrome",
        explanation:
          "Google Chrome is a web browser, not an operating system. Windows, macOS and Linux are all operating systems.",
      },
      {
        question: "What does 'URL' stand for?",
        options: [
          "Uniform Resource Locator",
          "Universal Reference Link",
          "United Resource Location",
          "Uniform Reference Locator",
        ],
        correct_answer: "Uniform Resource Locator",
        explanation:
          "URL stands for Uniform Resource Locator, which is the address used to access resources on the internet.",
      },
      {
        question:
          "Which protocol is used to transfer web pages over the internet?",
        options: ["FTP", "HTTP", "SMTP", "TCP"],
        correct_answer: "HTTP",
        explanation:
          "HTTP (Hypertext Transfer Protocol) is used to transfer web pages and related content over the internet.",
      },
      {
        question: "What is the function of a CPU in a computer?",
        options: [
          "Storing long-term data",
          "Displaying images on screen",
          "Processing instructions and performing calculations",
          "Providing internet connectivity",
        ],
        correct_answer: "Processing instructions and performing calculations",
        explanation:
          "The CPU (Central Processing Unit) is the 'brain' of the computer that processes instructions and performs calculations.",
      },
      {
        question: "Which of these is an example of cloud storage?",
        options: [
          "USB Flash Drive",
          "External Hard Disk",
          "Google Drive",
          "DVD",
        ],
        correct_answer: "Google Drive",
        explanation:
          "Google Drive is a cloud storage service where data is stored on remote servers accessed via the internet.",
      },
      {
        question: "What is the purpose of an antivirus program?",
        options: [
          "To speed up computer performance",
          "To protect against malicious software",
          "To create backup copies of files",
          "To connect to wireless networks",
        ],
        correct_answer: "To protect against malicious software",
        explanation:
          "Antivirus programs detect, prevent, and remove malicious software (malware) like viruses, worms, and trojans.",
      },
      {
        question: "Which file extension indicates a Microsoft Word document?",
        options: [".txt", ".docx", ".jpg", ".mp3"],
        correct_answer: ".docx",
        explanation:
          ".docx is the file extension for Microsoft Word documents in versions 2007 and later.",
      },
      {
        question: "What does 'PDF' stand for?",
        options: [
          "Printable Document Format",
          "Portable Document Format",
          "Personal Data File",
          "Public Document File",
        ],
        correct_answer: "Portable Document Format",
        explanation:
          "PDF stands for Portable Document Format, a file format used to present documents consistently across devices.",
      },
      {
        question: "Which of these is a search engine?",
        options: ["Facebook", "Google", "Microsoft Word", "Adobe Photoshop"],
        correct_answer: "Google",
        explanation:
          "Google is a search engine used to find information on the internet. The others are not search engines.",
      },
      {
        question: "What is the primary purpose of a spreadsheet program?",
        options: [
          "Creating text documents",
          "Organizing and calculating numerical data",
          "Editing photographs",
          "Browsing the internet",
        ],
        correct_answer: "Organizing and calculating numerical data",
        explanation:
          "Spreadsheet programs like Excel are designed for organizing, calculating, and analyzing numerical data in a grid format.",
      },
      {
        question: "Which of these is NOT a type of computer network?",
        options: ["LAN", "WAN", "MAN", "CAN"],
        correct_answer: "CAN",
        explanation:
          "LAN (Local Area Network), WAN (Wide Area Network), and MAN (Metropolitan Area Network) are real network types. CAN is not a standard network classification.",
      },
      {
        question: "What does 'WWW' stand for in internet terminology?",
        options: [
          "World Wide Web",
          "World Web Wide",
          "Web World Wide",
          "Wide World Web",
        ],
        correct_answer: "World Wide Web",
        explanation:
          "WWW stands for World Wide Web, which is a system of interconnected hypertext documents accessed via the internet.",
      },
      {
        question: "Which device connects computers in a network?",
        options: ["CPU", "Monitor", "Router", "Printer"],
        correct_answer: "Router",
        explanation:
          "A router is a networking device that forwards data packets between computer networks, connecting multiple devices.",
      },
      {
        question: "What is the function of the 'Shift' key on a keyboard?",
        options: [
          "To turn the keyboard on/off",
          "To type uppercase letters or access upper characters",
          "To delete characters",
          "To open the start menu",
        ],
        correct_answer: "To type uppercase letters or access upper characters",
        explanation:
          "The Shift key is used to type uppercase letters or access the upper characters on keys with two symbols.",
      },
      {
        question: "Which of these is an example of an output device?",
        options: ["Mouse", "Scanner", "Microphone", "Projector"],
        correct_answer: "Projector",
        explanation:
          "A projector is an output device that displays images/video on a surface. Mouse, scanner and microphone are input devices.",
      },
      {
        question: "What does 'GUI' stand for in computing?",
        options: [
          "General User Interface",
          "Graphical User Interface",
          "Global User Interaction",
          "Graphical Unit Interface",
        ],
        correct_answer: "Graphical User Interface",
        explanation:
          "GUI stands for Graphical User Interface, which allows users to interact with electronic devices through graphical icons.",
      },
      {
        question: "Which of these is NOT a web browser?",
        options: ["Chrome", "Firefox", "Edge", "Photoshop"],
        correct_answer: "Photoshop",
        explanation:
          "Photoshop is an image editing software, not a web browser. Chrome, Firefox and Edge are all web browsers.",
      },
      {
        question: "What is the purpose of the 'Cc' field in email?",
        options: [
          "To send a carbon copy to additional recipients",
          "To mark the email as important",
          "To attach files to the email",
          "To encrypt the email message",
        ],
        correct_answer: "To send a carbon copy to additional recipients",
        explanation:
          "Cc (Carbon Copy) is used to send copies of an email to additional recipients, with all recipients visible to each other.",
      },
      {
        question: "Which of these is a social media platform?",
        options: ["Excel", "Twitter", "Photoshop", "PowerPoint"],
        correct_answer: "Twitter",
        explanation:
          "Twitter is a social media platform. The other options are Microsoft Office applications or Adobe software.",
      },
      {
        question: "What is the function of the 'Undo' command?",
        options: [
          "To delete a file permanently",
          "To reverse the last action performed",
          "To save the current document",
          "To print the document",
        ],
        correct_answer: "To reverse the last action performed",
        explanation:
          "The Undo command reverses the most recent action, allowing users to correct mistakes.",
      },
      {
        question: "Which of these is a type of malware?",
        options: ["Firewall", "Virus", "Router", "Spreadsheet"],
        correct_answer: "Virus",
        explanation:
          "A virus is a type of malware. Firewalls and routers are networking components, and spreadsheets are documents.",
      },
      {
        question: "What does 'Wi-Fi' stand for?",
        options: [
          "Wireless Fidelity",
          "Wired Fiber",
          "Wireless Fiber",
          "Wide Frequency",
        ],
        correct_answer: "Wireless Fidelity",
        explanation:
          "Wi-Fi stands for Wireless Fidelity, a technology for wireless local area networking.",
      },
      {
        question: "Which of these is NOT a valid file operation?",
        options: ["Copy", "Paste", "Delete", "Drink"],
        correct_answer: "Drink",
        explanation:
          "Drink is not a file operation. Common file operations include copy, paste, delete, move, rename, etc.",
      },
      {
        question: "What is the purpose of a firewall?",
        options: [
          "To increase internet speed",
          "To protect against unauthorized network access",
          "To create backup copies of files",
          "To display web pages",
        ],
        correct_answer: "To protect against unauthorized network access",
        explanation:
          "A firewall is a security system that monitors and controls incoming and outgoing network traffic based on security rules.",
      },
      {
        question: "Which key is used to create a new line in a word processor?",
        options: ["Enter", "Shift", "Ctrl", "Alt"],
        correct_answer: "Enter",
        explanation:
          "The Enter (or Return) key is used to create a new line or paragraph in word processing software.",
      },
      {
        question: "What does 'ISP' stand for?",
        options: [
          "Internet Service Provider",
          "International Service Protocol",
          "Internet Security Program",
          "Integrated System Provider",
        ],
        correct_answer: "Internet Service Provider",
        explanation:
          "ISP stands for Internet Service Provider, a company that provides customers with internet access.",
      },
      {
        question: "Which of these is NOT a common computer port?",
        options: ["USB", "HDMI", "Ethernet", "Bluetooth"],
        correct_answer: "Bluetooth",
        explanation:
          "Bluetooth is a wireless technology, not a physical port. USB, HDMI and Ethernet are all physical connection ports.",
      },
    ],
    rating: 4.2,
    attempts: 90,
  },
  {
    image: "/images/img3.jpg",
    title: "Mathematics",
    level: "Beginner",
    time: "45",
    numbOfQuestions: "30",
    questions: [
      {
        question: "What is 6 + 2?",
        isMath: false,
        mathExpression: "",
        options: ["6", "8", "9", "12"],
        answer: "8",
        explanation: "Adding 6 and 2 gives 8.",
      },
      {
        question: "Solve the expression:",
        isMath: true,
        mathExpression: "5 \\times 3",
        options: ["15", "8", "10", "20"],
        answer: "15",
        explanation: "5 multiplied by 3 equals 15.",
      },
      {
        question: "What is the value of:",
        isMath: true,
        mathExpression: "12 - 4",
        options: ["6", "8", "10", "7"],
        answer: "8",
        explanation: "12 minus 4 is 8.",
      },
      {
        question: "Which of these numbers is even?",
        isMath: false,
        mathExpression: "",
        options: ["3", "5", "6", "9"],
        answer: "6",
        explanation:
          "Even numbers are divisible by 2, and 6 is divisible by 2.",
      },
      {
        question: "What is 7 plus 6?",
        isMath: false,
        mathExpression: "",
        options: ["12", "11", "13", "14"],
        answer: "13",
        explanation: "7 + 6 equals 13.",
      },
      {
        question: "Evaluate:",
        isMath: true,
        mathExpression: "9 \\div 3",
        options: ["6", "3", "2", "9"],
        answer: "3",
        explanation: "9 divided by 3 is 3.",
      },
      {
        question: "What is the result of:",
        isMath: true,
        mathExpression: "2 + 3 \\times 4",
        options: ["14", "20", "24", "10"],
        answer: "14",
        explanation: "Follow order of operations: 3×4=12, then 2+12=14.",
      },
      {
        question: "How many sides does a square have?",
        isMath: false,
        mathExpression: "",
        options: ["3", "4", "5", "6"],
        answer: "4",
        explanation: "A square always has 4 equal sides.",
      },
      {
        question: "What is the value of:",
        isMath: true,
        mathExpression: "10 + 15",
        options: ["25", "20", "15", "30"],
        answer: "25",
        explanation: "10 plus 15 equals 25.",
      },
      {
        question: "Which number is a multiple of 5?",
        isMath: false,
        mathExpression: "",
        options: ["12", "18", "25", "33"],
        answer: "25",
        explanation: "Multiples of 5 end in 0 or 5, and 25 fits.",
      },
      {
        question: "Find the result of:",
        isMath: true,
        mathExpression: "4^2",
        options: ["8", "12", "16", "20"],
        answer: "16",
        explanation: "4 squared means 4 × 4 = 16.",
      },
      {
        question: "What is half of 20?",
        isMath: false,
        mathExpression: "",
        options: ["5", "10", "15", "20"],
        answer: "10",
        explanation: "Half of 20 is 10 because 20 ÷ 2 = 10.",
      },
      {
        question: "Which of the following is a prime number?",
        isMath: false,
        mathExpression: "",
        options: ["4", "6", "7", "9"],
        answer: "7",
        explanation: "7 is only divisible by 1 and itself.",
      },
      {
        question: "Evaluate:",
        isMath: true,
        mathExpression: "3 + 6 - 2",
        options: ["5", "6", "7", "9"],
        answer: "7",
        explanation: "3 + 6 = 9, and 9 - 2 = 7.",
      },
      {
        question: "Which number is the smallest?",
        isMath: false,
        mathExpression: "",
        options: ["15", "10", "8", "12"],
        answer: "8",
        explanation: "8 is less than all the other options.",
      },
      {
        question: "What is the next number in the sequence: 2, 4, 6, __?",
        isMath: false,
        mathExpression: "",
        options: ["7", "8", "9", "10"],
        answer: "8",
        explanation: "The pattern adds 2 each time: 2, 4, 6, 8.",
      },
      {
        question: "Solve:",
        isMath: true,
        mathExpression: "18 \\div 6",
        options: ["3", "6", "12", "2"],
        answer: "3",
        explanation: "18 divided by 6 equals 3.",
      },
      {
        question: "What is the place value of 3 in 345?",
        isMath: false,
        mathExpression: "",
        options: ["Ones", "Tens", "Hundreds", "Thousands"],
        answer: "Hundreds",
        explanation: "The 3 is in the hundreds place in 345.",
      },
      {
        question: "How many minutes are in an hour?",
        isMath: false,
        mathExpression: "",
        options: ["30", "45", "60", "90"],
        answer: "60",
        explanation: "There are 60 minutes in one hour.",
      },
      {
        question: "Which shape has 3 sides?",
        isMath: false,
        mathExpression: "",
        options: ["Square", "Rectangle", "Triangle", "Circle"],
        answer: "Triangle",
        explanation: "A triangle has 3 sides.",
      },
      {
        question: "Find the sum of:",
        isMath: true,
        mathExpression: "11 + 9",
        options: ["18", "19", "20", "21"],
        answer: "20",
        explanation: "11 plus 9 equals 20.",
      },
      {
        question: "Which number is greater?",
        isMath: false,
        mathExpression: "",
        options: ["25", "32", "19", "28"],
        answer: "32",
        explanation: "32 is the largest among the options.",
      },
      {
        question: "What is the result of:",
        isMath: true,
        mathExpression: "14 - 7",
        options: ["5", "6", "7", "8"],
        answer: "7",
        explanation: "14 minus 7 equals 7.",
      },
      {
        question: "How many zeros are there in one thousand?",
        isMath: false,
        mathExpression: "",
        options: ["1", "2", "3", "4"],
        answer: "3",
        explanation: "1,000 has three zeros.",
      },
      {
        question: "Which of the following is an odd number?",
        isMath: false,
        mathExpression: "",
        options: ["12", "16", "19", "20"],
        answer: "19",
        explanation: "Odd numbers are not divisible by 2; 19 is odd.",
      },
      {
        question: "What is 10 more than 25?",
        isMath: false,
        mathExpression: "",
        options: ["35", "30", "40", "20"],
        answer: "35",
        explanation: "25 + 10 = 35.",
      },
      {
        question: "Simplify:",
        isMath: true,
        mathExpression: "2 \\times 5 + 1",
        options: ["10", "11", "12", "15"],
        answer: "11",
        explanation: "2×5 = 10, then 10 + 1 = 11.",
      },
      {
        question: "How many sides does a rectangle have?",
        isMath: false,
        mathExpression: "",
        options: ["3", "4", "5", "6"],
        answer: "4",
        explanation: "A rectangle has 4 sides.",
      },
      {
        question: "What is the total of:",
        isMath: true,
        mathExpression: "7 + 8",
        options: ["13", "14", "15", "16"],
        answer: "15",
        explanation: "7 plus 8 equals 15.",
      },
      {
        question: "Which number comes before 100?",
        isMath: false,
        mathExpression: "",
        options: ["99", "98", "101", "95"],
        answer: "99",
        explanation: "99 comes right before 100.",
      },
    ],
    rating: 4.8,
    attempts: 120,
  },
  {
    image: "/images/img2.jpg",
    title: "Information Tech",
    level: "Advanced",
    time: "60",
    questions: [
      {
        level: "advanced",
        question: "What is the time complexity of a binary search algorithm?",
        options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
        answer: "O(log n)",
      },
      {
        level: "advanced",
        question: "What is a foreign key in a relational database?",
        options: [
          "A key used to encrypt data",
          "A key that uniquely identifies a record",
          "A key that links two tables",
          "A key used for indexing",
        ],
        answer: "A key that links two tables",
      },
      {
        level: "advanced",
        question: "Which of the following is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
        answer: "MongoDB",
      },
      {
        level: "advanced",
        question: "What is the main purpose of subnetting in networking?",
        options: [
          "To create a LAN",
          "To manage memory usage",
          "To divide a network into smaller segments",
          "To connect to the internet",
        ],
        answer: "To divide a network into smaller segments",
      },
      {
        level: "advanced",
        question: "Which algorithm is used in asymmetric encryption?",
        options: ["AES", "DES", "RSA", "MD5"],
        answer: "RSA",
      },
      {
        level: "advanced",
        question: "What is the main feature of object-oriented programming?",
        options: ["Procedures", "Functions", "Objects and Classes", "Pointers"],
        answer: "Objects and Classes",
      },
      {
        level: "advanced",
        question: "Which layer of the OSI model is responsible for routing?",
        options: ["Data Link", "Transport", "Network", "Session"],
        answer: "Network",
      },
      {
        level: "advanced",
        question: "What is polymorphism in object-oriented programming?",
        options: [
          "Ability to take many forms",
          "Ability to inherit from multiple classes",
          "Ability to store large data",
          "Ability to execute code concurrently",
        ],
        answer: "Ability to take many forms",
      },
      {
        level: "advanced",
        question: "In cybersecurity, what is a zero-day vulnerability?",
        options: [
          "A virus with zero detection",
          "An unknown flaw with no patch",
          "An outdated system",
          "A system with no firewalls",
        ],
        answer: "An unknown flaw with no patch",
      },
      {
        level: "advanced",
        question: "Which command is used to check the routing table in Linux?",
        options: ["ifconfig", "netstat -r", "ping", "traceroute"],
        answer: "netstat -r",
      },
      {
        level: "advanced",
        question: "What does ACID stand for in databases?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Incorrect Option A0",
          "Incorrect Option B0",
          "Incorrect Option C0",
        ],
        answer: "Atomicity, Consistency, Isolation, Durability",
      },
      {
        level: "advanced",
        question: "Which port number does HTTPS use by default?",
        options: [
          "443",
          "Incorrect Option A1",
          "Incorrect Option B1",
          "Incorrect Option C1",
        ],
        answer: "443",
      },
      {
        level: "advanced",
        question: "What is normalization in databases?",
        options: [
          "Process of organizing data to reduce redundancy",
          "Incorrect Option A2",
          "Incorrect Option B2",
          "Incorrect Option C2",
        ],
        answer: "Process of organizing data to reduce redundancy",
      },
      {
        level: "advanced",
        question:
          "Which type of attack involves injecting malicious SQL statements?",
        options: [
          "SQL injection",
          "Incorrect Option A3",
          "Incorrect Option B3",
          "Incorrect Option C3",
        ],
        answer: "SQL injection",
      },
      {
        level: "advanced",
        question: "What is the main advantage of fiber-optic cables?",
        options: [
          "High-speed data transmission",
          "Incorrect Option A4",
          "Incorrect Option B4",
          "Incorrect Option C4",
        ],
        answer: "High-speed data transmission",
      },
      {
        level: "advanced",
        question: "What is the purpose of a hash function?",
        options: [
          "Generate a unique fixed-size output from input data",
          "Incorrect Option A5",
          "Incorrect Option B5",
          "Incorrect Option C5",
        ],
        answer: "Generate a unique fixed-size output from input data",
      },
      {
        level: "advanced",
        question: "What does REST stand for in web services?",
        options: [
          "Representational State Transfer",
          "Incorrect Option A6",
          "Incorrect Option B6",
          "Incorrect Option C6",
        ],
        answer: "Representational State Transfer",
      },
      {
        level: "advanced",
        question:
          "Which of the following is a type of load balancing algorithm?",
        options: [
          "Round Robin",
          "Incorrect Option A7",
          "Incorrect Option B7",
          "Incorrect Option C7",
        ],
        answer: "Round Robin",
      },
      {
        level: "advanced",
        question: "What is the function of a DNS server?",
        options: [
          "To translate domain names to IP addresses",
          "Incorrect Option A8",
          "Incorrect Option B8",
          "Incorrect Option C8",
        ],
        answer: "To translate domain names to IP addresses",
      },
      {
        level: "advanced",
        question: "Which tool is used for network packet analysis?",
        options: [
          "Wireshark",
          "Incorrect Option A9",
          "Incorrect Option B9",
          "Incorrect Option C9",
        ],
        answer: "Wireshark",
      },
      {
        level: "advanced",
        question: "What is multithreading?",
        options: [
          "Running multiple threads concurrently",
          "Incorrect Option A10",
          "Incorrect Option B10",
          "Incorrect Option C10",
        ],
        answer: "Running multiple threads concurrently",
      },
      {
        level: "advanced",
        question: "What is containerization in DevOps?",
        options: [
          "Running applications in isolated environments",
          "Incorrect Option A11",
          "Incorrect Option B11",
          "Incorrect Option C11",
        ],
        answer: "Running applications in isolated environments",
      },
      {
        level: "advanced",
        question:
          "Which command in Git is used to combine changes from different branches?",
        options: [
          "merge",
          "Incorrect Option A12",
          "Incorrect Option B12",
          "Incorrect Option C12",
        ],
        answer: "merge",
      },
      {
        level: "advanced",
        question: "What is the primary benefit of using indexes in a database?",
        options: [
          "Faster query performance",
          "Incorrect Option A13",
          "Incorrect Option B13",
          "Incorrect Option C13",
        ],
        answer: "Faster query performance",
      },
      {
        level: "advanced",
        question: "Which HTTP method is idempotent?",
        options: [
          "PUT",
          "Incorrect Option A14",
          "Incorrect Option B14",
          "Incorrect Option C14",
        ],
        answer: "PUT",
      },
      {
        level: "advanced",
        question: "What is a deadlock in operating systems?",
        options: [
          "When two or more processes are waiting on each other indefinitely",
          "Incorrect Option A15",
          "Incorrect Option B15",
          "Incorrect Option C15",
        ],
        answer:
          "When two or more processes are waiting on each other indefinitely",
      },
      {
        level: "advanced",
        question: "What is the function of an API gateway?",
        options: [
          "To manage and route API requests",
          "Incorrect Option A16",
          "Incorrect Option B16",
          "Incorrect Option C16",
        ],
        answer: "To manage and route API requests",
      },
      {
        level: "advanced",
        question: "What does RAID stand for?",
        options: [
          "Redundant Array of Independent Disks",
          "Incorrect Option A17",
          "Incorrect Option B17",
          "Incorrect Option C17",
        ],
        answer: "Redundant Array of Independent Disks",
      },
      {
        level: "advanced",
        question: "Which protocol secures data at the transport layer?",
        options: [
          "TLS",
          "Incorrect Option A18",
          "Incorrect Option B18",
          "Incorrect Option C18",
        ],
        answer: "TLS",
      },
      {
        level: "advanced",
        question:
          "What is the difference between compiled and interpreted languages?",
        options: [
          "Compiled languages translate before execution; interpreted during",
          "Incorrect Option A19",
          "Incorrect Option B19",
          "Incorrect Option C19",
        ],
        answer:
          "Compiled languages translate before execution; interpreted during",
      },
    ],
    numbOfQuestions: "50",
    rating: 4.2,
    attempts: 90,
  },
];

export const availableQuizzes = availableQuizzesRaw.map((quiz) => {
  return {
    ...quiz,
    levelStyles: {
      backgroundColor:
        quiz.level === "Beginner"
          ? "#E0F7FA"
          : quiz.level === "Intermediate"
          ? "#FFF3E0"
          : "#FCE4EC",
      color:
        quiz.level === "Beginner"
          ? "#00796B"
          : quiz.level === "Intermediate"
          ? "#FF6F00"
          : "#880E4F",
    },
    id:
      quiz.title.slice(0, 3) +
      Math.floor(Math.random() * (200 - 100 + 1) + 100),
  };
});
