// Extra content for each service detail page, keyed by service slug (see `services` in lib/data.js).
// `cases` lists client names from `caseStudies` in lib/data.js that relate to the service.
// TODO: App Development and Sitecare have no dedicated case study yet — add one when available.

export const serviceDetails = {
  'website-design': {
    why: {
      title: 'Your website is your hardest-working salesperson',
      text: 'Most visitors decide within seconds whether to stay. Good design is not decoration — it is clear structure, a message that lands, and a path that leads people to act. We design around your customers and your goals, so every page earns its place.',
    },
    benefits: [
      { icon: 'target', title: 'Designed to convert', text: 'Clear calls to action and page journeys built around the decisions your visitors need to make.' },
      { icon: 'users', title: 'Built on real user needs', text: 'Information architecture and content structure shaped by how your customers actually look for information.' },
      { icon: 'layers', title: 'A reusable design system', text: 'Consistent components and styles that keep the brand coherent as the site grows.' },
      { icon: 'mobile', title: 'Responsive and accessible', text: 'Layouts that work on every screen and follow accessibility best practice.' },
    ],
    deliverables: ['Discovery workshop & goals', 'Sitemap & information architecture', 'Wireframes for key pages', 'High-fidelity UI designs', 'Interactive prototype', 'Design system & developer handoff'],
    stack: ['Figma', 'FigJam', 'Design systems', 'Prototyping', 'Accessibility (WCAG)'],
    cases: ['Mattressville', 'Demo Soap'],
    faqs: [
      { q: 'Do you redesign existing websites?', a: 'Yes. We start by reviewing what works and what does not on your current site, then redesign around your goals — often keeping the content and structure that already performs.' },
      { q: 'Will we see the design before development starts?', a: 'Always. You review wireframes and high-fidelity designs, plus an interactive prototype, and we refine them with you before any code is written.' },
      { q: 'Can you work with our existing brand guidelines?', a: 'Yes. We work within your brand, or help extend it into a full digital design system if it needs one.' },
    ],
  },

  'website-development': {
    why: {
      title: 'Fast, secure and easy for your team to manage',
      text: 'A beautiful design only pays off if the site loads quickly, ranks well and is easy to update. We build on proven platforms and modern frameworks, tuned for performance and SEO, with a content system your team can actually use.',
    },
    benefits: [
      { icon: 'bolt', title: 'Performance first', text: 'Optimised assets, caching and modern rendering for fast load times on every device.' },
      { icon: 'chart', title: 'SEO-ready foundations', text: 'Clean markup, metadata, structured data and sitemaps built in from day one.' },
      { icon: 'design', title: 'Easy content editing', text: 'A CMS set up around your content, so updates do not need a developer.' },
      { icon: 'shield', title: 'Secure and maintainable', text: 'Well-structured code, security best practice and a clear path for future changes.' },
    ],
    deliverables: ['Front-end development', 'CMS setup & content modelling', 'Integrations (forms, CRM, analytics)', 'Performance & SEO tuning', 'Cross-browser & device testing', 'Launch, hosting & handover'],
    stack: ['WordPress', 'Headless CMS', 'React', 'Next.js', 'Laravel', 'Node.js'],
    cases: ['Mattressville', 'Demo Soap'],
    faqs: [
      { q: 'Which platform should we use?', a: 'It depends on your content, team and growth plans. We recommend the simplest platform that fits — often WordPress or a headless CMS for content sites, and React/Next.js or Laravel for more custom needs.' },
      { q: 'Can you migrate our existing content?', a: 'Yes. We plan and handle content migration, and set up redirects so you keep the search rankings you already have.' },
      { q: 'Who hosts and maintains the site?', a: 'We can recommend and set up hosting, and our Sitecare plans cover ongoing updates, security and backups after launch.' },
    ],
  },

  'app-development': {
    why: {
      title: 'Put your service in your customers’ pockets',
      text: 'A well-built app keeps customers engaged and makes your service easier to use. We design and build mobile apps that feel native, connect cleanly to your systems, and are planned for the app-store launch and the updates that follow.',
    },
    benefits: [
      { icon: 'mobile', title: 'Native-quality experience', text: 'Smooth, familiar interfaces that follow iOS and Android conventions.' },
      { icon: 'layers', title: 'One codebase, two platforms', text: 'Cross-platform development where it makes sense, to reduce cost and time to market.' },
      { icon: 'link', title: 'Connected to your systems', text: 'Secure APIs and integrations with your existing backend, CRM or database.' },
      { icon: 'cloud', title: 'Launch-ready', text: 'App-store preparation, submission support and a plan for post-launch updates.' },
    ],
    deliverables: ['Product discovery & feature scoping', 'UX flows & app UI design', 'iOS & Android development', 'API & backend integration', 'Testing on real devices', 'App Store & Google Play launch'],
    stack: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Node.js', 'Firebase'],
    cases: ['Inovexia', 'Klej'],
    faqs: [
      { q: 'Native or cross-platform?', a: 'For most business apps, a cross-platform approach delivers a native-quality experience on both platforms for less cost. We recommend fully native development when an app needs deep device features or maximum performance.' },
      { q: 'Do you help publish to the app stores?', a: 'Yes. We prepare store listings, handle the submission process and help you through review requirements.' },
      { q: 'Can the app work with our existing system?', a: 'Usually, yes. We connect apps to existing backends through secure APIs, or build the backend alongside the app if needed.' },
    ],
  },

  'custom-software': {
    why: {
      title: 'Stop bending your business around generic tools',
      text: 'When spreadsheets, email chains and off-the-shelf tools stop keeping up, custom software lets your process work the way your business does. We map how work really flows, then build portals, systems and dashboards around it.',
    },
    benefits: [
      { icon: 'target', title: 'Fits how you work', text: 'Software designed around your real workflows, roles and approval steps.' },
      { icon: 'chart', title: 'One source of truth', text: 'Data in one place with dashboards and reporting your team can trust.' },
      { icon: 'link', title: 'Connected systems', text: 'Integrations with the tools you already use, instead of copy-paste between them.' },
      { icon: 'shield', title: 'You own it', text: 'Secure, role-based access, built to grow with your business.' },
    ],
    deliverables: ['Process mapping & requirements', 'System architecture', 'Customer & internal portals', 'Dashboards & reporting', 'Third-party integrations', 'Documentation & training'],
    stack: ['React', 'Next.js', 'Node.js', 'Laravel', 'PostgreSQL', 'MySQL'],
    cases: ['Klej', 'Inovexia'],
    faqs: [
      { q: 'When does custom software make sense?', a: 'When your team works around tools rather than with them — re-typing data, chasing approvals by email, or relying on spreadsheets only one person understands. A short discovery session usually makes the answer clear.' },
      { q: 'Can you build it in phases?', a: 'Yes, and we recommend it. We start with the part that delivers the most value, then build out in manageable phases you can review along the way.' },
      { q: 'Do we own the code?', a: 'Yes. You own the software we build for you, along with its documentation.' },
    ],
  },

  'business-automation': {
    why: {
      title: 'Give your team back the hours lost to repetitive work',
      text: 'Re-typing data, chasing approvals and rebuilding the same report every week quietly eats into every team’s time. We connect your systems and automate the repetitive steps, so work moves on its own and people focus on what matters.',
    },
    benefits: [
      { icon: 'bolt', title: 'Less manual work', text: 'Repetitive tasks, hand-offs and data entry handled automatically.' },
      { icon: 'check', title: 'Fewer errors', text: 'Consistent, rule-based processes instead of copy-paste mistakes.' },
      { icon: 'link', title: 'Systems that talk', text: 'Your CRM, accounting, email and internal tools kept in sync.' },
      { icon: 'chart', title: 'Visibility', text: 'Notifications, logs and reports so you always know what ran and what changed.' },
    ],
    deliverables: ['Workflow & time audit', 'Automation roadmap', 'System integrations', 'Data sync & clean-up', 'Notifications & triggers', 'Monitoring & documentation'],
    stack: ['Node.js', 'Python', 'REST APIs', 'Webhooks', 'Zapier', 'Make'],
    cases: ['Klej'],
    faqs: [
      { q: 'What can be automated?', a: 'Anything rule-based and repetitive: moving data between systems, approvals, notifications, report generation, invoicing steps and more. We start by finding where your team loses the most time.' },
      { q: 'Do we need to replace our current tools?', a: 'Usually not. Most automation connects the tools you already use. We only suggest replacing a tool when it is genuinely the bottleneck.' },
      { q: 'What happens if an automation fails?', a: 'We build in monitoring, logging and alerts, so problems are caught early and you can see exactly what happened.' },
    ],
  },

  'saas-platforms': {
    why: {
      title: 'Turn your expertise into a scalable product',
      text: 'A SaaS platform needs more than features: accounts, roles, subscriptions, billing and infrastructure that scales. We design and build multi-user platforms with those foundations in place, so you can launch, learn and grow.',
    },
    benefits: [
      { icon: 'users', title: 'Multi-tenant by design', text: 'Customer accounts, data separation and per-account settings planned from the start.' },
      { icon: 'briefcase', title: 'Subscriptions & billing', text: 'Plans, trials, upgrades and recurring payments wired in.' },
      { icon: 'shield', title: 'Roles & permissions', text: 'Fine-grained access for admins, staff and customers.' },
      { icon: 'cloud', title: 'Scalable infrastructure', text: 'Cloud hosting and architecture that grows with your user base.' },
    ],
    deliverables: ['Product strategy & MVP scope', 'UX/UI design', 'Multi-tenant architecture', 'Billing & subscription setup', 'Admin & support tools', 'Cloud deployment & monitoring'],
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS / Azure'],
    cases: ['Inovexia'],
    faqs: [
      { q: 'Should we start with an MVP?', a: 'Usually, yes. We help you define the smallest product that proves your idea with real customers, then build from there based on what you learn.' },
      { q: 'Can you handle subscription billing?', a: 'Yes. We integrate payment providers such as Stripe for plans, trials, upgrades, invoices and failed-payment handling.' },
      { q: 'Can you take over an existing platform?', a: 'Often, yes. We start with a technical review of the codebase and give you an honest recommendation on whether to extend or rebuild.' },
    ],
  },

  sitecare: {
    why: {
      title: 'Launch is the start, not the finish',
      text: 'Websites and software sit on plugins, frameworks and hosting that change constantly. Without regular care, things slow down, break or become vulnerable. Sitecare keeps your digital products secure, fast and up to date — with a team that already knows your system.',
    },
    benefits: [
      { icon: 'shield', title: 'Security & updates', text: 'Regular updates, patches and security monitoring.' },
      { icon: 'cloud', title: 'Backups & uptime', text: 'Scheduled backups and uptime monitoring, so issues are caught fast.' },
      { icon: 'bolt', title: 'Performance', text: 'Speed checks and optimisation to keep pages fast as content grows.' },
      { icon: 'users', title: 'A team that knows you', text: 'Ongoing improvements and support from people familiar with your system.' },
    ],
    deliverables: ['Software & plugin updates', 'Security monitoring', 'Scheduled backups', 'Uptime monitoring', 'Performance checks & fixes', 'Monthly report & support hours'],
    stack: ['WordPress', 'Laravel', 'Next.js', 'Cloud hosting', 'Monitoring tools'],
    cases: ['Mattressville', 'Inovexia'],
    faqs: [
      { q: 'Can you look after a site you did not build?', a: 'Yes. We start with a health check to understand the setup, fix anything urgent, and then bring it into a regular care plan.' },
      { q: 'What happens if something breaks?', a: 'Monitoring alerts us to problems, and support requests are handled by a team that already knows your system — so fixes are faster.' },
      { q: 'Are there different plan levels?', a: 'Yes. Plans vary by update frequency, support hours and monitoring depth. We will recommend the level that fits your site.' },
    ],
  },
};
