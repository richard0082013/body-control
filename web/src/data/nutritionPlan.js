const baseNutritionPlan = [
  {
    id: 'mon',
    label: '周一',
    theme: '基础控糖日',
    focus: '1800 kcal 左右，均衡碳水 + 蛋白',
    meals: {
      breakfast: {
        title: '早餐',
        items: ['黑麦/燕麦片 45g + 无糖豆浆 250ml', '水煮蛋 1 个', '生菜番茄沙拉'],
        tips: '复合碳水搭配蛋白质，稳定上午血糖。',
      },
      lunch: {
        title: '午餐',
        items: ['糙米饭 100g（生重）', '清蒸鳕鱼 120g', '西兰花胡萝卜 200g', '海带豆腐汤'],
        tips: '海带补充碘与钾，降低血压波动风险。',
      },
      dinner: {
        title: '晚餐',
        items: ['荞麦面 80g（干重）', '蒸鸡腿去皮 120g', '炒蘑菇菠菜 200g', '紫菜虾皮汤'],
        tips: '晚餐碳水适度减少，搭配高纤维蔬菜。',
      },
    },
    snacks: ['无盐坚果 10g + 半个苹果', '原味低脂酸奶 150ml'],
    notes: ['注意充足饮水，减少含糖饮品。'],
  },
  {
    id: 'tue',
    label: '周二',
    theme: '膳食纤维加强日',
    focus: '提升饱腹感，调节血糖曲线',
    meals: {
      breakfast: {
        title: '早餐',
        items: ['黑麦面包 2 片', '低脂奶酪 20g', '黄瓜胡萝卜条'],
        tips: '搭配高纤蔬菜，延缓碳水吸收。',
      },
      lunch: {
        title: '午餐',
        items: ['杂豆饭 100g', '卤牛腱 80g', '豆腐 100g', '甘蓝秋葵番茄 200g'],
        tips: '豆类 + 牛肉提供铁与蛋白质，需控制盐分。',
      },
      dinner: {
        title: '晚餐',
        items: ['藜麦 70g（干重）', '清炒虾仁 100g', '凉拌菠菜木耳'],
        tips: '藜麦含优质氨基酸，可稳定饱腹。',
      },
    },
    snacks: ['奇亚籽 10g 混入酸奶', '樱桃番茄一把'],
    notes: ['奇亚籽需提前浸泡，避免肠胃不适。'],
  },
  {
    id: 'wed',
    label: '周三',
    theme: '温和轻断碳水',
    focus: '降低主食份量，增加蔬菜',
    meals: {
      breakfast: {
        title: '早餐',
        items: ['全麦卷饼夹鸡蛋、生菜', '无糖豆浆 200ml'],
        tips: '早餐主食适度控制，配合蛋白质稳定血糖。',
      },
      lunch: {
        title: '午餐',
        items: ['藜麦鸡肉沙拉（橄榄油 5g）', '混合叶菜 250g', '牛油果 1/4 个'],
        tips: '橄榄油与牛油果提供健康脂肪，注意份量。',
      },
      dinner: {
        title: '晚餐',
        items: ['番茄豆腐鲜虾汤', '蒸南瓜 120g'],
        tips: '主食份量减少时注意监测血糖，防止低血糖。',
      },
    },
    snacks: ['绿茶或洛神花茶（无糖）'],
    notes: ['今日主食减少，运动量保持在低至中等强度。'],
  },
  {
    id: 'thu',
    label: '周四',
    theme: '优质脂肪补给',
    focus: '稳压稳糖 + 心血管支持',
    meals: {
      breakfast: {
        title: '早餐',
        items: ['燕麦粥 45g', '水煮蛋 1 个', '胡萝卜苹果泥'],
        tips: '胡萝卜与少量苹果泥提供 β-胡萝卜素与膳食纤维。',
      },
      lunch: {
        title: '午餐',
        items: ['糙米 + 荞麦饭 100g', '红烧鲑鱼 120g', '芦笋、菠菜 200g'],
        tips: '鲑鱼富含 Omega-3，烹饪时注意少油少盐。',
      },
      dinner: {
        title: '晚餐',
        items: ['紫薯 100g', '豆腐煲 150g', '炒西兰花香菇'],
        tips: '紫薯替换部分主食，提供花青素。',
      },
    },
    snacks: ['牛油果 1/4 个 + 坚果 10g', '原味酸奶 120ml'],
    notes: ['注意控制总脂肪摄入，确保坚果份量适中。'],
  },
  {
    id: 'fri',
    label: '周五',
    theme: '脑力支持日',
    focus: '工作日高专注，稳定血糖供能',
    meals: {
      breakfast: {
        title: '早餐',
        items: ['燕麦片 + 无糖豆奶', '亚麻籽粉 1 勺', '蓝莓 40g'],
        tips: '蓝莓控制份量，提供抗氧化物。',
      },
      lunch: {
        title: '午餐',
        items: ['三文鱼饭盒（糙米 80g）', '紫甘蓝、萝卜丝', '味增汤（低盐）'],
        tips: '保持午餐轻油低盐，避免午后血糖骤升骤降。',
      },
      dinner: {
        title: '晚餐',
        items: ['罗宋汤', '烤鸡腿去皮 120g', '西葫芦 200g'],
        tips: '罗宋汤注意控制番茄酱和盐分，用番茄熬煮替代。',
      },
    },
    snacks: ['原味坚果 10g', '小份猕猴桃或苹果'],
    notes: ['如需加班，准备无糖酸奶或极低糖蛋白棒应对饥饿。'],
  },
  {
    id: 'sat',
    label: '周六',
    theme: '训练日补给',
    focus: '适度提高蛋白质，保证恢复',
    meals: {
      breakfast: {
        title: '早餐',
        items: ['杂粮粥 1 碗', '煎鸡蛋 1 个', '烤南瓜 100g'],
        tips: '训练日前保证足够碳水，避免低血糖。',
      },
      lunch: {
        title: '午餐',
        items: ['全麦意面 60g', '火鸡胸肉 100g', '甜椒、菜花 200g'],
        tips: '意面烹饪尽量保持硬芯，降低 GI。',
      },
      dinner: {
        title: '晚餐',
        items: ['杂粮饭 80g', '虾仁 100g', '豌豆胡萝卜 200g'],
        tips: '训练后 1 小时内补充蛋白+碳水，帮助恢复。',
      },
    },
    snacks: ['蛋白粉（低糖）1 份或低脂牛奶', '香蕉半根（运动后）'],
    notes: ['运动后 2 小时内避免高油炸物，保持补水充足。'],
  },
  {
    id: 'sun',
    label: '周日',
    theme: '轻松恢复 + 排钠',
    focus: '低盐清淡，关注肠胃休整',
    meals: {
      breakfast: {
        title: '早餐',
        items: ['小米粥 1 碗', '蒸玉米半根', '凉拌黄瓜'],
        tips: '玉米提供缓慢释放的碳水与纤维。',
      },
      lunch: {
        title: '午餐',
        items: ['清蒸豆腐 150g', '鸡蛋羹', '莲藕木耳炒菜'],
        tips: '豆腐与鸡蛋结合提供优质蛋白，烹调少油。',
      },
      dinner: {
        title: '晚餐',
        items: ['荞麦糊 80g', '烫青菜 200g', '牛油果沙拉少量'],
        tips: '晚餐保持轻量，促进睡眠与血压稳定。',
      },
    },
    snacks: ['红枣姜茶（无糖）', '无糖酸奶 120ml'],
    notes: ['安排轻松散步或太极，关注当天血压与血糖走势。'],
  },
]

