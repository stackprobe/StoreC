package tests.charlotte.commons;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import charlotte.commons.SCommon;

public class Test0003 {
	public static void main(String[] args) {
		try {
			//new Test0003().test01();
			new Test0003().test02();
		}
		catch (Throwable e) {
			e.printStackTrace();
		}
	}

	private void test01() throws Exception {
		String S_TEST_CHRS =
				SCommon.DECIMAL + SCommon.ALPHA + SCommon.alpha;

		List<Character> TEST_CHRS =
				SCommon.toList(S_TEST_CHRS.toCharArray());

		for (int testCnt = 0; testCnt < 3000; testCnt++) {
			String str = new String(SCommon.toPrimitiveCharArray(Stream
					.generate(() -> SCommon.cryptRandom.chooseOne(TEST_CHRS))
					.limit(SCommon.cryptRandom.getInt(1000)).toList()));

			byte[] src = str.getBytes(SCommon.CHARSET_ASCII);
			byte[] mid = SCommon.compress(src);
			byte[] dest = SCommon.decompress(mid);

			if (SCommon.compare(
					SCommon.toList(src),
					SCommon.toList(dest), (a, b) -> (a.byteValue() & 0xff) - (b.byteValue() & 0xff)) != 0) {
				throw null;
			}
		}
		System.out.println("OK!");
	}

	private void test02() {
		System.out.println("始" + SCommon.HALF + "終");

		// ----

		List<int[]> ranges = new ArrayList<int[]>();
		for (char chr : SCommon.HALF.toCharArray()) {
			ranges.add(new int[] { (int)chr, (int)chr });
		}
		ranges.sort((a, b) -> a[0] - b[0]);
		for (int index = 0; index + 1 < ranges.size(); index++) {
			if (ranges.get(index)[0] == ranges.get(index + 1)[0]) { // ? 同じ文字を含む
				throw null;
			}
		}
		for (int index = ranges.size() - 2; 0 <= index; index--) {
			if (ranges.get(index)[1] + 1 == ranges.get(index + 1)[0]) {
				ranges.get(index)[1] = ranges.get(index + 1)[1];
				ranges.remove(index + 1);
			}
		}
		for (int[] range : ranges) {
			System.out.println(String.format("%04x - %04x", range[0], range[1]));
		}
	}
}
