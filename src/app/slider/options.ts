import { PointerType } from './pointer-type';

// Loại nhãn
export enum LabelType {
  // Nhãn phía trên con trỏ thấp
  Low,
  // Nhãn phía trên con trỏ cao
  High,
  // Nhãn cho giá trị thanh trượt tối thiểu
  Floor,
  // Nhãn cho giá trị thanh trượt tối đa
  Ceil,
  // Nhãn bên dưới đánh dấu chú giải
  TickValue,
}

// Chức năng dịch giá trị nhãn thành văn bản
export type TranslateFunction = (value: number, label: LabelType) => string;
// Chức năng kết hợp
export type CombineLabelsFunction = (
  minLabel: string,
  maxLabel: string
) => string;
// Chức năng cung cấp chú giải
export type GetLegendFunction = (value: number) => string;
export type GetStepLegendFunction = (step: CustomStepDefinition) => string;

// Hàm chuyển đổi giá trị thanh trượt sang vị trí thanh trượt
export type ValueToPositionFunction = (
  val: number,
  minVal: number,
  maxVal: number
) => number;

// Hàm chuyển đổi vị trí thanh trượt thành giá trị thanh trượt
export type PositionToValueFunction = (
  percent: number,
  minVal: number,
  maxVal: number
) => number;

// Định nghĩa bước tùy chỉnh
// Điều này có thể được sử dụng để chỉ định các giá trị tùy chỉnh và giá trị chú giải cho các tick của thanh trượt
export interface CustomStepDefinition {
  // Giá trị
  value: number;
  // Chú giải (nhãn cho giá trị)
  legend?: string;
}

// Tùy chọn thanh trượt
export class Options {
  // Giá trị nhỏ nhất cho một thanh trượt. Không áp dụng khi sử dụng stepArray.
  floor?: number = 0;

  // Giá trị tối đa cho một thanh trượt. Không áp dụng khi sử dụng stepArray.
  ceil?: number | undefined;

  // Bước nhảy giữa mỗi giá trị. Không áp dụng khi sử dụng stepArray.
  step?: number = 1;

  // Phạm vi tối thiểu được phép trên thanh trượt. Chỉ áp dụng cho thanh trượt phạm vi. Khi sử dụng stepArray, được biểu thị dưới dạng chỉ mục vào stepArray.
  minRange?: number | undefined;

  // Phạm vi tối đa được phép trên thanh trượt. Chỉ áp dụng cho thanh trượt phạm vi. Khi sử dụng stepArray, được biểu thị dưới dạng chỉ mục vào stepArray.
  maxRange?: number | undefined;

  // Đặt thành true để có hành vi đẩy. Khi xử lý tối thiểu vượt quá mức tối đa, giá trị tối đa cũng được di chuyển (và ngược lại). Phạm vi giữa tối thiểu và tối đa là được xác định bởi tùy chọn bước (mặc định là 1) và cũng có thể được ghi đè bởi tùy chọn minRange. Chỉ áp dụng cho thanh trượt phạm vi.
  pushRange?: boolean = false;

  // Giá trị tối thiểu được ủy quyền trên thanh trượt. Khi sử dụng stepsArray, được thể hiện dưới dạng chỉ mục thành bước.
  minLimit?: number | undefined;

  // Giá trị tối đa được ủy quyền trên thanh trượt. Khi sử dụng stepsArray, được thể hiện dưới dạng chỉ mục thành bước.
  maxLimit?: number | undefined;

  // Hàm dịch tùy chỉnh.Sử dụng điều này nếu bạn muốn dịch các giá trị được hiển thị Trên thanh trượt.
  translate?: TranslateFunction | undefined;

  // Chức năng tùy chỉnh để kết hợp các nhãn chồng chéo trong Slider phạm vi. Nó lấy các giá trị tối đa và tối đa (đã được dịch bằng lệnh dịch) và nên trả lại cách hai giá trị này nên được kết hợp. Nếu không được cung cấp, hàm mặc định sẽ tham gia hai giá trị với ' -' Là người phân tách.
  combineLabels?: CombineLabelsFunction | undefined;

