export const profile = {
  name: "Thales Marques",
  handle: "@thalessmz",
  role: "Desenvolvedor Back-end Java",
  location: "Rio de Janeiro, BR",
  tagline: "Transformando lógica e código em soluções escaláveis.",
  email: "marquesthales345@gmail.com",
  socials: [
    { label: "Instagram", href: "https://instagram.com/thalessmz" },
    { label: "Github", href: "https://github.com/thaleszm" },
    { label: "LinkedIn", href: "https://linkedin.com/in/thaleszm" },
  ],
  bio: [
    "Graduando em Licenciatura em Computação e Técnico em Automação Industrial, com foco em desenvolvimento Back-end utilizando Java, Spring Boot e bancos de dados relacionais.",
    "Tenho experiência com lógica de programação, estruturas de dados, APIs REST, SQL Server, MySQL e PostgreSQL, além de conhecimentos em JavaScript, Node.js, React, Docker, Git e implantação de aplicações na nuvem.",
  ],
  stack: [
    { label: "Java", level: "daily-driver" },
    { label: "Spring Boot", level: "daily-driver" },
    { label: "Git/GitHub", level: "daily-driver" },
    { label: "SQL Server", level: "frequente" },
    { label: "PostgreSQL", level: "frequente" },
    { label: "MySQL", level: "frequente" },
    { label: "Docker", level: "frequente" },
    { label: "Node.js", level: "ocasional" },
    { label: "React", level: "ocasional" },
  ],
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  method: "GET" | "POST" | "PUT";
  status: "200 OK" | "201 CREATED" | "deployed";
  category: string;
  description: string;
  tags: string[];
  color: string; // pastel token
  commit: string;
};

export const projects: Project[] = [
  {
    slug: "atm-simulator",
    title: "Simulador de Caixa Eletrônico",
    client: "Projeto Acadêmico",
    year: "2026",
    method: "POST",
    status: "201 CREATED",
    category: "Java · Lógica de Programação",
    description:
      "Sistema desenvolvido em Java simulando operações bancárias como saque, depósito, transferência e consulta de saldo utilizando estruturas de decisão e repetição.",
    tags: ["java", "algoritmos", "poo"],
    color: "sky",
    commit: "a7b9d1f",
  },
  {
    slug: "portfolio-fullstack",
    title: "Portfólio Full Stack",
    client: "Projeto Pessoal",
    year: "2026",
    method: "GET",
    status: "deployed",
    category: "React · Node.js",
    description:
        "Portfólio profissional desenvolvido para apresentar projetos, habilidades e experiências utilizando React e tecnologias modernas de deploy.",
    tags: ["react", "nodejs", "frontend"],
    color: "mint",
    commit: "b5f8e2c",
  },
  {
    slug: "smart-socket",
    title: "Tomada Inteligente por Aproximação",
    client: "TCC",
    year: "2025",
    method: "POST",
    status: "201 CREATED",
    category: "IoT · Automação",
    description:
        "Projeto de conclusão de curso utilizando sensores para acionamento automático de uma tomada através de aproximação.",
    tags: ["iot", "automacao", "eletronica"],
    color: "butter",
    commit: "c8e3a7d",
  },
  {
    slug: "cnc-plotter",
    title: "Máquina CNC à Caneta",
    client: "TCC",
    year: "2025",
    method: "PUT",
    status: "200 OK",
    category: "Automação · CNC",
    description:
        "Desenvolvimento de uma CNC à caneta para desenho automatizado, integrando conceitos de mecânica, eletrônica e programação.",
    tags: ["cnc", "arduino", "automacao"],
    color: "rose",
    commit: "d2f4b8a",
  },
];

export const colorTokens: Record<string, { bg: string; text: string; name: string }> = {
  lilac: { bg: "#D9C8F0", text: "#3D2E5C", name: "lilás" },
  rose: { bg: "#F6C9D9", text: "#5C2A3A", name: "rosa" },
  butter: { bg: "#F3E3A0", text: "#5C4A1A", name: "amarelo" },
  mint: { bg: "#BFE3D0", text: "#1E4A35", name: "menta" },
  sky: { bg: "#C2D9F0", text: "#1F3A5C", name: "azul" },
};

export const terminalCommands: Record<
  string,
  { output: string[]; action?: "scroll"; target?: string }
> = {
  help: {
    output: [
      "comandos disponíveis:",
      "  whoami        → sobre mim",
      "  ls projetos   → lista de projetos",
      "  cat sobre.txt → bio completa",
      "  clear         → limpa o terminal",
    ],
  },
  whoami: {
    output: [`${profile.name} — ${profile.role}`, `localização: ${profile.location}`],
  },
  "ls projetos": {
    output: projects.map((p) => `./${p.slug}/  ${p.status}  [${p.year}]`),
  },
  "cat sobre.txt": {
    output: profile.bio,
  },
};

export const nav = [
  { label: "projetos", href: "#projetos" },
  { label: "sobre", href: "#sobre" },
  { label: "contato", href: "#contato" },
];
