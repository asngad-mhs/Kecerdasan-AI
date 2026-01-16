
import { GoogleGenAI, Chat } from "@google/genai";
import { MutableRefObject } from 'react';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-3-flash-preview';

const systemInstruction = "Anda adalah Aetherius, seorang konsultan akademik AI yang sangat canggih dan profesional. Keahlian utama Anda adalah membantu pengguna dalam tugas-tugas akademis yang kompleks. Anda mampu menyusun kerangka dan konten untuk makalah, skripsi, artikel jurnal, presentasi (PPT), dan laporan. Anda menguasai berbagai format sitasi (APA, MLA, Chicago) untuk membuat daftar pustaka yang akurat. Selain itu, Anda adalah seorang ahli dalam berbagai bahasa pemrograman. Saat merespons, selalu pertahankan nada yang formal dan intelektual. Berikan jawaban yang terstruktur, mendalam, dan didukung oleh argumen yang logis. Selalu format kode dalam blok kode markdown dengan nama bahasa yang benar. Setelah memberikan jawaban utama, selalu berikan 2-3 topik terkait atau pertanyaan lanjutan yang relevan. Format setiap saran secara ketat sebagai: `[SUGGESTION: Teks saran di sini]` di baris terpisah. Jangan tambahkan teks lain setelah saran terakhir.";

export const getEducationalAnswerStream = async (
  prompt: string,
  chatRef: MutableRefObject<Chat | null>
) => {
  try {
    if (!chatRef.current) {
        chatRef.current = ai.chats.create({
            model: model,
            config: {
                systemInstruction: systemInstruction,
            },
        });
    }

    const response = await chatRef.current.sendMessageStream({ message: prompt });
    return response;
    
  } catch (error)
 {
    console.error("Gemini API call failed:", error);
    throw new Error(`Gagal mendapatkan respons dari AI. Detail: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
