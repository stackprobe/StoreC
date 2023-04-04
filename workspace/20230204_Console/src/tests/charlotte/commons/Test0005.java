package tests.charlotte.commons;

import java.util.stream.Collectors;

import charlotte.commons.SCommon;

public class Test0005 {
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
		final int TEST_COUNT = 3000000;
		final int GAME_MAX = 100;
		final double WIN_RATE = 0.5;

		int[] winners = new int[GAME_MAX + 1];
		int[] winVals = new int[GAME_MAX + 1];

		for (int testCnt = 0; testCnt < TEST_COUNT; testCnt++) {
			if (testCnt % (TEST_COUNT / 100) == 0) { System.out.println(testCnt); } // cout

			int lose = 0;
			int game = 0;

			while (game < GAME_MAX) {
				lose += SCommon.cryptRandom.getReal1() < WIN_RATE ? -1 : 1;
				game++;

				if (lose < 0) {
					break;
				}
			}
			if (lose < 0) {
				winners[game]++;
			}
			else {
				winVals[lose]++;
			}
		}

		SCommon.writeAllLines(
				"C:/temp/winners.csv",
				SCommon.toList(winners).stream().map(v -> "" + v).collect(Collectors.toList()),
				SCommon.CHARSET_ASCII
				);

		SCommon.writeAllLines(
				"C:/temp/winVals.csv",
				SCommon.toList(winVals).stream().map(v -> "" + v).collect(Collectors.toList()),
				SCommon.CHARSET_ASCII
				);
	}

	private static void test02() {
		test02_b();
		test02_b();
		test02_b();
		test02_b();
		test02_b();
	}

	private static void test02_b() {
		double wrL = 0.0;
		double wrR = 1.0;

		for (int c = 0; c < 30; c++) {
			double wr = (wrL + wrR) / 2.0;

			if (test02_c(wr)) {
				wrR = wr;
			}
			else {
				wrL = wr;
			}
		}

		{
			double wr = (wrL + wrR) / 2.0;

			System.out.println(String.format("%.9f", wr));
		}
	}

	private static boolean test02_c(double winRate) {
		final int GAME_MAX = 100;
		//final int GAME_MAX = 300;
		//final int GAME_MAX = 1000;
		//final int GAME_MAX = 3000;

		final int TEST_COUNT = 3000000 / GAME_MAX;

		for (int testCnt = 0; testCnt < TEST_COUNT; testCnt++) {
			int lose = 0;
			int game = 0;

			while (game < GAME_MAX) {
				lose += SCommon.cryptRandom.getReal1() < winRate ? -1 : 1;
				game++;

				if (lose < 0) {
					break;
				}
			}
			if (lose < 0) {
				// noop
			}
			else {
				return false;
			}
		}
		return true;
	}
}
