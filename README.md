# ko-date-parse

ko-date-parse는 한국어로 된 날짜와 시간 표현을 파싱하는 JavaScript
라이브러리입니다. 이 라이브러리를 사용하면 "다음주 화요일", "3일 후", "오후 3시
30분" 등의 다양한 한국어 표현을 JavaScript의 Date 객체로 쉽게 변환할 수
있습니다.

## 특징

- 다양한 한국어 날짜/시간 표현 지원
- 상대적인 날짜 표현 처리 (예: "내일", "다음주 수요일")
- 시간 표현 처리 (예: "오후 3시 30분")
- 간단하고 직관적인 API

## 설치

npm을 사용하여 @kky/ko-date-parse를 설치할 수 있습니다.

```bash
# npm
npx jsr add @kky/ko-date-parse

# pnpm
pnpm dlx jsr add @kky/ko-date-parse

# yarn
yarn dlx jsr add @kky/ko-date-parse

# deno
deno add jsr:@kky/ko-date-parse

# bun
bunx jsr add @kky/ko-date-parse
```

## 사용법

다음은 ko-date-parse를 사용하는 기본적인 예제입니다:

```javascript
import { parseKoreanDate } from ("@kky/ko-date-parse");

console.log(parseKoreanDate("내일"));
console.log(parseKoreanDate("다음주 화요일"));
console.log(parseKoreanDate("3일 후"));
console.log(parseKoreanDate("오후 3시 30분"));
```

## 지원하는 표현

ko-date-parse는 다음과 같은 표현을 지원합니다:

- 날짜 형식: "2023년 5월 15일"
- 상대적인 날짜: "오늘", "내일", "모레", "어제", "그제"
- N일 전/후: "3일 후", "5일 전"
- 요일 표현: "이번주 월요일", "다음주 화요일", "저번주 수요일"
- 다중 주 표현: "다다음주 목요일", "다다다음주 금요일"
- 시간 표현: "오전 9시", "오후 3시 30분"

## API

### parse(text)

주어진 한국어 텍스트를 파싱하여 JavaScript Date 객체를 반환합니다.

- `text` (String): 파싱할 한국어 날짜/시간 표현
- 반환값: Date 객체 또는 파싱 실패 시 undefined

## 예제

```javascript
import { parseKoreanDate } from ("@kky/ko-date-parse");

const date1 = parseKoreanDate("다음주 월요일");
console.log(date1); // 다음 주 월요일에 해당하는 Date 객체

const date2 = parseKoreanDate("3일 후 오후 2시");
console.log(date2); // 3일 후 오후 2시에 해당하는 Date 객체

const date3 = parseKoreanDate("2023년 12월 25일");
console.log(date3); // 2023년 12월 25일에 해당하는 Date 객체
```

## 기여하기

버그를 발견하셨거나 새로운 기능을 제안하고 싶으시다면, 이슈를 열어주세요. 풀
리퀘스트도 환영합니다.

## 라이선스

MIT
