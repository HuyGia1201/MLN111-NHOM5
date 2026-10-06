export type Tone = "ink" | "burg" | "paper";

export type SectionBlock =
  | { type: "quote"; text: string; source?: string }
  | { type: "text"; text: string }
  | { type: "chain"; items: string[]; highlightLast?: boolean }
  | {
      type: "contrast";
      left: { title: string; items: string[]; tone: Tone };
      right: { title: string; items: string[]; tone: Tone };
      label?: string;
    }
  | { type: "grid"; cols: 2 | 3 | 4; items: { num?: string; title: string; text: string }[] }
  | { type: "loop"; a: string; b: string; aToB: string; bToA: string; result: string[] }
  | { type: "map"; center: string; branches: { num: string; title: string; subs: string[] }[] }
  | { type: "callout"; title: string; text: string; illustrative?: boolean }
  | { type: "flowSplit"; from: string; to: [string, string]; note?: string };

export interface BookPage {
  id: string;
  pageNumber: number;
  section: string;
  title: string;
  subtitle?: string;
  visualType: "cover" | "back" | "map" | "chain" | "contrast" | "grid" | "loop";
  sections: SectionBlock[];
  narration: string;
  keywords?: string[];
  hasIllustrativeExample?: boolean;
  purpose: string;
  exampleNote: string;
}

