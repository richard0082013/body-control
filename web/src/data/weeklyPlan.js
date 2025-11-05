export const weeklyPlan = [
  {
    id: 'mon',
    label: '周一',
    focus: '低冲击有氧 + 全身激活',
    cardio: '室内快走或踏步 12-15 分钟，保持 RPE 4-5。',
    strength: [
      '坐姿划船（弹力带） ×12',
      '靠墙深蹲 ×10',
      '跪姿俯卧撑 ×8',
      '站姿侧抬腿 ×12/侧',
    ],
    reminders: [
      '训练前后测量血糖，并记录在应用中。',
      '第一周先以 2 组为主，根据状态再提高。',
    ],
    segments: [
      {
        id: 'warmup',
        label: '热身',
        description: '原地踏步 3-4 分钟 + 肩颈环绕 + 膝踝活动。',
      },
      {
        id: 'cardio',
        label: '有氧',
        description: '室内快走或踏步机，保持匀速与平稳呼吸。',
      },
      {
        id: 'strength',
        label: '抗阻循环',
        description: '完成列出的 4 个动作 2 轮，中间休息 45 秒。',
      },
      {
        id: 'cooldown',
        label: '放松',
        description: '股四头肌、腘绳肌、背部拉伸，每个动作 30 秒。',
      },
    ],
  },
  {
    id: 'tue',
    label: '周二',
    focus: '关节灵活性 + 核心稳定',
    cardio: '原地小步走或简易舞动 8 分钟，保持轻松节奏。',
    strength: [
      '猫牛式 ×12',
      '桥式 ×10',
      '坐姿转体 ×12/侧',
      '鸟狗式 ×10/侧（腰不适时改桌面支撑踢腿）',
    ],
    reminders: [
      '控制动作节奏，核心保持激活。',
      '若血糖低于 6 mmol/L，先补充少量碳水再开始。',
    ],
    segments: [
      {
        id: 'warmup',
        label: '热身',
        description: '肩部环绕、躯干侧屈与动态髋部环绕各 8 次。',
      },
      {
        id: 'mobility',
        label: '灵活性',
        description: '猫牛式与关节活动，关注脊柱分节控制。',
      },
      {
        id: 'core',
        label: '核心训练',
        description: '桥式、坐姿转体、鸟狗式各 2 轮，控制呼吸。',
      },
      {
        id: 'cooldown',
        label: '放松',
        description: '腰背、臀部、肩部静态拉伸，每个 30 秒。',
      },
    ],
  },
  {
    id: 'wed',
    label: '周三',
    focus: '主动恢复与血糖管理',
    cardio: '饭后 30 分钟内，舒缓步行 20-30 分钟。',
    strength: ['轻度拉伸或弹力带牵伸，重点关注小腿与背部。'],
    reminders: [
      '如果天气或空间受限，可在家原地走或跟随轻柔操。',
      '记录步行时间与感受，保持舒适对话节奏。',
    ],
    segments: [
      {
        id: 'walk',
        label: '轻松步行',
        description: '保持轻松呼吸，可分成两次各 10-15 分钟完成。',
      },
      {
        id: 'mobility',
        label: '拉伸',
        description: '进行全身轻柔拉伸与泡沫轴放松（如有条件）。',
      },
      {
        id: 'mindfulness',
        label: '呼吸或冥想',
        description: '5 分钟腹式呼吸或冥想，帮助放松。',
      },
    ],
  },
  {
    id: 'thu',
    label: '周四',
    focus: '间歇有氧 + 下肢力量',
    cardio: '1 分钟抬膝或楼梯间歇 ×6 组，间隔 1 分钟慢走。',
    strength: [
      '椅子起立 ×12',
      '弓步后撤 ×8/腿',
      '站姿提踵 ×15',
      '弹力带臀外展 ×12',
    ],
    reminders: [
      '间歇有氧期间保持安全支撑，避免动作过快。',
      '如血压升高或心率超过 140，请降低强度。',
    ],
    segments: [
      {
        id: 'warmup',
        label: '热身',
        description: '踝膝髋关节动态活动 + 原地小跑 2 分钟。',
      },
      {
        id: 'interval',
        label: '间歇有氧',
        description: '抬膝或踏步快慢交替 6 组，间隔期间步行。',
      },
      {
        id: 'strength',
        label: '下肢力量',
        description: '完成列出的 4 个动作 2-3 轮，动作要稳。',
      },
      {
        id: 'cooldown',
        label: '放松',
        description: '臀部、股四头肌、小腿拉伸各 30 秒。',
      },
    ],
  },
  {
    id: 'fri',
    label: '周五',
    focus: '上肢肌耐力 + 核心',
    cardio: '室内快走 10 分钟，保持匀速。',
    strength: [
      '弹力带胸推 ×12',
      '坐姿单臂划船 ×12/臂',
      '跪姿平板支撑 20 秒 ×2',
      '弹力带外旋 ×12',
    ],
    reminders: [
      '肩关节注意角度，阻力带不要过紧。',
      '如果出现手麻或肩痛，减少幅度或改成更轻阻力。',
    ],
    segments: [
      {
        id: 'warmup',
        label: '热身',
        description: '肩袖激活 + 手臂环绕 + 胸椎打开各 8 次。',
      },
      {
        id: 'cardio',
        label: '有氧',
        description: '快走 10 分钟或原地踏步。',
      },
      {
        id: 'strength',
        label: '上肢/核心',
        description: '完成列出的动作 2-3 轮，注意核心稳定。',
      },
      {
        id: 'cooldown',
        label: '放松',
        description: '胸肌、背阔肌与前臂拉伸各 30 秒。',
      },
    ],
  },
  {
    id: 'sat',
    label: '周六',
    focus: '综合循环 + 心肺耐力',
    cardio: '交替 3 分钟快走 + 1 分钟踏步，合计 20 分钟。',
    strength: [
      '站姿划船（弹力带） ×12',
      '半蹲侧步 ×10/侧',
      '反向卷腹 ×12',
      '站姿推肩（弹力带或轻哑铃） ×10',
    ],
    reminders: [
      '如果感觉疲劳，可减少循环次数或调整间隔。',
      '保持呼吸节奏，不要屏气。',
    ],
    segments: [
      {
        id: 'warmup',
        label: '热身',
        description: '动态腿摆动、肩部活动与轻度深蹲各 10 次。',
      },
      {
        id: 'cardio',
        label: '有氧循环',
        description: '快走与踏步交替 20 分钟，可根据空间调整。',
      },
      {
        id: 'strength',
        label: '综合抗阻',
        description: '完成列出的动作 2 轮，中间休息 60 秒。',
      },
      {
        id: 'cooldown',
        label: '放松',
        description: '全身拉伸 + 5 分钟腹式呼吸。',
      },
    ],
  },
  {
    id: 'sun',
    label: '周日',
    focus: '休息与恢复',
    cardio: '可选择散步或太极 20 分钟，保持舒缓。',
    strength: [
      '下犬式 30 秒 ×2',
      '股四头肌拉伸 30 秒 ×2',
      '胸肌打开拉伸 30 秒 ×2',
    ],
    reminders: [
      '关注身体反馈，必要时安排完全休息日。',
      '进行简单的感恩或冥想，缓解压力。',
    ],
    segments: [
      {
        id: 'mobility',
        label: '拉伸',
        description: '进行列出的拉伸动作，每个 30 秒。',
      },
      {
        id: 'breath',
        label: '呼吸练习',
        description: '腹式呼吸或冥想 5 分钟，延长呼气。',
      },
      {
        id: 'journaling',
        label: '周总结',
        description: '记录本周状态、血糖趋势与下周目标。',
      },
    ],
  },
]
