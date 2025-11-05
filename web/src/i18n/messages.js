export const localeOptions = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' },
]

export const messages = {
  zh: {
    app: {
      eyebrow: '身体管理 · 每周循环',
      title: '个性化训练与饮食助手',
      description:
        '根据当前身体状况生成 7 天训练与三餐计划。调整健康信息会自动更新建议，并保存在本地。',
      today: '今天是：',
      clearProgress: '清空本周训练记录',
      localeLabel: '界面语言',
      localeNames: {
        zh: '中文',
        en: 'English',
      },
      localeToggleHint: '切换到 {locale}',
      planInsightsTitle: '训练强度提示',
      profileSummaryTitle: '当前体况摘要',
      profileSummaryItems: {
        heightWeight: '身高：{height} cm · 体重：{weight} kg',
        bmi: 'BMI：{value}',
        bmiPending: 'BMI：待计算',
        diabetes: {
          none: '血糖状况：无糖尿病',
          pre: '血糖状况：糖调受损 / 前期',
          type2: '血糖状况：2 型糖尿病',
        },
        hypertension: {
          true: '血压情况：有高血压/波动，需密切监测',
          false: '血压情况：血压正常范围',
        },
        goal: {
          metabolic: '训练目标：控糖控压，整体代谢改善',
          'weight-loss': '训练目标：减脂与体重管理',
          fitness: '训练目标：提升体能与肌力',
        },
      },
      summaryNote:
        '体况调整后，训练与饮食建议会重新生成；若出现异常症状，务必先咨询医生或运动康复师。',
      planInsightsFootnote:
        '周步数目标：{steps} 步（平均每日 {daily} 步）',
    },
    tabs: {
      training: '训练计划',
      nutrition: '饮食计划',
      profile: '身体信息',
    },
    weeklyProgress: {
      title: '家庭训练进度概览',
      subtitle: '每周保持持续与稳定，重点关注血糖与血压反馈。',
      stats: {
        completedMoves: '已完成动作',
        completedDays: '完成日',
        completionRate: '周完成度',
      },
    },
    dayCard: {
      cardio: '有氧安排',
      focus: '动作重点',
      checklist: '今日检查项',
      reminders: '提醒',
      notesLabel: '今日感受 / 血糖备注',
      reset: '重置本日记录',
      demo: '图文示范',
      tips: '小提示',
      toggle: {
        expand: '展开',
        collapse: '收起',
      },
    },
    nutritionPlan: {
      title: '饮食指导',
      recommended: '推荐热量：',
      docNote: '更详细的食材替换与准备建议见 `docs/nutrition-plan.md`。',
      snacks: '加餐建议',
      notes: '提醒',
      toggle: {
        expand: '展开',
        collapse: '收起',
      },
    },
    profileForm: {
      title: '身体情况与目标',
      reset: '恢复默认',
      height: '身高 (cm)',
      weight: '体重 (kg)',
      diabetes: '血糖情况',
      diabetesOptions: {
        none: '无糖尿病',
        pre: '糖调受损 / 前期',
        type2: '2 型糖尿病',
      },
      hypertension: '存在高血压或血压波动',
      medication: '正在按医嘱服药',
      activity: '当前运动习惯',
      activityOptions: {
        gentle: '温和（刚起步/恢复期）',
        moderate: '适中（每周 3-4 次）',
        progressive: '进阶（每周 ≥5 次）',
      },
      goal: '主要目标',
      goalOptions: {
        metabolic: '控糖控压，整体代谢改善',
        'weight-loss': '减脂与体重管理',
        fitness: '提升体能与肌力',
      },
      bmi: {
        label: '当前 BMI：',
        pending: '未计算',
        level: {
          obese3: '肥胖 III 级（需严控能量）',
          obese2: '肥胖 II 级（加强控糖减脂）',
          overweight: '超重（配合运动减脂）',
          normal: '正常范围',
        },
      },
      hint: '调整上述信息将自动重新生成训练与饮食建议，所有更改会在本地保存。',
    },
    nutritionCard: {
      meals: {
        breakfast: '早餐',
        lunch: '午餐',
        dinner: '晚餐',
      },
    },
  },
  en: {
    app: {
      eyebrow: 'Body Management · Weekly Cycle',
      title: 'Personalized Training & Nutrition Assistant',
      description:
        'Generate a 7-day training and meal plan based on your current health profile. Update the profile anytime to refresh recommendations, stored locally.',
      today: 'Today is: ',
      clearProgress: 'Clear This Week’s Training Log',
      localeLabel: 'Interface Language',
      localeNames: {
        zh: '中文',
        en: 'English',
      },
      localeToggleHint: 'Switch to {locale}',
      planInsightsTitle: 'Training Intensity Guidance',
      profileSummaryTitle: 'Current Health Snapshot',
      profileSummaryItems: {
        heightWeight: 'Height: {height} cm · Weight: {weight} kg',
        bmi: 'BMI: {value}',
        bmiPending: 'BMI: to be calculated',
        diabetes: {
          none: 'Glycemic status: no diabetes',
          pre: 'Glycemic status: impaired regulation / pre-diabetes',
          type2: 'Glycemic status: type 2 diabetes',
        },
        hypertension: {
          true: 'Blood pressure: hypertension/unstable, monitor closely',
          false: 'Blood pressure: within normal range',
        },
        goal: {
          metabolic: 'Goal: metabolic control for glucose & blood pressure',
          'weight-loss': 'Goal: fat loss and weight management',
          fitness: 'Goal: improve fitness and strength',
        },
      },
      summaryNote:
        'After adjusting your profile, training and nutrition advice refresh automatically. Consult a physician or therapist if any unusual symptoms occur.',
      planInsightsFootnote:
        'Weekly step target: {steps} steps (about {daily} steps per day)',
    },
    tabs: {
      training: 'Training Plan',
      nutrition: 'Meal Plan',
      profile: 'Health Profile',
    },
    weeklyProgress: {
      title: 'Weekly Training Overview',
      subtitle: 'Stay consistent each week and track blood glucose and pressure feedback.',
      stats: {
        completedMoves: 'Completed actions',
        completedDays: 'Completed days',
        completionRate: 'Weekly completion',
      },
    },
    dayCard: {
      cardio: 'Cardio focus',
      focus: 'Key movements',
      checklist: 'Today’s checklist',
      reminders: 'Reminders',
      notesLabel: 'Notes / glucose feedback',
      reset: 'Reset today',
      demo: 'Visual guide',
      tips: 'Tips',
      toggle: {
        expand: 'Expand',
        collapse: 'Collapse',
      },
    },
    nutritionPlan: {
      title: 'Nutrition Guidance',
       recommended: 'Recommended calories:',
      docNote: 'See `docs/nutrition-plan.md` for detailed substitutions and prep tips.',
      snacks: 'Snack ideas',
      notes: 'Notes',
      toggle: {
        expand: 'Expand',
        collapse: 'Collapse',
      },
    },
    profileForm: {
      title: 'Health Profile & Goals',
      reset: 'Reset to default',
      height: 'Height (cm)',
      weight: 'Weight (kg)',
      diabetes: 'Glycemic status',
      diabetesOptions: {
        none: 'No diabetes',
        pre: 'Impaired regulation / pre-diabetes',
        type2: 'Type 2 diabetes',
      },
      hypertension: 'Hypertension or blood pressure volatility',
      medication: 'Taking medication as prescribed',
      activity: 'Current activity level',
      activityOptions: {
        gentle: 'Gentle (starting out / recovering)',
        moderate: 'Moderate (3-4 sessions per week)',
        progressive: 'Progressive (5+ sessions per week)',
      },
      goal: 'Primary goal',
      goalOptions: {
        metabolic: 'Metabolic control for glucose & pressure',
        'weight-loss': 'Fat loss and weight management',
        fitness: 'Improve fitness and strength',
      },
      bmi: {
        label: 'Current BMI: ',
        pending: 'Not calculated yet',
        level: {
          obese3: 'Obesity class III (strict calorie management)',
          obese2: 'Obesity class II (focus on glucose/fat reduction)',
          overweight: 'Overweight (pair training with fat loss)',
          normal: 'Within healthy range',
        },
      },
      hint: 'Updates automatically regenerate training and meal plans. Changes stay on this device.',
    },
    nutritionCard: {
      meals: {
        breakfast: 'Breakfast',
        lunch: 'Lunch',
        dinner: 'Dinner',
      },
    },
  },
}
