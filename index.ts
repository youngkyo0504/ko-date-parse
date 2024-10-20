import { addDays, addWeeks, setDay } from "date-fns";

type DatePattern = {
  regex: RegExp;
  parse: (match: RegExpMatchArray) => Date;
};

const patterns: DatePattern[] = [
  {
    regex: /(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/,
    parse: (match) =>
      new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3])),
  },
  {
    regex: /오늘/,

    parse: () => new Date(),
  },
  {
    regex: /내일/,
    parse: () => {
      return addDays(new Date(), 1);
    },
  },
  {
    regex: /모레/,
    parse: () => {
      return addDays(new Date(), 2);
    },
  },
  {
    regex: /어제/,
    parse: () => {
      return addDays(new Date(), -1);
    },
  },
  {
    regex: /그제/,
    parse: () => {
      return addDays(new Date(), -2);
    },
  },
  {
    regex: /(\d+)일\s*(전|후)/,
    parse: (match) => {
      const date = new Date();
      const days = parseInt(match[1]);
      date.setDate(date.getDate() + (match[2] === "후" ? days : -days));
      return date;
    },
  },
  {
    regex: /((다)+음|이번|저번|지난)주\s*(월|화|수|목|금|토|일)요일/,
    parse: (match) => {
      const date = new Date();
      const dayNames = ["월", "화", "수", "목", "금", "토", "일"];
      const currentDay = (date.getDay() + 6) % 7; // 월요일을 0으로 변환
      const targetDay = dayNames.indexOf(match[3]);
      let weekOffset = 0;

      if (match[1] === "이번") {
        weekOffset = 0;
      } else if (match[1] === "저번" || match[1] === "지난") {
        weekOffset = -1;
      } else {
        // '다음', '다다음', '다다다음' 등을 처리
        weekOffset = match[1].length -1 ;
        console.log(weekOffset);
      }

      // 현재 요일부터 목표 요일까지의 일수 계산
      let daysUntilTarget = targetDay - currentDay;

      // 현재 날짜가 목표 요일 이후라면 다음 주로 넘김
      if (daysUntilTarget <= 0 && weekOffset === 0) {
        daysUntilTarget += 7;
      }

      // 주 단위 오프셋과 목표 요일까지의 일수를 더함
      date.setDate(date.getDate() + weekOffset * 7 + daysUntilTarget);
      return date;
    },
  },
  {
    regex: /(오전|오후)\s*(\d{1,2})시\s*(\d{1,2})?분?/,
    parse: (match) => {
      const date = new Date();
      let hours = parseInt(match[2]);
      if (match[1] === "오후" && hours !== 12) hours += 12;
      if (match[1] === "오전" && hours === 12) hours = 0;
      date.setHours(hours, parseInt(match[3] || "0"), 0, 0);
      return date;
    },
  },
];

function parseKoreanDate(text: string): Date | null {
  for (const pattern of patterns) {
    const match = text.match(pattern.regex);
    if (match) {
      return pattern.parse(match);
    }
  }
  return null;
}

export { parseKoreanDate  };

