package tests.charlotte.commons;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import charlotte.commons.SCommon;

public class Test0001 {
	public static void main(String[] args) {
		try {
			//new Test0001().test01();
			//new Test0001().test02();
			//new Test0001().test03();
			//new Test0001().test04();
			//new Test0001().test05();
			new Test0001().test06();
		}
		catch (Throwable e) {
			e.printStackTrace();
		}
	}

	private void test01() {
		SCommon.searchDirectory(new File("C:/temp"),
				true,
				//false,
				f -> System.out.println(f.getAbsolutePath()));
	}

	private void test02() {
		for (File f : SCommon.getFiles(new File("C:/temp"), true).stream().filter(f -> f.isFile()).collect(Collectors.toList())) {
			System.out.println("file: " + f);
		}
		for (File d : SCommon.getFiles(new File("C:/temp"), true).stream().filter(f -> f.isDirectory()).collect(Collectors.toList())) {
			System.out.println("directory: " + d);
		}
	}

	private void test03() {
		for (int c = 0; c < 1000; c++) {
			//System.out.println(SCommon.cryptRandom.getLong());
			//System.out.println(SCommon.cryptRandom.getPositiveLong());
			//System.out.println(SCommon.cryptRandom.getReal1());
			//System.out.println(SCommon.cryptRandom.getReal2());
			System.out.println(SCommon.cryptRandom.getReal3(-300.0, 700.0));
		}
	}

	private void test04() {
		// list = { "HELLO", "HELLO", "HELLO", "HELLO", "HELLO" }
		List<String> list = Stream.generate(() -> "HELLO").limit(5).collect(Collectors.toList());

		for (String element : list) {
			System.out.println(element);
		}
	}

	private void test05() {
		List<String> list = IntStream.range(1, 10).mapToObj(v -> String.format("%04d", v)).toList();
		list = new ArrayList<String>(list); // to mutable

		System.out.println(String.join(", ", list));

		String element = SCommon.fastRemoveElement(list, 4);
		System.out.println(element);

		System.out.println(String.join(", ", list));
	}

	private void test06() {
		test06_a(1000000000);
		test06_a(100000000);
		test06_a(10000000);
		test06_a(1000000);
		test06_a(100000);
		test06_a(10000);
		test06_a(1000);
		test06_a(100);
		test06_a(10);

		System.out.println("OK!");
	}

	private void test06_a(int scale) {
		System.out.println("scale: " + scale);

		for (int testCnt = 0; testCnt < 300000; testCnt++) {
			String a = "" + SCommon.cryptRandom.getInt(scale);
			String b = "" + SCommon.cryptRandom.getInt(scale);

			int ret1 = a.compareTo(b);
			int ret2 = SCommon.compare(
					SCommon.toList(a.toCharArray()),
					SCommon.toList(b.toCharArray()), (v1, v2) -> (int)v1.charValue() - (int)v2.charValue());

			ret1 = SCommon.toRange(ret1, -1, 1);
			ret2 = SCommon.toRange(ret2, -1, 1);

			//System.out.println(ret1 + ", " + ret2); // test

			if (ret1 != ret2) {
				throw null;
			}
		}
		System.out.println("OK");
	}
}
