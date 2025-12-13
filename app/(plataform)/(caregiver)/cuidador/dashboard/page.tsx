import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCachedDashboardCaregiver } from "./actions";
import {
  DashboardHeader,
  ProfileCompletionCard,
  ProfileStatsCard,
  QuickActionsCard,
  WelcomeOnboarding,
} from "./components";

export const generateMetadata = async (): Promise<Metadata> => {
  const caregiver = await getCachedDashboardCaregiver();

  return {
    title: `Dashboard - ${caregiver?.publicName || "Cuidador"}`,
    description: `Veja uma visão geral do seu perfil de cuidador, estatísticas rápidas e ações para gerenciar sua presença na plataforma.`,
  };
};

export default async function DashboardPage() {
  const caregiver = await getCachedDashboardCaregiver();

  if (!caregiver) {
    notFound();
  }

  // Calculate profile completion
  const hasProfileImage = Boolean(caregiver.caregiverImageUrl);
  const hasShortBio = Boolean(caregiver.shortBio);
  const hasDescription = Boolean(caregiver.data?.descriptionMarkdown);
  const hasAddress = Boolean(caregiver.addressId);
  const hasPaymentMethod =
    Boolean(caregiver.pixKey) ||
    caregiver.subscriptionPaymentStatus === "READY";

  const completionItems = [
    { completed: hasProfileImage, label: "Foto de perfil" },
    { completed: hasShortBio, label: "Biografia curta" },
    { completed: hasDescription, label: "História completa" },
    { completed: hasAddress, label: "Endereço" },
    { completed: hasPaymentMethod, label: "Método de pagamento" },
  ];

  const completedCount = completionItems.filter(
    (item) => item.completed
  ).length;
  const completionPercentage = Math.round(
    (completedCount / completionItems.length) * 100
  );

  const isProfileComplete = completionPercentage === 100;
  const isProfilePublished = caregiver.active && caregiver.accountVerified;

  return (
    <div className="flex h-full flex-col overflow-auto">
      <DashboardHeader title="Dashboard" />

      <div className="flex-1 space-y-6 p-6 md:p-8 md:pt-0">
        {caregiver.accountVerified ? null : (
          <WelcomeOnboarding
            caregiverName={caregiver.publicName}
            isProfileComplete={isProfileComplete}
            accountVerified={caregiver.accountVerified}
          />
        )}

        {/* Profile Completion */}
        {!isProfileComplete && !caregiver.accountVerified && (
          <ProfileCompletionCard
            percentage={completionPercentage}
            items={completionItems}
          />
        )}

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <ProfileStatsCard
            title="Perfil"
            stats={[
              {
                label: "Status",
                value: isProfilePublished ? "Ativo" : "Inativo",
                variant: isProfilePublished ? "default" : "secondary",
              },
              {
                label: "Completude",
                value: `${completionPercentage}%`,
                variant: isProfileComplete ? "default" : "secondary",
              },
              {
                label: "Animais Cuidados",
                value: caregiver.totalAnimalsCared.toString(),
                variant: "default",
              },
            ]}
          />

          <QuickActionsCard profileSlug={caregiver.profileSlug} />

          {/* Payment Status */}
          <ProfileStatsCard
            title="Pagamentos"
            stats={[
              {
                label: "Status",
                value: hasPaymentMethod ? "Configurado" : "Pendente",
                variant: hasPaymentMethod ? "default" : "secondary",
              },
              {
                label: "Método",
                value: caregiver.pixKey
                  ? "PIX"
                  : caregiver.subscriptionPaymentStatus === "READY"
                    ? "Assinaturas"
                    : "Nenhum",
                variant: "default",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
