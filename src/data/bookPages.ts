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
  | { type: "flowSplit"; from: string; to: [string, string]; note?: string }
  | { type: "image"; src: string; caption?: string; maxWidth?: string };

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
    subtitle: "Nhóm 5",
    visualType: "cover",
    sections: [],
    narration:
      "Chào mừng các bạn đến với cuốn sách số của học phần Triết học MLN111. Chủ đề của chúng ta là mục 3.5.2: Hiện tượng tha hóa con người và vấn đề giải phóng con người. Trong những trang tiếp theo, chúng ta sẽ lần lượt tìm hiểu tha hóa là gì, nó biểu hiện ra sao, nguyên nhân từ đâu, và con đường nào để giải phóng con người, hướng tới sự phát triển tự do của mỗi người và của tất cả mọi người. Hãy bấm vào bìa để bắt đầu.",
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
      {
        type: "callout",
        title: "Cách đọc",
        text: "Mỗi phần build trên phần trước — nên đọc theo đúng thứ tự để nắm vững mạch lập luận. Tổng cộng 10 trang nội dung, 3 phần lớn.",
      },
    ],
    narration:
      "Trang này là bản đồ nội dung của toàn bộ cuốn sách. Ở trung tâm là khái niệm tha hóa con người. Từ đó tỏa ra ba nhánh lớn. Nhánh thứ nhất — phần 01 — là thực chất của tha hóa lao động: tha hóa là gì, ba biểu hiện cụ thể, nguyên nhân trực tiếp là chế độ tư hữu, và tính chất lịch sử đặc thù của hiện tượng này. Nhánh thứ hai — phần 02 — là vấn đề giải phóng con người, gồm con đường, lực lượng, môi trường lịch sử và bản chất của sự giải phóng. Nhánh thứ ba — phần 03 — là sự phát triển tự do của con người, với ba điều kiện và mối quan hệ biện chứng giữa mỗi người và tất cả mọi người. Mạch logic xuyên suốt: nhận diện hiện tượng, tìm nguyên nhân, rồi đi tới con đường giải phóng và mục tiêu phát triển tự do.",
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
        left: { title: "Chức năng sinh học", items: ["Ăn", "Ngủ", "Sinh con → Con người"], tone: "paper" },
        right: { title: "Lao động", items: ["Chức năng cao quý nhất", "… lại chỉ như con vật"], tone: "ink" },
      },
      {
        type: "image",
        src: "/alienation_paradox_swapped_1791282760947.jpg",
        caption: "Nghịch lý: Khi ăn uống sinh hoạt thì thấy mình là con người, còn khi lao động thì rã rời như cái máy.",
        maxWidth: "58%",
      },
    ],
    narration:
      "Tha hóa con người là gì? Câu trả lời ngắn gọn nhất: đó là con người bị đánh mất chính mình. Hãy nhìn vào chuỗi sơ đồ. Con người lao động, và qua lao động tạo ra sản phẩm, hoạt động và các quan hệ. Nhưng chính những thứ do con người tạo ra ấy lại trở nên đối lập với con người. Đó chính là tha hóa. Sơ đồ đối chiếu bên dưới chỉ ra một nghịch lý cốt lõi: người lao động chỉ thấy mình là con người khi thực hiện các chức năng sinh học như ăn, ngủ, sinh con. Còn khi lao động — vốn là chức năng cao quý nhất — thì họ lại chỉ như con vật. Để dễ hình dung: hãy nghĩ đến người công nhân may mặc cả đời may những chiếc áo đẹp, nhưng không thể mua nổi chiếc áo do chính mình tạo ra. Sản phẩm của họ tồn tại như một thế giới xa lạ đối lập lại với chính người tạo ra nó.",
    keywords: ["đánh mất chính mình", "đối lập", "chức năng sinh học"],
    hasIllustrativeExample: true,
    purpose: "Định nghĩa khái niệm tha hóa con người.",
    exampleNote: "Ví dụ công nhân may mặc là minh họa thêm, không phải trích dẫn giáo trình.",
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
        text: "Cái do con người làm ra quay lại chi phối con người — quan hệ chủ thể – khách thể bị đảo ngược hoàn toàn.",
      },
      {
        type: "image",
        src: "/product_domination_1791281889339.jpg",
        caption: "Sản phẩm do con người làm ra trở thành cỗ máy khổng lồ quay lại thống trị người tạo ra nó.",
        maxWidth: "85%",
      },
    ],
    narration:
      "Biểu hiện thứ nhất của tha hóa là tha hóa với sản phẩm lao động. Nhìn vào sơ đồ phân nhánh: sản phẩm lao động lẽ ra phải phục vụ và phát triển con người. Nhưng thực tế, nó lại bị biến thành một lực lượng đối lập, nô dịch và thống trị con người. Phần so sánh bên dưới cho thấy sự đảo ngược: con người vốn là chủ thể, nhưng dưới chế độ tư hữu lại phải phụ thuộc vào chính tư liệu sản xuất và sản phẩm do mình tạo ra. Điểm mấu chốt: cái do con người làm ra lại quay lại chi phối con người, quan hệ chủ thể khách thể bị đảo ngược hoàn toàn. Để dễ hình dung: một lập trình viên tạo ra phần mềm quản lý nhân sự — và chính phần mềm đó được dùng để giám sát, theo dõi, và cuối cùng sa thải chính họ. Đây là hình ảnh cực kỳ rõ nét của biểu hiện thứ nhất.",
    keywords: ["sản phẩm", "nô dịch", "chủ thể"],
    hasIllustrativeExample: true,
    purpose: "Trình bày biểu hiện thứ nhất: con người bị chính sản phẩm của mình thống trị.",
    exampleNote: "Ví dụ lập trình viên là minh họa thêm, không phải trích dẫn giáo trình.",
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
          items: ["Tự do, tự nguyện", "Sáng tạo — phát triển phẩm chất người", "Con người làm chủ bản thân"],
          tone: "paper",
        },
        right: {
          title: "Lao động bị ép buộc",
          items: ["Bị cưỡng bức bởi điều kiện xã hội", "Chỉ để đảm bảo tồn tại thể xác", "Thực hiện 'chức năng con vật'"],
          tone: "ink",
        },
      },
      {
        type: "grid",
        cols: 2,
        items: [
          { num: "A", title: "Khi lao động", text: "Không để sáng tạo hay phát triển phẩm chất người — đang thực hiện chức năng con vật." },
          { num: "B", title: "Khi ăn uống, sinh con", text: "Mới là con người, vì ở đó được tự do — không bị cưỡng bức." },
        ],
      },
      {
        type: "callout",
        title: "Tính chất trái ngược",
        text: "Cái thuộc về con vật trở thành cái thuộc về con người, và cái thuộc về con người lại trở thành cái thuộc về con vật.",
      },
      {
        type: "quote",
        text: "Lao động là hoạt động sáng tạo của con người, là đặc trưng chỉ có ở con người chứ không có ở con vật, là hoạt động người, nhưng khi hoạt động lại trở thành hoạt động của con vật.",
      },
      {
        type: "chain",
        items: [
          "ĐIỀU KIỆN XÃ HỘI ÉP BUỘC",
          "MẤT QUYỀN QUYẾT ĐỊNH CÁCH LÀM VIỆC",
          "HOẠT ĐỘNG SÁNG TẠO BIẾN THÀNH HOẠT ĐỘNG CƯỠNG BỨC",
        ],
        highlightLast: true,
      },
    ],
    narration:
      "Biểu hiện thứ hai: lao động bị cưỡng bức. Sơ đồ đối chiếu hai kiểu lao động. Bên trái là lao động sáng tạo, tự do, tự nguyện, giúp con người làm chủ bản thân và phát triển phẩm chất người. Bên phải là lao động bị ép buộc bởi điều kiện xã hội — lao động này không nhằm sáng tạo, mà chỉ đảm bảo sự tồn tại của thể xác. Hai ô bên dưới tóm gọn nghịch lý: khi lao động thì như con vật; khi ăn uống, sinh con mới cảm thấy là con người. Bản chất này được đú cết trong triết luận của Marx: 'Lao động là hoạt động sáng tạo của con người, là đặc trưng chỉ có ở con người chứ không có ở con vật, là hoạt động người, nhưng khi hoạt động lại trở thành hoạt động của con vật.' Cơ chế được tóm gọn trong sơ đồ mũi tên: điều kiện xã hội ép buộc dẫn đến việc người lao động mất quyền quyết định cách làm việc, và cuối cùng hoạt động sáng tạo biến thành hoạt động cưỡng bức.",
    keywords: ["cưỡng bức", "tồn tại thể xác", "tự do"],
    purpose: "Trình bày biểu hiện thứ hai: lao động mất tính tự do, sáng tạo.",
    exampleNote: "Nội dung lấy trực tiếp từ tài liệu.",
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
        type: "quote",
        text: "Đáng ra đó phải là quan hệ giữa người với người, nhưng trong thực tế nó lại được thực hiện thông qua số vật phẩm do người lao động tạo ra và số tiền công mà người lao động được trả.",
      },
      {
        type: "chain",
        items: ["Quan hệ người – người bị vật hóa", "Con người què quặt, phiến diện, khuyết thiếu", "Không phát huy được sức mạnh bản chất người"],
        highlightLast: true,
      },
      {
        type: "grid",
        cols: 3,
        items: [
          { num: "01", title: "Biểu hiện 1", text: "Sản phẩm lao động trở nên đối lập, thống trị con người." },
          { num: "02", title: "Biểu hiện 2", text: "Lao động bị cưỡng bức, mất tính tự do và sáng tạo." },
          { num: "03", title: "Biểu hiện 3", text: "Quan hệ người – người bị thay thế bởi quan hệ người – vật." },
        ],
      },
    ],
    narration:
      "Biểu hiện thứ ba và cũng là biểu hiện sâu xa nhất: quan hệ giữa người với người bị thay thế. Quan hệ giữa người lao động và chủ sở hữu tư liệu sản xuất đáng lẽ phải là quan hệ giữa con người với con người — quan hệ mang tính người đích thực. Nhưng trên thực tế, nó lại được thực hiện thông qua vật phẩm lao động và tiền công. Tức là quan hệ người với người đã bị thay thế bằng quan hệ người với vật. Chuỗi hệ quả phía dưới cho thấy kết quả tất yếu: con người trở nên què quặt, phiến diện, khuyết thiếu, không phát huy được sức mạnh bản chất người của mình. Ô recap cuối trang tổng hợp lại cả ba biểu hiện đã học: sản phẩm đối lập con người, lao động bị cưỡng bức, và quan hệ người người bị vật hóa. Ba biểu hiện này cùng xuất phát từ một nguyên nhân duy nhất, mà chúng ta sẽ tìm hiểu ở trang tiếp theo.",
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
      {
        type: "callout",
        title: "Đúc kết",
        text: "Lao động bị tha hóa là nội dung chủ yếu, là nguyên nhân, là thực chất của sự tha hóa của con người.",
      },
      {
        type: "image",
        src: "/textile_mill_1791280952654.jpg",
        caption: "Dưới chế độ tư hữu, người lao động phải bán sức lao động để tồn tại.",
        maxWidth: "55%",
      },
    ],
    narration:
      "Vậy nguyên nhân gốc rễ của cả ba biểu hiện tha hóa là gì? Tài liệu khẳng định rõ ràng: nguyên nhân gây nên hiện tượng tha hóa con người là chế độ tư hữu về tư liệu sản xuất. Hãy theo dõi chuỗi nhân quả từ trên xuống. Chế độ tư hữu khiến tư liệu sản xuất rơi vào tay một nhóm thiểu số. Từ đó, đại đa số người lao động trở thành vô sản, còn một số ít trở thành tư sản. Người vô sản buộc phải bán sức lao động, làm thuê và bị bóc lột. Và lao động bắt đầu bị tha hóa từ chính điểm này. Câu đúc kết: lao động bị tha hóa là nội dung chủ yếu, là nguyên nhân, là thực chất của toàn bộ sự tha hóa của con người. Ví dụ minh họa giúp hình dung: tại một nhà máy dệt, chủ sở hữu có máy móc và nguyên liệu, còn công nhân phải bán sức lao động để sống. Toàn bộ giá trị tạo ra thuộc về chủ, công nhân chỉ nhận lương tối thiểu — đây chính là cơ chế của tha hóa.",
    keywords: ["tư hữu", "vô sản", "bóc lột"],
    hasIllustrativeExample: true,
    purpose: "Chỉ ra nguyên nhân trực tiếp của tha hóa bằng một chuỗi nhân quả duy nhất.",
    exampleNote: "Trích dẫn và chuỗi nhân quả lấy trực tiếp từ tài liệu. Ví dụ nhà máy dệt là minh họa thêm.",
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
        left: { title: "Không phân chia giai cấp", items: ["Tư liệu sản xuất thuộc về chung", "Không có cơ sở cho tha hóa", "Con người làm chủ lao động"], tone: "paper" },
        right: { title: "Có phân chia giai cấp", items: ["Chế độ tư hữu tồn tại → tha hóa xuất hiện", "Lên cao nhất trong xã hội tư bản chủ nghĩa", "Con người mất bản chất người"], tone: "ink" },
      },
      {
        type: "quote",
        text: "Tha hóa con người là thuộc tính vốn có của các nền sản xuất dựa trên chế độ tư hữu tư liệu sản xuất, nhưng nó được đẩy lên mức cao nhất trong nền sản xuất tư bản chủ nghĩa.",
      },
      {
        type: "grid",
        cols: 3,
        items: [
          { title: "Sản xuất, KHCN phát triển", text: "Lợi nhuận của chủ sở hữu càng lớn, khoảng cách giàu nghèo càng tăng" },
          { title: "Máy móc thay thế", text: "Người lao động càng bị máy móc và AI thay thế, mất việc làm hàng loạt" },
          { title: "Toàn cầu hóa", text: "Phân hóa giàu – nghèo ngày càng doãng rộng trên toàn thế giới" },
        ],
      },
      {
        type: "callout",
        title: "Ý nghĩa then chốt",
        text: "Tha hóa KHÔNG phải số phận vĩnh viễn của con người — vì nó chỉ xuất hiện trong điều kiện lịch sử nhất định, nên hoàn toàn có thể bị xóa bỏ khi điều kiện đó thay đổi.",
      },
    ],
    narration:
      "Trang này không nói về một nguyên nhân thứ hai, mà làm rõ bản chất lịch sử của hiện tượng tha hóa. Tài liệu viết: hiện tượng tha hóa của con người là một hiện tượng lịch sử đặc thù, chỉ diễn ra trong xã hội có phân chia giai cấp. Sơ đồ so sánh hai trạng thái: trong xã hội không có phân chia giai cấp, tư liệu sản xuất thuộc về chung, tha hóa không có cơ sở tồn tại. Còn trong xã hội có phân chia giai cấp, khi chế độ tư hữu tồn tại, tha hóa xuất hiện và lên tới mức cao nhất trong xã hội tư bản chủ nghĩa. Điều đó được khẳng định trong triết luận: 'Tha hóa con người là thuộc tính vốn có của các nền sản xuất dựa trên chế độ tư hữu tư liệu sản xuất, nhưng nó được đẩy lên mức cao nhất trong nền sản xuất tư bản chủ nghĩa.' Ba ô tiếp theo nêu ba biểu hiện rất hiện đại: khoa học công nghệ càng phát triển thì lợi nhuận của chủ sở hữu càng lớn; máy móc và trí tuệ nhân tạo ngày càng thay thế người lao động; và toàn cầu hóa khiến phân hóa giàu nghèo ngày càng doãng rộng. Callout cuối nêu ý nghĩa then chốt: tha hóa không phải số phận vĩnh viễn của con người. Vì nó là hiện tượng lịch sử đặc thù, nên hoàn toàn có thể bị xóa bỏ. Đây chính là tiền đề lý luận cho phần giải phóng con người ở các trang tiếp theo.",
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
          { num: "02", title: "Lực lượng", text: "Dựa vào 'tính lực hiện thực của con người', vai trò lịch sử của giai cấp vô sản." },
          { num: "03", title: "Môi trường lịch sử", text: "Gắn với hình thái kinh tế – xã hội Cộng sản chủ nghĩa." },
          { num: "04", title: "Bản chất", text: "Trả thế giới con người, những quan hệ của con người về với bản thân con người — xóa bỏ tích cực mọi sự tha hóa." },
        ],
      },
      {
        type: "callout",
        title: "Trước → Sau",
        text: "Trước: Sản xuất phục vụ lợi nhuận cho một nhóm sở hữu, người lao động là công cụ. Sau: Sản xuất đáp ứng nhu cầu xã hội, người lao động làm chủ quá trình và sản phẩm.",
      },
      {
        type: "grid",
        cols: 3,
        items: [
          { num: "01", title: "THA HÓA TỪ ĐÂU?", text: "Chế độ tư hữu về tư liệu sản xuất" },
          { num: "02", title: "TẠI SAO XÓA BỎ ĐƯỢC?", text: "Vì tha hóa là hiện tượng lịch sử, không phải bản chất vĩnh viễn" },
          { num: "03", title: "GIẢI PHÓNG BẰNG CÁCH NÀO?", text: "Xóa bỏ tư hữu, thiết lập công hữu về tư liệu sản xuất" },
        ],
      },
      {
        type: "quote",
        text: "Bất kỳ sự giải phóng nào cũng bao hàm chỗ là nó trả thế giới con người, những quan hệ của con người với bản thân con người, là sự xóa bỏ một cách tích cực mọi sự tha hóa.",
      },
    ],
    narration:
      "Bước sang phần thứ hai: vấn đề giải phóng con người. Mục tiêu lớn được nêu trong trích dẫn: vĩnh viễn giải phóng toàn thể xã hội khỏi ách bóc lột, ách áp bức. Bốn khối thông tin trả lời bốn câu hỏi cốt lõi. Thứ nhất, con đường: xóa bỏ chế độ tư hữu, thiết lập sở hữu chân chính, tức là công hữu về tư liệu sản xuất. Thứ hai, lực lượng: dựa vào tính lực hiện thực của con người, và đặc biệt là vai trò lịch sử của giai cấp vô sản. Thứ ba, môi trường lịch sử: gắn với hình thái kinh tế xã hội cộng sản chủ nghĩa. Thứ tư, bản chất: trả thế giới con người và những quan hệ của con người về với bản thân con người, là sự xóa bỏ một cách tích cực mọi sự tha hóa. Ô 'Trước và Sau' cụ thể hóa sự khác biệt: trước giải phóng, sản xuất phục vụ lợi nhuận cho một nhóm nhỏ chủ sở hữu; sau giải phóng, sản xuất đáp ứng nhu cầu xã hội, người lao động thực sự làm chủ. Ba ô tiếp theo kết nối lại mạch lý luận: tha hóa bắt nguồn từ chế độ tư hữu; tha hóa là hiện tượng lịch sử nên có thể xóa bỏ; và con đường xóa bỏ là thiết lập công hữu về tư liệu sản xuất. Cuối cùng, Marx khẳng định: 'Bất kỳ sự giải phóng nào cũng bao hàm chỗ là nó trả thế giới con người, những quan hệ của con người với bản thân con người, là sự xóa bỏ một cách tích cực mọi sự tha hóa.'",
    keywords: ["công hữu", "giai cấp vô sản", "cộng sản chủ nghĩa"],
    purpose: "Trình bày con đường, lực lượng, môi trường và bản chất của giải phóng con người.",
    exampleNote: "Bốn khối nội dung lấy từ tài liệu. Ô 'Trước → Sau' là VÍ DỤ MINH HỌA do người biên soạn đưa ra.",
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
        text: "Ba điều kiện của sự phát triển tự do — 'Sự phát triển tự do của mỗi người chỉ có thể đạt được khi con người thoát khỏi sự tha hóa, thoát khỏi sự nô dịch…'",
      },
      {
        type: "grid",
        cols: 3,
        items: [
          { num: "01", title: "Xóa bỏ tư hữu", text: "Xóa bỏ triệt để chế độ tư hữu về tư liệu sản xuất — nền tảng vật chất của tự do." },
          { num: "02", title: "Thành thị – nông thôn", text: "Xóa bỏ khác biệt giữa thành thị và nông thôn — tạo bình đẳng về cơ hội phát triển." },
          { num: "03", title: "Trí óc – chân tay", text: "Xóa bỏ khác biệt giữa lao động trí óc và chân tay — con người không bị trói buộc bởi phân công lao động." },
        ],
      },
      {
        type: "image",
        src: "/free_life_1791280964231.jpg",
        caption: "Một xã hội giải phóng: con người không bị trói buộc vào một vai trò cố định.",
        maxWidth: "88%",
      },
    ],
    narration:
      "Phần thứ ba nói về đích đến cuối cùng: sự phát triển tự do của con người. Câu trích trung tâm đặt ra nguyên lý biện chứng: sự phát triển tự do của mỗi con người là điều kiện cho sự phát triển tự do của tất cả mọi người — và ngược lại. Nhưng sự phát triển tự do ấy cần ba điều kiện cụ thể. Điều kiện một: xóa bỏ triệt để chế độ tư hữu về tư liệu sản xuất, đây là nền tảng vật chất của mọi tự do thực sự. Điều kiện hai: xóa bỏ khác biệt giữa thành thị và nông thôn, tạo bình đẳng về cơ hội phát triển cho mọi người. Điều kiện ba: xóa bỏ khác biệt giữa lao động trí óc và lao động chân tay, để con người không còn bị trói buộc mãi vào một phân công lao động xã hội nhất định. Callout minh họa ở cuối trang diễn đạt rất sinh động: con người trong xã hội đã giải phóng có thể sáng làm ruộng, chiều làm thơ, tối đọc sách và phê bình triết học — họ không bị buộc mãi vào một vai trò duy nhất suốt cả đời. Đây là hình ảnh của con người toàn diện, phát triển tự do.",
    keywords: ["phát triển tự do", "ba điều kiện", "phân công lao động"],
    hasIllustrativeExample: true,
    purpose: "Nêu nguyên lý phát triển tự do và ba điều kiện để đạt được nó.",
    exampleNote: "Trích dẫn và ba điều kiện lấy trực tiếp từ tài liệu. Callout minh họa là diễn đạt của người biên soạn.",
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
        type: "callout",
        title: "Kết luận toàn chương",
        text: "Hai vế không tách rời. Tha hóa → Giải phóng → Phát triển tự do: hành trình từ đánh mất bản thân đến sự tự do thực sự.",
      },
    ],
    narration:
      "Trang cuối của phần nội dung thể hiện mối quan hệ biện chứng giữa cá nhân và tất cả mọi người. Sơ đồ vòng tròn cho thấy hai chiều tác động liên tục: sự phát triển tự do của mỗi người thúc đẩy sự phát triển tự do của mọi người, và ngược lại, sự phát triển tự do của mọi người lại tạo điều kiện quay lại thúc đẩy từng cá nhân. Hai vế không tách rời nhau, mà liên tục củng cố lẫn nhau trong một vòng tròn đi lên. Điểm đến của vòng tròn này chính là giải phóng con người — đồng thời cũng là điều kiện cho sự phát triển tự do toàn diện. Callout kết luận tóm gọn hành trình toàn chương bằng ba từ: tha hóa — giải phóng — phát triển tự do. Đây là hành trình của nhân loại: từ mất bản thân đến tìm lại chính mình, và cuối cùng đạt đến sự tự do thực sự. Cảm ơn các bạn đã theo dõi.",
    keywords: ["biện chứng", "cá nhân", "cộng đồng"],
    purpose: "Minh họa quan hệ hai chiều giữa phát triển cá nhân và phát triển xã hội.",
    exampleNote: "Sơ đồ diễn giải nội dung tài liệu. Callout kết luận do người biên soạn đúc kết.",
  },
  {
    id: "back",
    pageNumber: 12,
    section: "Bìa sau",
    title: "Từ tha hóa đến tự do",
    visualType: "back",
    sections: [],
    narration:
      "Tóm lại, tha hóa là con người bị đánh mất chính mình, có nguyên nhân từ chế độ tư hữu về tư liệu sản xuất, và là một hiện tượng lịch sử đặc thù — vì vậy nó có thể được xóa bỏ. Con đường giải phóng dẫn đến sự phát triển tự do của mỗi người, và sự phát triển tự do của mỗi người chính là điều kiện cho sự phát triển tự do của tất cả mọi người. Cảm ơn các bạn đã theo dõi cuốn sách số của nhóm 5.",
    purpose: "Tóm tắt và khép lại cuốn sách.",
    exampleNote: "Không có ví dụ.",
  },
];
