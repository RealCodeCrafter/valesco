const fs = require('fs');
const path = require('path');

const articles = [
  {
    title: 'The Magic of Motion: 5 Hidden Heroes Saving Your Car Every Day',
    slug: 'magic-of-motion-5-hidden-heroes',
    language: 'en',
    description:
      'We break down 5 technical fluids without which your car cannot work: motor oil, transmission fluid, antifreeze, brake fluid, and hydraulic oil. Tips from Valesco Oil.',
    metaTitle:
      'The Magic of Motion: 5 Hidden Heroes Saving Your Car Every Day | Valesco Oil',
    metaDescription:
      'Learn how motor oil, antifreeze, transmission, brake and hydraulic fluids protect your car every day. Recommendations from Valesco Oil.',
    content: `<p>When we think of car power, horsepower, engine displacement, and torque immediately come to mind. But have you ever wondered if all this iron might would turn into a heap of immobile junk without five unnoticeable yet vital fluids?</p>
<p>Choosing the right motor oil, antifreeze, and transmission fluids is not just about car maintenance; it is a guarantee of your safety and savings on repairs. Let's break down how these "hidden heroes" work and why Valesco Oil products are becoming the number one choice for car owners.</p>

<h2>1. Motor Oil: The Heart and Blood of Your Engine</h2>
<p>A car engine makes thousands of revolutions per minute. Without lubrication, the colossal friction would destroy the metal in a matter of seconds. Motor oil performs three essential functions:</p>
<ul>
<li><strong>Protection against wear:</strong> Creates a microscopic yet ultra-strong film between moving parts.</li>
<li><strong>Cooling:</strong> Dissipates heat from those engine zones that antifreeze cannot reach.</li>
<li><strong>Cleaning:</strong> Washes away carbon deposits and holds microparticles in suspension, preventing them from clogging the system.</li>
</ul>
<p><strong>Tip from Valesco Oil:</strong> Switching from mineral oil to high-quality synthetics reduces fuel consumption by up to 3% and eases engine startup in freezing weather.</p>

<h2>2. Transmission Fluid: Smoothness in Every Shift</h2>
<p>No matter how powerful the engine is, a car cannot move from its spot without a gearbox. Transmission fluid operates under extreme pressure conditions.</p>
<p>In manual transmissions, it protects gears from chipping, while in automatic transmissions (AT), it serves as the working fluid that transmits torque. High-quality transmission fluid prevents jerking when shifting gears and extends the lifespan of an expensive assembly.</p>

<h2>3. Antifreeze (Coolant): Climate Control Under the Hood</h2>
<p>Did you know that only about 30% of fuel combustion energy goes into moving the car? The rest is pure heat. If it is not dissipated, the engine will "boil".</p>
<p>Antifreeze protects the cooling system from two extremes:</p>
<ul>
<li>It does not freeze at extreme sub-zero temperatures (unlike water, which would simply crack the cylinder block).</li>
<li>It has an elevated boiling point and protects internal channels from corrosion and cavitation.</li>
</ul>

<h2>4. Brake Fluid: Seconds That Save Lives</h2>
<p>This is the most critical element of safety. When you press the brake pedal, brake fluid instantly transfers this force to the brake pads.</p>
<p>The main properties of a good brake fluid are incompressibility and a high boiling point. If the fluid is old and has absorbed moisture from the air, it can boil during sharp braking. The resulting gas bubbles compress easily, and the brake pedal simply "sinks". Regular inspection of this fluid is a law of safety.</p>

<h2>5. Hydraulic Oil: Power and Smoothness of Control</h2>
<p>Modern cars and specialized equipment cannot function without hydraulic systems. In passenger cars, this is most often the power steering (PAS), which allows you to turn the steering wheel literally with one finger.</p>
<p>Hydraulic oil transfers mechanical energy throughout the system. It must maintain its viscosity in both severe heat and bitter cold so that steering remains sharp and predictable.</p>

<h2>Why Car Owners Choose Valesco Oil?</h2>
<p>The automotive fluid market is overcrowded, but compromises are unacceptable here. Valesco Oil products are developed to meet the strictest international standards and climate conditions.</p>

<table>
<thead>
<tr><th>Product</th><th>Main Valesco Advantage</th><th>Effect on the Car</th></tr>
</thead>
<tbody>
<tr><td>Motor Oils</td><td>Stable viscosity and a smart additive package</td><td>Extended engine lifespan</td></tr>
<tr><td>Transmission Fluids</td><td>High resistance to shear loads</td><td>Smooth gear shifting</td></tr>
<tr><td>Antifreezes</td><td>Maximum protection against corrosion</td><td>Long radiator service life</td></tr>
<tr><td>Brake Fluids</td><td>Elevated boiling point</td><td>Reliability in emergency situations</td></tr>
<tr><td>Hydraulic Oils</td><td>Minimal foaming</td><td>Stable operation of power steering and special equipment</td></tr>
</tbody>
</table>

<p>Protect your car from the inside out. Choose reliability backed by technology. Go to the Valesco Oil catalog and select the ideal technical fluids for your vehicle today!</p>`,
  },
  {
    title:
      'Mineral, Semi-Synthetic, or Synthetic? What is the Difference and Which Oil Does Your Car Exactly Need',
    slug: 'mineral-semi-synthetic-or-synthetic-which-oil',
    language: 'en',
    description:
      'We break down the difference between mineral, semi-synthetic and synthetic motor oil. Which oil suits your car — expert advice from Valesco Oil.',
    metaTitle:
      'Mineral, Semi-Synthetic, or Synthetic? What is the Difference | Valesco Oil',
    metaDescription:
      'Mineral, semi-synthetic or synthetic oil — which should you choose for your car? A detailed comparison from Valesco Oil experts.',
    content: `<p>Every car owner faces a major choice when buying motor oil: mineral, semi-synthetic, or synthetic (Full Synthetic). The price range between them can be huge, and the debates on forums about which oil is better have been ongoing for years.</p>
<p>What is the real difference between these three types of oils? Why is synthetic oil more expensive? And most importantly — which oil will ideally suit your car? The experts at Valesco Oil break down this question in detail, without complex chemical formulas but with maximum utility.</p>

<h2>The Main Difference Lies in the "Foundation" (Base Oil)</h2>
<p>Any motor oil consists of two parts: a base stock (75–85%) and an additive package (15–25%), which are added for wear protection, cleaning, and corrosion prevention. It is precisely by the type of base stock that oils are divided into three types.</p>

<h2>1. Mineral Oil</h2>
<p>This is a completely natural product obtained through the direct distillation and refining of crude oil.</p>
<p><strong>Structural features:</strong> Since it is a natural product, the molecules in it vary in shape and size. It retains natural impurities that can turn into carbon deposits at high temperatures.</p>
<p><strong>Pros:</strong> The lowest cost, good density, and a gentle effect on old rubber seals (oil seals).</p>
<p><strong>Cons:</strong> Quickly loses its properties (oxidizes), thickens in the freezing cold, and thins out in extreme heat. Requires frequent replacement.</p>

<h2>2. Synthetic Oil (Fully Synthetic)</h2>
<p>This is a high-tech product. Synthetics are not just refined — their molecular structure is literally engineered "from scratch" in laboratories using chemical synthesis.</p>
<p><strong>Structural features:</strong> All molecules of synthetic oil are absolutely identical in size and shape. There are no impurities in it.</p>
<p><strong>Pros:</strong> Extreme stability. It maintains fluidity in severe frost (easy startup) and does not become too thin when overheating. It lasts significantly longer, reduces fuel consumption, and perfectly cleans the engine.</p>
<p><strong>Cons:</strong> High cost of production and the final product.</p>

<h2>3. Semi-Synthetic Oil</h2>
<p>This is a reasonable compromise between price and quality. Semi-synthetics are obtained by mixing mineral and synthetic bases. Usually, the ratio is around 60–70% mineral stock and 30–40% synthetic stock.</p>
<p><strong>Pros:</strong> In terms of performance, it significantly outperforms mineral oil, yet costs noticeably less than pure synthetics.</p>
<p><strong>Cons:</strong> Inferior to synthetic oils when operating under extreme conditions (severe frosts or very high loads).</p>

<h2>Which Oil is Suitable for Which Cars?</h2>
<p>There is no such thing as a "bad oil," there is only the concept of a "wrong choice." Each type of engine requires its own base.</p>

<h3>Who is MINERAL oil for?</h3>
<p><strong>Vehicles:</strong> Old classics, Soviet-era automotive industry models (VAZ, GAZ), cars produced in the 70s-80s, and carbureted engines.</p>
<p><strong>Specialized equipment:</strong> Old tractors, commercial transport of past generations.</p>
<p><strong>Why exactly this?</strong> Old engines have large clearances between components, and their oil seals are made of materials that can simply dry out and leak from modern, aggressive synthetics. Thick mineral oil creates a thick film and maintains pressure in such motors.</p>

<h3>Who is SEMI-SYNTHETIC oil for?</h3>
<p><strong>Vehicles:</strong> Foreign and domestic cars from the late 90s and 2000s, as well as any vehicles with a solid mileage (over 150,000 – 200,000 km).</p>
<p><strong>Why exactly this?</strong> When an engine has natural wear, pure synthetics can begin to burn off (consume as oil burn) or ooze through worn-out gaskets. Semi-synthetics (for example, the popular 10W-40 class), due to their density, stabilize the operation of such an engine and save the owner's budget.</p>

<h3>Who is SYNTHETIC oil for?</h3>
<p><strong>Vehicles:</strong> All modern cars (roughly from the second half of the 2000s to the present day), cars from dealerships, turbocharged engines, multi-valve engines, and direct fuel injection systems.</p>
<p><strong>Why exactly this?</strong> Modern engines are designed with jewelry-like precision; the clearances between components are microscopic. Mineral oil simply will not penetrate there, causing instant wear. Only fluid and stable synthetics (0W-20, 5W-30, 5W-40) can instantly protect such a high-tech motor.</p>

<h2>Final Comparison: A Cheat Sheet for the Car Owner</h2>
<table>
<thead>
<tr><th>Criterion</th><th>Mineral</th><th>Semi-Synthetic</th><th>Synthetic</th></tr>
</thead>
<tbody>
<tr><td>Replacement Interval</td><td>5,000 km</td><td>7,000 – 8,000 km</td><td>10,000 – 15,000 km</td></tr>
<tr><td>Behavior in Frost</td><td>Worst (thickens)</td><td>Average</td><td>Ideal (always fluid)</td></tr>
<tr><td>Carbon Protection</td><td>Low</td><td>Average</td><td>High (engine stays clean)</td></tr>
<tr><td>Price</td><td>Budget</td><td>Optimal</td><td>High</td></tr>
</tbody>
</table>

<h2>A Quality Base is the Key to Engine Longevity</h2>
<p>Regardless of what kind of car you have — a brand new crossover from a dealership or a time-tested, reliable sedan with high mileage — its heart needs high-quality lubrication.</p>
<p>The Valesco Oil brand offers a balanced line of motor oils. In our catalog, you will find high-tech 100% synthetics for demanding modern engines, as well as stable semi-synthetics that will provide a second youth to your high-mileage vehicle.</p>
<p>Choose the right type of oil, follow the manufacturer's recommendations, and order original products at Valesco Oil!</p>`,
  },
  {
    title:
      'What Do the Numbers on the Canister Mean? A Complete Guide to Motor Oil Viscosity: 5W-30, 10W-40, 15W-40',
    slug: 'what-do-numbers-on-canister-mean-oil-viscosity-guide',
    language: 'en',
    description:
      'Complete guide to motor oil viscosity SAE: what 5W-30, 10W-40, 15W-40 mean. How to decode numbers on the canister and choose the right oil — Valesco Oil.',
    metaTitle:
      'What Do the Numbers on the Canister Mean? Complete Guide to Motor Oil Viscosity | Valesco Oil',
    metaDescription:
      'What do 5W-30, 10W-40, 15W-40 on the canister mean? Complete SAE classification guide and motor oil viscosity tips from Valesco Oil.',
    content: `<p>When visiting an auto parts store or choosing oil on a website, every car owner sees mysterious combinations on the canisters: 5W-30, 10W-40, 15W-40. For many, it is just a set of numbers, but this very code encrypts the main parameter of your engine's health — viscosity.</p>
<p>What do these letters and numbers mean? How do you decode the SAE classification? And what happens if you pour in the "wrong" oil? The experts at Valesco Oil have prepared a detailed and easy-to-understand guide that will settle this question once and for all.</p>

<h2>What is the SAE Classification?</h2>
<p>The letters SAE on a canister mean that the oil's viscosity was measured according to the standard of the Society of Automotive Engineers (USA). This is an international standard that divides oils into winter, summer, and all-season types.</p>
<p>Today, practically all civilian motor oils are all-season. This is precisely why their marking consists of two numbers with the letter "W" between them.</p>

<h2>Let's break down the popular 5W-30 oil into its components:</h2>

<h3>1. The First Number and the Letter "W" (Winter Index)</h3>
<p>The letter W stands for Winter. The number standing before it indicates the low-temperature properties of the oil. It shows how easily the engine will start in freezing weather and how quickly the pump will circulate the oil through the system to all moving parts.</p>
<p><strong>Simple Formula:</strong> To find out the minimum temperature at which the oil pump can circulate the fluid, you need to subtract 35 from the first digit.</p>
<ul>
<li><strong>0W:</strong> (0 - 35 = -35°C) — extreme frosts.</li>
<li><strong>5W:</strong> (5 - 35 = -30°C) — excellent startup in average winter conditions.</li>
<li><strong>10W:</strong> (10 - 35 = -25°C) — moderate winter, highly popular in the CIS region.</li>
<li><strong>15W:</strong> (15 - 35 = -20°C) — for warm winters or commercial equipment.</li>
</ul>

<h3>2. The Second Number (Summer Index)</h3>
<p>The number after the hyphen (30, 40, 50) is an indicator of high-temperature viscosity. It specifies how thick the oil remains at the operating temperature of a running engine (around 100°C – 150°C).</p>
<p>The higher this number, the thicker and stronger the oil film on the components during severe heat or high loads.</p>
<ul>
<li><strong>30</strong> — energy-conserving oils for modern Japanese, Korean, and certain European cars.</li>
<li><strong>40</strong> — the classic "gold standard," providing robust protection at high temperatures.</li>
<li><strong>50 / 60</strong> — thick oils for sports cars or heavily worn engines.</li>
</ul>

<h2>Breakdown of Popular Classes: What's the Difference?</h2>
<p>Let's compare the three most common viscosity classes that car owners search for most frequently:</p>
<table>
<thead>
<tr><th>Viscosity Class</th><th>Base Type (Most Common)</th><th>Temperature Range</th><th>Who is it for?</th></tr>
</thead>
<tbody>
<tr><td>5W-30</td><td>Synthetic</td><td>from -30 to +35°C</td><td>Modern engines (many new cars from dealerships) where clearances between components are minimal.</td></tr>
<tr><td>10W-40</td><td>Semi-synthetic</td><td>from -25 to +40°C</td><td>The most popular choice for vehicles with a mileage over 100k-150k km. An excellent balance of price and protection.</td></tr>
<tr><td>15W-40</td><td>Mineral / Semi-synthetic</td><td>from -20 to +45°C</td><td>Commercial transport, trucks, old diesel engines, or regions with an exclusively hot climate.</td></tr>
</tbody>
</table>

<h2>Main Myths About Oil Viscosity</h2>
<p><strong>Myth 1:</strong> "The thicker the oil, the better it is for the engine."</p>
<p><strong>Reality:</strong> If you pour 10W-60 oil into a modern engine designed for 5W-30, the fluid will be too thick to pass through narrow oil channels. The engine will experience "oil starvation" and quickly fail.</p>
<p><strong>Myth 2:</strong> "You must switch to 10W-40 in the summer and to 5W-30 in the winter."</p>
<p><strong>Reality:</strong> Modern all-season oils (such as the lineup from Valesco Oil) operate stably all year round. You should only change viscosity if it is recommended by your vehicle manufacturer.</p>

<h2>Which Viscosity to Choose for Your Car?</h2>
<p>The golden rule for any car owner is to always look into the vehicle's service manual. The engineers who created your engine have already calculated the ideal clearances and specified the required SAE index.</p>
<p>If your vehicle requires stable protection during both a freezing winter startup and scorching summer heat, check out the range of lubricants from Valesco Oil. Our catalog features motor oils of all popular viscosity classes, created on the basis of premium base oils and modern additive packages.</p>
<p><strong>Valesco Oil — ideal viscosity and maximum protection for your engine under any conditions!</strong></p>`,
  },
];

function escapeSql(value) {
  return value.replace(/'/g, "''");
}

function dollarQuote(value, tag = 'article_html') {
  return `$${tag}$${value}$${tag}$`;
}

const inserts = articles
  .map(
    (a) => `INSERT INTO "articles" ("title", "slug", "language", "description", "content", "metaTitle", "metaDescription", "published")
SELECT '${escapeSql(a.title)}', '${escapeSql(a.slug)}', '${escapeSql(a.language)}', '${escapeSql(a.description)}', ${dollarQuote(a.content)}, '${escapeSql(a.metaTitle)}', '${escapeSql(a.metaDescription)}', true
WHERE NOT EXISTS (SELECT 1 FROM "articles" WHERE "slug" = '${escapeSql(a.slug)}' AND "language" = '${escapeSql(a.language)}');`,
  )
  .join('\n\n');

const sql = `-- 3 ta ingliz tilidagi SEO maqolani bazaga kiritish

${inserts}
`;

const outPath = path.join(__dirname, '..', 'seed_articles_en.sql');
fs.writeFileSync(outPath, sql, 'utf8');
console.log('Generated:', outPath);
