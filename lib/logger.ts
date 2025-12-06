export const logger = {
  info: (args: object) => {
    console.log("[INFO]", JSON.stringify(args));
  },
  warn: (args: object) => {
    console.warn("[WARN]", JSON.stringify(args));
  },
  error: (args: object) => {
    console.error("[ERROR]", JSON.stringify(args));
  },
};
