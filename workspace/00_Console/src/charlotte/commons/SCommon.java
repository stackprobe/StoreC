package charlotte.commons;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.function.BiConsumer;
import java.util.function.BiFunction;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
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

	public static <T> T refElement(List<T> list, int index, T defval) {
		if (index < list.size()) {
			return list.get(index);
		}
		else {
			return defval;
		}
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

	public static final String DECIMAL = "0123456789";
	public static final String HEXADECIMAL_UPPER = "0123456789ABCDEF";
	public static final String HEXADECIMAL_LOWER = "0123456789abcdef";

	public static final String ALPHA_UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	public static final String ALPHA_LOWER = "abcdefghijklmnopqrstuvwxyz";

	public static final String ASCII =
			getStringSJISHalfCodeRange(0x21, 0x7e); // 空白(0x20)を含まないことに注意
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
			int end = nextDelimiterIndex(text, delimiters, start);

			if (end == -1) {
				dest.add(text.substring(start));
				break;
			}
			dest.add(text.substring(start, end));
			start = end + 1;
		}
		return dest;
	}

	private static int nextDelimiterIndex(String str, String delimiters, int fromIndex) {
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

	public static int compare(byte a, byte b) {
		return (int)a - (int)b;
	}

	public static int compare(byte[] a, byte[] b) {
		int count = a.length - b.length;

		for (int index = 0; index < count; index++) {
			int ret = (int)a[index] - (int)b[index];

			if (ret != 0) {
				return ret;
			}
		}
		return a.length - b.length;
	}

	public static byte[] intToBytes(int value) {
		return new byte[] {
				(byte)(value & 0xff),
				(byte)((value >>> 8) & 0xff),
				(byte)((value >>> 16) & 0xff),
				(byte)((value >>> 24) & 0xff),
		};
	}

	public static int toInt(byte[] src) {
		return toInt(src, 0);
	}

	public static int toInt(byte[] src, int index) {
		return (src[index] & 0xff) |
				((src[index + 1] & 0xff) << 8) |
				((src[index + 2] & 0xff) << 16) |
				((src[index + 3] & 0xff) << 24);
	}

	public static byte[] longToBytes(long value) {
		return new byte[] {
				(byte)(value & 0xffL),
				(byte)((value >>> 8) & 0xffL),
				(byte)((value >>> 16) & 0xffL),
				(byte)((value >>> 24) & 0xffL),
				(byte)((value >>> 32) & 0xffL),
				(byte)((value >>> 40) & 0xffL),
				(byte)((value >>> 48) & 0xffL),
				(byte)((value >>> 56) & 0xffL),
		};
	}

	public static long toLong(byte[] src) {
		return toLong(src, 0);
	}

	public static long toLong(byte[] src, int index) {
		return (src[index] & 0xffL) |
				((src[index + 1] & 0xffL) << 8) |
				((src[index + 2] & 0xffL) << 16) |
				((src[index + 3] & 0xffL) << 24) |
				((src[index + 4] & 0xffL) << 32) |
				((src[index + 5] & 0xffL) << 40) |
				((src[index + 6] & 0xffL) << 48) |
				((src[index + 7] & 0xffL) << 56);
	}

	public static byte[] join(List<byte[]> src) {
		int count = 0;

		for (byte[] block : src) {
			count += block.length;
		}
		byte[] dest = new byte[count];
		int offset = 0;

		for (byte[] block : src) {
			System.arraycopy(block, 0, dest, offset, block.length);
			offset += block.length;
		}
		return dest;
	}

	public static byte[] splittableJoin(List<byte[]> src) {
		int count = 0;

		for (byte[] block : src) {
			count += 4 + block.length;
		}
		byte[] dest = new byte[count];
		int offset = 0;

		for (byte[] block : src) {
			System.arraycopy(intToBytes(block.length), 0, dest, offset, 4);
			offset += 4;
			System.arraycopy(block, 0, dest, offset, block.length);
			offset += block.length;
		}
		return dest;
	}

	public static byte[][] split(byte[] src) {
		List<byte[]> dest = new ArrayList<byte[]>();

		for (int offset = 0; offset < src.length; ) {
			int size = toInt(src, offset);
			offset += 4;
			dest.add(Arrays.copyOfRange(src, offset, offset + size));
			offset += size;
		}
		return dest.toArray(new byte[dest.size()][]);
	}

	public static <T> Map<String, T> createMap() {
		return new TreeMap<String, T>((a, b) -> a.compareTo(b));
	}

	public static <T> Map<String, T> createMapIgnoreCase() {
		return new TreeMap<String, T>((a, b) -> a.compareToIgnoreCase(b));
	}

	public static Set<String> createSet() {
		return new TreeSet<String>((a, b)-> a.compareTo(b));
	}

	public static Set<String> createSetIgnoreCase() {
		return new TreeSet<String>((a, b)-> a.compareToIgnoreCase(b));
	}

	/**
	 * 整数の上限として慣習的に決めた値
	 * 10^9
	 */
	public static final int IMAX = 1000000000;

	/**
	 * 64ビット整数の上限として慣習的に決めた値
	 * 10^18
	 */
	public static final long IMAX_64 = 1000000000000000000L;

	/**
	 * とても小さい正数として慣習的に決めた値
	 */
	public static final double MICRO = 1.0 / IMAX;

	/**
	 * 空のバイト列
	 */
	public static final byte[] EMPTY_BYTES = new byte[0];

	/**
	 * 空の文字列の配列
	 */
	public static final String[] EMPTY_STRINGS = new String[0];

	private static void checkNaN(double value) {
		if (Double.isNaN(value)) {
			throw new RuntimeException("NaN");
		}
		if (Double.isInfinite(value)) {
			throw new RuntimeException("Infinity");
		}
	}

	public static double toRange(double value, double minval, double maxval) {
		checkNaN(value);
		return Math.max(minval, Math.min(maxval, value));
	}

	public static int toInt(double value) {
		checkNaN(value);
		if (value < 0.0) {
			return (int)(value - 0.5);
		}
		else {
			return (int)(value + 0.5);
		}
	}

	public static long toLong(double value) {
		checkNaN(value);
		if (value < 0.0) {
			return (long)(value - 0.5);
		}
		else {
			return (long)(value + 0.5);
		}
	}

	public static void deletePath(File fileOrDir) {
		if (fileOrDir.isDirectory()) {
			directoryCleanup(fileOrDir);
		}
		fileOrDir.delete();
	}

	private static void directoryCleanup(File dir) {
		for (File f : dir.listFiles()) {
			deletePath(f);
		}
	}

	public static void createDir(File dir) {
		dir.mkdirs();
	}

	public static void copyDir(File rDir, File wDir) {
		if (rDir == null) {
			throw new RuntimeException("Bad rDir");
		}
		if (!rDir.isDirectory()) {
			throw new RuntimeException("no rDir");
		}
		if (wDir == null) {
			throw new RuntimeException("Bad wDir");
		}

		createDir(wDir);

		for (File rf : rDir.listFiles()) {
			File wf = new File(wDir, rf.getName());
			if (rf.isDirectory()) {
				copyDir(rf, wf);
			}
			else {
				re(() -> Files.copy(rf.toPath(), wf.toPath()));
			}
		}
	}

	public static void copyPath(File rPath, File wPath) {
		if (rPath.isDirectory()) {
			copyDir(rPath, wPath);
		}
		else if (rPath.isFile()) {
			re(() -> Files.copy(rPath.toPath(), wPath.toPath()));
		}
		else {
			throw new RuntimeException("no rPath");
		}
	}

	public static int compare(int a, int b) {
		if (a < b) {
			return -1;
		}
		if (a > b) {
			return 1;
		}
		return 0;
	}

	public static int compare(long a, long b) {
		if (a < b) {
			return -1;
		}
		if (a > b) {
			return 1;
		}
		return 0;
	}

	public static int compare(double a, double b) {
		if (a < b) {
			return -1;
		}
		if (a > b) {
			return 1;
		}
		return 0;
	}

	public static int toRange(int value, int minval, int maxval) {
		return Math.max(minval, Math.min(maxval, value));
	}

	public static long toRange(long value, long minval, long maxval) {
		return Math.max(minval, Math.min(maxval, value));
	}

	public static boolean isRange(int value, int minval, int maxval) {
		return minval <= value && value <= maxval;
	}

	public static boolean isRange(long value, long minval, long maxval) {
		return minval <= value && value <= maxval;
	}

	public static boolean isRange(double value, double minval, double maxval) {
		return minval <= value && value <= maxval;
	}

	public static int toInt(String str, int minval, int maxval, int defval) {
		try {
			int value = Integer.parseInt(str);

			if (value < minval || maxval < value) {
				throw new Exception("Value out of range");
			}
			return value;
		}
		catch (Throwable e) {
			return defval;
		}
	}

	public static long toLong(String str, long minval, long maxval, long defval) {
		try {
			int value = Integer.parseInt(str);

			if (value < minval || maxval < value) {
				throw new Exception("Value out of range");
			}
			return value;
		}
		catch (Throwable e) {
			return defval;
		}
	}

	public static byte[] getSHA512(byte[] src) {
		return re(() -> MessageDigest.getInstance("SHA-512").digest(src));
	}

	public static byte[] getSHA512(List<byte[]> src) {
		return re(() -> {
			MessageDigest md = MessageDigest.getInstance("SHA-512");
			for (byte[] block : src) {
				md.update(block);
			}
			return md.digest();
		});
	}

	public static byte[] getSHA512(File file) {
		try (FileInputStream reader = new FileInputStream(file)) {
			byte[] buff = new byte[16 * 1024];

			MessageDigest md = MessageDigest.getInstance("SHA-512");

			for (; ; ) {
				int readSize = reader.read(buff);
				if (readSize == -1) {
					break;
				}
				md.update(buff, 0, readSize);
			}
			return md.digest();
		}
		catch (Throwable e) {
			throw new ErrorOrWarning(e);
		}
	}

	public static class Hex {

		public static String toString(byte[] src) {
			StringBuffer buff = new StringBuffer(src.length * 2);

			for (byte chr : src) {
				buff.append(String.format("%02x", chr));
			}
			return buff.toString();
		}

		public static byte[] toBytes(String src) {
			if (src.length() % 2 != 0) {
				throw new IllegalArgumentException("Bad Length");
			}

			byte[] dest = new byte[src.length() / 2];

			for (int index = 0; index < dest.length; index++) {
				int hi = to4Bit(src.charAt(index * 2 + 0));
				int lw = to4Bit(src.charAt(index * 2 + 1));

				dest[index] = (byte)((hi << 4) | lw);
			}
			return dest;
		}

		private static int to4Bit(char chr) {
			int ret = HEXADECIMAL_LOWER.indexOf(Character.toLowerCase(chr));
			if (ret == -1) {
				throw new IllegalArgumentException("Bad chr");
			}
			return ret;
		}
	}

	public static <T> boolean hasSameComp(List<T> list, Comparator<T> comp) {
		return hasSame(list, (a, b) -> comp.compare(a, b) == 0);
	}

	public static <T> boolean hasSame(List<T> list, BiFunction<T, T, Boolean> match) {
		for (int r = 1; r < list.size(); r++) {
			for (int l = 0; l < r; l++) {
				if (match.apply(list.get(l), list.get(r)).booleanValue()) {
					return true;
				}
			}
		}
		return false;
	}

	public static <T> void forEachPair(List<T> list, BiConsumer<T, T> routine) {
		for (int r = 1; r < list.size(); r++) {
			for (int l = 0; l < r; l++) {
				routine.accept(list.get(l), list.get(r));
			}
		}
	}

	public static String[] parseIsland(String text, String singleTag) {
		return parseIsland(text, singleTag, false);
	}

	public static String[] parseIsland(String text, String singleTag, boolean ignoreCase) {
		int start ;
		if (ignoreCase) {
			start = text.toLowerCase().indexOf(singleTag.toLowerCase());
		}
		else {
			start = text.indexOf(singleTag);
		}
		if (start == -1) {
			return null;
		}
		int end = start + singleTag.length();
		return new String[] {
				text.substring(0, start),
				text.substring(start, end),
				text.substring(end),
		};
	}

	public static String[] parseEnclosed(String text, String openTag, String closeTag) {
		return parseEnclosed(text, openTag, closeTag, false);
	}

	public static String[] parseEnclosed(String text, String openTag, String closeTag, boolean ignoreCase) {
		String[] starts = parseIsland(text, openTag, ignoreCase);
		if (starts == null) {
			return null;
		}
		String[] ends = parseIsland(starts[2], closeTag, ignoreCase);
		if (ends == null) {
			return null;
		}
		return new String[] {
				starts[0],
				starts[1],
				ends[0],
				ends[1],
				ends[2],
		};
	}

	public static class Serializer {
		// TODO
	}

	public static class Base64 {
		// TODO
	}

	public static class TimeStampToSec {
		// TODO
	}

	public static class SimpleDateTime {
		// TODO
	}

	/**
	 * マージする。
	 * @param <T> 任意の型
	 * @param list1 左リスト 勝手にソートすることに注意
	 * @param list2 右リスト 勝手にソートすることに注意
	 * @param comp 要素の比較クラス
	 * @param only1 出力先 左リストのみ存在
	 * @param both1 出力先 両方に存在 左リストの要素を追加
	 * @param both2 出力先 両方に存在 右リストの要素を追加
	 * @param only2 出力先 右リストのみ存在
	 */
	public static <T> void merge(
			List<T> list1, List<T> list2, Comparator<T> comp,
			List<T> only1, List<T> both1, List<T> both2, List<T> only2) {

		list1.sort(comp);
		list2.sort(comp);

		int index1 = 0;
		int index2 = 0;

		while (index1 < list1.size() && index2 < list2.size()) {
			int ret = comp.compare(list1.get(index1), list2.get(index2));
			if (ret < 0) {
				only1.add(list1.get(index1++));
			}
			else if (0 < ret) {
				only2.add(list2.get(index2++));
			}
			else {
				both1.add(list1.get(index1++));
				both2.add(list2.get(index2++));
			}
		}
		while (index1 < list1.size()) {
			only1.add(list1.get(index1++));
		}
		while (index2 < list2.size()) {
			only2.add(list2.get(index2++));
		}
	}

	/**
	 * バイナリサーチによって要素を特定する。
	 * 自動的にソートしない。
	 * 比較メソッド
	 * -- 少なくとも以下のとおりの比較結果となること。
	 * ---- 目的位置の左側の要素 &lt; 目的位置の要素
	 * ---- 目的位置の左側の要素 &lt; 目的位置の右側の要素
	 * ---- 目的位置の要素 == 目的位置の要素
	 * ---- 目的位置の要素 &lt; 目的位置の右側の要素
	 * @param <T> 任意の型
	 * @param list 検索対象のリスト
	 * @param targetValue 目的の値
	 * @param comp　比較クラス
	 * @return 目的位置 見つからない場合(-1)
	 */
	public static <T> int getIndex(List<T> list, T targetValue, Comparator<T> comp) {
		return getIndex(list, element -> comp.compare(element, targetValue));
	}

	/**
	 * バイナリサーチによって要素を特定する。
	 * 自動的にソートしない。
	 * 判定メソッド
	 * -- 目的位置の左側の要素であれば負の値を返す。
	 * -- 目的位置の右側の要素であれば正の値を返す。
	 * -- 目的位置の要素であれば 0 を返す。
	 * @param <T> 任意の型
	 * @param list 検索対象のリスト
	 * @param comp 判定メソッド
	 * @return 目的位置 見つからない場合(-1)
	 */
	public static <T> int getIndex(List<T> list, Function<T, Integer> comp) {
		int l = -1;
		int r = list.size();

		while (l + 1 < r) {
			int m = (l + r) / 2;
			int ret = comp.apply(list.get(m)).intValue();

			if (ret < 0) {
				l = m;
			}
			else if (0 < ret) {
				r = m;
			}
			else {
				return m;
			}
		}
		return -1; // not found
	}

	/**
	 * バイナリサーチによって範囲を特定する。
	 * 自動的にソートしない。
	 * 比較メソッド
	 * -- 少なくとも以下のとおりの比較結果となること。
	 * ---- 範囲の左側の要素 &lt; 範囲内の要素
	 * ---- 範囲の左側の要素 &lt; 範囲の右側の要素
	 * ---- 範囲の要素 == 範囲内の要素
	 * ---- 範囲の要素 &lt; 範囲の右側の要素
	 * 範囲
	 * -- new int[] { l, r }
	 * ---- l == 範囲の開始位置の一つ前の位置_リストの最初の要素が範囲内である場合 -1 となる。
	 * ---- r == 範囲の終了位置の一つ後の位置_リストの最後の要素が範囲内である場合 list.size() となる。
	 * @param <T> 任意の型
	 * @param list 検索対象のリスト
	 * @param targetValue 範囲内の値
	 * @param comp　比較クラス
	 * @return 範囲
	 */
	public static <T> int[] getRange(List<T> list, T targetValue, Comparator<T> comp) {
		return getRange(list, element -> comp.compare(element, targetValue));
	}

	/**
	 * バイナリサーチによって要素を特定する。
	 * 自動的にソートしない。
	 * 判定メソッド
	 * -- 範囲の左側の要素であれば負の値を返す。
	 * -- 範囲の右側の要素であれば正の値を返す。
	 * -- 範囲内の要素であれば 0 を返す。
	 * 範囲
	 * -- new int[] { l, r }
	 * ---- l == 範囲の開始位置の一つ前の位置_リストの最初の要素が範囲内である場合 -1 となる。
	 * ---- r == 範囲の終了位置の一つ後の位置_リストの最後の要素が範囲内である場合 list.size() となる。
	 * @param <T> 任意の型
	 * @param list 検索対象のリスト
	 * @param comp 判定メソッド
	 * @return 範囲
	 */
	public static <T> int[] getRange(List<T> list, Function<T, Integer> comp) {
		int l = -1;
		int r = list.size();

		while (l + 1 < r) {
			int m = (l + r) / 2;
			int ret = comp.apply(list.get(m)).intValue();

			if (ret < 0) {
				l = m;
			}
			else if (0 < ret) {
				r = m;
			}
			else {
				l = getLeft(list, l, m, element -> comp.apply(element).intValue() < 0);
				r = getLeft(list, m, r, element -> comp.apply(element).intValue() == 0) + 1;
				break;
			}
		}
		return new int[] { l, r };
	}

	private static <T> int getLeft(List<T> list, int l, int r, Predicate<T> isLeft) {
		while (l + 1 < r) {
			int m = (l + r) / 2;
			boolean ret = isLeft.test(list.get(m));

			if (ret) {
				l = m;
			}
			else {
				r = m;
			}
		}
		return l;
	}

	public static Throwable toThrow(ThrowableRunnable routine) {
		try {
			routine.run();
		}
		catch (Throwable e) {
			return e;
		}
		throw new RuntimeException("not throw");
	}

	public static void toThrowPrint(ThrowableRunnable routine) {
		System.out.println("thrown: " + toThrow(routine).getMessage());
	}
}
