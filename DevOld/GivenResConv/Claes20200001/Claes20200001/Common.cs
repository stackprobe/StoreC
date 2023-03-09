using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Charlotte.Commons;

namespace Charlotte
{
	public static class Common
	{
		public static string[] GetAllFile(string dir)
		{
			return Directory.GetFiles(dir, "*", SearchOption.AllDirectories)
				.OrderBy(SCommon.Comp)
				.ToArray();
		}

		public static bool ExistsPath(string path)
		{
			return Directory.Exists(path) || File.Exists(path);
		}
	}
}
