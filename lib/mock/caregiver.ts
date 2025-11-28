import { CaregiverDataJson, CaregiverEntity } from "@/interfaces/caregiver";

// Mock data for Phase 1 - Simplified structure (only profile data)
// Users and Addresses are imported from their respective mock files
const mariaData: CaregiverDataJson = {
  galleryImages: {
    cover: {
      url: "https://images.unsplash.com/photo-1708792277856-e38dfb4f95e5?q=80&w=1808&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Foto de capa",
    },
    photos: [
      {
        url: "https://images.unsplash.com/photo-1693830352296-1d2de2a43214?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Foto 1",
      },
      {
        url: "https://images.unsplash.com/photo-1680925652180-cee37b90b371?q=80&w=1690&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

Atualmente, cuido de **12 animais resgatados** em uma casa que aluguei especialmente para esse propósito. Cada um deles tem uma história única de superação.

## Transparência Total

Uma das coisas que mais prezo é a **transparência** com quem nos apoia. Todos os meses publico relatórios detalhados de gastos e compartilho fotos dos animais.

Juntos, estamos transformando vidas - tanto dos animais quanto a minha. 🐾❤️`,
  shortBio:
    "Cuido de animais resgatados há mais de 5 anos. Com o apoio da comunidade, conseguimos oferecer alimentação de qualidade, cuidados veterinários e muito carinho.",
  socialMedia: {
    instagram: "https://instagram.com/maria.silva.animais",
    facebook: "https://facebook.com/maria.silva.refugio",
    whatsapp: "https://wa.me/5531987654321",
    youtube: "https://youtube.com/@mariasilvaanimais",
  },
  ongoingCases: [
    {
      id: "1",
      title: "Cirurgia da Luna",
      description: "Luna precisa de cirurgia urgente",
      targetAmount: 1500,
      currentAmount: 950,
      imageUrl:
        "https://images.unsplash.com/photo-1632236542159-809925d85fc0?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  recentUpdates: [
    {
      id: "1",
      date: "2024-11-15",
      message: "Luna passou pela consulta",
      emoji: "❤️",
    },
    {
      id: "2",
      date: "2024-11-18",
      message: "Chegaram as rações",
      emoji: "📦",
      images: [
        {
          alt: "Foto de rações recebidas",
          url: "https://images.unsplash.com/photo-1647616350787-6428e907a7fa?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
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
        "https://images.unsplash.com/photo-1632236498225-fb69b5bb378c?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Cachorrinha de 4 anos resgatada da rua",
    },
    {
      id: "2",
      name: "Thor",
      imageUrl:
        "https://images.unsplash.com/photo-1693830352296-1d2de2a43214?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Cachorro de porte grande com 6 anos, muito carinhoso",
    },
    {
      id: "3",
      name: "Mel",
      imageUrl:
        "https://images.unsplash.com/photo-1708792277856-e38dfb4f95e5?q=80&w=1808&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Gatinha laranja de 2 anos, muito brincalhona",
    },
    {
      id: "4",
      name: "Bob",
      imageUrl:
        "https://images.unsplash.com/photo-1661539494374-b700fa59a6e8?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Vira-lata de 8 anos, o mais velho da turma",
    },
    {
      id: "5",
      name: "Nina",
      imageUrl:
        "https://images.unsplash.com/photo-1599692392256-2d084495fe15?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Filhote de 1 ano super energética",
    },
    {
      id: "6",
      name: "Rex",
      imageUrl:
        "https://images.unsplash.com/photo-1755526739110-0890eaa8d0f0?q=80&w=1668&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Pastor alemão de 5 anos, muito protetor",
    },
    {
      id: "7",
      name: "Pipoca",
      imageUrl:
        "https://images.unsplash.com/photo-1606425270259-998c37268501?q=80&w=1758&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        "https://images.unsplash.com/photo-1582079313048-f13462814383?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Golden Retriever de 3 anos, extremamente dócil",
    },
    {
      id: "10",
      name: "Simba",
      imageUrl:
        "https://images.unsplash.com/photo-1680925652180-cee37b90b371?q=80&w=1690&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Gato tigrado de 5 anos, muito independente",
    },
    {
      id: "11",
      name: "Chico",
      imageUrl:
        "https://images.unsplash.com/photo-1724989755339-6d76cbbe93db?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Poodle de 7 anos, carinhoso e tranquilo",
    },
    {
      id: "12",
      name: "Mia",
      imageUrl:
        "https://images.unsplash.com/photo-1585271903432-ef0fe9b14e19?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    {
      title: "Consulta Veterinária - Luna",
      amount: 300,
      date: "2024-11-15",
      occurrence: "on-demand",
      type: "medical",
    },
    {
      title: "Vacinas - Mel e Thor",
      amount: 200,
      date: "2024-11-10",
      occurrence: "annual",
      type: "medical",
    },
  ],
};

const joseData: CaregiverDataJson = {
  galleryImages: {
    cover: {
      url: "https://images.unsplash.com/photo-1625794084867-8ddd239946b1?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Foto de capa José",
    },
    photos: [
      {
        url: "https://images.unsplash.com/photo-1708963937384-6d1bca9dac2a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Foto 1",
      },
      {
        url: "https://images.unsplash.com/photo-1626736637845-53045bb9695b?q=80&w=3411&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Foto 2",
      },
      {
        url: "https://images.unsplash.com/photo-1602241628512-459cdd3234fe?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Foto 3",
      },
    ],
  },
  descriptionMarkdown: `## Quem Somos

Sou **José Almeida**, fundador do projeto de resgate animal aqui em Porto Alegre. Há mais de **7 anos** dedico minha vida a dar uma segunda chance para animais que foram abandonados, maltratados ou que simplesmente precisam de um lar temporário.

### Nossa Missão

> *"Acreditamos que todo animal merece amor, respeito e dignidade. Nossa missão é resgatar, recuperar e encontrar lares amorosos para cada um deles."*

## A Jornada

Comecei esse trabalho em 2017, após me aposentar cedo e perceber que tinha tempo e disposição para fazer a diferença. O que começou com 2 cachorros resgatados hoje se transformou em um projeto que já ajudou **mais de 150 animais**.`,
  shortBio:
    "Cuido de animais resgatados há mais de 7 anos. Com o apoio da comunidade, conseguimos oferecer alimentação de qualidade, cuidados veterinários e muito carinho.",
  socialMedia: {
    instagram: "https://instagram.com/resgate.animal.poa",
    facebook: "https://facebook.com/resgateanimalportoalegre",
    whatsapp: "https://wa.me/5551998765432",
    youtube: "https://youtube.com/@resgateanimalportoalegre",
    tiktok: "https://tiktok.com/@resgateanimal_poa",
    website: "https://resgateanimal-poa.com.br",
  },
  ongoingCases: [
    {
      id: "1",
      title: "Tratamento do Max",
      description: "Max precisa de tratamento",
      targetAmount: 2000,
      currentAmount: 1200,
      imageUrl:
        "https://images.unsplash.com/photo-1627323721367-94128c3fa0f7?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
        "https://images.unsplash.com/photo-1513549054-cb3611a004fe?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    {
      title: "Tratamento Max - Consulta",
      amount: 500,
      date: "2024-11-14",
      occurrence: "on-demand",
      type: "medical",
    },
  ],
};

// Phase 1: CaregiverEntity with new structure
export const caregivers: CaregiverEntity[] = [
  {
    id: "1",
    userId: "user-001", // FK to USERS
    profileSlug: "maria-silva", // was profileId
    addressId: "addr-001", // FK to ADDRESSES
    accountVerified: true,
    active: true,
    name: "Maria Silva",
    profileUrl: "/maria-silva",
    subscriptionPaymentStatus: "READY", // Can accept monthly subscriptions
    pixKey: "maria.silva@example.com",
    providerReceiverId: "receiver-001", // Stripe/payment provider ID
    caregiverImageUrl:
      "https://images.unsplash.com/photo-1636957690653-1c8f74f7c295?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    data: JSON.stringify(mariaData),
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-11-26T10:00:00Z",
  },
  {
    id: "2",
    userId: "user-002",
    profileSlug: "jose-almeida",
    addressId: "addr-002",
    accountVerified: true,
    name: "José Almeida",
    publicName: "Zé do Resgate",
    active: true,
    profileUrl: "/jose-almeida",
    subscriptionPaymentStatus: "DISABLED", // Only PIX available
    pixKey: "+5551998765432",
    providerReceiverId: null, // No payment provider setup
    caregiverImageUrl:
      "https://images.unsplash.com/photo-1762110098942-f967f5c08fd5?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    data: JSON.stringify(joseData),
    createdAt: "2022-08-20T10:00:00Z",
    updatedAt: "2024-11-26T10:00:00Z",
  },
];

// Re-export users and addresses for backward compatibility
export { mockAddresses } from "./addresses";
export { mockUsers } from "./users";
