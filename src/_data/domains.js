const DOMAINS = {
  architecture: {
    id: 'architecture',
    symbol: '■',
    label: 'Architecture',
    description:
      'How complex systems are intentionally structured to endure change. Includes technical architecture, organizational and business architecture, governance and oversight as architectural properties, authority, boundaries, coupling, and failure modes.',
  },
  ia: {
    id: 'ia',
    symbol: '⬡',
    label: 'Information Architecture',
    description:
      'How information is structured, named, and related so humans and agents can find, understand, and reason over it. IA exists at the intersection of information, architecture, and user experience.',
  },
  ux: {
    id: 'ux',
    symbol: '○',
    label: 'UX Research & Design',
    description:
      'How people experience, interpret, and are affected by systems. Includes research, synthesis, sense-making, interaction and service design, ethics, accessibility, human factors, and systemic critique.',
  },
  agentic: {
    id: 'agentic',
    symbol: '◇',
    label: 'Agentic Technology & AI Systems',
    description:
      'How autonomous or semi-autonomous systems behave, are controlled, and fail over time. Includes agentic workflows and planning, tool use and delegation, observability, evaluation, guardrails, oversight, alignment, and risk containment.',
  },
};

const DOMAIN_IDS = ['architecture', 'ia', 'ux', 'agentic'];

module.exports = {
  domains: Object.values(DOMAINS),
  domainIds: DOMAIN_IDS,
  getDomainById: (id) => DOMAINS[id] || null,
};
