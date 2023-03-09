using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Charlotte.Tests
{
	class Test0002
	{
		public void Test01()
		{
			for (int c = 0x21; c <= 0x7e; c++)
			{
				Console.WriteLine("[" + (char)c + "] ---> [" + (char)(c + 0xfee0) + "]");
			}
			for (int c = 0xff61; c <= 0xff9f; c++)
			{
				//Console.WriteLine("[" + (char)c + "] ---> [" + (char)(c - 0xFF60 + 0x3000) + "]");
			}
			Console.WriteLine((int)'ア' - (int)'ｱ');

			Console.WriteLine((int)' ');
			Console.WriteLine((int)'　');
		}

		public void Test02()
		{
			for (int chr = 0x20; chr <= 0x7e; chr++)
			{
				Console.WriteLine("[" + (char)chr + "] ---> [" + ToAsciiFull((char)chr) + "]");
			}
			for (int chr = 0x20; chr <= 0x7e; chr++)
			{
				char chrFl = ToAsciiFull((char)chr);

				Console.WriteLine("[" + chrFl + "] ---> [" + ToAsciiHalf(chrFl) + "]");
			}

			Console.WriteLine("[某] ---> [" + ToAsciiFull('某') + "]");
			Console.WriteLine("[某] ---> [" + ToAsciiHalf('某') + "]");
		}

		public static char ToAsciiFull(char chr)
		{
			if (chr == (char)0x20)
			{
				chr = (char)0x3000;
			}
			else if (0x21 <= chr && chr <= 0x7e)
			{
				chr += (char)0xfee0;
			}
			return chr;
		}

		public static char ToAsciiHalf(char chr)
		{
			if (chr == (char)0x3000)
			{
				chr = (char)0x20;
			}
			else if (0xff01 <= chr && chr <= 0xff5e)
			{
				chr -= (char)0xfee0;
			}
			return chr;
		}
	}
}
