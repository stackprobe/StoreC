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
		//test02_a(4, 2);
		//test02_a(6, 2);
		//test02_a(8, 2);
		//test02_a(10, 2);
		//test02_a(12, 2);
		//test02_a(14, 2);

		//test02_a(40, 4);
		//test02_a(50, 5);
		//test02_a(60, 6);

		//test02_a(100, 10);

		//test02_a(50, 4);
		//test02_a(50, 3); //　重い

		//test02_a(20, 3);
		//test02_a(21, 3);
		//test02_a(22, 3);
		//test02_a(23, 3);

		test02_a(20, 2);
	}

	private static void test02_a(int tableSize, int coinSize) {
		for (int index = 0; index + coinSize <= tableSize; index++) {
			boolean[] table = new boolean[tableSize];

			for (int c = 0; c < coinSize; c++) {
				table[index + c] = true;
			}

			boolean winFlag = isWin(table, coinSize, 0);

			System.out.println(index + ", " + tableSize + " --> " + winFlag);
		}
	}

	private static boolean isWin(boolean[] table, int coinSize, int depth) {
		for (int index = 0; index + coinSize <= table.length; index++) {
			boolean puttable = true;

			for (int c = 0; c < coinSize; c++) {
				if (table[index + c]) {
					puttable = false;
					break;
				}
			}

			if (puttable) {
				for (int c = 0; c < coinSize; c++) {
					table[index + c] = true;
				}
				boolean winFlag = isWin(table, coinSize, depth + 1);
				for (int c = 0; c < coinSize; c++) {
					table[index + c] = false;
				}

				// 相手が負けるなら、こちらの勝ち
				if (!winFlag) {
					if (depth == 0) {
						// 勝った場合の初手
						System.out.println(index);
					}
					return true;
				}
			}
		}

		// 置く場所がない or 勝てる手が無い -> 負け
		return false;
	}
}
