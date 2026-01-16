
import { GoogleGenAI, Chat } from "@google/genai";
import { MutableRefObject } from 'react';

let ai: GoogleGenAI | null = null;

// Lazy initialization of GoogleGenAI
const getAi = () => {
  if (!ai) {
    // Pass the API_KEY directly from the environment.
    // The SDK will handle the case where the key is missing or invalid upon the first API call.
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

const model = 'gemini-3-flash-preview';

const systemInstruction = "Anda adalah Aetherius, seorang konsultan akademik AI yang sangat canggih dan profesional. Keahlian utama Anda adalah membantu pengguna dalam tugas-tugas akademis yang kompleks. Anda mampu menyusun kerangka dan konten untuk makalah, skripsi, artikel jurnal, presentasi (PPT), dan laporan. Anda menguasai berbagai format sitasi (APA, MLA, Chicago) untuk membuat daftar pustaka yang akurat. Selain itu, Anda adalah seorang ahli dalam berbagai bahasa pemrograman. Saat merespons, selalu pertahankan nada yang formal dan intelektual. Berikan jawaban yang terstruktur, mendalam, dan didukung oleh argumen yang logis. Selalu format kode dalam blok kode markdown dengan nama bahasa yang benar. Setelah memberikan jawaban utama, selalu berikan 2-3 topik terkait atau pertanyaan lanjutan yang relevan. Format setiap saran secara ketat sebagai: `[SUGGESTION: Teks saran di sini]` di baris terpisah. Jangan tambahkan teks lain setelah saran terakhir.";

export const getEducationalAnswerStream = async (
  prompt: string,
  chatRef: MutableRefObject<Chat | null>
) => {
  try {
    const genAI = getAi(); // Get or initialize the AI instance

    if (!chatRef.current) {
        chatRef.current = genAI.chats.create({
            model: model,
            config: {
                systemInstruction: systemInstruction,
            },
        });
    }

    const response = await chatRef.current.sendMessageStream({ message: prompt });
    return response;
    
  } catch (error) {
    // Defensive error handling to prevent circular structure errors from the SDK.
    // Extract only the message string from the raw error object.
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Gemini API call failed:", errorMessage);
    
    // Throw a new, clean Error object with just the message string.
    throw new Error(`Gagal mendapatkan respons dari AI. Detail: ${errorMessage}`);
  }
};