  // Sử dụng để hiển thị huyền thoại dưới ve (do đó, nó cần được sử dụng cùng với showticks hoặc showticksvalues).Chức năng sẽ được gọi với mỗi đánh dấu Giá trị và nội dung được trả về sẽ được hiển thị theo Tick dưới dạng huyền thoại. Nếu giá trị trả về là null, thì không có truyền thuyết nào được hiển thị dưới Ticks tương ứng. Bạn cũng có thể trực tiếp cung cấp các giá trị huyền thoại Trong tùy chọn StepArray.
  getLegend?: GetLegendFunction | undefined;

  // Sử dụng để hiển thị một huyền thoại tùy chỉnh của một kế hoạch từ BƯỚC. Nó sẽ giống như getlegend nhưng đối với các bước.
  getStepLegend?: GetStepLegendFunction | undefined;

  // Nếu bạn muốn hiển thị một thanh trượt với các bước phi tuyến tính/số. Chỉ cần vượt qua một mảng với mỗi giá trị thanh trượt và đó là nó;Cài đặt sàn, trần và bước của thanh trượt sẽ được tính toán tự động. Theo mặc định, mô hình giá trị và giá trị mô hình giá trị sẽ là giá trị của mục đã chọn Trong các bước. Chúng cũng có thể bị ràng buộc với chỉ mục của mục đã chọn bằng cách đặt BindIndExforStepsArray tùy chọn để đúng.
  stepsArray?: CustomStepDefinition[] | undefined;

  // Được đặt thành true để liên kết chỉ số của mục đã chọn với mô hình giá trị và mô hình giá trị.
  bindIndexForStepsArray?: boolean = false;

  // Khi được đặt thành TRUE và sử dụng một thanh trượt phạm vi, phạm vi có thể được kéo bởi thanh lựa chọn. Chỉ áp dụng cho các slider phạm vi.
  draggableRange?: boolean = false;

  // Giống như DragGableRange nhưng phạm vi trượt không thể thay đổi. Chỉ áp dụng cho các slider phạm vi.
  draggableRangeOnly?: boolean = false;

  // Đặt thành True để luôn hiển thị thanh lựa chọn trước tay cầm thanh trượt.
  showSelectionBar?: boolean = false;

  // Đặt thành True để luôn hiển thị thanh lựa chọn sau tay cầm thanh trượt.
  showSelectionBarEnd?: boolean = false;

  //  Đặt một số để vẽ thanh lựa chọn giữa giá trị này và tay cầm thanh trượt. Khi sử dụng stepsArray, được thể hiện dưới dạng chỉ mục thành bước.
  showSelectionBarFromValue?: number | undefined;

  //  Chỉ cho slider phạm vi.Đặt thành True để hình dung trong các khu vực khác nhau các khu vực Ở bên trái/phải (trên/dưới cho thanh trượt phạm vi thẳng đứng) của thanh lựa chọn giữa các tay cầm.
  showOuterSelectionBars?: boolean = false;

  // Đặt thành True để ẩn các nhãn con trỏ
  hidePointerLabels?: boolean = false;

  // Đặt thành True để ẩn nhãn Min / Max
  hideLimitLabels?: boolean = false;

  // Đặt thành Sai để vô hiệu hóa hành vi ẩn tự động của các nhãn giới hạn.
  autoHideLimitLabels?: boolean = true;

  // Đặt thành true để thực hiện thanh trượt chỉ đọc.
  readOnly?: boolean = false;

  // Đặt thành true để vô hiệu hóa thanh trượt.
  disabled?: boolean = false;

  // Đặt thành True để hiển thị một dấu ấn cho mỗi bước của thanh trượt.
  showTicks?: boolean = false;

  // Đặt thành true để hiển thị một dấu ve và giá trị bước cho từng bước của thanh trượt..
  showTicksValues?: boolean = false;

  // Bước giữa mỗi đánh dấu để hiển thị.Nếu không được đặt, giá trị bước được sử dụng.Không được sử dụng khi ticksarray được chỉ định.
  tickStep?: number | undefined;

  // Bước giữa việc hiển thị mỗi giá trị bước đánh dấu.Nếu không được đặt, thì Tickstep hoặc bước được sử dụng, tùy thuộc vào cái nào được đặt.
  tickValueStep?: number | undefined;

  // Sử dụng để hiển thị ve ở các vị trí cụ thể.Mảng chứa chỉ số của các ve nên được hiển thị.Ví dụ: [0, 1, 5] sẽ hiển thị một đánh dấu cho các giá trị thứ nhất, thứ hai và thứ sáu.
  ticksArray?: number[] | undefined;

