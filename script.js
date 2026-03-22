const projectsData = [
    {
        title: "Sistema de Gerenciamento de Biblioteca",
        description: "Controle de acervo, empréstimos e cadastro de alunos, com regras de negócio relativas a multas e devoluções.",
        frontend: ["HTML/CSS/JS", "Formulários", "Busca Real-time"],
        backend: ["Node.js/Python", "API REST", "Autenticação JWT"],
        database: ["Modelagem Relacional", "Consultas e Joins", "Triggers"],
        difficulty: "iniciante",
        difficultyText: "Iniciante",
        icon: "ph-books",
        color: "#38bdf8"
    },
    {
        title: "Plataforma de Vendas da Cantina",
        description: "Uma loja virtual para alunos fazerem pedidos na cantina, integrando carrinho, controle de estoque e fila.",
        frontend: ["React/Vue ou JS Avançado", "Local Storage", "State Mgmt"],
        backend: ["Cadastro de Produtos", "Checkout", "Painel Admin"],
        database: ["Transações", "Views de Faturamento", "Relacionamentos N:M"],
        difficulty: "intermediario",
        difficultyText: "Intermediário",
        icon: "ph-storefront",
        color: "#fbbf24"
    },
    {
        title: "Rede Social / Fórum Escolar",
        description: "Um espaço estilo StackOverflow interno, onde alunos postam dúvidas, respondem e recebem pontos de reputação.",
        frontend: ["Componentização", "Rich Text Editor", "Feed Dinâmico"],
        backend: ["Sistema de Reputação", "WebSockets (Chat)", "Filtros/Paginação"],
        database: ["Árvore de Comentários", "Índices Full-text", "Tabelas de Log"],
        difficulty: "avancado",
        difficultyText: "Avançado",
        icon: "ph-chat-circle-text",
        color: "#a78bfa"
    },
    {
        title: "App de Agendamento de Quadras",
        description: "Sistema para reservas de espaços comuns, evitando conflitos de horários e com limite de cotas por aluno.",
        frontend: ["Calendários Interativos", "UX Mobile First", "Validação Visual"],
        backend: ["Lógica Anti-choque", "Notificações de E-mail", "CRON Jobs"],
        database: ["Restrições Unique", "Campos Date/Time", "Stored Procedures"],
        difficulty: "intermediario",
        difficultyText: "Intermediário",
        icon: "ph-calendar-check",
        color: "#34d399"
    },
    {
        title: "Vitrine de Repositórios da Turma",
        description: "Uma plataforma que consome APIs do GitHub dos alunos e agrega seus projetos num portfólio público.",
        frontend: ["Consumo de APIs Externas", "Gráficos com Chart.js", "Animações"],
        backend: ["Integração OAuth", "Caching de Dados", "Tratamento de Rate Limit"],
        database: ["Tipos JSON", "Atualização em Background", "Índices"],
        difficulty: "iniciante",
        difficultyText: "Iniciante",
        icon: "ph-github-logo",
        color: "#f472b6"
    },
    {
        title: "Sistema de Votação do Grêmio",
        description: "Plataforma extremamente segura e anônima para votação, com apuração de resultados em tempo real.",
        frontend: ["Proteção contra XSS", "Dashboards Dinâmicos", "Acessibilidade"],
        backend: ["Criptografia (Hashing)", "Prevenção de Ataques", "Concorrência Alta"],
        database: ["Logs Imutáveis", "Atomicidade (ACID)", "Isolamento Estrito"],
        difficulty: "avancado",
        difficultyText: "Avançado",
        icon: "ph-fingerprint",
        color: "#f87171"
    }
];

// Generate Tech Tags HTML
function generateTagsHTML(tags, type) {
    return tags.map(tag => `<span class="tag tag-${type}">${tag}</span>`).join('');
}

// Render Project Cards
function renderProjects(filter = 'all') {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.difficulty === filter);
        
    filteredProjects.forEach((project, index) => {
        // Animation delay cascade
        const delay = index * 0.1;
        
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.animation = `fadeInUp 0.6s ease forwards ${delay}s`;
        card.style.opacity = '0';
        
        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon" style="color: ${project.color}; border-color: ${project.color}33">
                    <i class="${project.icon}"></i>
                </div>
                <span class="difficulty-badge diff-${project.difficulty}">${project.difficultyText}</span>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-desc">${project.description}</p>
            
            <div class="tech-sections">
                <div class="tech-row">
                    <span class="tech-label"><i class="ph ph-device-mobile"></i> Front-end</span>
                    <div class="tech-tags">
                        ${generateTagsHTML(project.frontend, 'front')}
                    </div>
                </div>
                <div class="tech-row">
                    <span class="tech-label"><i class="ph ph-server"></i> Back-end</span>
                    <div class="tech-tags">
                        ${generateTagsHTML(project.backend, 'back')}
                    </div>
                </div>
                <div class="tech-row">
                    <span class="tech-label"><i class="ph ph-database"></i> Database</span>
                    <div class="tech-tags">
                        ${generateTagsHTML(project.database, 'db')}
                    </div>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Add CSS animation dynamically for the cards
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    renderProjects();
    
    // Smooth Scroll
    document.getElementById('scrollToProjects').addEventListener('click', () => {
        document.getElementById('projetos').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Filters Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            e.target.classList.add('active');
            // Render with filter
            renderProjects(e.target.dataset.filter);
        });
    });
});
