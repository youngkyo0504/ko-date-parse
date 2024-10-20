import { assertEquals } from "@std/assert";
import { parseKoreanDate } from "./index.ts";
import { format } from "date-fns";

import MockDate from "mockdate";

MockDate.set("2024-10-20");
const formatYYYYMMDD = (date: Date) => format(date, "yyyy-MM-dd");

Deno.test("오늘", () => {
  assertEquals(formatYYYYMMDD(parseKoreanDate("오늘")!), "2024-10-20");
  format(parseKoreanDate("내일")!, "MM-dd");
});

Deno.test("내일", () => {
  assertEquals(formatYYYYMMDD(parseKoreanDate("내일")!), "2024-10-21");
});

Deno.test("모레", () => {
  assertEquals(formatYYYYMMDD(parseKoreanDate("모레")!), "2024-10-22");
});

Deno.test("어제 날짜 파싱", () => {
  assertEquals(formatYYYYMMDD(parseKoreanDate("어제")!), "2024-10-19");
});

Deno.test("그제 날짜 파싱", () => {
  assertEquals(formatYYYYMMDD(parseKoreanDate("그제")!), "2024-10-18");
});

Deno.test("N일 후", () => {
  assertEquals(formatYYYYMMDD(parseKoreanDate("1일 후")!), "2024-10-21");
  assertEquals(formatYYYYMMDD(parseKoreanDate("1일후")!), "2024-10-21");
  assertEquals(formatYYYYMMDD(parseKoreanDate("2일 후")!), "2024-10-22");
  assertEquals(formatYYYYMMDD(parseKoreanDate("3일 후")!), "2024-10-23");
  assertEquals(formatYYYYMMDD(parseKoreanDate("4일 후")!), "2024-10-24");
  assertEquals(formatYYYYMMDD(parseKoreanDate("5일 후")!), "2024-10-25");
  assertEquals(formatYYYYMMDD(parseKoreanDate("6일 후")!), "2024-10-26");
  assertEquals(formatYYYYMMDD(parseKoreanDate("7일 후")!), "2024-10-27");
  assertEquals(formatYYYYMMDD(parseKoreanDate("17일 후")!), "2024-11-06");
  assertEquals(formatYYYYMMDD(parseKoreanDate("17일후")!), "2024-11-06");
});

Deno.test("이번 주 요일 파싱", () => {
  assertEquals(
    formatYYYYMMDD(parseKoreanDate("이번 주 금요일")!),
    "2024-10-18",
  );
});

Deno.test("다음 주 요일 파싱", () => {
  assertEquals(
    formatYYYYMMDD(parseKoreanDate("다음 주 월요일")!),
    "2024-10-21",
  );
  assertEquals(
    formatYYYYMMDD(parseKoreanDate("다음 주 금요일")!),
    "2024-10-25",
  );
  assertEquals(
    formatYYYYMMDD(parseKoreanDate("다다음 주 목요일")!),
    "2024-10-31",
  );
  assertEquals(
    formatYYYYMMDD(parseKoreanDate("다다음 주 목요일")!),
    "2024-10-31",
  );
  assertEquals(
    formatYYYYMMDD(parseKoreanDate("다다다음 주 목요일")!),
    "2024-11-07",
  );
});

Deno.test("지난 주 요일 파싱", () => {
  assertEquals(
    formatYYYYMMDD(parseKoreanDate("지난 주 목요일")!),
    "2024-10-10",
  );
});

Deno.test("저번 주 요일 파싱", () => {
  assertEquals(
    formatYYYYMMDD(parseKoreanDate("저번 주 목요일")!),
    "2024-10-10",
  );
});

Deno.test("N일 전 파싱", () => {
  assertEquals(formatYYYYMMDD(parseKoreanDate("1일 전")!), "2024-10-19");
  assertEquals(formatYYYYMMDD(parseKoreanDate("1일전")!), "2024-10-19");
  assertEquals(formatYYYYMMDD(parseKoreanDate("2일 전")!), "2024-10-18");
  assertEquals(formatYYYYMMDD(parseKoreanDate("3일 전")!), "2024-10-17");
  assertEquals(formatYYYYMMDD(parseKoreanDate("4일 전")!), "2024-10-16");
  assertEquals(formatYYYYMMDD(parseKoreanDate("5일 전")!), "2024-10-15");
  assertEquals(formatYYYYMMDD(parseKoreanDate("6일 전")!), "2024-10-14");
  assertEquals(formatYYYYMMDD(parseKoreanDate("7일 전")!), "2024-10-13");
  assertEquals(formatYYYYMMDD(parseKoreanDate("17일 전")!), "2024-10-03");
  assertEquals(formatYYYYMMDD(parseKoreanDate("17일전")!), "2024-10-03");
  assertEquals(formatYYYYMMDD(parseKoreanDate("27일전")!), "2024-09-23");
});

Deno.test("N주 후 파싱", () => {
  assertEquals(formatYYYYMMDD(parseKoreanDate("2주 후")!), "2024-11-03");
});

Deno.test("N주 전 파싱", () => {
  assertEquals(formatYYYYMMDD(parseKoreanDate("2주 전")!), "2024-10-06");
});

Deno.test("잘못된 형식 처리", () => {
  assertEquals(parseKoreanDate("잘못된 날짜"), undefined);
});
