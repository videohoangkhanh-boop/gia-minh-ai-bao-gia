# Gia Minh Sticker - Web báo giá AI

Bản này gồm:
- Web báo giá theo bảng giá thật Gia Minh Sticker
- Nút "AI tư vấn như nhân viên"
- Có thể upload ảnh khách gửi để AI đề xuất chất liệu / màu / bố cục
- API key OpenAI nằm ở server, không lộ trên trình duyệt

## Cài đặt

1. Cài Node.js nếu máy chưa có:
https://nodejs.org

2. Giải nén thư mục này.

3. Mở CMD/Terminal trong thư mục `gia-minh-ai-bao-gia`.

4. Chạy:
npm install

5. Tạo file `.env` từ file `.env.example`.

6. Dán API key OpenAI vào:
OPENAI_API_KEY=sk-proj-...

7. Chạy:
npm start

8. Mở trình duyệt:
http://localhost:3000

## Lưu ý tiết kiệm tiền

- Báo giá không tốn API.
- Chỉ khi bấm "AI tư vấn như nhân viên" mới dùng OpenAI credit.
- Có ảnh thì sẽ tốn hơn text một chút, nên chỉ dùng ảnh khi cần tư vấn thật.