export const bookPages: BookPage[] = [
  {
    id: "cover",
    pageNumber: 1,
    section: "Bìa",
    title: "Hiện tượng tha hóa con người và vấn đề giải phóng con người",
    subtitle: "MLN111 — Triết học",
    visualType: "cover",
    sections: [],
    narration:
      "Chào mừng các bạn đến với cuốn sách số của học phần Triết học MLN111. Chủ đề của chúng ta là mục 3.5.2: Hiện tượng tha hóa con người và vấn đề giải phóng con người. Trong những trang tiếp theo, chúng ta sẽ lần lượt tìm hiểu tha hóa là gì, nó biểu hiện ra sao, nguyên nhân từ đâu, và con đường nào để giải phóng con người, hướng tới sự phát triển tự do của mỗi người và của tất cả mọi người.",
    purpose: "Mở đầu cuốn sách, giới thiệu chủ đề mục 3.5.2.",
    exampleNote: "Trang bìa không chứa ví dụ.",
  },
  {
    id: "map",
    pageNumber: 2,
    section: "Tổng quan",
    title: "Bản đồ nội dung",
    subtitle: "Toàn cảnh cuốn sách trước khi đọc",
    visualType: "map",
    sections: [
      {
        type: "map",
        center: "Tha hóa con người",
        branches: [
          {
            num: "01",
            title: "Thực chất tha hóa lao động",
            subs: ["Tha hóa là gì?", "Sản phẩm đối lập con người", "Lao động bị cưỡng bức", "Quan hệ người – vật", "Nguyên nhân: chế độ tư hữu", "Hiện tượng lịch sử đặc thù"],
          },
          {
            num: "02",
            title: "Vấn đề giải phóng",
            subs: ["Con đường", "Lực lượng", "Môi trường lịch sử", "Bản chất"],
          },
          {
            num: "03",
            title: "Sự phát triển tự do của con người",
            subs: ["Mỗi người ↔ mọi người", "Ba điều kiện", "Quan hệ biện chứng"],
          },
        ],
      },
      {
        type: "text",
        text: "Mạch logic: nhận diện hiện tượng → chỉ ra nguyên nhân và tính lịch sử → đề ra con đường giải phóng → mục tiêu cuối cùng là sự phát triển tự do.",
      },
    ],
    narration:
      "Trang này là bản đồ nội dung của toàn bộ cuốn sách. Ở trung tâm là khái niệm tha hóa con người. Từ đó tỏa ra ba nhánh. Nhánh thứ nhất là thực chất của tha hóa lao động: tha hóa là gì, ba biểu hiện của nó, nguyên nhân trực tiếp là chế độ tư hữu, và tính chất lịch sử đặc thù của hiện tượng này. Nhánh thứ hai là vấn đề giải phóng con người, gồm con đường, lực lượng, môi trường lịch sử và bản chất của sự giải phóng. Nhánh thứ ba là sự phát triển tự do của con người, với ba điều kiện và mối quan hệ biện chứng giữa mỗi người và tất cả mọi người. Mạch đi của cuốn sách là: nhận diện hiện tượng, tìm nguyên nhân, rồi đi tới con đường giải phóng và mục tiêu phát triển tự do.",
    keywords: ["tha hóa", "giải phóng", "phát triển tự do"],
    purpose: "Giúp người đọc nắm cấu trúc toàn bộ chương trước khi đi vào chi tiết.",
    exampleNote: "Không có ví dụ; chỉ là sơ đồ cấu trúc theo tài liệu.",
  },
  {
    id: "what",
    pageNumber: 3,
    section: "01 · Thực chất tha hóa",
    title: "Tha hóa con người là gì?",
    visualType: "chain",
    sections: [
      { type: "quote", text: "Đó là con người bị đánh mất chính mình." },
      {
        type: "chain",
        items: ["Con người", "Lao động", "Sản phẩm · Hoạt động · Quan hệ", "Trở nên đối lập với con người", "Tha hóa"],
        highlightLast: true,
      },
      {
        type: "contrast",
        label: "Nghịch lý của người lao động bị tha hóa",
        left: { title: "Chức năng sinh học", items: ["Ăn", "Ngủ", "Sinh con"], tone: "paper" },
        right: { title: "Lao động", items: ["Chức năng cao quý của con người", "… lại chỉ như con vật"], tone: "ink" },
      },
      {
        type: "text",
        text: "Người lao động chỉ hành động với tư cách con người khi thực hiện các chức năng sinh học; còn khi lao động — chức năng cao quý của con người — thì họ lại chỉ như con vật.",
      },
    ],
    narration:
      "Tha hóa con người là gì? Câu trả lời ngắn gọn nhất: đó là con người bị đánh mất chính mình. Hãy nhìn vào chuỗi sơ đồ. Con người lao động, và qua lao động tạo ra sản phẩm, hoạt động và các quan hệ. Nhưng chính những thứ do con người tạo ra ấy lại trở nên đối lập với con người. Đó chính là tha hóa. Phía dưới là một nghịch lý: người lao động chỉ thấy mình hành động với tư cách con người khi thực hiện các chức năng sinh học như ăn, ngủ, sinh con. Còn khi lao động, vốn là chức năng cao quý nhất của con người, thì họ lại chỉ như con vật. Khái niệm này là nền tảng để hiểu ba biểu hiện cụ thể ở các trang sau.",
    keywords: ["đánh mất chính mình", "đối lập", "chức năng sinh học"],
    purpose: "Định nghĩa khái niệm tha hóa con người.",
    exampleNote: "Nội dung và nghịch lý ăn – ngủ – sinh con lấy trực tiếp từ tài liệu.",
  },
  {
    id: "m1",
    pageNumber: 4,
    section: "01 · Biểu hiện 1",
    title: "Tha hóa với sản phẩm lao động",
    visualType: "contrast",
    sections: [
      {
        type: "flowSplit",
        from: "Sản phẩm lao động",
        to: ["Vốn phải: phục vụ & phát triển con người", "Thực tế: lực lượng đối lập, nô dịch, thống trị con người"],
      },
      {
        type: "contrast",
        label: "Vị trí của người lao động",
        left: { title: "Vốn là", items: ["Chủ thể trong quan hệ với tư liệu sản xuất", "Làm chủ sản phẩm mình tạo ra"], tone: "paper" },
        right: { title: "Dưới chế độ tư hữu", items: ["Phụ thuộc vào tư liệu sản xuất", "Phụ thuộc vào chính sản phẩm do mình tạo ra"], tone: "burg" },
      },
      {
        type: "callout",
        title: "Điểm mấu chốt",
        text: "Cái do con người làm ra quay lại chi phối con người — quan hệ chủ thể – khách thể bị đảo ngược.",
      },
    ],
    narration:
      "Biểu hiện thứ nhất của tha hóa là tha hóa với sản phẩm lao động. Theo sơ đồ phân nhánh, sản phẩm lao động lẽ ra phải phục vụ và phát triển con người. Nhưng thực tế, nó lại bị biến thành một lực lượng đối lập, nô dịch và thống trị con người. Phần so sánh bên dưới cho thấy sự đảo ngược vị trí: trong hoạt động lao động, con người vốn là chủ thể trong quan hệ với tư liệu sản xuất. Thế nhưng dưới chế độ tư hữu, người lao động lại phải phụ thuộc vào chính tư liệu sản xuất và sản phẩm do mình tạo ra. Điểm mấu chốt là: cái do con người làm ra lại quay lại chi phối con người.",
    keywords: ["sản phẩm", "nô dịch", "chủ thể"],
    purpose: "Trình bày biểu hiện thứ nhất: con người bị chính sản phẩm của mình thống trị.",
    exampleNote: "Không dùng ví dụ cụ thể; sơ đồ giữ ở mức khái quát theo tài liệu.",
  },
  {
    id: "m2",
    pageNumber: 5,
    section: "01 · Biểu hiện 2",
    title: "Lao động bị cưỡng bức",
    visualType: "contrast",
    sections: [
      {
        type: "contrast",
        label: "Hai kiểu lao động",
        left: {
          title: "Lao động sáng tạo",
          items: ["Tự do, tự nguyện", "Sáng tạo", "Phát triển phẩm chất người"],
          tone: "paper",
        },
        right: {
          title: "Lao động bị ép buộc",
          items: ["Bị cưỡng bức bởi điều kiện xã hội", "Chỉ để đảm bảo tồn tại thể xác", "Thực hiện “chức năng con vật”"],
          tone: "ink",
        },
      },
      {
        type: "grid",
        cols: 2,
        items: [
          { num: "A", title: "Khi lao động", text: "Không phải để sáng tạo hay phát triển phẩm chất người — họ đang thực hiện chức năng con vật." },
          { num: "B", title: "Khi ăn uống, sinh con", text: "Họ mới là con người, vì ở đó họ được tự do." },
        ],
      },
      {
        type: "callout",
        title: "Tính chất trái ngược",
        text: "Cái thuộc về con vật trở thành cái thuộc về con người, và ngược lại — đây là biểu hiện đầu tiên của sự tha hóa.",
      },
    ],
    narration:
      "Biểu hiện thứ hai: lao động bị cưỡng bức. Sơ đồ đối chiếu hai kiểu lao động. Bên trái là lao động sáng tạo, tự do, giúp phát triển phẩm chất người. Bên phải là lao động bị ép buộc bởi điều kiện xã hội. Ở đây, con người lao động không phải để sáng tạo, mà chỉ để đảm bảo sự tồn tại của thể xác, tức là đang thực hiện chức năng con vật. Ngược lại, khi ăn uống, sinh con, họ mới cảm thấy mình là con người, vì ở đó họ được tự do. Tính chất trái ngược này chính là biểu hiện đầu tiên của sự tha hóa.",
    keywords: ["cưỡng bức", "tồn tại thể xác", "tự do"],
    purpose: "Trình bày biểu hiện thứ hai: lao động mất tính tự do, sáng tạo.",
    exampleNote: "Nội dung lấy trực tiếp từ tài liệu; không có ví dụ minh họa thêm.",
  },
  {
    id: "m3",
    pageNumber: 6,
    section: "01 · Biểu hiện 3",
    title: "Quan hệ người – người bị thay thế",
    visualType: "chain",
    sections: [
      {
        type: "contrast",
        label: "Quan hệ giữa người lao động và chủ sở hữu",
        left: { title: "Đáng lẽ", items: ["Người ↔ Người", "Quan hệ giữa con người với con người"], tone: "paper" },
        right: { title: "Thực tế", items: ["Người ↔ Vật", "Thực hiện qua vật phẩm lao động và tiền công"], tone: "burg" },
      },
      {
        type: "chain",
        items: ["Quan hệ người – người bị vật hóa", "Con người què quặt, phiến diện, khuyết thiếu", "Không phát huy được sức mạnh bản chất người"],
        highlightLast: true,
      },
    ],
    narration:
      "Biểu hiện thứ ba: quan hệ giữa người với người bị thay thế. Quan hệ giữa người lao động và chủ sở hữu tư liệu sản xuất đáng lẽ phải là quan hệ giữa con người với con người. Nhưng trên thực tế, nó lại được thực hiện thông qua vật phẩm lao động và tiền công. Như vậy, quan hệ người với người đã bị thay thế bằng quan hệ người với vật. Chuỗi hệ quả phía dưới cho thấy kết quả: con người trở nên què quặt, phiến diện, khuyết thiếu, và không phát huy được sức mạnh bản chất người của mình.",
    keywords: ["tiền công", "người – vật", "phiến diện"],
    purpose: "Trình bày biểu hiện thứ ba và hệ quả đối với con người.",
    exampleNote: "Nội dung lấy trực tiếp từ tài liệu.",
  },
  {
    id: "cause",
    pageNumber: 7,
    section: "01 · Nguyên nhân",
    title: "Nguyên nhân trực tiếp: chế độ tư hữu",
    visualType: "chain",
    sections: [
      { type: "quote", text: "Nguyên nhân gây nên hiện tượng tha hóa con người là chế độ tư hữu về tư liệu sản xuất." },
      {
        type: "chain",
        items: [
          "Chế độ tư hữu về tư liệu sản xuất",
          "Tư liệu sản xuất rơi vào tay một nhóm thiểu số",
          "Đại đa số người lao động thành vô sản, số ít thành tư sản",
          "Người vô sản buộc phải làm thuê, bị bóc lột",
          "Lao động bắt đầu bị tha hóa từ đó",
        ],
        highlightLast: true,
      },
    ],
    narration:
      "Vậy nguyên nhân của tha hóa là gì? Tài liệu khẳng định rõ: nguyên nhân gây nên hiện tượng tha hóa con người là chế độ tư hữu về tư liệu sản xuất. Hãy theo dõi chuỗi nhân quả từ trên xuống. Chế độ tư hữu khiến tư liệu sản xuất rơi vào tay một nhóm thiểu số. Từ đó, đại đa số người lao động trở thành vô sản, còn một số ít trở thành tư sản. Người vô sản buộc phải làm thuê và bị bóc lột. Và lao động bắt đầu bị tha hóa từ chính điểm này. Đây là nguyên nhân trực tiếp duy nhất mà tài liệu chỉ ra.",
    keywords: ["tư hữu", "vô sản", "bóc lột"],
    purpose: "Chỉ ra nguyên nhân trực tiếp của tha hóa bằng một chuỗi nhân quả duy nhất.",
    exampleNote: "Trích dẫn và chuỗi nhân quả lấy trực tiếp từ tài liệu.",
  },
  {
    id: "history",
    pageNumber: 8,
    section: "01 · Tính lịch sử",
    title: "Tha hóa là hiện tượng lịch sử đặc thù",
    subtitle: "Không phải nguyên nhân thứ hai — mà là bản chất của hiện tượng",
    visualType: "contrast",
    sections: [
      { type: "quote", text: "Hiện tượng tha hóa của con người là một hiện tượng lịch sử đặc thù, chỉ diễn ra trong xã hội có phân chia giai cấp." },
      {
        type: "contrast",
        label: "Hai trạng thái xã hội",
        left: { title: "Không phân chia giai cấp", items: ["Không có cơ sở cho tha hóa"], tone: "paper" },
        right: { title: "Có phân chia giai cấp", items: ["Chế độ tư hữu tồn tại → tha hóa xuất hiện", "Lên cao nhất trong xã hội tư bản chủ nghĩa"], tone: "ink" },
      },
      {
        type: "grid",
        cols: 3,
        items: [
          { title: "Sản xuất, KHCN phát triển", text: "Lợi nhuận của chủ sở hữu càng lớn" },
          { title: "Máy móc thay thế", text: "Người lao động càng bị máy móc thay thế" },
          { title: "Toàn cầu hóa", text: "Phân hóa giàu – nghèo ngày càng doãng rộng" },
        ],
      },
    ],
    narration:
      "Trang này không nói về một nguyên nhân thứ hai, mà nói về bản chất của hiện tượng tha hóa. Tài liệu viết: hiện tượng tha hóa của con người là một hiện tượng lịch sử đặc thù, chỉ diễn ra trong xã hội có phân chia giai cấp. Sơ đồ so sánh hai trạng thái. Trong xã hội không có phân chia giai cấp, tha hóa không có cơ sở để tồn tại. Còn trong xã hội có phân chia giai cấp, khi chế độ tư hữu tồn tại, tha hóa xuất hiện, và lên tới mức cao nhất trong xã hội tư bản chủ nghĩa. Ba ô phía dưới nêu biểu hiện hiện đại: sản xuất, công nghiệp và khoa học công nghệ càng phát triển thì lợi nhuận của chủ sở hữu càng lớn, người lao động càng bị máy móc thay thế, và trong bối cảnh cách mạng khoa học công nghệ cùng toàn cầu hóa, phân hóa giàu nghèo ngày càng doãng rộng. Điều này có nghĩa: tha hóa không phải số phận vĩnh viễn của con người, nên nó có thể được xóa bỏ.",
    keywords: ["lịch sử đặc thù", "giai cấp", "tư bản chủ nghĩa"],
    purpose: "Khẳng định tha hóa mang tính lịch sử, gắn với xã hội có giai cấp — tiền đề cho khả năng giải phóng.",
    exampleNote: "Trích dẫn và các biểu hiện hiện đại lấy từ tài liệu.",
  },
  {
    id: "liberation",
    pageNumber: 9,
    section: "02 · Giải phóng",
    title: "Vĩnh viễn giải phóng toàn thể xã hội",
    visualType: "grid",
    hasIllustrativeExample: true,
    sections: [
      { type: "quote", text: "Vĩnh viễn giải phóng toàn thể xã hội khỏi ách bóc lột, ách áp bức." },
      {
        type: "grid",
        cols: 2,
        items: [
          { num: "01", title: "Con đường", text: "Xóa bỏ chế độ tư hữu → thiết lập sở hữu chân chính (công hữu về tư liệu sản xuất)." },
          { num: "02", title: "Lực lượng", text: "Dựa vào “tính lực hiện thực của con người”, vai trò lịch sử của giai cấp vô sản." },
          { num: "03", title: "Môi trường lịch sử", text: "Gắn với hình thái kinh tế – xã hội Cộng sản chủ nghĩa." },
          { num: "04", title: "Bản chất", text: "Trả thế giới con người, những quan hệ của con người về với bản thân con người — xóa bỏ một cách tích cực mọi sự tha hóa." },
        ],
      },
      {
        type: "callout",
        illustrative: true,
        title: "Trước → Sau",
        text: "Sản xuất phục vụ một nhóm sở hữu → Sản xuất đáp ứng nhu cầu xã hội.",
      },
    ],
    narration:
      "Bước sang phần thứ hai: vấn đề giải phóng con người. Mục tiêu được nêu ở trích dẫn: vĩnh viễn giải phóng toàn thể xã hội khỏi ách bóc lột, ách áp bức. Bốn khối thông tin trả lời bốn câu hỏi. Con đường: xóa bỏ chế độ tư hữu, thiết lập sở hữu chân chính, tức công hữu về tư liệu sản xuất. Lực lượng: dựa vào tính lực hiện thực của con người, vai trò lịch sử của giai cấp vô sản. Môi trường lịch sử: gắn với hình thái kinh tế xã hội cộng sản chủ nghĩa. Bản chất: trả thế giới con người và những quan hệ của con người về với bản thân con người, là sự xóa bỏ một cách tích cực mọi sự tha hóa. Để dễ hình dung, có thể liên hệ một ví dụ minh họa, không phải câu trích trong giáo trình: sản xuất từ chỗ phục vụ một nhóm sở hữu chuyển sang đáp ứng nhu cầu của xã hội.",
    keywords: ["công hữu", "giai cấp vô sản", "cộng sản chủ nghĩa"],
    purpose: "Trình bày con đường, lực lượng, môi trường và bản chất của giải phóng con người.",
    exampleNote: "Bốn khối nội dung lấy từ tài liệu. Ô “Trước → Sau” là VÍ DỤ MINH HỌA do người biên soạn đưa ra.",
  },
  {
    id: "freedom",
    pageNumber: 10,
    section: "03 · Phát triển tự do",
    title: "Sự phát triển tự do của mỗi con người",
    visualType: "grid",
    sections: [
      { type: "quote", text: "Sự phát triển tự do của mỗi con người là điều kiện cho sự phát triển tự do của tất cả mọi người." },
      {
        type: "text",
        text: "Ba điều kiện của sự phát triển tự do — “Sự phát triển tự do của mỗi người chỉ có thể đạt được khi con người thoát khỏi sự tha hóa, thoát khỏi sự nô dịch…”",
      },
      {
        type: "grid",
        cols: 3,
        items: [
          { num: "01", title: "Xóa bỏ tư hữu", text: "Xóa bỏ triệt để chế độ tư hữu về tư liệu sản xuất." },
          { num: "02", title: "Thành thị – nông thôn", text: "Xóa bỏ khác biệt giữa thành thị và nông thôn." },
          { num: "03", title: "Trí óc – chân tay", text: "Xóa bỏ khác biệt giữa lao động trí óc và lao động chân tay — không còn bị trói buộc bởi phân công lao động xã hội." },
        ],
      },
    ],
    narration:
      "Phần thứ ba nói về sự phát triển tự do của con người. Câu trích trung tâm: sự phát triển tự do của mỗi con người là điều kiện cho sự phát triển tự do của tất cả mọi người. Nhưng sự phát triển tự do ấy cần điều kiện. Tài liệu nêu: sự phát triển tự do của mỗi người chỉ có thể đạt được khi con người thoát khỏi sự tha hóa, thoát khỏi sự nô dịch. Ba điều kiện được trình bày thành ba khối song song. Một, xóa bỏ triệt để chế độ tư hữu về tư liệu sản xuất. Hai, xóa bỏ khác biệt giữa thành thị và nông thôn. Ba, xóa bỏ khác biệt giữa lao động trí óc và lao động chân tay, để con người không còn bị trói buộc bởi sự phân công lao động xã hội.",
    keywords: ["phát triển tự do", "ba điều kiện", "phân công lao động"],
    purpose: "Nêu nguyên lý phát triển tự do và ba điều kiện để đạt được nó.",
    exampleNote: "Trích dẫn và ba điều kiện lấy trực tiếp từ tài liệu; không dùng ví dụ minh họa.",
  },
  {
    id: "dialectic",
    pageNumber: 11,
    section: "03 · Biện chứng",
    title: "Mối quan hệ biện chứng cá nhân – tất cả mọi người",
    visualType: "loop",
    sections: [
      {
        type: "loop",
        a: "Phát triển tự do của mỗi người",
        b: "Phát triển tự do của mọi người",
        aToB: "thúc đẩy",
        bToA: "tạo điều kiện",
        result: ["Giải phóng con người", "Điều kiện cho sự phát triển tự do"],
      },
      {
        type: "text",
        text: "Hai vế không tách rời: cá nhân phát triển tự do thúc đẩy cộng đồng; cộng đồng phát triển tự do lại tạo điều kiện quay về thúc đẩy từng cá nhân.",
      },
    ],
    narration:
      "Trang này thể hiện mối quan hệ biện chứng giữa cá nhân và tất cả mọi người bằng một vòng tròn phản hồi. Sự phát triển tự do của mỗi người thúc đẩy sự phát triển tự do của mọi người. Và ngược lại, sự phát triển tự do của mọi người tạo điều kiện quay lại thúc đẩy từng cá nhân. Hai vế không tách rời nhau, mà liên tục củng cố lẫn nhau. Điểm đến của vòng tròn này là giải phóng con người, đồng thời là điều kiện cho sự phát triển tự do. Đây cũng là đích đến của toàn bộ chương.",
    keywords: ["biện chứng", "cá nhân", "cộng đồng"],
    purpose: "Minh họa quan hệ hai chiều giữa phát triển cá nhân và phát triển xã hội.",
    exampleNote: "Không dùng ví dụ; sơ đồ diễn giải nội dung tài liệu.",
  },
  {
    id: "back",
    pageNumber: 12,
    section: "Bìa sau",
    title: "Từ tha hóa đến tự do",
    visualType: "back",
    sections: [],
    narration:
      "Tóm lại, tha hóa là con người bị đánh mất chính mình, có nguyên nhân từ chế độ tư hữu về tư liệu sản xuất, và là một hiện tượng lịch sử đặc thù. Vì vậy nó có thể được xóa bỏ, thông qua con đường giải phóng con người, hướng tới sự phát triển tự do của mỗi người, làm điều kiện cho sự phát triển tự do của tất cả mọi người. Cảm ơn các bạn đã theo dõi.",
    purpose: "Tóm tắt và khép lại cuốn sách.",
    exampleNote: "Không có ví dụ.",
  },
];
