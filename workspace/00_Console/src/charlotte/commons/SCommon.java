package charlotte.commons;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.function.Consumer;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

/**
 * 共通機能・便利機能はできるだけこのクラスに集約する。
 * @author mt
 *
 */
public class SCommon {

	public static <T> T re(ThrowableSupplier<T> routine) {
		try {
			return routine.get();
		}
		catch (Throwable e) {
			throw new ErrorOrWarning(e);
		}
	}

	/**
	 * ディレクトリ内のディレクトリとファイルを検索する。
	 * @param targetDirectory 対象ディレクトリ
	 * @param allDirectories 配下のディレクトリ内も検索するか
	 * @return 発見したディレクトリとファイルの配列
	 */
	public static List<File> getFiles(File targetDirectory, boolean allDirectories) {
		final List<File> dest = new ArrayList<File>();
		searchDirectory(targetDirectory, allDirectories, f -> dest.add(f));
		return dest;
	}

	/**
	 * ディレクトリ内のディレクトリとファイルを検索する。
	 * @param targetDirectory 対象ディレクトリ
	 * @param allDirectories 配下のディレクトリ内も検索するか
	 * @param reaction 発見したディレクトリとファイルに対するリアクション
	 */
	public static void searchDirectory(File targetDirectory, boolean allDirectories, Consumer<File> reaction) {
		if (!targetDirectory.isDirectory()) {
			throw new Error();
		}

		Queue<File> q = new LinkedList<File>();
		q.add(targetDirectory);

		while (!q.isEmpty()) {
			for (File f : q.poll().listFiles()) {
				reaction.accept(f);

				if (allDirectories && f.isDirectory()) {
					q.add(f);
				}
			}
		}
	}

	// ****
	// **** PRIMITIVE[] -> List<PRIMITIVE> ここから
	// ****

	public static List<Boolean> toList(boolean[] arr) {
		List<Boolean> list = new ArrayList<Boolean>(arr.length);

		for (int index = 0; index < arr.length; index++) {
			list.add(arr[index]);
		}
		return list;
	}

	public static List<Byte> toList(byte[] arr) {
		List<Byte> list = new ArrayList<Byte>(arr.length);

		for (int index = 0; index < arr.length; index++) {
			list.add(arr[index]);
		}
		return list;
	}

	public static List<Character> toList(char[] arr) {
		List<Character> list = new ArrayList<Character>(arr.length);

		for (int index = 0; index < arr.length; index++) {
			list.add(arr[index]);
		}
		return list;
	}

	public static List<Short> toList(short[] arr) {
		List<Short> list = new ArrayList<Short>(arr.length);

		for (int index = 0; index < arr.length; index++) {
			list.add(arr[index]);
		}
		return list;
	}

	public static List<Integer> toList(int[] arr) {
		List<Integer> list = new ArrayList<Integer>(arr.length);

		for (int index = 0; index < arr.length; index++) {
			list.add(arr[index]);
		}
		return list;
	}

	public static List<Long> toList(long[] arr) {
		List<Long> list = new ArrayList<Long>(arr.length);

		for (int index = 0; index < arr.length; index++) {
			list.add(arr[index]);
		}
		return list;
	}

	public static List<Float> toList(float[] arr) {
		List<Float> list = new ArrayList<Float>(arr.length);

		for (int index = 0; index < arr.length; index++) {
			list.add(arr[index]);
		}
		return list;
	}

	public static List<Double> toList(double[] arr) {
		List<Double> list = new ArrayList<Double>(arr.length);

		for (int index = 0; index < arr.length; index++) {
			list.add(arr[index]);
		}
		return list;
	}

	// ****
	// **** PRIMITIVE[] -> List<PRIMITIVE> ここまで
	// ****

	// ****
	// **** List<PRIMITIVE> -> PRIMITIVE[] ここから
	// ****

	public static boolean[] toPrimitiveBooleanArray(List<Boolean> list) {
		boolean[] arr = new boolean[list.size()];

		for (int index = 0; index < list.size(); index++) {
			arr[index] = list.get(index);
		}
		return arr;
	}

	public static byte[] toPrimitiveByteArray(List<Byte> list) {
		byte[] arr = new byte[list.size()];

		for (int index = 0; index < list.size(); index++) {
			arr[index] = list.get(index);
		}
		return arr;
	}

	public static char[] toPrimitiveCharArray(List<Character> list) {
		char[] arr = new char[list.size()];

		for (int index = 0; index < list.size(); index++) {
			arr[index] = list.get(index);
		}
		return arr;
	}

	public static short[] toPrimitiveShortArray(List<Short> list) {
		short[] arr = new short[list.size()];

		for (int index = 0; index < list.size(); index++) {
			arr[index] = list.get(index);
		}
		return arr;
	}

	public static int[] toPrimitiveIntArray(List<Integer> list) {
		int[] arr = new int[list.size()];

		for (int index = 0; index < list.size(); index++) {
			arr[index] = list.get(index);
		}
		return arr;
	}

	public static long[] toPrimitiveLongArray(List<Long> list) {
		long[] arr = new long[list.size()];

		for (int index = 0; index < list.size(); index++) {
			arr[index] = list.get(index);
		}
		return arr;
	}

	public static float[] toPrimitiveFloatArray(List<Float> list) {
		float[] arr = new float[list.size()];

		for (int index = 0; index < list.size(); index++) {
			arr[index] = list.get(index);
		}
		return arr;
	}

	public static double[] toPrimitiveDoubleArray(List<Double> list) {
		double[] arr = new double[list.size()];

		for (int index = 0; index < list.size(); index++) {
			arr[index] = list.get(index);
		}
		return arr;
	}