  // Được sử dụng để hiển thị một chú giải công cụ khi đánh dấu.Đặt thành một hàm trả về nội dung chú giải công cụ cho một giá trị nhất định.
  ticksTooltip?: (value: number) => string | undefined;

  // Tương tự như Tickstooltip nhưng đối với các giá trị đánh dấu.
  ticksValuesTooltip?: (value: number) => string | undefined;

  // Đặt thành true để hiển thị thanh trượt theo chiều dọc.Thanh trượt sẽ mất toàn bộ chiều cao của cha mẹ.Thay đổi giá trị này trong thời gian chạy hiện không được hỗ trợ.
  vertical?: boolean = false;

  // Chức năng trả về màu hiện tại của thanh lựa chọn. Nếu màu của bạn không thay đổi, đừng sử dụng tùy chọn này nhưng đặt nó thông qua CSS. Nếu màu được trả về phụ thuộc vào giá trị mô hình (giá trị hoặc giá trị), Bạn nên sử dụng đối số được truyền cho chức năng. Thật vậy, khi hàm được gọi, không có gì chắc chắn rằng mô hình đã được cập nhật.
  getSelectionBarColor?: (
    minValue: number,
    maxValue?: number
  ) => string | undefined;

  // Chức năng trả về màu của đánh dấu. ShowTicks phải được bật.
  getTickColor?: (value: number) => string | undefined;

  // Chức năng trả về màu hiện tại của một con trỏ. Nếu màu của bạn không thay đổi, đừng sử dụng tùy chọn này nhưng đặt nó thông qua CSS. Nếu màu được trả về phụ thuộc vào giá trị mô hình (giá trị hoặc giá trị), Bạn nên sử dụng đối số được truyền cho chức năng. Thật vậy, khi chức năng được gọi, không có gì chắc chắn rằng mô hình đã được cập nhật. Để xử lý các con trỏ trượt phạm vi một cách độc lập, bạn nên đánh giá con trỏ trong phạm vi đã cho Chức năng trong đó "tối thiểu" là viết tắt của mô hình giá trị và "tối đa" cho các giá trị mô hình giá trị.
  getPointerColor?: (
    value: number,
    pointerType: PointerType
  ) => string | undefined;

  // Tay cầm có thể tập trung (khi nhấp hoặc với tab) và có thể được sửa đổi bằng cách sử dụng các điều khiển bàn phím sau: Mũi tên trái/dưới: -1 Mũi tên phải/trên: +1 Trang xuống: -10% Trang lên: +10% Trang chủ: Giá trị tối thiểu Kết thúc: Giá trị tối đa
  keyboardSupport?: boolean = true;

  // Nếu bạn hiển thị thanh trượt trong một phần tử sử dụng Transform: Scale (0,5), hãy đặt giá trị tỷ lệ thành 2 để thanh trượt được hiển thị đúng và các sự kiện được xử lý chính xác.
  scale?: number = 1;

  // Nếu bạn hiển thị thanh trượt trong một phần tử sử dụng biến đổi: xoay (90deg), hãy đặt giá trị xoay thành 90 để thanh trượt được hiển thị đúng và các sự kiện được xử lý chính xác.Giá trị là bằng độ.
  rotate?: number = 0;

  // Đặt thành đúng để buộc (các) giá trị được làm tròn vào bước, ngay cả khi được sửa đổi từ bên ngoài. Khi được đặt thành sai, nếu các giá trị mô hình được sửa đổi từ bên ngoài thanh trượt, chúng không được làm tròn và có thể ở giữa hai bước.
  enforceStep?: boolean = true;

  // Đặt thành đúng để buộc (các) giá trị được chuẩn hóa thành phạm vi cho phép (từ sàn đến trần), ngay cả khi được sửa đổi từ bên ngoài. Khi được đặt thành sai, nếu các giá trị mô hình được sửa đổi từ bên ngoài thanh trượt và chúng ở bên ngoài phạm vi được phép, Thanh trượt có thể được hiển thị không chính xác.Tuy nhiên, việc đặt điều này thành sai có thể hữu ích nếu bạn muốn thực hiện chuẩn hóa tùy chỉnh.
  enforceRange?: boolean = true;

