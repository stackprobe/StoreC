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
	}
}
