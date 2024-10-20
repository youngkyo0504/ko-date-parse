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
      const days = parseInt(match[1]);
      return addDays(new Date(), match[2] === "후" ? days : -days);
    },
  },
  {
    regex: /(\d+)주\s*(전|후)/,
    parse: (match) => {
      const weekOffset = parseInt(match[1]);
      return addDays(
        new Date(),
        match[2] === "후" ? weekOffset * 7 : -weekOffset * 7,
      );
    },
  },
  {
    regex: /((다)+음|이번|저번|지난)\s주\s*(월|화|수|목|금|토|일)요일/,
    parse: (match) => {
      const date = new Date();
      const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
      const dayOfWeek = dayNames.indexOf(match[3]);

      let weekOffset = 0;

      if (match[1] === "이번") {
        weekOffset = 0;
      } else if (match[1] === "저번" || match[1] === "지난") {
        weekOffset = -1;
      } else {
        // '다음', '다다음', '다다다음' 등을 처리
        weekOffset = match[1].length - 1;
      }

      const futureDate = addWeeks(date, weekOffset);
      return setDay(futureDate, dayOfWeek, { weekStartsOn: 1 });
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

