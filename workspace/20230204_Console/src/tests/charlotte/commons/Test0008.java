package tests.charlotte.commons;

import charlotte.commons.SCommon;

public class Test0008 {
	public static void main(String[] args) {
		try {
			//test01();
			test02();
		}
		catch (Throwable e) {
			e.printStackTrace();
		}
	}

	private static void test01() {
		for (int value = -1000000; value <= 1000000; value++) {
			test01_a(value);
		}
		for (int value = -10000000; value <= 10000000; value += 10) {
			test01_a(value);
		}
		for (int value = -100000000; value <= 100000000; value += 100) {
			test01_a(value);
		}
		for (int value = -2100000000; value <= 2100000000; value += 1000) {
			test01_a(value);
		}
		for (int value = Integer.MIN_VALUE; value <= Integer.MIN_VALUE + 1000000; value++) {
			test01_a(value);
		}
		for (int value = Integer.MAX_VALUE; value >= Integer.MAX_VALUE - 1000000; value--) {
			test01_a(value);
		}
		System.out.println("OK!");
	}

	private static void test01_a(int value) {
		byte[] data = SCommon.intToBytes(value);
		int ret = SCommon.toInt(data);
		if (ret != value) {
			throw null;
		}
	}

	private static void test02() {
		for (long value = -1000000L; value <= 1000000L; value++) {
			test02_a(value);
		}
		for (long value = -100000000L; value <= 100000000L; value += 100L) {
			test02_a(value);
		}
		for (long value = -10000000000L; value <= 10000000000L; value += 10000L) {
			test02_a(value);
		}
		for (long value = -1000000000000L; value <= 1000000000000L; value += 1000000L) {
			test02_a(value);
		}
		for (long value = -100000000000000L; value <= 100000000000000L; value += 100000000L) {
			test02_a(value);
		}
		for (long value = -10000000000000000L; value <= 10000000000000000L; value += 10000000000L) {
			test02_a(value);
		}
		for (long value = -1000000000000000000L; value <= 1000000000000000000L; value += 1000000000000L) {
			test02_a(value);
		}
		for (long value = -9200000000000000000L; value <= 9200000000000000000L; value += 9200000000000L) {
			test02_a(value);
		}
		for (long value = Long.MIN_VALUE; value <= Long.MIN_VALUE + 1000000L; value++) {
			test02_a(value);
		}
		for (long value = Long.MAX_VALUE; value >= Long.MAX_VALUE - 1000000L; value--) {
			test02_a(value);
		}
		System.out.println("OK!");
	}

	private static void test02_a(long value) {
		byte[] data = SCommon.longToBytes(value);
		long ret = SCommon.toLong(data);
		if (ret != value) {
			throw null;
		}
	}
}
