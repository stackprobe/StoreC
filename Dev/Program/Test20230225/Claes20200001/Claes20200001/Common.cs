using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Charlotte.Commons;

namespace Charlotte
{
	public static class Common
	{
		public static string HalfToFull(string str)
		{
			return Common.ReplaceChars(str, " " + SCommon.DECIMAL, "　" + SCommon.MBC_DECIMAL); // 必要に応じて増やすこと。
		}

		private static string ReplaceChars(string str, string fromChrs, string toChrs)
		{
			int chrCount = fromChrs.Length;

			if (chrCount != toChrs.Length)
				throw new ArgumentException();

			StringBuilder buff = new StringBuilder(chrCount);

			foreach (char f_chr in str)
			{
				char chr = f_chr;

				for (int index = 0; index < chrCount; index++)
				{
					if (chr == fromChrs[index])
					{
						chr = toChrs[index];
						break;
					}
				}
				buff.Append(chr);
			}
			return buff.ToString();
		}
	}
}
