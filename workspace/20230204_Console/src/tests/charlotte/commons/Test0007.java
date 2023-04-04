package tests.charlotte.commons;

import java.util.Map;
import java.util.Set;

import charlotte.commons.SCommon;

public class Test0007 {
	public static void main(String[] args) {
		try {
			test01();
		}
		catch (Throwable e) {
			e.printStackTrace();
		}
	}

	private static void test01() {
		Map<String, Integer> m = SCommon.<Integer>createMap();

		m.put("A", 1);
		m.put("B", 2);
		m.put("a", 3);
		m.put("b", 4);

		System.out.println(m.get("A"));
		System.out.println(m.get("B"));
		System.out.println(m.get("a"));
		System.out.println(m.get("b"));

		m = SCommon.<Integer>createMapIgnoreCase();

		m.put("A", 1);
		m.put("B", 2);
		m.put("a", 3);
		m.put("b", 4);

		System.out.println(m.get("A"));
		System.out.println(m.get("B"));
		System.out.println(m.get("a"));
		System.out.println(m.get("b"));

		Set<String> s = SCommon.createSet();

		s.add("A");
		s.add("B");
		//s.add("a");
		//s.add("b");

		System.out.println(s.contains("A"));
		System.out.println(s.contains("B"));
		System.out.println(s.contains("a"));
		System.out.println(s.contains("b"));

		s = SCommon.createSetIgnoreCase();

		s.add("A");
		s.add("B");
		//s.add("a");
		//s.add("b");

		System.out.println(s.contains("A"));
		System.out.println(s.contains("B"));
		System.out.println(s.contains("a"));
		System.out.println(s.contains("b"));
	}
}