  // Đặt thành true để buộc (các) giá trị được làm tròn đến giá trị bước gần nhất, ngay cả khi được sửa đổi từ bên ngoài. Khi được đặt thành sai, nếu các giá trị mô hình được sửa đổi từ bên ngoài thanh trượt và chúng ở bên ngoài phạm vi được phép, Thanh trượt có thể được hiển thị không chính xác.Tuy nhiên, việc đặt điều này thành sai có thể hữu ích nếu bạn muốn thực hiện chuẩn hóa tùy chỉnh.
  enforceStepsArray?: boolean = true;

  // Đặt thành True để ngăn người dùng chuyển đổi tay cầm tối đa và tối đa. Chỉ áp dụng cho các slider phạm vi.
  noSwitching?: boolean = false;

  // Đặt thành true để chỉ liên kết các sự kiện trên tay cầm trượt.
  onlyBindHandles?: boolean = false;

  // Đặt thành True để hiển thị đồ thị phải sang trái. Nếu dọc là đúng, nó sẽ từ trên xuống dưới và các hàm mũi tên trái / phải đảo ngược.
  rightToLeft?: boolean = false;

  // Đặt thành True thành Điều hướng bàn phím đảo ngược: Mũi tên phải/trên: -1 Mũi tên trái/dưới: +1 Trang lên: -10% Trang xuống: +10% Kết thúc: Giá trị tối thiểu Trang chủ: Giá trị tối đa

  reversedControls?: boolean = false;

  // Đặt thành True để giữ các nhãn trượt bên trong giới hạn thanh trượt.
  boundPointerLabels?: boolean = true;

  // Set to true to use a logarithmic scale to display the slider.
  logScale?: boolean = false;

  // Hàm trả về vị trí trên thanh trượt cho một giá trị nhất định. Vị trí phải là một tỷ lệ phần trăm từ 0 đến 1. Chức năng nên tăng hoặc giảm đơn điệu;Nếu không, thanh trượt có thể cư xử không chính xác.
  customValueToPosition?: ValueToPositionFunction | undefined;

  // Hàm trả về giá trị cho một vị trí nhất định trên thanh trượt. Vị trí là một tỷ lệ phần trăm từ 0 đến 1. Chức năng nên tăng hoặc giảm đơn điệu;Nếu không, thanh trượt có thể cư xử không chính xác.
  customPositionToValue?: PositionToValueFunction | undefined;

  // Giới hạn chính xác cho các giá trị được tính toán. Các giá trị được sử dụng trong các tính toán sẽ được làm tròn vào số chữ số quan trọng này Để ngăn chặn tích lũy các lỗi điểm nổi nhỏ.
  precisionLimit?: number = 12;

  // Sử dụng để hiển thị thanh lựa chọn như một gradient. Đối tượng đã cho phải chứa từ và đến các thuộc tính là màu sắc.
  selectionBarGradient?: { from: string; to: string } | undefined;

  // Sử dụng để thêm nhãn trực tiếp vào thanh trượt để tiếp cận.Thêm thuộc tính nhãn ARIA.
  ariaLabel?: string = 'ngx-slider';

  // Sử dụng thay vì Arialabel để tham chiếu ID của một phần tử sẽ được sử dụng để dán nhãn thanh trượt. Thêm thuộc tính Aria-Labelledby.
  ariaLabelledBy?: string | undefined;

  // Sử dụng để thêm một nhãn trực tiếp vào phạm vi thanh trượt để tiếp cận.Thêm thuộc tính nhãn ARIA.
  ariaLabelHigh?: string = 'ngx-slider-max';

  // Sử dụng thay vì Arialabelhigh để tham chiếu ID của một phần tử sẽ được sử dụng để dán nhãn phạm vi trượt. Thêm thuộc tính Aria-Labelledby.
  ariaLabelledByHigh?: string | undefined;

  // Sử dụng để tăng hiệu suất kết xuất.Nếu giá trị không được cung cấp, thanh trượt sẽ tính toán với/chiều cao của tay cầm
  handleDimension?: number | undefined;

  // Sử dụng để tăng hiệu suất kết xuất.Nếu giá trị không được cung cấp, thanh trượt sẽ tính toán với/chiều cao của thanh
  barDimension?: number | undefined;

  // Bật/tắt hình ảnh động CSS
  animate?: boolean = true;

  // Bật/tắt hoạt hình CSS trong khi di chuyển thanh trượt
  animateOnMove?: boolean = false;
}
