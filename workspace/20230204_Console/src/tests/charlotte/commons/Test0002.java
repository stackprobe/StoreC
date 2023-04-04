package tests.charlotte.commons;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.IntStream;

import charlotte.commons.SCommon;

public class Test0002 {
	public static void main(String[] args) {
		try {
			new Test0002().test01();
		}
		catch (Throwable e) {
			e.printStackTrace();
		}
	}

	private void test01() {
		createDb();

		// ----

		//int[] memNoList = IntStream.range(0, 100).toArray();
		String[] memNoList = IntStream.range(0, 100).mapToObj(v -> String.format("%02d", v)).toArray(String[]::new);

		SCommon.cryptRandom.shuffle(Arrays.asList(memNoList));

		var tableMemNos = new HashMap<String, List<String>>();

		for (String memNo : memNoList) {
			String table = "" + (Integer.parseInt(memNo) / 10);

			List<String> memNos = tableMemNos.get(table);

			if (memNos == null) {
				memNos = new ArrayList<String>();
				tableMemNos.put(table, memNos);
			}
			memNos.add(memNo);
		}

		for (String table : tableMemNos.keySet()) {
			System.out.println(table + " --->");

			for (String memNo : tableMemNos.get(table)) {
				System.out.println("\t" + memNo);
			}
		}

		// ----

		memNoList = IntStream.range(0, 100)
				.mapToObj(v -> String.format("%02d", SCommon.cryptRandom.getInt(100))).toArray(String[]::new);

		// -- cout
		//Stream.of(memNoList).forEach(v -> System.out.println("[xx] " + v));
		final var f_memNoList = memNoList;
		IntStream.range(0, memNoList.length).forEach(v -> System.out.println("[" + v + "] " + f_memNoList[v]));
		// --

		var memNoToDestPositions = new HashMap<String, List<Integer>>();

		for (int index = 0; index < memNoList.length; index++) {
			String memNo = memNoList[index];

			List<Integer> destPositions = memNoToDestPositions.get(memNo);

			if (destPositions == null) {
				destPositions = new ArrayList<Integer>();
				memNoToDestPositions.put(memNo, destPositions);
			}
			destPositions.add(index);
		}

		for (String memNo : memNoToDestPositions.keySet()) {
			System.out.println(memNo + " --->");

			for (int destPosition : memNoToDestPositions.get(memNo)) {
				System.out.println("\t" + destPosition);
			}
		}

		// ----
	}

	private class ContInf {
		public int memNo;
		public int level;
		public int relYm;
	}

	private class LessStdyRcd {
		public int memNo;
		public int level;
		public int stdyNum;
		public int lessNum;
		public int cortNum;
		public int quesNum;
	}

	private List<ContInf> contInfs;
	private List<List<LessStdyRcd>> lessStdyRcdsList;

	private void createDb() {
		contInfs = new ArrayList<ContInf>();
		lessStdyRcdsList = new ArrayList<List<LessStdyRcd>>();

		for (int t = 0; t < 10; t++) {
			lessStdyRcdsList.add(new ArrayList<LessStdyRcd>());

			for (int u = 0; u < 10; u++) {
				int memNo = t * 10 + u;

				for (int level = 0; level < 100; level++) {
					if (SCommon.cryptRandom.getInt(30) == 0) {
						ContInf contInf = new ContInf();
						contInf.memNo = memNo;
						contInf.level = level;
						contInf.relYm =
								SCommon.cryptRandom.getRange(1900, 2100) * 100 +
								SCommon.cryptRandom.getRange(1, 12);
						contInfs.add(contInf);

						int lessNum = SCommon.cryptRandom.getRange(1, 99);
						int quesNum = SCommon.cryptRandom.getRange(1, 99);

						LessStdyRcd lessStdyRcd = new LessStdyRcd();
						lessStdyRcd.memNo = memNo;
						lessStdyRcd.level = level;
						lessStdyRcd.stdyNum = SCommon.cryptRandom.getRange(0, lessNum);
						lessStdyRcd.lessNum = lessNum;
						lessStdyRcd.cortNum = SCommon.cryptRandom.getRange(0, quesNum);
						lessStdyRcd.quesNum = quesNum;
						lessStdyRcdsList.get(lessStdyRcdsList.size() - 1).add(lessStdyRcd);
					}
				}
			}
		}
	}
}
