using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0003
	{
		public void Test01()
		{
			Test01_a(0, 0, 0); // 長さゼロ

			foreach (int a in new int[] { 1, 2, 3, 4, 5, 10, 30, 100, 300, 1000 })
			{
				foreach (int b in new int[] { 1, 2, 3, 4, 5, 10, 30, 100, 300, 1000 })
				{
					Console.WriteLine(a + ", " + b);

					for (int testCnt = 0; testCnt < 1000; testCnt++)
					{
						Test01_a(a, b, SCommon.CRandom.GetRange(0, b));
					}
					Test01_a(a, b, -1);
					Test01_a(a, b, b + 1);

					Console.WriteLine("OK");
				}
			}
			Console.WriteLine("OK!");
		}

		private void Test01_a(int countScale, int valueScale, int targetValue)
		{
			int[] arr = Enumerable
				.Range(0, SCommon.CRandom.GetRange(0, countScale))
				.Select(dummy => SCommon.CRandom.GetRange(0, valueScale))
				.ToArray();

			Array.Sort(arr, SCommon.Comp);

			int[] range1 = Test01_b(arr, targetValue, SCommon.Comp);
			int[] range2 = GetRange(arr, targetValue, SCommon.Comp);

			//Console.WriteLine(range1[0] + ", " + range1[1], " / " + range2[0] + ", " + range2[1]); // test

			if (SCommon.Comp(range1, range2, SCommon.Comp) != 0)
				throw null; // BUG !!!
		}

		private int[] Test01_b<T>(IList<T> list, T targetValue, Comparison<T> comp)
		{
			int l;
			int r;

			for (l = list.Count - 1; 0 <= l; l--)
				if (comp(list[l], targetValue) < 0)
					break;

			for (r = 0; r < list.Count; r++)
				if (comp(list[r], targetValue) > 0)
					break;

			return new int[] { l, r };
		}

		public static int[] GetRange<T>(IList<T> list, T targetValue, Comparison<T> comp)
		{
			return GetRange(list, element => comp(element, targetValue));
		}

		public static int[] GetRange<T>(IList<T> list, Func<T, int> comp)
		{
			int l = -1;
			int r = list.Count;

			while (l + 1 < r)
			{
				int m = (l + r) / 2;
				int ret = comp(list[m]);

				if (ret < 0)
				{
					l = m;
				}
				else if (0 < ret)
				{
					r = m;
				}
				else
				{
					l = GetLeft(list, l, m, element => comp(element) < 0);
					r = GetLeft(list, m, r, element => comp(element) == 0) + 1;
					break;
				}
			}
			return new int[] { l, r };
		}

		private static int GetLeft<T>(IList<T> list, int l, int r, Predicate<T> isLeft)
		{
			while (l + 1 < r)
			{
				int m = (l + r) / 2;
				bool ret = isLeft(list[m]);

				if (ret)
				{
					l = m;
				}
				else
				{
					r = m;
				}
			}
			return l;
		}
	}
}
