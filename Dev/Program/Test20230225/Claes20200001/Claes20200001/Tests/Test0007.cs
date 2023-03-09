using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace Charlotte.Tests
{
	public class Test0007
	{
		public void Test01()
		{
			Console.WriteLine(Environment.GetFolderPath(Environment.SpecialFolder.CommonDocuments)); // @"C:\Users\Public\Documents"
			Console.WriteLine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)); // @"C:\Users\<UserName>\Documents"

			// ----

			foreach (string dir in Directory.GetDirectories(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)))
				Console.WriteLine(dir);

			foreach (string file in Directory.GetFiles(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments)))
				Console.WriteLine(file);
		}

		public void Test02()
		{
			string str = "++++++++++----------";

			for (; ; )
			{
				Console.WriteLine(str);

				if (!str.Contains("+-"))
					break;

				str = str.Replace("+-", "-+");
			}
		}

		public void Test03()
		{
			double a = 0.0;
			double b = 100.0;

			for (int c = 0; c < 1000; c++)
			{
				double aToB = a * 0.01;
				double bToA = b * 0.02;

				a -= aToB;
				b += aToB;
				a += bToA;
				b -= bToA;

				Console.WriteLine(a.ToString("F9") + " , " + b.ToString("F9"));
			}
		}

		public void Test04()
		{
			Console.WriteLine("Hello, Happy World!");
		}
	}
}
