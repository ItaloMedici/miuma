import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type PasswordResetEmailProps = {
  userEmail: string;
  resetLink: string;
};

const PasswordResetEmail = (props: PasswordResetEmailProps) => {
  const { userEmail, resetLink } = props;

  return (
    <Html lang="pt-BR" dir="ltr">
      <Head />
      <Preview>Redefinição de senha solicitada</Preview>
      <Tailwind>
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white px-[32px] py-[40px]">
            {/* Header */}
            <Section>
              <Heading className="mb-[32px] text-center text-[24px] font-bold text-gray-900">
                Redefinição de Senha
              </Heading>
            </Section>

            {/* Main Content */}
            <Section>
              <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-700">
                Olá,
              </Text>

              <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-700">
                Recebemos uma solicitação para redefinir a senha da sua conta
                associada ao email <strong>{userEmail}</strong>.
              </Text>

              <Text className="mb-[32px] text-[16px] leading-[24px] text-gray-700">
                Para criar uma nova senha, clique no botão abaixo:
              </Text>

              {/* Reset Button */}
              <Section className="mb-[32px] text-center">
                <Button
                  href={resetLink}
                  className="box-border rounded-[8px] px-[32px] py-[12px] text-[16px] font-medium text-white no-underline"
                  style={{ backgroundColor: "#A1DC81" }}
                >
                  Redefinir Senha
                </Button>
              </Section>

              <Text className="mb-[24px] text-[14px] leading-[20px] text-gray-600">
                Se você não conseguir clicar no botão, copie e cole o link
                abaixo no seu navegador:
              </Text>

              <Text
                className="mb-[32px] text-[14px] break-all"
                style={{ color: "#A1DC81" }}
              >
                <Link
                  href={resetLink}
                  style={{
                    color: "#A1DC81",
                    textDecoration: "underline",
                  }}
                >
                  {resetLink}
                </Link>
              </Text>

              <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-700">
                <strong>Importante:</strong> Este link é válido por 24 horas e
                só pode ser usado uma vez. Se você não solicitou esta
                redefinição, pode ignorar este email com segurança.
              </Text>

              <Text className="mb-[32px] text-[16px] leading-[24px] text-gray-700">
                Se você tiver alguma dúvida ou precisar de ajuda, entre em
                contato conosco.
              </Text>

              <Text className="text-[16px] leading-[24px] text-gray-700">
                Atenciosamente,
                <br />
                Equipe Miuma
              </Text>
            </Section>

            {/* Footer */}
            <Section className="mt-[40px] border-t border-gray-200 pt-[32px]">
              <Text className="m-0 mb-[8px] text-center text-[12px] text-gray-500">
                Este é um email automático, por favor não responda.
              </Text>
              <Text className="m-0 text-center text-[12px] text-gray-500">
                © 2024 Miuma. Todos os direitos reservados
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

PasswordResetEmail.PreviewProps = {
  userEmail: "usuario@exemplo.com",
  resetLink: "https://seusite.com/reset-password?token=abc123xyz789",
};

export default PasswordResetEmail;
