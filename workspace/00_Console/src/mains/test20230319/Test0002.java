package mains.test20230319;

public class Test0002 {
	public static void main(String[] args) {
		try {
			test01();
		}
		catch (Throwable e) {
			e.printStackTrace();
		}
	}

	private static class GameInfo {
		public int tableSize;
		public int coinSize;

		public boolean[] cells;

		public GameInfo(int tableSize, int coinSize) {
			this.tableSize = tableSize;
			this.coinSize = coinSize;

			this.cells = new boolean[tableSize];
		}

		public boolean isCoinPuttable(int p) {
			for (int i = 0; i < coinSize; i++) {
				if (this.cells[p + i]) {
					return false;
				}
			}
			return true;
		}

		public void putCoin(int p) {
			for (int i = 0; i < coinSize; i++) {
				this.cells[p + i] = true;
			}
		}

		public void removeCoin(int p) {
			for (int i = 0; i < coinSize; i++) {
				this.cells[p + i] = false;
			}
		}
	}

	private static void test01() {
		for (int ts = 2; ts <= 25; ts++) {
			for (int cs = 2; cs <= Math.min(ts, 5); cs++) {
				test02(new GameInfo(ts, cs));
			}
		}
	}

	private static void test02(GameInfo g) {
		int xyMax = (g.tableSize - g.coinSize) / 2; // コインを中央に置くときの座標と同じはず..

		for (int i = 0; i <= xyMax; i++) {
			g.putCoin(i);

			System.out.print(String.format("%d, %d, %d ", g.tableSize, g.coinSize, i));
			if (isWin(g, 0)) {
				System.out.println(String.format("CERTAINLY WIN %d", firstCoinPos));
			}
			else {
				System.out.println("CERTAINLY LOSE");
			}

			g.removeCoin(i);
		}
	}

	private static int firstCoinPos;

	private static boolean isWin(GameInfo g, int depth) {
		for (int i = 0; i + g.coinSize <= g.tableSize; i++) {
			if (g.isCoinPuttable(i)) {
				g.putCoin(i);
				boolean win = isWin(g, depth + 1);
				g.removeCoin(i);

				// 相手が負けるなら、自分の勝ち確定
				if (!win) {
					if (depth == 0) {
						firstCoinPos = i;
					}
					return true;
				}
			}
		}

		// コインを置けない or 勝ち筋が無い -> 自分の負け確定
		return false;
	}
}
