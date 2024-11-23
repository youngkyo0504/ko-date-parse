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
    regex: /((다)+음|이번|저번|지난)\s*주\s*(월|화|수|목|금|토|일)요일/,
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


/**
 * 한국어로 표현된 날짜 문자열을 파싱하여 JavaScript Date 객체로 변환합니다.
 * 
 * @param {string} text - 파싱할 한국어 날짜 문자열
 * @returns {Date | undefined} 파싱된 Date 객체 또는 파싱 실패 시 undefined
 * 
 * @example
 * ```ts
 * parseKoreanDate("2023년 12월 25일");    // 2023년 12월 25일의 Date 객체
 * parseKoreanDate("오늘");               // 현재 날짜의 Date 객체
 * parseKoreanDate("3일 후");             // 현재로부터 3일 후의 Date 객체
 * parseKoreanDate("다음 주 월요일");       // 다음 주 월요일의 Date 객체
 * parseKoreanDate("오후 3시 30분");       // 오늘 오후 3시 30분의 Date 객체
 * ```
 * 
 * @description
 * 이 함수는 다양한 형식의 한국어 날짜 표현을 인식하고 파싱합니다:
 * 1. 'YYYY년 MM월 DD일' 형식의 날짜
 * 2. '오늘', '내일', '모레', '어제', '그제'와 같은 상대적 날짜
 * 3. 'N일 전/후', 'N주 전/후'와 같은 상대적 시간 표현
 * 4. '이번 주 X요일', '다음 주 X요일', '저번 주 X요일'과 같은 주 단위 표현
 *    ('다다음 주', '다다다음 주' 등의 표현도 지원)
 * 5. '오전/오후 HH시 MM분' 형식의 시간 표현
 * 
 * 함수는 주어진 문자열을 순차적으로 각 패턴과 대조하여 일치하는 패턴을 찾습니다.
 * 일치하는 패턴이 발견되면 해당 패턴의 파싱 로직을 사용하여 Date 객체를 생성합니다.
 * 
 * 
 * @note
 * - 시간대(timezone) 정보는 고려하지 않으며, 사용자의 로컬 시간대를 기준으로 동작합니다.
 * - 인식되지 않는 날짜 형식에 대해서는 undefined를 반환합니다.
 */
function parseKoreanDate(text: string): Date | undefined {
  for (const pattern of patterns) {
    const match = text.match(pattern.regex);
    if (match) {
      return pattern.parse(match);
    }
  }
  return undefined;
}

export { parseKoreanDate };
