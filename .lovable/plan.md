

## Marketing Planner for Running Shoe Brand Managers

### Design System
- **Cream/warm background** (`#FAF7F2`) inspired by the reference image
- **Elegant serif font** (Playfair Display) for headings, clean sans-serif for body
- **Calm color palette**: cream, soft coral, sage green, muted blue, warm yellow — used for post-its
- **Rounded cards** with subtle shadows, matching the reference gallery style

---

### Page 1: Landing Page (unauthenticated)

**Hero Section**
- Large serif heading: *"Build with a team of smart marketers"*
- Subtitle explaining the AI-powered campaign planning tool for running shoe brands

**Canvas Animation Section**
- 5 colorful post-it notes (coral, sage, blue, yellow, lavender) fly in from different directions with staggered CSS animations
- Once landed on the cream canvas, they smoothly morph/transform into insight cards (e.g., "Target Persona", "Ad Keywords", "Campaign Brief", "Social Strategy", "Budget Split")
- Smooth spring-like animation using CSS keyframes

**Sign Up Section**
- Google Sign-In button (Supabase Auth with Google provider)
- Clean, minimal design with the brand styling

---

### Page 2: Main App (authenticated)

**Hero**
- *"Build your next campaign"* in elegant serif

**Canvas — First-Time User Onboarding**
- Blank cream-colored canvas
- Pulsing nudge/tooltip: "Place a post-it to get started"
- A single post-it appears with prompt: *"Describe the idea you want to test"*
- User types their idea into the post-it's text area
- User drags/clicks to place it on the canvas

**Loading State** (triggered after post-it placement)
- Message: *"Your team of marketers are warming up"*
- CSS-animated teddy bear doing push-ups (simple SVG bear with keyframe animation)
- Fun text: *"Do some push-ups while the agents do their job"*

**Result View — Campaign Output**
- 3 persona cards (gallery-style like reference image) each showing:
  - Persona name & avatar illustration
  - Demographics & psychographics
  - Relevant keywords list
  - Suggested ad angle
- Cards styled with rounded corners, thumbnails, author-style attribution, and tool icons — matching the reference aesthetic
- All data is mock/hardcoded for now

---

### Backend (Supabase)
- **Google Auth** via Supabase
- **Campaigns table** to save user campaigns (idea text, generated results as JSON)
- **Profiles table** linked to auth.users

---

### Pages & Routes
- `/` — Landing page (unauthenticated)
- `/app` — Main canvas page (authenticated, protected route)

