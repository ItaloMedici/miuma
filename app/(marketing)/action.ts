import { LandingPageData } from "@/interfaces/marketing";

export const getLandingPageData = async (): Promise<LandingPageData> => {
  return {
    caregivers: [
      {
        id: "id-1",
        profileId: "profile-id-1",
        name: "João Santos",
        workDescription: "Cuidador de gatos abandonados",
        petsUnderCare: "23 cães resgatados",
        imageUrl: "/images/caregivers/joao-santos.jpg",
        testimonial:
          "Com o apoio da comunidade, consegui criar um espaço seguro para gatos que foram abandonados.",
      },
      {
        id: "id-2",
        profileId: "profile-id-2",
        name: "Ana Costa",
        workDescription: "Protetora de animais de rua",
        petsUnderCare: "30 animais diversos",
        testimonial:
          "O suporte recorrente transformou minha capacidade de cuidar e resgatar mais animais.",
      },
      {
        id: "id-3",
        profileId: "profile-id-3",
        name: "Pedro Lima",
        workDescription: "Cuidador de cães idosos",
        petsUnderCare: "18 cães idosos",
        testimonial:
          "Dedico minha vida a dar dignidade aos animais que ninguém mais quer adotar.",
      },
    ],
    impact: {
      totalCaregivers: "3",
      totalPetsHelped: "20",
      totalDonations: "18k",
    },
  };
};
