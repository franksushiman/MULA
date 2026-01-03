import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import qrcode from "qrcode-terminal";
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";

const AUTH_DIR = path.resolve("auth");
const STATE_PATH = path.resolve("data/state.json");

type State = {
  paused: boolean;
};

function loadState(): State {
  if (!existsSync(STATE_PATH)) {
    const initial: State = { paused: false };
    writeFileSync(STATE_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
  const raw = readFileSync(STATE_PATH, "utf-8");
  return JSON.parse(raw) as State;
}

function saveState(state: State) {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      qrcode.generate(qr, { small: true });
    }

    if (connection === "close") {
      const reason = (lastDisconnect?.error as Boom)?.output?.statusCode;
      if (reason !== DisconnectReason.loggedOut) {
        // sem reconexão automática
        process.exit(1);
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg?.message) return;

    const from = msg.key.remoteJid;
    if (!from) return;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    if (!text.startsWith("/mula")) return;

    let current = loadState();

    if (current.paused) {
      if (text === "/mula resume") {
        current.paused = false;
        saveState(current);
        await sock.sendMessage(from, { text: "🟢 MULA ATIVO" });
        return;
      }
      if (text === "/mula status") {
        await sock.sendMessage(from, { text: "🔇 STATUS: PAUSADO" });
        return;
      }
      return;
    }

    if (text === "/mula pause") {
      current.paused = true;
      saveState(current);
      await sock.sendMessage(from, { text: "🔇 MULA PAUSADO" });
      return;
    }

    if (text === "/mula resume") {
      current.paused = false;
      saveState(current);
      await sock.sendMessage(from, { text: "🟢 MULA ATIVO" });
      return;
    }

    if (text === "/mula status") {
      await sock.sendMessage(from, { text: "🟢 STATUS: ATIVO" });
      return;
    }
  });
}

start();
