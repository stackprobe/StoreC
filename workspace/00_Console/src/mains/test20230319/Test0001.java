package mains.test20230319;

public class Test0001 {
	public static void main(String[] args) {
		try {
			//test01(new GameInfo(22, 2));
			//test01(new GameInfo(33, 3));

			test01(new GameInfo(10, 2));
			//test01(new GameInfo(15, 3));
		}
		catch (Throwable e) {
			e.printStackTrace();
		}
	}

	private static class GameInfo {
		public int tableSize;
		public int coinSize;

		public boolean[][] cells;

		public GameInfo(int tableSize, int coinSize) {
			this.tableSize = tableSize;
			this.coinSize = coinSize;

			this.cells = new boolean[tableSize][tableSize];
		}

		public boolean isCoinPuttable(int l, int t) {
			for (int x = 0; x < coinSize; x++) {
				for (int y = 0; y < coinSize; y++) {
					if (this.cells[l + x][t + y]) {
						return false;
					}
				}
			}
			return true;
		}

		public void putCoin(int l, int t) {
			for (int x = 0; x < coinSize; x++) {
				for (int y = 0; y < coinSize; y++) {
					this.cells[l + x][t + y] = true;
				}
			}
		}

		public void removeCoin(int l, int t) {
			for (int x = 0; x < coinSize; x++) {
				for (int y = 0; y < coinSize; y++) {
					this.cells[l + x][t + y] = false;
				}
			}
		}
	}

	private static void test01(GameInfo g) {
		int xyMax = (g.tableSize - g.coinSize) / 2; // コインを中央に置くときの座標と同じはず..

		for (int x = 0; x <= xyMax; x++) {
			for (int y = 0; y <= x; y++) {
				g.putCoin(x, y);

				System.out.print(String.format("%d, %d, %d, %d --> ", g.tableSize, g.coinSize, x, y));
				if (isWin(g, 0)) {
					System.out.println(String.format("CERTAINLY WIN %d, %d", firstCoinX, firstCoinY));
				}
				else {
					System.out.println("CERTAINLY LOSE");
				}

				g.removeCoin(x, y);
			}
		}
	}

	private static int firstCoinX;
	private static int firstCoinY;

	private static boolean isWin(GameInfo g, int depth) {
		for (int x = 0; x + g.coinSize <= g.tableSize; x++) {
			for (int y = 0; y + g.coinSize <= g.tableSize; y++) {
				if (g.isCoinPuttable(x, y)) {
					g.putCoin(x, y);
					boolean win = isWin(g, depth + 1);
					g.removeCoin(x, y);

					// 相手が負けるなら、自分の勝ち確定
					if (!win) {
						if (depth == 0) {
							firstCoinX = x;
							firstCoinY = y;
						}
						return true;
					}
				}
			}
		}

		// コインを置けない or 勝ち筋が無い -> 自分の負け確定
		return false;
	}
}
