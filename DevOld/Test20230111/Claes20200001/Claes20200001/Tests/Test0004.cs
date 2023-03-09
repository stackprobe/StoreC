using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;
using Charlotte.Utilities;

namespace Charlotte.Tests
{
	public class Test0004
	{
		public void Test01()
		{
			string[] table = new string[]
			{
				"１２３",
				"４５６",
				"７８９",
			};

			Func<int, int, char> g = (x, y) => table[y][x];

			Action p = () =>
			{
				for (int y = 0; y < 3; y++)
				{
					for (int x = 0; x < 3; x++)
						Console.Write(g(x, y));

					Console.WriteLine();
				}
				Console.WriteLine("--");
			};

			p();
			g = Rot90(g);
			p();
			g = Rot90(g);
			p();
			g = Rot90(g);
			p();
			g = Rot90(g);
			p();
		}

		private Func<int, int, char> Rot90(Func<int, int, char> g)
		{
			g = Twist(g);
			g = Mirror(g);

			return g;
		}

		private Func<int, int, char> Twist(Func<int, int, char> g)
		{
			return (x, y) => g(y, x);
		}

		private Func<int, int, char> Mirror(Func<int, int, char> g)
		{
			return (x, y) => g(2 - x, y);
		}
	}
}
