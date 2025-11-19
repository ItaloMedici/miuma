import { CaregiverDataJson, CaregiverEntity } from "@/interfaces/caregiver";

const data: CaregiverDataJson = {
  profile: {
    caregiverImageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    galleryImages: {
      cover: {
        url: "https://images.unsplash.com/photo-1759046346389-a63d2e3548bf?q=80&w=1287&auto=format&fit=crop",
        alt: "Foto de capa",
      },
      photos: [
        {
          url: "https://images.unsplash.com/photo-1494947665470-20322015e3a8?q=80&w=2370&auto=format&fit=crop",
          alt: "Foto 1",
        },
        {
          url: "https://images.unsplash.com/photo-1560743641-3914f2c45636?q=80&w=1287&auto=format&fit=crop",
          alt: "Foto 2",
        },
      ],
    },
    descriptionMarkdown: `# Minha História com os Animais

Olá! Meu nome é **Maria Silva** e dedico minha vida ao resgate e cuidado de animais abandonados há mais de 5 anos. Tudo começou quando encontrei uma cachorrinha machucada na porta de casa. Naquele momento, não imaginava que aquele encontro mudaria completamente o rumo da minha vida.

## Como Tudo Começou

Em 2019, morava sozinha em um apartamento pequeno quando *Luna* (sim, aquela mesma que está precisando de cirurgia agora) apareceu na minha porta. Ela estava desnutrida, com ferimentos nas patas e muito assustada. Levei-a ao veterinário e, após alguns meses de cuidados, ela se recuperou completamente.

Foi então que percebi: **se eu consegui ajudar um animal, por que não ajudar mais?**

## O Refúgio Hoje

Atualmente, cuido de **12 animais resgatados** em uma casa que aluguei especialmente para esse propósito. Cada um deles tem uma história única de superação:

- **Thor**: Resgatado de maus tratos, hoje é o mais carinhoso da casa
- **Mel**: Abandonada filhote, agora é uma gatinha brincalhona
- **Bob**: O vovô da turma, chegou idoso mas ganhou uma nova chance
- **Nina**: Mãe de 5 filhotes que já foram todos adotados
- **Rex**: Ex-cão de guarda que aprendeu a confiar novamente

E muitos outros peludos que encontraram um lar temporário ou permanente aqui.

## Rotina de Cuidados

### Alimentação
Todos os dias preparo refeições balanceadas para cada animal, respeitando as necessidades especiais de cada um. Thor, por exemplo, tem alergia alimentar e precisa de ração especial.

### Saúde
Mantemos um calendário rigoroso de:
- Vacinação em dia
- Vermifugação trimestral
- Check-ups veterinários regulares
- Tratamentos específicos quando necessário

### Amor e Socialização
Mas o mais importante: todos recebem muito amor, atenção e tempo para brincar. Acredito que *além da saúde física, a saúde emocional é fundamental* para a recuperação desses animais.

## Transparência Total

Uma das coisas que mais prezo é a **transparência** com quem nos apoia. Todos os meses:

1. Publico relatórios detalhados de gastos
2. Compartilho fotos e vídeos dos animais
3. Disponibilizo comprovantes de despesas veterinárias
4. Atualizo sobre cada caso em andamento

## Meu Sonho

Meu maior sonho é conseguir construir um abrigo maior, onde possamos receber ainda mais animais que precisam de ajuda. Um lugar com:

- Área externa ampla para os cachorros correrem
- Consultório veterinário próprio
- Espaço para voluntários ajudarem
- Sala de socialização para preparar os animais para adoção

## Como Você Pode Ajudar

_"Sozinhos podemos fazer pouco, juntos podemos fazer muito"_ - Helen Keller

Cada doação, por menor que seja, faz **TODA** a diferença:

- R$ 30 = alimentação de um animal por uma semana
- R$ 100 = vacinas para um filhote
- R$ 250 = consulta veterinária de emergência
- R$ 500 = cirurgia de castração

---

### Gratidão

A todos que apoiam esse projeto: **MUITO OBRIGADA!** Vocês são parte essencial dessa história. Sem o apoio da comunidade, nada disso seria possível.

Juntos, estamos transformando vidas - tanto dos animais quanto a minha. 🐾❤️

*Com amor,*
*Maria Silva*`,
    ongoingCases: [
      {
        id: "1",
        title: "Cirurgia da Luna",
        description: "Luna precisa de cirurgia",
        targetAmount: 1500,
        currentAmount: 950,
        imageUrl:
          "https://images.unsplash.com/photo-1649609152484-970b013af72a?w=400",
      },
    ],
    recentUpdates: [
      {
        id: "1",
        date: "2024-11-15",
        message: "Luna passou pela consulta",
        emoji: "❤️",
      },
    ],
    socialProof: {
      totalSupporters: 127,
      testimonials: [
        {
          id: "1",
          name: "Ana Carolina",
          date: "2024-11-10",
          message: "Trabalho inspirador!",
        },
      ],
    },
    petsInCare: [
      {
        id: "1",
        name: "Luna",
        imageUrl:
          "https://images.unsplash.com/photo-1649609152484-970b013af72a?w=400",
        description: "Cachorrinha de 4 anos resgatada da rua",
      },
      {
        id: "2",
        name: "Thor",
        imageUrl:
          "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
        description: "Cachorro de porte grande com 6 anos, muito carinhoso",
      },
      {
        id: "3",
        name: "Mel",
        imageUrl:
          "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
        description: "Gatinha laranja de 2 anos, muito brincalhona",
      },
      {
        id: "4",
        name: "Bob",
        imageUrl:
          "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400",
        description: "Vira-lata de 8 anos, o mais velho da turma",
      },
      {
        id: "5",
        name: "Nina",
        imageUrl:
          "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400",
        description: "Filhote de 1 ano super energética",
      },
      {
        id: "6",
        name: "Rex",
        imageUrl:
          "https://images.unsplash.com/photo-1560743641-3914f2c45636?w=400",
        description: "Pastor alemão de 5 anos, muito protetor",
      },
      {
        id: "7",
        name: "Pipoca",
        imageUrl:
          "https://images.unsplash.com/photo-1494947665470-20322015e3a8?w=400",
        description: "Gato branco de 3 anos, adora dormir",
      },
      {
        id: "8",
        name: "Toby",
        imageUrl:
          "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=400",
        description: "Beagle de 4 anos, muito ativo e brincalhão",
      },
      {
        id: "9",
        name: "Bella",
        imageUrl:
          "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400",
        description: "Golden Retriever de 3 anos, extremamente dócil",
      },
      {
        id: "10",
        name: "Simba",
        imageUrl:
          "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400",
        description: "Gato tigrado de 5 anos, muito independente",
      },
      {
        id: "11",
        name: "Chico",
        imageUrl:
          "https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?w=400",
        description: "Poodle de 7 anos, carinhoso e tranquilo",
      },
      {
        id: "12",
        name: "Mia",
        imageUrl:
          "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400",
        description: "Gatinha siamesa de 2 anos, muito vocal",
      },
    ],
    expenses: [
      {
        title: "Ração Premium",
        amount: 850,
        date: "2024-11-01",
        occurrence: "monthly",
        type: "food",
      },
    ],
    location: {
      city: "Itaúna",
      state: "MG",
      country: "Brasil",
    },
    socialMedia: {
      instagram: "https://instagram.com/maria.silva.animais",
      facebook: "https://facebook.com/maria.silva.refugio",
      whatsapp: "https://wa.me/5531987654321",
      youtube: "https://youtube.com/@mariasilvaanimais",
    },
    shortBio:
      "Cuido de animais resgatados há mais de 5 anos. Com o apoio da comunidade, conseguimos oferecer alimentação de qualidade, cuidados veterinários e muito carinho.",
  },
  stats: {
    totalDonationsReceived: 45000,
    totalSupporters: 156,
    totalMonthlySupporters: 45,
    monthlyRecurringDonations: 8500,
    goal: {
      monthlyGoalAmount: 2500,
      currentMonthAmount: 1850,
      percentAchieved: 74,
    },
  },
  newsletterSubscribers: [
    {
      supporterId: "sup-001",
      email: "joao@example.com",
    },
    {
      supporterId: "sup-002",
      email: "ana@example.com",
    },
    {
      supporterId: "sup-003",
      email: "pedro@example.com",
    },
  ],
  monthlySupporters: [
    {
      supporterId: "sup-001",
      name: "João Santos",
      email: "joao@example.com",
      value: 100,
      location: {
        city: "São Paulo",
        state: "SP",
        country: "Brasil",
      },
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    },
    {
      supporterId: "sup-002",
      name: "Ana Costa",
      email: "ana@example.com",
      value: 150,
      location: {
        city: "Rio de Janeiro",
        state: "RJ",
        country: "Brasil",
      },
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    },
    {
      supporterId: "sup-003",
      name: "Pedro Oliveira",
      email: "pedro@example.com",
      value: 200,
      location: {
        city: "Belo Horizonte",
        state: "MG",
        country: "Brasil",
      },
    },
  ],
  history: {
    donationsReceived: [
      {
        amount: 100,
        date: "2024-11-15",
        supporterId: "sup-001",
        supporterName: "João Santos",
        location: {
          city: "São Paulo",
          state: "SP",
          country: "Brasil",
        },
        type: "monthly",
      },
      {
        amount: 500,
        date: "2024-11-10",
        supporterId: "sup-004",
        supporterName: "Carlos Lima",
        location: {
          city: "Curitiba",
          state: "PR",
          country: "Brasil",
        },
        type: "one-time",
      },
      {
        amount: 150,
        date: "2024-11-08",
        supporterId: "sup-002",
        supporterName: "Ana Costa",
        location: {
          city: "Rio de Janeiro",
          state: "RJ",
          country: "Brasil",
        },
        type: "monthly",
      },
      {
        amount: 300,
        date: "2024-11-05",
        supporterId: "sup-005",
        supporterName: "Fernanda Souza",
        location: {
          city: "Salvador",
          state: "BA",
          country: "Brasil",
        },
        type: "one-time",
      },
    ],
  },
  analytics: {
    pageViews: 0,
    uniqueVisitors: 0,
  },
};

