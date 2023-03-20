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
	}
}
