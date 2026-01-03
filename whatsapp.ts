import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import pino from "pino";
import fs from "fs";

const AUTH_DIR = "./auth";
const STATE_FILE = "./data/state.json";

type State = {
  paused: boolean;
};

function loadState(): State {
  return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
}

function saveState(state: State) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

async function start() {
  const { state: authState, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: authState,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, qr } = update;

    if (qr) {
      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("MULA V2 conectado ao WhatsApp.");
    }

    if (connection === "close") {
      console.error("Conexão encerrada. Reinício deve ser feito externamente.");
      process.exit(1);
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text;

    if (!text) return;

    const jid = msg.key.remoteJid!;
    const state = loadState();

    if (text === "/mula status") {
      await sock.sendMessage(jid, {
        text: state.paused ? "MULA está PAUSADA." : "MULA está ATIVA."
      });
    }

    if (text === "/mula pause") {
      state.paused = true;
      saveState(state);
      await sock.sendMessage(jid, { text: "MULA PAUSADA." });
    }

    if (text === "/mula resume") {
      state.paused = false;
      saveState(state);
      await sock.sendMessage(jid, { text: "MULA RETOMADA." });
    }
  });
}

start();
