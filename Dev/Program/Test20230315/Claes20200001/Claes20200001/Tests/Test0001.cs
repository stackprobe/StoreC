using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;
using System.IO;

namespace Charlotte.Tests
{
	public class Test0001
	{
		public void Test01()
		{
			using (WorkingDir wd = new WorkingDir())
			{
				Console.WriteLine(wd.MakePath());
				Console.WriteLine(wd.MakePath());
				Console.WriteLine(wd.MakePath());
			}

			using (WorkingDir wd = new WorkingDir())
			{
				Console.WriteLine(wd.MakePath());
				Console.WriteLine(wd.MakePath());
				Console.WriteLine(wd.MakePath());
			}

			using (WorkingDir wd = new WorkingDir())
			{
				Console.WriteLine(wd.MakePath());
				Console.WriteLine(wd.MakePath());
				Console.WriteLine(wd.MakePath());
			}
		}

		public void Test02()
		{
			using (WorkingDir wd = new WorkingDir())
			{
				for (int c = 0; c < 1001; c++)
				{
					string file = wd.GetPath("テキストファイル.txt");

					file = SCommon.ToCreatablePath(file);
					File.WriteAllText(file, "テキスト_テキスト_テキスト", Encoding.UTF8);

					Console.WriteLine(file);
				}
			}
		}

		public void Test03()
		{
			Test03_a("AAABBBCCC", 'B', 2, 6);
			Test03_a("BBBBBBBB", 'B', -1, 8);
			Test03_a("ABBBBBC", 'B', 0, 6);
			Test03_a("AAACCC", 'B', 2, 3);
			Test03_a("AABCC", 'B', 1, 3);
			Test03_a("AAAA", 'B', 3, 4);
			Test03_a("CCC", 'B', -1, 0);
			Test03_a("AB", 'B', 0, 2);
			Test03_a("B", 'B', -1, 1);
			Test03_a("", 'B', -1, 0);

			Console.WriteLine("OK!");
		}

		private void Test03_a(string str, char target, int expectRange_L, int expectRange_R)
		{
			int[] range = SCommon.GetRange(str.ToCharArray(), target, (a, b) => (int)a - (int)b);

			Console.WriteLine(string.Join(", ", range[0], range[1], expectRange_L, expectRange_R)); // cout

			if (
				range[0] != expectRange_L ||
				range[1] != expectRange_R
				)
				throw null;

			Console.WriteLine("OK");
		}

		public void Test04()
		{
			Test03_a("AAAABCCCC", 'B', 4);
			Test03_a("AAAAAAAB", 'B', 7);
			Test03_a("BCCCCCC", 'B', 0);
			Test03_a("AAACCC", 'B', -1);
			Test03_a("AABCC", 'B', 2);
			Test03_a("CCCC", 'B', -1);
			Test03_a("AAA", 'B', -1);
			Test03_a("AB", 'B', 1);
			Test03_a("B", 'B', 0);
			Test03_a("", 'B', -1);
		}

		private void Test03_a(string str, char target, int expect)
		{
			int ret = SCommon.GetIndex(str.ToCharArray(), target, (a, b) => (int)a - (int)b);

			Console.WriteLine(string.Join(", ", ret, expect)); // cout

			if (ret != expect)
				throw null;

			Console.WriteLine("OK");
		}

		public void Test05()
		{
			Console.WriteLine(SCommon.ASCII);
			Console.WriteLine(SCommon.KANA);
			Console.WriteLine(SCommon.HALF);

			// ----

			ShowRange(SCommon.ENCODING_SJIS.GetBytes(SCommon.ASCII));
			ShowRange(SCommon.ENCODING_SJIS.GetBytes(SCommon.KANA));
			ShowRange(SCommon.ENCODING_SJIS.GetBytes(SCommon.HALF));
		}

		private void ShowRange(byte[] data)
		{
			int[][] ranges = data.Select(v => new int[] { (int)v, (int)v }).ToArray();

			for (int c = 0; c < 100; c++) // rough limit
			{
				for (int index = ranges.Length - 2; 0 <= index; index--)
				{
					if (ranges[index][1] + 1 == ranges[index + 1][0])
					{
						ranges[index][1] = ranges[index + 1][1];
						ranges[index + 1] = null;
					}
				}
				ranges = ranges.Where(v => v != null).ToArray();
			}
			Console.WriteLine(string.Join(" and ", ranges.Select(v => string.Format("from 0x{0:x2} to 0x{1:x2}", v[0], v[1]))));
		}
	}
}
