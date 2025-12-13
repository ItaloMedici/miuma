import { del, put } from "@vercel/blob";
import "server-only";
import sharp from "sharp";
import { getServerSession } from "./auth-server";
import { logger } from "./logger";

type UploadBlobParams = {
  path?: string;
  fileName: string;
  imageFile: File;
  imageType?: "profile" | "gallery";
};

// Configurações de otimização por tipo de imagem
const IMAGE_CONFIGS = {
  profile: {
    maxWidth: 800,
    maxHeight: 800,
    quality: 85,
    maxSizeKB: 300, // 300KB max
  },
  gallery: {
    maxWidth: 1200,
    maxHeight: 1200,
    quality: 82,
    maxSizeKB: 400, // 400KB max
  },
} as const;

// Limite máximo de upload (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

async function optimizeImage(
  imageFile: File,
  imageType: "profile" | "gallery" = "gallery"
): Promise<Buffer> {
  if (imageFile.size > MAX_FILE_SIZE) {
    throw new Error(
      `Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB`
    );
  }

  const config = IMAGE_CONFIGS[imageType];
  const arrayBuffer = await imageFile.arrayBuffer();

  let sharpInstance = sharp(arrayBuffer);

  const metadata = await sharpInstance.metadata();

  sharpInstance = sharpInstance.rotate();

  // Redimensionar mantendo aspect ratio
  sharpInstance = sharpInstance.resize(config.maxWidth, config.maxHeight, {
    fit: "inside",
    withoutEnlargement: true, // Não aumentar imagens menores
  });

  // Converter para WebP com qualidade otimizada
  let webpBuffer = await sharpInstance
    .webp({
      quality: config.quality,
      effort: 6, // Balanço entre compressão e velocidade (0-6)
    })
    .toBuffer();

  // Se ainda estiver muito grande, reduzir qualidade progressivamente
  let quality = config.quality;
  while (webpBuffer.length > config.maxSizeKB * 1024 && quality > 60) {
    quality -= 5;
    webpBuffer = await sharp(arrayBuffer)
      .rotate()
      .resize(config.maxWidth, config.maxHeight, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality,
        effort: 6,
      })
      .toBuffer();
  }

  logger.info({
    msg: "Image optimized",
    originalSize: `${(imageFile.size / 1024).toFixed(2)}KB`,
    optimizedSize: `${(webpBuffer.length / 1024).toFixed(2)}KB`,
    reduction: `${(((imageFile.size - webpBuffer.length) / imageFile.size) * 100).toFixed(1)}%`,
    finalQuality: quality,
    imageType,
    originalDimensions: `${metadata.width}x${metadata.height}`,
  });

  return webpBuffer;
}

async function uploadBlob({
  fileName,
  imageFile,
  imageType = "gallery",
}: UploadBlobParams) {
  const session = await getServerSession();

  if (!session) {
    return {
      success: false,
      error: "Usuário não autenticado",
      url: "",
    };
  }

  try {
    if (!imageFile.type.startsWith("image/")) {
      return {
        success: false,
        error: "Arquivo deve ser uma imagem",
        url: "",
      };
    }

    const optimizedBuffer = await optimizeImage(imageFile, imageType);

    const path = imageType === "profile" ? "profile-photo" : "gallery";

    const suffix = `users/${session.user.id}/${path}/`;
    const webpFileName = `${crypto.randomUUID()}.webp`;
    const pathname = `${suffix}${webpFileName}`.replaceAll("//", "/");

    const blob = await put(pathname, optimizedBuffer, {
      access: "public",
      contentType: "image/webp",
      allowOverwrite: true,
    });

    logger.info({
      msg: "Image uploaded to Vercel Blob",
      userId: session.user.id,
      fileName: webpFileName,
      path,
      url: blob.url,
      size: `${(optimizedBuffer.length / 1024).toFixed(2)}KB`,
    });

    return {
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      downloadUrl: blob.downloadUrl,
      error: undefined,
    };
  } catch (error) {
    logger.error({
      msg: "Error uploading image",
      userId: session.user.id,
      error: error instanceof Error ? error.message : "Unknown error",
      fileName,
    });

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao fazer upload da imagem",
      url: "",
    };
  }
}

async function removeBlob(pathname: string) {
  try {
    await del(pathname);
    return { success: true };
  } catch (error) {
    logger.error({
      msg: "Error deleting blob",
      pathname,
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Erro ao deletar o arquivo de imagem",
    };
  }
}

export const imageClient = {
  upload: uploadBlob,
  remove: removeBlob,
};
