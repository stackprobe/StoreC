using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	/// <summary>
	/// TCommon.cs テスト
	/// </summary>
	public class Test0001
	{
		public void Test01()
		{
			string str = "始 " + SCommon.ASCII + "終";
			Console.WriteLine(str);
			str = TCommon.ToAsciiFull(str);
			Console.WriteLine(str);
			str = TCommon.ToAsciiHalf(str);
			Console.WriteLine(str);
		}

		public void Test02()
		{
			for (int testCnt = 0; testCnt < 10000; testCnt++)
			{
				string str = new string(
					Enumerable.Range(0, SCommon.CRandom.GetRange(0, 100)).Select(dummy => 'A').Concat(
					Enumerable.Range(0, SCommon.CRandom.GetRange(0, 100)).Select(dummy => 'B').Concat(
					Enumerable.Range(0, SCommon.CRandom.GetRange(0, 100)).Select(dummy => 'C'))).ToArray()
					);

				int[] range1 = Test02_a(str);
				int[] range2 = TCommon.GetRange(str.ToArray(), chr =>
				{
					switch (chr)
					{
						case 'A': return -1;
						case 'B': return 0;
						case 'C': return 1;

						default:
							throw null; // never
					}
				});

				if (
					range1[0] != range2[0] ||
					range1[1] != range2[1]
					)
					throw null;
			}
			Console.WriteLine("OK!");
		}

		private int[] Test02_a(string str)
		{
			int l;
			int r;

			for (l = str.Length - 1; 0 <= l; l--)
				if (str[l] == 'A')
					break;

			for (r = 0; r < str.Length; r++)
				if (str[r] == 'C')
					break;

			return new int[] { l, r };
		}
	}
}
