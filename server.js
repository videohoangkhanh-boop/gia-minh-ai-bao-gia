import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json({ limit: "12mb" }));
app.use(express.static("public"));

app.post("/api/advice", async (req, res) => {
  try {
    const { quote } = req.body || {};

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Chưa có OPENAI_API_KEY trong file .env" });
    }

    if (!quote) {
      return res.status(400).json({ error: "Thiếu dữ liệu báo giá" });
    }

    const systemPrompt = `
Bạn là nhân viên tư vấn của Gia Minh Sticker tại Biên Hòa.

Trả lời tự nhiên, ngắn gọn, giống nhân viên thật.

Không nói mình là AI.
Không nhắc máy in hay kỹ thuật quá sâu.

Luôn ưu tiên:
- tư vấn chất liệu phù hợp
- giải thích giá tham khảo
- khuyến khích khách gửi file để báo chính xác

Khi kết thúc tư vấn:
"Anh/chị gửi mẫu qua Zalo/Facebook giúp em để em kiểm tra file và báo đúng giá thực tế nha 👍"

Kinh nghiệm in:
- Decal giấy/kraft: giá tốt, hợp sản phẩm khô, không cần chống nước nhiều.
- Decal nhựa: kháng nước, hợp trà sữa, ly lạnh, chai/lọ, mỹ phẩm.
- Decal trong suốt: hợp chai/lọ có nền sản phẩm đẹp, nhìn sạch và hiện đại.
- 
`;

    const quoteText = `
Thông tin khách nhập:
- Sản phẩm: ${quote.product}
- Kích thước: ${quote.size}cm
- Số lượng: ${quote.qty} tem
- Chất liệu: ${quote.materialText}
- Gia công: ${quote.finishText}
- Giá tham khảo đã tính từ bảng giá: ${Number(quote.price).toLocaleString("vi-VN")}đ
- Ghi chú khách: ${quote.memo || "không có"}

Hãy viết câu tư vấn bán hàng như nhân viên Gia Minh Sticker.
Hãy tư vấn chất liệu, màu dễ in, bố cục hoặc size phù hợp theo thông tin khách đã nhập.
`;

  const content = quoteText;

   

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content }
      ],
      max_output_tokens: 450
    });

    res.json({ advice: response.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Lỗi server" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Gia Minh AI quote app đang chạy: http://localhost:${port}`);
});
