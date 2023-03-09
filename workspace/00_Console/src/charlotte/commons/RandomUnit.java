package charlotte.commons;

import java.util.List;
import java.util.Random;

public class RandomUnit {
	private Random r;

	public RandomUnit(Random r) {
		this.r = r;
	}

	public void read(byte[] buff) {
		r.nextBytes(buff);
	}

	public byte[] getBytes(int size) {
		byte[] buff = new byte[size];
		read(buff);
		return buff;
	}

	public byte getByte() {
		return getBytes(1)[0];
	}

	public int getInt() {
		byte[] data = getBytes(4);
		int returnValue =
				((data[0] & 0xff) <<  0) |
				((data[1] & 0xff) <<  8) |
				((data[2] & 0xff) << 16) |
				((data[3] & 0xff) << 24);
		return returnValue;
	}

	public int getPositiveInt() {
		return getInt() & 0x7fffffff;
	}

	public long getLong() {
		byte[] data = getBytes(8);
		long returnValue =
				((data[0] & 0xffL) <<  0) |
				((data[1] & 0xffL) <<  8) |
				((data[2] & 0xffL) << 16) |
				((data[3] & 0xffL) << 24) |
				((data[4] & 0xffL) << 32) |
				((data[5] & 0xffL) << 40) |
				((data[6] & 0xffL) << 48) |
				((data[7] & 0xffL) << 56);
		return returnValue;
	}

	public long getPositiveLong() {
		return getLong() & 0x7fffffffffffffffL;
	}

	public int getInt(int modulo) {
		if (modulo < 1) {
			throw new Error();
		}
		return (int)(getPositiveLong() % (long)modulo);
	}

	public int getRange(int minval, int maxval) {
		return getInt(maxval - minval + 1) + minval;
	}

	/**
	 * 真偽値を返す。
	 * @return 真偽値
	 */
	public boolean getBoolean() {
		return getInt(2) == 1;
	}

	/**
	 * -1 または 1 をランダムに返す。
	 * @return -1 または 1
	 */
	public int getSign() {
		return getInt(2) * 2 - 1;
	}

	/**
	 * 0.0 ～ 1.0 の乱数を返す。
	 * @return 乱数
	 */
	public double getReal1() {
		return (double)getPositiveInt() / Integer.MAX_VALUE;
	}

	/**
	 * -1.0 ～ 1.0 の乱数を返す。
	 * @return 乱数
	 */
	public double getReal2() {
		return getReal1() * 2.0 - 1.0;
	}

	/**
	 * minval ～ maxval の乱数を返す。
	 * @param minval 最小値
	 * @param maxval 最大値
	 * @return 乱数
	 */
	public double getReal3(double minval, double maxval) {
		return getReal1() * (maxval - minval) + minval;
	}

	public <T> T chooseOne(List<T> list) {
		return list.get(getInt(list.size()));
	}

	public <T> void shuffle(List<T> list) {
		for (int index = list.size(); 1 < index; index--) {
			SCommon.swap(list, getInt(index), index - 1);
		}
	}
}
