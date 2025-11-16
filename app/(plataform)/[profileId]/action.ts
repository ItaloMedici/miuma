import { CaregiverProfile } from "@/interfaces/caregiver";

export const getProfile = async (
  profileId: string
): Promise<CaregiverProfile> => {
  const caregiver: CaregiverProfile = {
    profile: {
      active: true,
      id: "id",
      name: "Maria Silva",
      location: "São Paulo, SP",
      memberSince: "Janeiro 2024",
      animalsCount: 12,
      verified: true,
      imageUrl:
        "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222910/cld-sample.jpg",
    },
    galleryImages: {
      cover: {
        url: "https://images.unsplash.com/photo-1759046346389-a63d2e3548bf?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Foto de um gato cinza",
      },
      photos: [
        {
          url: "https://images.unsplash.com/photo-1494947665470-20322015e3a8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "Foto de três cachorros",
        },
        {
          url: "https://images.unsplash.com/photo-1560743641-3914f2c45636?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "Foto de um rena",
        },
        {
          url: "https://images.unsplash.com/photo-1723059375155-af5e4a2f4df1?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "Foto de três cachorros",
        },
        {
          url: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "Foto de um rena",
        },
      ],
    },
    descriptionMarkdown:
      "Cuido de animais resgatados há mais de 5 anos. Cada um deles tem uma história de superação e merece todo o amor e cuidado possível. Com o apoio da comunidade, conseguimos oferecer alimentação de qualidade, cuidados veterinários e muito carinho para todos.",
    transparency: {
      foodCosts: 1200,
      medicalCosts: 450,
      otherCosts: 200,
      reportMarkdown:
        "Todos os valores recebidos são destinados exclusivamente para alimentação, medicamentos e cuidados veterinários dos animais. Publico relatórios mensais com comprovantes de todas as despesas.",
    },
    billingInfo: {
      monthlyGoal: "R$ 2.500",
      currentSupport: "R$ 1.850",
      percentAchieved: 74,
      supporters: 47,
    },
    ongoingCases: [
      {
        id: "1",
        title: "Cirurgia da Luna",
        description:
          "A Luna precisa passar por uma cirurgia de emergência no joelho. Com sua ajuda, ela vai poder voltar a correr e brincar!",
        targetAmount: 1500,
        imageUrl:
          "https://images.unsplash.com/photo-1649609152484-970b013af72a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: "2",
        title: "Ração especial para Thor",
        description:
          "O Thor tem alergia alimentar e precisa de ração especial. Vamos garantir que ele tenha alimentação adequada pelos próximos 3 meses.",
        targetAmount: 600,
      },
      {
        id: "3",
        title: "Vacinas dos filhotes",
        description:
          "Chegaram 4 filhotes resgatados que precisam completar o calendário de vacinação para ficarem protegidos.",
        targetAmount: 800,
      },
    ],
    recentUpdates: [
      {
        id: "1",
        date: "2024-11-15",
        message:
          "A Luna passou pela consulta hoje e o veterinário confirmou que ela está pronta para a cirurgia",
        emoji: "❤️",
        images: [
          {
            url: "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222894/samples/animals/cat.jpg",
            alt: "Luna na consulta veterinária",
          },
          {
            url: "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222897/samples/animals/three-dogs.jpg",
            alt: "Luna com outros animais",
          },
        ],
      },
      {
        id: "2",
        date: "2024-11-12",
        message:
          "Chegaram as rações especiais do Thor! Muito obrigada a todos que ajudaram",
        emoji: "🐾",
        images: [
          {
            url: "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222897/samples/animals/three-dogs.jpg",
            alt: "Rações especiais para Thor",
          },
        ],
      },
      {
        id: "3",
        date: "2024-11-08",
        message:
          "Os 4 filhotes tomaram a primeira dose da vacina. Todos muito corajosos!",
        emoji: "💉",
      },
      {
        id: "4",
        date: "2024-11-05",
        message:
          "Hoje fizemos um dia de brincadeiras no quintal. Os peludos adoraram o sol",
        emoji: "☀️",
        images: [
          {
            url: "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222895/samples/animals/reindeer.jpg",
            alt: "Animais brincando no quintal",
          },
          {
            url: "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222897/samples/animals/three-dogs.jpg",
            alt: "Cachorros curtindo o sol",
          },
          {
            url: "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222894/samples/animals/cat.jpg",
            alt: "Gato relaxando ao sol",
          },
          {
            url: "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222895/samples/animals/reindeer.jpg",
            alt: "Mais animais no quintal",
          },
          {
            url: "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222897/samples/animals/three-dogs.jpg",
            alt: "Momento de diversão coletiva",
          },
        ],
      },
      {
        id: "5",
        date: "2024-11-01",
        message: "Bem-vindos aos novos apoiadores! Cada ajuda faz diferença",
        emoji: "🙏",
      },
    ],
    petsInCare: [
      {
        id: "1",
        name: "Luna",
        imageUrl:
          "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222894/samples/animals/cat.jpg",
        description:
          "Luna é uma cachorrinha de 4 anos que foi encontrada sozinha na rua. Hoje vive feliz com seus amiguinhos e adora brincar no quintal.",
      },
      {
        id: "2",
        name: "Thor",
        imageUrl:
          "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222897/samples/animals/three-dogs.jpg",
        description:
          "Thor tem 6 anos e foi resgatado de uma situação de maus tratos. É um cachorro super carinhoso que precisa de ração especial por conta de alergias.",
      },
      {
        id: "3",
        name: "Mel",
        imageUrl:
          "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222895/samples/animals/reindeer.jpg",
        description:
          "Mel é uma gatinha de 2 anos muito tímida. Foi encontrada dentro de uma caixa de papelão e hoje está ganhando confiança aos poucos.",
      },
      {
        id: "4",
        name: "Bob",
        imageUrl:
          "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222897/samples/animals/three-dogs.jpg",
        description:
          "Bob tem 8 anos e é o mais velho da turma. Chegou idoso e precisando de cuidados especiais, mas está recuperando a saúde.",
      },
      {
        id: "5",
        name: "Nina",
        imageUrl:
          "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222894/samples/animals/cat.jpg",
        description:
          "Nina é uma filhote de 1 ano super energética. Foi abandonada grávida e teve seus filhotes aqui, que já foram adotados.",
      },
      {
        id: "6",
        name: "Rex",
        imageUrl:
          "https://res.cloudinary.com/do0oeeoso/image/upload/v1763222895/samples/animals/reindeer.jpg",
        description:
          "Rex é um cachorro de porte grande com 5 anos. Foi resgatado de uma corrente onde vivia preso há anos. Agora aprende a confiar em pessoas.",
      },
    ],
    socialProof: {
      totalSupporters: 127,
      testimonials: [
        {
          id: "1",
          name: "Ana Carolina",
          date: "2024-11-10",
          message:
            "Acompanho o trabalho da Maria há 2 anos e é inspirador ver o amor e dedicação que ela tem pelos animais. Cada centavo doado realmente faz diferença!",
        },
        {
          id: "2",
          name: "Roberto Silva",
          date: "2024-11-05",
          message:
            "Conheci o projeto através de uma amiga e me emocionei com as histórias. Agora sou apoiador mensal e recomendo para todos!",
        },
        {
          id: "3",
          name: "Juliana Costa",
          date: "2024-10-28",
          message:
            "A transparência da Maria é impressionante. Ela sempre compartilha fotos, vídeos e comprovantes de como o dinheiro é usado. Confio 100%!",
        },
        {
          id: "4",
          name: "Marcos Paulo",
          date: "2024-10-20",
          message:
            "Adotei um dos cachorros resgatados pela Maria e posso dizer que ela é um anjo. O Bob chegou aqui super bem cuidado e socializado.",
        },
      ],
    },
  };

  return caregiver;
};