	// ****
	// **** List<PRIMITIVE> -> PRIMITIVE[] ここまで
	// ****

	public static <T> void swap(List<T> list, int a, int b) {
		T tmp = list.get(a);
		list.set(a, list.get(b));
		list.set(b, tmp);
	}

	public static <T> T unaddElement(List<T> list) {
		return list.remove(list.size() - 1);
	}

	public static <T> T fastRemoveElement(List<T> list, int index) {
		T ret;

		if (index == list.size() - 1) {
			ret = unaddElement(list);
		}
		else {
			ret = list.get(index);
			list.set(index, unaddElement(list));
		}
		return ret;
	}

	public static RandomUnit cryptRandom = new RandomUnit(new SecureRandom());

	public static <T> int compare(List<T> a, List<T> b, Comparator<T> comp) {
		int count = Math.min(a.size(), b.size());

		for (int index = 0; index < count; index++) {
			int ret = comp.compare(a.get(index), b.get(index));

			if (ret != 0) {
				return ret;
			}
		}
		return a.size() - b.size();
	}

	public static int toRange(int value, int minval, int maxval) {
		value = Math.max(value, minval);
		value = Math.min(value, maxval);
		return value;
	}

	public static byte[] compress(byte[] src) {
		try (ByteArrayOutputStream mem = new ByteArrayOutputStream();
				GZIPOutputStream wrtier = new GZIPOutputStream(mem)
				) {
			wrtier.write(src);
			wrtier.finish();
			return mem.toByteArray();
		}
		catch (Throwable e) {
			throw new ErrorOrWarning(e);
		}
	}

	public static byte[] decompress(byte[] src) {
		try (ByteArrayInputStream mem = new ByteArrayInputStream(src);
				GZIPInputStream reader = new GZIPInputStream(mem);
				ByteArrayOutputStream writer = new ByteArrayOutputStream()
				) {
			byte[] buff = new byte[2 * 1024 * 1024];

			for (; ; ) {
				int size = reader.read(buff);

				if (size <= 0) {
					break;
				}
				writer.write(buff, 0, size);
			}
			return writer.toByteArray();
		}
		catch (Throwable e) {
			throw new ErrorOrWarning(e);
		}
	}

	public static final String CHARSET_ASCII = "US-ASCII";
	public static final String CHARSET_SJIS = "MS932";
	public static final String CHARSET_UTF8 = "UTF-8";

	public static final String BINADECIMAL = "01";
	public static final String OCTODECIMAL = "012234567";
	public static final String DECIMAL = "0123456789";
	public static final String HEXADECIMAL = "0123456789ABCDEF";
	public static final String hexadecimal = "0123456789abcdef";

	public static final String ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	public static final String alpha = "abcdefghijklmnopqrstuvwxyz";
	public static final String PUNCT =
			getStringSJISHalfCodeRange(0x21, 0x2f) +
			getStringSJISHalfCodeRange(0x3a, 0x40) +
			getStringSJISHalfCodeRange(0x5b, 0x60) +
			getStringSJISHalfCodeRange(0x7b, 0x7e);

	public static final String ASCII = DECIMAL + ALPHA + alpha + PUNCT; // (0x21, 0x7e) -- 空白(0x20)を含まないことに注意
	public static final String KANA =
			getStringSJISHalfCodeRange(0xa1, 0xdf);

	public static final String HALF = ASCII + KANA; // 空白(0x20)を含まないことに注意

	private static String getStringSJISHalfCodeRange(int codeMin, int codeMax) {
		byte[] buff = new byte[codeMax - codeMin + 1];

		for (int code = codeMin; code <= codeMax; code++) {
			buff[code - codeMin] = (byte)code;
		}
		return SCommon.re(() -> new String(buff, CHARSET_SJIS));
	}

	public static void writeAllBytes(String file, byte[] data) {
		try (FileOutputStream writer = new FileOutputStream(file)) {
			writer.write(data);
		}
		catch (Throwable e) {
			throw new ErrorOrWarning(e);
		}
	}

	public static void writeAllText(String file, String text, String charset) {
		writeAllBytes(file, SCommon.re(() -> text.getBytes(charset)));
	}

	public static void writeAllLines(String file, List<String> lines, String charset) {
		writeAllText(file, linesToText(lines), charset);
	}

	public static String linesToText(List<String> lines) {
		return lines.size() == 0 ? "" : String.join("\r\n", lines) + "\r\n";
	}

	public static List<String> textToLines(String text) {
		text = text.replace("\r", "");

		List<String> lines = tokenize(text, "\n");

		if(1 <= lines.size() && lines.get(lines.size() - 1).isEmpty()) {
			lines.remove(lines.size() - 1);
		}
		return lines;
	}

	public static List<String> tokenize(String text, String delimiters) {
		List<String> dest = new ArrayList<String>();
		int start = 0;

		for (; ; ) {
			int end = indexOfDelimiters(text, delimiters, start);

			if (end == -1) {
				dest.add(text.substring(start));
				break;
			}
			dest.add(text.substring(start, end));
			start = end + 1;
		}
		return dest;
	}

	public static int indexOfDelimiters(String str, String delimiters, int fromIndex) {
		char[] delimiterArray = delimiters.toCharArray();

		for (int index = fromIndex; index < str.length(); index++) {
			char chr = str.charAt(index);

			for (char delimiter : delimiterArray) {
				if (chr == delimiter) {
					return index;
				}
			}
		}
		return -1;
	}
}
