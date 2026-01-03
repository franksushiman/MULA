import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import pino from "pino";

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  let qrShown = false;
  let connected = false;

  sock.ev.on("connection.update", ({ qr, connection }) => {
    if (qr && !qrShown) {
      qrShown = true;
      qrcode.generate(qr, { small: true });
      console.log("QR_CODE_GERADO");
      return;
    }

    if (connection === "open") {
      connected = true;
      console.log("WHATSAPP_CONECTADO");
      return;
    }

    if (connection === "close") {
      if (connected) {
        // fechamento esperado após conexão inicial
        process.exit(0);
      } else {
        console.log("CONEXAO_ENCERRADA");
        process.exit(1);
      }
    }
  });
}

start().catch(err => {
  console.error("ERRO_FATAL", err);
  process.exit(1);
});