function cloneNutritionPlan() {
  return baseNutritionPlan.map((day) => JSON.parse(JSON.stringify(day)))
}

function adjustEnergyTarget(baseFocus, calorieTarget) {
  return baseFocus.replace(/\d{3,4}\s*kcal/, `${calorieTarget} kcal`)
}

function determineCalorieTarget(profile) {
  const base = 1800
  if (profile.goal === 'weight-loss') {
    return profile.activityLevel === 'progressive' ? 1900 : 1700
  }
  if (profile.goal === 'fitness') {
    return profile.activityLevel === 'progressive' ? 2100 : 1900
  }
  return profile.activityLevel === 'gentle' ? 1750 : base
}

function applyConditionNotes(day, profile) {
  const notes = new Set(day.notes || [])
  if (profile.diabetesType !== 'none') {
    notes.add('餐后 2 小时检测血糖，记录不同主食对血糖的影响。')
  }
  if (profile.hasHypertension) {
    notes.add('烹调时控制盐与酱料，用香草与柠檬代替味精、鸡精。')
  }
  if (profile.goal === 'weight-loss') {
    notes.add('夜间若饥饿，优先选择温水或高纤蔬菜而非碳水。')
  }
  day.notes = Array.from(notes)
  return day
}

export function createNutritionPlan(profile) {
  const workingProfile = {
    goal: profile.goal || 'metabolic',
    activityLevel: profile.activityLevel || 'gentle',
    diabetesType: profile.diabetesType ?? 'type2',
    hasHypertension: profile.hasHypertension ?? true,
  }

  const calorieTarget = determineCalorieTarget(workingProfile)

  const days = cloneNutritionPlan().map((day) => {
    const adjusted = { ...day }
    adjusted.focus = adjustEnergyTarget(day.focus, calorieTarget)
    if (workingProfile.goal === 'fitness') {
      adjusted.snacks = [...(day.snacks || []), '运动后 30 分钟内补充 10-15g 蛋白质']
    }
    if (workingProfile.goal === 'weight-loss' && day.id === 'wed') {
      adjusted.snacks = ['温水或无糖茶', '切片黄瓜、芹菜棒']
    }
    if (workingProfile.diabetesType !== 'none' && day.id === 'fri') {
      adjusted.snacks = (day.snacks || []).map((snack) =>
        snack.includes('蓝莓') ? snack.replace('蓝莓 40g', '蓝莓 30g') : snack,
      )
    }
    applyConditionNotes(adjusted, workingProfile)
    return adjusted
  })

  return {
    days,
    meta: {
      calorieTarget,
      hydration: '每日水分 2000ml 左右，可选择无糖茶替换部分饮用水。',
      fibreGoal: '每日膳食纤维 ≥30g，保证至少 500g 蔬菜摄入。',
    },
  }
}

export { baseNutritionPlan }

