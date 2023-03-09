package tests.charlotte.commons;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Test0006 {
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
		List<String> strs = new ArrayList<String>();

		strs.add("AAA");
		strs.add("BBB");
		strs.add("CCC");

		strs = strs.stream().toList();
		//strs.add("DDD"); // 例外 -- unmodifiableList

		for (String str : strs) {
			System.out.println(str);
		}

		strs = strs.stream().collect(Collectors.toList());
		strs.add("DDD"); // ok

		for (String str : strs) {
			System.out.println(str);
		}
	}

	private static void test02() {
		System.out.println("Hello, Happy World!");
	}
}