const secondData: CaregiverDataJson = {
  profile: {
    galleryImages: {
      cover: {
        url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1287&auto=format&fit=crop",
        alt: "Foto de capa José",
      },
      photos: [
        {
          url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2370&auto=format&fit=crop",
          alt: "Foto 1",
        },
        {
          url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1287&auto=format&fit=crop",
          alt: "Foto 2",
        },
      ],
    },
    descriptionMarkdown: `

## Quem Somos

Sou **José Almeida**, fundador do projeto de resgate animal aqui em Porto Alegre. Há mais de **7 anos** dedico minha vida a dar uma segunda chance para animais que foram abandonados, maltratados ou que simplesmente precisam de um lar temporário.

### Nossa Missão

> *"Acreditamos que todo animal merece amor, respeito e dignidade. Nossa missão é resgatar, recuperar e encontrar lares amorosos para cada um deles."*

## A Jornada

Comecei esse trabalho em 2017, após me aposentar cedo e perceber que tinha tempo e disposição para fazer a diferença. O que começou com 2 cachorros resgatados hoje se transformou em um projeto que já ajudou **mais de 150 animais**.

### Estrutura Atual

Hoje contamos com:

- Casa adaptada com 200m² de área externa
- 35 animais sob nossos cuidados
- Parceria com 3 clínicas veterinárias
- Rede de voluntários e apoiadores
- Taxa de adoção de 85% dos animais resgatados

## Histórias de Sucesso

### Max - O Sobrevivente
Max chegou até nós em estado crítico. Estava desidratado, desnutrido e com várias feridas. Hoje, após meses de tratamento, ele é um cachorro saudável e **está sendo tratado para uma condição crônica que descobrimos durante os exames**.

### A Família Feliz
Em 2023, resgatamos uma cadela grávida. Ela deu à luz 8 filhotes saudáveis aqui no refúgio. Todos foram adotados por famílias amorosas, e a mãe também encontrou seu lar para sempre.

## Nosso Dia a Dia

### Manhã (6h - 12h)
1. Alimentação matinal de todos os animais
2. Limpeza completa do espaço
3. Medicação para os que precisam
4. Primeira sessão de brincadeiras e exercícios

### Tarde (12h - 18h)
- Consultas veterinárias agendadas
- Banhos e tosas
- Socialização e treinamento
- Visitas de potenciais adotantes

### Noite (18h - 22h)
- Segunda alimentação
- Última volta externa
- Verificação de cada animal
- Preparação para a noite

## Desafios que Enfrentamos

### Custos Crescentes
Os custos com alimentação, veterinário e manutenção aumentam constantemente. **A ração especial para animais com alergias custa 3x mais** que a ração comum.

### Casos Complexos
Muitos animais chegam com traumas psicológicos profundos. Precisamos de:
- Tempo e paciência para reabilitação
- Medicamentos especiais
- Acompanhamento comportamental

### Espaço Limitado
Gostaria de poder ajudar mais animais, mas nosso espaço é limitado. *Cada animal precisa de espaço adequado para se recuperar com dignidade.*

## O Que Nos Diferencia

**1. Acompanhamento Pós-Adoção**
Não abandonamos os animais após a adoção. Mantemos contato com as famílias e oferecemos suporte sempre que necessário.

**2. Preparação para Adoção**
Todos os animais são:
- Castrados
- Vacinados
- Vermifugados
- Microchipados
- Socializados

**3. Transparência Radical**
Publicamos relatórios mensais detalhados com:
- Todas as receitas e despesas
- Fotos dos comprovantes
- Histórico de cada animal
- Estatísticas do projeto

## Parcerias

Trabalhamos em conjunto com:

- **Clínica Veterinária Pet Care**: Preços especiais para emergências
- **PetShop Amigo Fiel**: Desconto em rações e produtos
- **ONG Patinhas Unidas**: Feiras de adoção mensais
- **Voluntários**: 15 pessoas que ajudam regularmente

## Planos Futuros

### Curto Prazo (2025)
- [ ] Construir canil coberto para dias de chuva
- [ ] Instalar câmeras de monitoramento
- [ ] Criar espaço de isolamento para recém-chegados

### Médio Prazo (2026)
- [ ] Adquirir terreno próprio
- [ ] Construir consultório veterinário no local
- [ ] Contratar equipe permanente

### Longo Prazo (2027+)
- [ ] Criar centro de educação sobre posse responsável
- [ ] Programa de castração gratuita para a comunidade
- [ ] Expandir para atender casos de animais silvestres

## Como Sua Doação é Usada

### Distribuição dos Recursos

- **40%** - Alimentação (ração, suplementos)
- **35%** - Veterinário (consultas, exames, cirurgias)
- **15%** - Medicamentos
- **10%** - Manutenção (limpeza, reparos, contas)

### Impacto Real

Com **R$ 4.000 mensais** conseguimos:
- Alimentar 35 animais adequadamente
- Manter calendário veterinário em dia
- Fazer cirurgias emergenciais quando necessário
- Pagar aluguel e contas do espaço

## Agradecimentos

Quero agradecer especialmente:

- **À minha família**, que apoiou essa decisão desde o início
- **Aos voluntários**, que doam seu tempo e energia
- **Aos doadores**, que tornam tudo isso possível
- **Aos adotantes**, que abrem seus corações e lares

---

*"Até que alguém tenha amado um animal, parte de sua alma permanece sem despertar."* - Anatole France

**Vamos juntos fazer a diferença na vida desses animais! 🐕🐈**

*José Almeida*
*Fundador - Resgate Animal Porto Alegre*`,
    shortBio:
      "Cuido de animais resgatados há mais de 7 anos. Com o apoio da comunidade, conseguimos oferecer alimentação de qualidade, cuidados veterinários e muito carinho.",
    ongoingCases: [
      {
        id: "1",
        title: "Tratamento do Max",
        description: "Max precisa de tratamento",
        targetAmount: 2000,
        currentAmount: 1200,
        imageUrl:
          "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400",
      },
    ],
    recentUpdates: [
      {
        id: "1",
        date: "2024-11-16",
        message: "Max está respondendo bem ao tratamento",
        emoji: "🐕",
      },
      {
        id: "2",
        date: "2024-11-14",
        message: "Realizamos exames completos no Max",
        emoji: "🩺",
      },
      {
        id: "3",
        date: "2024-11-10",
        message: "Iniciamos o tratamento do Max",
        emoji: "💊",
      },
    ],
    socialProof: {
      totalSupporters: 243,
      testimonials: [
        {
          id: "1",
          name: "Lúcia Ferreira",
          date: "2024-11-14",
          message: "José é dedicado e transparente!",
        },
      ],
    },
    petsInCare: [
      {
        id: "1",
        name: "Max",
        imageUrl:
          "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400",
        description: "Cachorro de 6 anos em tratamento",
      },
    ],
    expenses: [
      {
        title: "Ração para todos",
        amount: 1500,
        date: "2024-11-01",
        occurrence: "monthly",
        type: "food",
      },
    ],
    location: {
      city: "Porto Alegre",
      state: "RS",
      country: "Brasil",
    },
    socialMedia: {
      instagram: "https://instagram.com/resgate.animal.poa",
      facebook: "https://facebook.com/resgateanimalportoalegre",
      whatsapp: "https://wa.me/5551998765432",
      youtube: "https://youtube.com/@resgateanimalportoalegre",
      tiktok: "https://tiktok.com/@resgateanimal_poa",
      website: "https://resgateanimal-poa.com.br",
    },
    caregiverImageUrl:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1287&auto=format&fit=crop",
  },
  stats: {
    totalDonationsReceived: 82000,
    totalSupporters: 243,
    totalMonthlySupporters: 78,
    monthlyRecurringDonations: 15600,
    goal: {
      monthlyGoalAmount: 4000,
      currentMonthAmount: 3200,
      percentAchieved: 80,
    },
  },
  newsletterSubscribers: [
    {
      supporterId: "sup-101",
      email: "lucia@example.com",
    },
    {
      supporterId: "sup-102",
      email: "marcos@example.com",
    },
    {
      supporterId: "sup-103",
      email: "julia@example.com",
    },
    {
      supporterId: "sup-104",
      email: "roberto@example.com",
    },
    {
      supporterId: "sup-105",
      email: "camila@example.com",
    },
  ],
  monthlySupporters: [
    {
      supporterId: "sup-101",
      name: "Lúcia Ferreira",
      email: "lucia@example.com",
      value: 250,
      location: {
        city: "Porto Alegre",
        state: "RS",
        country: "Brasil",
      },
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    },
    {
      supporterId: "sup-102",
      name: "Marcos Pereira",
      email: "marcos@example.com",
      value: 180,
      location: {
        city: "Florianópolis",
        state: "SC",
        country: "Brasil",
      },
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    },
    {
      supporterId: "sup-103",
      name: "Júlia Mendes",
      email: "julia@example.com",
      value: 300,
      location: {
        city: "Curitiba",
        state: "PR",
        country: "Brasil",
      },
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100",
    },
    {
      supporterId: "sup-104",
      name: "Roberto Cardoso",
      email: "roberto@example.com",
      value: 120,
      location: {
        city: "Brasília",
        state: "DF",
        country: "Brasil",
      },
    },
    {
      supporterId: "sup-105",
      name: "Camila Rodrigues",
      email: "camila@example.com",
      value: 400,
      location: {
        city: "São Paulo",
        state: "SP",
        country: "Brasil",
      },
      imageUrl:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100",
    },
  ],
  history: {
    donationsReceived: [
      {
        amount: 250,
        date: "2024-11-16",
        supporterId: "sup-101",
        supporterName: "Lúcia Ferreira",
        location: {
          city: "Porto Alegre",
          state: "RS",
          country: "Brasil",
        },
        type: "monthly",
      },
      {
        amount: 800,
        date: "2024-11-14",
        supporterId: "sup-106",
        supporterName: "Rafael Costa",
        location: {
          city: "Recife",
          state: "PE",
          country: "Brasil",
        },
        type: "one-time",
      },
      {
        amount: 180,
        date: "2024-11-12",
        supporterId: "sup-102",
        supporterName: "Marcos Pereira",
        location: {
          city: "Florianópolis",
          state: "SC",
          country: "Brasil",
        },
        type: "monthly",
      },
      {
        amount: 1000,
        date: "2024-11-09",
        supporterId: "sup-107",
        supporterName: "Empresa Tech SA",
        location: {
          city: "São Paulo",
          state: "SP",
          country: "Brasil",
        },
        type: "one-time",
      },
      {
        amount: 300,
        date: "2024-11-07",
        supporterId: "sup-103",
        supporterName: "Júlia Mendes",
        location: {
          city: "Curitiba",
          state: "PR",
          country: "Brasil",
        },
        type: "monthly",
      },
      {
        amount: 600,
        date: "2024-11-03",
        supporterId: "sup-108",
        supporterName: "Patrícia Gomes",
        location: {
          city: "Fortaleza",
          state: "CE",
          country: "Brasil",
        },
        type: "one-time",
      },
    ],
  },
  analytics: {
    pageViews: 0,
    uniqueVisitors: 0,
  },
};

export const caregivers: CaregiverEntity[] = [
  {
    id: "1",
    profileId: "maria-silva",
    name: "Maria Silva",
    email: "maria.silva@example.com",
    emailVerified: true,
    accountVerified: true,
    active: true,
    joinedAt: "2023-01-15",
    receiverId: "receiver-001",
    pixKey: "maria.silva@example.com",
    data: JSON.stringify(data),
  },
  {
    id: "2",
    profileId: "jose-almeida",
    name: "José Almeida",
    email: "jose.almeida@example.com",
    emailVerified: true,
    accountVerified: true,
    active: true,
    joinedAt: "2022-08-20",
    receiverId: "receiver-002",
    pixKey: "+5511987654321",
    data: JSON.stringify(secondData),
  },
];
