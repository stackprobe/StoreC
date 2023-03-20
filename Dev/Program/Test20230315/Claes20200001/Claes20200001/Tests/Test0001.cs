using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using Charlotte.Commons;

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
	}
}
