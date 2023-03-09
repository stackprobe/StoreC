using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;

namespace Charlotte.Tests
{
	public class Test0006
	{
		public void Test01()
		{
			for (int n = 1; n <= 101; n++)
			{
				Test01_a(n);
			}
		}

		private void Test01_a(int n)
		{
			int win = 0;
			int winCnt = 0;
			int lose = 0;
			int losePos = 0;

			for (int testCnt = 0; testCnt < 30000; testCnt++)
			{
				int c = 0;
				int p = 0;

				while (c < n)
				{
					c++;
					p += SCommon.CRandom.GetSign();

					if (p < 0)
					{
						break;
					}
				}
				if (p < 0)
				{
					win++;
					winCnt += c;
				}
				else
				{
					lose++;
					losePos += p;
				}
			}
			Console.WriteLine(n + " ==> " + (win * 1.0 / (win + lose)).ToString("F9")
				+ " , " + (winCnt * 1.0 / win).ToString("F9")
				+ " , " + (losePos * 1.0 / lose).ToString("F9")
				);
		}

		public void Test02()
		{
			double[] curr = new double[] { 0.0, 1.0 };
			int phase = 0;
			double winRate = 0.0;

			//while (phase < 1000)
			while (phase < 3000)
			//while (phase < 10000)
			//while (phase < 30000)
			//while (phase < 100000)
			{
				double[] next = new double[curr.Length + 1];
				for (int i = 1; i < curr.Length; i++)
				{
					double r = curr[i] / 2.0;

					next[i - 1] += r;
					next[i + 1] += r;
				}
				phase++;

				curr = next;
				next = null;
				winRate += curr[0] * phase;
				curr[0] = 0.0;

				double loseNumer = 0.0;
				double loseDenom = 0.0;

				for (int i = 1; i < curr.Length; i++)
				{
					loseNumer += curr[i] * (i - 1);
					loseDenom += curr[i];
				}
				double loseRate = loseNumer / loseDenom;

				Console.WriteLine(phase + " --> "
					+ winRate.ToString("F9") + " , " + (1.0 - loseDenom).ToString("F9") + " / "
					+ loseRate.ToString("F9") + " , " + loseDenom.ToString("F9"));
			}
		}
	}
}
